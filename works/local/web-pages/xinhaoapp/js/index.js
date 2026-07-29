(new GoTop()).init({
    pageWidth: 1000,
    nodeId: 'go-top',
    nodeWidth: 40,
    distanceToBottom: 120,
    distanceToPage: 20,
    hideRegionHeight: 130,
    text: 'Top'
});

var isPC = (function() {
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
})();

var isIOS = (function(){
    var equipmentType = "";
    var agent = navigator.userAgent.toLowerCase();
    var android = agent.indexOf("android");
    var iphone = agent.indexOf("iphone");
    var ipad = agent.indexOf("ipad");
    if(android != -1){
        equipmentType = false;
    }
    if(iphone != -1 || ipad != -1){
        equipmentType = true;
    }
    return equipmentType;
})();

// 手机版菜单
var menuCl = document.getElementById("menuClose");
    var menuPop = document.getElementById("menuPid");
    var menuPId=$('#menuPid'),
          Cont=$('#menuNavC');
    var headmenu = document.getElementById("popGd");
    var fixhead = document.getElementById("fixMenu");
    var logoTi = document.getElementById("wordTi");
    

    var btnSwith = 'closed';
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
addEvent(menuCl,'click',menuClickFn,false);

if(!isPC) {
    if(isIOS) {
        $('#ios-download').show();
    } else {
        $('#android-download').show();
    }
}