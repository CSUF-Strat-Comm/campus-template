$(document).ready(function () {

	$('ul.main-nav-list li:has("ul")').addClass('menu-item-has-children');
	$('li.menu-item-has-children > ul').addClass('sub-menu');

  // When interacting with a li that has a sub menu
	$('ul.main-nav-list li:has("ul")').on('mouseover keyup click mouseleave', function(e) {

		// If either -
		// tabbing into the li that has a sub menu
		// hovering over the li that has a sub menu
		if ( e.keyCode === 9 | e.type === 'mouseover' ) {
			// Show sub menu
      $(this).addClass('active');
      $(this).children('a').addClass('active');
			$(this).children('ul').stop(true, true).slideDown('200ms')

		}

		// If mouse leaves li that has sub menu
		if ( e.type === 'mouseleave' ) {
      // hide sub menu
			$(this).removeClass('active')
			$(this).children('a').removeClass('active')
			$(this).children('ul').stop(true, true).slideUp('200ms');
		}

	});

	 // If key is pressed while on the last link in a sub menu
	$('ul.main-nav-list li > ul > li:last-child > a').on('keydown', function(e) {

		// If tabbing out of the last link in a sub menu AND NOT tabbing into another sub menu
		if ( (e.keyCode == 9)) {

			// Close this sub menu
			$(this).parent('li').parent('ul').siblings('a').removeClass('active')
			$(this).parent('li').parent('ul').stop(true, true).slideUp('200ms');

			// If also tabbing out of a third level sub menu 
			// AND there are no other links in the parent (level 2) sub menu
			if ( $(this).parent('li').parent('ul').parent('li').parent('ul').parent('li').children('ul').length > 0 
				&& $(this).parent('li').parent('ul').parent('li').is(':last-child') ) {

					// Close the parent sub menu (level 2) as well
					$(this).parent('li').parent('ul').parent('li').parent('a').removeClass('active')
					$(this).parent('li').parent('ul').parent('li').parent('ul').stop(true, true).slideUp('200ms');
			}

		}
	})

	// Toggle menu with hamburger button
	$('#mobile-menu-toggle').click(function (e) { 

		e.preventDefault();
		$(this).toggleClass('is-active');
		$('#main-nav-list').slideToggle().focus();

		if ($(this).hasClass('is-active')) {
			$(this).attr('aria-expanded', true);
			$(this).children('.hamburger-text').text('Close');
		} else {
			$(this).attr('aria-expanded', false);
			$(this).children('.hamburger-text').text('Menu');
		}

	});
});