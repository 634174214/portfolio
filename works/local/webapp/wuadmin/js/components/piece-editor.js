// https://www.kancloud.cn/wangfupeng/wangeditor3/335775
define(['jquery', 'editor'], function($, editor){
    var wEditor = null;
    var editorBox = null;

    var init = function(obj) {
        editorBox = document.getElementById('piece-editor');
        wEditor = new editor(editorBox);
        imgUpload();
        // 如果传递了textareaID属性 那么就使用textarea储存
        if(obj.textareaID) {
            var $textarea = $('#' + obj.textareaID);
            useTextarea($textarea);
        }
        // new以后 必须要在所有配置项都配置好后，在执行create()
        wEditor.create();

        // 必须在create之后进行与textarea同步内容 以防富文本有内容编辑
        if(obj.textareaID) {
            $textarea.val(getHtml());
        }

        // 需要给富文本加一个name 否则JQ.validate会因为找不到富文本的name而报错
        wEditor.$textElem.attr('name', 'edit');
    }

    var getHtml = function() {
        return wEditor.txt.html();
    }

    var getText = function() {
        return wEditor.txt.text();
    }

    // 上传图片的相关配置
    var imgUpload = function() {
        // 配置服务器端地址
        wEditor.customConfig.uploadImgServer = '/upload';
        // 将图片大小限制为 6M
        wEditor.customConfig.uploadImgMaxSize = 6 * 1024 * 1024;
        // 限制一次最多上传 5 张图片
        wEditor.customConfig.uploadImgMaxLength = 5;
    }

    // 编辑时，将内容同步到textarea中
    var useTextarea = function($textarea) {
        wEditor.customConfig.onchange = function (html) {
            // 监控变化，同步更新到 textarea
            $textarea.val(html)
        }
    }

    var getTextAreaStr = function() {

    }

    return {
        init: init,
        getHtml: getHtml,
        getText: getText
    };
});