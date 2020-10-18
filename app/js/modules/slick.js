import $ from "jquery";
import 'slick-carousel';


$(document).ready(function () {
  $('.slider-main-block').slick({
    arrows: true,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    draggable: true,
    swipe: true,
    touchThreshold: 5,
    touchMove: true,
    waitForAnimate: true,
    centerMode: false,
    variableWidth: false,
    lazyLoad: 'ondemand'
  });

  $('.slider-main-works').slick({
    arrows: true,
    dots: false,
    rows: 1,
    adaptiveHeight: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    initialSlide: 1,
    autoplay: false,
    autoplaySpeed: 4500,
    pauseOnFocus: true,
    pauseOnHover: true,
    draggable: true,
    swipe: true,
    touchThreshold: 5,
    touchMove: true,
    waitForAnimate: true,
    centerMode: false,
    variableWidth: false,
    lazyLoad: 'ondemand',
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          settings: "unslick",
          slidesToShow: 2,
          rows: 2,
          arrows: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          settings: "unslick",
          slidesToShow: 3,
          rows: 2,
          arrows: true,
        }
      }
    ]
  });

  $('.slider-main-reviews').slick({
    arrows: true,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    draggable: true,
    swipe: true,
    touchThreshold: 5,
    touchMove: true,
    waitForAnimate: true,
    centerMode: false,
    variableWidth: false,
    lazyLoad: 'ondemand'
  });

  $('.slider-main-partners').slick({
    arrows: false,
    dots: false,
    adaptiveHeight: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    draggable: true,
    swipe: true,
    touchThreshold: 5,
    touchMove: true,
    waitForAnimate: true,
    centerMode: false,
    variableWidth: true,
    lazyLoad: 'ondemand',
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          settings: "unslick",
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          settings: "unslick",
          slidesToShow: 5,
        }
      }
    ]
  });

  $('.project-portfolio__slider').slick({
    arrows: true,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    easing: 'ease',
    infinite: true,
    initialSlide: 1,
    autoplay: false,
    autoplaySpeed: 4500,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    draggable: true,
    swipe: true,
    touchThreshold: 5,
    touchMove: true,
    waitForAnimate: true,
    centerMode: false,
    variableWidth: false,
    lazyLoad: 'ondemand'
  });


})

