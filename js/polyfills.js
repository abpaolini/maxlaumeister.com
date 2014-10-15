/*
  * TransitionEnd
  * author: Evandro Leopoldino Gonçalves <evandrolgoncalves@gmail.com>
  * https://github.com/evandrolg
  * License: MIT
*/
(function(window){
    'use strict';

    var Event = function(element, type){
        this.element = element;
        this.type = type;
    };

    Event.prototype = {
        add: function(callback){
            this.callback = callback;
            this.element.addEventListener(this.type, this.callback, false);
        },

        remove: function(){
            this.element.removeEventListener(this.type, this.callback, false);
        }
    };

    var TransitionEnd = function(element){
        this.element = element;
        this.transitionEnd = this.whichTransitionEnd();
        this.event = new Event(this.element, this.transitionEnd);
    };

    TransitionEnd.prototype = {
        whichTransitionEnd: function(){
            var transitions = {
                'WebkitTransition' : 'webkitTransitionEnd',
                'MozTransition'    : 'transitionend',
                'OTransition'      : 'oTransitionEnd otransitionend',
                'transition'       : 'transitionend'
            };

            for(var t in transitions){
                if(this.element.style[t] !== undefined){
                    return transitions[t];
                }
            }
        },

        bind: function(callback){
            this.event.add(callback);
        },

        unbind: function(){
            this.event.remove();
        }
    };

    var Cache = {
        list: [],
        
        getPosition: function(element){
            if(Array.prototype.indexOf){
                return this.list.indexOf(element);
            }

            for(var i = 0, size = this.list.length; i < size; i++){
                if(this.list[i] === element){
                    return i;
                } 
            }

            return -1;
        },

        insert: function(element){
            var positonElement = this.getPosition(element);
            var isCached = positonElement !== -1;

            if(!isCached){
                this.list.push(element);
                this.list.push(new TransitionEnd(element));

                positonElement = this.getPosition(element);
            }

            return this.list[positonElement+1];
        }
    };

    window.transitionEnd = function(el){
        if(!el){
            throw 'You need to pass an element as parameter!';
        }

        var element = el[0] || el;
        var instance = Cache.insert(element);

        return instance;
    };
}(window));

/*! LazyYT (lazy load Youtube videos plugin) - v0.3.4 - 2014-06-30
* Usage: <div class="lazyYT" data-youtube-id="laknj093n" ratio="16:9" data-parameters="rel=0">loading...</div>
* Copyright (c) 2014 Tyler Pearson; Licensed MIT */


;(function ($) {
    'use strict';

    function setUp($el) {
        var width = $el.data('width'),
            height = $el.data('height'),
            ratio = $el.data('ratio'),
            id = $el.data('youtube-id'),
            aspectRatio = ['16', '9'],
            paddingTop = 0,
            youtubeParameters = $el.data('parameters') || '';

        if (typeof width === 'undefined' || typeof height === 'undefined') {
          height = 0;
          width = '100%';
          aspectRatio = (ratio.split(":")[1] / ratio.split(":")[0]) * 100;
          paddingTop = aspectRatio + '%';
        }

        $el.css({
            'position': 'relative',
            'height': height,
            'width': width,
            'padding-top': paddingTop,
            'background': 'url(//img.youtube.com/vi/' + id + '/hqdefault.jpg) center center no-repeat',
            'cursor': 'pointer',
            'background-size': 'cover'
        })
            .html('<p id="lazyYT-title-' + id + '" class="lazyYT-title"></p><div class="lazyYT-button"></div>')
            .addClass('lazyYT-image-loaded');

        $.getJSON('https://gdata.youtube.com/feeds/api/videos/' + id + '?v=2&alt=json', function (data) {
            $('#lazyYT-title-' + id).text(data.entry.title.$t);
        });

        $el.on('click', function (e) {
            e.preventDefault();
            if (!$el.hasClass('lazyYT-video-loaded') && $el.hasClass('lazyYT-image-loaded')) {
                $el.html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' + id + '?autoplay=1&' + youtubeParameters + '" style="position:absolute; top:0; left:0; width:100%; height:100%;" frameborder="0" allowfullscreen></iframe>')
                    .removeClass('lazyYT-image-loaded')
                    .addClass('lazyYT-video-loaded');
            }
        });

    }

    $.fn.lazyYT = function () {
        return this.each(function () {
            var $el = $(this).css('cursor', 'pointer');
            setUp($el);
        });
    };

}(jQuery));
$(document).ready(function(){
	$('.lazyYT').lazyYT();
});

/*
 *		jQuery Smooth Scroll
 */
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});