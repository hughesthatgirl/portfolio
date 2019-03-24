// Gulp.js configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var data = require('gulp-data');
var autoprefixer = require('gulp-autoprefixer');


// ------------------------------------------
// Sass
// ------------------------------------------
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '> 2%', 'safari >= 7'],
      cascade: false
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// ------------------------------------------
// Static Server - Page Reload
// ------------------------------------------
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});

// ------------------------------------------
// Watch Tasks
// ------------------------------------------
gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
});
