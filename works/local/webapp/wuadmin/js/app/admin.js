// 引入公共的配置文件，并应用模块
require(['common'], function(common) {
    // index页面初始化加载的是index.htmls
    require(
        [
            'jquery',
            'piecePublic'
        ], function(
            $,
            public
        ){
            public.init();
    });

   
});