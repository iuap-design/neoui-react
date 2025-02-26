const gulp = require('gulp')
const ignore = require('gulp-ignore');
const fs = require('fs-extra')
const path = require('path')
const babel = require('gulp-babel')
const spawn = require('cross-spawn')
const ts = require('gulp-typescript')
const babelConfig = require('../babel.config')
const tsProject = ts.createProject('../tsconfig.json')
var less = require('gulp-less');
const { alias } = require('../babel.alias');

const ROOT_DIR = '../src'
const LIB_DIR = '../lib'
const ES_DIR = `${LIB_DIR}/es`
const CJS_DIR = `${LIB_DIR}/cjs`

function clean (done) {
  fs.removeSync('lib');
  done()
}

function buildStyle () {
  return gulp.src([`${ROOT_DIR}/**/*.{less,css}`])
    .pipe(ignore.exclude('**/demos/**/*'))
    .pipe(
      less({
        paths: ROOT_DIR,
        relativeUrls: true,
      })
    )
    // .pipe(gulp.dest(ES_DIR))
    .pipe(gulp.dest(CJS_DIR))
}

function buildES (done) {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(ES_DIR))
}

function buildCJS (done) {
  gulp.src([`${ROOT_DIR}/**/*.{png,svg}`])
    .pipe(ignore.exclude('**/demos/**/*'))
    .pipe(gulp.dest(CJS_DIR))

  // 别名路径修改
  // 对@tinper/m的别名处理改为babel-plugin-import处理
  babelConfig.plugins.map(plugin => {
    if (Array.isArray(plugin) && plugin[0] === 'module-resolver') {
      const newAlias = {}
      for (const key in alias) {
        if (key === '@tinper/m$') continue
        newAlias[key] = `.${alias[key]}`
      }
      plugin[1].alias = newAlias
    }
  })

  const _babelConfig = {
    ...babelConfig,
    plugins: [
      // 将import {xxx} from '@tinper/m' 编译成 import xxx from '@components/xxx/src'
      // 解决按需引用时仍会打包全量组件的问题
      [
        'import',
        {
          libraryName: '@tinper/m',
          customName: (name) => `@components/${name}/src`
        },
        '@tinper/m'
      ],
      ...babelConfig.plugins,
      ['@babel/plugin-transform-modules-commonjs'],
      ['./babel-transform-less-to-css']
    ]
  }

  return gulp
    .src([`${ROOT_DIR}/**/*.{ts,tsx,js}`])
    .pipe(ignore.exclude('**/demos/**/*'))
    .pipe(ignore.exclude('**/__tests__/**/*'))
    .pipe(
      babel(_babelConfig)
    )
    .pipe(gulp.dest(CJS_DIR))
}

// function buildUmd (done) {
//   spawn.sync('npm', ['run', 'build']);
//   done()
// }

exports.default = gulp.series(
  clean,
  // buildES,
  buildCJS,
  // buildUmd,
  buildStyle
)
