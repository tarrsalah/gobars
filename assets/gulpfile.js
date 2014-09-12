var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify  = require('gulp-uglify')
var streamify = require('gulp-streamify')

gulp.task('js', function() {
    return browserify('./js/main')
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(streamify(uglify()))
	.pipe(gulp.dest('../static/js'));	
});

gulp.task('default', ['js'])
