cc.Class({
    extends: cc.Component,

    properties: {

        goldLabel: {
            default: null,
            type: cc.Label,
        },

        goNext:
        {
            default: null,
            type: cc.Node,
        },

        gameHandler:
        {
            default: null,
            type: cc.Node,
        },
        waitTime: 3,
        currentTime: 0,
    },

    onEnable: function ()
    {
        this.node.getComponent(cc.Animation).play();
    },

    update: function (dt) {

        //var anim = this.node.getComponent(cc.Animation);

        //var animState = anim.getAnimationState("juanzhou");

        //if (animState.isPlaying == false)
        //{
        //    this.currentTime += dt;
        //    if (this.currentTime > this.waitTime)
        //    {
        //        this.isStart = false;
        //        this.currentTime = 0;
        //        this.goNext.active = true;
        //    }
        //}
    },

    showIcon: function ()
    {
        this.goNext.active = true;
    }

});
