/*
注意此方法应对于标准的table结构 不要有合并td等
*/
define(['jquery'], function($) {
    var thTextArr = [];

    // 获取th中所有的标题内容
    var getThText = function($table) {
        var $allth = $table.find('th');
        $allth.each(function() {
            thTextArr.push($(this).text());
        });
    }

    // 设置每行每个td的data-th
    var setTdDataTh = function($table) {
        var $tds = $table.find('tbody').eq(0).find('td');
        var start = 0;
        $tds.each(function() {
            $(this).attr('data-th', thTextArr[start]);
            // console.log(this, start, thTextArr[start])
            start >= thTextArr.length - 1 ? start = 0: start++;
        });
    }
    
    var init = function() {
        var $table = $('.piece-table');
        getThText($table);
        setTdDataTh($table);
    }


    return {
        init: init
    }
});