cc.Class({
    extends: cc.Component,

    properties:
    {
        game1:
        {
            default: null,
            type: cc.Node,
        },
        game3:
        {
            default: null,
            type: cc.Node,
        },
        gameManager:
        {
            default: null,
            type: cc.Node,
        },
        startBackground:
        {
            default: null,
            type: cc.Node,
        },
        rankBackground:
        {
            default: null,
            type: cc.Node,
        },
        haveNoChanceNode: cc.Node,
    },

    startGame1: function ()
    {
        if (this.gameManager.getComponent("GameManager").leftLife <= 0) {
            this.haveNoChanceNode.active = true;
            return;
        }
        //this.rankBackground.active = false;
        this.gameManager.getComponent("GameManager").gotoStage();
    },
    showRank: function () {
        this.gameManager.getComponent("GameManager").rankManager.getComponent("RankManager").querySort();
        this.rankBackground.active = true;
        this.startBackground.active = false;
    }
});
