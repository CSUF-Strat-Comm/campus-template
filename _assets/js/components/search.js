$(document).ready(function() {
  document.ontouchmove = function(e){
    e.preventDefault();
  }
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
      $("#gsc-i-id1").onfocus = function () {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
      }

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
