var gulp = require('gulp'),
	gutil = require('gulp-util'),
	clean = require('gulp-clean'),
	jshint = require('gulp-jshint'),
	map = require('vinyl-map'),
	istanbul = require('istanbul'),
	karma = require('gulp-karma'),
	coveralls = require('gulp-coveralls'),
	header = require('gulp-header'),
	uglify = require('gulp-uglify'),
	gzip = require('gulp-gzip'),
	micro = require('gulp-micro'),
	pkg = require('./package.json'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	rename = require('gulp-rename'),
	path = require('path'),
	template = require('lodash').template;

gulp.task('default', ['clean', 'jshint', 'karma', 'compile']);
gulp.task('dev', ['compile', 'watch']);

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['karma', 'compile']);
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
			var instrumenter = new istanbul.Instrumenter(),
				relativePath = path.relative(__dirname, filename);
			return instrumenter.instrumentSync(code.toString(), relativePath);
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

gulp.task('compile', ['clean'], function() {
	return browserify('./src/bespoke.js')
		.bundle({ standalone: 'bespoke' })
		.on('error', gutil.log)
		.pipe(source('bespoke.js'))
		.pipe(buffer())
		.pipe(header(template([
				'/*!',
				' * <%= title %> v<%= version %>',
				' *',
				' * Copyright <%= new Date().getFullYear() %>, <%= author.name %>',
				' * This content is released under the <%= licenses[0].type %> license',
				' * <%= licenses[0].url %>',
				' */\n\n'
			].join('\n'), pkg)))
		.pipe(gulp.dest('dist'))
		.pipe(rename('bespoke.min.js'))
		.pipe(uglify())
		.pipe(header(template([
				'/*! <%= title %> v<%= version %> ',
				'© <%= author.name %>, ',
				'<%= licenses[0].type %> License */\n'
			].join(''), pkg)))
		.pipe(gulp.dest('dist'))
		.pipe(gzip())
		.pipe(micro({ limit: 1024 }));
});
