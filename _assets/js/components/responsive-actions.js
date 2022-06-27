$(document).ready(function () {
  mediaCheck({
    media: '(max-width: 767px)', //our mobile breakpoint
    entry: function() { //actions for entering mobile

      $('html').attr('data-breakpoint', 'mobile');

      $('#mobile-menu-toggle').attr('aria-hidden', false);
      $('#mobile-menu-toggle').attr('aria-disabled', false);
      $('#mobile-menu-toggle').attr('disabled', false);

      $('#global-nav').css('display', 'none');

      $('#main-nav').append('<div id="mobile-nav"><ul id="mobile-nav-list"></ul></div>');

      $('#mobile-nav-list').prepend( $('#mobile-menu-toggle') );
      $('#mobile-menu-toggle').wrap('<li></li>');
      // $('#mobile-nav-list li:nth-child(2)').append( $('#open-search-container') );
      // $('#open-search-container').insertAfter('#mobile-menu-toggle');
      $('#mobile-nav-list').append($('#global-nav li').addClass('global-nav-item'));

      $('#open-search-container').prepend( $('#open-search-container .material-icons') );
      $('#full-menu-toggle').prepend( $('#full-menu-toggle .material-icons') );
      $('#full-menu-toggle .material-icons').text('list');


     
      // $('label.theme-toggle').insertAfter('#mobile-menu-toggle');

      $('#main-nav-list').css('display', 'none');

    },
    exit: function() { //actions for extiing mobile

      $('html').attr('data-breakpoint', 'tablet-desktop');

      $('body').removeClass('modaal-noscroll');
      $('body').removeClass('mobile-nav-tint');

      
      $('#mobile-menu-toggle').attr('aria-hidden', true);
      $('#mobile-menu-toggle').attr('aria-disabled', true);
      $('#mobile-menu-toggle').attr('disabled', true);
      $('#mobile-menu-toggle').removeClass('is-active');

      $('#global-nav').css('display', 'block');
      $('#global-nav ul').prepend($('#mobile-nav-list .global-nav-item').removeClass('global-nav-item'));
      // $('#global-nav ul li:nth-last-child(2)').append($('#open-search-container'));
      // $('#global-nav ul li:last-child').append($('label.theme-toggle'));

      $('#main-nav').prepend( $('#mobile-menu-toggle') );

      $('#open-search-container').append( $('#open-search-container .material-icons') );
      $('#full-menu-toggle').append( $('#full-menu-toggle .material-icons') );
      $('#full-menu-toggle .material-icons').text('arrow_drop_down');

      $('#mobile-nav').remove();

      $('#main-nav-list').css('display', 'block');

    }
  });

});

