var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
	return gulp.src('./public/src/js/**')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function() {
	return gulp.src('./public/src/js/**')
		.pipe(jscs())
		.pipe(jscs.reporter());
});

gulp.task('default', function() {
	console.log('running');
});