$.fn.hoverThea= function() {
    var hoverThea = function(element) {
        var thea = element.find('a');
        thea.hover(function(){
           $(this).animate({
             opacity:0.7
           },'slow');
        },function(){
           $(this).animate({
             opacity:1
           },'slow');
        });
    };
    return $(this).each(function() {
        hoverThea($(this));                         
    });
};

$.fn.changeImg= function(imgSrc,time) {
    var changeImg = function(element) {
        var theImg = element.find('img'),
            thisSrc = theImg.attr('src'),
            timer = null;
        timer = setInterval(function(){
            if(theImg.hasClass('first')){
               theImg.fadeOut('1000',function(){
                  theImg.attr('src',imgSrc).fadeIn('1000');
                  theImg.attr('class','second');
               });
            } else {
               theImg.fadeOut('1000',function(){
                  theImg.attr('src',thisSrc).fadeIn('1000');
                  theImg.attr('class','first');
               }); 
            }
        },time);
        
    };
    return $(this).each(function() {
        changeImg($(this));                    
    });
};
     
function wowJS(){
  if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
      var wow = new WOW({
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 10,
          mobile: true,
          live: true
      });
      wow.init();
  };
}

function mBannerTurn(){
    var timer = null,
        $li = $('#phonebanner li');
    timer = setInterval(function(){
        $li.each(function(index,item){
            if($(item).hasClass('on')){
                $(item).fadeOut('1000',function(){
                    if (index < $li.length - 1) {
                       $(item).attr('class','off');
                       $(item).next().attr('class','on');
                       $(item).next().fadeIn('1000');
                    } else {
                       $(item).attr('class','off');
                       $li.eq(0).attr('class','on');
                       $li.eq(0).fadeIn('1000');
                    }
                });
            }
        });
    },5000);
}

if(!IsPC()){
    $('#bannerTitle i').eq(0).attr('data-wow-delay','1s');
    $('#bannerTitle i').eq(1).attr('data-wow-delay','1s');
    $('#bannerTitle i').eq(2).attr('data-wow-delay','1.5s');
    mBannerTurn();
}

$(document).ready(function () {
    $('#indexMJ').hoverThea();
    $('#indexSG').hoverThea();
    $('#zyLeftImg').changeImg('img/zy-bei-2.png',5000);
    $('#zyRightImg').changeImg('img/zy-nan-2.png',5500);
    wowJS();
    $("#far-clouds").clouds({
        fps: 30,
        speed: 0.8,
        dir: "left"
    });
    $("#near-clouds").clouds({
        fps: 30,
        speed: 1,
        dir: "left"
    }); 
});