$(function () {
  $('.testimonials__slider').slick({
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1
  });

  // Form
  var $input;

  function onInputFocus(event) {
    var $target = $(event.target);
    var $parent = $target.parent();
    $parent.addClass('input--filled');
  };

  function onInputBlur(event) {
    var $target = $(event.target);
    var $parent = $target.parent();

    if (event.target.value.trim() === '') {
      $parent.removeClass('input--filled');
    }
  };

  $(document).ready(function () {
    $input = $('.input__field');

    // in case there is any value already
    $input.each(function () {
      if ($input.val().trim() !== '') {
        var $parent = $input.parent();
        $parent.addClass('input--filled');
      }
    });

    $input.on('focus', onInputFocus);
    $input.on('blur', onInputBlur);
  });


  // Fixed header
 let header = $("#header");
 let intro = $("#header");
 // let introH = intro.height();       <----/* Высота элемента без падингов */
 let introH = intro.innerHeight();          /* Высота элемента с падингами */
 let scrollPos = $(window).scrollTop();     /* Позиция скролла от самого верха */
 checkScroll(scrollPos, introH);
 let nav = $("#nav")
 let navToggle = $("#navToggle");

 $(window).on("scroll resize", function () {         /* Выполнение действий при скролле, (load) загрузке изменении размера страницы */
   introH = intro.innerHeight();
   scrollPos = $(this).scrollTop();                    /* Обновить переменную на текущую позицию скролла */
   checkScroll(scrollPos, introH);

 });

 function checkScroll(scrollPos, introH) {
   if (scrollPos > introH) {                           /* Если высота скролла больше чем высота introH, то добавляется класс "fixed", если высота нет то класс убирается */
     header.addClass("fixed");
   } else {
     header.removeClass("fixed");
   }
 }

 // Smooth scroll
 $("[data-scroll").on("click", function (event) {              /* Event event.preventDefault - отменяет стандратное поведение ссылки при клике  */
  event.preventDefault();

  let elementID = $(this).data("scroll");                   /* Получить ID блока по которому кликнули */
  let elementOffset = $(elementID).offset().top;            /* Получить отступ от верха страницы  */

  nav.removeClass("show")

  // console.log(elementOffset);

  $("html, body").animate({                                 /* При клике плавно скролит до элемента по которому кликнули */
    scrollTop: elementOffset - 150                           /* - 50px  */
  }, 700);                                                /* Скорость прокрутки где 1000 - 1 секунда */
});


});