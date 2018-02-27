cc.Class({
    extends: cc.Component,

    properties: {
        selectLabel:
        {
            default: null,
            type: cc.Label,
        },
        selectSprite:
        {
            default: null,
            type: cc.Sprite,
        },
        resultSprite:
        {
            default: null,
            type: cc.Sprite,
        },
        correctSprite:
        {
            default: null,
            type: cc.SpriteFrame,
        },
        wrongSprite:
        {
            default: null,
            type: cc.SpriteFrame,
        },
        game:
        {
            default: null,
            type: cc.Node,
        },
        juanZhou:
        {
            default: null,
            type: cc.Node,
        },
    },

    gameHandler: null,

    onLoad: function () {
        this.gameHandler = this.game.getComponent("GameHandler3");
    },

    setLabel: function (content) {
        this.selectLabel.string = content;
    },

    setSprite: function (content) {
        this.selectSprite.spriteFrame = content;
    },

    checkAnswer: function () {
        var gameMana = this.gameHandler.gameManager.getComponent("GameManager");
        gameMana.startTime += this.gameHandler.maxTime - this.gameHandler.leftTime;

        if (this.selectSprite.spriteFrame.name === this.gameHandler.quesionSpriteFrame[this.gameHandler.correct].name) {

            if (this.gameHandler.leftTime >= 0)
            {
                gameMana.currentScore += Math.round(this.gameHandler.leftTime);
            }
            gameMana.currentScore += parseInt(this.gameHandler.exceedScore);

            this.gameHandler.description.node.active = true;
            this.resultSprite.spriteFrame = this.correctSprite;

            this.gameHandler.showContinue = true;

            gameMana.currentScore += parseInt(this.gameHandler.eachScore);

            if (gameMana.currentAnsweredIndexes == "") {
                gameMana.currentAnsweredIndexes += gameMana.currentIndex.toString();
            }
            else {
                gameMana.currentAnsweredIndexes += "|" + gameMana.currentIndex.toString();
            }

            if (this.gameHandler.randomSequence.length == 0) {
                gameMana.rankManager.getComponent("RankManager").querySelf();
                //gameMana.currentStageName = "Game1";

                gameMana.isGameWin = true;
                this.gameHandler.isWin = true;
            }
            else {
                gameMana.currentIndex = this.gameHandler.randomSequence.shift();
            }
           

            this.gameHandler.goldLabel.node.active = true;

            this.gameHandler.disableSelectBox();
            this.gameHandler.startCount = false;
            this.gameHandler.leftTime = this.gameHandler.maxTime;

            //gameMana.saveData(gameMana)

            //saveData: function (stageName, currentIndex, answeredIndexes, currentScore, startTime, leftLife)

            //this.gameHandler.gameManager.getComponent("GameManager").currentAnsweredIndexes.push(this.gameHandler.gameManager.getComponent("GameManager").currentIndex);
        }
        else {
            gameMana.wrongBackground.active = true;
            gameMana.currentGame = this.game;
            this.game.active = false;
            gameMana.leftLife -= 1;
            gameMana.leftLifeLabel.string = gameMana.leftLife;

            if (gameMana.leftLife <= 0) {
                gameMana.continueNode.active = false;

                gameMana.rankListNode.active = true;

                var answerNum = 0;
                if (gameMana.currentAnsweredIndexes.split("|")[0] != "") {
                    answerNum = gameMana.currentAnsweredIndexes.split("|").length;
                }
                gameMana.leftLifeLabel.string = gameMana.leftLife;
                gameMana.progressLabel.string = answerNum + "/" + this.gameHandler.selectContents.length;
                gameMana.finalTimeLabel.string = Math.round(gameMana.startTime);
                gameMana.resultScoreLabel.string = gameMana.currentScore;
                gameMana.rankManager.getComponent("RankManager").querySelf();
            }

            gameMana.wrongBackground.getComponent("WrongBackground").showButtons();
        }

        gameMana.saveData(gameMana.userId, gameMana.currentStageName, gameMana.currentIndex, gameMana.currentAnsweredIndexes, gameMana.currentScore,
            gameMana.startTime, gameMana.leftLife, gameMana.isGameWin);
    },
});
