define(['jquery', 'selectbox', 'pieceConfig'], function($, selectbox, config) {

    var init = function() {
        // 只有在pc上才进行样式替换
        if(config.ispc) {
            // 将.select样式在PC上进行替换
            $(".select").selectbox({
                effect:"slide"
            });
        }
    }

    var createInputTpl = function(obj, start) {
        var tpl = '<div class="form-item">';
            tpl += '<label class="form-label">' + obj.eleLabel + '</label>';
            tpl += '<div class="input-block"><input type="text" name="' + obj.eleName + '[]" placeholder="' + obj.placeholder + '" class="input w90"></div>';
            tpl += '<div class="delete"><i class="icon fal fa-times-circle"></i></div>';
            tpl += '</div>';
        return tpl;
    }
    
    /*
    动态添加表单元素
    formEles.createInput({
            // 添加的元素id 或者class
            btnName: '#addAnnex-btn',
        // 生成元素插入的地方
            eleContainer: '#addAnnex-container',
        //  label 提示文字
            eleLabel: '附件链接',
        //  input的placeholder属性
            placeholder: '请输入要添加附件的文件地址'
        //  生成元素的name属性
            eleName: 'fujian'
    });
    */
    var createInput = function(obj) {
        var $btn = $(obj.btnName);
        var $container = $(obj.eleContainer);
        var start = 0;
        $btn.on('click', function() {
            var $createdinput = $(createInputTpl(obj, start));
            $container.prepend($createdinput);
            start++;
        });
        $container.on('click', '.delete', function() {
            $(this).parent('.form-item').remove();
        })
    }

    return {
        init: init,
        createInput: createInput
    }
});