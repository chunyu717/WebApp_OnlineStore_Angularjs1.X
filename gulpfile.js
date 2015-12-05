/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});


/*
var del = require("del");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var minifyHtml = require("gulp-minify-html");
var minifyCss = require("gulp-minify-css");
//var config = require("./config");


gulp.task('default' ,['minify-html' ,'minify-css', 'minify-js'] ,function(cb){
	
});

gulp.task('minify-js' ,['clean'],  function(){
	console.log('minify-js');
	gulp.src(
		//config.path.bower_components_js
		[
		"bower_components/angular/angular.min.js",
		"bower_components/jquery/dist/jquery.min.js",
		"bower_components/boostrap/docs/assets/js/bootstrap.min.js",
		"src/main/main.controller.js"
		]
	 )
	//.pipe(uglify({mangle:false}))
	//.pipe(gulp.dest('dist/assets'))
	.pipe(concat('bundle.js'))
	.pipe(gulp.dest('dist/assets'))
	

	//gulp.src(["src/main/main.controller.js"])
	//.pipe(uglify({mangle:false}))
	//.pipe(gulp.dest('dist/assets'))
	
});

gulp.task('clean' ,function(cb){
	console.log('clean');
	del(['dist/*'] , cb);
});

gulp.task('minify-html' ,['clean'], function(cb){
	console.log('minify-html');
	gulp.src("src/index.html")
	.pipe(minifyHtml())
	.pipe(gulp.dest('dist'))
});

gulp.task('minify-css' ,['clean'], function(cb){
	console.log('minify-css');
	gulp.src(['bower_components/boostrap/docs/assets/css/bootstrap.css','src/style.css'])
	.pipe(concat('bundle.css'))
	.pipe(minifyCss())
	.pipe(gulp.dest('dist/assets'))
});

gulp.task('watch' , function(){
	gulp.watch(["src/*"], ['minify-html' ,'minify-css', 'minify-js']) ;
	
});
*/


