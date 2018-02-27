cc.Class({
    extends: cc.Component,

    properties:
    {
        gameManager:
        {
            default: null,
            type: cc.Node,
        },

        wrongBackgrond:
        {
            default: null,
            type: cc.Node,
        },

        winBackgrond:
        {
            default: null,
            type: cc.Node,
        },

        game1:
        {
            default: null,
            type: cc.Node,
        },

        game2:
        {
            default: null,
            type: cc.Node,
        },
        game3:
        {
            default: null,
            type: cc.Node,
        },
        juanZhou:
        {
            default: null,
            type: cc.Node,
        },
        seasonManagerNode: cc.Node,

        endString: "",
    },

    continue: function () {
        var gameMana = this.gameManager.getComponent("GameManager");

        if (this.gameManager.getComponent("GameManager").currentGame == this.game1) {
            if (!this.game1.getComponent("GameHandler1").isWin) {
                gameMana.currentGame.active = true;
                this.wrongBackgrond.active = false;
            }
            else {
                this.gameManager.getComponent("GameManager").musicManager.getComponent("MusicManager").playAudio(1);

                gameMana.stillPage = this.winBackgrond;
                gameMana.changeSpriteCom.showTransition(gameMana.seasonManager.getComponent("SeasonManager").changeSpriteFrame);
                //this.game2.active = true;
                //this.game1.active = false;
                //this.winBackgrond.active = false;

                //保存信息
                gameMana.currentStageName = "Level2";
            }
        }
        else if (gameMana.currentGame == this.game3) {
            if (!this.game3.getComponent("GameHandler3").isWin) {
                gameMana.currentGame.active = true;
                this.wrongBackgrond.active = false;
            }
            //全部游戏结束
            else {
                this.juanZhou.active = true;
                var juanCom = this.juanZhou.getComponent("JuanZhou");
                juanCom.isStart = true;
                juanCom.goldLabel.string = this.endString;
                juanCom.goldLabel.node.active = true;
                this.juanZhou.getComponent(cc.Animation).play();
            }
        }

        gameMana.saveData(gameMana.userId, gameMana.currentStageName, gameMana.currentIndex, gameMana.currentAnsweredIndexes, gameMana.currentScore,
            gameMana.startTime, gameMana.leftLife, gameMana.isGameWin);


    },

    quit: function () {
        var gameMana = this.gameManager.getComponent("GameManager");
        if (gameMana.currentGame.getComponent("GameHandler1") != null && gameMana.currentGame.getComponent("GameHandler1").isWin) {
            gameMana.currentStageName = "Level2";
        }
        gameMana.saveData(gameMana.userId, gameMana.currentStageName, gameMana.currentIndex, gameMana.currentAnsweredIndexes, gameMana.currentScore,
            gameMana.startTime, gameMana.leftLife, gameMana.isGameWin);
        cc.director.loadScene("Main");
    },
});
