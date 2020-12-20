module.exports = function () {
  $.gulp.task('svg', () => {
    return $gulp.src('./app/images/svg/*.svg')
    .pipe($.grep.svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe($.grep.cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe($.gp.replace('&gt;', '>'))
    .pipe($.gp.svgSprite({
      mode: {
        symbol: {
          sprite: "sprite.svg"
        }
      }
    }))
    .pipe($.gulp.dest('./app/'))
  });
};