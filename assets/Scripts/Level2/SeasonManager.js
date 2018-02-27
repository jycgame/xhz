var TransitionBackground = require("TransitionBackground");

cc.Class({
    extends: cc.Component,

    properties: () => ({

        time: 3,
        currentSeason: 0,
        elapseTime: 0,
        isPaused: false,

        wan: {
            default: null,
            type: cc.Sprite,
        },

        season: {
            default: null,
            type: cc.Sprite
        },

        wanArray: {
            default: [],
            type: [cc.SpriteFrame],
        },

        backArray: {
            default: [],
            type: [cc.SpriteFrame],
        },

        dropArray: {
            default: [],
            type: [cc.SpriteFrame],
        },

        heroNode: {
            default: null,
            type: cc.Node,
        },

        successPanel: {
            default: null,
            type: cc.Node,
        },

        failPanel: {
            default: null,
            type: cc.Node,
        },

        targetScore: 0,

        dropManager: {
            default: null,
            type: cc.Node,
        },

        gameManager: {
            default: null,
            type: cc.Node,
        },

        seasonIcons:
        {
            default: [],
            type: cc.Node,
        },

        maskNode:
        {
            default: null,
            type: cc.Node,
        },

        hintNode:
        {
            default: null,
            type: cc.Node,
        },

        game3:
        {
            default: null,
            type: cc.Node,
        },

        wrongBackgroundNode: cc.Node,

        transition: TransitionBackground,

        isShowingHint: false,
        waitTime: 1,
        currentTime: 0,
        isShowHint: true,

        changeSpriteCom: require("ChangeSprite"),
        changeSpriteFrame: cc.SpriteFrame,
    }),

    initiate: function () {
        this.elapseTime = 0;
        this.currentSeason = 0;
        this.isPaused = false;
        this.isShowHint = true;
        this.dropManager.getComponent("DropManager").reset();
        this.heroNode.getComponent("Hero").reset();
    },


    pause: function () {
        this.isPaused = true;
    },

    resume: function () {
        this.isPaused = false;
    },

    // use this for initialization
    onLoad: function () {
        self = this;

        if (this.gameManager.getComponent("GameManager").currentGame != this.node) {
            this.gameManager.getComponent("GameManager").currentGame = this.node;
            this.gameManager.getComponent("GameManager").currentAnsweredIndexes = "";
        }

        this.gameManager.getComponent("GameManager").hasStarted = true;

        cc.loader.loadRes("Data/Level2Data", function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
                return;
            } else {
                var lines = csvData.trim().split('\n');

                var line = lines[2];

                var contents = line.split(',');

                self.time = parseInt(contents[1]);
                console.log("time is: " + self.time);

                self.targetScore = parseInt(contents[3]);

                self.dropManager.active = true;
            }
        });

        this.currentSeason = 0;

        this.successPanel.active = false;
        this.failPanel.active = false;

        this.isPaused = true;
        this.isShowHint = true;
    },

    setHighlight: function () {
        for (var i = 0; i < this.seasonIcons.length; i++) {
            if (i === this.currentSeason) {
                this.seasonIcons[i].scaleX = 0.75;
                this.seasonIcons[i].scaleY = 0.75;
                this.seasonIcons[i].opacity = 255;
            }
            else {
                //0.5是原始scale
                this.seasonIcons[i].scaleX = 0.5;
                this.seasonIcons[i].scaleY = 0.5;
                this.seasonIcons[i].opacity = 64;
            }
        }
    },

    showHint: function(dt)
    {
        this.currentTime += dt;
        this.maskNode.active = true;
        this.hintNode.active = true;
        var label = this.hintNode.getComponent(cc.Label);
        var dropSprite = this.hintNode.getChildByName("drop").getComponent(cc.Sprite);

        if (this.currentSeason == 0) {
            label.string = "请接住春天的雨滴";
            dropSprite.spriteFrame = this.dropArray[0];
        }
        else if (this.currentSeason == 1)
        {
            label.string = "请接住夏天的雨滴";
            dropSprite.spriteFrame = this.dropArray[1];
        }
        else if (this.currentSeason == 2)
        {
            label.string = "请接住秋天的雨滴";
            dropSprite.spriteFrame = this.dropArray[2];
        }
        else if (this.currentSeason == 3)
        {
            label.string = "请接住冬天的雨滴";
            dropSprite.spriteFrame = this.dropArray[3];
        }


        if (this.currentTime >= this.waitTime)
        {
            this.maskNode.active = false;
            this.hintNode.active = false;
            this.currentTime = 0;
            this.isShowHint = false;
            this.isPaused = false;
            this.dropManager.getComponent("DropManager").isPaused = false;
        }
    },


    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

        if (this.isShowHint)
        {
            this.showHint(dt);
            return;
        }

        if (this.isPaused) return;

        this.elapseTime += dt;

        this.setHighlight();

        if (this.elapseTime >= this.time / 4) {

            console.log("background changed");
            this.wan.spriteFrame = this.wanArray[0];
            this.season.spriteFrame = this.backArray[0];

            var gameMana = this.gameManager.getComponent("GameManager");

            if (this.currentSeason < 4) {
                this.currentSeason += 1;


                //夏天
                if (this.currentSeason == 1) {
                    //换背景
                    this.wan.spriteFrame = this.wanArray[1];
                    this.season.spriteFrame = this.backArray[1];
                    this.isShowHint = true;
                    this.isPaused = true;
                    this.dropManager.getComponent("DropManager").isPaused = true;
                }

                //秋天
                if (this.currentSeason == 2) {
                    this.wan.spriteFrame = this.wanArray[2];
                    this.season.spriteFrame = this.backArray[2];
                    this.isShowHint = true;
                    this.isPaused = true;
                    this.dropManager.getComponent("DropManager").isPaused = true;
                }

                //冬天
                if (this.currentSeason == 3) {
                    this.wan.spriteFrame = this.wanArray[3];
                    this.season.spriteFrame = this.backArray[3];
                    this.isShowHint = true;
                    this.isPaused = true;
                    this.dropManager.getComponent("DropManager").isPaused = true;
                }

                //游戏时间到
                if (this.currentSeason == 4) {
                    var heroScript = this.heroNode.getComponent("Hero");
                    var totalScore = heroScript.chunScore + heroScript.xiaScore + heroScript.qiuScore + heroScript.dongScore;

                    this.pause();

                    var dropMan = cc.find("Canvas/Level2/DropManager").getComponent("DropManager");
                    dropMan.pause();

                    gameMana.startTime += this.time;
                    if (totalScore >= this.targetScore) {
                        this.transition.showTransitionNode(1);
                        var heroScript = this.heroNode.getComponent("Hero");
                        gameMana.currentScore += heroScript.chunScore + heroScript.xiaScore + heroScript.qiuScore + heroScript.dongScore;
                        gameMana.currentStageName = "Game3";
                        gameMana.currentAnsweredIndexes = ""
                        //先将currentIndex置空后再从randomSequence中赋值
                        gameMana.currentIndex = null;

                        var gameHandler = this.game3.getComponent("GameHandler3");
                        gameHandler.getRandomSequence();
                        gameMana.currentIndex = gameHandler.randomSequence.shift();
                        gameMana.saveData(gameMana.userId, gameMana.currentStageName, gameMana.currentIndex, gameMana.currentAnsweredIndexes, gameMana.currentScore, gameMana.startTime, gameMana.leftLife, gameMana.isGameWin);
                    }
                    else {
                        gameMana.leftLife -= 1;
                        if (gameMana.leftLife > 0)
                        {
                            this.failPanel.active = true;
                        }
                        else
                        {
                            this.wrongBackgroundNode.active = true;
                            this.wrongBackgroundNode.getComponent("WrongBackground").showButtons();
                            gameMana.leftLifeLabel.string = gameMana.leftLife;
                            gameMana.progressLabel.string = "0/1";
                            gameMana.finalTimeLabel.string = Math.round(this.gameManager.getComponent("GameManager").startTime);
                            gameMana.resultScoreLabel.string = this.gameManager.getComponent("GameManager").currentScore;
                            gameMana.rankManager.getComponent("RankManager").querySelf();
                        }

                        gameMana.saveData(gameMana.userId, gameMana.currentStageName, gameMana.currentIndex, gameMana.currentAnsweredIndexes, gameMana.currentScore, gameMana.startTime, gameMana.leftLife, gameMana.isGameWin);
                    }
                }

                this.elapseTime = 0;
            }
        }

    },
});
