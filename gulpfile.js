// Gulp.js configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

var supported = [
  'last 2 versions',
  '> 2%',
  'safari >= 7',
  'ie >= 9',
  'ff >= 15',
  'ios 6',
  'android 4'
];

// ------------------------------------------
// Sass
// ------------------------------------------
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano({
      autoprefixer: {browsers: supported, add: true}
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// ------------------------------------------
// BrowserSync - Page Reload
// ------------------------------------------
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// ------------------------------------------
// Watch Tasks
// ------------------------------------------
gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
});
