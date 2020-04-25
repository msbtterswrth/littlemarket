(function($, Drupal, drupalSettings) {
    "use strict";
    function initmatchHeight(context) {
      $(function() {
        $('.equal-match').matchHeight({
            target: $('.equal-match.match'),
        });
        $('.equal').matchHeight({
            byRow: true,
        });
        $('.equal-row article').matchHeight({
            byRow: false,
        });
        $('.equal-group').each(function(){
            $(this).find('.equal').matchHeight();
        });
        $('.equal-group').each(function(){
            $(this).find('.equal-match').matchHeight({
                target: $('.equal-match.match'),
            });
        });
      });
    }
    function initHeaderScroll(context) {
        var s = $("header");
        var b = $("body");
        var pos = s.position();					   
        $(window).scroll(function() {
            var windowpos = $(window).scrollTop();
            if (windowpos >= pos.top & windowpos >50) {
                b.addClass("up");
                b.removeClass("down");
            } else {
                b.addClass("down");
                b.removeClass("up");	
            }
        });
    }
    function initExternalLinks(context) {
        $('a[href*="//"]:not([href*="' + document.location.hostname + '"])', context).attr("target", "_blank").addClass("external");
    }
    function initBootstrapSelect(context) {
        $(".selectpicker", context).selectpicker({});
    }
    function initSlick(context) {
        $('.slick').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            adaptiveHeight:true,
            prevArrow: $('.prev-slide'),
            nextArrow: $('.next-slide'),
            autoplay:true
        });
        $('.single').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: '.thumbs',
        });
        $('.thumbs').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.single',
            dots: true,
            centerMode: true,
            focusOnSelect: true
        });
    }
    function initCopy(context) {
        var clipboard = new ClipboardJS('.copy-link');
        clipboard.on('success', function(e) {
            $('.copy-link').addClass("success");
            e.clearSelection();
        });

        clipboard.on('error', function(e) {
            $('.copy-link').addClass("error");
        });
    }
    function initSmoothScroll(context) {
        $('a[href*="#"]:not([href="#"])', context).click(function() {
            if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html, body").animate({
                        scrollTop: target.offset().top
                    }, 1e3);
                    return false;
                }
            }
        });
    }
    function initScrollClass(context) {
      $(window).scroll(function() {    
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $('body').addClass("scroll");
        } else {
            $('body').removeClass("scroll");
        }
      });
    }
    Drupal.behaviors.staffordshire = {
        _isInvokedByDocumentReady: true,
        attach: function(context) {
            if (this._isInvokedByDocumentReady) {
                this._isInvokedByDocumentReady = false;
            }
            initCopy(context);
            initScrollClass(context);
            initExternalLinks(context);
            initmatchHeight(context);
            initBootstrapSelect(context);
            initSmoothScroll(context);
            initSlick(context);
            initHeaderScroll(context);
            $(".search-toggle").click(function() {
                $("body").toggleClass("search-open");
                $("body").removeClass("menu-open");
            });
            $(".filter-toggle").click(function() {
                $("body").toggleClass("filter-open");
            });
            $(".menu-toggle").click(function() {
                $("body").toggleClass("menu-open");
                $("body").removeClass("search-open");
            });
            $("nav .parent").click(function() {
                $(this).toggleClass("open");                
                $(this).siblings().removeClass('open');
            });
            
        }
    };
})(jQuery, Drupal, drupalSettings);