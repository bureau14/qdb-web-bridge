var mode = process.env.NODE_ENV == 'production' ? 'production' : 'development'
var buildDir = '.tmp/' + mode;

module.exports = {
	mode: mode,
	app: {
		sources: {
			js: {
				folder: 'app/',
				main: 'app/main.jsx',
				files: [
					'app/**/*.jsx',
					'app/**/*.js'
				]
			},
			css: {
				folder: 'app/css/',
				files: ['app/css/*.css']
			},
			images: {
				folder: 'app/images/',
				files: ['app/images/*.*']
			}
		},
		libs: {
			js: {
				files: ['node_modules/toastr/build/toastr.min.js']
			},
			css: {
				files: [
					'node_modules/font-awesome/css/font-awesome.min.css',
					'node_modules/purecss/build/pure-min.css',
					'node_modules/toastr/build/toastr.min.css',
					'node_modules/react-datetime/css/react-datetime.css'
				]
			},
			fonts: {
				files: ['node_modules/font-awesome/fonts/*']
			}
		},
		build: {
			folder: buildDir + '/app/',
			js: {
				folder: buildDir + '/app/',
				bundle: 'bundle.js',
				files: [buildDir + '/app/*.js']
			},
			css: {
				folder: buildDir + '/app/css/',
				bundle: 'bundle.css',
				files: [buildDir + '/app/css/*.css']
			},
			images: {
				folder: buildDir + '/app/images'
			},
			fonts: {
				folder: buildDir + '/app/fonts'
			}
		}
	},
	server: {
		port: 4444,
		sources: {
			js: {
				main: 'server/main.js',
				files: ['server/**/*.js']
			},
			html: {
				folder: 'server/',
				files: [
					'server/pages/*.ejs',
					'server/pages/*.html'
				]
			}
		},
		build: {
			folder: buildDir + '/server/',
			js: {
				folder: buildDir + '/server/',
				main: buildDir + '/server/main.js',
				files: [buildDir + '/server/**/*.js']
			},
			html: {
				main: buildDir + '/server/pages/index.ejs',
				folder: buildDir + '/server/pages/'
			}
		}
	}
};
