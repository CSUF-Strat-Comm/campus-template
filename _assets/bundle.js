$(function(){$(".js-accordion").accordion()}),$(document).ready(function(){$(".blocks-gallery-item a").modaal({type:"image"})}),$(document).ready(function(){$('ul.main-nav-list li:has("ul")').addClass("menu-item-has-children"),$("li.menu-item-has-children > ul").addClass("sub-menu"),$('ul.main-nav-list li:has("ul")').on("mouseover keyup click mouseleave",function(t){9===t.keyCode|"mouseover"===t.type&&($(this).addClass("active"),$(this).children("a").addClass("active"),$(this).children("ul").stop(!0,!0).slideDown("200ms")),"mouseleave"===t.type&&($(this).removeClass("active"),$(this).children("a").removeClass("active"),$(this).children("ul").stop(!0,!0).slideUp("200ms"))}),$("ul.main-nav-list li > ul > li:last-child > a").on("keydown",function(t){9==t.keyCode&&($(this).parent("li").parent("ul").siblings("a").removeClass("active"),$(this).parent("li").parent("ul").stop(!0,!0).slideUp("200ms"),0<$(this).parent("li").parent("ul").parent("li").parent("ul").parent("li").children("ul").length&&$(this).parent("li").parent("ul").parent("li").is(":last-child")&&($(this).parent("li").parent("ul").parent("li").parent("a").removeClass("active"),$(this).parent("li").parent("ul").parent("li").parent("ul").stop(!0,!0).slideUp("200ms")))}),$("#mobile-menu-toggle").click(function(t){t.preventDefault(),$(this).toggleClass("is-active"),$("#main-nav-list").slideToggle().focus(),$(this).hasClass("is-active")?$(this).attr("aria-expanded",!0):$(this).attr("aria-hidden",!1)})}),$(document).ready(function(){mediaCheck({media:"(max-width: 767px)",entry:function(){$("#mobile-menu-toggle").attr("aria-hidden",!1),$("#mobile-menu-toggle").attr("aria-disabled",!1),$("#mobile-menu-toggle").attr("disabled",!1)},exit:function(){$("#mobile-menu-toggle").attr("aria-hidden",!0),$("#mobile-menu-toggle").attr("aria-disabled",!0),$("#mobile-menu-toggle").attr("disabled",!0)}})}),$(document).ready(function(){$("#open-search-container").click(function(t){t.preventDefault(),$("#search-container").removeClass("hidden"),$("#search-container").animate({top:0},500,function(){$("body").addClass("modaal-noscroll"),$("#search-term").focus()})}),$("#close-search-container").click(function(t){t.preventDefault(),$("#search-container").animate({top:"-100vh"},500,function(){$("body").removeClass("modaal-noscroll"),$("#open-search-container").focus(),$("#search-container").addClass("hidden")})})}),function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof exports?module.exports=t(require("jquery")):t(window.jQuery)}(function(r){"use strict";function o(t,a){this.options=r.extend({},e,a),this.$wrapper=t,this.$panels=r(this.options.panelsSelector,this.$wrapper),this.initAttributes(),this.initEvents()}var e={headersSelector:".js-accordion__header",panelsSelector:".js-accordion__panel",buttonsSelector:"button.js-accordion__header",buttonsGeneratedContent:"text",button:r("<button></button>",{class:"js-accordion__header",type:"button"}),buttonSuffixId:"_tab",multiselectable:!0,prefixClass:"accordion",headerSuffixClass:"__title",buttonSuffixClass:"__header",panelSuffixClass:"__panel",direction:"ltr",accordionPrefixId:"accordion"};o.prototype.initAttributes=function(){var t;this.$wrapper.attr({role:"tablist","aria-multiselectable":this.options.multiselectable.toString()}).addClass(this.options.prefixClass),this.$wrapper.attr("id")||(t=Math.random().toString(32).slice(2,12),this.$wrapper.attr("id",this.options.accordionPrefixId+"-"+t)),this.$panels.each(r.proxy(function(t,a){var e=r(a),o=r(this.options.headersSelector,e),a="html"===this.options.buttonsGeneratedContent?this.options.button.clone().html(o.html()):this.options.button.clone().text(o.text());o.addClass(this.options.prefixClass+this.options.headerSuffixClass),e.before(a);o=e.attr("id")||this.$wrapper.attr("id")+"-"+t,t=o+this.options.buttonSuffixId;a.attr({"aria-controls":o,"aria-expanded":"false",role:"tab",id:t,"aria-selected":"false"}).addClass(this.options.prefixClass+this.options.buttonSuffixClass),e.attr({"aria-labelledby":t,role:"tabpanel",id:o,"aria-hidden":"true"}).addClass(this.options.prefixClass+this.options.panelSuffixClass),"true"===e.attr("data-accordion-opened")&&(a.attr({"aria-expanded":"true","data-accordion-opened":null}),e.attr({"aria-hidden":"false"}))},this)),this.$buttons=r(this.options.buttonsSelector,this.$wrapper)},o.prototype.initEvents=function(){this.$wrapper.on("focus",this.options.buttonsSelector,r.proxy(this.focusButtonEventHandler,this)),this.$wrapper.on("click",this.options.buttonsSelector,r.proxy(this.clickButtonEventHandler,this)),this.$wrapper.on("keydown",this.options.buttonsSelector,r.proxy(this.keydownButtonEventHandler,this))},o.prototype.focusButtonEventHandler=function(t){t=r(t.target),t=t.is("button")?t:t.closest("button");r(this.options.buttonsSelector,this.$wrapper).attr({"aria-selected":"false"}),t.attr({"aria-selected":"true"})},o.prototype.clickButtonEventHandler=function(t){var a=r(t.target),e=a.is("button")?a:a.closest("button"),a=r("#"+e.attr("aria-controls"));this.$buttons.attr("aria-selected","false"),e.attr("aria-selected","true"),"false"===e.attr("aria-expanded")?(e.attr("aria-expanded","true"),a.attr("aria-hidden","false")):(e.attr("aria-expanded","false"),a.attr("aria-hidden","true")),!1===this.options.multiselectable&&(this.$panels.not(a).attr("aria-hidden","true"),this.$buttons.not(e).attr("aria-expanded","false")),setTimeout(function(){e.focus()},0),t.stopPropagation(),t.preventDefault()},o.prototype.keydownButtonEventHandler=function(t){var a=(n=r(t.target)).is("button")?n:n.closest("button"),e=this.$buttons.first(),o=this.$buttons.last(),i=this.$buttons.index(a),n=null,s="ltr"===this.options.direction?{prev:[38,37],next:[40,39],first:36,last:35}:{prev:[38,39],next:[40,37],first:36,last:35},l=[].concat(s.prev,s.next,s.first,s.last);0<=r.inArray(t.keyCode,l)&&!t.ctrlKey&&(this.$buttons.attr({"aria-selected":"false"}),36===t.keyCode?n=e:35===t.keyCode?n=o:0<=r.inArray(t.keyCode,s.prev)?n=a.is(e)?o:this.$buttons.eq(i-1):0<=r.inArray(t.keyCode,s.next)&&(n=a.is(o)?e:this.$buttons.eq(i+1)),null!==n&&this.goToHeader(n),t.preventDefault())},o.prototype.goToHeader=function(t){1===t.length&&(t.attr({"aria-selected":"true"}),setTimeout(function(){t.focus()},0))};var i="accordion";r.fn[i]=function(t){var e=r.extend({},r.fn[i].defaults,t);return this.each(function(){var t=r(this),a={multiselectable:"none"!==t.attr("data-accordion-multiselectable")&&e.multiselectable,prefixClass:void 0!==t.attr("data-accordion-prefix-classes")?t.attr("data-accordion-prefix-classes"):e.prefixClass,buttonsGeneratedContent:void 0!==t.attr("data-accordion-button-generated-content")?t.attr("data-accordion-button-generated-content"):e.buttonsGeneratedContent,direction:0<t.closest('[dir="rtl"]').length?"rtl":e.direction},a=r.extend({},e,a);t.data[i]=new o(t,a)})},r.fn[i].defaults=e}),document.addEventListener("DOMContentLoaded",function(){!function(){"use strict";var l=null,r=0,d=null,c=0,m=window,p=document,u=p.documentElement,h=p.body;function f(){r&&(clearTimeout(r),r=0,l.classList.remove("flying-focus_visible"),d.classList.remove("flying-focus_target"),d=null)}u.addEventListener("keydown",function(t){t=t.which;(9===t||36<t&&t<41)&&(c=Date.now())},!1),u.addEventListener("focus",function(t){var a,e,o,i,n,s=t.target;"flying-focus"!==s.id&&(a=!1,l||(a=!0,(l=p.createElement("flying-focus")).id="flying-focus",l.style.transitionDuration=l.style.WebkitTransitionDuration="0.15s",h.appendChild(l)),o=(e=s).getBoundingClientRect(),i=u.clientLeft||h.clientLeft,n=u.clientTop||h.clientTop,t=m.pageXOffset||u.scrollLeft||h.scrollLeft,e=m.pageYOffset||u.scrollTop||h.scrollTop,i=o.left+t-i,i={top:o.top+e-n||0,left:i||0},l.style.left=i.left+"px",l.style.top=i.top+"px",l.style.width=s.offsetWidth+"px",l.style.height=s.offsetHeight+"px",!a&&Date.now()-c<42&&(f(),s.classList.add("flying-focus_target"),l.classList.add("flying-focus_visible"),d=s,r=setTimeout(f,150)))},!0),u.addEventListener("blur",function(){f()},!0);var t=p.createElement("style");t.textContent="#flying-focus {\t\tposition: absolute;\t\tmargin: 0;\t\tbackground: transparent;\t\t-webkit-transition-property: left, top, width, height;\t\ttransition-property: left, top, width, height;\t\t-webkit-transition-timing-function: cubic-bezier(0,1,0,1);\t\ttransition-timing-function: cubic-bezier(0,1,0,1);\t\tvisibility: hidden;\t\tpointer-events: none;\t\tbox-shadow: 0 0 2px 3px #309ccf, 0 0 2px #309ccf inset; border-radius: 2px;\t}\t#flying-focus.flying-focus_visible {\t\tvisibility: visible;\t\tz-index: 9999;\t}\t.flying-focus_target {\t\toutline: none !important; /* Doesn't work in Firefox :( */\t}\t/* http://stackoverflow.com/questions/71074/how-to-remove-firefoxs-dotted-outline-on-buttons-as-well-as-links/199319 */\t.flying-focus_target::-moz-focus-inner {\t\tborder: 0 !important;\t}\t/* Replace it with @supports rule when browsers catch up */\t@media screen and (-webkit-min-device-pixel-ratio: 0) {\t\t#flying-focus {\t\t\tbox-shadow: none;\t\t\toutline: 5px auto -webkit-focus-ring-color;\t\t\toutline-offset: -3px;\t\t}\t}\t",h.appendChild(t)}()}),function(){window.mediaCheck=function(options){var breakpoints,checkQuery,convertEmToPx,createListener,getPXValue,hasMatchMedia,i,mmListener,mq,mqChange,mq=void 0,mqChange=void 0,createListener=void 0,convertEmToPx=void 0,getPXValue=void 0,hasMatchMedia=void 0!==window.matchMedia&&!!window.matchMedia("!").addListener;if(hasMatchMedia)return mqChange=function(t,a){if(t.matches?"function"==typeof a.entry&&a.entry(t):"function"==typeof a.exit&&a.exit(t),"function"==typeof a.both)return a.both(t)},createListener=function(){return(mq=window.matchMedia(options.media)).addListener(function(){return mqChange(mq,options)}),window.addEventListener("orientationchange",function(){return mq=window.matchMedia(options.media),mqChange(mq,options)},!1),mqChange(mq,options)},createListener();for(i in breakpoints={},mqChange=function(t,a){return t.matches?"function"!=typeof a.entry||!1!==breakpoints[a.media]&&null!=breakpoints[a.media]||a.entry(t):"function"!=typeof a.exit||!0!==breakpoints[a.media]&&null!=breakpoints[a.media]||a.exit(t),"function"==typeof a.both&&a.both(t),breakpoints[a.media]=t.matches},convertEmToPx=function(t){var a=void 0;return(a=document.createElement("div")).style.width="1em",a.style.position="absolute",document.body.appendChild(a),t=t*a.offsetWidth,document.body.removeChild(a),t},getPXValue=function(t,a){return"em"===a?convertEmToPx(t):t},options)breakpoints[options.media]=null;return checkQuery=function(parts){var constraint,dimension,matches,ratio,value,windowHeight,windowWidth,constraint=parts[1],dimension=parts[2],value=parts[4]?getPXValue(parseInt(parts[3],10),parts[4]):parts[3],windowWidth=window.innerWidth||document.documentElement.clientWidth,windowHeight=window.innerHeight||document.documentElement.clientHeight;return"width"===dimension?matches="max"===constraint&&windowWidth<value||"min"===constraint&&value<windowWidth:"height"===dimension?matches="max"===constraint&&windowHeight<value||"min"===constraint&&value<windowHeight:"aspect-ratio"===dimension&&(ratio=windowWidth/windowHeight,matches="max"===constraint&&eval(ratio)<eval(value)||"min"===constraint&&eval(ratio)>eval(value)),matches},mmListener=function(){for(var t,a=options.media.split(/\sand\s|,\s/),e=!0,o=0,i=a.length;o<i;o++)t=a[o].match(/\((.*?)-(.*?):\s([\d\/]*)(\w*)\)/),checkQuery(t)||(e=!1);return mqChange({media:options.media,matches:e},options)},window.addEventListener?window.addEventListener("resize",mmListener,!1):window.attachEvent&&window.attachEvent("onresize",mmListener),mmListener()}}.call(this),function(u){var i={init:function(t,a){var e=this;e.dom=u("body"),e.$elem=u(a),e.options=u.extend({},u.fn.modaal.options,e.$elem.data(),t),e.xhr=null,e.scope={is_open:!1,id:"modaal_"+(new Date).getTime()+Math.random().toString(16).substring(2),source:e.options.content_source||e.$elem.attr("href")},e.$elem.attr("data-modaal-scope",e.scope.id),e.private_options={active_class:"is_active"},e.lastFocus=null,e.options.is_locked||"confirm"==e.options.type||e.options.hide_close?e.scope.close_btn="":e.scope.close_btn='<button type="button" class="modaal-close" id="modaal-close" aria-label="'+e.options.close_aria_label+'"><span>'+e.options.close_text+"</span></button>","none"===e.options.animation&&(e.options.animation_speed=0,e.options.after_callback_delay=0),u(a).on("click.Modaal",function(t){t.preventDefault(),e.create_modaal(e,t)}),a=!0===e.options.outer_controls?"outer":"inner",e.scope.prev_btn='<button type="button" class="modaal-gallery-control modaal-gallery-prev modaal-gallery-prev-'+a+'" id="modaal-gallery-prev" aria-label="Previous image (use left arrow to change)"><span>Previous Image</span></button>',e.scope.next_btn='<button type="button" class="modaal-gallery-control modaal-gallery-next modaal-gallery-next-'+a+'" id="modaal-gallery-next" aria-label="Next image (use right arrow to change)"><span>Next Image</span></button>',!0===e.options.start_open&&e.create_modaal(e)},create_modaal:function(t,a){var e;if((t=this).lastFocus=t.$elem,!1!==t.options.should_open&&("function"!=typeof t.options.should_open||!1!==t.options.should_open())){switch(t.options.before_open.call(t,a),t.options.type){case"inline":t.create_basic();break;case"ajax":e=t.options.source(t.$elem,t.scope.source),t.fetch_ajax(e);break;case"confirm":t.options.is_locked=!0,t.create_confirm();break;case"image":t.create_image();break;case"iframe":e=t.options.source(t.$elem,t.scope.source),t.create_iframe(e);break;case"video":t.create_video(t.scope.source);break;case"instagram":t.create_instagram()}t.watch_events()}},watch_events:function(){var o=this;o.dom.off("click.Modaal keyup.Modaal keydown.Modaal"),o.dom.on("keydown.Modaal",function(t){var a=t.keyCode,t=t.target;9==a&&o.scope.is_open&&(u.contains(document.getElementById(o.scope.id),t)||u("#"+o.scope.id).find('*[tabindex="0"]').focus())}),o.dom.on("keyup.Modaal",function(t){var a=t.keyCode,e=t.target;if(t.shiftKey&&9==t.keyCode&&o.scope.is_open&&(u.contains(document.getElementById(o.scope.id),e)||u("#"+o.scope.id).find(".modaal-close").focus()),!o.options.is_locked&&27==a&&o.scope.is_open)return!u(document.activeElement).is("input:not(:checkbox):not(:radio)")&&void o.modaal_close();"image"==o.options.type&&(37==a&&o.scope.is_open&&!u("#"+o.scope.id+" .modaal-gallery-prev").hasClass("is_hidden")&&o.gallery_update("prev"),39==a&&o.scope.is_open&&!u("#"+o.scope.id+" .modaal-gallery-next").hasClass("is_hidden")&&o.gallery_update("next"))}),o.dom.on("click.Modaal",function(t){t=u(t.target);if(o.options.is_locked||!(o.options.overlay_close&&t.is(".modaal-inner-wrapper")||t.is(".modaal-close")||t.closest(".modaal-close").length))return t.is(".modaal-confirm-btn")?(t.is(".modaal-ok")&&o.options.confirm_callback.call(o,o.lastFocus),t.is(".modaal-cancel")&&o.options.confirm_cancel_callback.call(o,o.lastFocus),void o.modaal_close()):void(t.is(".modaal-gallery-control")&&(t.hasClass("is_hidden")||(t.is(".modaal-gallery-prev")&&o.gallery_update("prev"),t.is(".modaal-gallery-next")&&o.gallery_update("next"))));o.modaal_close()})},build_modal:function(t){var a=this,e="";"instagram"==a.options.type&&(e=" modaal-instagram");var o,i="video"==a.options.type?"modaal-video-wrap":"modaal-content";switch(a.options.animation){case"fade":o=" modaal-start_fade";break;case"slide-down":o=" modaal-start_slidedown";break;default:o=" modaal-start_none"}var n="";a.options.fullscreen&&(n=" modaal-fullscreen"),""===a.options.custom_class&&void 0===a.options.custom_class||(a.options.custom_class=" "+a.options.custom_class);var s="";a.options.width&&a.options.height&&"number"==typeof a.options.width&&"number"==typeof a.options.height?s=' style="max-width:'+a.options.width+"px;height:"+a.options.height+'px;overflow:auto;"':a.options.width&&"number"==typeof a.options.width?s=' style="max-width:'+a.options.width+'px;"':a.options.height&&"number"==typeof a.options.height&&(s=' style="height:'+a.options.height+'px;overflow:auto;"'),"image"!=a.options.type&&"video"!=a.options.type&&"instagram"!=a.options.type&&!a.options.fullscreen||(s="");var l="";a.is_touch()&&(l=' style="cursor:pointer;"');l='<div class="modaal-wrapper modaal-'+a.options.type+o+e+n+a.options.custom_class+'" id="'+a.scope.id+'"><div class="modaal-outer-wrapper"><div class="modaal-inner-wrapper"'+l+">";"video"!=a.options.type&&(l+='<div class="modaal-container"'+s+">"),l+='<div class="'+i+' modaal-focus" aria-hidden="false" aria-label="'+a.options.accessible_title+" - "+a.options.close_aria_label+'" role="dialog">',"inline"==a.options.type?l+='<div class="modaal-content-container" role="document"></div>':l+=t,l+="</div>"+a.scope.close_btn,"video"!=a.options.type&&(l+="</div>"),l+="</div>","image"==a.options.type&&!0===a.options.outer_controls&&(l+=a.scope.prev_btn+a.scope.next_btn),l+="</div></div>",u("#"+a.scope.id+"_overlay").length<1&&a.dom.append(l),"inline"==a.options.type&&t.appendTo("#"+a.scope.id+" .modaal-content-container"),a.modaal_overlay("show")},create_basic:function(){var t=u(this.scope.source),a="";t.length?(a=t.contents().detach(),t.empty()):a="Content could not be loaded. Please check the source and try again.",this.build_modal(a)},create_instagram:function(){var e=this,t=e.options.instagram_id,a="",o="Instagram photo couldn't be loaded, please check the embed code and try again.";return e.build_modal('<div class="modaal-content-container'+(""!=e.options.loading_class?" "+e.options.loading_class:"")+'">'+e.options.loading_content+"</div>"),""!=t&&null!=t?u.ajax({url:"https://api.instagram.com/oembed?url=http://instagr.am/p/"+t+"/",dataType:"jsonp",cache:!1,success:function(t){e.dom.append('<div id="temp-ig" style="width:0;height:0;overflow:hidden;">'+t.html+"</div>"),e.dom.attr("data-igloaded")?window.instgrm.Embeds.process():e.dom.attr("data-igloaded","true");var a="#"+e.scope.id+" .modaal-content-container";0<u(a).length&&setTimeout(function(){u("#temp-ig").contents().clone().appendTo(a),u("#temp-ig").remove()},1e3)},error:function(){a=o;var t=u("#"+e.scope.id+" .modaal-content-container");0<t.length&&(t.removeClass(e.options.loading_class).addClass(e.options.ajax_error_class),t.html(a))}}):a=o,!1},fetch_ajax:function(t){var e=this;null==e.options.accessible_title&&(e.options.accessible_title="Dialog Window"),null!==e.xhr&&(e.xhr.abort(),e.xhr=null),e.build_modal('<div class="modaal-content-container'+(""!=e.options.loading_class?" "+e.options.loading_class:"")+'">'+e.options.loading_content+"</div>"),e.xhr=u.ajax(t,{success:function(t){var a=u("#"+e.scope.id).find(".modaal-content-container");0<a.length&&(a.removeClass(e.options.loading_class),a.html(t),e.options.ajax_success.call(e,a))},error:function(t){"abort"==t.statusText||0<(t=u("#"+e.scope.id+" .modaal-content-container")).length&&(t.removeClass(e.options.loading_class).addClass(e.options.ajax_error_class),t.html("Content could not be loaded. Please check the source and try again."))}})},create_confirm:function(){var t=this,a='<div class="modaal-content-container"><h1 id="modaal-title">'+t.options.confirm_title+'</h1><div class="modaal-confirm-content">'+t.options.confirm_content+'</div><div class="modaal-confirm-wrap"><button type="button" class="modaal-confirm-btn modaal-ok" aria-label="Confirm">'+t.options.confirm_button_text+'</button><button type="button" class="modaal-confirm-btn modaal-cancel" aria-label="Cancel">'+t.options.confirm_cancel_button_text+"</button></div></div></div>";t.build_modal(a)},create_image:function(){var t=this,a="";if(t.$elem.is("[data-group]")||t.$elem.is("[rel]")){var e=t.$elem.is("[data-group]"),o=e?t.$elem.attr("data-group"):t.$elem.attr("rel"),e=u(e?'[data-group="'+o+'"]':'[rel="'+o+'"]');e.removeAttr("data-gallery-active","is_active"),t.$elem.attr("data-gallery-active","is_active");var o=e.length-1,d=[],a='<div class="modaal-gallery-item-wrap">';e.each(function(t,a){var e="",o="",i="",n=!1,s=!1,l=a.getAttribute("data-modaal-desc"),r=a.getAttribute("data-gallery-active");u(a).attr("data-modaal-content-source")?e=u(a).attr("data-modaal-content-source"):u(a).attr("href")?e=u(a).attr("href"):u(a).attr("src")?e=u(a).attr("src"):(e="trigger requires href or data-modaal-content-source attribute",s=!0),i=""!=l&&null!=l?'<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image '+(t+1)+" - </span>"+(o=l).replace(/</g,"&lt;").replace(/>/g,"&gt;")+"</div>":'<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image '+(t+1)+"</span></div>",d.push({url:e,alt:o,rawdesc:l,desc:i,active:n=r?!0:n,src_error:s})});for(var i=0;i<d.length;i++){var n="",s=d[i].rawdesc?"Image: "+d[i].rawdesc:"Image "+i+" no description";a+='<div class="modaal-gallery-item gallery-item-'+i+(n=d[i].active?" "+t.private_options.active_class:n)+'" aria-label="'+s+'">'+(d[i].src_error?d[i].url:'<img src="'+d[i].url+'" alt=" " style="width:100%">')+d[i].desc+"</div>"}a+="</div>",1!=t.options.outer_controls&&(a+=t.scope.prev_btn+t.scope.next_btn)}else{var l,e=!1;t.$elem.attr("data-modaal-content-source")?l=t.$elem.attr("data-modaal-content-source"):t.$elem.attr("href")?l=t.$elem.attr("href"):t.$elem.attr("src")?l=t.$elem.attr("src"):(l="trigger requires href or data-modaal-content-source attribute",e=!0);var r="",s="";t.$elem.attr("data-modaal-desc")?(s=t.$elem.attr("data-modaal-desc"),r='<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image - </span>'+t.$elem.attr("data-modaal-desc").replace(/</g,"&lt;").replace(/>/g,"&gt;")+"</div>"):s="Image with no description",a='<div class="modaal-gallery-item is_active" aria-label="'+s+'">'+(e?l:'<img src="'+l+'" alt=" " style="width:100%">')+r+"</div>"}r=a,t.build_modal(r),u(".modaal-gallery-item.is_active").is(".gallery-item-0")&&u(".modaal-gallery-prev").hide(),u(".modaal-gallery-item.is_active").is(".gallery-item-"+o)&&u(".modaal-gallery-next").hide()},gallery_update:function(t){var i=this,n=u("#"+i.scope.id),s=n.find(".modaal-gallery-item").length-1;if(0==s)return!1;var l=n.find(".modaal-gallery-prev"),r=n.find(".modaal-gallery-next"),d=0,c=0,m=n.find(".modaal-gallery-item."+i.private_options.active_class),p="next"==t?m.next(".modaal-gallery-item"):m.prev(".modaal-gallery-item");return i.options.before_image_change.call(i,m,p),("prev"!=t||!n.find(".gallery-item-0").hasClass("is_active"))&&(("next"!=t||!n.find(".gallery-item-"+s).hasClass("is_active"))&&void m.stop().animate({opacity:0},250,function(){p.addClass("is_next").css({position:"absolute",display:"block",opacity:0});var t=u(document).width(),a=1140<t?280:50;d=n.find(".modaal-gallery-item.is_next").width(),c=n.find(".modaal-gallery-item.is_next").height();var e=n.find(".modaal-gallery-item.is_next img").prop("naturalWidth"),o=n.find(".modaal-gallery-item.is_next img").prop("naturalHeight");c=t-a<e?(d=t-a,n.find(".modaal-gallery-item.is_next").css({width:d}),n.find(".modaal-gallery-item.is_next img").css({width:d}),n.find(".modaal-gallery-item.is_next").find("img").height()):(d=e,o),n.find(".modaal-gallery-item-wrap").stop().animate({width:d,height:c},250,function(){m.removeClass(i.private_options.active_class+" "+i.options.gallery_active_class).removeAttr("style"),m.find("img").removeAttr("style"),p.addClass(i.private_options.active_class+" "+i.options.gallery_active_class).removeClass("is_next").css("position",""),p.stop().animate({opacity:1},250,function(){u(this).removeAttr("style").css({width:"100%"}),u(this).find("img").css("width","100%"),n.find(".modaal-gallery-item-wrap").removeAttr("style"),i.options.after_image_change.call(i,p)}),n.find(".modaal-gallery-item").removeAttr("tabindex"),n.find(".modaal-gallery-item."+i.private_options.active_class).attr("tabindex","0").focus(),n.find(".modaal-gallery-item."+i.private_options.active_class).is(".gallery-item-0")?l.stop().animate({opacity:0},150,function(){u(this).hide()}):l.stop().css({display:"block",opacity:l.css("opacity")}).animate({opacity:1},150),n.find(".modaal-gallery-item."+i.private_options.active_class).is(".gallery-item-"+s)?r.stop().animate({opacity:0},150,function(){u(this).hide()}):r.stop().css({display:"block",opacity:l.css("opacity")}).animate({opacity:1},150)})}))},create_video:function(t){this.build_modal('<div class="modaal-video-container">'+('<iframe src="'+t+'" class="modaal-video-frame" frameborder="0" allowfullscreen></iframe>')+"</div>")},create_iframe:function(t){var a=this,t=null!==a.options.width||void 0!==a.options.width||null!==a.options.height||void 0!==a.options.height?'<iframe src="'+t+'" class="modaal-iframe-elem" frameborder="0" allowfullscreen></iframe>':'<div class="modaal-content-container">Please specify a width and height for your iframe</div>';a.build_modal(t)},modaal_open:function(){var t=this,a=u("#"+t.scope.id),e=t.options.animation;"none"===e&&(a.removeClass("modaal-start_none"),t.options.after_open.call(t,a)),"fade"===e&&a.removeClass("modaal-start_fade"),"slide-down"===e&&a.removeClass("modaal-start_slide_down");u(".modaal-wrapper *[tabindex=0]").removeAttr("tabindex"),("image"==t.options.type?u("#"+t.scope.id).find(".modaal-gallery-item."+t.private_options.active_class):a.find(".modaal-iframe-elem").length?a.find(".modaal-iframe-elem"):a.find(".modaal-video-wrap").length?a.find(".modaal-video-wrap"):a.find(".modaal-focus")).attr("tabindex","0").focus(),"none"!==e&&setTimeout(function(){t.options.after_open.call(t,a)},t.options.after_callback_delay)},modaal_close:function(){var t=this,a=u("#"+t.scope.id);t.options.before_close.call(t,a),null!==t.xhr&&(t.xhr.abort(),t.xhr=null),"none"===t.options.animation&&a.addClass("modaal-start_none"),"fade"===t.options.animation&&a.addClass("modaal-start_fade"),"slide-down"===t.options.animation&&a.addClass("modaal-start_slide_down"),setTimeout(function(){"inline"==t.options.type&&u("#"+t.scope.id+" .modaal-content-container").contents().detach().appendTo(t.scope.source),a.remove(),t.options.after_close.call(t),t.scope.is_open=!1},t.options.after_callback_delay),t.modaal_overlay("hide"),null!=t.lastFocus&&t.lastFocus.focus()},modaal_overlay:function(t){var a=this;"show"==t?(a.scope.is_open=!0,a.options.background_scroll||a.dom.addClass("modaal-noscroll"),u("#"+a.scope.id+"_overlay").length<1&&a.dom.append('<div class="modaal-overlay" id="'+a.scope.id+'_overlay"></div>'),u("#"+a.scope.id+"_overlay").css("background",a.options.background).stop().animate({opacity:a.options.overlay_opacity},a.options.animation_speed,function(){a.modaal_open()})):"hide"==t&&u("#"+a.scope.id+"_overlay").stop().animate({opacity:0},a.options.animation_speed,function(){u(this).remove(),a.dom.removeClass("modaal-noscroll")})},is_touch:function(){return"ontouchstart"in window||navigator.maxTouchPoints}},n=[];function o(t){var a={},e=!1;t.attr("data-modaal-type")&&(e=!0,a.type=t.attr("data-modaal-type")),t.attr("data-modaal-content-source")&&(e=!0,a.content_source=t.attr("data-modaal-content-source")),t.attr("data-modaal-animation")&&(e=!0,a.animation=t.attr("data-modaal-animation")),t.attr("data-modaal-animation-speed")&&(e=!0,a.animation_speed=t.attr("data-modaal-animation-speed")),t.attr("data-modaal-after-callback-delay")&&(e=!0,a.after_callback_delay=t.attr("data-modaal-after-callback-delay")),t.attr("data-modaal-is-locked")&&(e=!0,a.is_locked="true"===t.attr("data-modaal-is-locked")),t.attr("data-modaal-hide-close")&&(e=!0,a.hide_close="true"===t.attr("data-modaal-hide-close")),t.attr("data-modaal-background")&&(e=!0,a.background=t.attr("data-modaal-background")),t.attr("data-modaal-overlay-opacity")&&(e=!0,a.overlay_opacity=t.attr("data-modaal-overlay-opacity")),t.attr("data-modaal-overlay-close")&&(e=!0,a.overlay_close="false"!==t.attr("data-modaal-overlay-close")),t.attr("data-modaal-accessible-title")&&(e=!0,a.accessible_title=t.attr("data-modaal-accessible-title")),t.attr("data-modaal-start-open")&&(e=!0,a.start_open="true"===t.attr("data-modaal-start-open")),t.attr("data-modaal-fullscreen")&&(e=!0,a.fullscreen="true"===t.attr("data-modaal-fullscreen")),t.attr("data-modaal-custom-class")&&(e=!0,a.custom_class=t.attr("data-modaal-custom-class")),t.attr("data-modaal-close-text")&&(e=!0,a.close_text=t.attr("data-modaal-close-text")),t.attr("data-modaal-close-aria-label")&&(e=!0,a.close_aria_label=t.attr("data-modaal-close-aria-label")),t.attr("data-modaal-background-scroll")&&(e=!0,a.background_scroll="true"===t.attr("data-modaal-background-scroll")),t.attr("data-modaal-width")&&(e=!0,a.width=parseInt(t.attr("data-modaal-width"))),t.attr("data-modaal-height")&&(e=!0,a.height=parseInt(t.attr("data-modaal-height"))),t.attr("data-modaal-confirm-button-text")&&(e=!0,a.confirm_button_text=t.attr("data-modaal-confirm-button-text")),t.attr("data-modaal-confirm-cancel-button-text")&&(e=!0,a.confirm_cancel_button_text=t.attr("data-modaal-confirm-cancel-button-text")),t.attr("data-modaal-confirm-title")&&(e=!0,a.confirm_title=t.attr("data-modaal-confirm-title")),t.attr("data-modaal-confirm-content")&&(e=!0,a.confirm_content=t.attr("data-modaal-confirm-content")),t.attr("data-modaal-gallery-active-class")&&(e=!0,a.gallery_active_class=t.attr("data-modaal-gallery-active-class")),t.attr("data-modaal-loading-content")&&(e=!0,a.loading_content=t.attr("data-modaal-loading-content")),t.attr("data-modaal-loading-class")&&(e=!0,a.loading_class=t.attr("data-modaal-loading-class")),t.attr("data-modaal-ajax-error-class")&&(e=!0,a.ajax_error_class=t.attr("data-modaal-ajax-error-class")),t.attr("data-modaal-instagram-id")&&(e=!0,a.instagram_id=t.attr("data-modaal-instagram-id")),e&&t.modaal(a)}u.fn.modaal=function(o){return this.each(function(t){var a=u(this).data("modaal");if(a){if("string"==typeof o)switch(o){case"open":a.create_modaal(a);break;case"close":a.modaal_close()}}else{var e=Object.create(i);e.init(o,this),u.data(this,"modaal",e),n.push({element:u(this).attr("class"),options:o})}})},u.fn.modaal.options={type:"inline",content_source:null,animation:"fade",animation_speed:300,after_callback_delay:350,is_locked:!1,hide_close:!1,background:"#000",overlay_opacity:"0.8",overlay_close:!0,accessible_title:"Dialog Window",start_open:!1,fullscreen:!1,custom_class:"",background_scroll:!1,should_open:!0,close_text:"Close",close_aria_label:"Close (Press escape to close)",width:null,height:null,before_open:function(){},after_open:function(){},before_close:function(){},after_close:function(){},source:function(t,a){return a},confirm_button_text:"Confirm",confirm_cancel_button_text:"Cancel",confirm_title:"Confirm Title",confirm_content:"<p>This is the default confirm dialog content. Replace me through the options</p>",confirm_callback:function(){},confirm_cancel_callback:function(){},gallery_active_class:"gallery_active_item",outer_controls:!1,before_image_change:function(t,a){},after_image_change:function(t){},loading_content:'<div class="modaal-loading-spinner"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>',loading_class:"is_loading",ajax_error_class:"modaal-error",ajax_success:function(){},instagram_id:null},u(function(){var t=u(".modaal");t.length&&t.each(function(){o(u(this))});var a=new MutationObserver(function(t){t.forEach(function(t){t.addedNodes&&0<t.addedNodes.length&&[].some.call(t.addedNodes,function(t){var a=u(t);(a.is("a")||a.is("button"))&&(a.hasClass("modaal")?o(a):n.forEach(function(t){if(t.element==a.attr("class"))return u(a).modaal(t.options),!1}))})})}),e={subtree:!0,attributes:!0,childList:!0,characterData:!0};setTimeout(function(){a.observe(document.body,e)},500)})}(jQuery,(window,document));