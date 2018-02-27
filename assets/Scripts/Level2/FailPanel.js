cc.Class({
    extends: cc.Component,

    properties: {
        chance: {
            default: null,
            type: cc.Label,
        },

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

        target: {
            default: null,
            type: cc.Label,
        }, 

        heroNode: {
            default: null,
            type: cc.Node,
        },

        continueNode: {
            default: null,
            type: cc.Node,
        },

        seasonManager:
        {
            default: null,
            type: cc.Node,
        },

        gameManager:
        {
            default: null,
            type: cc.Node,
        }
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

        this.chun.string = "收集春雨：" + heroScript.chunScore;
        this.xia.string = "收集夏雨：" + heroScript.xiaScore;
        this.qiu.string = "收集秋雨：" + heroScript.qiuScore;
        this.dong.string = "收集冬雨：" + heroScript.dongScore;
        this.target.string = "目标数量：" + this.seasonManager.getComponent("SeasonManager").targetScore;

        this.chance.string = "剩余机会：" + this.gameManager.getComponent("GameManager").leftLife + "次";

        if (this.gameManager.getComponent("GameManager").leftLife <= 0)
        {
            this.continueNode.active = false;
        }
    },
});
