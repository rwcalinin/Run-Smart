$(document).ready(function () {

   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab--active)', function() {
      $(this)
        .addClass('catalog__tab--active').siblings().removeClass('catalog__tab--active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
    });
   
   function toggleSlide(item) {
      $(item).each(function(i) {
         $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content--active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list--active');
         })
      });
   };

   toggleSlide('.catalog-item__link');
   toggleSlide('.catalog-item__back');

   // Modal

   $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn();
   });

   $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
   });

   $('.button--mini').each(function(i) {
      $(this).on('click', function() {
         $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
         $('.overlay, #order').fadeIn();
      })
   });

   // php form

   function valideForms(form){
      $(form).validate({
         rules: {
            name: {
               required: true,
               minlength: 2
            },
            phone: "required",
            email: {
               required: true,
               email: true
            }
         },
            messages: {
               name: {
                  required: "Пожалуйста, введите своё имя",
                  minlength: jQuery.validator.format("Имя должно состоять минимум из {0} символов")
               },
               phone: "Пожалуйста, введите свой номер телефона",
               email: {
                  required: "Пожалуйста, введите адрес E-Mail",
                  email: "Почта должна быть правильного формата"
               }
            }
      });
   }
   
   valideForms('#consultation-form');
   valideForms('#consultation form');
   valideForms('#order form');

   $('form').submit(function(e) {
      e.preventDefault();
      $.ajax({
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
      }).done(function() {
         $(this).find("input").val("");


         $('form').trigger('reset');
      });
      return false;
   });

   // Smooth scroll

   $(window).scroll(function() {
      if ($(this).scrollTop() > 900) {
         $('.pageup').fadeIn();
      } else {
         $('.pageup').fadeOut();
      }
   });

   $("a[href='#up']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
});

});