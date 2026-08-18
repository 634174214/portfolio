var totalNum = 100;
$("document").ready(function () {
  $.ajax({
        type:"POST",
        url:"http://vip.qdxin.cn/h5/201904/NavyVis/doAction.php",
        dataType:"json",
        success:function(data){
          if(data.point) {
            totalNum = data.point
          }
        },
        error:function(jqXHR){
//            alert("发生错误："+ jqXHR.status)
          // console.log(jqXHR);
        }
  });
  init();
})
var timer=null;
var video=document.getElementById('video');
var audio=document.getElementById('js_bg');

var isplay=false;//视频初始播放状态
var totalTime = 0;//观看时长
var totalTimer = null;

function init () {
  $('#start').on('touchstart',function(e){
      // console.log('touchstart', e);
      if ($("#js_bg")[0].paused) {
        $("#js_bg")[0].play();
      }
      if(!isplay){
        isplay=true;
        video.pause();
      }
  })
  $('#start').on('click',function(e){
    //视频必须有点击类操作才可以开始播放，必须要有播放按钮不能自动播放
      // console.log('click', e);
      $("#js_bg")[0].play();
      e.preventDefault();
      totalTimer = window.setInterval(function () {
        totalTime++;
      },1000)
      // 视频开始
      draw1();
      $(".begin").fadeOut();
  })
  $(".toPlay").on('click', function (e) {
    //弹出层的继续播放监听
    var e=e || event;
    e.preventDefault();
    // alert(video.duration.toFixed(1));
    var _index = parseInt($(this).parent().data("index"));
    $(".modal").fadeOut();
    // console.log("index:", _index);
    if (_index >= 51 && _index <= 55) {
      video.currentTime = 38.0;
      video.play();
      setTimeout(function () {
        var _id = (_index % 10) + 1;
        modal5_ani(_id);
      }, 500);
    } else if (_index == 56) {
      clearInterval(timer);
      video.currentTime = 48.0;
      draw1(_index);
    } else {
      clearInterval(timer);
      draw1(_index);
    }
  })
  var timer_4 = null;
  var text_4 = $("#modal4 .frame").attr("data-text").split("");

  $("#modal4 .holder").on('touchstart', function (e) {
    // console.log('start');
    if ($("#modal4 .frame").text().length == 0) {
      $("#modal4 .frame").fadeIn();
      $("#modal4 .position_text").fadeIn();
    }
    var e=e || event;
    e.preventDefault();
    clearInterval(timer);
    clearInterval(timer_4);
    draw1(4);
    if (text_4.length > 0) {
      timer_4 = setInterval(function () {
        // console.log(text_4);
        if (text_4.length == 0) {
          $("#modal4 .frame").fadeOut();
          $("#modal4 .position_text").fadeOut();
          // clearInterval(timer_4);
          // clearInterval(timer);
          // draw1(4);
        } else {
          $("#modal4 .frame").text($("#modal4 .frame").text() + text_4[0]);
          text_4.splice(0,1);
        }
      },150)
    }
  })

  $("#modal4 .holder").on('touchend', function (e) {
    // console.log("end");
    var e=e || event;
    e.preventDefault();
    if (text_4.length == 0) {
      $("#modal4 .frame").fadeOut();
      $("#modal4 .position_text").fadeOut();
    }
    // if (video.currentTime > 17.2 && video.currentTime < 48.0) {
    if (video.currentTime > 17.2 && video.currentTime < 31.0) {
      video.pause();
      $("#js_bg")[0].play();
      clearInterval(timer);
      clearInterval(timer_4);
    } else {
      $("#modal4").fadeOut();
      clearInterval(timer);
      clearInterval(timer_4);
      draw1(4);
    }
  })
}
$("#modal7 .holder").on('touchstart', function (e) {
  // console.log('start');
  var e=e || event;
  e.preventDefault();
  draw1(7);
})

