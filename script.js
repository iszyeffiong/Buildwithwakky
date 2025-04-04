//ScrollIt JS File

(function($) {
    'use strict';

    var pluginName = 'ScrollIt',
        pluginVersion = '1.0.3';

    /*
     * OPTIONS
     */
    var defaults = {
        upKey: 38,
        downKey: 40,
        easing: 'linear',
        scrollTime: 600,
        activeClass: 'active',
        onPageChange: null,
        topOffset : 0
    };

    $.scrollIt = function(options) {

        /*
         * DECLARATIONS
         */
        var settings = $.extend(defaults, options),
            active = 0,
            lastIndex = $('[data-scroll-index]:last').attr('data-scroll-index');

        /*
         * METHODS
         */

        /**
         * navigate
         *
         * sets up navigation animation
         */
        var navigate = function(ndx) {
            if(ndx < 0 || ndx > lastIndex) return;

            var targetTop = $('[data-scroll-index=' + ndx + ']').offset().top + settings.topOffset + 1;
            $('html,body').animate({
                scrollTop: targetTop,
                easing: settings.easing
            }, settings.scrollTime);
        };

        /**
         * doScroll
         *
         * runs navigation() when criteria are met
         */
        var doScroll = function (e) {
            var target = $(e.target).closest("[data-scroll-nav]").attr('data-scroll-nav') ||
            $(e.target).closest("[data-scroll-goto]").attr('data-scroll-goto');
            navigate(parseInt(target));
        };

        /**
         * keyNavigation
         *
         * sets up keyboard navigation behavior
         */
        var keyNavigation = function (e) {
            var key = e.which;
            if($('html,body').is(':animated') && (key == settings.upKey || key == settings.downKey)) {
                return false;
            }
            if(key == settings.upKey && active > 0) {
                navigate(parseInt(active) - 1);
                return false;
            } else if(key == settings.downKey && active < lastIndex) {
                navigate(parseInt(active) + 1);
                return false;
            }
            return true;
        };

        /**
         * updateActive
         *
         * sets the currently active item
         */
        var updateActive = function(ndx) {
            if(settings.onPageChange && ndx && (active != ndx)) settings.onPageChange(ndx);

            active = ndx;
            $('[data-scroll-nav]').removeClass(settings.activeClass);
            $('[data-scroll-nav=' + ndx + ']').addClass(settings.activeClass);
        };

        /**
         * watchActive
         *
         * watches currently active item and updates accordingly
         */
        var watchActive = function() {
            var winTop = $(window).scrollTop();

            var visible = $('[data-scroll-index]').filter(function(ndx, div) {
                return winTop >= $(div).offset().top + settings.topOffset &&
                winTop < $(div).offset().top + (settings.topOffset) + $(div).outerHeight()
            });
            var newActive = visible.first().attr('data-scroll-index');
            updateActive(newActive);
        };

        /*
         * runs methods
         */
        $(window).on('scroll',watchActive).scroll();

        $(window).on('keydown', keyNavigation);

        $('body').on('click','[data-scroll-nav], [data-scroll-goto]', function(e){
            e.preventDefault();
            doScroll(e);
        });

    };
}(jQuery));

// Javascript main.js functions

$(document).ready(function() {
    $(window).on("scroll", function() {
        if($(this).scrollTop() > 90) {
            $(".navbar").addClass("navbar-shrink");
        } else {
            $(".navbar").removeClass("navbar-shrink");
        }
    });

    function parallaxMouse() {
        if($("#parallax").length) {
            var scene = document.getElementById("parallax");
            var parallax = new Parallax(scene);
        }
    }

    parallaxMouse();

    //skills meter

    $(window).scroll(function(){
        var hT = $("#skill-bar-wrapper").offset().top;
        var hH = $("#skill-bar-wrapper").outerHeight();
        var wH = $(window).height();
        var wS = $(this).scrollTop();

        if( wS > (hT + hH - 1.4 * wH)){
            jQuery('.skillbar-container').each(function(){
                jQuery(this).find('.skills').animate({
                    width:jQuery(this).attr('data-percent')
                }, 5000)
            })
        }
    })

    //filter
    ///enabling active button
    let $btns = $('.img-gallery .sortBtn .filter-btn');
    $btns.click(function(e) {
        $('.img-gallery .sortBtn .filter-btn').removeClass('active');
        e.target.classList.add('active');

    ///enabling filter selection according to the active button
        let selector = $(e.target).attr('data-filter');
        $('.img-gallery .grid').isotope({
            filter:selector
        })
        return false;
    })

    ///enabling gallery mode with magnific popup.js and maginif popup.css
    $('.image-popup').magnificPopup({
        type:'image',
        gallery: { enabled: true }
    })

    // owl carousel
    $('.testimonial-slider').owlCarousel({
        loop:true,
        margin:0,
        autoplay:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            1000:{
                items:3,
            }
        }
    })

    //scrollit
    $.scrollIt({
        topOffset:-50
    })

    //Hiding Mobile Navbar when a nav link is clicked
    $(".nav-link").on("click", function() {
        $(".navbar-collapse").collapse("hide");
    })

});

  // Initialize Bootstrap components
// Make sure only one accordion item is open at a time
$('#accordion .collapse').on('show.bs.collapse', function() {
    $('#accordion .collapse.show').collapse('hide');
  }); 

  // Replace this:
setTimeout(function() {
    const botResponse = "Thank you for your inquiry...";
    // ...
  }, 1000);
  

  // Initialize draggable chat
if (window.jQuery.ui && typeof window.jQuery.ui.draggable === 'function') {
    window.jQuery("#chat-widget").draggable({
      handle: ".chat-header",
      containment: "window",
    })
  }
  
  // Chat widget functionality
  window.jQuery(".inquiry-btn").on("click", function() {
    const serviceType = window.jQuery(this).data("service") || "our services";
    window.jQuery("#serviceType").text(serviceType);
    window.jQuery("#chat-widget").addClass("open");
    return false;
  });
  
  window.jQuery(".chat-toggle").on("click", () => {
    window.jQuery("#chat-widget").toggleClass("open")
    return false
  })
  
  window.jQuery(".chat-close").on("click", () => {
    window.jQuery("#chat-widget").removeClass("open")
    return false
  })
  
  window.jQuery("#send-button").on("click", () => {
    sendMessage()
  })
  
  window.jQuery("#user-input").on("keypress", (e) => {
    if (e.which === 13) {
      sendMessage()
    }
  })
  
  function sendMessage() {
    const userInput = window.jQuery("#user-input").val();
    if (userInput && typeof userInput === 'string' && userInput.trim() !== "") {
      // Add user message to chat
      window.jQuery("#chat-messages").append(`
        <div class="message user-message">
          <div class="message-content">
            ${userInput}
          </div>
        </div>
      `);
      
      // Clear input field
      window.jQuery("#user-input").val("");
      
      // Scroll to bottom of chat
      const chatMessages = document.getElementById("chat-messages");
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
      
      // Here you would typically call your AI script to get a response
      // For now, we'll simulate a response after a short delay
      setTimeout(function() {
        // This is where you'll integrate your AI script later
        const botResponse = "Thank you for your inquiry. Our team will process your request and get back to you shortly.";
        
        window.jQuery("#chat-messages").append(`
          <div class="message bot-message">
            <div class="message-content">
              ${botResponse}
            </div>
          </div>
        `);
      
        // Scroll to bottom again after bot response
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      }, 1000);
    }
  }
