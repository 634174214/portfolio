// 手机版菜单
var menuCl = document.getElementById("menuClose");
    var menuPop = document.getElementById("menuPid");
    var menuPId=$('#menuPid'),
          Cont=$('#menuNavC');
    var headmenu = document.getElementById("popGd");
    var fixhead = document.getElementById("fixMenu");
    var logoTi = document.getElementById("wordTi");

    var btnSwith = 'closed';

// 判断手机/PC
function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ['Android', 'iPhone',
            'SymbianOS', 'Windows Phone',
            'iPad', 'iPod'
        ];
        var flag = true;
        for (var i = 0; i < Agents.length; i++) {
            if (userAgentInfo.indexOf(Agents[i]) != -1) {
                flag = false;
                break;
            }
        }
        return flag;
}
    
function menuClickFn(){
    if(btnSwith == 'closed'){
        menuPop.style.display = 'block';
        logoTi.style.display = 'none';
        menuCl.setAttribute("class","nav-hamburger opened");
        btnSwith = 'opened';
        headmenu.setAttribute("class","popTopP45 headMenu headMenu_open");
        fixhead.setAttribute("class","guDig fixDiv");
        Cont.hide();
    }else{
        menuPop.style.display = 'none';
        btnSwith = 'closed';
        menuCl.setAttribute("class","nav-hamburger");
        headmenu.setAttribute("class","popTopP45 headMenu");
        fixhead.setAttribute("class","guDig");
                  logoTi.style.display = 'block';
                  Cont.show();
    }       
}
function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
    elm.addEventListener(evType, fn, useCapture);//DOM2.0
    return true;
    }
    else if (elm.attachEvent) {
    var r = elm.attachEvent('on' + evType, fn);//IE5+
    return r;
    }
    else {
    elm['on' + evType] = fn;//DOM 0
    }
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

function setimgWidth(){
    var allLi = $('#main li');
    $.each(allLi,function(index,item){
        var thisW = $(item).width();
        switch(thisW){
        case 660:
            $(item).find('img').css({
               width:'100%',
               height:'auto'
            });
            break;
        case 490:
            $(item).find('img').css({
               width:'100%',
               height:'auto'
            });
            break;
        default:
            //...;
            break;
        }
    });
}

if (IsPC()) {
   setimgWidth();
   $('#main li').hover(function(){
          $(this).find('img').animate({
           opacity:0.6
          },'slow');
      },function(){
          $(this).find('img').animate({
           opacity:1
          },'slow');
   });
} else {
   rem(document, window);
   addEvent(menuCl,'click',menuClickFn,false);
}