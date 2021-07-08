$(document).ready(function () {
  mediaCheck({
    media: '(max-width: 767px)', //our mobile breakpoint
    entry: function() { //actions for entering mobile

      $('#mobile-menu-toggle').attr('aria-hidden', false);
      $('#mobile-menu-toggle').attr('aria-disabled', false);
      $('#mobile-menu-toggle').attr('disabled', false);

    },
    exit: function() { //actions for extiing mobile
      
      $('#mobile-menu-toggle').attr('aria-hidden', true);
      $('#mobile-menu-toggle').attr('aria-disabled', true);
      $('#mobile-menu-toggle').attr('disabled', true);

    }
  });

});

