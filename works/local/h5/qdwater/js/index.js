// 获取当前屏幕宽度 超过640 清空body
function PCIE(){
if (window.ActiveXObject || "ActiveXObject" in window){//判断是IE浏览器
          // alert("ie");
          $('body').empty().append('<div class="PCIE"><p>请扫描以下二维码在手机端查看</p><img src="img/thisEr.png"  /></div>');
          }else{//如果不是IE浏览器 判断屏幕宽是否>640
                 var Wwin=$(window).width();
                 if (Wwin>480) {
                    // nolook();
                    $('body').empty().append('<div class="PCIE"><p>请扫描以下二维码在手机端查看</p><img src="img/thisEr1.png"  /></div>');
                }
          }
}
PCIE();

var manifest = [
        "img/1-1.jpg",
"img/1-2.jpg",
"img/1-3.jpg",
"img/1.jpg",
"img/2-1.jpg",
"img/2-2.jpg",
"img/2-3.jpg",
"img/2.jpg",
"img/3-1.jpg",
"img/3-2.jpg",
"img/3-3.jpg",
"img/3.jpg",
"img/4-1.jpg",
"img/4-2.jpg",
"img/4-3.jpg",
"img/4.jpg",
"img/5-1.jpg",
"img/5-2.jpg",
"img/5.jpg",
"img/audiobtn.png",
"img/bg.jpg",
"img/bottom.png",
"img/img-6.jpg",
"img/script@2x.png",
"img/share.jpg",
"img/thisEr.png",
"img/title-1.png",
"img/title.png"
    ];
    
var queue = new createjs.LoadQueue(true);
queue.on("progress", handleFileLoad);//加载进度 
queue.on("complete", handleComplete);//加载完成
queue.loadManifest(manifest);//加载的列表
function handleFileLoad(e){
    var bnum=parseInt(queue.progress*100);
    $("#loading i").html(bnum+"%");
    $("#loading cite").width(bnum+'%');
}
function handleComplete(){ // 加载完成执行
     $("#loading").fadeOut('slow');
}


// Swiper配置
var mySwiper = new Swiper('.swiper-container',{
  pagination: '.swiper-pagination',
  paginationClickable: !0,
  slidesPerView: '3',
  preventLinksPropagation : false,
  loop: true,
  loopAdditionalSlides:3, 
  slideToClickedSlide:true,
  centeredSlides : true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
      slideChangeTransitionStart: function(event){
        var active=this.activeIndex;
        var x=$('.swiper-slide')[active].getElementsByClassName('text-info')[0].innerHTML;
        $('#textInfo').html(x);
        $('.swiper-slide').removeClass('pon');
        var swp=$($('.swiper-slide')[active]);
        swp.addClass('pon');
        return false;
      },
  },
});

$('.swiper-slide').on('click',function(e){
            var now=mySwiper.activeIndex;
            
           $('body').prepend('<div id="over"></div>');
           $('.secondscreen').show();
            var thisHTML=$(this).find('.maintext').html(),
                   winH=$(window).height();
            $('#news').html(thisHTML);
            $('#news div.content').css({
                  minHeight:winH-200
            });
           $("#news .headimg").fadeIn();
           $("#news .content").animate({
                    top:200,
                    opacity:1
           },function(){
                $('#over').remove();
           });
           
            var itop=$(this).find('img').offset().top,
                   ileft=$(this).find('img').offset().left,
                   iurl=$(this).find('img').attr('src'),
                   iwidth=$(this).find('img').css('width'),
                   iheight=$(this).find('img').css('height');
                 
            copyimg(itop,ileft,iurl,iwidth,iheight);
            return false;
});

// 点击关闭
$('#newsclose').on('click',function(){
            bodyH=$(window).height();
          $('body').prepend('<div id="over"></div>');
          clearTimeout(timer);
          gotop();
          // 获取当前焦点图的top left值
          var active=mySwiper.activeIndex,
                 $that= $($('.swiper-slide')[active]).find('img');
                 swtop=$that.offset().top,
                 swleft=$that.offset().left,
                 swwidth=$that.css('width'),
                 swheight=$that.css('height');
            // alert(swtop+'+'+swleft)
          $('#showimg img').animate({ borderRadius:'50%'},"slow");
          $('#showimg').animate({
                  top:swtop,
                  left:swleft,
                  width: swwidth,
                  height:swheight,
                  // opacity:0.2
          },function(){
                  $('#showimg').fadeOut().remove();
          });
          // 新闻内容关闭
          $("#news .headimg").css('position','absolute').animate({
                   top:-200,
                   opacity:0
          });
          $("#news .content").animate({
                   top:600
          },function(){
                  $("#news").empty();
                  $('.secondscreen').hide();
          });
          var timer=setTimeout(function(){$('#over').remove();},1020);
});


// 返回顶部
function gotop(){
    $('html , body').animate({scrollTop: 0},'slow');
}

// 将图片置于文章顶部
function copyimg(ctop,cleft,curl,cwidth,cheight){
      $('.secondscreen').append('<div id="showimg"><img src=""></div>');
      $('#showimg img').attr('src',curl);
      $('#showimg').css({
            left:cleft,
            top:ctop,
            width:cwidth,
            height:cheight
      });
      $('#showimg').animate({
            left:'50%',
            top:0,
            width:'100%',
            height:200,
            opacity:0
      },function(){
             $('#showimg').remove();
      });
      $('#showimg img').animate({ borderRadius:'0%'},"slow");
}

// 简介点击
$('#textInfo').on('click',function(e){
        var active=mySwiper.activeIndex,
                now=mySwiper.realIndex,
                 $x= $($('.swiper-slide')[active]);
            var thisHTML=$x.find('.maintext').html(),
                   winH=$(window).height();
            $('#news').html(thisHTML);
            $('#news div.content').css({
                  minHeight:winH-200
            });
           // 设置遮罩层
           $('body').prepend('<div id="over"></div>');
           $('.secondscreen').show();
           $("#news .headimg").fadeIn();
           $("#news .content").animate({
                    top:200,
                    opacity:1
           },function(){
                $('#over').remove();
           });
            var Ttop=$x.find('img').offset().top,
                    Tleft=$x.find('img').offset().left,
                    Turl=$x.find('img').attr('src'),
                    Twidth=$x.find('img').css('width'),
                    Theight=$x.find('img').css('height');
            copyimg(Ttop,Tleft,Turl,Twidth,Theight);
            return false;
});





