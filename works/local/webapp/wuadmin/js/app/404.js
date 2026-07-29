require(['common'], function(common) {
    require(['piecePublic'], function(public) {
        public.init();
        var wait = document.getElementById('wait');
        // var interval = setInterval(function () {
        //     var time = --wait.innerHTML;
        //     if (time <= 0) {
        //         location.href = "javascript:history.back(-1);";
        //         clearInterval(interval);
        //     }
        // }, 1000);
    })
    
});