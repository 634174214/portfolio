require(['common'], function(common) {
    // 引入树状导航模块，在模块中已经引用了JQ依赖模块
    require([
        'jquery',
        'pieceDelBtn',
        'pieceTable',
        'pieceValidate',
        'piecePublic'
    ],
    function(
        $,
        delbtn,
        table,
        validate,
        public
    ){
        public.init();
        // 获取初始化后 返回的layer
        delbtn.init();
        table.init();
        // 如果存在验证表单那么就进行验证
        if($('.validate').length > 0) {
            validate.init({
                class: 'validate'
            });
        }
    })
});