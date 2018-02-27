cc.Class({
    extends: cc.Component,
    properties: {
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
        musicManager:
        {
            default: null,
            type: cc.Node,
        },
    },

    goNext: function () {

        //this.game.active = false;
        //this.nextGame.active = true;

        var gameHandler = this.nextGame.getComponent("GameHandler3");
        var gameMana = gameHandler.gameManager.getComponent("GameManager");
        this.musicManager.getComponent("MusicManager").playAudio(2);
        gameMana.stillPage = this.game;
        gameMana.changeSpriteCom.showTransition(gameMana.seasonManager.getComponent("SeasonManager").changeSpriteFrame);

        gameHandler.showQuestion(gameHandler.selectContents[gameMana.currentIndex], gameHandler.correctContents[gameMana.currentIndex], gameHandler.hintContents[gameMana.currentIndex], gameHandler.descContents[gameMana.currentIndex],
            gameHandler.descPosXs[gameMana.currentIndex], gameHandler.descPosYs[gameMana.currentIndex], gameHandler.descSizeWs[gameMana.currentIndex], gameHandler.descSizeHs[gameMana.currentIndex], gameHandler.goldSentences[gameMana.currentIndex], gameMana.currentIndex);
    },
});
