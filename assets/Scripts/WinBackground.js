cc.Class({
    extends: cc.Component,

    properties: () => ({
        gameManager: require("GameManager"),
        goNextNode: cc.Node,
        quitNode: cc.Node,

        goNextPos1: cc.v2(-283, -427),
        quiPos1: cc.v2(-283, -664),
        quitPos3: cc.v2(-283, -509),
    }),

    showButtons: function ()
    {
        //当通过第一关卡，此时gameManager的currentStage变为Level2
        if (this.gameManager.currentStageName == "Level2")
        {
            this.goNextNode.active = true;
            this.quitNode.active = true;

            this.goNextNode.position = this.goNextPos1;
            this.quitNode.position = this.quiPos1;
        }
        //当通过第三关卡，此时gameManager的currentStage仍为Game3，并且gameManger.isGameWin为true
        else if (this.gameManager.currentStageName == "Game3" && this.gameManager.isGameWin)
        {
            this.goNextNode.active = false;
            this.quitNode.active = true;
            this.quitNode.position = this.quitPos3;
        }
    }
});
