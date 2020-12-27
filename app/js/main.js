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

  $(".modal__label-box").on("click", function (e) {
    e.preventDefault();
    $(".modal__label-box").toggleClass("modal__label-box--active");
  });

  $(".card__content-btn").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("card__content-btn--active");
  });

  //добавление и удаление класса создается для страницы shop 
  //выбор между list grid
  $(".shop__filter-btn").on("click", function () {
    $(".shop__filter-btn").removeClass(
      "shop__filter-btn--active"
    );
    $(this).addClass("shop__filter-btn--active");
  });

  $(".button-list").on("click", function () {
    $(".card").addClass("card--list");
    $(".pagination").addClass("pagination--list");
  });

  $(".button-grid").on("click", function () {
    $(".card").removeClass("card--list");
    $(".pagination").removeClass("pagination--list");
  });



  $(".slider-home__items").slick({
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  $(".star").rateYo({
    starWidth: "10px",
    normalFill: "#ccccce",
    ratedFill: "#ffcc00",
    readOnly: "true",
  });

  $(".shop-star").rateYo({
    starWidth: "15px",
    normalFill: "#ccccce",
    ratedFill: "#ffcc00",
    readOnly: "true",
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

  $(".filter-price__input").ionRangeSlider({
    type: "double",
    onStart: function (data) {
      $(".filter-price__from").text(data.from);
      $(".filter-price__to").text(data.to);
    },
    onChange: function (data) {
      $(".filter-price__from").text(data.from);
      $(".filter-price__to").text(data.to);
    }
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
