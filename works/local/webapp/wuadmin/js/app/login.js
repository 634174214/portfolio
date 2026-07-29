
require(['common'], function(common) {
    // 引入树状导航模块，在模块中已经引用了JQ依赖模块
    require([
        'jquery',
        'pieceConfig',
        'pieceLayer',
        'pieceParticles',
        'jqvalidate'
    ],function(
        $,
        config,
        pieceLayer,
        particles,
        validate
    ){
        // 初始化layer插件
        var layer = pieceLayer.init();
        var $loginForm = $('#login-form');
        var isforget = $loginForm.hasClass('forget');
        var submitUrl = isforget ? 'server/login-forget.php' : 'server/login-submit.php';
/*
        // 开始的时候 先检测如果Input.input-control的值不为空那么就添加focus样式
        $('.input-control').each(function() {
            if($(this).val() != '') {
                $(this).parent().addClass('focus');
            }
        });

        // 当获得焦点时
        $('.input-control').on('focus', function() {
            if($(this).hasClass('focus') || $(this).val() != '' ){
                return
            }
            $(this).parent().addClass('focus');
        });
        // 当失去焦点时候
        $('.input-control').on('blur', function() {
            if($(this).val() === '') {
                $(this).parent().removeClass('focus');
            }
        });
*/
        var loginForm = $loginForm.validate({
            // degbug: true,
            errorElement: 'span',
            focusInvalid: false,
            focusCleanup: true,
            rules: {
                // 用户名验证
                username: {
                    required: true,
                    remote: {
                        url: "server/login-username-check.php",
                        type: "POST",
                        data: {
                            username: function () {
                                return $('#username').val();
                            }
                        }
                    }
                },
                password: {
                    required: true
                },
                // 验证码验证
                verify: {
                    required: true,
                    maxlength: 4,
                    remote: {
                        url: "server/login-verify-check.php",
                        type: "POST",
                        data: {
                            verify: function () {
                                return $('#verify').val();
                            }
                        }
                    }
                }
            },
            messages: {
                username: {
                    required: "用户名不能为空",
                    remote: "用户名不存在"
                },
                password: {
                    required: "用户密码不能为空"
                },
                verify: {
                    required: "请输入4位验证码，不区分大小写",
                    remote: "验证码不正确，请更换验证码重新输入",
                    maxlength: "验证码长度不能超过4位！"
                }
            },
            submitHandler: function(form) {
                // 使用post提交的时候data必须是一个对象的形式！不能是一个字符串！，JQ会自动将对象转化为字符串
                /*
               注意这里不能写在 data中 要与自动验证的remote方式区别开
               data:{ 
                   formData: function() {
                    var formArr = $(form).serializeArray();
                    var dataObj = {};
                    $.each(formArr, function() {
                        dataObj[this.name] = this.value;
                    });
                   }
                }
                要先获得再传递
                */
                var formArr = $(form).serializeArray();
                var dataObj = {};
                $.each(formArr, function() {
                    dataObj[this.name] = this.value;
                });
                // 验证通过使用AJAX提交
                $.ajax({
                    url: submitUrl,
                    type: 'POST',
                    dataType: 'json',
                    data: dataObj,
                    success: function(response) {
                        if(response.success) {
                            // 如果是忘记密码页
                            if (isforget) {
                                var $goLogin = $('<a href="login.html" class="sign-btn goback">点我返回登录</a>');
                                $('.sign-btn').after($goLogin).remove();
                                layer.msg(response.message, {
                                    time: 0,
                                    btn: ['我知道了', '前往邮箱'],
                                    btn2: function() {
                                        window.open(response.email_address);
                                    }
                                });
                                // 一次性关闭所有验证
                                $.validator = null;
                               
                            } else {
                                // window.location.href = 'admin.html';
                                layer.msg(response.message);
                            }
                            
                        } else {
                            layer.msg(response.message);
                        }
                    },
                    error: function(err) {
                        layer.msg('数据获取有误，请稍后重试 ' + err.status);
                    }
                });

                // return false;
            },
        });

        // 验证码刷新
        var $verifyImg = $('#v-code').find('img').eq(0);
        var firstImgUrl = $verifyImg.attr('src');
        $('#v-code').on('click', function() {
            var timeStamp = new Date().getTime();
            $verifyImg.attr('src', firstImgUrl + '?t=' + timeStamp);
            // https://blog.csdn.net/LitongZero/article/details/87877474
            // 校验重置，发现插件有Bug当第一次验证码通过后，再变换验证码-提交不会有验证提示，这里每次切换图片时候重置表单的验证
            loginForm.resetForm();
        });

        // 背景粒子数量
        var particlesNum = config.ispc ? 100 : 30;
        particles.init(particlesNum);
    })
});