/**
 * 点击播放音效 按钮点击的音效播放
 */

var ClickSoundEffect = function(args) {
    var self = null;
    function soundEffect() {
        this.audioId = args.audioId || 'sound-effect';
        this.audioSrc = args.audioSrc;

        this.init();
    }
    soundEffect.prototype = {
        init: function() {
            self = this;
            this.audioEl = this._html();
            this._appendEl();
            // this._playEnded();
        },
        play() {
            // 如果self.audioEl.paused == true 那么代表已经暂停或者播放完毕
            // 如果self.audioEl.paused == false 那么代表正在播放
            if (!this.audioEl.paused) {
                return;
            }
            this.audioEl.play();
        },
        pause() {
            this.audioEl.pause();
        },
        _playEnded: function() {
            this.audioEl.addEventListener('ended', function() {
                console.log(self.audioEl.paused)
            });
        },
        _html: function() {
            var audioEl = document.createElement('audio');
            audioEl.id = this.audioId;
            audioEl.src = this.audioSrc;
            audioEl.preload = 'auto';
            return audioEl;
        },
        _appendEl: function() {
            document.body.appendChild(this.audioEl);
        }
    };


    return new soundEffect();
};

var SoundEffectPlay = new ClickSoundEffect({
    audioId: 'click-effect',
    // audioSrc: 'media/authors.mp3'
    audioSrc: 'media/click-effect.mp3'
}) ;
