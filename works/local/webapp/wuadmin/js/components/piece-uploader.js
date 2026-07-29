// http://fex.baidu.com/webuploader/download.html
// http://fex.baidu.com/webuploader/getting-started.html
define(['webuploader'], function(webuploader){
    
    var init = function(obj) {
        var baseConfig = {
            auto: false,
            server: '2.php',
            swf: '../libs/webuploader/Uploader.swf',
            pick: '.filepick',
            resize: false
        }

        if(obj.onlypic) {
            baseConfig.accept = {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        }
        obj = $.extend(baseConfig, obj);

        var uploader = webuploader.create(obj);
        return uploader;
    }

    return {
        init: init
    };
})