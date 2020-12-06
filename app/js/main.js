$(function () {


  $(".slider-home__items").slick({
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  $(".box-hiden").liTextLength({
    length: 120,
    afterLength: "...",
    fullText: true, //Добавить ссылку для отображения скрытого текста
    moreText: "<br>full text", //Текст ссылки до показа скрытого содержания
    lessText: "<br>hide full text", //Текст ссылки после показа скрытого содержания
  });

  $(".box-limit").clamp({
    clamp: 2, 
    animate: true 
  });

  var containerEl1 = document.querySelector('[data-ref="top-products"]');
  var containerEl2 = document.querySelector('[data-ref="design"]');

  var config = {
    controls: {
      scope: "local",
    },
  };

  var mixer1 = mixitup(containerEl1, config);
  var mixer2 = mixitup(containerEl2, config);
  
});