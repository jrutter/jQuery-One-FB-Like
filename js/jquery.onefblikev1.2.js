/*
	jQuery OneFBLike v1.2 - http://onerutter.com/open-source/jquery-facebook-like-plugin.html
	Copyright (c) 2010 Jake Rutter 
	Additional Code by Florian Kissling.
	This plugin available for use in all personal or commercial projects under both MIT and GPL licenses.
*/

(function($){

  $.fn.onefblike = function(options) {
    //Set the default values, use comma to separate the settings
    var defaults = {
      appID: '102476223147670',
      locale: 'en_US',
      html5: false,
      attributes: {
        href: document.location,
        send: false,
        layout: '',             // standard, button_count, box_count (defaults to standard)
        show_faces: true,
        width: 450,
        action: '',             // like, recommend (defaults to like)
        font: '',               // arial, lucida grande, segoe ui, tahoma, trebuchet ms, verdana (defaults to lucida grande)
        colorscheme: ''         // light, dark (defaults to light)
      }
    };

    var options = $.extend(defaults, options);

    return this.each(function() {
      var o = options;
      var attributes = o.attributes;
      var obj = $(this);

      // Add #fb-root div - mandatory - do not remove
      if( !($('#fb-root').length) ){
        $('body').append('<div id="fb-root"></div>');
      }

      // setup FB Developers App Link - do not touch
      window.fbAsyncInit = function() {
        FB.init({appId: o.appID, status: true, cookie: true, xfbml: true});
      };

      (function() {
        var e = document.createElement('script');
        e.async = true;
        e.src = document.location.protocol + '//connect.facebook.net/'+o.locale+'/all.js';
        $('#fb-root').append(e);
      }());

      // build like-button
      var html = "",
          tag = "fb:like ";

      $.each(attributes, function(key, value) {
        if( value !== '' ){
          if (o.html5){
            tag = 'div class="fb-like "';
            key = 'data-' + key.replace("_", "-");
          }
          html += key + '="' + value + '" ';
        }
      });

      // Apply the like button to an element on the page and include all available options
      // If no options are passed in from the page, the defaults will be applied
      $(obj).html('<' + tag + html + '/>');

    });
  };
})(jQuery);