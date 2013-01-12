/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-jasmine-runner');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*!\n' +
        ' * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
        '<% if (pkg.homepage) { %> * <%= pkg.homepage %>\n<% } %>\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %>\n' +
        ' * This content is released under the' +
        ' <%= _.pluck(pkg.licenses, "type").join(", ") %> license<%= pkg.licenses.length === 1 ? "" : "s" %>\n' +
        ' * <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
        ' */',
      microbanner: '/*! <%= pkg.title || pkg.name %> v<%= pkg.version %> | ' +
        '(c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> | ' +
        '<%= pkg.homepage ? pkg.homepage + " | " : "" %>' +
        'Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.microbanner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jasmine: {
      src: 'src/**/*.js',
      helpers: 'libs/**/*.js',
      specs: 'specs/**/*Spec.js'
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'specs/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint jasmine'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        expr: true,
        browser: true,
        trailing: true,
        unused: true,
        es5: true,
        strict: true,
        maxcomplexity: 3,
        maxparams: 4,
        maxlen: 120,
        maxdepth: 2
      },
      globals: {
        bespoke: true,
        describe: true,
        it: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
        sinon: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint jasmine concat min');

};