$("#modal7 .holder").on('touchend', function (e) {
  // console.log("end");
  var e=e || event;
  e.preventDefault();
  if (video.currentTime >= 64.0) {
    $("#modal7").fadeOut();
  }
  if (video.currentTime > 57.0 && video.currentTime < 64.0) {
    video.pause();
    $("#js_bg")[0].play();
    clearInterval(timer);
  } else {
    $("#modal7").fadeOut();
    clearInterval(timer);
    draw1(7);
  }
})
function draw1(index) {//逐帧监听
  $("#js_bg")[0].pause();
  audio.currentTime = 0.0;
  video.play();
  timer = setInterval(function(){
    var currentTime=video.currentTime.toFixed(1); //获取当前播放进度
    //弹出层触发判断，因为暂停再播放时进度不变，为了避免出现多次弹出层，加一个index的判断
    if(currentTime == 0.8 && index != 1){
        // video.pause();
        // $("#js_bg")[0].play();
        clearInterval(timer)
        modal1_ani();
        draw1(1);
    }
    if(currentTime == 7.0 && index != 2){
        video.pause();
        $("#js_bg")[0].play();
        clearInterval(timer)
        modal2_ani();
    }
    if(currentTime == 11.8 && index != 3 && index != 9){ // 11.6
        video.pause();
        $("#js_bg")[0].play();
        clearInterval(timer)
        modal3_ani();
    }
    // if(currentTime == 11.8 && index != 9){
    //     video.pause();
    //     modal9_ani();
    //     clearInterval(timer);
    //     // draw1(4);
    // }
    if(currentTime == 17.2 && index != 4){   //32.0
        video.pause();
        $("#js_bg")[0].play();
        modal4_ani();
        clearInterval(timer);
        // draw1(4);
    }
    if(currentTime == 31.0){
        $("#modal4").fadeOut();
    }
    // if(currentTime == 51.7 && index != 6){
    if(currentTime == 50.1 && index != 6){
        // video.pause();
        // $("#js_bg")[0].play();
        clearInterval(timer)
        modal6_ani();
        draw1(6);
    }
    if (video.currentTime >= 55.0) {
      $("#modal6").fadeOut();
    }
    if(currentTime == 56.8 && index != 7){
        video.pause();
        clearInterval(timer)
        modal7_ani();
        // draw1(7);
    }
    if (video.currentTime >= 64.0) {
      $("#modal7").fadeOut();
    }
    if(currentTime == 68.0 && index != 8){
        // video.pause();
        clearInterval(timer)
        clearInterval(totalTimer);
        // console.log("总时间（秒）：" + totalTime);
        draw1(8);
        modal8_ani(totalTime);
    }
    if(currentTime == video.duration.toFixed(1) && currentTime > 65.0){
      clearInterval(timer)
      $(".content").fadeOut();
      $("#js_total_num").text(totalNum);
      $(".end").fadeIn();
      endAni();
    }
    if(index == 999){
      clearInterval(timer)
      $(".content").fadeOut();
      $("#js_total_num").text(totalNum);
      $(".end").fadeIn();
      endAni();
    }
    // console.log(currentTime, index);
  },40);
};


function modal1_ani() {
  $("#modal1").show();
  var timer_1 = null;
  var text_1 = $("#modal1 .position_text").attr("data-text").split("");
  window.setTimeout(function () {
    $("#modal1 .position_text").fadeIn();
    timer_1 = window.setInterval(function () {
      if (text_1.length == 0) {
        clearInterval(timer_1);
        $("#modal1 .frame").fadeIn();
        window.setTimeout(function() {
          $("#modal1").fadeOut();
        }, 4000)
      } else {
        $("#modal1 .position_text").text($("#modal1 .position_text").text() + text_1[0]);
        text_1.splice(0,1);
      }
    },150)
  },500)
}

function modal2_ani() {
  $("#modal2").fadeIn();
  window.setTimeout(function () {
    $("#modal2 .toPlay").fadeIn();
  },1000)
}
function modal3_ani() {
  $("#modal3").show();
  var timer_1 = null;
  var text_1 = $("#modal3 .position_text1").attr("data-text").split("");
  var timer_2 = null;
  var text_2 = $("#modal3 .position_text2").attr("data-text").split("");
  $("#modal3 .circle1").fadeIn();
  $("#modal3 .position_text1").fadeIn();
  timer_1 = window.setInterval(function () {
    if (text_1.length == 0) {
      clearInterval(timer_1);
      $("#modal3 .circle2").fadeIn();
      $("#modal3 .position_text2").fadeIn();
      timer_2 = window.setInterval(function () {
        if (text_2.length == 0) {
          clearInterval(timer_2);
          window.setTimeout(function () {
            $("#modal3 .toPlay").fadeIn();
            modal9_ani();
          },1000)
        } else {
          $("#modal3 .position_text2").text($("#modal3 .position_text2").text() + text_2[0]);
          text_2.splice(0,1);
        }
      },150)
    } else {
      $("#modal3 .position_text1").text($("#modal3 .position_text1").text() + text_1[0]);
      text_1.splice(0,1);
    }
  },150)
}


