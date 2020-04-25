var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
gulp.task('sass', function() {
   return gulp.src('themes/littlemarket/scss/style.scss')
       .pipe(sass())
       .pipe(gulp.dest('themes/littlemarket/public/'));
});
gulp.task('nano', function() {
    return gulp.src('themes/littlemarket/public/style.css')
        .pipe(cssnano())
        .pipe(gulp.dest('themes/littlemarket/public/'));
});
gulp.task('default', gulp.series('sass', 'nano'));