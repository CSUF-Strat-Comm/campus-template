
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
$(document).ready(function () {
 
  $('.modal-image').modaal({
    type: 'image'
  });

  $('.modal-inline').modaal();

  $('.modal-video').modaal({
    type: 'video'
  });
  
});
$('ul.main-nav-list li:has("ul")').addClass('menu-item-has-children');
$('li.menu-item-has-children > ul').addClass('sub-menu');
	
$(document).ready(function () {

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

});

// Toggle menu with hamburger button
$('#mobile-menu-toggle').click(function (e) { 

	e.preventDefault();

	closeFullMenu(tabswitch = true);
	closeSearchContainer(tabswitch = true);
	// mobileMenuToggle();

	$(this).toggleClass('is-active');

	if ($(this).hasClass('is-active')) {
		openMobileMenu();
	} else {
		closeMobileMenu();
	}
	
});

function mobileMenuToggle() {
	$('#mobile-menu-toggle').toggleClass('is-active');
	$('#main-nav-list').slideToggle().focus();
	$("body").toggleClass("modaal-noscroll screen-tint");

	if ($('#mobile-menu-toggle').hasClass('is-active')) {
		$('#mobile-menu-toggle').attr('aria-expanded', true);
		$('#mobile-menu-toggle').children('.hamburger-text').text('Close');
	} else {
		$('#mobile-menu-toggle').attr('aria-expanded', false);
		$('#mobile-menu-toggle').children('.hamburger-text').text('Menu');
	}
}

function openMobileMenu() {
	$('#mobile-menu-toggle').addClass('is-active');
	$('#main-nav-list').slideDown().focus();
	$("body").addClass("modaal-noscroll screen-tint");
	$('#mobile-menu-toggle').attr('aria-expanded', true);
	$('#mobile-menu-toggle').children('.hamburger-text').text('Close');
}

function closeMobileMenu(tabswitch = false) {
	$('#mobile-menu-toggle').removeClass('is-active');
	$('#main-nav-list').slideUp();
	if ( tabswitch === false ) {
		$("body").removeClass("modaal-noscroll");
	}
	if ( $('html').attr('data-breakpoint') === 'mobile' && tabswitch === false ) {
		$("body").removeClass("screen-tint");
	}
	$('#mobile-menu-toggle').attr('aria-expanded', false);
	$('#mobile-menu-toggle').children('.hamburger-text').text('Menu');
}
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



  $("#open-search-container").click(function (e) { 
    e.preventDefault();
    openSearchContainer();

    if ( $('html').attr('data-breakpoint') === 'mobile' ) {
      closeFullMenu(tabswitch = true);
      closeMobileMenu(tabswitch = true);
    }

  });

  $("#close-search-container").click(function (e) { 
    e.preventDefault();
    closeSearchContainer();
  });

  function openSearchContainer() {
    if( $('#search-container').hasClass('open') ) {

      if ( $('html').attr('data-breakpoint') === 'mobile' ) {
        $("body").removeClass("screen-tint");
        $("#open-search-container").children('span.material-icons').text('search');
      }
      $("body").removeClass("modaal-noscroll");
  
      $('#search-container').delay(100).queue(function(next ){
        $(this).removeClass('open');
        // $(this).addClass('hidden');
        next();
      });
  
      $("body").removeClass("modaal-noscroll");
      $("#open-search-container").focus();

    } else {

      if ( $('html').attr('data-breakpoint') === 'mobile' ) {
        $("body").addClass("screen-tint");
        $(this).children('span.material-icons').text('close');
      }
      $("body").addClass("modaal-noscroll");
  
      $('#search-container').removeClass("hidden").delay(100).queue(function(next ){
        $(this).addClass('open');
        next();
      });
      
      $("body").addClass("modaal-noscroll");
      $("#gsc-i-id1").attr("placeholder", "Enter search terms");
      $("#gsc-i-id2").attr("placeholder", "Enter search terms");
      $("#gsc-i-id1").focus(); 

    }

    // $("#search-container").animate({
    //   top: 0,
    // }, 500, function() {
    //   // Animation complete.
    //   $("body").addClass("modaal-noscroll");
    //   $("#search-term").focus();
    // });
  }

  function closeSearchContainer(tabswitch = false) {

    if ( $('html').attr('data-breakpoint') === 'mobile' && tabswitch === false ) {
      $("body").removeClass("screen-tint");
    }

    if ( $('html').attr('data-breakpoint') === 'mobile' ) {
      $("#open-search-container").children('span.material-icons').text('search');
    }

    if ( tabswitch === false ) {
      $("body").removeClass("modaal-noscroll");
    }

    $('#search-container').removeClass("closed").delay(100).queue(function(next ){
      $(this).removeClass('open');
      // $(this).addClass('hidden');
      next();
    });
    
    if ( tabswitch === false ) {
      $("#open-search-container").focus();
    }
    // $("#search-container").addClass("hidden");

    
    // $("#search-container").animate({
    //   top: "-100vh",
    // }, 500, function() {
    //   // Animation complete.
    //   $("body").removeClass("modaal-noscroll");
    //   $("#open-search-container").focus();
    //   $("#search-container").addClass("hidden");
    // });
  }

  $('input[type=radio][name=search-type]').change(function() {
    var searchType = this.value;

    if (searchType == 'ituffy') {
      window.open('https://ituffy-webappservice.mybluemix.net/', '_blank', 'width=400,height=575');
      return false;
    } else {

      $('.search-field-container, .search-results-container').hide();
      $('.search-field-container, .search-results-container').removeClass('hidden');

      $( '#' + searchType + '-search-field' ).show();
      $( '#' + searchType + '-search-results' ).show();

      switch (searchType) {
        case 'csuf':
          $("#gsc-i-id2").focus();
        // console.log(searchType);
          break;
        case 'site':
          $("#gsc-i-id1").focus();
        // console.log(searchType);
          break;
        case 'people':
          $("#people-search-term").focus();
        // console.log(searchType);
          break;
      }


    }
  });

  $("#people-search-form").on("submit", function(e){
    e.preventDefault();

    var terms = $('#people-search-term').val();

    console.log('form submit');


    // Get HTML from page
    $.get( 'https://cors-proxy.htmldriven.com/?url=https://apps.fullerton.edu/directory/?Search=' + terms, function( html ) {

      // Loop through elements you want to scrape content from
      $(html).find("ul#lvPeople_itemPlaceholderContainer").find("li").each( function(){

          var text = $(this).text();
          // Do something with content
          $('#people-search-results').append(text);

      })

    });

  })

$(function(){
  $('.image-slider').bxSlider({
    minSlides: 3,
    maxSlides: 3,
    moveSlides: 1,
    slideWidth: 600,
    slideMargin: 10
  });
});
$(document).ready(function () {

  // Check for theme cookie
  if( Cookies.get('theme') ) {

    // Use theme cookie value to set theme
    // console.log('theme cookie set');
    $('html').attr('data-theme', Cookies.get('theme'));

    if (Cookies.get('theme') === 'dark') {
      $('#theme-toggle').prop('checked', true);
    }

  } else {

    // console.log('no theme cookie set');

    // no theme cookie set
    // check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // console.log('dark color scheme')
      $('#theme-toggle').prop('checked', true);
      $('html').attr('data-theme', 'dark');
    } else {
      $('html').attr('data-theme', 'default');
    }

  }

  $('#theme-toggle').change(function (e) { 
    e.preventDefault();

    if ( $(this).prop('checked') ) {
      $('html').attr('data-theme', 'dark');
      Cookies.set('theme', 'dark')
    } else {
      $('html').attr('data-theme', 'default');
      Cookies.set('theme', 'default')
    }
    
  });

  

});
/*
 * jQuery Accessible Accordion system, using ARIA
 * @version v2.6.1
 * Website: https://a11y.nicolas-hoffmann.net/accordion/
 * License MIT: https://github.com/nico3333fr/jquery-accessible-accordion-aria/blob/master/LICENSE
 */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function($) {
    'use strict';

    var defaultConfig = {
        headersSelector: '.js-accordion__header',
        panelsSelector: '.js-accordion__panel',
        buttonsSelector: 'button.js-accordion__header',
        buttonsGeneratedContent: 'text',
        button: $('<button></button>', {
            class: 'js-accordion__header',
            type: 'button'
        }),
        buttonSuffixId: '_tab',
        multiselectable: true,
        prefixClass: 'accordion',
        headerSuffixClass: '__title',
        buttonSuffixClass: '__header',
        panelSuffixClass: '__panel',
        direction: 'ltr',
        accordionPrefixId: 'accordion'
    };

    var Accordion = function($el, options) {
        this.options = $.extend({}, defaultConfig, options);

        this.$wrapper = $el;
        this.$panels = $(this.options.panelsSelector, this.$wrapper);

        this.initAttributes();
        this.initEvents();
    };

    Accordion.prototype.initAttributes = function() {
        this.$wrapper.attr({
            'role': 'tablist',
            'aria-multiselectable': this.options.multiselectable.toString()
        }).addClass(this.options.prefixClass);

        // id generated if not present
        if (!this.$wrapper.attr('id')) {
            var index_lisible = Math.random().toString(32).slice(2, 12);
            this.$wrapper.attr('id', this.options.accordionPrefixId + '-' + index_lisible);
        }

        this.$panels.each($.proxy(function(index, el) {
            var $panel = $(el);
            var $header = $(this.options.headersSelector, $panel);
            var $button = this.options.buttonsGeneratedContent === 'html' ? this.options.button.clone().html($header.html()) : this.options.button.clone().text($header.text());

            $header.addClass(this.options.prefixClass + this.options.headerSuffixClass);
            $panel.before($button);

            var panelId = $panel.attr('id') || this.$wrapper.attr('id') + '-' + index;
            var buttonId = panelId + this.options.buttonSuffixId;

            $button.attr({
                'aria-controls': panelId,
                'aria-expanded': 'false',
                'role': 'tab',
                'id': buttonId,
                'aria-selected': 'false'
            }).addClass(this.options.prefixClass + this.options.buttonSuffixClass);

            $panel.attr({
                'aria-labelledby': buttonId,
                'role': 'tabpanel',
                'id': panelId,
                'aria-hidden': 'true'
            }).addClass(this.options.prefixClass + this.options.panelSuffixClass);

            // if opened by default
            if ($panel.attr('data-accordion-opened') === 'true') {
                $button.attr({
                    'aria-expanded': 'true',
                    'data-accordion-opened': null
                });

                $panel.attr({
                    'aria-hidden': 'false'
                });
            }


        }, this));

        this.$buttons = $(this.options.buttonsSelector, this.$wrapper);
    };

    Accordion.prototype.initEvents = function() {
        this.$wrapper.on('focus', this.options.buttonsSelector, $.proxy(this.focusButtonEventHandler, this));

        this.$wrapper.on('click', this.options.buttonsSelector, $.proxy(this.clickButtonEventHandler, this));

        this.$wrapper.on('keydown', this.options.buttonsSelector, $.proxy(this.keydownButtonEventHandler, this));
    };

    Accordion.prototype.focusButtonEventHandler = function(e) {
        var $target = $(e.target);
        var $button = $target.is('button') ? $target : $target.closest('button');

        $(this.options.buttonsSelector, this.$wrapper).attr({
            'aria-selected': 'false'
        });

        $button.attr({
            'aria-selected': 'true'
        });
    };

    Accordion.prototype.clickButtonEventHandler = function(e) {
        var $target = $(e.target);
        var $button = $target.is('button') ? $target : $target.closest('button');
        var $panel = $('#' + $button.attr('aria-controls'));

        this.$buttons.attr('aria-selected', 'false');
        $button.attr('aria-selected', 'true');

        // opened or closed?
        if ($button.attr('aria-expanded') === 'false') { // closed
            $button.attr('aria-expanded', 'true');
            $panel.attr('aria-hidden', 'false');
        } else { // opened
            $button.attr('aria-expanded', 'false');
            $panel.attr('aria-hidden', 'true');
        }

        if (this.options.multiselectable === false) {
            this.$panels.not($panel).attr('aria-hidden', 'true');
            this.$buttons.not($button).attr('aria-expanded', 'false');
        }

        setTimeout(function() {
            $button.focus();
        }, 0);

        e.stopPropagation();
        e.preventDefault();
    };

    Accordion.prototype.keydownButtonEventHandler = function(e) {
        var $target = $(e.target);
        var $button = $target.is('button') ? $target : $target.closest('button');
        var $firstButton = this.$buttons.first();
        var $lastButton = this.$buttons.last();
        var index = this.$buttons.index($button);

        $target = null;

        var k = this.options.direction === 'ltr' ? {
            prev: [38, 37], // up & left
            next: [40, 39], // down & right
            first: 36, // home
            last: 35 // end
        } : {
            prev: [38, 39], // up & left
            next: [40, 37], // down & right
            first: 36, // home
            last: 35 // end
        };

        var allKeyCode = [].concat(k.prev, k.next, k.first, k.last);

        if ($.inArray(e.keyCode, allKeyCode) >= 0 && !e.ctrlKey) {
            this.$buttons.attr({
                'aria-selected': 'false'
            });


            if (e.keyCode === 36) {
                $target = $firstButton;
            }
            // strike end in the tab => last tab
            else if (e.keyCode === 35) {
                $target = $lastButton;
            }
            // strike up or left in the tab => previous tab
            else if ($.inArray(e.keyCode, k.prev) >= 0) {
                // if we are on first one, activate last
                $target = $button.is($firstButton) ? $lastButton : this.$buttons.eq(index - 1);
            }
            // strike down or right in the tab => next tab
            else if ($.inArray(e.keyCode, k.next) >= 0) {
                // if we are on last one, activate first
                $target = $button.is($lastButton) ? $firstButton : this.$buttons.eq(index + 1);
            }

            if ($target !== null) {
                this.goToHeader($target);
            }

            e.preventDefault();
        }
    };

    Accordion.prototype.goToHeader = function($target) {
        if ($target.length !== 1) {
            return;
        }

        $target.attr({
            'aria-selected': 'true'
        });

        setTimeout(function() {
            $target.focus();
        }, 0);
    };


    var PLUGIN = 'accordion';

    $.fn[PLUGIN] = function(params) {
        var options = $.extend({}, $.fn[PLUGIN].defaults, params);


        return this.each(function() {
            var $el = $(this);

            var specificOptions = {
                multiselectable: $el.attr('data-accordion-multiselectable') === 'none' ? false : options.multiselectable,
                prefixClass: typeof($el.attr('data-accordion-prefix-classes')) !== 'undefined' ? $el.attr('data-accordion-prefix-classes') : options.prefixClass,
                buttonsGeneratedContent: typeof($el.attr('data-accordion-button-generated-content')) !== 'undefined' ? $el.attr('data-accordion-button-generated-content') : options.buttonsGeneratedContent,
                direction: $el.closest('[dir="rtl"]').length > 0 ? 'rtl' : options.direction
            };
            specificOptions = $.extend({}, options, specificOptions);

            $el.data[PLUGIN] = new Accordion($el, specificOptions);
        });
    };

    $.fn[PLUGIN].defaults = defaultConfig;

}));

