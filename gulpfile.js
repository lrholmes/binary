var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');
var rename = require("gulp-rename");

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('js/*js')
        //.pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('fileinclude', function(){
  return gulp.src('*.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
          }))
        .pipe(rename(function(path){
          if (path.basename !== 'index') {
            path.dirname += '/' + path.basename;
            path.basename = 'index'
          }
        }))
        .pipe(gulp.dest('./dist/'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js', 'sass'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("js/*.js", ['js-watch']);
});
