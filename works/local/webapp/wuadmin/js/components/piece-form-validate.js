define([
    "jquery",
    "jqvalidate",
    "pieceLayer"
], function($, jqvalidate, pieceLayer) {
    var layer = null;

    // 添加校验规则
    var setDefaultValidate = function(){
        $.extend(true, $.validator, {
                // 自定义的方法
                methods: {
                    // 检测wangEditor初始时里面的内容是否为<p><br></p>，是那么就是代表空
                    "verifywang": function (value, element) {
                        var noactel = (value !== '<p><br></p>' ? true : false);
                        // console.log(this.optional(element), noactel)
                        return this.optional(element) || noactel;
                    },
                    "mobile": function(value, element) {
                        var mobile = /^1[3|4|5|7|8]\d{9}$/;
	                    return this.optional(element) || (mobile.test(value));
                    },
                    // 验证输入的必须是数字或者字母
                    "numstring": function(value, element) {
                        var reg = /^[0-9a-zA-Z]+$/;
                        return this.optional(element) || (reg.test(value));
                    }
                },
                // 根据规则添加
                classRuleSettings: {
                    // 验证wangeditor是否为空
                    verifywang: {
                        verifywang: true
                    },
                    mobile: {
                        mobile: true
                    },
                    numstring: {
                        numstring: true
                    }
                },
                // 方法默认提示信息
                messages: {
                    required: '不能为空！',
                    verifywang: "编辑器的内容不能为空！",
                    mobile: '手机格式不对!',
                    numstring: '输入的必须是数字和字母！'
                },
                // 默认选项
                defaults: {
                    onkeyup: false,
                    // 验证规则
                    rules: {
                    },
                    // 验证不通过的第一个元素获得焦点
                    focusInvalid: false,
                    // 不通过元素获得焦点时候隐藏提示
                    focusCleanup: true,
                    // 验证失败的信息
                    messages: {
                    },
                    // 错误被包裹的标签
                    errorElement: 'span',
                    // 忽略的元素
                    ignore: '',
                    // 提交事件
                    submitHandler: function () {
                    }
                }
    
            });
    }

    // 引入弹窗提示
    var layerShow = function(text) {
        if(!layer) { return }
        layer.confirm(text, {
            // skin: 'layui-layer-lan',
            title: '操作成功！',
            btn: ['关闭'] //按钮
        });
    }

    var submitAjax = function(obj) {
        $.ajax({
            type: obj.type,
            url: obj.url,
            dataType: 'json',
            success: function(data) {
                // successText是与后台约定好的字段
                layerShow(data.successText);
            },
            error: function(err) {
                layerShow('错误码：' + err.status);
            }
        });
    }

    var init = function(obj) {
        var $form = $('.' + obj.class);
        if($form.length <= 0) { return }
        setDefaultValidate();
        var layer = pieceLayer.init();
        $form.validate({
            submitHandler: function(form) {


                // 验证成功获取表单提交的action地址
                var formSubmitUrl = $(form).attr('action');
                //验证通过后 的js代码写在这里
                if($form.data('ajax')) {
                    // 如果是ajax那么就获取form表单上的未通过的提示
                    var nopassmsg = $(form).data('layer-nopassmsg');
                    // 如果表单上有ajax代表通过ajax方式提交
                    // 获取所有表单字段
                    var searchStr = $(form).serialize();
                    if(searchStr.length > 0) {
                        formSubmitUrl = formSubmitUrl + '?' + searchStr;
                        submitAjax({
                            type: 'POST',
                            url: formSubmitUrl
                        });
                    } else {
                        layer.msg(nopassmsg, {
                            time: 2000, //2s后自动关闭
                        });
                    }
                } else {
                    // console.log(form)
                    // 获取button按钮上提交成功的提示信息
                     var layerMsg = $(form).data('layer-passmsg') || '数据提交成功！'
                    layer.alert(layerMsg, {
                        yes: function() {
                            form.submit();
                        }
                    });
                    // 普通的表单提交
                    // form.submit();
                }
            }
        });
    }


    return {
        init: init
    }
});