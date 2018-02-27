cc.Class({
    extends: cc.Component,
    properties: () => ({
        maxTime: null,
        eachScore: null,
        exceedScore: null,
        selectContents: null,
        correctContents: null,
        animNames: null,
        hintContents: null,
        descContents: null,

        animClips:
        {
            default: [],
            type: cc.AnimationClip,
        },

        animSprite: {
            default: null,
            type: cc.Animation,
        },
        selectBoxes: {
            default: [],
            type: cc.Node,
        },


        nextLabel: {
            default: null,
            type: cc.Node,
        },
        wrongSprite: {
            default: null,
            type: cc.SpriteFrame,
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

        gameManager: {
            default: null,
            type: cc.Node,
        },

        musicManager:
        {
            default: null,
            type: cc.Node,
        },

        waitTime: 3,
        currentWaitTime: 0,
        startWait: false,

        changeSpriteCom: require("ChangeSprite"),
        changeSpriteFrame: cc.SpriteFrame,
    }),

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
        sequence.remove(parseInt(gameMana.currentIndex));

        this.randomSequence = new Array();

        while (sequence.length != 0) {
            var index = Math.ceil(Math.random() * sequence.length) - 1;
            this.randomSequence.push(sequence[index]);
            sequence.remove(sequence[index]);
        }
    },

    initialQuestions: function () {
        this.isWin = false;
        this.leftTime = this.maxTime;
        this.startCount = true;
        this.nextLabel.active = false;

        this.getRandomSequence();

        var index = this.randomSequence.pop();
        this.showQuestion(this.selectContents[index], this.correctContents[index], this.animNames[index], this.hintContents[index], this.descContents[index], index);
    },

    showFirst: function () {
        this.showQuestion(this.selectContents[0], this.correctContents[0], this.animNames[0])
    },

    showQuestion: function (selectContent, correctContent, animName, hint, description, index) {

        var gameMana = this.gameManager.getComponent("GameManager");

        this.leftTime = this.maxTime;
        this.startCount = true;
        this.nextLabel.active = false;

        if (gameMana.currentGame != this.node) {
            gameMana.currentGame = this.node;
            gameMana.currentAnsweredIndexes = "";
        }

        gameMana.hasStarted = true;
        gameMana.currentIndex = index;
        gameMana.currentStageName = this.node.name;

        if (gameMana.currentAnsweredIndexes == "") {
            if (!gameMana.hasPlayed)
            {
                this.changeSpriteCom.showTransition(this.changeSpriteFrame);
                this.startCount = false;
                this.node.active = false;
                return;
            }
            else {
                gameMana.hasPlayed = false;
                this.startCount = true;
                this.node.active = true;
            }
        }

        var self = this;

        var selects = selectContent.split("|");

        var m = 0;

        while (selects.length != 0) {
            var index = Math.ceil(Math.random() * selects.length) - 1;
            var selecBox = self.selectBoxes[m].getComponent("SelectBox1");
            selecBox.setLabel(selects[index]);
            selects.remove(selects[index]);
            m++;
        }

        self.correct = correctContent;

        //cc.loader.loadRes("AnimationClip/" + animName, function (err, clip) {
        //    self.animSprite.addClip(clip, animName);
        //});
        //    var animState = self.animSprite.play(animName);
        //    animState.wrapMode = cc.WrapMode.Loop;

        self.animSprite.addClip(self.animClips[animName], animName)
        var animState = self.animSprite.play(animName);
        animState.wrapMode = cc.WrapMode.Loop;
        self.hint.string = hint;
        self.description.string = description;
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
        if (this.startWait) {
            this.currentWaitTime += dt;
            if (this.currentWaitTime >= this.waitTime) {
                this.nextLabel.active = true;
                this.startWait = false;
                this.currentWaitTime = 0;
            }
        }
        if (this.startCount) {
            this.leftTime -= dt;
        }
    },
});
