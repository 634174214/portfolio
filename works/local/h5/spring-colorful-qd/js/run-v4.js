(function($) {
  var c = console.log;

  var canClick = true;

  

  var images = [
    { name: "bg", type: "jpg" },
    { name: "home-bg", type: "jpg" },
    { name: "header-dau", type: "jpg" },
    { name: "header-mo", type: "jpg" },
    { name: "sn-bg", type: "jpg" },
    { name: "send-msg", type: "jpg" },
    { name: "book", type: "png" },
    { name: "clock", type: "png" },
    { name: "confirm-btn-bg", type: "png" },
    { name: "desk", type: "png" },
    { name: "hand", type: "png" },
    { name: "shinan", type: "png" },
    { name: "home-shadow", type: "png" },
    { name: "load", type: "png" },
    { name: "local-bg", type: "png" },
    { name: "local-bg-active", type: "png" },
    { name: "mes1", type: "png" },
    { name: "mes2", type: "png" },
    { name: "next-btn", type: "png" },
    { name: "people", type: "png" },
    { name: "phone-light", type: "png" },
    { name: "play-btn", type: "png" },
    { name: "prev-btn", type: "png" },
    { name: "save-bg", type: "png" },
    { name: "video", type: "png" }
  ];
  var imageUrl = "imgs/";

  var Page = function() {};

  Page.prototype = {
    init: function() {
      this.setJqMap();
      this.addListeners();
      this.setAnimation();
      this.preload();
      // this.$video[0].play();
    },
    setJqMap: function() {
      this.$loadPage = $("#loadPage");

      this.$homePage = $("#homePage");
      this.$videoBox = this.$homePage.find(".video-box");

      this.$videoPage = $("#videoPage");
      this.$video = this.$videoPage.find("#video");
      this.$pastBtn = this.$videoPage.find(".past");

      this.$messagePage = $("#messagePage");

      this.$talkPage = $("#talkPage");
      this.$goHomeBtn = this.$talkPage.find(".go-home-btn");

      this.$choosePage = $("#choosePage");
      this.$confirmBtn = this.$choosePage.find('.confirm-btn');

      this.$savePage = $("#savePage");
      this.$saveImg = this.$savePage.find('.save-img');
    },
    addListeners: function() {
      var that = this;

      //视频开始播放
      this.$videoBox.on("click", function() {
        that.$homePage.addClass("hide");
        that.$video[0].play();
        that.$videoPage.removeClass("hide");
      });

      //跳过
      this.$pastBtn.on("click", function() {
        that.$video[0].pause();
        that.$videoPage.fadeOut(1000);
        that.$messagePage.removeClass("hide");
        setTimeout(function() {
          that.$messagePage.find(".phone").attr("src", "imgs/phone-light.png");
          that.$messagePage.addClass("animate");
          $("#phoneBgm")[0].play();
          setTimeout(function() {
            that.$messagePage.find(".hand").css("opacity", 1);
            canClick = false;
          }, 4000);
        }, 1000);
      });

      //视频播放结束
      this.$video[0].addEventListener("ended", function() {
        that.$video[0].pause();
        that.$videoPage.fadeOut(1000);
        that.$messagePage.removeClass("hide");
        setTimeout(function() {
          that.$messagePage.find(".phone").attr("src", "imgs/phone-light.png");
          that.$messagePage.addClass("animate");
          $("#phoneBgm")[0].play();
          setTimeout(function() {
            that.$messagePage.find(".hand").css("opacity", 1);
            canClick = false;
          }, 4000);
        }, 1000);
      });

      

      //点击查看信息
      this.$messagePage.find(".people").on("click", function() {
        if (canClick) {
          return false;
        }
        var $talkItem = $(".talk-item");
        // console.log($talkItem);
        that.$messagePage.fadeOut(1000);
        that.$talkPage.removeClass("hide");
        $(".audioCon").removeClass("hide");
        $(".audioCon").addClass("playingZ");
        $("#audio")[0].play();
        // setTimeout(function() {
        //   for (var i = 0; i < $talkItem.length; i++) {
        //     setTimeout(function() {
        //       $(".talk-item:eq("+ i +")").removeClass("hide");
        //     }, 1000);
        //   }
        // }, 1000);
        setTimeout(function () {
          that.$talkPage.animate({ "scrollTop": '900px' }, 10000,'linear');
        },17000);
        setTimeout(function () {
          that.$talkPage.find(".talk-shadow").fadeIn(1000);
        },28000)
      });

      //点击回家看看
      this.$goHomeBtn.on('click',function () {
        // swiper.update();
        setTimeout(function () {
          var swiper = new Swiper(".swiper-container", {
            direction: "horizontal",
            slidesPerView: 5,
            centeredSlides: true,
            loop: true,
            initialSlide: 2,
            slideToClickedSlide: true,
            onSlideChangeEnd: function (swiper){
              // console.log(swiper.activeIndex);
              $(".local-item").removeClass('animate');
              $(".local-item").fadeOut(1000);
              var data = $('.swiper-slide-active').html();
              switch (data) {
                case "市南":
                  $(".sn").fadeIn(1000);
                  $(".sn").addClass('animate');
                  that.$saveImg.attr("src", "imgs/save-sn.jpg");
                  break;
                case "市北":
                  $(".sb").fadeIn(1000);
                  $(".sb").addClass("animate");
                  that.$saveImg.attr("src", "imgs/save-sb.jpg");
                  break;
                case '崂山':
                  $('.ls').fadeIn(1000);
                  $(".ls").addClass("animate");
                  that.$saveImg.attr("src", "imgs/save-ls.jpg");
                  break;
                case '城阳':
                  $('.cy').fadeIn(1000);
                  $(".cy").addClass("animate");
                  that.$saveImg.attr("src", "imgs/save-cy.jpg");
                  break;
                case '即墨':
                  $('.jm').fadeIn(1000);
                  $(".jm").addClass("animate");
                  that.$saveImg.attr("src", "imgs/save-jm.jpg");
                  break;
                case '李沧':
                  $('.lc').fadeIn(1000);
                  $(".lc").addClass("animate");
                  that.$saveImg.attr("src", "imgs/save-lc.jpg");
                  break;
                case '西海岸':
                  $('.hd').fadeIn(1000);
                  $(".hd").addClass("animate");
                  that.$saveImg.attr("src", "imgs/save-hd.jpg");
                  break;
                case '胶州':
                  $('.jz').fadeIn(1000);
                  $(".jz").addClass("animate");
                  that.$saveImg.attr("src", "imgs/save-jz.jpg");
                  break;
                case '平度':
                  $('.pd').fadeIn(1000);
                  $(".pd").addClass("animate");
                  that.$saveImg.attr("src", "imgs/save-pd.jpg");
                  break;
                case '莱西':
                  $('.lx').fadeIn(1000);
                  $(".lx").addClass("animate");
                  that.$saveImg.attr("src", "imgs/save-lx.jpg");
                  break;
                default:
                  break;
              }
            }
          });
        },0)
        that.$talkPage.fadeOut(1000);
        that.$choosePage.removeClass('hide');
      });

      //点击确认家乡
      this.$confirmBtn.on('click',function () {
        that.$choosePage.fadeOut(1000)
        that.$savePage.removeClass('hide');
        that.$savePage.addClass('animate');
      });

    },
    setAnimation: function() {},
    preload: function() {
      var imgCount = 0;
      var that = this;
      var total = images.length;
      //console.log(total);
      $.each(images, function(i, e) {
        var image = new Image();

        image.onload = function() {
          imgCount++;
          // that.$loadTxt.text(parseInt(imgCount / total * 100) + '%');
          if (total === imgCount) {
            // that.setAnimation();
            // that.showWelcome.play();
            
          }
          that.$video[0].addEventListener("canplay", function () {
            that.$loadPage.fadeOut(600);
            that.$homePage.removeClass("hide");
          });
        };
        image.fname = e.name;
        image.src = imageUrl + e.name + "." + e.type;
      });
    }
  };

  var map = new Page();

  $(function() {
    map.init();
    
  });
})(jQuery);