var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var newer = require('gulp-newer');
var htmlclean = require('gulp-htmlclean');

var source = 'src/';
var build = 'dist/';

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: build
    }
  });
});

gulp.task('js', function () {
  return gulp.src([source + 'js/module/**/*.js', source + 'js/extras/**/*.js'])
    .pipe(concat('main.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(build + 'js'));
});

gulp.task('js-watch', ['js'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('html', function () {
  return gulp.src(source + 'html/**/*.html')
    .pipe(newer(build))
    .pipe(gulp.dest(build));
});

gulp.task('html-watch', ['html'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('sass', function () {
  return gulp.src(source + 'css/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest(build + 'css/'));
});

gulp.task('sass-watch', ['sass'], function (done) {
  browserSync.reload({
    stream: true
  });
  done();
});

gulp.task('watch', ['browserSync', 'sass', 'html', 'js'], function () {
  gulp.watch(source + 'css/scss/**/*.scss', ['sass-watch']);
  gulp.watch(source + 'js/**/*.js', ['js-watch']);
  gulp.watch(source + 'html/**/*.html', ['html-watch']);
});
