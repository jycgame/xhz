cc.Class({
    extends: cc.Component,
    properties: {
        limitRight: 470,
        limitLeft: -470,

        chunScore: 0,
        xiaScore: 0,
        qiuScore: 0,
        dongScore: 0,

        chunText: {
            default: null,
            type: cc.Label,
        },

        xiaText: {
            default: null,
            type: cc.Label,
        },

        qiuText: {
            default: null,
            type: cc.Label,
        },

        dongText: {
            default: null,
            type: cc.Label
        },
    },

    reset: function () {
        this.chunScore = 0;
        this.xiaScore = 0;
        this.qiuScore = 0;
        this.dongScore = 0;
    },

    // use this for initialization
    onLoad: function () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.setInputControl();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

        var dpmScript = cc.find("Canvas/Level2/DropManager").getComponent("DropManager");
        var chunCount = dpmScript.chunTotal;
        var xiaCount = dpmScript.xiaTotal;
        var qiuCount = dpmScript.qiuTotal;
        var dongCount = dpmScript.dongTotal;

        this.chunText.string = this.chunScore;
        this.xiaText.string = this.xiaScore;
        this.qiuText.string = this.qiuScore;
        this.dongText.string = this.dongScore;

        if (this.node.x <= -400) {
            this.node.x = -400;
        }
        else if (this.node.x >= 400) {
            this.node.x = 400;
        }

    },

    onCollisionEnter: function (other, self) {

        var dropScript = other.getComponent("Drop");
        var seansonManager = cc.find("Canvas/Level2/SeasonManager").getComponent("SeasonManager");
        var seanson = seansonManager.currentSeason;


        var anim = dropScript.labelNode.getComponent(cc.Animation);
        var characterContainer = cc.find("Canvas/Level2/Characters");


        if (dropScript.typ == 0 && seanson == 0) {
            anim.play();
            dropScript.labelNode.parent = characterContainer;
            dropScript.labelNode.position = other.node.position;
            dropScript.labelNode.y += 100;
            this.chunScore += 1;
        } else if (dropScript.typ == 1 && seanson == 1) {
            anim.play();
            dropScript.labelNode.parent = characterContainer;
            dropScript.labelNode.position = other.node.position;
            dropScript.labelNode.y += 100;
            this.xiaScore += 1;
        } else if (dropScript.typ == 2 && seanson == 2) {
            anim.play();
            dropScript.labelNode.parent = characterContainer;
            dropScript.labelNode.position = other.node.position;
            dropScript.labelNode.y += 100;
            this.qiuScore += 1
        } else if (dropScript.typ == 3 && seanson == 3) {
            anim.play();
            dropScript.labelNode.parent = characterContainer;
            dropScript.labelNode.position = other.node.position;
            dropScript.labelNode.y += 100;
            this.dongScore += 1;
        }

        other.node.destroy();
    },

    setInputControl: function () {
        var self = this;

        // keyboard input
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,

            onKeyPressed: function (keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.moveDir = 1;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.moveDir = 0;
                        break;
                    case cc.KEY.w:
                    case cc.KEY.up:
                        self.moveDir = 2;
                        break;
                    case cc.KEY.s:
                    case cc.KEY.down:
                        self.moveDir = 3;
                        break;
                }
            },
        }, self.node);

        //touch input
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,

            onTouchesBegan: function (touches, event) {
                var touch = touches[0];
                var loc = touch.getLocation();

                this.touchStartPoint = {
                    x: loc.x,
                    y: loc.y
                };

                this.touchLastPoint = {
                    x: loc.x,
                    y: loc.y
                };

                this.touched = 1;
            },

            onTouchesMoved: function (touches, event) {
                var touch = touches[0];
                var loc = touch.getLocation();
                var start = this.touchStartPoint;

                var deltaX = start.x - loc.x;

                var tPos = self.node.x - deltaX;

                if (tPos > self.limitRight) tPos = self.limitRight;
                if (tPos < self.limixtLeft) tPos = self.limixtLeft;

                self.node.x = tPos;
                // self.node.x -= deltaX;

                this.touchStartPoint = loc;
            },

            //´¥Ãþ½áÊø
            onTouchesEnded: function (touches, event) {
                this.touched = false;
            },

        }, self.node);
    }
});


