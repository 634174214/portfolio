var verify = {
    isMobile:  function(value) {
        return /^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(value);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    }

}

// 前端交互效果-Input焦点
var INPUT_CLS_FOCUS = 'focus';
var INPUT_CLS_HASVAL = 'has-value';
var $formInput = $('.form-input');
$formInput.on('focus', function() {
    $(this).parent().addClass(INPUT_CLS_FOCUS);
});
$formInput.on('blur', function() {
    var inputVal = $(this).val();
    $(this).parent().removeClass(INPUT_CLS_FOCUS);
    console.log(inputVal)
    if(inputVal) {
        $(this).parent().addClass(INPUT_CLS_HASVAL);
    } else {
        $(this).parent().removeClass(INPUT_CLS_HASVAL);
    }
});

// 点击发送验证码
var VERIFY_COUNT_DOWN = 60; // 倒计时60秒
var verifyTimer = null;
$('#verify-code').on('click', function() {
    var $self = $(this);
    var hasSended = $self.hasClass('hase-send');
    if(hasSended || verifyTimer) {
        layer.msg('请不要重复发送');
        return false;
    }
    var phoneNumber = $('#login-phone').val();
    if(!phoneNumber) {
        layer.msg('手机号不能为空');
        return false;
    }
    if(!verify.isMobile(phoneNumber)) {
        layer.msg('请输入正确格式的手机号');
        return false;
    }
    
    $self.addClass('has-send');
    
    $self.text('重新发送 ' + VERIFY_COUNT_DOWN);
    verifyTimer = setInterval(function() {
        VERIFY_COUNT_DOWN--;
        var content = '重新发送 ' + VERIFY_COUNT_DOWN;
        $self.text(content);
        if(VERIFY_COUNT_DOWN < 0) {
            $self.removeClass('has-send');
            $self.text('发送验证码');
            clearInterval(verifyTimer);
            verifyTimer = null;
        }
    }, 1000);
    return false;
});

$('#agree-agreement').on('change', function() {
    var isChecked = $(this).prop("checked");
    if(!isChecked) {
        layer.msg('请先阅读协议并同意后方可注册哦');
        var disableBtn = '<div class="form-submit-btn disabled" id="sign-disabled">注 册</div>';
        $(disableBtn).replaceAll($('#sign-btn'));
    } else {
        var abledBtn = '<button type="submit" class="form-submit-btn" id="sign-btn">注 册</button>';
        $(abledBtn).replaceAll($('#sign-disabled'));
    }
});

// 提交时必须勾选协议
$('#sign-form').on('submit', function() {
    var isChecked = $('#agree-agreement').prop("checked");
    if(!isChecked) {
        layer.msg('请先阅读协议并同意后方可注册哦');
        return false;
    }
});











