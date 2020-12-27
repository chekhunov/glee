const { src, dest, watch, parallel, series } = require("gulp");

const fileinclude = require("gulp-file-include"); //сборка html
const scss = require("gulp-sass"); //сборка css
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const svgSprite = require('gulp-svg-sprite');
const del = require("del");
const browserSync = require("browser-sync").create();
const { pipe } = require("stdout-stream");

function svgSprites() {
  return src(["app/images/icons/**/*.svg", "!app/images/sprite.svg"]) // Э!Ээтоисключает отслеживание файла спрайт свг
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(dest('./app/images'))
}

function html() {
  return src([
    "app/html/pages/index.html",
    "app/html/pages/about.html",
    "app/html/pages/login.html",
    "app/html/pages/terms.html",
    "app/html/pages/shop.html"
  ])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(dest("app/"));
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    notify: false,
  });
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 versions"],
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src([
    "node_modules/jquery/dist/jquery.js",
    "node_modules/slick-carousel/slick/slick.js",
    "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js",
    "node_modules/mixitup/dist/mixitup.js",
    "node_modules/rateyo/src/jquery.rateyo.js",
    "node_modules/ion-rangeslider/js/ion.rangeSlider.js",
    "app/js/jquery.liTextLength.js",
    "app/js/jquery.clamp.js",
    "app/js/main.js",
  ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

//конвертим и уменьшаем вес графических файлов
function images() {
  return src("app/images/**/*.*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/images")); //сюда будут скидываться обработанные файлы из папки images
}

function build() {
  return src(["app/**/*.html", "app/css/style.min.css", "app/js/main.min.js"], {
    base: "app",
  }) //чтоб при переносе файлов в dist они оказались в своих первонос=чальных директориях
    .pipe(dest("dist")); //переносим сюда все сконвертированные файлы проекта которые указаны выше *.html, style.min.js, main.min.js
}

function cleanDist() {
  return del("dist");
}

//монитор событий за кем следит
function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/html/**/*"], html);
  watch(["app/images/icons/**/*.svg"], svgSprites);
}

//для вызова метода из терминала
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.svgSprites = svgSprite;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build); //запускает глобально после команды build стерает папкуdist, конвертит images, после запускает default

exports.default = parallel(html, styles, scripts, browsersync, svgSprites, watching); //запускает функции

//чтоб запустить сборку надо в консоль "gulp build"
