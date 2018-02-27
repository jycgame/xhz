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
        //��ͨ����һ�ؿ�����ʱgameManager��currentStage��ΪLevel2
        if (this.gameManager.currentStageName == "Level2")
        {
            this.goNextNode.active = true;
            this.quitNode.active = true;

            this.goNextNode.position = this.goNextPos1;
            this.quitNode.position = this.quiPos1;
        }
        //��ͨ�������ؿ�����ʱgameManager��currentStage��ΪGame3������gameManger.isGameWinΪtrue
        else if (this.gameManager.currentStageName == "Game3" && this.gameManager.isGameWin)
        {
            this.goNextNode.active = false;
            this.quitNode.active = true;
            this.quitNode.position = this.quitPos3;
        }
    }
});
