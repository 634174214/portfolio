(function ($) {

    var c = console.log;

    var realData = [],
        dataNum = 0,
        score = 0,
        timeData = 10;;

    var images = [
        { name: "answer-bg", type: "jpg" },
        { name: "home-bg", type: "jpg" },
        { name: "again-btn", type: "png" },
        { name: "again-btn-act", type: "png" },
        { name: "answer-bg1", type: "png" },
        { name: "answer-bg2", type: "png" },
        { name: "help-item", type: "png" },
        { name: "help-item1", type: "png" },
        { name: "light", type: "png" },
        { name: "logo", type: "png" },
        { name: "next-btn", type: "png" },
        { name: "next-btn-act", type: "png" },
        { name: "note1", type: "png" },
        { name: "note2", type: "png" },
        { name: "note3", type: "png" },
        { name: "note4", type: "png" },
        { name: "note5", type: "png" },
        { name: "people", type: "png" },
        { name: "result1", type: "png" },
        { name: "result2", type: "png" },
        { name: "result3", type: "png" },
        { name: "result4", type: "png" },
        { name: "result-board", type: "png" },
        { name: "score-bg", type: "png" },
        { name: "share-btn", type: "png" },
        { name: "share-btn-act", type: "png" },
        { name: "share-img", type: "png" },
        { name: "soul", type: "png" },
        { name: "start-btn", type: "png" },
        { name: "start-btn-act", type: "png" },
        { name: "text", type: "png" },
        { name: "theme", type: "png" },
        { name: "theme1", type: "png" },
        { name: "theme2", type: "png" },
        { name: "theme3", type: "png" },
        { name: "time-bg", type: "png" },
        { name: "title1", type: "png" },
        { name: "title2", type: "png" },
        { name: "title3", type: "png" },
        { name: "title4", type: "png" }
    ];

    var imageUrl = "imgs/";

    var Page = function () {};

    Page.prototype = {
        init: function () {
            this.setJqMap();
            this.addListeners();
            this.setAnimation();
            this.preload();
            realData = this.getData(question,10);
            // console.log(realData);
            this.creatQue(0);
            this.$score.html(score);
        },
        setJqMap: function () {
            this.$loadPage = $('#loadPage');
            this.$loadTxt = this.$loadPage.find('.load-txt');
            this.$homePage = $('#homePage');
            this.$startBtn = $('#startBtn');
            this.$answerPage = $('#answerPage');
            this.$score = this.$answerPage.find('.score-box').find('.score');
            this.$time = this.$answerPage.find('.time-box').find('.time');
            this.$answerBox = this.$answerPage.find('.answer-box');
            this.$nextBtn = $('#nextBtn');
            this.$questionBox = $('#questionBox');
            this.$resultPage = $('#resultPage');
            this.$showTxtBox = this.$resultPage.find('.show-txt-box');
            this.$titleBox = this.$resultPage.find('.title-box');
            this.$shareBtn = $('#shareBtn');
            this.$sharePage = $('#sharePage');
            this.$againBtn = $('#againBtn');
            this.$resultShow = this.$resultPage.find('.result-box').find('.result-show');
            this.$title = this.$resultPage.find('.result-box').find('.title');
            this.$txtNote = this.$resultPage.find('.result-box').find('.txt-note');
        },
        addListeners: function () {

            var that = this;

            //点击开始
            this.$startBtn.on('click',function () {
                setTimeout(function () {
                    that.$homePage.addClass('hide');
                    that.$answerPage.removeClass('hide');
                    that.setTime();
                },200)
                
                // that.$answerBox.addClass('show');
            })
            //下一题
            this.$nextBtn.on('click',function () {
                that.nextQuestion();
                timeData = 11;
                clearInterval(that.setTime);
                // that.setTime();
            })
            //分享
            this.$shareBtn.on('click',function () {
                that.$sharePage.removeClass('hide');
            });
            this.$sharePage.on('click',function () {
                that.$sharePage.addClass('hide');
            });
            //再玩一次
            this.$againBtn.on('click',function () {
                var date = new Date().getTime();
                console.log(date);
                window.location.replace(location.href+'?'+date);
            });
        },
        setAnimation: function () {
        },
        preload: function () {
            var imgCount = 0;
            var that = this;
            var total = images.length;
            //console.log(total);
            $.each(images, function (i, e) {
                var image = new Image();

                image.onload = function () {
                    imgCount++;
                    that.$loadTxt.text(parseInt(imgCount / total * 100) + '%');
                    if (total === imgCount) {
                        that.$loadPage.fadeOut(600);
                        that.$homePage.removeClass("hide");
                        that.$homePage.addClass('show');
                    }
                };
                image.fname = e.name;
                image.src = imageUrl + e.name + "." + e.type;
            });
        },
        getData: function (arr,num) {
            var temp_array = new Array();
            for (var index in arr) {
                temp_array.push(arr[index]);
            }
            var return_array = new Array();
            for (var i = 0; i < num; i++) {
                if (temp_array.length > 0) {
                    var arrIndex = Math.floor(Math.random() * temp_array.length);
                    return_array[i] = temp_array[arrIndex];
                    temp_array.splice(arrIndex, 1);
                } else {
                    break;
                }
            }
            return return_array;
        },
        creatQue:function (num) {
            var answerHtml = '';
            var chooseArr = ['A','B','C','D'];
            for(var i = 0;i < realData[num].options.length;i++) {
                answerHtml += '<label class="options-line">' +
                              '<input type="radio" name="answer" class="options-raido" data-score="'+ realData[num].options[i].score +'">' +
                              '<p><span>'+ chooseArr[i] +':</span>'+ realData[num].options[i].txt +'</p></label>';
            }
            // console.log(answerHtml);
            questionHtml = '<p class="title">' + (parseInt(num) +1) +'.' + realData[num].title +'</p><div class="options-box abs">'+
                           answerHtml +
                           '<div>'; 
            this.$questionBox.html(questionHtml);
        },
        setTime:function () {
            var that = this;
            setInterval(function () {
                if(timeData > 0) {
                    timeData--;
                    that.$time.html(timeData);
                }else {
                    timeData = 11;
                    that.nextQuestion();
                }
            },1000)
        },
        nextQuestion:function () {
            var that = this;
            var dataScore = $('input[type="radio"]:checked').attr('data-score');
            that.$answerBox.removeClass('show');
            setTimeout(function () {
                that.$answerBox.addClass('show');
            }, 500)
            dataNum++;
            if (dataScore == undefined) {
                dataScore = 0;
            }
            score += parseInt(dataScore);
            that.$score.html(score);

            if (dataNum > 9) {
                clearInterval(that.setTime);
                that.showResult(score);
                console.log(score);
                setTimeout(function (){
                    that.$answerPage.addClass('hide');
                    that.$resultPage.removeClass('hide');
                },200)
                setTimeout(function () {
                    
                    that.$showTxtBox.addClass('show');
                    that.$titleBox.addClass('show');
                },400)
                
            } else {
                that.creatQue(dataNum);
                // timeData = 10;
                // that.setTime();
            }
            
            
        },
        showResult:function (score) {
            var that = this;
            if(score>=0 && score <=50){
                that.$resultShow.attr('src','imgs/result4.png');
                that.$title.attr('src','imgs/title4.png');
                that.$txtNote.html('亲亲，这边建议您分手哦~');
            } else if (score >= 55 && score <= 75) {
                that.$resultShow.attr('src', 'imgs/result3.png');
                that.$title.attr('src', 'imgs/title3.png');
                that.$txtNote.html('什么！你这样的人也配有女友？');
            } else if (score >= 80 && score <= 95) {
                that.$resultShow.attr('src', 'imgs/result1.png');
                that.$title.attr('src', 'imgs/title1.png')
                that.$txtNote.html('亲亲，这边建议您分手哦~');
            } else if (score >= 100) {
                that.$resultShow.attr('src', 'imgs/result2.png');
                that.$title.attr('src', 'imgs/title2.png');
                that.$txtNote.html('你有点甜哦，请继续保持 ');
            }
        }
    };

    var map = new Page();

    $(function () {
        map.init()
    });

})(jQuery);