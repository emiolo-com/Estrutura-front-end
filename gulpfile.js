var gulp = require('gulp'),
 sass = require('gulp-sass'), 
 watch = require('gulp-watch'), 
 scsslint = require('gulp-scss-lint'), 
 jade = require('gulp-jade'),
 stylus = require('gulp-stylus'),
 browserSync = require('browser-sync'),
 reload      = browserSync.reload;

// Static server jade and sylus
gulp.task('serve-stylus-jade',['compilecss','compilehtml'], function() {
    browserSync({
        server: {
            baseDir: "./build"
        }
    });
    
    gulp.watch("app/stylus/*.styl", ['compilecss-stylus']);
    gulp.watch("app/views/*.jade",['compilehtml-jade']);
});
 
// Static server html + css
gulp.task('serve', ['sass'], function() {

    browserSync({
        server: "./app"
    });

    gulp.watch("app/HTML/css/.css",.on('change', reload);
    gulp.watch("app/HTML/*.html").on('change', reload);
});
 
 
// include, if you want to work with sourcemaps 
var sourcemaps = require('gulp-sourcemaps');
// Options 
// Options compress 
gulp.task('compilecss-stylus', function () {
  gulp.src('./app/stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: true,
      linenos: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
      .pipe(reload({stream: true}));

});
 

gulp.task('compilehtml-jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('./app/views/*.jade')
    .pipe(jade({
      pretty : true,
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./build'))
    .pipe(reload({stream: true}));
});

gulp.task('default',['serve']);
