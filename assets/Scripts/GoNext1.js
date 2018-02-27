var TransitionBackground = require("TransitionBackground");

cc.Class({
    extends: cc.Component,
    properties:  {
        game:
        {
            default: null,
            type: cc.Node,
        },
        nextGame:
        {
            default: null,
            type: cc.Node,
        },
        transition: TransitionBackground,
    },

    gameHandler: null,

    onLoad: function () {
        this.gameHandler = this.game.getComponent("GameHandler1");
    },

    goNext: function () {
        this.gameHandler.description.node.active = false;

        this.gameHandler.enableSelectBox();

        var gameMana = this.gameHandler.gameManager.getComponent("GameManager");

        for (var i = 0; i < this.gameHandler.selectBoxes.length; i++) {
            this.gameHandler.selectBoxes[i].getComponent("SelectBox1").resultSprite.spriteFrame = this.gameHandler.wrongSprite;
        }

        if (this.gameHandler.randomSequence.length != 0) {
            var index = this.gameHandler.randomSequence.pop()
            this.gameHandler.showQuestion(this.gameHandler.selectContents[index], this.gameHandler.correctContents[index], this.gameHandler.animNames[index],
                this.gameHandler.hintContents[index], this.gameHandler.descContents[index], index);
        }
        else if (this.gameHandler.isWin) {
            this.transition.showTransitionNode(0);
            this.game.active = false;
        }

        this.gameHandler.leftTime = this.gameHandler.maxTime;
        this.gameHandler.startCount = true;

        this.node.active = false;
    },
});
