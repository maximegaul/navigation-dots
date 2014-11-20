/*
magneticScroll v1.0
by Maxime Gaul
https://github.com/maximegaul/magnetic-scroll
*/
(function($) {

String.prototype.navDotsRepeat = function( num ) {
  return new Array( num + 1 ).join( this );
}

$.fn.outerHTML = function(s) {
return s
  ? this.before(s).remove()
  : jQuery("<p>").append(this.eq(0).clone()).html();
};

$.fn.navDots=function(options) {

  var defauts=
  {
    "id": "navdots",
    "dotClass": "dot",
    "activeClass": "active",
    "easing": "swing",
    "speed": "700",
    "offset": "400",
    "style": true,
    "minDots": 1,
    "navStyle" : {
      'position' : 'fixed',
      'right' : '20px',
      'top' : '50%',
      'z-index' : '100'
    },
    "dotStyle" : {
      'background-color' : 'black',
      'border-radius' : '8px',
      'cursor' : 'pointer',
      'height' : '8px',
      'margin-bottom' : '5px',
      'width' : '8px'
    }
  };

 var param=$.extend(defauts, options);

  if(param.style != true) {
    param.navStyle = "";
    param.dotStyle = "";
  }

  var containers = this;
  var containers_nb = containers.length;
  if(containers_nb <= param.minDots) {
    return;
  }
  var body = $("body");

  //Creating dots list
  var dot = $('<div>',  {
    'class': param.dotClass,
    css: param.dotStyle
  });
  var list = $('<div>', {
    id: param.id,
    html: dot.outerHTML().navDotsRepeat(containers_nb),
    css: param.navStyle
  });

  body.append(list);

  //Dot click
  $("." + param.dotClass).click(function() {
    //Scroll
    var dotIndex = $("."+param.dotClass).index($(this));
    containers.eq(dotIndex).offset().top;
    $("html, body").animate({
      'scrollTop': containers.eq(dotIndex).offset().top + 'px'
    }, param.speed, param.easing);
  })

  //Scroll
  $(window).scroll(function() {
    var scrolled = $(window).scrollTop();
    var activeDot = 0;
    contloop:
    for(var i = 0; i < containers_nb; i++) {
      if(parseInt(scrolled) + parseInt(param.offset) < containers.eq(i).offset().top) {
        activeDot = i;
        break contloop;
      }
    }

    activeDot--;

    if($("." + param.dotClass + "." + param.activeClass).length == 0) {
      $("." + param.dotClass+":eq("+activeDot+")").addClass(param.activeClass);
    } else if($("." + param.dotClass+":eq("+activeDot+")") != $("." + param.dotClass + "." + param.activeClass)) {
      $("." + param.dotClass + "." + param.activeClass).removeClass(param.activeClass);
      $("." + param.dotClass+":eq("+activeDot+")").addClass(param.activeClass);
    }
  }).scroll();

};

})(jQuery);
