var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var lib = require('bower-files')();
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');

gulp.task('typescript', function(){
    return gulp.src('appScripts/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            declaration: false,
            out: 'sources.js',
            target: 'ES5'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('libs', function(){
    return gulp.src(['bower_components/jQuery/dist/jquery.js', 
    'bower_components/angular/angular.js', 
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/datatables.net/js/jquery.dataTables.js',
    'bower_components/angular-datatables/dist/angular-datatables.js'])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('dist'));
})

gulp.task('sass', function () {
    return gulp.src('styles/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist'));
  });


gulp.task('watch', function(){
    gulp.watch('appScripts/**/*.ts', ['typescript']);
    gulp.watch('styles/**/*.scss', ['sass']);
})

gulp.task('web-server', function () {
    gulp.src('.')
      .pipe(server({
        livereload: false,
        directoryListing: false,
        open: true,
        log: 'debug',
        clientConsole: false,
        port: 8080,
        host: 'localhost',
        middleware: function (connect, opt) {return [historyApiFallback()];}
      }));
  });

gulp.task('default', ['libs', 'typescript', 'watch', 'web-server', 'sass']);