/**
 * bxSlider v4.2.12
 * Copyright 2013-2015 Steven Wanderski
 * Written while drinking Belgian ales and listening to jazz
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

;(function($) {

  var defaults = {

    // GENERAL
    mode: 'horizontal',
    slideSelector: '',
    infiniteLoop: true,
    hideControlOnEnd: false,
    speed: 500,
    easing: null,
    slideMargin: 0,
    startSlide: 0,
    randomStart: false,
    captions: false,
    ticker: false,
    tickerHover: false,
    adaptiveHeight: false,
    adaptiveHeightSpeed: 500,
    video: false,
    useCSS: true,
    preloadImages: 'visible',
    responsive: true,
    slideZIndex: 50,
    wrapperClass: 'bx-wrapper',

    // TOUCH
    touchEnabled: true,
    swipeThreshold: 50,
    oneToOneTouch: true,
    preventDefaultSwipeX: true,
    preventDefaultSwipeY: false,

    // ACCESSIBILITY
    ariaLive: true,
    ariaHidden: true,

    // KEYBOARD
    keyboardEnabled: false,

    // PAGER
    pager: true,
    pagerType: 'full',
    pagerShortSeparator: ' / ',
    pagerSelector: null,
    buildPager: null,
    pagerCustom: null,

    // CONTROLS
    controls: true,
    nextText: 'Next',
    prevText: 'Prev',
    nextSelector: null,
    prevSelector: null,
    autoControls: false,
    startText: 'Start',
    stopText: 'Stop',
    autoControlsCombine: false,
    autoControlsSelector: null,

    // AUTO
    auto: false,
    pause: 4000,
    autoStart: true,
    autoDirection: 'next',
    stopAutoOnClick: false,
    autoHover: false,
    autoDelay: 0,
    autoSlideForOnePage: false,

    // CAROUSEL
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 0,
    slideWidth: 0,
    shrinkItems: false,

    // CALLBACKS
    onSliderLoad: function() { return true; },
    onSlideBefore: function() { return true; },
    onSlideAfter: function() { return true; },
    onSlideNext: function() { return true; },
    onSlidePrev: function() { return true; },
    onSliderResize: function() { return true; }
  };

  $.fn.bxSlider = function(options) {

    if (this.length === 0) {
      return this;
    }

    // support multiple elements
    if (this.length > 1) {
      this.each(function() {
        $(this).bxSlider(options);
      });
      return this;
    }

    // create a namespace to be used throughout the plugin
    var slider = {},
    // set a reference to our slider element
    el = this,
    // get the original window dimens (thanks a lot IE)
    windowWidth = $(window).width(),
    windowHeight = $(window).height();

    // Return if slider is already initialized
    if ($(el).data('bxSlider')) { return; }

    /**
     * ===================================================================================
     * = PRIVATE FUNCTIONS
     * ===================================================================================
     */

    /**
     * Initializes namespace settings to be used throughout plugin
     */
    var init = function() {
      // Return if slider is already initialized
      if ($(el).data('bxSlider')) { return; }
      // merge user-supplied options with the defaults
      slider.settings = $.extend({}, defaults, options);
      // parse slideWidth setting
      slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
      // store the original children
      slider.children = el.children(slider.settings.slideSelector);
      // check if actual number of slides is less than minSlides / maxSlides
      if (slider.children.length < slider.settings.minSlides) { slider.settings.minSlides = slider.children.length; }
      if (slider.children.length < slider.settings.maxSlides) { slider.settings.maxSlides = slider.children.length; }
      // if random start, set the startSlide setting to random number
      if (slider.settings.randomStart) { slider.settings.startSlide = Math.floor(Math.random() * slider.children.length); }
      // store active slide information
      slider.active = { index: slider.settings.startSlide };
      // store if the slider is in carousel mode (displaying / moving multiple slides)
      slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1 ? true : false;
      // if carousel, force preloadImages = 'all'
      if (slider.carousel) { slider.settings.preloadImages = 'all'; }
      // calculate the min / max width thresholds based on min / max number of slides
      // used to setup and update carousel slides dimensions
      slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
      slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
      // store the current state of the slider (if currently animating, working is true)
      slider.working = false;
      // initialize the controls object
      slider.controls = {};
      // initialize an auto interval
      slider.interval = null;
      // determine which property to use for transitions
      slider.animProp = slider.settings.mode === 'vertical' ? 'top' : 'left';
      // determine if hardware acceleration can be used
      slider.usingCSS = slider.settings.useCSS && slider.settings.mode !== 'fade' && (function() {
        // create our test div element
        var div = document.createElement('div'),
        // css transition properties
        props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
        // test for each property
        for (var i = 0; i < props.length; i++) {
          if (div.style[props[i]] !== undefined) {
            slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
            slider.animProp = '-' + slider.cssPrefix + '-transform';
            return true;
          }
        }
        return false;
      }());
      // if vertical mode always make maxSlides and minSlides equal
      if (slider.settings.mode === 'vertical') { slider.settings.maxSlides = slider.settings.minSlides; }
      // save original style data
      el.data('origStyle', el.attr('style'));
      el.children(slider.settings.slideSelector).each(function() {
        $(this).data('origStyle', $(this).attr('style'));
      });

      // perform all DOM / CSS modifications
      setup();
    };

    /**
     * Performs all DOM and CSS modifications
     */
    var setup = function() {
      var preloadSelector = slider.children.eq(slider.settings.startSlide); // set the default preload selector (visible)

      // wrap el in a wrapper
      el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
      // store a namespace reference to .bx-viewport
      slider.viewport = el.parent();

      // add aria-live if the setting is enabled and ticker mode is disabled
      if (slider.settings.ariaLive && !slider.settings.ticker) {
        slider.viewport.attr('aria-live', 'polite');
      }
      // add a loading div to display while images are loading
      slider.loader = $('<div class="bx-loading" />');
      slider.viewport.prepend(slider.loader);
      // set el to a massive width, to hold any needed slides
      // also strip any margin and padding from el
      el.css({
        width: slider.settings.mode === 'horizontal' ? (slider.children.length * 1000 + 215) + '%' : 'auto',
        position: 'relative'
      });
      // if using CSS, add the easing property
      if (slider.usingCSS && slider.settings.easing) {
        el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
      // if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
      } else if (!slider.settings.easing) {
        slider.settings.easing = 'swing';
      }
      // make modifications to the viewport (.bx-viewport)
      slider.viewport.css({
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
      });
      slider.viewport.parent().css({
        maxWidth: getViewportMaxWidth()
      });
      // apply css to all slider children
      slider.children.css({
        float: slider.settings.mode === 'horizontal' ? 'left' : 'none',
        listStyle: 'none',
        position: 'relative'
      });
      // apply the calculated width after the float is applied to prevent scrollbar interference
      slider.children.css('width', getSlideWidth());
      // if slideMargin is supplied, add the css
      if (slider.settings.mode === 'horizontal' && slider.settings.slideMargin > 0) { slider.children.css('marginRight', slider.settings.slideMargin); }
      if (slider.settings.mode === 'vertical' && slider.settings.slideMargin > 0) { slider.children.css('marginBottom', slider.settings.slideMargin); }
      // if "fade" mode, add positioning and z-index CSS
      if (slider.settings.mode === 'fade') {
        slider.children.css({
          position: 'absolute',
          zIndex: 0,
          display: 'none'
        });
        // prepare the z-index on the showing element
        slider.children.eq(slider.settings.startSlide).css({zIndex: slider.settings.slideZIndex, display: 'block'});
      }
      // create an element to contain all slider controls (pager, start / stop, etc)
      slider.controls.el = $('<div class="bx-controls" />');
      // if captions are requested, add them
      if (slider.settings.captions) { appendCaptions(); }
      // check if startSlide is last slide
      slider.active.last = slider.settings.startSlide === getPagerQty() - 1;
      // if video is true, set up the fitVids plugin
      if (slider.settings.video) { el.fitVids(); }
      if (slider.settings.preloadImages === 'all' || slider.settings.ticker) { preloadSelector = slider.children; }
      // only check for control addition if not in "ticker" mode
      if (!slider.settings.ticker) {
        // if controls are requested, add them
        if (slider.settings.controls) { appendControls(); }
        // if auto is true, and auto controls are requested, add them
        if (slider.settings.auto && slider.settings.autoControls) { appendControlsAuto(); }
        // if pager is requested, add it
        if (slider.settings.pager) { appendPager(); }
        // if any control option is requested, add the controls wrapper
        if (slider.settings.controls || slider.settings.autoControls || slider.settings.pager) { slider.viewport.after(slider.controls.el); }
      // if ticker mode, do not allow a pager
      } else {
        slider.settings.pager = false;
      }
      loadElements(preloadSelector, start);
    };

    var loadElements = function(selector, callback) {
      var total = selector.find('img:not([src=""]), iframe').length,
      count = 0;
      if (total === 0) {
        callback();
        return;
      }
      selector.find('img:not([src=""]), iframe').each(function() {
        $(this).one('load error', function() {
          if (++count === total) { callback(); }
        }).each(function() {
          if (this.complete) { $(this).trigger('load'); }
        });
      });
    };

    /**
     * Start the slider
     */
    var start = function() {
      // if infinite loop, prepare additional slides
      if (slider.settings.infiniteLoop && slider.settings.mode !== 'fade' && !slider.settings.ticker) {
        var slice    = slider.settings.mode === 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides,
        sliceAppend  = slider.children.slice(0, slice).clone(true).addClass('bx-clone'),
        slicePrepend = slider.children.slice(-slice).clone(true).addClass('bx-clone');
        if (slider.settings.ariaHidden) {
          sliceAppend.attr('aria-hidden', true);
          slicePrepend.attr('aria-hidden', true);
        }
        el.append(sliceAppend).prepend(slicePrepend);
      }
      // remove the loading DOM element
      slider.loader.remove();
      // set the left / top position of "el"
      setSlidePosition();
      // if "vertical" mode, always use adaptiveHeight to prevent odd behavior
      if (slider.settings.mode === 'vertical') { slider.settings.adaptiveHeight = true; }
      // set the viewport height
      slider.viewport.height(getViewportHeight());
      // make sure everything is positioned just right (same as a window resize)
      el.redrawSlider();
      // onSliderLoad callback
      slider.settings.onSliderLoad.call(el, slider.active.index);
      // slider has been fully initialized
      slider.initialized = true;
      // bind the resize call to the window
      if (slider.settings.responsive) { $(window).bind('resize', resizeWindow); }
      // if auto is true and has more than 1 page, start the show
      if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) { initAuto(); }
      // if ticker is true, start the ticker
      if (slider.settings.ticker) { initTicker(); }
      // if pager is requested, make the appropriate pager link active
      if (slider.settings.pager) { updatePagerActive(slider.settings.startSlide); }
      // check for any updates to the controls (like hideControlOnEnd updates)
      if (slider.settings.controls) { updateDirectionControls(); }
      // if touchEnabled is true, setup the touch events
      if (slider.settings.touchEnabled && !slider.settings.ticker) { initTouch(); }
      // if keyboardEnabled is true, setup the keyboard events
      if (slider.settings.keyboardEnabled && !slider.settings.ticker) {
        $(document).keydown(keyPress);
      }
    };

    /**
     * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
     */
    var getViewportHeight = function() {
      var height = 0;
      // first determine which children (slides) should be used in our height calculation
      var children = $();
      // if mode is not "vertical" and adaptiveHeight is false, include all children
      if (slider.settings.mode !== 'vertical' && !slider.settings.adaptiveHeight) {
        children = slider.children;
      } else {
        // if not carousel, return the single active child
        if (!slider.carousel) {
          children = slider.children.eq(slider.active.index);
        // if carousel, return a slice of children
        } else {
          // get the individual slide index
          var currentIndex = slider.settings.moveSlides === 1 ? slider.active.index : slider.active.index * getMoveBy();
          // add the current slide to the children
          children = slider.children.eq(currentIndex);
          // cycle through the remaining "showing" slides
          for (i = 1; i <= slider.settings.maxSlides - 1; i++) {
            // if looped back to the start
            if (currentIndex + i >= slider.children.length) {
              children = children.add(slider.children.eq(i - 1));
            } else {
              children = children.add(slider.children.eq(currentIndex + i));
            }
          }
        }
      }
      // if "vertical" mode, calculate the sum of the heights of the children
      if (slider.settings.mode === 'vertical') {
        children.each(function(index) {
          height += $(this).outerHeight();
        });
        // add user-supplied margins
        if (slider.settings.slideMargin > 0) {
          height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
        }
      // if not "vertical" mode, calculate the max height of the children
      } else {
        height = Math.max.apply(Math, children.map(function() {
          return $(this).outerHeight(false);
        }).get());
      }

      if (slider.viewport.css('box-sizing') === 'border-box') {
        height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
              parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
      } else if (slider.viewport.css('box-sizing') === 'padding-box') {
        height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
      }

      return height;
    };

    /**
     * Returns the calculated width to be used for the outer wrapper / viewport
     */
    var getViewportMaxWidth = function() {
      var width = '100%';
      if (slider.settings.slideWidth > 0) {
        if (slider.settings.mode === 'horizontal') {
          width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
        } else {
          width = slider.settings.slideWidth;
        }
      }
      return width;
    };

    /**
     * Returns the calculated width to be applied to each slide
     */
    var getSlideWidth = function() {
      var newElWidth = slider.settings.slideWidth, // start with any user-supplied slide width
      wrapWidth      = slider.viewport.width();    // get the current viewport width
      // if slide width was not supplied, or is larger than the viewport use the viewport width
      if (slider.settings.slideWidth === 0 ||
        (slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
        slider.settings.mode === 'vertical') {
        newElWidth = wrapWidth;
      // if carousel, use the thresholds to determine the width
      } else if (slider.settings.maxSlides > 1 && slider.settings.mode === 'horizontal') {
        if (wrapWidth > slider.maxThreshold) {
          return newElWidth;
        } else if (wrapWidth < slider.minThreshold) {
          newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
        } else if (slider.settings.shrinkItems) {
          newElWidth = Math.floor((wrapWidth + slider.settings.slideMargin) / (Math.ceil((wrapWidth + slider.settings.slideMargin) / (newElWidth + slider.settings.slideMargin))) - slider.settings.slideMargin);
        }
      }
      return newElWidth;
    };

    /**
     * Returns the number of slides currently visible in the viewport (includes partially visible slides)
     */
    var getNumberSlidesShowing = function() {
      var slidesShowing = 1,
      childWidth = null;
      if (slider.settings.mode === 'horizontal' && slider.settings.slideWidth > 0) {
        // if viewport is smaller than minThreshold, return minSlides
        if (slider.viewport.width() < slider.minThreshold) {
          slidesShowing = slider.settings.minSlides;
        // if viewport is larger than maxThreshold, return maxSlides
        } else if (slider.viewport.width() > slider.maxThreshold) {
          slidesShowing = slider.settings.maxSlides;
        // if viewport is between min / max thresholds, divide viewport width by first child width
        } else {
          childWidth = slider.children.first().width() + slider.settings.slideMargin;
          slidesShowing = Math.floor((slider.viewport.width() +
            slider.settings.slideMargin) / childWidth);
        }
      // if "vertical" mode, slides showing will always be minSlides
      } else if (slider.settings.mode === 'vertical') {
        slidesShowing = slider.settings.minSlides;
      }
      return slidesShowing;
    };

    /**
     * Returns the number of pages (one full viewport of slides is one "page")
     */
    var getPagerQty = function() {
      var pagerQty = 0,
      breakPoint = 0,
      counter = 0;
      // if moveSlides is specified by the user
      if (slider.settings.moveSlides > 0) {
        if (slider.settings.infiniteLoop) {
          pagerQty = Math.ceil(slider.children.length / getMoveBy());
        } else {
          // when breakpoint goes above children length, counter is the number of pages
          while (breakPoint < slider.children.length) {
            ++pagerQty;
            breakPoint = counter + getNumberSlidesShowing();
            counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
          }
        }
      // if moveSlides is 0 (auto) divide children length by sides showing, then round up
      } else {
        pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
      }
      return pagerQty;
    };

    /**
     * Returns the number of individual slides by which to shift the slider
     */
    var getMoveBy = function() {
      // if moveSlides was set by the user and moveSlides is less than number of slides showing
      if (slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()) {
        return slider.settings.moveSlides;
      }
      // if moveSlides is 0 (auto)
      return getNumberSlidesShowing();
    };

    /**
     * Sets the slider's (el) left or top position
     */
    var setSlidePosition = function() {
      var position, lastChild, lastShowingIndex;
      // if last slide, not infinite loop, and number of children is larger than specified maxSlides
      if (slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop) {
        if (slider.settings.mode === 'horizontal') {
          // get the last child's position
          lastChild = slider.children.last();
          position = lastChild.position();
          // set the left position
          setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
        } else if (slider.settings.mode === 'vertical') {
          // get the last showing index's position
          lastShowingIndex = slider.children.length - slider.settings.minSlides;
          position = slider.children.eq(lastShowingIndex).position();
          // set the top position
          setPositionProperty(-position.top, 'reset', 0);
        }
      // if not last slide
      } else {
        // get the position of the first showing slide
        position = slider.children.eq(slider.active.index * getMoveBy()).position();
        // check for last slide
        if (slider.active.index === getPagerQty() - 1) { slider.active.last = true; }
        // set the respective position
        if (position !== undefined) {
          if (slider.settings.mode === 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
          else if (slider.settings.mode === 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
        }
      }
    };

    /**
     * Sets the el's animating property position (which in turn will sometimes animate el).
     * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
     *
     * @param value (int)
     *  - the animating property's value
     *
     * @param type (string) 'slide', 'reset', 'ticker'
     *  - the type of instance for which the function is being
     *
     * @param duration (int)
     *  - the amount of time (in ms) the transition should occupy
     *
     * @param params (array) optional
     *  - an optional parameter containing any variables that need to be passed in
     */
    var setPositionProperty = function(value, type, duration, params) {
      var animateObj, propValue;
      // use CSS transform
      if (slider.usingCSS) {
        // determine the translate3d value
        propValue = slider.settings.mode === 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
        // add the CSS transition-duration
        el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
        if (type === 'slide') {
          // set the property value
          el.css(slider.animProp, propValue);
          if (duration !== 0) {
            // bind a callback method - executes when CSS transition completes
            el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
              //make sure it's the correct one
              if (!$(e.target).is(el)) { return; }
              // unbind the callback
              el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
              updateAfterSlideTransition();
            });
          } else { //duration = 0
            updateAfterSlideTransition();
          }
        } else if (type === 'reset') {
          el.css(slider.animProp, propValue);
        } else if (type === 'ticker') {
          // make the transition use 'linear'
          el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
          el.css(slider.animProp, propValue);
          if (duration !== 0) {
            el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
              //make sure it's the correct one
              if (!$(e.target).is(el)) { return; }
              // unbind the callback
              el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
              // reset the position
              setPositionProperty(params.resetValue, 'reset', 0);
              // start the loop again
              tickerLoop();
            });
          } else { //duration = 0
            setPositionProperty(params.resetValue, 'reset', 0);
            tickerLoop();
          }
        }
      // use JS animate
      } else {
        animateObj = {};
        animateObj[slider.animProp] = value;
        if (type === 'slide') {
          el.animate(animateObj, duration, slider.settings.easing, function() {
            updateAfterSlideTransition();
          });
        } else if (type === 'reset') {
          el.css(slider.animProp, value);
        } else if (type === 'ticker') {
          el.animate(animateObj, duration, 'linear', function() {
            setPositionProperty(params.resetValue, 'reset', 0);
            // run the recursive loop after animation
            tickerLoop();
          });
        }
      }
    };

    /**
     * Populates the pager with proper amount of pages
     */
    var populatePager = function() {
      var pagerHtml = '',
      linkContent = '',
      pagerQty = getPagerQty();
      // loop through each pager item
      for (var i = 0; i < pagerQty; i++) {
        linkContent = '';
        // if a buildPager function is supplied, use it to get pager link value, else use index + 1
        if (slider.settings.buildPager && $.isFunction(slider.settings.buildPager) || slider.settings.pagerCustom) {
          linkContent = slider.settings.buildPager(i);
          slider.pagerEl.addClass('bx-custom-pager');
        } else {
          linkContent = i + 1;
          slider.pagerEl.addClass('bx-default-pager');
        }
        // var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
        // add the markup to the string
        pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
      }
      // populate the pager element with pager links
      slider.pagerEl.html(pagerHtml);
    };

    /**
     * Appends the pager to the controls element
     */
    var appendPager = function() {
      if (!slider.settings.pagerCustom) {
        // create the pager DOM element
        slider.pagerEl = $('<div class="bx-pager" />');
        // if a pager selector was supplied, populate it with the pager
        if (slider.settings.pagerSelector) {
          $(slider.settings.pagerSelector).html(slider.pagerEl);
        // if no pager selector was supplied, add it after the wrapper
        } else {
          slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
        }
        // populate the pager
        populatePager();
      } else {
        slider.pagerEl = $(slider.settings.pagerCustom);
      }
      // assign the pager click binding
      slider.pagerEl.on('click touchend', 'a', clickPagerBind);
    };

    /**
     * Appends prev / next controls to the controls element
     */
    var appendControls = function() {
      slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
      slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
      // bind click actions to the controls
      slider.controls.next.bind('click touchend', clickNextBind);
      slider.controls.prev.bind('click touchend', clickPrevBind);
      // if nextSelector was supplied, populate it
      if (slider.settings.nextSelector) {
        $(slider.settings.nextSelector).append(slider.controls.next);
      }
      // if prevSelector was supplied, populate it
      if (slider.settings.prevSelector) {
        $(slider.settings.prevSelector).append(slider.controls.prev);
      }
      // if no custom selectors were supplied
      if (!slider.settings.nextSelector && !slider.settings.prevSelector) {
        // add the controls to the DOM
        slider.controls.directionEl = $('<div class="bx-controls-direction" />');
        // add the control elements to the directionEl
        slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
        // slider.viewport.append(slider.controls.directionEl);
        slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
      }
    };

    /**
     * Appends start / stop auto controls to the controls element
     */
    var appendControlsAuto = function() {
      slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
      slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
      // add the controls to the DOM
      slider.controls.autoEl = $('<div class="bx-controls-auto" />');
      // bind click actions to the controls
      slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
      slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
      // if autoControlsCombine, insert only the "start" control
      if (slider.settings.autoControlsCombine) {
        slider.controls.autoEl.append(slider.controls.start);
      // if autoControlsCombine is false, insert both controls
      } else {
        slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
      }
      // if auto controls selector was supplied, populate it with the controls
      if (slider.settings.autoControlsSelector) {
        $(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
      // if auto controls selector was not supplied, add it after the wrapper
      } else {
        slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
      }
      // update the auto controls
      updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
    };

    /**
     * Appends image captions to the DOM
     */
    var appendCaptions = function() {
      // cycle through each child
      slider.children.each(function(index) {
        // get the image title attribute
        var title = $(this).find('img:first').attr('title');
        // append the caption
        if (title !== undefined && ('' + title).length) {
          $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
        }
      });
    };

    /**
     * Click next binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickNextBind = function(e) {
      e.preventDefault();
      if (slider.controls.el.hasClass('disabled')) { return; }
      // if auto show is running, stop it
      if (slider.settings.auto && slider.settings.stopAutoOnClick) { el.stopAuto(); }
      el.goToNextSlide();
    };

    /**
     * Click prev binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickPrevBind = function(e) {
      e.preventDefault();
      if (slider.controls.el.hasClass('disabled')) { return; }
      // if auto show is running, stop it
      if (slider.settings.auto && slider.settings.stopAutoOnClick) { el.stopAuto(); }
      el.goToPrevSlide();
    };

    /**
     * Click start binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickStartBind = function(e) {
      el.startAuto();
      e.preventDefault();
    };

    /**
     * Click stop binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickStopBind = function(e) {
      el.stopAuto();
      e.preventDefault();
    };

    /**
     * Click pager binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickPagerBind = function(e) {
      var pagerLink, pagerIndex;
      e.preventDefault();
      if (slider.controls.el.hasClass('disabled')) {
        return;
      }
      // if auto show is running, stop it
      if (slider.settings.auto  && slider.settings.stopAutoOnClick) { el.stopAuto(); }
      pagerLink = $(e.currentTarget);
      if (pagerLink.attr('data-slide-index') !== undefined) {
        pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
        // if clicked pager link is not active, continue with the goToSlide call
        if (pagerIndex !== slider.active.index) { el.goToSlide(pagerIndex); }
      }
    };

    /**
     * Updates the pager links with an active class
     *
     * @param slideIndex (int)
     *  - index of slide to make active
     */
    var updatePagerActive = function(slideIndex) {
      // if "short" pager type
      var len = slider.children.length; // nb of children
      if (slider.settings.pagerType === 'short') {
        if (slider.settings.maxSlides > 1) {
          len = Math.ceil(slider.children.length / slider.settings.maxSlides);
        }
        slider.pagerEl.html((slideIndex + 1) + slider.settings.pagerShortSeparator + len);
        return;
      }
      // remove all pager active classes
      slider.pagerEl.find('a').removeClass('active');
      // apply the active class for all pagers
      slider.pagerEl.each(function(i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
    };

    /**
     * Performs needed actions after a slide transition
     */
    var updateAfterSlideTransition = function() {
      // if infinite loop is true
      if (slider.settings.infiniteLoop) {
        var position = '';
        // first slide
        if (slider.active.index === 0) {
          // set the new position
          position = slider.children.eq(0).position();
        // carousel, last slide
        } else if (slider.active.index === getPagerQty() - 1 && slider.carousel) {
          position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
        // last slide
        } else if (slider.active.index === slider.children.length - 1) {
          position = slider.children.eq(slider.children.length - 1).position();
        }
        if (position) {
          if (slider.settings.mode === 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
          else if (slider.settings.mode === 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
        }
      }
      // declare that the transition is complete
      slider.working = false;
      // onSlideAfter callback
      slider.settings.onSlideAfter.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
    };

    /**
     * Updates the auto controls state (either active, or combined switch)
     *
     * @param state (string) "start", "stop"
     *  - the new state of the auto show
     */
    var updateAutoControls = function(state) {
      // if autoControlsCombine is true, replace the current control with the new state
      if (slider.settings.autoControlsCombine) {
        slider.controls.autoEl.html(slider.controls[state]);
      // if autoControlsCombine is false, apply the "active" class to the appropriate control
      } else {
        slider.controls.autoEl.find('a').removeClass('active');
        slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
      }
    };

    /**
     * Updates the direction controls (checks if either should be hidden)
     */
    var updateDirectionControls = function() {
      if (getPagerQty() === 1) {
        slider.controls.prev.addClass('disabled');
        slider.controls.next.addClass('disabled');
      } else if (!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd) {
        // if first slide
        if (slider.active.index === 0) {
          slider.controls.prev.addClass('disabled');
          slider.controls.next.removeClass('disabled');
        // if last slide
        } else if (slider.active.index === getPagerQty() - 1) {
          slider.controls.next.addClass('disabled');
          slider.controls.prev.removeClass('disabled');
        // if any slide in the middle
        } else {
          slider.controls.prev.removeClass('disabled');
          slider.controls.next.removeClass('disabled');
        }
      }
    };

    /**
     * Initializes the auto process
     */
    var initAuto = function() {
      // if autoDelay was supplied, launch the auto show using a setTimeout() call
      if (slider.settings.autoDelay > 0) {
        var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
      // if autoDelay was not supplied, start the auto show normally
      } else {
        el.startAuto();

        //add focus and blur events to ensure its running if timeout gets paused
        $(window).focus(function() {
          el.startAuto();
        }).blur(function() {
          el.stopAuto();
        });
      }
      // if autoHover is requested
      if (slider.settings.autoHover) {
        // on el hover
        el.hover(function() {
          // if the auto show is currently playing (has an active interval)
          if (slider.interval) {
            // stop the auto show and pass true argument which will prevent control update
            el.stopAuto(true);
            // create a new autoPaused value which will be used by the relative "mouseout" event
            slider.autoPaused = true;
          }
        }, function() {
          // if the autoPaused value was created be the prior "mouseover" event
          if (slider.autoPaused) {
            // start the auto show and pass true argument which will prevent control update
            el.startAuto(true);
            // reset the autoPaused value
            slider.autoPaused = null;
          }
        });
      }
    };

    /**
     * Initializes the ticker process
     */
    var initTicker = function() {
      var startPosition = 0,
      position, transform, value, idx, ratio, property, newSpeed, totalDimens;
      // if autoDirection is "next", append a clone of the entire slider
      if (slider.settings.autoDirection === 'next') {
        el.append(slider.children.clone().addClass('bx-clone'));
      // if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
      } else {
        el.prepend(slider.children.clone().addClass('bx-clone'));
        position = slider.children.first().position();
        startPosition = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
      }
      setPositionProperty(startPosition, 'reset', 0);
      // do not allow controls in ticker mode
      slider.settings.pager = false;
      slider.settings.controls = false;
      slider.settings.autoControls = false;
      // if autoHover is requested
      if (slider.settings.tickerHover) {
        if (slider.usingCSS) {
          idx = slider.settings.mode === 'horizontal' ? 4 : 5;
          slider.viewport.hover(function() {
            transform = el.css('-' + slider.cssPrefix + '-transform');
            value = parseFloat(transform.split(',')[idx]);
            setPositionProperty(value, 'reset', 0);
          }, function() {
            totalDimens = 0;
            slider.children.each(function(index) {
              totalDimens += slider.settings.mode === 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
            });
            // calculate the speed ratio (used to determine the new speed to finish the paused animation)
            ratio = slider.settings.speed / totalDimens;
            // determine which property to use
            property = slider.settings.mode === 'horizontal' ? 'left' : 'top';
            // calculate the new speed
            newSpeed = ratio * (totalDimens - (Math.abs(parseInt(value))));
            tickerLoop(newSpeed);
          });
        } else {
          // on el hover
          slider.viewport.hover(function() {
            el.stop();
          }, function() {
            // calculate the total width of children (used to calculate the speed ratio)
            totalDimens = 0;
            slider.children.each(function(index) {
              totalDimens += slider.settings.mode === 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
            });
            // calculate the speed ratio (used to determine the new speed to finish the paused animation)
            ratio = slider.settings.speed / totalDimens;
            // determine which property to use
            property = slider.settings.mode === 'horizontal' ? 'left' : 'top';
            // calculate the new speed
            newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
            tickerLoop(newSpeed);
          });
        }
      }
      // start the ticker loop
      tickerLoop();
    };

    /**
     * Runs a continuous loop, news ticker-style
     */
    var tickerLoop = function(resumeSpeed) {
      var speed = resumeSpeed ? resumeSpeed : slider.settings.speed,
      position = {left: 0, top: 0},
      reset = {left: 0, top: 0},
      animateProperty, resetValue, params;

      // if "next" animate left position to last child, then reset left to 0
      if (slider.settings.autoDirection === 'next') {
        position = el.find('.bx-clone').first().position();
      // if "prev" animate left position to 0, then reset left to first non-clone child
      } else {
        reset = slider.children.first().position();
      }
      animateProperty = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
      resetValue = slider.settings.mode === 'horizontal' ? -reset.left : -reset.top;
      params = {resetValue: resetValue};
      setPositionProperty(animateProperty, 'ticker', speed, params);
    };

    /**
     * Check if el is on screen
     */
    var isOnScreen = function(el) {
      var win = $(window),
      viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
      },
      bounds = el.offset();

      viewport.right = viewport.left + win.width();
      viewport.bottom = viewport.top + win.height();
      bounds.right = bounds.left + el.outerWidth();
      bounds.bottom = bounds.top + el.outerHeight();

      return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };

    /**
     * Initializes keyboard events
     */
    var keyPress = function(e) {
      var activeElementTag = document.activeElement.tagName.toLowerCase(),
      tagFilters = 'input|textarea',
      p = new RegExp(activeElementTag,['i']),
      result = p.exec(tagFilters);

      if (result == null && isOnScreen(el)) {
        if (e.keyCode === 39) {
          clickNextBind(e);
          return false;
        } else if (e.keyCode === 37) {
          clickPrevBind(e);
          return false;
        }
      }
    };

    /**
     * Initializes touch events
     */
    var initTouch = function() {
      // initialize object to contain all touch values
      slider.touch = {
        start: {x: 0, y: 0},
        end: {x: 0, y: 0}
      };
      slider.viewport.bind('touchstart MSPointerDown pointerdown', onTouchStart);

      //for browsers that have implemented pointer events and fire a click after
      //every pointerup regardless of whether pointerup is on same screen location as pointerdown or not
      slider.viewport.on('click', '.bxslider a', function(e) {
        if (slider.viewport.hasClass('click-disabled')) {
          e.preventDefault();
          slider.viewport.removeClass('click-disabled');
        }
      });
    };

    /**
     * Event handler for "touchstart"
     *
     * @param e (event)
     *  - DOM event object
     */
    var onTouchStart = function(e) {
      //disable slider controls while user is interacting with slides to avoid slider freeze that happens on touch devices when a slide swipe happens immediately after interacting with slider controls
      slider.controls.el.addClass('disabled');

      if (slider.working) {
        e.preventDefault();
        slider.controls.el.removeClass('disabled');
      } else {
        // record the original position when touch starts
        slider.touch.originalPos = el.position();
        var orig = e.originalEvent,
        touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig];
        // record the starting touch x, y coordinates
        slider.touch.start.x = touchPoints[0].pageX;
        slider.touch.start.y = touchPoints[0].pageY;

        if (slider.viewport.get(0).setPointerCapture) {
          slider.pointerId = orig.pointerId;
          slider.viewport.get(0).setPointerCapture(slider.pointerId);
        }
        // bind a "touchmove" event to the viewport
        slider.viewport.bind('touchmove MSPointerMove pointermove', onTouchMove);
        // bind a "touchend" event to the viewport
        slider.viewport.bind('touchend MSPointerUp pointerup', onTouchEnd);
        slider.viewport.bind('MSPointerCancel pointercancel', onPointerCancel);
      }
    };

    /**
     * Cancel Pointer for Windows Phone
     *
     * @param e (event)
     *  - DOM event object
     */
    var onPointerCancel = function(e) {
      /* onPointerCancel handler is needed to deal with situations when a touchend
      doesn't fire after a touchstart (this happens on windows phones only) */
      setPositionProperty(slider.touch.originalPos.left, 'reset', 0);

      //remove handlers
      slider.controls.el.removeClass('disabled');
      slider.viewport.unbind('MSPointerCancel pointercancel', onPointerCancel);
      slider.viewport.unbind('touchmove MSPointerMove pointermove', onTouchMove);
      slider.viewport.unbind('touchend MSPointerUp pointerup', onTouchEnd);
      if (slider.viewport.get(0).releasePointerCapture) {
        slider.viewport.get(0).releasePointerCapture(slider.pointerId);
      }
    };

    /**
     * Event handler for "touchmove"
     *
     * @param e (event)
     *  - DOM event object
     */
    var onTouchMove = function(e) {
      var orig = e.originalEvent,
      touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig],
      // if scrolling on y axis, do not prevent default
      xMovement = Math.abs(touchPoints[0].pageX - slider.touch.start.x),
      yMovement = Math.abs(touchPoints[0].pageY - slider.touch.start.y),
      value = 0,
      change = 0;

      // x axis swipe
      if ((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX) {
        e.preventDefault();
      // y axis swipe
      } else if ((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY) {
        e.preventDefault();
      }
      if (slider.settings.mode !== 'fade' && slider.settings.oneToOneTouch) {
        // if horizontal, drag along x axis
        if (slider.settings.mode === 'horizontal') {
          change = touchPoints[0].pageX - slider.touch.start.x;
          value = slider.touch.originalPos.left + change;
        // if vertical, drag along y axis
        } else {
          change = touchPoints[0].pageY - slider.touch.start.y;
          value = slider.touch.originalPos.top + change;
        }
        setPositionProperty(value, 'reset', 0);
      }
    };

    /**
     * Event handler for "touchend"
     *
     * @param e (event)
     *  - DOM event object
     */
    var onTouchEnd = function(e) {
      slider.viewport.unbind('touchmove MSPointerMove pointermove', onTouchMove);
      //enable slider controls as soon as user stops interacing with slides
      slider.controls.el.removeClass('disabled');
      var orig    = e.originalEvent,
      touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig],
      value       = 0,
      distance    = 0;
      // record end x, y positions
      slider.touch.end.x = touchPoints[0].pageX;
      slider.touch.end.y = touchPoints[0].pageY;
      // if fade mode, check if absolute x distance clears the threshold
      if (slider.settings.mode === 'fade') {
        distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
        if (distance >= slider.settings.swipeThreshold) {
          if (slider.touch.start.x > slider.touch.end.x) {
            el.goToNextSlide();
          } else {
            el.goToPrevSlide();
          }
          el.stopAuto();
        }
      // not fade mode
      } else {
        // calculate distance and el's animate property
        if (slider.settings.mode === 'horizontal') {
          distance = slider.touch.end.x - slider.touch.start.x;
          value = slider.touch.originalPos.left;
        } else {
          distance = slider.touch.end.y - slider.touch.start.y;
          value = slider.touch.originalPos.top;
        }
        // if not infinite loop and first / last slide, do not attempt a slide transition
        if (!slider.settings.infiniteLoop && ((slider.active.index === 0 && distance > 0) || (slider.active.last && distance < 0))) {
          setPositionProperty(value, 'reset', 200);
        } else {
          // check if distance clears threshold
          if (Math.abs(distance) >= slider.settings.swipeThreshold) {
            if (distance < 0) {
              el.goToNextSlide();
            } else {
              el.goToPrevSlide();
            }
            el.stopAuto();
          } else {
            // el.animate(property, 200);
            setPositionProperty(value, 'reset', 200);
          }
        }
      }
      slider.viewport.unbind('touchend MSPointerUp pointerup', onTouchEnd);
      if (slider.viewport.get(0).releasePointerCapture) {
        slider.viewport.get(0).releasePointerCapture(slider.pointerId);
      }
    };

    /**
     * Window resize event callback
     */
    var resizeWindow = function(e) {
      // don't do anything if slider isn't initialized.
      if (!slider.initialized) { return; }
      // Delay if slider working.
      if (slider.working) {
        window.setTimeout(resizeWindow, 10);
      } else {
        // get the new window dimens (again, thank you IE)
        var windowWidthNew = $(window).width(),
        windowHeightNew = $(window).height();
        // make sure that it is a true window resize
        // *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
        // are resized. Can you just die already?*
        if (windowWidth !== windowWidthNew || windowHeight !== windowHeightNew) {
          // set the new window dimens
          windowWidth = windowWidthNew;
          windowHeight = windowHeightNew;
          // update all dynamic elements
          el.redrawSlider();
          // Call user resize handler
          slider.settings.onSliderResize.call(el, slider.active.index);
        }
      }
    };

    /**
     * Adds an aria-hidden=true attribute to each element
     *
     * @param startVisibleIndex (int)
     *  - the first visible element's index
     */
    var applyAriaHiddenAttributes = function(startVisibleIndex) {
      var numberOfSlidesShowing = getNumberSlidesShowing();
      // only apply attributes if the setting is enabled and not in ticker mode
      if (slider.settings.ariaHidden && !slider.settings.ticker) {
        // add aria-hidden=true to all elements
        slider.children.attr('aria-hidden', 'true');
        // get the visible elements and change to aria-hidden=false
        slider.children.slice(startVisibleIndex, startVisibleIndex + numberOfSlidesShowing).attr('aria-hidden', 'false');
      }
    };

    /**
     * Returns index according to present page range
     *
     * @param slideOndex (int)
     *  - the desired slide index
     */
    var setSlideIndex = function(slideIndex) {
      if (slideIndex < 0) {
        if (slider.settings.infiniteLoop) {
          return getPagerQty() - 1;
        }else {
          //we don't go to undefined slides
          return slider.active.index;
        }
      // if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
      } else if (slideIndex >= getPagerQty()) {
        if (slider.settings.infiniteLoop) {
          return 0;
        } else {
          //we don't move to undefined pages
          return slider.active.index;
        }
      // set active index to requested slide
      } else {
        return slideIndex;
      }
    };

    /**
     * ===================================================================================
     * = PUBLIC FUNCTIONS
     * ===================================================================================
     */

    /**
     * Performs slide transition to the specified slide
     *
     * @param slideIndex (int)
     *  - the destination slide's index (zero-based)
     *
     * @param direction (string)
     *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
     */
    el.goToSlide = function(slideIndex, direction) {
      // onSlideBefore, onSlideNext, onSlidePrev callbacks
      // Allow transition canceling based on returned value
      var performTransition = true,
      moveBy = 0,
      position = {left: 0, top: 0},
      lastChild = null,
      lastShowingIndex, eq, value, requestEl;
      // store the old index
      slider.oldIndex = slider.active.index;
      //set new index
      slider.active.index = setSlideIndex(slideIndex);

      // if plugin is currently in motion, ignore request
      if (slider.working || slider.active.index === slider.oldIndex) { return; }
      // declare that plugin is in motion
      slider.working = true;

      performTransition = slider.settings.onSlideBefore.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);

      // If transitions canceled, reset and return
      if (typeof (performTransition) !== 'undefined' && !performTransition) {
        slider.active.index = slider.oldIndex; // restore old index
        slider.working = false; // is not in motion
        return;
      }

      if (direction === 'next') {
        // Prevent canceling in future functions or lack there-of from negating previous commands to cancel
        if (!slider.settings.onSlideNext.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)) {
          performTransition = false;
        }
      } else if (direction === 'prev') {
        // Prevent canceling in future functions or lack there-of from negating previous commands to cancel
        if (!slider.settings.onSlidePrev.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)) {
          performTransition = false;
        }
      }

      // check if last slide
      slider.active.last = slider.active.index >= getPagerQty() - 1;
      // update the pager with active class
      if (slider.settings.pager || slider.settings.pagerCustom) { updatePagerActive(slider.active.index); }
      // // check for direction control update
      if (slider.settings.controls) { updateDirectionControls(); }
      // if slider is set to mode: "fade"
      if (slider.settings.mode === 'fade') {
        // if adaptiveHeight is true and next height is different from current height, animate to the new height
        if (slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()) {
          slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
        }
        // fade out the visible child and reset its z-index value
        slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
        // fade in the newly requested slide
        slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex + 1).fadeIn(slider.settings.speed, function() {
          $(this).css('zIndex', slider.settings.slideZIndex);
          updateAfterSlideTransition();
        });
      // slider mode is not "fade"
      } else {
        // if adaptiveHeight is true and next height is different from current height, animate to the new height
        if (slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()) {
          slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
        }
        // if carousel and not infinite loop
        if (!slider.settings.infiniteLoop && slider.carousel && slider.active.last) {
          if (slider.settings.mode === 'horizontal') {
            // get the last child position
            lastChild = slider.children.eq(slider.children.length - 1);
            position = lastChild.position();
            // calculate the position of the last slide
            moveBy = slider.viewport.width() - lastChild.outerWidth();
          } else {
            // get last showing index position
            lastShowingIndex = slider.children.length - slider.settings.minSlides;
            position = slider.children.eq(lastShowingIndex).position();
          }
          // horizontal carousel, going previous while on first slide (infiniteLoop mode)
        } else if (slider.carousel && slider.active.last && direction === 'prev') {
          // get the last child position
          eq = slider.settings.moveSlides === 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
          lastChild = el.children('.bx-clone').eq(eq);
          position = lastChild.position();
        // if infinite loop and "Next" is clicked on the last slide
        } else if (direction === 'next' && slider.active.index === 0) {
          // get the last clone position
          position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
          slider.active.last = false;
        // normal non-zero requests
        } else if (slideIndex >= 0) {
          //parseInt is applied to allow floats for slides/page
          requestEl = slideIndex * parseInt(getMoveBy());
          position = slider.children.eq(requestEl).position();
        }

        /* If the position doesn't exist
         * (e.g. if you destroy the slider on a next click),
         * it doesn't throw an error.
         */
        if (typeof (position) !== 'undefined') {
          value = slider.settings.mode === 'horizontal' ? -(position.left - moveBy) : -position.top;
          // plugin values to be animated
          setPositionProperty(value, 'slide', slider.settings.speed);
        } else {
          slider.working = false;
        }
      }
      if (slider.settings.ariaHidden) { applyAriaHiddenAttributes(slider.active.index * getMoveBy()); }
    };

    /**
     * Transitions to the next slide in the show
     */
    el.goToNextSlide = function() {
      // if infiniteLoop is false and last page is showing, disregard call
      if (!slider.settings.infiniteLoop && slider.active.last) { return; }
      var pagerIndex = parseInt(slider.active.index) + 1;
      el.goToSlide(pagerIndex, 'next');
    };

    /**
     * Transitions to the prev slide in the show
     */
    el.goToPrevSlide = function() {
      // if infiniteLoop is false and last page is showing, disregard call
      if (!slider.settings.infiniteLoop && slider.active.index === 0) { return; }
      var pagerIndex = parseInt(slider.active.index) - 1;
      el.goToSlide(pagerIndex, 'prev');
    };

    /**
     * Starts the auto show
     *
     * @param preventControlUpdate (boolean)
     *  - if true, auto controls state will not be updated
     */
    el.startAuto = function(preventControlUpdate) {
      // if an interval already exists, disregard call
      if (slider.interval) { return; }
      // create an interval
      slider.interval = setInterval(function() {
        if (slider.settings.autoDirection === 'next') {
          el.goToNextSlide();
        } else {
          el.goToPrevSlide();
        }
      }, slider.settings.pause);
      // if auto controls are displayed and preventControlUpdate is not true
      if (slider.settings.autoControls && preventControlUpdate !== true) { updateAutoControls('stop'); }
    };

    /**
     * Stops the auto show
     *
     * @param preventControlUpdate (boolean)
     *  - if true, auto controls state will not be updated
     */
    el.stopAuto = function(preventControlUpdate) {
      // if no interval exists, disregard call
      if (!slider.interval) { return; }
      // clear the interval
      clearInterval(slider.interval);
      slider.interval = null;
      // if auto controls are displayed and preventControlUpdate is not true
      if (slider.settings.autoControls && preventControlUpdate !== true) { updateAutoControls('start'); }
    };

    /**
     * Returns current slide index (zero-based)
     */
    el.getCurrentSlide = function() {
      return slider.active.index;
    };

    /**
     * Returns current slide element
     */
    el.getCurrentSlideElement = function() {
      return slider.children.eq(slider.active.index);
    };

    /**
     * Returns a slide element
     * @param index (int)
     *  - The index (zero-based) of the element you want returned.
     */
    el.getSlideElement = function(index) {
      return slider.children.eq(index);
    };

    /**
     * Returns number of slides in show
     */
    el.getSlideCount = function() {
      return slider.children.length;
    };

    /**
     * Return slider.working variable
     */
    el.isWorking = function() {
      return slider.working;
    };

    /**
     * Update all dynamic slider elements
     */
    el.redrawSlider = function() {
      // resize all children in ratio to new screen size
      slider.children.add(el.find('.bx-clone')).outerWidth(getSlideWidth());
      // adjust the height
      slider.viewport.css('height', getViewportHeight());
      // update the slide position
      if (!slider.settings.ticker) { setSlidePosition(); }
      // if active.last was true before the screen resize, we want
      // to keep it last no matter what screen size we end on
      if (slider.active.last) { slider.active.index = getPagerQty() - 1; }
      // if the active index (page) no longer exists due to the resize, simply set the index as last
      if (slider.active.index >= getPagerQty()) { slider.active.last = true; }
      // if a pager is being displayed and a custom pager is not being used, update it
      if (slider.settings.pager && !slider.settings.pagerCustom) {
        populatePager();
        updatePagerActive(slider.active.index);
      }
      if (slider.settings.ariaHidden) { applyAriaHiddenAttributes(slider.active.index * getMoveBy()); }
    };

    /**
     * Destroy the current instance of the slider (revert everything back to original state)
     */
    el.destroySlider = function() {
      // don't do anything if slider has already been destroyed
      if (!slider.initialized) { return; }
      slider.initialized = false;
      $('.bx-clone', this).remove();
      slider.children.each(function() {
        if ($(this).data('origStyle') !== undefined) {
          $(this).attr('style', $(this).data('origStyle'));
        } else {
          $(this).removeAttr('style');
        }
      });
      if ($(this).data('origStyle') !== undefined) {
        this.attr('style', $(this).data('origStyle'));
      } else {
        $(this).removeAttr('style');
      }
      $(this).unwrap().unwrap();
      if (slider.controls.el) { slider.controls.el.remove(); }
      if (slider.controls.next) { slider.controls.next.remove(); }
      if (slider.controls.prev) { slider.controls.prev.remove(); }
      if (slider.pagerEl && slider.settings.controls && !slider.settings.pagerCustom) { slider.pagerEl.remove(); }
      $('.bx-caption', this).remove();
      if (slider.controls.autoEl) { slider.controls.autoEl.remove(); }
      clearInterval(slider.interval);
      if (slider.settings.responsive) { $(window).unbind('resize', resizeWindow); }
      if (slider.settings.keyboardEnabled) { $(document).unbind('keydown', keyPress); }
      //remove self reference in data
      $(this).removeData('bxSlider');
    };

    /**
     * Reload the slider (revert all DOM changes, and re-initialize)
     */
    el.reloadSlider = function(settings) {
      if (settings !== undefined) { options = settings; }
      el.destroySlider();
      init();
      //store reference to self in order to access public functions later
      $(el).data('bxSlider', this);
    };

    init();

    $(el).data('bxSlider', this);

    // returns the current jQuery object
    return this;
  };

})(jQuery);

