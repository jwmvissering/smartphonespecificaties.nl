module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      reload:{
        files: ['index.html', 'js/*.js', 'php/*.php', 'css/style.css', 'app/*/*.js', 'templates/*.html'],
        options: {
          livereload: true,
          host: "localhost/smartphonevergelijken",
          port: 35729,
        }
      },
      //watch_js_files: {
      //  files: ['js/*.js'],
      //  tasks: ['concat', 'uglify'],
      //},
      //watch_sass_files: {
      //    files: ['css/*.scss'],
      //    tasks: ['sass'],
      //},
    //},
    //sass: {
    //    dist: {
    //        files: {
    //            'css/main.css': 'css/app.scss'
    //        }
    //    }
    //},
    //concat: {
    //  dist: {
    //    src: ['js/*.js'],
    //    dest: 'min/concat.js',
    //  },
    //},
    //uglify: {
    //  options: {
    //    banner: '/*! Copyright Jamon Vissering <%= grunt.template.today("yyyy") %> */\n'
    //  },
    //  build: {
    //    src: 'min/concat.js',
    //    dest: 'min/uglify.js'
    //  }
    },
  });

  // Load plugins
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-sass');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
};