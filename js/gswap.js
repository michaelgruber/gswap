(function($){ 
    $.fn.gswap = function() { 
        var substitute = JSON.parse($('#gswapable').html());

        $.each(substitute.items, function(index, value) {
              console.log(value);
        });
    } 
})(jQuery);
