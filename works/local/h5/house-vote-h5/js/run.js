(function ($) {

    var c = console.log;
    var baseUrl = '//ssl.qdxin.cn/h5/2020/house_vote_h5/voteList.php';
    var Page = function () { };

    Page.prototype = {
        init: function () {
            this.setJqMap();
            this.addListeners();
            this.setAnimation();

        },
        setJqMap: function () {
            this.$mainBox = $('#mainBox');
            this.$homePage = $('#homePage');
            this.$startBtn = this.$homePage.find('.start-btn');

            this.$contentPage = $('#contentPage');
            this.$voteNum = this.$contentPage.find('.vote-num');
            this.$voteBtn = this.$contentPage.find('.vote-btn-wrap');
            this.$voteIcon = this.$voteBtn.find('.vote-icon');

            this.$swiperWrap = this.$contentPage.find('.swiper-wrapper');

            this.$voteLayer = $('#layerBox');
        },
        addListeners: function () {
            var that = this;
            this.$startBtn.on('click', function () {
                that.$homePage.fadeOut();
                that.$contentPage.fadeIn();
                // console.log(1);
                var swiper = new Swiper('.swiper-container', {
                    direction: 'horizontal',
                    effect: 'fade',
                    fade: {
                        crossFade: true,
                    },
                    prevButton: '.swiper-button-prev',
                    nextButton: '.swiper-button-next',
                    onInit: function (swiper) {
                        //Swiper初始化了
                        //alert(swiper.activeIndex);提示Swiper的当前索引
                        var $note = $('.swiper-container .top-note'),
                            $desc = $('.swiper-container .desc'),
                            // index = swiper.activeIndex,
                            noteHtml = data[0].note + '<span class="name abs">' + data[0].noteTip + '</span>';
                        descHtml = data[0].desc;
                        $note.html(noteHtml);
                        $desc.html(descHtml);
                    },
                    onSlideChangeEnd: function (swiper) {
                        // console.log(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
                        var $note = $('.swiper-container .top-note'),
                            $desc = $('.swiper-container .desc'),
                            // $contentPage = $('#contentPage');
                            index = swiper.activeIndex,
                            // voteNum = voteData[index].vote.total;
                            noteHtml = data[index].note + '<span class="name abs">' + data[index].noteTip + '</span>',
                            descHtml = data[index].desc;
                        $note.html(noteHtml);
                        $desc.html(descHtml);
                        // $contentPage.find('.vote-num:eq(' + index + ')').html(voteNum);
                    }
                })
            });

            // $.ajax({
            //     type: "get",
            //     async: "false",
            //     dataType: "jsonp",
            //     url: baseUrl + '?id=' + activeId + '&num=200',
            //     success: function (data) {
            //         voteData = data.list;
            //         // console.log(voteData);
            //         $.each(voteData, function (index, person) {
            //             that.$swiperWrap.append(that.initSlide(index, person));
            //         })
            //     },
            //     complete: function () {
            //         // var voteNum = voteData[0].vote.total;
            //         // var voteId = voteData[0].voteid;
            //         // that.$contentPage.find('.vote-num:eq(0)').html(voteNum);
            //         // that.$contentPage.find('.vote-btn-wrap:eq(0)').attr('vote-id', voteId);

            //     }
            // });

            this.$contentPage.on('click', '.vote-btn-wrap', function () {

                alert("投票已结束!");
                return;

                var $_this = $(this);
                var voteNum = parseInt($_this.siblings('.vote-num').text()) + 1;
                var $voteIcon = $_this.find('.vote-icon');
                var voteId = $_this.attr('vote-id');

                $.ajax({
                    url: "http://ssl.qdxin.cn/vote/vote?activity_id=" + activeId + "&voteid=" + voteId + '&token=' + window.wxtoken,
                    type: "get",
                    dataType: "jsonp",
                    success: function (data) {
                        var succ_msg = data.msg;
                        if (succ_msg.indexOf("频繁") > 0) {
                            succ_msg = "今日投票已达上限！";
                            alert(succ_msg);
                        }
                        if (data.status === 'ok') {
                            $_this.siblings('.vote-num').html(voteNum);
                            $voteIcon.attr('src', 'imgs/icon-vote-success.png');
                            that.voteSuccess();
                        } else {
                            if (succ_msg.indexOf("信息获取失败，请重新获取") > 0) {
                                window.toLogin();
                            }
                            alert(succ_msg);
                        }
                    }
                })
            })
        },
        setAnimation: function () {
        },
        voteSuccess: function () {
            var that = this;
            this.$voteLayer.fadeIn(500);
            setTimeout(function () {
                that.$voteLayer.fadeOut(500);
            }, 1500)
        },
        initSlide: function (index, item) {
            var slideHtml = '<div class="swiper-slide">' +
                '<img class="slide-img" src="imgs/slide-img' + (index + 1) + '.jpg" alt="">' +
                '<div class="vote-wrap abs">' +
                '<img src="imgs/icon-vote-num.png" alt="">' +
                '<p class="vote-num abs">' + item.vote.total + '</p>' +
                '<div class="vote-btn-wrap abs" vote-id="' + item.voteid + '">' +
                '<img class="vote-icon" src="imgs/icon-vote.png" alt="">' +
                '<p class="vote abs">投票</p></div></div><a class="more abs" href="' + item.user.field_1 + '">了解详情></a></div>';
            return slideHtml;
        }

    };

    var map = new Page();

    $(function () {
        map.init();
        Pace.on('hide', function () {
            $('#loadPage').fadeOut();
            $('#homePage').addClass('show');
        })
    });

})(jQuery);
