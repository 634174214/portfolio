require(['common'], function(common) {
    // 引入树状导航模块，在模块中已经引用了JQ依赖模块
    require(
        [
        'jquery',
        'pieceEditor',
        'pieceUploader',
        'pieceValidate',
        'pieceFormeEles',
        'piecePublic'
        ],function(
            $,
            editor,
            uploader,
            validate,
            formEles,
            public
        ){
            public.init();
            editor.init({
                // 如果不使用传统的方法提交富文本就填false
                textareaID: 'article-content'
            });
            uploader.init({
                server: '3.php',
                pick: '#picker',
            });
            // 点击按钮动态生成元素
            formEles.createInput({
                btnName: '#addAnnex-btn',
                eleContainer: '#addAnnex-container',
                eleName: 'fujian',
                eleLabel: '附件链接',
                placeholder: '请输入要添加附件的文件地址'
            });

            validate.init({
                class: 'validate'
            });
        })
});