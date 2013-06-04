(function($){ 

    var GSwap = function() {

        var substitute = JSON.parse($('#gswapable').html());
        var target     = $('#gswap');
        var current    = 0;
        var howMany    = substitute.items.length;

        this.swap = function() {

            // Increment current or set loop to start
            current = (current < howMany - 1) ? current + 1 : 0;

            // Animate and swap
            target.animate({opacity: 0}, 500, function(){
                target.text(substitute.items[current]);
            });
            target.animate({opacity: 1}, 500);

            // Recall the swap function after animations are complete
            setTimeout(arguments.callee,1000);
        }
    };

    $.fn.gswap = function() { 
        var gswap = new GSwap();

        gswap.swap();
    };
})(jQuery);
