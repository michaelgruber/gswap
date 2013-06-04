(function($){ 

    var GSwap = function(options) {

        var substitute  = JSON.parse($('#gswapable').html());
        var target      = $('#gswap');
        var current     = 0;
        var howMany     = substitute.items.length;
        var inTime      = options.inTime * 1000;
        var outTime     = options.outTime * 1000;
        var pauseTime   = options.pauseTime * 1000;
        var totalTime   = inTime + outTime + pauseTime;
        var origin      = (options.axis == "y") ? "top" : "left";
        var inOffset    = (options.direction == "-") ? "-" : "";
        var outOffset   = (options.direction == "-") ? "" : "-";
        var inDistance  = inOffset + options.inDistance;
        var outDistance = outOffset + options.outDistance; 

        this.swap = function() {

            // Increment current or set loop to start
            current = (current < howMany - 1) ? current + 1 : 0;

            // Animate and swap
            target.animate(animateOut(), outTime, function(){
                target.text(substitute.items[current]);
                target.css(reset());
            });
            target.animate(animateIn(), inTime)
                  .delay(pauseTime); // delay between in and out

            // Recall the swap function after animations are complete
            setTimeout(arguments.callee, totalTime);
        }

        /* Generate options for in animation */
        var animateIn = function() {
            var options = {};
            options[origin] = "0";
            options["opacity"] = 1;
            return options;
        }

        /* Generate options for out animation */
        var animateOut = function() {
            var options = {};
            options[origin] = outDistance;
            options["opacity"] = 0;
            return options;
        }

        /* Generate options for swapped's css reset */
        var reset = function() {
            var options = {};
            options[origin] = inDistance;
            return options;
        }

        // ON INSTANTIATION
        target.css({ position: "relative" });
    };

    $.fn.gswap = function(options) { 

        var defaults = {
            inTime: 0.5, // (in seconds)
            outTime: 0.5,
            pauseTime: 0, // How long to pause between fade in and fade out
            inDistance: "10px", // Use px or em
            outDistance: "10px",
            axis: "y",
            direction: "-" // direction along axis "-" or "+"
        }
        
        var options = $.extend(defaults, options);

        var gswap = new GSwap(options);
        
        gswap.swap();
    };
})(jQuery);
