define(['layer'], function(layer){
    // require使用layer之前必须要线设置一下js文件的路径，否则会导致样式丢失
    var init = function() {
        layer.config({
            //layer.js所在的目录，可以是绝对目录，也可以是相对目录
            path: '../js/libs/layer/'
        });
        return layer;
    }

    return {
        init: init,
        confirm: confirm
    };
})