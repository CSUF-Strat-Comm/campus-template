$(function () {
  // initialize accordions
  $('.js-accordion').accordion({ 
    multiselectable: false
  });

  // Add opens in new window icon to all links with _blank target
  $("a[target='_blank']").append('&nbsp;<span class="material-icons-outlined text-size-sm" aria-label="Opens in new window">open_in_new</span>');

  //Sticky Header
  
  //Get current header class so we can restore it later
  var currentClassNames = $('#site-header').attr('class');

  if ((!$('#site-header').hasClass("header-landing-page")) && !$('#site-header').hasClass("header-homepage") && !$('#site-header').hasClass("disable-sticky-header")) { 
    var height = $('#site-header').outerHeight();
    
    // only on desktop
    if ($(window).width() > 767) {

      $('body').css('padding-top', height);
      $('#site-header').css({
        "position": "fixed", 
        "top": "0px",
        "left": "0px",
        "width": "100%",
        "z-index": "100",
      });

    }
  }

  //Don't fire sticky header on landing pages
  if (!$('#site-header').hasClass("header-landing-page") && !$('#site-header').hasClass("disable-sticky-header")) { 
    $(window).scroll(function() {
      // trigger sticky header when not in mobile viewport
      if ($(window).width() > 767) {

        if( $(this).scrollTop() > 20 ) {
          $("#site-header").removeClass(currentClassNames).stop(true, true).addClass("header-fixed").addClass(currentClassNames);
          setFullMenuHeight();
        } else {
          $("#site-header").removeClass("header-fixed").stop(true, true).addClass(currentClassNames);
          setFullMenuHeight();
        }
  
      }
    })
  }

  //Dynamic copyright year
  document.getElementById("copyright-year").innerHTML = new Date().getFullYear()

  // initialize scroll animations
  $('.animate-on-scroll').scrolla({
    once: true, // only once animation play on scroll
  });

});