document.addEventListener("DOMContentLoaded", function(){

	(function() {
		'use strict';

	var DURATION = 150;

	var ringElem = null;
	var movingId = 0;
	var prevFocused = null;
	var keyDownTime = 0;

	var win = window;
	var doc = document;
	var docElem = doc.documentElement;
	var body = doc.body;


	docElem.addEventListener('keydown', function(event) {
		var code = event.which;
		// Show animation only upon Tab or Arrow keys press.
		if (code === 9 || (code > 36 && code < 41)) {
			keyDownTime = Date.now();
		}
	}, false);


	docElem.addEventListener('focus', function(event) {
		var target = event.target;
		if (target.id === 'flying-focus') {
			return;
		}

		var isFirstFocus = false;
		if (!ringElem) {
			isFirstFocus = true;
			initialize();
		}

		var offset = offsetOf(target);
		ringElem.style.left = offset.left + 'px';
		ringElem.style.top = offset.top + 'px';
		ringElem.style.width = target.offsetWidth + 'px';
		ringElem.style.height = target.offsetHeight + 'px';

		if (isFirstFocus || !isJustPressed()) {
			return;
		}

		onEnd();
		target.classList.add('flying-focus_target');
		ringElem.classList.add('flying-focus_visible');
		prevFocused = target;
		movingId = setTimeout(onEnd, DURATION);
	}, true);


	docElem.addEventListener('blur', function() {
		onEnd();
	}, true);


	function initialize() {
		ringElem = doc.createElement('flying-focus'); // use uniq element name to decrease the chances of a conflict with website styles
		ringElem.id = 'flying-focus';
		ringElem.style.transitionDuration = ringElem.style.WebkitTransitionDuration = DURATION / 1000 + 's';
		body.appendChild(ringElem);
	}


	function onEnd() {
		if (!movingId) {
			return;
		}
		clearTimeout(movingId);
		movingId = 0;
		ringElem.classList.remove('flying-focus_visible');
		prevFocused.classList.remove('flying-focus_target');
		prevFocused = null;
	}


	function isJustPressed() {
		return Date.now() - keyDownTime < 42
	}


	function offsetOf(elem) {
		var rect = elem.getBoundingClientRect();
		var clientLeft = docElem.clientLeft || body.clientLeft;
		var clientTop  = docElem.clientTop  || body.clientTop;
		var scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft;
		var scrollTop  = win.pageYOffset || docElem.scrollTop  || body.scrollTop;
		var left = rect.left + scrollLeft - clientLeft;
		var top =  rect.top  + scrollTop  - clientTop;
		return {
			top: top || 0,
			left: left || 0
		};
	}


		var style = doc.createElement('style');
		style.textContent = "#flying-focus {\
		position: absolute;\
		margin: 0;\
		background: transparent;\
		-webkit-transition-property: left, top, width, height;\
		transition-property: left, top, width, height;\
		-webkit-transition-timing-function: cubic-bezier(0,1,0,1);\
		transition-timing-function: cubic-bezier(0,1,0,1);\
		visibility: hidden;\
		pointer-events: none;\
		box-shadow: 0 0 2px 3px #309ccf, 0 0 2px #309ccf inset; border-radius: 2px;\
	}\
	#flying-focus.flying-focus_visible {\
		visibility: visible;\
		z-index: 9999;\
	}\
	.flying-focus_target {\
		outline: none !important; /* Doesn't work in Firefox :( */\
	}\
	/* http://stackoverflow.com/questions/71074/how-to-remove-firefoxs-dotted-outline-on-buttons-as-well-as-links/199319 */\
	.flying-focus_target::-moz-focus-inner {\
		border: 0 !important;\
	}\
	/* Replace it with @supports rule when browsers catch up */\
	@media screen and (-webkit-min-device-pixel-ratio: 0) {\
		#flying-focus {\
			box-shadow: none;\
			outline: 5px auto -webkit-focus-ring-color;\
			outline-offset: -3px;\
		}\
	}\
	";
		body.appendChild(style);
	})();

});
/*! js-cookie v3.0.1 | MIT */
;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, (function () {
    var current = global.Cookies;
    var exports = global.Cookies = factory();
    exports.noConflict = function () { global.Cookies = current; return exports; };
  }()));
}(this, (function () { 'use strict';

  /* eslint-disable no-var */
  function assign (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target
  }
  /* eslint-enable no-var */

  /* eslint-disable no-var */
  var defaultConverter = {
    read: function (value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
    },
    write: function (value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      )
    }
  };
  /* eslint-enable no-var */

  /* eslint-disable no-var */

  function init (converter, defaultAttributes) {
    function set (key, value, attributes) {
      if (typeof document === 'undefined') {
        return
      }

      attributes = assign({}, defaultAttributes, attributes);

      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }

      key = encodeURIComponent(key)
        .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
        .replace(/[()]/g, escape);

      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue
        }

        stringifiedAttributes += '; ' + attributeName;

        if (attributes[attributeName] === true) {
          continue
        }

        // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...
        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return (document.cookie =
        key + '=' + converter.write(value, key) + stringifiedAttributes)
    }

    function get (key) {
      if (typeof document === 'undefined' || (arguments.length && !key)) {
        return
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var value = parts.slice(1).join('=');

        try {
          var foundKey = decodeURIComponent(parts[0]);
          jar[foundKey] = converter.read(value, foundKey);

          if (key === foundKey) {
            break
          }
        } catch (e) {}
      }

      return key ? jar[key] : jar
    }

    return Object.create(
      {
        set: set,
        get: get,
        remove: function (key, attributes) {
          set(
            key,
            '',
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function (attributes) {
          return init(this.converter, assign({}, this.attributes, attributes))
        },
        withConverter: function (converter) {
          return init(assign({}, this.converter, converter), this.attributes)
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    )
  }

  var api = init(defaultConverter, { path: '/' });
  /* eslint-enable no-var */

  return api;

})));

