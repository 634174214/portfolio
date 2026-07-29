// 用于修改用户名 和 密码
require(['common'], function(common) {
    // 引入树状导航模块，在模块中已经引用了JQ依赖模块
    require([
        'jquery',
        'pieceLayer',
        'pieceValidate',
        'piecePublic'
    ],function(
        $,
        pieceLayer,
        validate,
        public
    ){
        public.init();
        // 获取初始化后 返回的layer
        var layer = pieceLayer.init();
        
        
        validate.init({
            class: 'validate'
        });
    })
});