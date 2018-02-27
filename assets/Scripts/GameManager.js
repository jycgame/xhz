cc.Class({
    extends: cc.Component,

    properties: () => ({

        game1: {
            default: null,
            type: cc.Node,
        },
        game2: {
            default: null,
            type: cc.Node,
        },
        game3: {
            default: null,
            type: cc.Node,
        },
        scoreLabel: {
            default: null,
            type: cc.Label,
        },

        wrongBackground: {
            default: null,
            type: cc.Node,
        },
        continueNode: {
            default: null,
            type: cc.Node,
        },
        leftLifeLabel: {
            default: null,
            type: cc.Label,
        },

        progressLabel: {
            default: null,
            type: cc.Label,
        },
        resultScoreLabel: {
            default: null,
            type: cc.Label,
        },
        finalTimeLabel: {
            default: null,
            type: cc.Label,
        },
        rankLabel: {
            default: null,
            type: cc.Label,
        },
        rankListNode: {
            default: null,
            type: cc.Node,
        },

        winBackground: {
            default: null,
            type: cc.Node,
        },
        progressLabel2: {
            default: null,
            type: cc.Label,
        },
        resultScoreLabel2: {
            default: null,
            type: cc.Label,
        },
        finalTimeLabel2: {
            default: null,
            type: cc.Label,
        },
        rankLabel2: {
            default: null,
            type: cc.Label,
        },
        startBackground: {
            default: null,
            type: cc.Node,
        },
        rankBackground: {
            default: null,
            type: cc.Node,
        },
        musicManager: {
            default: null,
            type: cc.Node,
        },

        rankManager: {
            default: null,
            type: cc.Node,
        },

        seasonManager: cc.Node,

        currentGame: null,
        currentStageName: null,
        currentIndex: null,
        currentAnsweredIndexes: "",
        currentIndexes: [],
        currentScore: null,
        startTime: null,
        hasStarted: false,
        leftLife: null,

        firstGameProgress: null,

        isGameWin: false,

        userId: 1,

        winBackgroundCom: require("WinBackground"),

        transitionBackground: require("TransitionBackground"),

        hintBackgroundNode: cc.Node,

        changeSpriteCom: require("ChangeSprite"),

        currentRank: null,

        totalNumOfThirdStage: 9,

        currentTotalNum: null,

        haveNoChanceNode: cc.Node,

        UserDataURL: "http://jcyapi.easybao.com/jcy-api/app/system/getUserMessage",

        userName: null,

        stillPage: cc.Node,

        hasPlayed: false,

        isDataLoaded: false,
        
    }),

    gameHandler1: null,
    gameHandler2: null,
    gameHandler3: null,

    onLoad: function () {
        this.gameHandler1 = this.game1.getComponent("GameHandler1");
        this.gameHandler3 = this.game3.getComponent("GameHandler3");
        this.musicManager.getComponent("MusicManager").playAudio(0);

        this.gameHandler1.selectContents = new Array();
        this.gameHandler1.correctContents = new Array();
        this.gameHandler1.animNames = new Array();
        this.gameHandler1.hintContents = new Array();
        this.gameHandler1.descContents = new Array();

        this.gameHandler3.selectContents = new Array();
        this.gameHandler3.correctContents = new Array();
        this.gameHandler3.hintContents = new Array();
        this.gameHandler3.descContents = new Array();
        this.gameHandler3.descPosXs = new Array();
        this.gameHandler3.descPosYs = new Array();
        this.gameHandler3.descSizeWs = new Array();
        this.gameHandler3.descSizeHs = new Array();
        this.gameHandler3.goldSentences = new Array();
        this.startTime = 0.0;
        this.leftLife = 5;
        this.currentScore = 0;
        this.isGameWin = false;
        this.currentTotalNum = 0;
        this.stillPage = this.rankBackground;

        this.readCommonData();
        this.readLevelData();
        this.loadData();
    },

    resetAll: function () {

        cc.sys.localStorage.removeItem("stageName");
        cc.sys.localStorage.removeItem("currentIndex");
        cc.sys.localStorage.removeItem("answeredIndex");
        cc.sys.localStorage.removeItem("currentScore");
        cc.sys.localStorage.removeItem("startTime");
        cc.sys.localStorage.removeItem("leftLife");

        this.currentGame = null;
        this.currentStageName = null;
        this.currentIndex = null;
        this.currentAnsweredIndexes = "";
        this.currentIndexes = [];
        this.hasStarted = false;
        this.isGameWin = false;
        this.startTime = 0.0;
        this.leftLife = 5;
        this.currentScore = 0;
    },

    getURLParameter: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    },

    gotoStage: function (hasPlayed = false) {
        if (!this.isDataLoaded)
        {
            return;
        }

        this.currentGame = cc.find("Canvas/" + this.currentStageName)
       
        this.hasPlayed = hasPlayed;


        if (this.currentAnsweredIndexes != "") {
            this.startBackground.active = false;
            this.stillPage.active = false;
        }
        else if (this.hasPlayed) {
            this.stillPage.active = false;
        }

        if (this.currentGame == null || this.currentGame.name === "Game1") {
            this.stageName = "Game1";
            this.musicManager.getComponent("MusicManager").playAudio(0);
            this.game1.active = true;
            this.game2.active = false;
            this.game3.active = false;

            if (this.currentIndex == null) {
                this.game1.active = true;
                this.game1.getComponent("GameHandler1").initialQuestions();
            }
            else {
                this.gameHandler1.getRandomSequence();
                this.gameHandler1.showQuestion(this.gameHandler1.selectContents[this.currentIndex], this.gameHandler1.correctContents[this.currentIndex], this.gameHandler1.animNames[this.currentIndex],
                    this.gameHandler1.hintContents[this.currentIndex], this.gameHandler1.descContents[this.currentIndex], this.currentIndex);
            }

        }
        else if (this.currentGame.name === "Level2") {
            this.stageName = "Level2";
            this.musicManager.getComponent("MusicManager").playAudio(1);
            this.game1.active = false;
            this.game2.active = true;
            this.game3.active = false;

            var seasonMana = this.seasonManager.getComponent("SeasonManager");

            if (this.currentAnsweredIndexes == "") {
                if (!this.hasPlayed) {
                    seasonMana.changeSpriteCom.showTransition(seasonMana.changeSpriteFrame);
                    this.game2.active = false;
                    return;
                }
                else {
                    this.hasPlayed = false;
                    this.node.active = true;
                }
            }
        }
        else if (this.currentGame.name === "Game3") {
            this.stageName = "Game3";
            this.musicManager.getComponent("MusicManager").playAudio(2);
            if (!this.isGameWin) {
                this.game1.active = false;
                this.game2.active = false;
                this.game3.active = true;

                this.gameHandler3.getRandomSequence();
                this.gameHandler3.showQuestion(this.gameHandler3.selectContents[this.currentIndex], this.gameHandler3.correctContents[this.currentIndex], this.gameHandler3.hintContents[this.currentIndex],
                    this.gameHandler3.descContents[this.currentIndex], this.gameHandler3.descPosXs[this.currentIndex], this.gameHandler3.descPosYs[this.currentIndex],
                    this.gameHandler3.descSizeWs[this.currentIndex], this.gameHandler3.descSizeHs[this.currentIndex], this.gameHandler3.goldSentences[this.currentIndex], this.currentIndex);
            }
            else if (this.currentAnsweredIndexes.split("|").length == this.totalNumOfThirdStage) {
                this.transitionBackground.node.active = true;
                this.transitionBackground.showTransitionNode(2);
            }
            else if (this.currentAnsweredIndexes.split("|").length < this.currentTotalNum) {
                this.isGameWin = false;
                this.game1.active = false;
                this.game2.active = false;
                this.game3.active = true;
                this.gameHandler3.getRandomSequence();
                this.currentIndex = this.gameHandler3.randomSequence.shift();
                this.gameHandler3.showQuestion(this.gameHandler3.selectContents[this.currentIndex], this.gameHandler3.correctContents[this.currentIndex], this.gameHandler3.hintContents[this.currentIndex],
                    this.gameHandler3.descContents[this.currentIndex], this.gameHandler3.descPosXs[this.currentIndex], this.gameHandler3.descPosYs[this.currentIndex],
                    this.gameHandler3.descSizeWs[this.currentIndex], this.gameHandler3.descSizeHs[this.currentIndex], this.gameHandler3.goldSentences[this.currentIndex], this.currentIndex);
            }
            else {
                this.hintBackgroundNode.active = true;
            }
        }

        this.saveData(this.userId, this.stageName, this.currentIndex, this.currentAnsweredIndexes, this.currentScore, this.startTime, this.leftLife, this.isGameWin);
    },

    signUp: function () {
        self = this;

        var url = "http://101.132.135.78/char/db/register.php?userId=" + this.userId + "&userName=" + this.userName;

        window.xmlhttp = new XMLHttpRequest();
        window.xmlhttp.onreadystatechange = function () {
            console.log(window.xmlhttp.readyState);
            if (window.xmlhttp.readyState == 4) {
                if (window.xmlhttp.status == 200) {
                    console.log(window.xmlhttp.responseText);
                    console.log("Sign Up Success");

                    self.loadData();
                }
                else {
                    alert("Problem retrieveing XML data");
                }
            }
        };
        window.xmlhttp.open("GET", url, true);
        window.xmlhttp.send(null);
    },

    saveData: function (userId, stageName, currentIndex, answeredIndexes, currentScore, startTime, leftLife, isGameWin) {
        var url = "http://101.132.135.78/char/db/saveplayer.php?userId=" + userId + "&stageName=" + stageName + "&currentIndex=" + currentIndex + "&answeredIndexes=" + answeredIndexes +
            "&currentScore=" + currentScore + "&startTime=" + startTime + "&leftLife=" + leftLife + "&isGameWin=" + isGameWin;
        var self = this;

        window.xmlhttp = new XMLHttpRequest();
        window.xmlhttp.onreadystatechange = function () {
            if (window.xmlhttp.readyState == 4) {
                if (window.xmlhttp.status == 200) {
                    console.log("update successfully!");
                }
                else {
                    alert("Problem retrieveing XML data");
                }
            }
        };
        window.xmlhttp.open("GET", url, true);
        window.xmlhttp.send(null);
    },

    loadData: function () {
        var searchParam = "userNo";
        this.userId = this.getURLParameter(searchParam);
        var self = this;

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", this.UserDataURL);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        var paramJson = { "userNo": this.userId };
        xmlhttp.send(JSON.stringify(paramJson));

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var obj = JSON.parse(xmlhttp.responseText);
                    if (obj.data == null) {
                        console.error("Can't find user name by user id!");
                        return;
                    }
                    self.userName = obj.data.name;

                    //将之前load的代码放入其中
                    var url = "http://101.132.135.78/char/db/loadplayer.php?userId=" + self.userId;

                    window.xmlhttp = new XMLHttpRequest();
                    window.xmlhttp.onreadystatechange = function () {
                        if (window.xmlhttp.readyState == 4) {
                            if (window.xmlhttp.status == 200) {

                                if (window.xmlhttp.responseText == "") {
                                    self.signUp();
                                    return;
                                }

                                var responses = window.xmlhttp.responseText.split("<br />");
                                var item = responses[0].trim().split(",");

                                self.currentStageName = item[0];
                                self.currentIndex = item[1];
                                self.currentAnsweredIndexes = item[2];
                                self.currentScore = item[3];
                                self.startTime = item[4];
                                self.leftLife = item[5];
                                self.isGameWin = item[6];

                                if (self.currentIndex == "") {
                                    self.currentIndex = null;
                                }


                                if (self.currentIndex != null) {
                                    self.currentIndex = parseInt(self.currentIndex);
                                }
                                if (self.currentScore != null) {
                                    self.currentScore = parseInt(self.currentScore);
                                }
                                if (self.startTime != null) {
                                    self.startTime = parseFloat(self.startTime);
                                }
                                if (self.leftLife != null) {
                                    self.leftLife = parseInt(self.leftLife);
                                }

                                if (self.currentAnsweredIndexes != null && self.currentAnsweredIndexes != "") {
                                    self.currentIndexes = self.currentAnsweredIndexes.split("|");

                                    for (var i = 0; i < self.currentIndexes.length; i++) {
                                        self.currentIndexes[i] = parseInt(self.currentIndexes[i]);
                                    }
                                }

                                if (self.isGameWin == "true") {
                                    self.isGameWin = true;
                                }
                                else if (self.isGameWin == "false") {
                                    self.isGameWin = false;
                                }

                                self.rankManager.getComponent("RankManager").querySort();
                                self.isDataLoaded = true;

                                console.log("load successfully!");
                            }
                            else {
                                alert("Problem retrieveing XML data");
                            }
                        }
                    };
                    window.xmlhttp.open("GET", url, true);
                    window.xmlhttp.send(null);


                }
                else {
                    cc.log("getUserData error!");
                }
            }
        }
    },

    readCommonData: function () {
        var self = this;
        cc.loader.loadRes("Data/Common", function (err, csvText) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            else {
                var commonDataLines = csvText.trim().split('\n');

                for (var i = 1; i < commonDataLines.length; i++) {
                    if (i === 1) {
                        var lineString = commonDataLines[i].trim();
                        var lineArray = lineString.split(',');
                        self.gameHandler1.maxTime = lineArray[1];
                        self.gameHandler1.eachScore = lineArray[2];
                        self.gameHandler1.exceedScore = lineArray[3];
                    }
                    else if (i === 3) {
                        var lineString = commonDataLines[i].trim();
                        var lineArray = lineString.split(',');
                        self.gameHandler3.maxTime = lineArray[1];
                        self.gameHandler3.eachScore = lineArray[2];
                        self.gameHandler3.exceedScore = lineArray[3];
                    }
                }
            }
        });
    },

    readLevelData: function () {
        var self = this;
        cc.loader.loadRes("Data/LevelData", function (err, csvText) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            else {
                var commonDataLines = csvText.trim().split('\n');

                for (var i = 1; i < commonDataLines.length; i++) {

                    var lineString = commonDataLines[i].trim();
                    var lineArray = lineString.split(',');
                    if (lineArray[0] === "1") {
                        self.gameHandler1.selectContents.push(lineArray[1]);
                        self.gameHandler1.correctContents.push(lineArray[2]);
                        self.gameHandler1.animNames.push(lineArray[3]);
                        self.gameHandler1.hintContents.push(lineArray[4]);
                        self.gameHandler1.descContents.push(lineArray[5]);
                    }
                    else if (lineArray[0] === "3") {
                        self.gameHandler3.selectContents.push(lineArray[1]);
                        self.gameHandler3.correctContents.push(lineArray[2]);
                        self.gameHandler3.hintContents.push(lineArray[3]);
                        self.gameHandler3.descContents.push(lineArray[4]);
                        self.gameHandler3.descPosXs.push(lineArray[5]);
                        self.gameHandler3.descPosYs.push(lineArray[6]);
                        self.gameHandler3.descSizeWs.push(lineArray[7]);
                        self.gameHandler3.descSizeHs.push(lineArray[8]);
                        self.gameHandler3.goldSentences.push(lineArray[9]);
                        self.currentTotalNum++;
                    }
                }
            }
        });
    },
});

Array.prototype.remove = function (b) {
    var a = this.indexOf(b);
    if (a >= 0) {
        this.splice(a, 1);
        return true;
    }
    return false;
};