function modal4_ani(index) {
  $("#modal4").show();
}
function modal5_ani(id) {
  $("#modal5" + id).fadeIn();
  window.setTimeout(function () {
    $("#modal5" + id + " .toPlay").fadeIn();
  },1000)
}
function modal6_ani() {
  $("#modal6").show();
}
function modal7_ani() {
  $("#modal7").show();
}
function modal8_ani(time) {
  $("#modal8").fadeIn();
  var timer_8 = null;
  var text_8 = $("#modal8 .position_text").attr("data-text").split("");
  $(".js_time").text(getTimeText(time));
  window.setTimeout(function () {
    $("#modal8 .position_text").fadeIn();
    timer_8 = window.setInterval(function () {
      if (text_8.length == 0) {
        clearInterval(timer_8);
        $("#modal8 .inner").fadeIn();
        window.setTimeout(function() {
          $("#modal8").fadeOut();
          clearInterval(timer);
          draw1(999);
        }, 3000)
      } else {
        $("#modal8 .position_text").text($("#modal8 .position_text").text() + text_8[0]);
        text_8.splice(0,1);
      }
    },150)
  },500)
}
function modal9_ani() {
  $("#modal9").fadeIn();
  $("#modal3 .toPlay").unbind("click").bind("touchstart", function () {
      $("#modal9 .gan").addClass("ani");
      powerUp();
  })
  $("#modal9 .gan").unbind("click").bind("touchstart", function () {
      $("#modal9 .gan").addClass("ani");
      powerUp();
  })
  $("#modal3 .toPlay").unbind("click").bind("touchend", function () {
      $("#modal9 .gan").removeClass("ani");
      powerDown();
  })
  $("#modal9 .gan").unbind("click").bind("touchend", function () {
      $("#modal9 .gan").removeClass("ani");
      powerDown();
  })
}
var timer_9 = null;
var timer_9_s = [150, 150, 100, 100, 80, 70, 60, 50, 50, 40, 40];
var timer_9_i = 0;
function powerUp () {
  clearInterval(timer_9);
  timer_9 = setInterval(function () {
    if (timer_9_i == 11) {
      clearInterval(timer_9);
      $("#modal9").fadeOut();
      $("#modal3").fadeOut();
      draw1(9);
    }else{
      $("#modal9 .pans .tiao" + (timer_9_i + 1)).fadeIn();
      timer_9_i = timer_9_i + 1;
    }
    // console.log(timer_9_i);
  },timer_9_s[timer_9_i])
}
function powerDown () {
  clearInterval(timer_9);
  timer_9 = setInterval(function () {
    if (timer_9_i == -1) {
      clearInterval(timer_9);
      timer_9_i = 0;
    }else{
      $("#modal9 .pans .tiao" + (timer_9_i + 1)).fadeOut();
      timer_9_i = timer_9_i - 1;
    }
    // console.log(timer_9_i);
  },timer_9_s[11 - timer_9_i])
}
function getTimeText (time) {
  var text = '';
  var min = Math.floor(time / 60);
  var sec = time % 60;
  if (min >= 60) {
    min = 60;
  }
  text = min + '分'+ sec + '秒';
  return text;
}

function endAni () {
  $(".endBtn.b1").unbind("click").bind("click",function(){
    var _url = window.location.href.split('?')[0];
    window.location.href=_url+"?ver="+10000*Math.random();
  })
  $(".endBtn.b2").unbind("click").bind("click",function(){
    $(".share").show();
  })
  $(".share").unbind("click").bind("click", function () {
    $(".share").fadeOut();
  })
}