/*                    _ _        ____ _               _
   _ __ ___   ___  __| (_) __ _ / ___| |__   ___  ___| | __
  | '_ ` _ \ / _ \/ _` | |/ _` | |   | '_ \ / _ \/ __| |/ /
  | | | | | |  __/ (_| | | (_| | |___| | | |  __/ (__|   <
  |_| |_| |_|\___|\__,_|_|\__,_|\____|_| |_|\___|\___|_|\_\

  http://github.com/sparkbox/mediaCheck

  Version: 0.4.6, 10-21-2016
  Author: Rob Tarr (http://twitter.com/robtarr)
*/

// Generated by CoffeeScript 1.11.1
(function() {
  window.mediaCheck = function(options) {
    var breakpoints, checkQuery, convertEmToPx, createListener, getPXValue, hasMatchMedia, i, mmListener, mq, mqChange;
    mq = void 0;
    mqChange = void 0;
    createListener = void 0;
    convertEmToPx = void 0;
    getPXValue = void 0;
    hasMatchMedia = window.matchMedia !== undefined && !!window.matchMedia("!").addListener;
    if (hasMatchMedia) {
      mqChange = function(mq, options) {
        if (mq.matches) {
          if (typeof options.entry === "function") {
            options.entry(mq);
          }
        } else {
          if (typeof options.exit === "function") {
            options.exit(mq);
          }
        }
        if (typeof options.both === "function") {
          return options.both(mq);
        }
      };
      createListener = function() {
        mq = window.matchMedia(options.media);
        mq.addListener(function() {
          return mqChange(mq, options);
        });
        window.addEventListener("orientationchange", (function() {
          mq = window.matchMedia(options.media);
          return mqChange(mq, options);
        }), false);
        return mqChange(mq, options);
      };
      return createListener();
    } else {
      breakpoints = {};
      mqChange = function(mq, options) {
        if (mq.matches) {
          if (typeof options.entry === "function" && (breakpoints[options.media] === false || (breakpoints[options.media] == null))) {
            options.entry(mq);
          }
        } else {
          if (typeof options.exit === "function" && (breakpoints[options.media] === true || (breakpoints[options.media] == null))) {
            options.exit(mq);
          }
        }
        if (typeof options.both === "function") {
          options.both(mq);
        }
        return breakpoints[options.media] = mq.matches;
      };
      convertEmToPx = function(value) {
        var emElement, px;
        emElement = void 0;
        emElement = document.createElement("div");
        emElement.style.width = "1em";
        emElement.style.position = "absolute";
        document.body.appendChild(emElement);
        px = value * emElement.offsetWidth;
        document.body.removeChild(emElement);
        return px;
      };
      getPXValue = function(width, unit) {
        var value;
        value = void 0;
        switch (unit) {
          case "em":
            value = convertEmToPx(width);
            break;
          default:
            value = width;
        }
        return value;
      };
      for (i in options) {
        breakpoints[options.media] = null;
      }
      checkQuery = function(parts) {
        var constraint, dimension, matches, ratio, value, windowHeight, windowWidth;
        constraint = parts[1];
        dimension = parts[2];
        if (parts[4]) {
          value = getPXValue(parseInt(parts[3], 10), parts[4]);
        } else {
          value = parts[3];
        }
        windowWidth = window.innerWidth || document.documentElement.clientWidth;
        windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (dimension === 'width') {
          matches = constraint === "max" && value > windowWidth || constraint === "min" && value < windowWidth;
        } else if (dimension === 'height') {
          matches = constraint === "max" && value > windowHeight || constraint === "min" && value < windowHeight;
        } else if (dimension === 'aspect-ratio') {
          ratio = windowWidth / windowHeight;
          matches = constraint === "max" && eval(ratio) < eval(value) || constraint === "min" && eval(ratio) > eval(value);
        }
        return matches;
      };
      mmListener = function() {
        var j, len, matches, media, medias, parts;
        medias = options.media.split(/\sand\s|,\s/);
        matches = true;
        for (j = 0, len = medias.length; j < len; j++) {
          media = medias[j];
          parts = media.match(/\((.*?)-(.*?):\s([\d\/]*)(\w*)\)/);
          if (!checkQuery(parts)) {
            matches = false;
          }
        }
        return mqChange({
          media: options.media,
          matches: matches
        }, options);
      };
      if (window.addEventListener) {
        window.addEventListener("resize", mmListener, false);
      } else {
        if (window.attachEvent) {
          window.attachEvent("onresize", mmListener);
        }
      }
      return mmListener();
    }
  };

}).call(this);

