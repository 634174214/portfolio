var userAgent = window.navigator.userAgent.toLowerCase();
var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
};
function autoPlayAudio1() {
        wx.ready(function() {
            document.getElementById('bgvid').play();
        });
}

function audiocol(){
            // $('#music').one('touchstart',function(){alert('111')});
             $('#music').one('touchstart',function(){
                        // alert('aaa');
                        $('audio')[0].play();
                        $('#audiocol').attr('class','bgmopen');
                        $(this).remove();
             }); 

             $('#audiocol').click(function(){
                   var flag=$('#audiocol').attr('class');
                   if (flag=='bgmopen') {
                          $('audio')[0].pause() ;
                          $(this).attr('class','bgmclose');
                   } else if(flag=='bgmclose'){
                         $('audio')[0].play();
                         $(this).attr('class','bgmopen');
                   }
             });
}

var manifest = [
         "img/fm.png",
         "img/logo.png",
         "img/logo3.png",
         "img/polina.jpg",
         "img/bg.jpg",
         "img/fm@2x.png",
         "img/play1.png",
         "loadimg/a1.jpg",
         "loadimg/a2.jpg",
         "loadimg/a3.jpg",
         "loadimg/a4.jpg",
         "loadimg/a5.jpg",
         "loadimg/a6.jpg",
         "loadimg/a7.jpg",
         "loadimg/a8.jpg",
         "loadimg/a9.jpg",
         "loadimg/a10.jpg",
         "loadimg/a11.jpg",
         "loadimg/a12.jpg",
         "loadimg/a13.jpg",
         "loadimg/a14.jpg",
         "loadimg/a15.jpg",
         "loadimg/a16.jpg",
         "loadimg/a17.jpg",
         "loadimg/a18.jpg",
         "loadimg/a19.jpg",
         "loadimg/a20.jpg",
         "loadimg/a21.jpg",
         "loadimg/a22.jpg",
         "loadimg/a23.jpg",
         "loadimg/a24.jpg",
         "loadimg/a25.jpg",
         "loadimg/a26.jpg",
         "loadimg/a27.jpg",
         "loadimg/a28.jpg",
         "loadimg/a29.jpg",
         "loadimg/a30.jpg",
         "loadimg/a31.jpg",
         "loadimg/a32.jpg",
         "loadimg/a33.jpg",
         "loadimg/a34.jpg",
         "loadimg/a35.jpg",
         "loadimg/a36.jpg",
         "loadimg/a37.jpg",
         "loadimg/a38.jpg",
         "loadimg/a39.jpg",
         "loadimg/a40.jpg",
         "loadimg/a41.jpg",
         "loadimg/a42.jpg",
         "loadimg/a43.jpg",
         "loadimg/a44.jpg",
         "loadimg/a45.jpg",
         "loadimg/a46.jpg",
         "loadimg/a47.jpg",
         "loadimg/a48.jpg",
         "loadimg/a49.jpg",
         "loadimg/a50.jpg",
         "loadimg/a51.jpg",
         "loadimg/a52.jpg",
         "loadimg/a53.jpg",
         "loadimg/a54.jpg",
         "loadimg/a55.jpg",
         "loadimg/a56.jpg",
         "loadimg/a57.jpg",
         "loadimg/a58.jpg",
         "loadimg/a59.jpg",
         "loadimg/a60.jpg",
         "loadimg/a61.jpg",
         "loadimg/a62.jpg",
         "loadimg/a63.jpg",
         "loadimg/a64.jpg",
         "loadimg/a65.jpg",
         "loadimg/a66.jpg",
         "loadimg/a67.jpg",
         "loadimg/a68.jpg",
         "loadimg/a69.jpg",
         "loadimg/a70.jpg",
         "loadimg/a71.jpg",
         "loadimg/a72.jpg",
         "loadimg/a73.jpg",
         "loadimg/a74.jpg",
         "loadimg/a75.jpg",
         "loadimg/a76.jpg",
         "loadimg/a77.jpg",
         "loadimg/a78.jpg",
         "loadimg/a79.jpg",
         "loadimg/a80.jpg",
         "loadimg/a81.jpg",
         "loadimg/a82.jpg",
         "loadimg/a83.jpg",
         "loadimg/a84.jpg",
         "loadimg/a85.jpg",
         "loadimg/a86.jpg",
         "loadimg/a87.jpg",
         "loadimg/a88.jpg",
         "loadimg/a89.jpg",
         "loadimg/a90.jpg",
         "loadimg/a91.jpg",
         "loadimg/a92.jpg",
         "loadimg/a93.jpg",
         "loadimg/a94.jpg",
         "loadimg/a95.jpg",
         "loadimg/a96.jpg",
         "loadimg/a97.jpg",
         "loadimg/a98.jpg",
         "loadimg/a99.jpg",
         "loadimg/a100.jpg",
         "loadimg/a101.jpg",
         "loadimg/a102.jpg",
         "loadimg/a103.jpg",
         "loadimg/a104.jpg",
         "loadimg/a105.jpg",
         "loadimg/a106.jpg",
         "loadimg/a107.jpg",
         "loadimg/a108.jpg",
         "loadimg/a109.jpg",
         "loadimg/a110.jpg",
         "loadimg/a111.jpg",
         "loadimg/a112.jpg",
         "loadimg/a113.jpg",
         "loadimg/a114.jpg",
         "loadimg/a115.jpg",
         "loadimg/a116.jpg",
         "loadimg/a117.jpg",
         "loadimg/a118.jpg",
         "loadimg/a119.jpg",
         "loadimg/a120.jpg",
         "loadimg/a121.jpg",
         "loadimg/a122.jpg",
         "loadimg/a123.jpg",
         "loadimg/a124.jpg",
         "loadimg/a125.jpg",
         "loadimg/a126.jpg",
         "loadimg/a127.jpg",
         "loadimg/a128.jpg",
         "loadimg/a129.jpg",
         "loadimg/a130.jpg",
        
    ];

