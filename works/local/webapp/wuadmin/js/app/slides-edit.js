
require(['common'], function(common) {
    // 引入树状导航模块，在模块中已经引用了JQ依赖模块
    require([
        'jquery',
        'pieceValidate',
        'pieceUploader',
        'piecePublic'
    ],function(
        $,
        validate,
        uploader,
        public
    ){
        public.init();
        var $validate = $('.validate');
        validate.init({
            class: 'validate'
        });

        var slideUploader = uploader.init({
            auto: true,
            pick: {
                id: '#silde-pick',
                multiple: false
            },
            server: '1.php',
            onlypic: true
        });
    })
});