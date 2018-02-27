cc.Class({
    extends: cc.Component,

    properties: {
        audioSource:
        {
            default: null,
            type: cc.AudioSource,
        },
        bgm:
        {
            default: [],
            url: cc.AudioClip,
        }
    },

    playAudio: function (index) {
        if (this.audioSource.clip != this.bgm[index])
        {
            this.audioSource.clip = this.bgm[index];
            this.audioSource.play();
            this.audioSource.loop = true;
        }
    },
});
