// initialize accordions
$(function () {
  $('.js-accordion').accordion({ 
    multiselectable: false
  });

  $("a[target='_blank']").append('&nbsp;<span class="material-icons-outlined text-size-sm" title="Opens in new window">open_in_new</span>');

});