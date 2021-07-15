const gulp = require('gulp');
const autoPrefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
// const sass = require('gulp-sass');
const sass = require('gulp-sass')(require('node-sass'));
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const del = require('del');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const tildeImporter = require('node-sass-tilde-importer');

// File Paths to Watch
const SCSS_PATH = './_assets/scss/**/*.scss';
const JS_PATH = './_assets/js/**/*.js';
const MAIN_SCSS = './_assets/scss/base.scss';
const CSS_DIST_PATH = './_assets/';
const JS_DIST_PATH = './_assets/';


function stylesDevelop(cb) {
  gulp.src(MAIN_SCSS)
    .pipe(
      plumber(err => {
        console.log(err.message);
        // console.log(`SCSS Compilation Error: Check link ${err.line} in ${err.file}`);
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass({
      importer: tildeImporter
    }))
    .pipe(sourcemaps.write())
    .pipe(autoPrefixer())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(CSS_DIST_PATH));

  cb();
};

function stylesProduction(cb) {
  gulp
    .src(MAIN_SCSS)
    .pipe(
      sass({
        importer: tildeImporter,
        outputStyle: 'compressed'
      })
    )
    .pipe(autoPrefixer())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(CSS_DIST_PATH));

  cb();
};

function scriptsDevelop(cb) {
  gulp.src(JS_PATH)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(JS_DIST_PATH));
  cb();
};

function scriptsProduction(cb) {
  gulp.src(JS_PATH)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(JS_DIST_PATH))
    .pipe(uglify())
    .pipe(gulp.dest(JS_DIST_PATH));
  cb();
};

gulp.task('compress', function() {
  gulp.src(['lib/*.js', 'lib/*.mjs'])
    .pipe(minify())
    .pipe(gulp.dest('dist'))
});


// function clean(cb) {
//   del.sync([JS_DIST_PATH]);
//   del.sync([CSS_DIST_PATH]);
//   cb();
// };

function watchFiles(cb) {
  gulp.watch(SCSS_PATH, {usePolling: true} , stylesDevelop);
  gulp.watch(JS_PATH, {usePolling: true} , scriptsDevelop);
  cb();
}

// exports.clean = clean;
exports.scriptsDevelop = scriptsDevelop;
exports.stylesDevelop = stylesDevelop;
exports.default = gulp.series(stylesDevelop, scriptsDevelop, watchFiles);
exports.watch = gulp.series(stylesDevelop, scriptsDevelop, watchFiles);
exports.build = gulp.series(stylesProduction, scriptsProduction);