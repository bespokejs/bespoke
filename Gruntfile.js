/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*!\n' +
        ' * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
        '<% if (pkg.homepage) { %> * <%= pkg.homepage %>\n<% } %>' +
        ' *\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %>\n' +
        ' * This content is released under the' +
        ' <%= _.pluck(pkg.licenses, "type").join(", ") %> license<%= pkg.licenses.length === 1 ? "" : "s" %>\n' +
        ' * <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
        ' */\n\n',
      microbanner: '/*! <%= pkg.title || pkg.name %> v<%= pkg.version %> ' +
        '© <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, ' +
        'Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
    },
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.microbanner %>'
      },
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jasmine: {
      src: ['libs/**/*.js', 'src/**/*.js'],
      options: {
        specs: 'specs/**/*Spec.js'
      }
    },
    watch: {
      files: '<%= jshint.src %>',
      tasks: ['default']
    },
    jshint: {
      src: ['Gruntfile.js', 'src/**/*.js', 'specs/**/*.js', 'demo/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: false,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        expr: true,
        browser: true,
        trailing: true,
        unused: true,
        strict: false,
        maxcomplexity: 4,
        maxparams: 5,
        maxdepth: 2,
        globals: {
          console: true,
          bespoke: true,
          describe: true,
          xdescribe: true,
          it: true,
          xit: true,
          expect: true,
          beforeEach: true,
          afterEach: true,
          runs: true,
          waitsFor: true,
          sinon: true
        }
      }
    },
    micro: {
      src: '<%= uglify.dist.dest %>',
      options: {
        limit: 1024,
        gzip: true
      }
    }
  });

  // Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-micro');

  // Default task.
  grunt.registerTask('default', ['clean', 'jshint', 'jasmine', 'concat', 'uglify', 'micro']);

};
