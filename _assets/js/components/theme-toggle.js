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