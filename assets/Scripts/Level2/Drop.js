cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        typ: 0,
        labelNode: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.labelNode = this.node.getChildByName("label");
    },

    setColor: function(color) {
        this.labelNode.color = color;
    },

    setLabel: function(text) {
        this.labelNode.getComponent(cc.Label).string = text;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

        if (this.speed > 0) {
            this.node.y -= this.speed * dt;

            if (this.node.y < -100)
                this.node.destroy();
        }

    },

    onCollisionEnter: function (other, self) {


    }
});
