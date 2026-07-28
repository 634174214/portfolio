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
        // wx.config({
        //     debug: false,
        //     appId: '',
        //     timestamp: 1,
        //     nonceStr: '',
        //     signature: '',
        //     jsApiList: []
        // });
        wx.ready(function() {
            document.getElementById('bgvid').play();
        });
}

function audiocol(){
            var flag='close';
             $(document).one('touchstart',function(){
                        // alert('aaa');
                        $('audio')[0].play();
                       flag='open';
                       return flag;
             }); 
             $('#audiocol').click(function(){
                   if (flag=='open') {
                          $('audio')[0].pause() ;
                          $(this).attr('class','bgmopen');
                          flag="close";
                   } else {
                         $('audio')[0].play();
                         $(this).attr('class','bgmclose');
                         flag='open';
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
         "loadimg/c1.jpg",
         "loadimg/c2.jpg",
         "loadimg/c3.jpg",
         "loadimg/c4.jpg",
         "loadimg/c5.jpg",
         "loadimg/c6.jpg",
         "loadimg/c7.jpg",
         "loadimg/c8.jpg",
         "loadimg/c9.jpg",
         "loadimg/c10.jpg",
         "loadimg/c11.jpg",
         "loadimg/c12.jpg",
         "loadimg/c13.jpg",
         "loadimg/c14.jpg",
         "loadimg/c15.jpg",
         "loadimg/c16.jpg",
         "loadimg/c17.jpg",
         "loadimg/c18.jpg",
         "loadimg/c19.jpg",
         "loadimg/c20.jpg",
         "loadimg/c21.jpg",
         "loadimg/c22.jpg",
         "loadimg/c23.jpg",
         "loadimg/c24.jpg",
         "loadimg/c25.jpg",
         "loadimg/c26.jpg",
         "loadimg/c27.jpg",
         "loadimg/c28.jpg",
         "loadimg/c29.jpg",
         "loadimg/c30.jpg",
         "loadimg/c31.jpg",
         "loadimg/c32.jpg",
         "loadimg/c33.jpg",
         "loadimg/c34.jpg",
         "loadimg/c35.jpg",
         "loadimg/c36.jpg",
         "loadimg/c37.jpg",
         "loadimg/c38.jpg",
         "loadimg/c39.jpg",
         "loadimg/c40.jpg",
         "loadimg/c41.jpg",
         "loadimg/c41.jpg",
         "loadimg/c43.jpg",
         "loadimg/c44.jpg",
         "loadimg/c45.jpg",
         "loadimg/c46.jpg",
         "loadimg/c47.jpg",
         "loadimg/c48.jpg",
         "loadimg/c49.jpg",
         "loadimg/c50.jpg",
         "loadimg/c51.jpg",
         "loadimg/c52.jpg",
         "loadimg/c53.jpg",
         "loadimg/c54.jpg",
         "loadimg/c55.jpg",
         "loadimg/c56.jpg",
         "loadimg/c57.jpg",
         "loadimg/c58.jpg",
         "loadimg/c59.jpg",
         "loadimg/c60.jpg",
         "loadimg/c61.jpg",
         "loadimg/c62.jpg",
         "loadimg/c63.jpg",
         "loadimg/c64.jpg",
         "loadimg/c65.jpg",
         "loadimg/c66.jpg",
         "loadimg/c67.jpg",
         "loadimg/c68.jpg",
         "loadimg/c69.jpg",
         "loadimg/c70.jpg",
         "loadimg/c71.jpg",
         "loadimg/c71.jpg",
         "loadimg/c73.jpg",
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
                      $('#playvideo').show();
                      $('.loading').fadeOut();
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
                        console.log(isMobile.any());
                }
        }
    };
}

$('#bgvid').on('ended',function(){
      audiocol();
      $('#main').fadeOut('slow',function(){
           // $('#music').show();
           $('#pano').animate({opacity:1},'fast',function(){
                      $('#audiocol').show();
           });
      });
});

function appendimg(){
    sclimg=[];
    for(n=1;n<74;n++){
            var shre="c"+n+".jpg";
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
     

