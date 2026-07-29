// $.each可以遍历数组
var user_in = ['#name', '#tel', '#address'];
function checkPhone(tel, i){
    if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(tel.val()))){ 
        tel.parent().addClass('error');  
    } else {
        tel.parent().removeClass('error');
        i++;
        // console.log(i);
    }
    return i;
}
$('#address-save').on('click', function() {
    var i = 0;
    $.each(user_in, function(index, item) {
        if ($(item).val() === '') {
          $(item).parents('li').addClass('error');
        } else {
          // 手机号验证
          if(item == '#tel') {
            // 必须用i接收
            i = checkPhone($(item), i);
          } else {
            $(item).parents('li').removeClass('error');
            i++;
          }
        }
    });
    console.log('aa'+i);
    if (i == user_in.length) {
      $('#address-addnew').submit(); //表单提交
      window.location.href='收货地址-有地址.html'; // 模拟跳转
      return true;
    } else {
      return false;
    }
});