$(document).ready(function () {

  $("#open-search-container").click(function (e) { 
    e.preventDefault();

    $("#search-container").removeClass("hidden");
    
    $("#search-container").animate({
      top: 0,
    }, 500, function() {
      // Animation complete.
      $("body").addClass("modaal-noscroll");
      $("#search-term").focus();
    });
    
  });

  $("#close-search-container").click(function (e) { 
    e.preventDefault();
    
    $("#search-container").animate({
      top: "-100vh",
    }, 500, function() {
      // Animation complete.
      $("body").removeClass("modaal-noscroll");
      $("#open-search-container").focus();
      $("#search-container").addClass("hidden");
    });
    
  });

});