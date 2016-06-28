var config = require('./gulpfile.config');
var gulp = require('gulp');
var babelify = require('babelify'); // transpiles es6 and jsx to plain old javascript
var filelog = require('gulp-filelog'); // logs the filenames in the console
var bro = require('gulp-bro'); // allows using require() in the browser
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon'); // runs a node install and restart when a file changes
var rename = require('gulp-rename');
var path = require('path');
var inject = require('gulp-inject');
var cache = require('gulp-cached');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var del = require('del');

gulp.task('default', ['help']);
gulp.task('postinstall', []);

gulp.task('help', function() {
    console.info('You are running gulp in "development" mode.');
    console.info('Supported tasks:');
    console.info(' - gulp build -> builds the app');
    console.info(' - gulp start -> builds and runs the the app');
    console.info('Caution: behavior is different in "production" mode');
});

gulp.task('clean', function() {
    return del([
        config.app.build.folder,
        config.server.build.folder
    ]);
});

gulp.task('build', ['server', 'lint', 'js-bundle','css','images','fonts','html','inject']);
    gulp.task('lint', function () {
        var files = [].concat(
            config.server.sources.js.files,
            config.app.sources.js.files
        );
        return gulp.src(files)
            .pipe(cache('lint'))                          // <- prevents linting the same file twice
            .pipe(filelog('lint'))                        // <- prints filename
            .pipe(eslint())                               // <- does the linting
            .pipe(eslint.format())                        // <- prints the error in the console
            .pipe(eslint.format(                          // <- prints in the browser
                'compact',
                (msg) => browserSync.notify(msg, 30000)
            ))
            .pipe(eslint.failAfterError());               // <- stops if error
    });

    gulp.task('js-bundle', ['lint'], function() {
        return gulp
            .src(config.app.sources.js.main)
            .pipe(filelog('js-bundle'))
            .pipe(bro({                                   // <- bundle all js files
                debug: true,
                transform: [babelify]                     // <- compile ES6 and JSX
             }))
            .pipe(rename(config.app.build.js.bundle))
            .pipe(gulp.dest(config.app.build.js.folder))
            .pipe(browserSync.stream({once: true}));      // <- refresh browser
    });

    gulp.task('js-libs', function() {
        gulp.src(config.app.libs.js.files)
            .pipe(filelog('js-libs'))
            .pipe(gulp.dest(config.app.build.js.folder))
            .pipe(browserSync.stream({once: true}));
    });

    gulp.task('css', function() {
        var allCssfiles = [].concat(
            config.app.sources.css.files,
            config.app.libs.css.files
        );
        gulp.src(allCssfiles)
            .pipe(filelog('css'))
            .pipe(gulp.dest(config.app.build.css.folder)) // <- copy all files
            .pipe(browserSync.stream({once: true}));      // <- refresh browser
    });

    gulp.task('images', function() {
        gulp.src(config.app.sources.images.files)
            .pipe(filelog('images'))
            .pipe(gulp.dest(config.app.build.images.folder))
            .pipe(browserSync.stream({once: true}));
    });

    gulp.task('fonts', function() {
        gulp.src(config.app.libs.fonts.files)
            .pipe(filelog('fonts'))
            .pipe(gulp.dest(config.app.build.fonts.folder))
            .pipe(browserSync.stream({once: true}));
    });

    gulp.task('html', function() {
        gulp.src(config.server.sources.html.files)
            .pipe(cache('html'))
            .pipe(filelog('html'))
            .pipe(gulp.dest(config.server.build.html.folder));
    });

    gulp.task('inject', ['html','css','js-bundle','js-libs'], function() {
        var target = gulp.src(config.server.build.html.main);
        var sources = gulp.src([].concat(
            config.app.build.css.files,
            config.app.build.js.files
        ));
        return target
            .pipe(filelog('inject'))
            .pipe(inject(sources,{ignorePath: config.app.build.folder}))
            .pipe(gulp.dest(path.dirname(config.server.build.html.main)));
    });

    gulp.task('server', ['lint'], function() {
        return gulp
            .src(config.server.sources.js.files)
            .pipe(plumber(function(err) {
                browserSync.notify(err.message, 30000);
            }))
            .pipe(cache('server'))
            .pipe(filelog('server'))
            .pipe(babel())
            .pipe(gulp.dest(config.server.build.js.folder));
    });

gulp.task('start', ['browser-sync', 'watch']);

    gulp.task('browser-sync', ['nodemon'], function() {
        browserSync.init({
            proxy: 'http://localhost:' + config.server.port
        });
    });

    gulp.task('nodemon', ['build'], function(){
        return nodemon({
            delay: 1,
            script: config.server.build.js.main,
            watch: config.server.build.js.files,
            env: {
                PORT: config.server.port,
                APP_FOLDER: path.resolve(config.app.build.folder),
                DEBUG: 'express:*,compression'
            }
        })
        .on('restart', function() {
            browserSync.reload();
            gulp.start('lint');
        })
        .on('crash', function() {
            browserSync.notify('Server crashed!', 30000);
        });
    });

    gulp.task('watch', function() {
        gulp.watch(config.app.sources.js.files, ['js-bundle']);
        gulp.watch(config.app.sources.css.files, ['css']);
        gulp.watch(config.app.sources.images.files, ['images']);
        gulp.watch(config.server.sources.js.files, ['server']);
        gulp.watch(config.server.sources.html.files, ['inject']);
    });