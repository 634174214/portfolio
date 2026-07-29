/*
自动音频播放v2版
添加控制开关位置控制配置
 */
var AudioAutoPlay = function(args) {
  function autoplay() {
    var timeStamp = new Date().getTime(); 
    var self = this;
    this.audioSrc = args.audioSrc;
    this.audioBtnZindex = args.audioBtnZindex || 190;
    this.audioBtnXY = args.audioBtnXY || {
      top: '10px',
      right: '10px'
    };
    this.audioBtnXY = this.getBtnCss(this.audioBtnXY);
    this.audioId = args.audioId || ('sound_' + timeStamp);
    this.audioBtnId = args.audioBtnId || ('audiobtn_' + timeStamp);
    this.audioWrapperCss = args.audioWrapperCss || '';

    // 默认播放状态
    this.isPlaying = false;
    this.firstTouch = true;
    window.addEventListener('load', function() {
      self.init();
    });
  }
  autoplay.prototype = {
    init: function() {
      this.appendEl();
      this.bgaudio = document.getElementById(this.audioId);
      this.bgAudioBtn =  document.getElementById(this.audioBtnId);
      // 如果不是pc那么执行
      if (!this.ispc()) {
        this.weXinAutoPlay();
        this.firstTouchPlay();
      }
      this.togglePlay();
    },
    getBtnCss: function(str) {
      str = JSON.stringify(str);
      str = str.replace(/\"|{|}/g, '');
      str = str.replace(/\,/g, ';');
      return str;
    },
    ispc: function() {
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
    },
    firstTouchPlay() {
      var self = this;
      document.body.addEventListener('touchstart', function() {
        if (self.firstTouch) {
          self.firstTouch = false;
          if (!self.isPlaying) {
            self.bgaudio.play();
            self.bgAudioBtn.setAttribute('class', 'on');
            self.isPlaying = true;
          }
        } else {
          return;
        }
      });
    },
    weXinAutoPlay: function() {
      var self = this;
      document.addEventListener("WeixinJSBridgeReady", function () {
          WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
              network = e.err_msg.split(":")[1];  //结果在这里
              self.playAudio();
              if (self.isPlaying) {
                self.bgAudioBtn.setAttribute('class', 'on');
              }
          });
      }, false);
    },
    playAudio: function() {
        this.isPlaying = true;
        this.bgaudio.play();
    },
    togglePlay: function() {
      var self = this;
      this.bgAudioBtn.addEventListener('click', function() {
        if (self.isPlaying) {
          self.bgAudioBtn.setAttribute('class', 'off');
          self.bgaudio.pause();
          self.isPlaying = false;
        } else {
          self.bgAudioBtn.setAttribute('class', 'on');
          self.bgaudio.play();
          self.isPlaying = true;
        }
      });
    },
    appendEl: function() {
      var domEl = document.createElement('div');
      var styleEl = document.createElement('style');
      domEl.innerHTML = this.html();
      styleEl.innerHTML = this.style();
      domEl.className = 'audio-wrapper';
      document.body.appendChild(domEl);
      document.head.appendChild(styleEl);
    },
    html: function() {
      var html = '<div id="' + this.audioBtnId + '" class="off"></div><audio src="' + this.audioSrc + '" id="' + this.audioId + '" class="media-audio" preload loop="loop"></audio>';
      return html;
    },
    style: function() {
      var idName = '#' + this.audioBtnId;
      var css_btn = idName + "{width: 44px;height: 44px;position: fixed;" + this.audioBtnXY + ";z-index: " + this.audioBtnZindex + ";background:url('" + this.audioBgImg + "') no-repeat;}";
      var css_btn_on = idName + ".on{background-position: 0 0;-webkit-animation: rotating 1.2s linear infinite;animation: rotating 1.2s linear infinite;}";
      var css_btn_off = idName + ".off{background-position: 0 -51px;}";
      var css_ani = "@-webkit-keyframes rotating{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotating{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}";
      var css = css_btn + css_btn_on + css_btn_off + css_ani;
      // 如果有针对外层的样式就添加
      var css = css + this.audioWrapperCss;
      return css;
    },
    audioBgImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAABeCAYAAABYbvbLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlGMEY4QkY0RUFEQjExRTdCOUFGRUQ2N0Y0OUY4Qzg0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlGMEY4QkY1RUFEQjExRTdCOUFGRUQ2N0Y0OUY4Qzg0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUYwRjhCRjJFQURCMTFFN0I5QUZFRDY3RjQ5RjhDODQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUYwRjhCRjNFQURCMTFFN0I5QUZFRDY3RjQ5RjhDODQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6gExI4AAAIuklEQVR42uxa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'
  };

  return new autoplay();

};
var WeAudio = new AudioAutoPlay({
  audioSrc: 'media/authors.mp3?t=1134',
  // 定义按钮的位置
  audioBtnXY: {
    top: '0px',
    right: '0px'
  },
  // 如果有特殊情况 需要对外层div样式操作的
  audioWrapperCss: '.audio-wrapper{transform:scale(1.5);width:44px;height:44px;position:fixed;right:40px;top:4%}'
});