/*!
	Modaal - accessible modals - v0.4.4
	by Humaan, for all humans.
	http://humaan.com
 */
/**
	Modaal jQuery Plugin : Accessible Modals

	==== General Options ===
	type (string) 					: ajax, inline, image, iframe, confirm. Defaults to 'inline'
	content_source (stribg)			: Accepts a string value for your target element, such as '#my-content'. This allows for when trigger element is
										an `<a href="#">` link. Not to be confused with the already existing `source` event.
	animation (string) 				: Fade, expand, down, up. Defaults to 'fade'
	after_callback_delay (integer)	: Specify a delay value for the after open callbacks. This is necessary because with the bundled animations
										have a set duration in the bundled CSS. Specify a delay of the same amount as the animation duration in so
										more accurately fire the after open/close callbacks. Defaults 350, does not apply if animation is 'none',
										after open callbacks are dispatched immediately

	is_locked (boolean)				: Set this to true to disable closing the modal via keypress or clicking the background. Beware that if
										type != 'confirm' there will be no interface to dismiss the modal if is_locked = true, you'd have to
										programmatically arrange to dismiss the modal. Confirm modals are always locked regardless of this option
										Defaults to false

	hide_close (boolean)			: Set this to true to hide the close modal button. Key press and overlay click will still close the modal.
										This method is best used when you want to put a custom close button inside the modal container space.

	background (string)				: Background overlay style. Defaults to '#000'
	overlay_opacity (float) 		: Background overlay transparency. Defaults to 0.8
	overlay_close (boolean)			: Set this to false if you want to disable click to close on overlay background.

	accessible_title (string)		: Accessible title. Default 'Dialog Window'
	start_open (boolean)			: Set this to true to launch the Modaal window immediately on page open
	fullscreen (boolean)			: Set this to true to make the modaal fill the entire screen, false will default to own width/height attributes.
	custom_class (string)			: Fill in this string with a custom class that will be applied to the outer most modal wrapper.

	width (integer)					: Desired width of the modal. Required for iframe type. Defaults to undefined //TODO
	height (integer)				: Desired height of the modal. Required for iframe type. Defaults to undefined //TODO

	background_scroll (boolean)		: Set this to true to enable the page to scroll behind the open modal.

    should_open (boolean|function)  : Boolean or closure that returns a boolean to determine whether to open the modal or not.

	close_text						: String for close button text. Available for localisation and alternative languages to be used.
	close_aria_label				: String for close button aria-label attribute (value that screen readers will read out). Available for localisation and alternative languages to be used.

	=== Events ===
	before_open (function) 			: Callback function executed before modal is opened
	after_open (function)			: Callback function executed after modal is opened
	before_close (function)			: Callback function executed before modal is closed
	after_close (function)			: Callback function executed after modal is closed
	source (function(element, src))	: Callback function executed on the default source, it is intended to transform the
										source (href in an AJAX modal or iframe). The function passes in the triggering element
										as well as the default source depending of the modal type. The default output of the
										function is an untransformed default source.


	=== Confirm Options & Events ===
	confirm_button_text (string)	: Text on the confirm button. Defaults to 'Confirm'
	confirm_cancel_button_text (string) : Text on the confirm modal cancel button. Defaults to 'Cancel'
	confirm_title (string)			: Title for confirm modal. Default 'Confirm Title'
	confirm_content (string)		: HTML content for confirm message
	confirm_callback (function)		: Callback function for when the confirm button is pressed as opposed to cancel
	confirm_cancel_callback (function) : Callback function for when the cancel button is pressed


	=== Gallery Options & Events ===
	gallery_active_class (string)	: Active class applied to the currently active image or image slide in a gallery 'gallery_active_item'
	outer_controls (boolean)		: Set to true to put the next/prev controls outside the Modaal wrapper, at the edges of the browser window.
	before_image_change (function)	: Callback function executed before the image slide changes in a gallery modal. Default function( current_item, incoming_item )
	after_image_change (function)	: Callback function executed after the image slide changes in a gallery modal. Default function ( current_item )


	=== AJAX Options & Events ===
	loading_content (string)		: HTML content for loading message. Default 'Loading &hellip;'
	loading_class (string)			: Class name to be applied while content is loaded via AJAX. Default 'is_loading'
	ajax_error_class (string)		: Class name to be applied when content has failed to load. Default is 'modaal-error'
	ajax_success (function)		 	: Callback for when AJAX content is loaded in


	=== SOCIAL CONTENT ===
	instagram_id (string)			: Unique photo ID for an Instagram photo.

*/
( function( $ ) {

	var modaal_loading_spinner = '<div class="modaal-loading-spinner"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>'
	
	var Modaal = {
		init : function(options, elem) {
			var self = this;

			self.dom = $('body');

			self.$elem = $(elem);
			self.options = $.extend({}, $.fn.modaal.options, self.$elem.data(), options);
			self.xhr = null;

			// set up the scope
			self.scope = {
				is_open: false,
				id: 'modaal_' + ( new Date().getTime() ) + ( Math.random().toString(16).substring(2) ),
				source: self.options.content_source ? self.options.content_source : self.$elem.attr('href')
			};

			// add scope attribute to trigger element
			self.$elem.attr('data-modaal-scope', self.scope.id);

			// private options
			self.private_options = {
				active_class: 'is_active'
			};

			self.lastFocus = null;
			
			// if is_locked
			if ( self.options.is_locked || self.options.type == 'confirm' || self.options.hide_close ) {
				self.scope.close_btn = '';
			} else {
				self.scope.close_btn = '<button type="button" class="modaal-close" id="modaal-close" aria-label="' + self.options.close_aria_label + '"><span>' + self.options.close_text + '</span></button>';
			}

			// reset animation_speed
			if (self.options.animation === 'none' ){
				self.options.animation_speed = 0;
				self.options.after_callback_delay = 0;
			}

			// On click to open modal
			$(elem).on('click.Modaal', function(e) {
				e.preventDefault();
				self.create_modaal(self, e);
			});

			// Define next/prev buttons
			if (self.options.outer_controls === true) {
				var mod_class = 'outer';
			} else {
				var mod_class = 'inner';
			}
			self.scope.prev_btn = '<button type="button" class="modaal-gallery-control modaal-gallery-prev modaal-gallery-prev-' + mod_class + '" id="modaal-gallery-prev" aria-label="Previous image (use left arrow to change)"><span>Previous Image</span></button>';
			self.scope.next_btn = '<button type="button" class="modaal-gallery-control modaal-gallery-next modaal-gallery-next-' + mod_class + '" id="modaal-gallery-next" aria-label="Next image (use right arrow to change)"><span>Next Image</span></button>';

			// Check for start_open
			if (self.options.start_open === true ){
				self.create_modaal( self );
			}
		},

		// Initial create to determine which content type it requires
		// ----------------------------------------------------------------
		create_modaal : function(self, e) {
			var self = this;
			var source;

			// Save last active state before modal
			self.lastFocus = self.$elem;

			if ( self.options.should_open === false || ( typeof self.options.should_open === 'function' && self.options.should_open() === false ) ) {
				return;
			}

			// CB: before_open
			self.options.before_open.call(self, e);

			switch (self.options.type) {
				case 'inline':
					self.create_basic();
					break;

				case 'ajax':
					source = self.options.source( self.$elem, self.scope.source );
					self.fetch_ajax( source );
					break;

				case 'confirm':
					self.options.is_locked = true;
					self.create_confirm();
					break;

				case 'image':
					self.create_image();
					break;

				case 'iframe':
					source = self.options.source( self.$elem, self.scope.source );
					self.create_iframe( source );
					break;

				case 'video':
					self.create_video(self.scope.source);
					break;

				case 'instagram':
					self.create_instagram();
					break;
			}

			// call events to be watched (click, tab, keyup, keydown etc.)
			self.watch_events();
		},

		// Watching Modal
		// ----------------------------------------------------------------
		watch_events : function() {
			var self = this;

			self.dom.off('click.Modaal keyup.Modaal keydown.Modaal');

			// Body keydown
			self.dom.on('keydown.Modaal', function(e) {
				var key = e.keyCode;
				var target = e.target;

				// look for tab change and reset focus to modal window
				// done in keydown so the check fires repeatedly when you hold the tab key down
				if (key == 9 && self.scope.is_open) {
					if (!$.contains(document.getElementById(self.scope.id), target) ) {
						$('#' + self.scope.id).find('*[tabindex="0"]').focus();
					}
				}
			});

			// Body keyup
			self.dom.on('keyup.Modaal', function(e) {
				var key = e.keyCode;
				var target = e.target;

				if ( (e.shiftKey && e.keyCode == 9) && self.scope.is_open) {
					// Watch for shift + tab key press. if open shift focus to close button.
					if (!$.contains(document.getElementById(self.scope.id), target) ) {
						$('#' + self.scope.id).find('.modaal-close').focus();
					}
				}

				if ( !self.options.is_locked ){
					// On escape key press close modal
					if (key == 27 && self.scope.is_open ) {
						if ( $(document.activeElement).is('input:not(:checkbox):not(:radio)') ) {
							return false;
						}

						self.modaal_close();
						return;
					}
				}

				// is gallery open and images length is > 1
				if ( self.options.type == 'image' ) {
					// arrow left for back
					if (key == 37 && self.scope.is_open && (!$('#' + self.scope.id + ' .modaal-gallery-prev').hasClass('is_hidden')) ) {
						self.gallery_update('prev');
					}
					// arrow right for next
					if (key == 39 && self.scope.is_open && (!$('#' + self.scope.id + ' .modaal-gallery-next').hasClass('is_hidden')) ) {
						self.gallery_update('next');
					}
					return;
				}
			});

			// Body click/touch
			self.dom.on('click.Modaal', function(e) {
				var trigger = $(e.target);

				// General Controls: If it's not locked allow greedy close
				if ( !self.options.is_locked ){
					if ( (self.options.overlay_close && trigger.is('.modaal-inner-wrapper')) || trigger.is('.modaal-close') || trigger.closest('.modaal-close').length ) {
						self.modaal_close();
						return;
					}
				}

				//Confirm Controls
				if ( trigger.is('.modaal-confirm-btn' ) ){
					// if 'OK' button is clicked, run confirm_callback()
					if ( trigger.is('.modaal-ok') ) {
						self.options.confirm_callback.call(self, self.lastFocus);
					}

					if ( trigger.is('.modaal-cancel') ) {
						self.options.confirm_cancel_callback.call(self, self.lastFocus);
					}
					self.modaal_close();
					return;
				}

				// Gallery Controls
				if ( trigger.is( '.modaal-gallery-control' ) ){
					// it not active, don't do nuthin!
					if ( trigger.hasClass('is_hidden') ) {
						return;
					}

					// trigger previous
					if ( trigger.is('.modaal-gallery-prev') ) {
						self.gallery_update('prev');
					}
					// trigger next
					if ( trigger.is('.modaal-gallery-next') ) {
						self.gallery_update('next');
					}
					return;
				}
			});
		},

		// Append markup into DOM
		build_modal : function(content) {
			var self = this;

			// if is instagram
			var igClass = '';
			if ( self.options.type == 'instagram' ) {
				igClass = ' modaal-instagram';
			}

			var wrap_class = (self.options.type == 'video') ? 'modaal-video-wrap' : 'modaal-content';

			/*
				modaal-start_none : fully hidden via display:none;
				modaal-start_fade : hidden via opacity:0
				modaal-start_slidedown : ...

			*/
			var animation_class;
			switch ( self.options.animation ) {
				case 'fade' :
					animation_class = ' modaal-start_fade';
					break;
				case 'slide-down' :
					animation_class = ' modaal-start_slidedown';
					break;
				default :
					animation_class = ' modaal-start_none'
			}

			// fullscreen check
			var fullscreen_class = '';
			if ( self.options.fullscreen ) {
				fullscreen_class = ' modaal-fullscreen';
			}

			// custom class check
			if ( self.options.custom_class !== '' || typeof(self.options.custom_class) !== 'undefined' ) {
				self.options.custom_class = ' ' + self.options.custom_class;
			}

			// if width and heights exists and is typeof number
			var dimensionsStyle = '';
			if ( self.options.width && self.options.height && typeof self.options.width == 'number' && typeof self.options.height == 'number' ) {
				// if width and height exist, and they are both numbers
				dimensionsStyle = ' style="max-width:' + self.options.width + 'px;height:' + self.options.height + 'px;overflow:auto;"';
			} else if ( self.options.width && typeof self.options.width == 'number' ) {
				// if only width
				dimensionsStyle = ' style="max-width:' + self.options.width + 'px;"';
			} else if ( self.options.height && typeof self.options.height == 'number' ) {
				// if only height
				dimensionsStyle = ' style="height:' + self.options.height + 'px;overflow:auto;"';
			}

			// Reset dimensions style (width and height) for certain types
			if ( self.options.type == 'image' || self.options.type == 'video' || self.options.type == 'instagram' || self.options.fullscreen ) {
				dimensionsStyle = '';
			}

			// if is touch
			// this is a bug fix for iOS to allow regular click events on div elements.
			var touchTrigger = '';
			if ( self.is_touch() ) {
				touchTrigger = ' style="cursor:pointer;"'
			}

			var build_markup = '<div class="modaal-wrapper modaal-' + self.options.type + animation_class + igClass + fullscreen_class + self.options.custom_class + '" id="' + self.scope.id + '"><div class="modaal-outer-wrapper"><div class="modaal-inner-wrapper"' + touchTrigger + '>';

					// hide if video
					if (self.options.type != 'video') {
						build_markup += '<div class="modaal-container"' + dimensionsStyle + '>';
					}

					// add the guts of the content
					build_markup +=	'<div class="' + wrap_class + ' modaal-focus" aria-hidden="false" aria-label="' + self.options.accessible_title + ' - ' + self.options.close_aria_label + '" role="dialog">';

							// If it's inline type, we want to clone content instead of dropping it straight in
							if (self.options.type == 'inline') {
								build_markup += '<div class="modaal-content-container" role="document"></div>';
							} else {
								// Drop in the content if it's not inline
								build_markup +=	content;
							}

					// close wrap_class
					build_markup += '</div>' + self.scope.close_btn;

					// hide if video
					if (self.options.type != 'video') {
						build_markup += '</div>';
					}

			// close off modaal-inner-wrapper
			build_markup +=	'</div>';
			
			// If type is image AND outer_controls is true: add gallery next and previous controls.
			if (self.options.type == 'image' && self.options.outer_controls === true) {
				build_markup += self.scope.prev_btn + self.scope.next_btn;
			}

			// close off modaal-wrapper
			build_markup +=	'</div></div>';

			// append ajax modal markup to dom
			if ($('#' + self.scope.id + '_overlay').length < 1) {
				self.dom.append(build_markup);
			}

			// if inline, clone content into space
			if (self.options.type == 'inline') {
				content.appendTo('#' + self.scope.id + ' .modaal-content-container');
			}

			// Trigger overlay show (which triggers modal show)
			self.modaal_overlay('show');
		},

		// Create Basic Inline Modal
		// ----------------------------------------------------------------
		create_basic : function() {
			var self = this;
			var target = $(self.scope.source);
			var content = '';

			if (target.length) {
				content = target.contents().detach();
				target.empty();
			} else {
				content = 'Content could not be loaded. Please check the source and try again.';
			}

			// now push content into markup
			self.build_modal(content);
		},

		// Create Instagram Modal
		// ----------------------------------------------------------------
		create_instagram : function() {
			var self = this;
			var id = self.options.instagram_id;
			var content = '';

			var error_msg = 'Instagram photo couldn\'t be loaded, please check the embed code and try again.';

			self.build_modal('<div class="modaal-content-container' + ( self.options.loading_class != '' ? ' ' + self.options.loading_class : '' ) + '">' + self.options.loading_content + '</div>' );

			// ID exists, is not empty null or undefined.
			if ( id != '' && id !== null && id !== undefined ) {
				// set up oembed url
				var ig_url = 'https://api.instagram.com/oembed?url=http://instagr.am/p/' + id + '/';

				$.ajax({
					url: ig_url,
					dataType: "jsonp",
					cache: false,
					success: function (data) {
						
						// Create temp dom element from which we'll clone into the modaal instance. This is required to bypass the unusual small thumb issue instagram oembed was serving up
						self.dom.append('<div id="temp-ig" style="width:0;height:0;overflow:hidden;">' + data.html + '</div>');
						
						// Check if it has loaded once before.
						// This is to stop the Embeds.process from throwing and error the first time it's being loaded.
						// private_options are individual to a modaal_scope so will not work across multiple scopes when checking if true, only that one item.
						if ( self.dom.attr('data-igloaded') ) {
							window.instgrm.Embeds.process();
						} else {
							// first time it's loaded, let's set a new private option to use next time it's opened.
							self.dom.attr('data-igloaded', 'true');
						}

						// now set location for new content
						// timeout is required as well to bypass the unusual small thumb issue instagram oembed was serving up
						var target = '#' + self.scope.id + ' .modaal-content-container';
						if ( $(target).length > 0) {
							setTimeout(function() {
								$('#temp-ig').contents().clone().appendTo( target );
								$('#temp-ig').remove();
							}, 1000);
						}
						
					},
					error: function() {
						content = error_msg;

						// now set location for new content
						var target = $('#' + self.scope.id + ' .modaal-content-container');
						if ( target.length > 0) {
							target.removeClass( self.options.loading_class ).addClass( self.options.ajax_error_class );
							target.html(content);
						}
					}
				});

			} else {
				content = error_msg;
			}

			return false;
		},

		// Fetch Ajax Data
		// ----------------------------------------------------------------
		fetch_ajax : function(url) {
			var self = this;
			var content = '';

			// If no accessible title, set it to 'Dialog Window'
			if ( self.options.accessible_title == null ) {
				self.options.accessible_title = 'Dialog Window'
			}

			if ( self.xhr !== null ){
				self.xhr.abort();
				self.xhr = null;
			}

			self.build_modal('<div class="modaal-content-container' + ( self.options.loading_class != '' ? ' ' + self.options.loading_class : '' ) + '">' + self.options.loading_content + '</div>' );

			self.xhr = $.ajax(url, {
				success: function(data) {
					// content fetch is successful so push it into markup
					var target = $('#' + self.scope.id).find('.modaal-content-container');
					if ( target.length > 0){
						target.removeClass( self.options.loading_class );
						target.html( data );

						self.options.ajax_success.call(self, target);
					}
				},
				error: function( xhr ) {
					// There were some errors so return an error message
					if ( xhr.statusText == 'abort' ){
						return;
					}

					var target = $('#' + self.scope.id + ' .modaal-content-container');
					if ( target.length > 0){
						target.removeClass( self.options.loading_class ).addClass( self.options.ajax_error_class );
						target.html( 'Content could not be loaded. Please check the source and try again.' );
					}
				}
			});
		},

		// Create Confirm Modal
		// ----------------------------------------------------------------
		create_confirm : function() {
			var self = this;
			var content;

			content = '<div class="modaal-content-container">' +
					'<h1 id="modaal-title">' + self.options.confirm_title + '</h1>' +
					'<div class="modaal-confirm-content">' + self.options.confirm_content + '</div>' +
						'<div class="modaal-confirm-wrap">' +
							'<button type="button" class="modaal-confirm-btn modaal-ok" aria-label="Confirm">' + self.options.confirm_button_text + '</button>' +
							'<button type="button" class="modaal-confirm-btn modaal-cancel" aria-label="Cancel">' + self.options.confirm_cancel_button_text + '</button>' +
						'</div>' +
					'</div>' +
				'</div>';

			// now push content into markup
			self.build_modal(content);
		},

		// Create Image/Gallery Modal
		// ----------------------------------------------------------------
		create_image : function() {
			var self = this;
			var content;

			var modaal_image_markup = '';
			var gallery_total;
			
			// If has group attribute
			if ( self.$elem.is('[data-group]') || self.$elem.is('[rel]') ) {

				// find gallery groups
				var use_group = self.$elem.is('[data-group]');
				var gallery_group = use_group ? self.$elem.attr('data-group') : self.$elem.attr('rel');
				var gallery_group_items = use_group ? $('[data-group="' + gallery_group + '"]') : $('[rel="' + gallery_group + '"]');

				// remove any previous active attribute to any in the group
				gallery_group_items.removeAttr('data-gallery-active', 'is_active');
				// add active attribute to the item clicked
				self.$elem.attr('data-gallery-active', 'is_active');

				// how many in the grouping are there (-1 to connect with each function starting with 0)
				gallery_total = gallery_group_items.length - 1;

				// prepare array for gallery data
				var gallery = [];

				// start preparing markup
				modaal_image_markup = '<div class="modaal-gallery-item-wrap">';

				// loop each grouping item and push it into our gallery array
				gallery_group_items.each(function(i, item) {
					// setup default content
					var img_src = '';
					var img_alt = '';
					var img_description = '';
					var img_active = false;
					var img_src_error = false;

					var data_modaal_desc = item.getAttribute('data-modaal-desc');
					var data_item_active = item.getAttribute('data-gallery-active');

					// if item has inline custom source, use that instead of href. Fall back to href if available.
					if ( $(item).attr('data-modaal-content-source') ) {
						img_src = $(item).attr('data-modaal-content-source');
					} else if ( $(item).attr('href') ) {
						img_src = $(item).attr('href');
					} else if ( $(item).attr('src') ) {
						img_src = $(item).attr('src');
					} else {
						img_src = 'trigger requires href or data-modaal-content-source attribute';
						img_src_error = true;
					}

					// Does it have a modaal description
					if ( data_modaal_desc != '' && data_modaal_desc !== null && data_modaal_desc !== undefined ) {
						img_alt = data_modaal_desc;
						img_description = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image ' + (i+1) + ' - </span>' + data_modaal_desc.replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</div>'
					} else {
						img_description = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image ' + (i+1) + '</span></div>';
					}

					// is it the active item
					if ( data_item_active ) {
						img_active = true
					}

					// set new object for values we want
					var gallery_item = {
						'url': img_src,
						'alt': img_alt,
						'rawdesc': data_modaal_desc,
						'desc': img_description,
						'active': img_active,
						'src_error': img_src_error
					};

					// push object into gallery array
					gallery.push( gallery_item );
				});

				// now loop through all items in the gallery and build up the markup
				for (var i = 0; i < gallery.length; i++) {
					// Set default active class, then check if array item active is true and update string for class
					var is_active = '';
					var aria_label = gallery[i].rawdesc ? 'Image: ' + gallery[i].rawdesc : 'Image ' + i + ' no description';

					if ( gallery[i].active ) {
						is_active = ' ' + self.private_options.active_class;
					}

					// if gallery item has source error, output message rather than undefined image
					var image_output = gallery[i].src_error ? gallery[i].url : '<img src="' + gallery[i].url + '" alt=" " style="width:100%">';

					// for each item build up the markup
					modaal_image_markup += '<div class="modaal-gallery-item gallery-item-' + i + is_active + '" aria-label="' + aria_label + '">' +
						image_output + gallery[i].desc +
					'</div>';
				}

				// Close off the markup for the gallery
				modaal_image_markup += '</div>';

				// Add next and previous buttons if outside
				if (self.options.outer_controls != true) {
					modaal_image_markup += self.scope.prev_btn + self.scope.next_btn;
				}
			} else {
				// This is only a single gallery item so let's grab the necessary values

				// define the source, check if content_source option exists, and use that or fall back to href.
				var this_img_src;
				var img_src_error = false;
				if ( self.$elem.attr('data-modaal-content-source') ) {
					this_img_src = self.$elem.attr('data-modaal-content-source');
				} else if ( self.$elem.attr('href') ) {
					this_img_src = self.$elem.attr('href');
				} else if ( self.$elem.attr('src') ) {
					this_img_src = self.$elem.attr('src');
				} else {
					this_img_src = 'trigger requires href or data-modaal-content-source attribute';
					img_src_error = true;
				}

				var this_img_alt_txt = '';
				var this_img_alt = '';
				var aria_label = '';

				if ( self.$elem.attr('data-modaal-desc') ) {
					aria_label = self.$elem.attr('data-modaal-desc');
					this_img_alt_txt = self.$elem.attr('data-modaal-desc');
					this_img_alt = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image - </span>' + this_img_alt_txt.replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</div>';
				} else {
					aria_label = "Image with no description";
				}

				// if image item has source error, output message rather than undefined image
				var image_output = img_src_error ? this_img_src : '<img src="' + this_img_src + '" alt=" " style="width:100%">';

				// build up the html
				modaal_image_markup = '<div class="modaal-gallery-item is_active" aria-label="' + aria_label + '">' +
					image_output + this_img_alt +
				'</div>';
			}

			// Update content variable
			content = modaal_image_markup;

			// now push content into markup
			self.build_modal(content);

			// setup next & prev buttons
			if ( $('.modaal-gallery-item.is_active').is('.gallery-item-0') ) {
				$('.modaal-gallery-prev').hide();
			}
			if ( $('.modaal-gallery-item.is_active').is('.gallery-item-' + gallery_total) ) {
				$('.modaal-gallery-next').hide();
			}
		},

		// Gallery Change Image
		// ----------------------------------------------------------------
		gallery_update : function(direction) {
			var self = this;
			var this_gallery = $('#' + self.scope.id);
			var this_gallery_item = this_gallery.find('.modaal-gallery-item');
			var this_gallery_total = this_gallery_item.length - 1;

			// if single item, don't proceed
			if ( this_gallery_total == 0 ) {
				return false;
			}

			var prev_btn = this_gallery.find('.modaal-gallery-prev'),
				next_btn = this_gallery.find('.modaal-gallery-next');

			var duration = 250;

			var new_img_w = 0,
				new_img_h = 0;

			// CB: Before image change
			var current_item = this_gallery.find( '.modaal-gallery-item.' + self.private_options.active_class ),
				incoming_item = ( direction == 'next' ? current_item.next( '.modaal-gallery-item' ) : current_item.prev( '.modaal-gallery-item' ) );
			self.options.before_image_change.call(self, current_item, incoming_item);

			// stop change if at start of end
			if ( direction == 'prev' && this_gallery.find('.gallery-item-0').hasClass('is_active') ) {
				return false;
			} else if ( direction == 'next' && this_gallery.find('.gallery-item-' + this_gallery_total).hasClass('is_active') ) {
				return false;
			}


			// lock dimensions
			current_item.stop().animate({
				opacity: 0
			}, duration, function(){
				// Move to appropriate image
				incoming_item.addClass('is_next').css({
					'position': 'absolute',
					'display': 'block',
					'opacity': 0
				});

				// Collect doc width
				var doc_width = $(document).width();
				var width_threshold = doc_width > 1140 ? 280 : 50;

				// start toggle to 'is_next'
				new_img_w = this_gallery.find('.modaal-gallery-item.is_next').width();
				new_img_h = this_gallery.find('.modaal-gallery-item.is_next').height();

				var new_natural_w = this_gallery.find('.modaal-gallery-item.is_next img').prop('naturalWidth');
				var new_natural_h = this_gallery.find('.modaal-gallery-item.is_next img').prop('naturalHeight');

				// if new image is wider than doc width
				if ( new_natural_w > (doc_width - width_threshold) ) {
					// set new width just below doc width
					new_img_w = doc_width - width_threshold;

					// Set temp widths so we can calulate the correct height;
					this_gallery.find('.modaal-gallery-item.is_next').css({ 'width': new_img_w });
					this_gallery.find('.modaal-gallery-item.is_next img').css({ 'width': new_img_w });

					// Set new height variable
					new_img_h = this_gallery.find('.modaal-gallery-item.is_next').find('img').height();
				} else {
					// new img is not wider than screen, so let's set the new dimensions
					new_img_w = new_natural_w;
					new_img_h = new_natural_h;
				}

				// resize gallery region
				this_gallery.find('.modaal-gallery-item-wrap').stop().animate({
					'width': new_img_w,
					'height': new_img_h
				}, duration, function() {
					// hide old active image
					current_item.removeClass(self.private_options.active_class + ' ' + self.options.gallery_active_class).removeAttr('style');
					current_item.find('img').removeAttr('style');

					// show new image
					incoming_item.addClass(self.private_options.active_class + ' ' + self.options.gallery_active_class).removeClass('is_next').css('position','');

					// animate in new image (now has the normal is_active class
					incoming_item.stop().animate({
						opacity: 1
					}, duration, function(){
						$(this).removeAttr('style').css({
							'width': '100%'
						});
						$(this).find('img').css('width', '100%');

						// remove dimension lock
						this_gallery.find('.modaal-gallery-item-wrap').removeAttr('style');

						// CB: After image change
						self.options.after_image_change.call( self, incoming_item );
					});

					// Focus on the new gallery item
					this_gallery.find('.modaal-gallery-item').removeAttr('tabindex');
					this_gallery.find('.modaal-gallery-item.' + self.private_options.active_class + '').attr('tabindex', '0').focus();

					// hide/show next/prev
					if ( this_gallery.find('.modaal-gallery-item.' + self.private_options.active_class).is('.gallery-item-0') ) {
						prev_btn.stop().animate({
							opacity: 0
						}, 150, function(){
							$(this).hide();
						});
					} else {
						prev_btn.stop().css({
							'display': 'block',
							'opacity': prev_btn.css('opacity')
						}).animate({
							opacity: 1
						}, 150);
					}
					if ( this_gallery.find('.modaal-gallery-item.' + self.private_options.active_class).is('.gallery-item-' + this_gallery_total) ) {
						next_btn.stop().animate({
							opacity: 0
						}, 150, function(){
							$(this).hide();
						});
					} else {
						next_btn.stop().css({
							'display': 'block',
							'opacity': prev_btn.css('opacity')
						}).animate({
							opacity: 1
						}, 150);
					}
				});
			});
		},

		// Create Video Modal
		// ----------------------------------------------------------------
		create_video : function(url) {
			var self = this;
			var content;

			// video markup
			content = '<iframe src="' + url + '" class="modaal-video-frame" frameborder="0" allowfullscreen></iframe>';

			// now push content into markup
			self.build_modal('<div class="modaal-video-container">' + content + '</div>');
		},

		// Create iFrame Modal
		// ----------------------------------------------------------------
		create_iframe : function(url) {
			var self = this;
			var content;

			if ( self.options.width !== null || self.options.width !== undefined || self.options.height !== null || self.options.height !== undefined ) {
				// video markup
				content = '<iframe src="' + url + '" class="modaal-iframe-elem" frameborder="0" allowfullscreen></iframe>';
			} else {
				content = '<div class="modaal-content-container">Please specify a width and height for your iframe</div>';
			}

			// now push content into markup
			self.build_modal(content);
		},

		// Open Modaal
		// ----------------------------------------------------------------
		modaal_open : function() {
			var self = this;
			var modal_wrapper = $( '#' + self.scope.id );
			var animation_type = self.options.animation;

			if (animation_type === 'none' ){
				modal_wrapper.removeClass('modaal-start_none');
				self.options.after_open.call(self, modal_wrapper);
			}

			// Open with fade
			if (animation_type === 'fade') {
				modal_wrapper.removeClass('modaal-start_fade');
			}

			// Open with slide down
			if (animation_type === 'slide-down') {
				modal_wrapper.removeClass('modaal-start_slide_down');
			}

			var focusTarget = modal_wrapper;

			// Switch focusTarget tabindex (switch from other modal if exists)
			$('.modaal-wrapper *[tabindex=0]').removeAttr('tabindex');

			if ( self.options.type == 'image' ) {
				focusTarget = $('#' + self.scope.id).find('.modaal-gallery-item.' + self.private_options.active_class);

			} else if ( modal_wrapper.find('.modaal-iframe-elem').length ) {
				focusTarget = modal_wrapper.find('.modaal-iframe-elem');

			} else if ( modal_wrapper.find('.modaal-video-wrap').length ) {
				focusTarget = modal_wrapper.find('.modaal-video-wrap');

			} else {
				focusTarget = modal_wrapper.find('.modaal-focus');

			}

			// now set the focus
			focusTarget.attr('tabindex', '0').focus();

			// Run after_open
			if (animation_type !== 'none') {
				// CB: after_open
				setTimeout(function() {
					self.options.after_open.call(self, modal_wrapper)
				}, self.options.after_callback_delay);
			}
		},

		// Close Modal
		// ----------------------------------------------------------------
		modaal_close : function() {
			var self = this;
			var modal_wrapper = $( '#' + self.scope.id );

			// CB: before_close
			self.options.before_close.call(self, modal_wrapper);

			if (self.xhr !== null){
				self.xhr.abort();
				self.xhr = null;
			}

			// Now we close the modal
			if (self.options.animation === 'none' ){
				modal_wrapper.addClass('modaal-start_none');
			}

			// Close with fade
			if (self.options.animation === 'fade') {
				modal_wrapper.addClass('modaal-start_fade');
			}

			// Close with slide up (using initial slide down)
			if (self.options.animation === 'slide-down') {
				modal_wrapper.addClass('modaal-start_slide_down');
			}

			// CB: after_close and remove
			setTimeout(function() {
				// clone inline content back to origin place
				if (self.options.type == 'inline') {
					$('#' + self.scope.id + ' .modaal-content-container').contents().detach().appendTo( self.scope.source )
				}
				// remove markup from dom
				modal_wrapper.remove();
				// CB: after_close
				self.options.after_close.call(self);
				// scope is now closed
				self.scope.is_open = false;

			}, self.options.after_callback_delay);

			// Call overlay hide
			self.modaal_overlay('hide');

			// Roll back to last focus state before modal open. If was closed programmatically, this might not be set
			if (self.lastFocus != null) {
				self.lastFocus.focus();
			}
		},

		// Overlay control (accepts action for show or hide)
		// ----------------------------------------------------------------
		modaal_overlay : function(action) {
			var self = this;

			if (action == 'show') {
				// Modal is open so update scope
				self.scope.is_open = true;

				// set body to overflow hidden if background_scroll is false
				if (! self.options.background_scroll) {
					self.dom.addClass('modaal-noscroll');
				}

				// append modaal overlay
				if ($('#' + self.scope.id + '_overlay').length < 1) {
					self.dom.append('<div class="modaal-overlay" id="' + self.scope.id + '_overlay"></div>');
				}

				// now show
				$('#' + self.scope.id + '_overlay').css('background', self.options.background).stop().animate({
					opacity: self.options.overlay_opacity
				}, self.options.animation_speed, function(){
					// now open the modal
					self.modaal_open();
				});

			} else if (action == 'hide') {

				// now hide the overlay
				$('#' + self.scope.id + '_overlay').stop().animate({
					opacity: 0
				}, self.options.animation_speed, function(){
					// remove overlay from dom
					$(this).remove();

					// remove body overflow lock
					self.dom.removeClass('modaal-noscroll');
				});
			}
		},

		// Check if is touch
		// ----------------------------------------------------------------
		is_touch : function() {
			return 'ontouchstart' in window || navigator.maxTouchPoints;
		}
	};

	// Define default object to store
	var modaal_existing_selectors = [];

	// Declare the modaal jQuery method
	// ------------------------------------------------------------
	$.fn.modaal = function(options) {
		return this.each(function (i) {
			var existing_modaal = $(this).data('modaal');

			if ( existing_modaal ){
				// Checking for string value, used for methods
				if (typeof(options) == 'string'){
					switch (options) {
						case 'open':
 							// create the modal
 							existing_modaal.create_modaal(existing_modaal);
							break;
						case 'close':
							existing_modaal.modaal_close();
							break;
					}
				}
			} else {
				// Not a string, so let's setup the modal ready to use
				var modaal = Object.create(Modaal);
				modaal.init(options, this);
				$.data(this, "modaal", modaal);

				// push this select into existing selectors array which is referenced during modaal_dom_observer
				modaal_existing_selectors.push({
					'element': $(this).attr('class'),
					'options': options
				});
			}
		});
	};

	// Default options
	// ------------------------------------------------------------
	$.fn.modaal.options = {

		//General
		type: 'inline',
		content_source: null,
		animation: 'fade',
		animation_speed: 300,
		after_callback_delay: 350,
		is_locked: false,
		hide_close: false,
		background: '#000',
		overlay_opacity: '0.8',
		overlay_close: true,
		accessible_title: 'Dialog Window',
		start_open: false,
		fullscreen: false,
		custom_class: '',
		background_scroll: false,
		should_open: true,
		close_text: 'Close',
		close_aria_label: 'Close (Press escape to close)',
		width: null,
		height: null,

		//Events
		before_open: function(){},
		after_open: function(){},
		before_close: function(){},
		after_close: function(){},
		source: function( element, src ){
			return src;
		},

		//Confirm Modal
		confirm_button_text: 'Confirm', // text on confirm button
		confirm_cancel_button_text: 'Cancel',
		confirm_title: 'Confirm Title', // title for confirm modal
		confirm_content: '<p>This is the default confirm dialog content. Replace me through the options</p>', // html for confirm message
		confirm_callback: function() {},
		confirm_cancel_callback: function() {},


		//Gallery Modal
		gallery_active_class: 'gallery_active_item',
		outer_controls:	false,
		before_image_change: function( current_item, incoming_item ) {},
		after_image_change: function( current_item ) {},

		//Ajax Modal
		loading_content: modaal_loading_spinner,
		loading_class: 'is_loading',
		ajax_error_class: 'modaal-error',
		ajax_success: function(){},

		//Instagram
		instagram_id: null
	};

	// Check and Set Inline Options
	// ------------------------------------------------------------
	function modaal_inline_options(self) {

		// new empty options
		var options = {};
		var inline_options = false;

		// option: type
		if ( self.attr('data-modaal-type') ) {
			inline_options = true;
			options.type = self.attr('data-modaal-type');
		}

		// option: type
		if ( self.attr('data-modaal-content-source') ) {
			inline_options = true;
			options.content_source = self.attr('data-modaal-content-source');
		}

		// option: animation
		if ( self.attr('data-modaal-animation') ) {
			inline_options = true;
			options.animation = self.attr('data-modaal-animation');
		}

		// option: animation_speed
		if ( self.attr('data-modaal-animation-speed') ) {
			inline_options = true;
			options.animation_speed = self.attr('data-modaal-animation-speed');
		}

		// option: after_callback_delay
		if ( self.attr('data-modaal-after-callback-delay') ) {
			inline_options = true;
			options.after_callback_delay = self.attr('data-modaal-after-callback-delay');
		}

		// option: is_locked
		if ( self.attr('data-modaal-is-locked') ) {
			inline_options = true;
			options.is_locked = (self.attr('data-modaal-is-locked') === 'true' ? true : false);
		}

		// option: hide_close
		if ( self.attr('data-modaal-hide-close') ) {
			inline_options = true;
			options.hide_close = (self.attr('data-modaal-hide-close') === 'true' ? true : false);
		}

		// option: background
		if ( self.attr('data-modaal-background') ) {
			inline_options = true;
			options.background = self.attr('data-modaal-background');
		}

		// option: overlay_opacity
		if ( self.attr('data-modaal-overlay-opacity') ) {
			inline_options = true;
			options.overlay_opacity = self.attr('data-modaal-overlay-opacity');
		}

		// option: overlay_close
		if ( self.attr('data-modaal-overlay-close') ) {
			inline_options = true;
			options.overlay_close = (self.attr('data-modaal-overlay-close') === 'false' ? false : true);
		}

		// option: accessible_title
		if ( self.attr('data-modaal-accessible-title') ) {
			inline_options = true;
			options.accessible_title = self.attr('data-modaal-accessible-title');
		}

		// option: start_open
		if ( self.attr('data-modaal-start-open') ) {
			inline_options = true;
			options.start_open = (self.attr('data-modaal-start-open') === 'true' ? true : false);
		}

		// option: fullscreen
		if ( self.attr('data-modaal-fullscreen') ) {
			inline_options = true;
			options.fullscreen = (self.attr('data-modaal-fullscreen') === 'true' ? true : false);
		}

		// option: custom_class
		if ( self.attr('data-modaal-custom-class') ) {
			inline_options = true;
			options.custom_class = self.attr('data-modaal-custom-class');
		}

		// option: close_text
		if ( self.attr('data-modaal-close-text') ) {
			inline_options = true;
			options.close_text = self.attr('data-modaal-close-text');
		}

		// option: close_aria_label
		if ( self.attr('data-modaal-close-aria-label') ) {
			inline_options = true;
			options.close_aria_label = self.attr('data-modaal-close-aria-label');
		}

		// option: background_scroll
		if ( self.attr('data-modaal-background-scroll') ) {
			inline_options = true;
			options.background_scroll = (self.attr('data-modaal-background-scroll') === 'true' ? true : false);
		}

		// option: width
		if ( self.attr('data-modaal-width') ) {
			inline_options = true;
			options.width = parseInt( self.attr('data-modaal-width') );
		}

		// option: height
		if ( self.attr('data-modaal-height') ) {
			inline_options = true;
			options.height = parseInt( self.attr('data-modaal-height') );
		}

		// option: confirm_button_text
		if ( self.attr('data-modaal-confirm-button-text') ) {
			inline_options = true;
			options.confirm_button_text = self.attr('data-modaal-confirm-button-text');
		}

		// option: confirm_cancel_button_text
		if ( self.attr('data-modaal-confirm-cancel-button-text') ) {
			inline_options = true;
			options.confirm_cancel_button_text = self.attr('data-modaal-confirm-cancel-button-text');
		}

		// option: confirm_title
		if ( self.attr('data-modaal-confirm-title') ) {
			inline_options = true;
			options.confirm_title = self.attr('data-modaal-confirm-title');
		}

		// option: confirm_content
		if ( self.attr('data-modaal-confirm-content') ) {
			inline_options = true;
			options.confirm_content = self.attr('data-modaal-confirm-content');
		}

		// option: gallery_active_class
		if ( self.attr('data-modaal-gallery-active-class') ) {
			inline_options = true;
			options.gallery_active_class = self.attr('data-modaal-gallery-active-class');
		}

		// option: loading_content
		if ( self.attr('data-modaal-loading-content') ) {
			inline_options = true;
			options.loading_content = self.attr('data-modaal-loading-content');
		}

		// option: loading_class
		if ( self.attr('data-modaal-loading-class') ) {
			inline_options = true;
			options.loading_class = self.attr('data-modaal-loading-class');
		}

		// option: ajax_error_class
		if ( self.attr('data-modaal-ajax-error-class') ) {
			inline_options = true;
			options.ajax_error_class = self.attr('data-modaal-ajax-error-class');
		}

		// option: start_open
		if ( self.attr('data-modaal-instagram-id') ) {
			inline_options = true;
			options.instagram_id = self.attr('data-modaal-instagram-id');
		}

		// now set it up for the trigger, but only if inline_options is true
		if ( inline_options ) {
			self.modaal(options);
		}
	};

	// On body load (or now, if already loaded), init any modaals defined inline
	// Ensure this is done after $.fn.modaal and default options are declared
	// ----------------------------------------------------------------
	$(function(){

		var single_modaal = $('.modaal');

		// Check for existing modaal elements
		if ( single_modaal.length ) {
			single_modaal.each(function() {
				var self = $(this);
				modaal_inline_options(self);
			});
		}

		// Obvserve DOM mutations for newly added triggers
		var modaal_dom_observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.addedNodes && mutation.addedNodes.length > 0) {
					// element added to DOM
					var findElement = [].some.call(mutation.addedNodes, function(el) {
						var elm = $(el);
						if ( elm.is('a') || elm.is('button') ) {
							
							if ( elm.hasClass('modaal') ) {
								// is inline Modaal, initialise options
								modaal_inline_options(elm);
							} else {
								// is not inline modaal. Check for existing selector
								modaal_existing_selectors.forEach(function(modaalSelector) {
									if ( modaalSelector.element == elm.attr('class') ) {
										$(elm).modaal( modaalSelector.options );
										return false;
									}
								});
							}

						}
					});
				}
			});
		});
		var observer_config = {
			subtree: true,
			attributes: true,
			childList: true,
			characterData: true
		};

		// pass in the target node, as well as the observer options
		setTimeout(function() {
			modaal_dom_observer.observe(document.body, observer_config);
		}, 500);

	});

} ( jQuery, window, document ) );
(function($) {
  var methods;
  methods = {
    init: function(elements, options) {
      $(window).scroll(function() {
        methods.animate(elements, options);
      });
      $(window).trigger('scroll');
    },
    animate: function(elements, options) {
      var viewBottom, viewHeight, viewTop;
      viewHeight = $(window).height();
      viewTop = $(window).scrollTop();
      viewBottom = viewTop + viewHeight;
      $.each(elements, function() {
        var elementAnimated, elementAnimation, elementBottom, elementDelay, elementDuration, elementHeight, elementIteration, elementOffset, elementTop;
        elementAnimated = 'animated';
        elementAnimation = $(this).data('animate');
        elementOffset = $(this).data('offset');
        elementDuration = $(this).data('duration');
        elementDelay = $(this).data('delay');
        elementIteration = $(this).data('iteration');
        elementHeight = $(this).outerHeight();
        elementTop = $(this).offset().top;
        elementBottom = elementTop + elementHeight;
        if (elementOffset) {
          elementTop = elementTop + elementOffset;
          elementBottom = elementBottom - elementOffset;
        }
        if (options.animateCssVersion === 4) {
          elementAnimated = 'animate__animated';
          elementAnimation = 'animate__' + elementAnimation;
        }
        $(this).css({
          '-webkit-animation-duration': elementDuration,
          'animation-duration': elementDuration
        });
        $(this).css({
          '-webkit-animation-delay': elementDelay,
          'animation-delay': elementDelay
        });
        $(this).css({
          '-webkit-animation-iteration-count': elementIteration,
          'animation-iteration-count': elementIteration
        });
        if (elementBottom >= viewTop && elementTop <= viewBottom) {
          $(this).css('visibility', 'visible');
          $(this).addClass(elementAnimation);
          $(this).addClass(elementAnimated);
        } else {
          if (options.once === false) {
            $(this).css('visibility', 'hidden');
            $(this).removeClass(elementAnimation);
            $(this).removeClass(elementAnimated);
          }
        }
      });
    }
  };
  jQuery.fn.scrolla = function(options) {
    options = $.extend({
      mobile: false,
      once: false,
      animateCssVersion: 4
    }, options);
    if (options.mobile === false) {
      if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return false;
      }
    }
    methods.init(this, options);
  };
})(jQuery);