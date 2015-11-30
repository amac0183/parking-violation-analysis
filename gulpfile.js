var jshint = require('gulp-jshint');
var gulp = require('gulp');

gulp.task('lint', function() {
	return gulp.src('./public/src/js/**')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('default', function() {
	console.log('running');
});