len = manifest.length;
for (var i=0; i<len; i++){
    var img = new Image();
    img.src = manifest[i];
    img.onload = function () {
        i--;
        var percent=parseInt((len-i) * 100 / len);
        $('.loading p').html('等待加载也是一种人生...' +'<span>'+percent +'<i>%</i>'+ '</span>'); 
        console.log(percent);
        if (i == 0){
             if ( !isMobile.iOS() ) {
                      $('.loading').fadeOut();
                      $('#playvideo').show();
                      appendimg();
                      imgplay();
                      var imger=setInterval(function(){
                           imgplay();
                      },40);
                      $('.playbtn').fadeIn('slow');
                      $('#playvideo').click(function(){
                           clearInterval(imger);
                           $('#playvideo').fadeOut();
                           $('#bgvid')[0].play();
                      });
                } else {
                       $('.loading').fadeOut();
                        autoPlayAudio1();
                        document.getElementById('bgvid').play();
                        console.log(isMobile.any());
                }
        }
    };
}

$('#bgvid').on('play',function(){
      audiocol();
        $('#main').css('background','#000');
});

$('#bgvid').on('ended',function(){
      audiocol();
       $('#audiocol').show();
       $('.panowrap').css('z-index','999');
      // $('#main').hide();
});

function appendimg(){
    sclimg=[];
    for(n=1;n<131;n++){
            var shre="a"+n+".jpg";
            var src="loadimg/"+shre;
            if(src!=undefined || src!="undefined" || src!=""){
                sclimg.push(src);
            }
    }
    leng=sclimg.length;
    n_asize=$("#imglist img").size();
    for(i=n_asize;i<leng;i++){
             $("#imglist").append("<img src="+sclimg[i]+">");
     }
}
function imgplay(){
     var num=$(".on").index();
     sleng=$("#imglist img").size();
     if(num<sleng-1){
        num=num+1;
     }else{
        num=0;
     }
     $("#imglist img").eq(num).addClass("on").siblings().removeClass("on");
}
     
