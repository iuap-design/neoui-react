const gulp = require('gulp')
const fs = require('fs-extra')
const path = require('path')
const babel = require('gulp-babel')
const spawn = require('cross-spawn')
const babelConfig = require('./babel.config')

function clean (done) {
  fs.removeSync(`lib`);
  done()
}

function buildCJS (done) {
  return gulp
    .src([`src/icons/*.{ts,tsx,js}`])
    .pipe(
      babel({
        ...babelConfig,
        plugins: [
          ['./babel-transform-tsx-to-js']
        ]
      })
    )
    .pipe(gulp.dest('lib/cjs/'))
  // done()
}

function copyIconfont () {
  return gulp.src(['src/iconfont/iconfont.js'])
    .pipe(gulp.dest('./lib/iconfont'))
}

exports.default = gulp.series(
  clean,
  buildCJS,
  copyIconfont
)
