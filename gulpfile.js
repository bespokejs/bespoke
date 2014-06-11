var gulp = require('gulp'),
	clean = require('gulp-clean'),
	jshint = require('gulp-jshint'),
	map = require('vinyl-map'),
	istanbul = require('istanbul'),
	karma = require('gulp-karma'),
	coveralls = require('gulp-coveralls'),
	header = require('gulp-header'),
	uglify = require('gulp-uglify'),
	streamify = require('gulp-streamify'),
	gzip = require('gulp-gzip'),
	micro = require('gulp-micro'),
	pkg = require('./package.json'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	template = require('lodash').template;

gulp.task('default', ['clean', 'jshint', 'karma', 'build']);
gulp.task('build', ['compile', 'minify']);
gulp.task('dev', ['build', 'watch']);

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['karma', 'build']);
	gulp.watch('test/spec/**/*.js', ['karma']);
});

gulp.task('clean', function() {
	return gulp.src(['dist', 'test/coverage'], { read: false })
		.pipe(clean());
});

gulp.task('jshint', function() {
	return gulp.src(['gulpfile.js', 'src/**/*.js', 'specs/**/*.js'])
			.pipe(jshint('.jshintrc'))
			.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('instrument', function() {
	return gulp.src('src/**/*.js')
		.pipe(map(function(code, filename) {
			var instrumenter = new istanbul.Instrumenter();
			return instrumenter.instrumentSync(code.toString(), filename);
		}))
		.pipe(gulp.dest('src-instrumented'));
});

gulp.task('karma', ['clean', 'instrument'], function() {
	return gulp.src(['test/spec/*Spec.js'])
		.pipe(karma({ configFile: 'karma.conf.js' }));
});

gulp.task('coveralls', ['karma'], function() {
	return gulp.src(['test/coverage/**/lcov.info'])
		.pipe(coveralls());
});

var makeBundleStream = function(filename) {
	return browserify('./src/bespoke.js')
		.bundle({ standalone: 'bespoke' })
		.pipe(source(filename));
};

gulp.task('compile', ['clean'], function() {
	return makeBundleStream('bespoke.js')
		.pipe(streamify(header(template([
				'/*!',
				' * <%= title %> v<%= version %>',
				' *',
				' * Copyright <%= new Date().getFullYear() %>, <%= author.name %>',
				' * This content is released under the <%= licenses[0].type %> license',
				' * <%= licenses[0].url %>',
				' */\n\n'
			].join('\n'), pkg))))
		.pipe(gulp.dest('dist'));
});

gulp.task('minify', ['clean'], function() {
	return makeBundleStream('bespoke.min.js')
    .pipe(streamify(uglify()))
    .pipe(streamify(header(template([
        '/*! <%= title %> v<%= version %> ',
        '© <%= author.name %>, ',
        '<%= licenses[0].type %> License */\n'
      ].join(''), pkg))))
    .pipe(gulp.dest('dist'))
    .pipe(gzip())
    .pipe(streamify(micro({ limit: 1024 })));
});
