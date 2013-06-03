(function($){ 
    $.fn.gswap = function() { 
        var substitute = JSON.parse($('#gswapable').html());
        var target     = $('#gswap');

        $.each(substitute.items, function(index, value) {
            setTimeout(function() {
                target.text(value);            
            }, 1000 * index);
        });
    } 
})(jQuery);
