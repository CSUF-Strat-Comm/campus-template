$(function () {
  // initialize accordions
  $('.js-accordion').accordion({ 
    multiselectable: false
  });

  // Add opens in new window icon to all links with _blank target
  $("a[target='_blank']").append('&nbsp;<span class="material-icons-outlined text-size-sm" title="Opens in new window">open_in_new</span>');

  //Sticky Header
  
  //Get current header class so we can restore it later
  var currentClassNames = $('#site-header').attr('class');

  //Don't fire sticky header on landing pages
  if (!$('#site-header').hasClass("header-landing-page")) { 
    $(window).scroll(function() {
      // trigger sticky header when not in mobile viewport
      if ($(window).width() > 767) {

        if( $(this).scrollTop() > 10 ) {
          $("#site-header").removeClass(currentClassNames).addClass("header-fixed");
          setFullMenuHeight();
        } else {
          $("#site-header").removeClass("header-fixed").addClass(currentClassNames);
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