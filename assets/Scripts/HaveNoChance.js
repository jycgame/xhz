cc.Class({
    extends: cc.Component,

    properties: {
        waitTime: 3,
        currentTime: 0,
    },

    update: function (dt)
    {
        this.currentTime += dt;

        if (this.currentTime >= this.waitTime)
        {
            this.currentTime = 0;
            this.node.active = false;
        }
    },
});
