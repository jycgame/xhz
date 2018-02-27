cc.Class({
    extends: cc.Component,
    properties: {
        maxTime: null,
        eachScore: null,
        exceedScore: null,
        selectContents: null,
        correctContents: null,
        animNames: null,
        hintContents: null,
        descContents: null,

        descPosXs: null,
        descPosYs: null,
        descSizeWs: null,
        descSizeHs: null,
        goldSentences: null,

        quesionSpriteFrame:
        {
            default: [],
            type: cc.SpriteFrame,
        },

        selectBoxes: {
            default: [],
            type: cc.Node,
        },
        hint: {
            default: null,
            type: cc.Label,
        },
        description: {
            default: null,
            type: cc.Label,
        },

        correct: null,
        randomSequence: null,

        nextLabel: {
            default: null,
            type: cc.Node,
        },
        nextGoldLabel: {
            default: null,
            type: cc.Node,
        },
        rightSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        wrongSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        gameManager: {
            default: null,
            type: cc.Node,
        },
        goldLabel: {
            default: null,
            type: cc.Label,
        },

        juanZhou: {
            default: null,
            type: cc.Node,
        },

        showJuanZhou: false,
        isShowing: false,
        showContinue: false,
        waitTime: 3,
        currentWatiTime: 0,

        changeSpriteCom: require("ChangeSprite"),
        changeSpriteFrame: cc.SpriteFrame,
    },

    leftTime: null,
    startCount: null,
    isWin: null,

    getRandomSequence: function () {
        var sequence = new Array();
        for (var i = 0; i < this.selectContents.length; i++) {
            sequence.push(i);
        }

        var gameMana = this.gameManager.getComponent("GameManager");
        for (var i = 0; i < this.gameManager.getComponent("GameManager").currentIndexes.length; i++) {
            sequence.remove(parseInt(gameMana.currentIndexes[i]));
        }
        if (gameMana.currentIndex != null)
        {
            sequence.remove(parseInt(gameMana.currentIndex));
        }

        this.randomSequence = new Array();

        while (sequence.length != 0) {
            this.randomSequence.push(sequence[0]);
            sequence.remove(sequence[0]);
        }
    },

    //initialQuestions: function () {
    //    this.leftTime = this.maxTime;
    //    this.startCount = true;
    //    this.gameManager.getComponent("GameManager").currentGame = this.node;
    //    this.isWin = false;
    //    this.nextLabel.active = false;
    //    this.gameManager.getComponent("GameManager").musicManager.getComponent("MusicManager").playAudio(2)
    //    this.getRandomSequence();

    //    for (var i = 0; i < this.selectBoxes.length; i++) {
    //        this.selectBoxes[i].getComponent("SelectBox3").resultSprite.spriteFrame = this.wrongSprite;
    //    }

    //    var index = this.randomSequence.shift()
    //    this.showQuestion(this.selectContents[index], this.correctContents[index], this.hintContents[index], this.descContents[index],
    //        this.descPosXs[index], this.descPosYs[index], this.descSizeWs[index], this.descSizeHs[index], this.goldSentences[index], index);
    //},

    showQuestion: function (selectContent, correctContent, hint, description, x, y, w, h, gold, index) {
        this.leftTime = this.maxTime;
        this.startCount = true;
        this.nextLabel.active = false;

        var self = this;
        var selects = selectContent.split("|");
        if (this.gameManager.getComponent("GameManager").currentGame != this.node) {
            this.gameManager.getComponent("GameManager").currentGame = this.node;
            this.gameManager.getComponent("GameManager").currentAnsweredIndexes = "";
        }
        this.gameManager.getComponent("GameManager").hasStarted = true;
        this.gameManager.getComponent("GameManager").currentIndex = index;

        if (this.gameManager.getComponent("GameManager").currentAnsweredIndexes == "") {
            if (!this.gameManager.getComponent("GameManager").hasPlayed) {
                this.changeSpriteCom.showTransition(this.changeSpriteFrame);
                this.startCount = false;
                this.node.active = false;
                return;
            }
            else {
                this.gameManager.getComponent("GameManager").hasPlayed = false;
                this.startCount = true;
                this.node.active = true;
            }
        }

        var m = 0;

        while (selects.length != 0) {
            var index = Math.ceil(Math.random() * selects.length) - 1;
            var selecBox = self.selectBoxes[m].getComponent("SelectBox3");
            selecBox.setSprite(self.quesionSpriteFrame[selects[index]]);
            selects.remove(selects[index]);
            m++;
        }


        self.correct = correctContent;

        self.hint.string = hint;
        self.description.string = description;

        self.goldLabel.string = gold;
        self.showGold = false;
    },

    disableSelectBox: function () {
        for (var i = 0; i < this.selectBoxes.length; i++) {
            this.selectBoxes[i].getComponent(cc.Button).interactable = false;
        }
    },

    enableSelectBox: function () {
        for (var i = 0; i < this.selectBoxes.length; i++) {
            this.selectBoxes[i].getComponent(cc.Button).interactable = true;
        }
    },

    update: function (dt) {
        if (this.startCount) {
            this.leftTime -= dt;
        }

        if (this.showContinue)
        {
            this.currentWatiTime += dt;
            if (this.currentWatiTime >= this.waitTime)
            {
                this.nextGoldLabel.active = true;
                this.currentWatiTime = 0;
                this.showContinue = false;
            }
        }
    },
});
