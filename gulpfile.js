var gulp = require("gulp");
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
const minify = require('gulp-minify');
var imagemin = require('gulp-imagemin-fix');
var cssnano = require('gulp-cssnano');
var pump = require('pump');
var autoprefixer = require('gulp-autoprefixer');
htmlmin = require('gulp-htmlmin');


gulp.task('serve', ['css', 'javascript'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch('./*.html', ['minificar']);
    gulp.watch('./js/*.js', ['javascript']).on('change', browserSync.reload);
    gulp.watch("scss/**/*.scss", ['css']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('css', function() {
    return gulp.src("./scss/*.scss")
        .pipe(sass())
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("./app/css"))
        .pipe(browserSync.stream());
});

gulp.task('javascript', function() {
  gulp.src('./js/*.js')
    .pipe(minify())
    .pipe(gulp.dest('./app/js'))
});

  gulp.task('optimizar', () =>
    gulp.src('img/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('app/img'))
);

gulp.task('minificar', () => {
    return gulp.src('./*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('app'));
  });