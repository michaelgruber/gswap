(function($){ 

    var GSwap = function(options) {

        var substitute = JSON.parse($('#gswapable').html());
        var target     = $('#gswap');
        var current    = 0;
        var howMany    = substitute.items.length;
        var inTime     = options.inTime * 1000;
        var outTime    = options.outTime * 1000;
        var pauseTime  = options.pauseTime * 1000;
        var totalTime  = inTime + outTime + pauseTime;

        this.swap = function() {

            // Increment current or set loop to start
            current = (current < howMany - 1) ? current + 1 : 0;

            // Animate and swap
            target.animate({"top":"0px", "opacity":1}, inTime)
                  .delay(pauseTime);
            target.animate({"opacity": 0, "top":"10px"}, outTime, function(){
                target.text(substitute.items[current]);
                target.css({"top":"-10px", "opacity":0});
            });

            // Recall the swap function after animations are complete
            setTimeout(arguments.callee, totalTime);
        }

        // ON INSTANTIATION
        target.css({ position: "relative" });
    };

    $.fn.gswap = function(options) { 

        var defaults = {
            inTime: 0.5,  // (in seconds)
            outTime: 0.5,
            pauseTime: 0  // How long to pause between fade in and fade out
        }
        
        var options = $.extend(defaults, options);

        var gswap = new GSwap(options);
        
        gswap.swap();
    };
})(jQuery);
