
require(['common'], function(common) {
    // 引入树状导航模块，在模块中已经引用了JQ依赖模块
    require([
        'jquery',
        'pieceLayer',
        'pieceValidate',
        'pieceFormeEles',
        'pieceTable',
        'pieceDelBtn',
        'piecePublic'
    ],function(
        $,
        pieceLayer,
        validate,
        formEles,
        table,
        delbtn,
        public
    ){
        public.init();
        // 获取初始化后 返回的layer
        var layer = pieceLayer.init();
        delbtn.init();
        
        var $validate = $('.validate');
        if($validate.length > 0) {
            validate.init({
                class: 'validate'
            });
        }
        formEles.init();
        table.init();
    })
});