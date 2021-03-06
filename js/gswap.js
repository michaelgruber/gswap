(function($){ 

    var GSwap = function(options) {

        var substitute  = JSON.parse($('#gswapable').html());
        var target      = $('#gswap');
        var current     = substitute.length - 1;
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
            current = (substitute[current + 1]) ? current + 1 : 0;

            // Animate and swap
            target.animate(animateOut(), outTime, function(){
                target.text(substitute[current]);
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

        var swapWidth = function() {

            // Create a sortable array
            var values = [];
            for(var i in substitute) {
                values.push(substitute[i]);
            }

            // Find the longest substitute string in that array
            var longest = values.sort(function (a, b) {
                return b.length - a.length;
            })[0];

            // Calculate its width
            var original = target.html();
            var html = '<span>' + longest + '</span>';
            target.html(html);
            var width = target.find('span:first').width();
            target.html(original);

            return width;
        }

        // ON INSTANTIATION
        target.css({
            "position": "relative",
            "width": swapWidth(),
            "display": "inline-block",
            "text-align": "center"
        });
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
