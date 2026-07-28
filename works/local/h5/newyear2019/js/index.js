var waitingTimer = null,
      isPlaying = false,
      audio = $('#sound');

// 资源加载
var manifest = [
            "img/p1_bg.png",
            "img/p1_bg2.gif",
            "img/p1_bg3.png",
            "img/p1_bg5.png",
            "img/p1_btn.png",
            "img/p1_mo1.png",
            "img/p1_title.png",
            "img/p1_top.png",
            "img/p2_bao.png",
            "img/p2_btn.png",
            "img/p2_close1.png",
            "img/p2_pig.png",
            "img/p3_again.png",
            "img/p3_pig.png",
            "img/p3_close.png",
            "img/audiobtn.png",
            "img/ee.png",
            "img/share.jpg",
            "img/p2_close1.png",
            "img/loading2.gif"
  
];
var queue = new createjs.LoadQueue(true);
queue.installPlugin(createjs.Sound);
queue.on("progress", handleFileLoad);
queue.on("complete", handleComplete);
queue.loadManifest(manifest);
function handleFileLoad(e){
    var bnum=parseInt(queue.progress*100);
    $("#loading p").html('<i>信网</i>祝大家新春快乐！'+'<em>'+bnum+"%"+'</em>');
}

function handleComplete(){
         $("#loading").fadeOut('slow');
         $('#p1Title').addClass('animated bounceIn');
         $('#p1Title')[0].addEventListener("webkitAnimationEnd", function() {
            $('#p1Title').attr('class','p1-title');
         });
         $('#fireworks').show();
}

function audioControl(){
    if (isPlaying == true) {
         $('#audiobtn').attr('class','off');
         audio[0].pause();
         isPlaying = false;
    }else{
        $('#audiobtn').attr('class','on');
        audio[0].play();
        isPlaying = true;
    }
    return false;
}
function playAudio() {
    if (audio.attr('src') == undefined) {
        audio.attr('src', audio.data('src'));
    }
    audio[0].play();
    isPlaying = true;
    $('#audiobtn').on('touchend',audioControl);
}

function rem(doc, win) {
          var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
              var clientWidth = docEl.clientWidth;
              if (!clientWidth) return;
              docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
            };
          if (!doc.addEventListener) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false);
}

var closeAll = {
    closeP_two:function(){
        $('#inputName,#textinput').blur();
        $('#dialog').fadeOut('slow');//关闭层后截图
        $('#inputName').removeClass('error');
        $('#inputName').attr('placeholder','例：信网恭祝您');
        $('#textinput').removeClass('error');
        $('#textinput').attr('placeholder','例：祝您猪年大吉大利！');
        return false;
    },
    closeP_pic:function(){
        $('#dialog').fadeOut('slow',getPic);//关闭层后截图
        return false;
    },
    close_shareto:function(){
        $('#shareto').fadeOut();
    }
};

// 随机生成的祝福字节监听
function createWishListener(str,outEle){
   var len;
   if (str) {
       len = checkStrLengths(str, 80);
   } else {
       len = 0;
   }
   //显示字数
   outEle.html(len);
}
// 字数监听
var checkStrLengths = function (str, maxLength) {
    var maxLength = maxLength;
    var result = 0;
    if (str && str.length > maxLength) {
        result = maxLength;
    } else {
        result = str.length;
    }
    return result;
};

function fontNmuListener(inEle,outEle){
   //监听输入
   inEle.on('input propertychange', function () {
       //获取输入内容
       var userDesc = $(this).val();
       //判断字数
       var len;
       if (userDesc) {
           len = checkStrLengths(userDesc, 80);
       } else {
           len = 0;
       }
       //显示字数
       outEle.html(len);
   });
}

function createWish(target){
   $('#setWish').text('换下祝福');
    var wishes = [
    '大家都晓春节好，一年到头真热闹；最是童年忘不掉，新衣新裤新鞋帽；亲朋好友拜年早，红包礼品不会少；祝福送到就是好，幸福安康新年好！',
    '大财、小财、意外财，财源滚滚；亲情、友情、爱情，情情如意；官运、财运、桃花运，运运亨通；爱人、亲人、友人，人人平安。春节快乐！',
    '阳光灿烂，是新年绚丽的色彩；金钟朗朗，是新年动人的旋律；白雪皑皑，是新年美好的祝愿。新一年，幸福心头荡漾，福气喜气天降。祝新年快乐，万事如意！',
    '新年到，祝一帆风顺，二龙腾飞，三阳开泰，四季平安，五福临门，六六大顺，七星高照，八方来财，九九同心，十全十美！',
    '春节是"节"，祝你芝麻开花节节高；春节是"戒"，祝你戒愁戒忧戒烦恼；春节是"结"，祝你结朋结友结欢乐；春节是"接"，祝你接金接银财富多。',
    '天气预报温馨提示：新的一年，你所在的区域将猛刮金钱风，狠淋钞票雨，狂下金雹银雹，结钻石冰，长翡翠树，挂珍珠霜，生玛瑙果，小心挨砸！祝新年快乐！',
    '空气中弥漫新年的气息，带来无限的喜悦；生活中充满种种乐趣，带来无限的快乐。新春到了，一切都充满新的希望，新的憧憬。愿你新年幸福多多，快乐多多！',
    '让烟花的璀璨，闪亮你的人生；让欢快的颂歌，奏响你的快乐；让新年的喜气，环绕你的每天；让我的问候，温暖你的心间。送你一声新年好，愿你好运相伴，新年快乐！',
    '特别的节日想起特别的你，特别的祝福发给特别的你，特别的好运围绕特别的你，特别的成功属于特别的你，特别的幸福拥抱特别的你。新年快乐！',
    '新年到，开口笑，金银财宝怀里抱；放烟花，点鞭炮，吉祥如意好征兆；祝福跳，微信闹，幸福快乐来围绕；新的一年，愿你常常多欢笑，一年更比一年好！'
     ];
    var rndNum = parseInt(Math.random()*10);
    $('#textinput').val(wishes[rndNum]);
    $('#textinput')[0].focus();
    createWishListener(wishes[rndNum],$('#fontNum i'));
}

