$(function () {
  $(".menu-nav__popup").on("click", function (e) {
    e.preventDefault();
    $(".menu").toggleClass("menu--active");
    $("main").toggleClass("main--active");
  });
  
  $(".menu-nav__btn--find").on("click", function (e) {
    e.preventDefault();
    $(".header__popup").toggleClass("header__popup--active");
  });

  $(".slider-home__items").slick({
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  $(".partners__list").slick({
    centerMode: true,
    centerPadding: "60px",
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
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
    animate: true,
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
