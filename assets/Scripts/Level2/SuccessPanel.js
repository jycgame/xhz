cc.Class({
    extends: cc.Component,

    properties: {

        chun: {
            default: null,
            type: cc.Label,
        },

        xia: {
            default: null,
            type: cc.Label,
        },

        qiu: {
            default: null,
            type: cc.Label,
        },

        dong: {
            default: null,
            type: cc.Label,
        },

        stageScore: {
            default: null,
            type: cc.Label,
        },

        totalScore: {
            default: null,
            type: cc.Label,
        },

        heroNode: {
            default: null,
            type: cc.Node,
        },

        gameManager: {
            default: null,
            type: cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var heroScript = this.heroNode.getComponent("Hero");

        var dpmScript = cc.find("Canvas/Level2/DropManager").getComponent("DropManager");
        var chunCount = dpmScript.chunTotal;
        var xiaCount = dpmScript.xiaTotal;
        var qiuCount = dpmScript.qiuTotal;
        var dongCount = dpmScript.dongTotal;

        var benGuanScore = heroScript.chunScore + heroScript.xiaScore + heroScript.qiuScore + heroScript.dongScore;

        this.chun.string = heroScript.chunScore;
        this.xia.string =  heroScript.xiaScore;
        this.qiu.string =  heroScript.qiuScore;
        this.dong.string = heroScript.dongScore;
        this.stageScore.string = benGuanScore;
        this.totalScore.string = this.gameManager.getComponent("GameManager").currentScore;
    },
});
