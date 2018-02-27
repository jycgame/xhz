cc.Class({
    extends: cc.Component,

    properties: () => ({

        transitionNodes:
        {
            default: [],
            type: cc.Node,
        },

        gameManager: require("GameManager"),

        seasonManager: require("SeasonManager"),

        gameHandler: require("GameHandler3"),
    }),

    showTransitionNode: function (index) {
        this.node.active = true;
        for (var i = 0; i < this.transitionNodes.length; i++) {
            if (i == index) {
                this.transitionNodes[i].active = true;
            }
            else {
                this.transitionNodes[i].active = false;
            }
        }
    },

    showWinBackground: function () {
        this.gameManager.winBackground.active = true;
        this.gameManager.winBackgroundCom.showButtons();

        if (this.gameManager.currentStageName == "Game3")
        {
            this.gameManager.progressLabel2.string = this.gameManager.currentAnsweredIndexes.split("|").length + "/" + this.gameHandler.selectContents.length;
        }
        this.gameManager.resultScoreLabel2.string = this.gameManager.currentScore;
        this.gameManager.finalTimeLabel2.string = Math.round(this.gameManager.startTime);

        this.gameManager.rankManager.getComponent("RankManager").querySelf();
        this.node.active = false;
    },

    showSuccessPanel: function () {
        this.seasonManager.successPanel.active = true;
        this.node.active = false;
    }
});
