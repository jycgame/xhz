cc.Class({
    extends: cc.Component,
    properties: {
        game:
        {
            default: null,
            type: cc.Node,
        },

        juanzhou:
        {
            default: null,
            type: cc.Node,
        },
        hintBackground: cc.Node,       
        isEnd : false,
    },

    gameHandler: null,

    onLoad: function () {
        this.gameHandler = this.game.getComponent("GameHandler3");
    },

    goNext: function () {
        var gameMana = this.gameHandler.gameManager.getComponent("GameManager");

        if (this.isEnd)
        {
            cc.director.loadScene("Main");
        }

        if (gameMana.isGameWin == true && this.juanzhou.active)
        {
            this.isEnd = true;
        }

        if (!this.juanzhou.active && !this.isEnd)
        {
            this.juanzhou.active = true;
            this.node.active = false;
        }
        else
        {
            this.gameHandler.description.node.active = false;

            this.gameHandler.enableSelectBox();

            for (var i = 0; i < this.gameHandler.selectBoxes.length; i++) {
                this.gameHandler.selectBoxes[i].getComponent("SelectBox3").resultSprite.spriteFrame = this.gameHandler.wrongSprite;
            }

            if (!this.gameHandler.isWin) {
                //gameMana.currentIndex = this.gameHandler.randomSequence.shift()
                this.gameHandler.showQuestion(this.gameHandler.selectContents[gameMana.currentIndex], this.gameHandler.correctContents[gameMana.currentIndex], this.gameHandler.hintContents[gameMana.currentIndex], this.gameHandler.descContents[gameMana.currentIndex],
                    this.gameHandler.descPosXs[gameMana.currentIndex], this.gameHandler.descPosYs[gameMana.currentIndex], this.gameHandler.descSizeWs[gameMana.currentIndex], this.gameHandler.descSizeHs[gameMana.currentIndex], this.gameHandler.goldSentences[gameMana.currentIndex], gameMana.currentIndex);
            }
            else if (this.gameHandler.isWin) {
                this.hintBackground.active = true;
                this.game.active = false;
                gameMana.progressLabel2.string = gameMana.currentAnsweredIndexes.split("|").length + "/" + this.gameHandler.selectContents.length;
                gameMana.resultScoreLabel2.string = gameMana.currentScore;
                gameMana.finalTimeLabel2.string = Math.round(gameMana.startTime);
            }

            this.gameHandler.goldLabel.node.active = false;
            this.gameHandler.isShowing = false;
            this.juanzhou.active = false;
        }
        this.node.active = false;
    },
});
