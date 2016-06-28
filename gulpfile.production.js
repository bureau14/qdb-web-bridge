var config = require('./gulpfile.config')
var gulp = require('gulp');
var browserify = require('browserify'); // allows using require() in the browser
var uglify = require('gulp-uglify'); // JavaScript optimizer
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var nodemon = require('gulp-nodemon');
var babel = require('gulp-babel');
var path = require('path');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var concat = require('gulp-concat');
var inject = require('gulp-inject');

gulp.task('default', ['help']);
gulp.task('postinstall', ['build']);

gulp.task('help', function() {
	console.info('You are running gulp in "production" mode.');
    console.info('Supported tasks:');
    console.info(' - gulp build -> builds the app');
    console.info(' - gulp start -> runs the the app');
    console.info('Caution: behavior is different in "development" mode');
});

gulp.task('clean', function() {
	return del([
		config.app.build.folder,
		config.server.build.folder
	]);
});

gulp.task('build', ['server','js-bundle','js-libs','css-bundle','css-libs','images','fonts','html','inject']);

	gulp.task('server', ['clean'], function() {
		return gulp
			.src(config.server.sources.js.files)
			.pipe(babel())        // compile ES6 to ES5
			.pipe(gulp.dest(config.server.build.js.folder));
	});

	gulp.task('js-bundle', ['clean'], function() {
		return browserify({
			entries: [config.app.sources.js.main],
			debug: false
		})
		.transform('babelify')   // compile ES6 and JSX to ES5
		.transform('envify', {   // replace environement variables
			_: 'purge',				// delete undefined variables
			global: true,           // do this for libraries too
			NODE_ENV: 'production'
		})
		.transform('uglifyify', { // minify each file
			global:true             // do this for libraries too
		})
		.bundle()                 // bundle all js files
		.pipe(source(config.app.build.js.bundle))
		.pipe(buffer())           // convert from streaming to buffered vinyl file object
		.pipe(uglify())           // optimize again, on the whole bundle
		.pipe(gulp.dest(config.app.build.js.folder));
	});

    gulp.task('js-libs', ['clean'], function() {
        gulp.src(config.app.libs.js.files)
            .pipe(gulp.dest(config.app.build.js.folder));
    });

	gulp.task('css-bundle', ['clean'], function() {
		gulp.src(config.app.sources.css.files)
		    .pipe(cleanCSS())
		    .pipe(concat(config.app.build.css.bundle))
			.pipe(gulp.dest(config.app.build.css.folder));
	});

	gulp.task('css-libs', ['clean'], function() {
		gulp.src(config.app.libs.css.files)
			.pipe(gulp.dest(config.app.build.css.folder));
	});

	gulp.task('images', ['clean'], function() {
		gulp.src(config.app.sources.images.files)
			.pipe(gulp.dest(config.app.build.images.folder));
	});

	gulp.task('fonts', ['clean'], function() {
		gulp.src(config.app.libs.fonts.files)
			.pipe(gulp.dest(config.app.build.fonts.folder));
	});

	gulp.task('html', ['clean'], function() {
        gulp.src(config.server.sources.html.files)
			.pipe(gulp.dest(config.server.build.html.folder));
    });

    gulp.task('inject', ['html','css-libs','css-bundle','js-bundle','js-libs'], function() {
        var target = gulp.src(config.server.build.html.main);
        var sources = gulp.src([].concat(
        	config.app.build.css.files,
        	config.app.build.js.files
        ));
        return target
            .pipe(inject(sources,{ignorePath: config.app.build.folder}))
            .pipe(gulp.dest(path.dirname(config.server.build.html.main)));
    });

gulp.task('start', function() {
	return nodemon({
		script: config.server.build.js.main,
		env: {
			PORT: config.server.port,
			APP_FOLDER: path.resolve(config.app.build.folder)
		}
	})
 });