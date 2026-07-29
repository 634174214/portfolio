require(['common'], function(common) {
    // 引入树状导航模块，在模块中已经引用了JQ依赖模块
    require(['jquery', 'pieceUploader', 'pieceValidate', 'piecePublic'],function($, pUploader, validate, public){
        public.init();
        var avatarUploader = pUploader.init({
            auto: true,
            pick: {
                id: '#avatarPicker',
                multiple: false
            },
            server: '1.php',
            onlypic: true
        });

        validate.init({
            class: 'validate'
        });

        // 二维码上传
        var qrcodeUploader = pUploader.init({
            auto: true,
            pick: {
                id: '.pick-imgone',
                multiple: false
            },
            server: '1.php',
            onlypic: true
        });
    });
});