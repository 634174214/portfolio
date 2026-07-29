function pageMenuWidth(){
    var pageMenuSize = $('#pageMenu li').size(),
        pageMenuli = $('#pageMenu li').outerWidth();
    if (IsPC()) {
        $('#pageMenu ul').width(pageMenuli*pageMenuSize+(pageMenuSize-1)*30);
    } else {
        $('#pageMenu ul').wrap('<div class="page-menu-inner"></div>');
        $('#pageMenu .page-menu-inner').width(pageMenuli*pageMenuSize);
        $('#pageMenu ul').width(pageMenuli*pageMenuSize);
    }
}
pageMenuWidth();

var videoforOther = {
  ifAndroid : function() {
     
  }
};

// 下拉固定
$.fn.navfixed= function() {
    var navfix = function(element) {
       var top = element.position().top, pos = element.css("position");
       $(window).scroll(function() {
           var scrolls = $(this).scrollTop();
           if (scrolls > top) {
               if (window.XMLHttpRequest) {//区分浏览器排除ie6以下
                   element.addClass('pageMenuFix');
               } else {
                    element.addClass('pageMenuFix');
               }
           }else {
               element.removeClass('pageMenuFix');
           }
       });
};
           return $(this).each(function() {
               navfix($(this));                         
           });
};
$.fn.setListpicMargin= function() {
    var setListpicMargin = function(element) {
        var every_li = element.find('li');
        every_li.each(function(index,item){
            if (index%3 == 0) {
                $(item).addClass('nomarginL');
            }
        });
    };
    return $(this).each(function() {
        setListpicMargin($(this));                         
    });
};
$('#pageMenu').navfixed();
$('#listpic').setListpicMargin();