function clearInput(){
    var this_clear = $(this).parent().prev();
    this_clear[0].focus();
    this_clear.val('');
    return false;
}

// 检查表单
function checkForm(){
    var name = $('#inputName'),
        textContent = $('#textinput'),
        nameVal = $.trim(name.val()),
        textContentVal = $.trim(textContent.val()),
        eleArr = [name,textContent],
        errorTips = '请填写该项，不能为空';
    if(nameVal && textContentVal.length > 0){
        for(var j = 0;j < eleArr.length;j++){
            eleArr[j].removeClass('error');
            eleArr[j][0].blur();
        }
        setContent(nameVal,textContentVal);
        $('#wantdo').hide();
        $('#showEr').show();
        $('body,html').scrollTop(0);
        closeAll.closeP_pic();
        waitingCreatePic();// 生成新年祝福
    } else {
       for(var i = 0;i < eleArr.length;i++){
            if($.trim(eleArr[i].val()).length <= 0){
                eleArr[i].addClass('error');
                eleArr[i].attr('placeholder',errorTips);
            } else {
                eleArr[i].removeClass('error');
            }
       }
    }
}

// 进行赋值
function setContent(name,text){
    var contentH = $('#content h2'),
        contentP = $('#content p');
    contentH.text(name+'：');
    contentP.text(text);
}

// 截图
function getPic(){
     var cntElem = $('#canvas')[0];
     var shareContent = cntElem
     var width = shareContent.offsetWidth; 
     var height = shareContent.offsetHeight; 
     console.log(width,height);
     var canvas = document.createElement("canvas"); 
     var scale = 2; 
     canvas.width = width * scale; 
     canvas.height = height * scale; 
     canvas.getContext("2d").scale(scale, scale); 
     var opts = {
         scale: scale, 
         canvas: canvas, 
         width: width, 
         height: height
     };
      // 点击截取的是#canvas
      html2canvas(shareContent, opts).then(function (canvas) {
          //添加属性  
          canvas.setAttribute('id','thecanvas');  

          var context = canvas.getContext('2d');
          context.mozImageSmoothingEnabled = false;
          context.webkitImageSmoothingEnabled = false;
          context.msImageSmoothingEnabled = false;
          context.imageSmoothingEnabled = false;
          var img = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height);
          var img_data=img.getAttribute('src');
          $('#picBox img').attr('src',img_data);
       });
            
}

// 等待
function waitingCreatePic(){
     clearTimeout(waitingTimer);
        var mainBoxH = $('#canvas').outerHeight();
        $('#createPic').css('minHeight',mainBoxH);
    $('#waiting').show();
    waitingTimer = setTimeout(function(){
        $('#waiting').hide();
        $('#createPic').show();
        $('#shareto').show();
    },2000);
}

// 重置
function resetAll(){
    $('#inputName').val('');
    // $('#textinput').val('');
    $('#inputName').attr('placeholder','例：信网恭祝您');
    // $('#textinput').attr('placeholder','例：祝您猪年大吉大利！');
    $('#showEr').hide();
    $('#wantdo').show();
    $('#createPic').hide();
    $('#shareto').show();
    $('#nameNum i').text(0);
}



rem(document, window);
document.addEventListener("WeixinJSBridgeReady", function () {
    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
        network = e.err_msg.split(":")[1];  //结果在这里
        playAudio();
    });
     fontNmuListener($('#inputName'),$('#nameNum i'));
     fontNmuListener($('#textinput'),$('#fontNum i'));
      $('#wantdo').on('touchend',function(){
              var mainBoxH = $('#canvas').outerHeight();
              $('body,html').scrollTop(0);
              $('#dialog').css('minHeight',mainBoxH).fadeIn('slow');
       });
     
    $('#setWish').on('touchend',createWish);
    $('#close-dialog').on('touchend',closeAll.closeP_two);// 关闭p2
    $('#dialog .empty').on('touchend',clearInput);
    $('#submit').on('touchend',checkForm);//验证表单
    $('#inputName,#textinput').on('blur',function(){//失焦返回顶部
        $('body,html').scrollTop(0);
    });
     $('#createPic').on('touchstart',closeAll.close_shareto);//点击分享提示消失
     $('#makeagain').on('touchend',resetAll);//再次制作重置
}, false);
  
   