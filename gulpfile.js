'use strict';
const { src, dest, watch, series, parallel } = require('gulp');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woff = require('gulp-ttf2woff');
const fonter = require('gulp-fonter');
const del = require('del');
//const rename = require('gulp-rename');
const pug = require('gulp-pug');
const prettyHtml = require('gulp-pretty-html');
const sass = require('gulp-sass');
const postCss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const autoPrefixer = require('autoprefixer');
const mqPacker = require('css-mqpacker');
const cssNano = require('cssnano');
const webpack = require('webpack-stream');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const webpCss = require('gulp-webp-css');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const browserSync = require('browser-sync').create();

//configurations
const isProd = true;
const isDev = !isProd;
const projectFolder = require('path').basename(__dirname);
const sourceFolder = 'app';
let path = {
  app: {
    html: `${sourceFolder}/pug/*.pug`,
    css: `${sourceFolder}/sass/style.sass`,
    cssVendor: `${sourceFolder}/sass/style-vendors.sass`,
    js: `${sourceFolder}/js/app.js`,
    img: `${sourceFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    icons: `${sourceFolder}/icons-sprite/*.svg`,
    fonts: `${sourceFolder}/fonts/**/*.ttf`,
    assets: `${sourceFolder}/assets/**/*`
  },
  build: {
    html: `${projectFolder}/`,
    css: `${projectFolder}/css/`,
    js: `${projectFolder}/js/`,
    img: `${projectFolder}/img/`,
    fonts: `${projectFolder}/fonts/`,
    assets: `${projectFolder}/assets/`
  },
  watch: {
    html: `${sourceFolder}/pug/**/*.pug`,
    css: `${sourceFolder}/sass/**/*.sass`,
    cssVendor: `${sourceFolder}/sass/style-vendors.sass`,
    js: `${sourceFolder}/js/**/*.js`,
    img: `${sourceFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    icons: `${sourceFolder}/icons-sprite/*.svg`,
    favicon: `${sourceFolder}/img/favicon.png}`,
    fonts: `${sourceFolder}/fonts/**/*.ttf`,
    assets: `${sourceFolder}/assets/**/*`
  },
  clean: `./${projectFolder}/`
};
// WEBPACK CONFIG
const webpackConfig = {
  mode: isDev? 'development' : 'production',
  output: {
    filename: 'script.js'
  },
  watch: false,
  devtool: isDev? "eval-source-map" : 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      }
    ]
  }
}
// end configurations

// TASKS-----!!!!!----------------------------------------------------------
function browserSyncSet() {
  browserSync.init({
    server: {
      baseDir: `./${projectFolder}/`
    },
    port: 4000,
    notify: false
  })
}
function clean() {
  return del([path.clean]);
}
function assetsCopy() {
  return src(path.app.assets)
    .pipe(dest(path.build.assets))
}
function iconSprite() {
  return src(path.app.icons)
    .pipe(svgSprite({
      mode: {
        stack: {
          dest: 'icons-sprite/',
          sprite: 'icons.svg',
          dimensions: "",
          prefix: "svg-%s",
          render: {
            scss: false
          },
          example: false
        }
      },
    }))
    .pipe(dest(path.build.img))
}
function imgCompiler() {
  return src(path.app.img)
    .pipe(webp({quality: 85}))
    .pipe(dest(path.build.img))
    .pipe(src(path.app.img))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(dest(path.build.img))
    .pipe(browserSync.stream());
}
function htmlCompiler() {
  return src(path.app.html)
    .pipe(pug())
    .pipe(webpHTML())
    .pipe(gulpIf(isProd, prettyHtml({
      indent_size: 2
    })))
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}
function vendorsStylesCompiler() {
  return src(path.app.cssVendor)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
}
function stylesCompiler() {
  return src(path.app.css)
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(webpCss())
    .pipe(postCss([
      autoPrefixer({browserlist: ['last 2 versions', '> 2%'], cascade: true}),
      mqPacker({
        sort: true
      }),
      cssNano({
        preset: 'default',
      })
    ]))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
}
function jsCompiler() {
  return src(path.app.js)
    .pipe(webpack(webpackConfig))
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
}
function ttfToWoffConverter() {
  src(path.app.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));
  return src(path.app.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.stream());
}
function otfToTtf() {
  return src(path.app.fonts + '*.otf')
    .pipe(fonter({
      formats: ['ttf']
    }))
    .pipe(dest(path.app.fonts))
}
function nothing(cb) {
  cb();
}

// Відслідковування змін файлів в папці APP (WATCH)-------------------------
function watcher() {
  watch(path.watch.html, htmlCompiler);
  watch(path.watch.css, stylesCompiler);
  watch(path.watch.cssVendor, vendorsStylesCompiler);
  watch(path.watch.js, jsCompiler);
  watch(path.watch.fonts, ttfToWoffConverter);
  watch(path.watch.img, imgCompiler);
  watch(path.watch.icons, iconSprite);
  watch(path.watch.assets, assetsCopy);
}
//--------------------------------------------------------------------------
exports.otfToTtf = otfToTtf;
exports.default = series(clean, parallel(ttfToWoffConverter, htmlCompiler, vendorsStylesCompiler, stylesCompiler, jsCompiler, imgCompiler, iconSprite, assetsCopy), isDev ? parallel(watcher, browserSyncSet) : nothing);
