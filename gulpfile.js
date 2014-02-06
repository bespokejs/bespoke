var gulp = require('gulp'),
  clean = require('gulp-clean'),
  jshint = require('gulp-jshint'),
  karma = require('gulp-karma'),
  coveralls = require('gulp-coveralls'),
  header = require('gulp-header'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  pkg = require('./package.json'),
  template = require('lodash').template;

gulp.task('default', ['clean', 'jshint', 'karma', 'copy', 'minify']);

gulp.task('clean', function() {
  return gulp.src(['dist', 'test/coverage'], { read: false })
    .pipe(clean());
});

gulp.task('jshint', function() {
  return gulp.src(['gulpfile.js', 'src/**/*.js', 'specs/**/*.js', 'demo/**/*.js'])
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('karma', ['clean'], function() {
  return gulp.src(['libs/**/*.js', 'src/**/*', 'test/spec/*Spec.js'])
    .pipe(karma({ configFile: 'karma.conf.js' }));
});

gulp.task('coveralls', ['karma'], function() {
  return gulp.src(['test/coverage/**/lcov.info'])
    .pipe(coveralls());
});

gulp.task('copy', ['clean'], function() {
  return gulp.src('src/bespoke.js')
    .pipe(header(template([
        '/*!',
        ' * <%= title %> v<%= version %>',
        ' *',
        ' * Copyright <%= new Date().getFullYear() %>, <%= author.name %>',
        ' * This content is released under the <%= licenses[0].type %> license',
        ' * <%= licenses[0].url %>',
        ' */\n\n'
      ].join('\n'), pkg)))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify', ['clean'], function() {
  return gulp.src('src/bespoke.js')
    .pipe(rename('bespoke.min.js'))
    .pipe(uglify())
    .pipe(header(template([
        '/*! <%= title %> v<%= version %> ',
        '© <%= new Date().getFullYear() %> <%= author.name %>, ',
        'Licensed <%= licenses[0].type %> */\n'
      ].join(''), pkg)))
    .pipe(gulp.dest('dist'));
});
