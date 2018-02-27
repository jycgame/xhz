cc.Class({
    extends: cc.Component,

    properties: () => ({
        gameManager: require("GameManager"),
        goNextNode: cc.Node,
        quitNode: cc.Node,
        leftNode: cc.Node,
        resultNode: cc.Node,

        goNextPos1: cc.v2(-283, -427),
        quitPos1: cc.v2(-283, -664),
        leftPos1: cc.v2(-301, 121),
        quitPos3: cc.v2(-283, -509),
        leftPos3: cc.v2(-291, 343),

        title: cc.Sprite,
        daCuo: cc.SpriteFrame,
        shiBai: cc.SpriteFrame,
    }),

    showButtons: function () {
        //当没有生命时，展示详细页面及Pos3
        if (this.gameManager.leftLife <= 0) {
            this.title.spriteFrame = this.shiBai;
            this.goNextNode.active = false;
            this.quitNode.active = true;
            this.resultNode.active = true;

            this.leftNode.position = this.leftPos3;
            this.quitNode.position = this.quitPos3;
        }
        //当没有生命时，展示简略页面及Pos1
        else {
            this.title.spriteFrame = this.daCuo;
            this.goNextNode.active = true;
            this.quitNode.active = true;
            this.resultNode.active = false;

            this.goNextNode.position = this.goNextPos1;
            this.quitNode.position = this.quitPos1;
            this.leftNode.position = this.leftPos1;
        }
    }
});
