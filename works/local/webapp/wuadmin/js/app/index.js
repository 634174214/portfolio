require(['common'], function(common) {
    // 引入树状导航模块，在模块中已经引用了JQ依赖模块
    require(['piecePublic'],function(public){
        public.init();
    })
});