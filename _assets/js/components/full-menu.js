
  $(window).on('load', function(){
  
    setFullMenuHeight();
  
  });

  function setFullMenuHeight() {
    var headerHeight = $('#site-header').outerHeight(true);

    if ( $('html').attr('data-breakpoint') === 'mobile' ) {

      $('#full-menu').css('height', '80%');
      $('#full-menu').css('bottom', '9%');

    } else {
    
      $('#full-menu').css('height', 'calc(100vh - ' + headerHeight + 'px)');
      $('#full-menu').css('top', headerHeight + 'px');
    
    }
  }

  // Toggle menu with hamburger button
	$('#full-menu-toggle').click(function (e) { 
		e.preventDefault();

    if ( $('html').attr('data-breakpoint') === 'mobile' ) {
      closeSearchContainer(tabswitch = true);
      closeMobileMenu(tabswitch = true);
    }

		$(this).toggleClass('is-active');


		if ($(this).hasClass('is-active')) {
      openFullMenu();
		} else {
      closeFullMenu();
		}

	});

  function openFullMenu() {
    if ( $('html').attr('data-breakpoint') === 'mobile' ) {
      $("body").addClass("screen-tint");
    }

    $('#full-menu-toggle').attr('aria-expanded', true);
    $('#full-menu').css('display', 'flex');
    $('#full-menu').animate({
      opacity: 1
    }, 200);
    $('#full-menu').css('transform', 'translateY(0)');
    $("body").addClass("modaal-noscroll");
  }

  function closeFullMenu(tabswitch = false) {
    $('#full-menu-toggle').attr('aria-expanded', false);

    $('#full-menu').css('transform', 'translateY(-100vh)');
    $('#full-menu').animate({
      opacity: 0
    }, 300, function() {
      // Animation complete.
      $('#full-menu').css('display', 'none');
      if ( tabswitch === false ) {
        $("body").removeClass("modaal-noscroll");
      }
      if ( $('html').attr('data-breakpoint') === 'mobile' && tabswitch === false ) {
        $("body").removeClass("screen-tint");
      }
      $('#full-menu-toggle').removeClass('is-active');
    });
  }
