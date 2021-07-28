$(document).ready(function () {
  mediaCheck({
    media: '(max-width: 767px)', //our mobile breakpoint
    entry: function() { //actions for entering mobile

      $('#mobile-menu-toggle').attr('aria-hidden', false);
      $('#mobile-menu-toggle').attr('aria-disabled', false);
      $('#mobile-menu-toggle').attr('disabled', false);

      $('#global-nav').css('display', 'none');
      $('#main-nav-list').append($('#global-nav li').addClass('global-nav-item'));

      $('#open-search-container').insertAfter('#mobile-menu-toggle');

      $('#main-nav-list').css('display', 'none');

    },
    exit: function() { //actions for extiing mobile
      
      $('#mobile-menu-toggle').attr('aria-hidden', true);
      $('#mobile-menu-toggle').attr('aria-disabled', true);
      $('#mobile-menu-toggle').attr('disabled', true);
      $('#mobile-menu-toggle').removeClass('is-active');

      $('#global-nav').css('display', 'block');
      $('#global-nav ul').prepend($('#main-nav-list .global-nav-item').removeClass('global-nav-item'));
      $('#global-nav ul li:last-child').append($('#open-search-container'));

      $('#main-nav-list').css('display', 'block');

    }
  });

});

