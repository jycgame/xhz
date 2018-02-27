window.xmlhttp = null;

cc.Class({
    extends: cc.Component,

    properties: {
        scoreInput: {
            default: null,
            type: cc.EditBox,
        },
        rankList: {
            default: null,
            type: cc.Node,
        },
        gameManager:
        {
            default: null,
            type: cc.Node,
        },
        rankLabels:
        {
            default: [],
            type: cc.Label,
        },

        splitChar: "<br />",
        id: "",
    },

    // use this for initialization
    onLoad: function () {
    },

    //initial: function () {
    //    this.id = this.uuidManager.getGuid();
    //    var url = "http://101.132.70.210/zcxs/queryindex.php?uuid=" + this.id;
    //    var self = this;

    //    window.xmlhttp = new XMLHttpRequest();
    //    window.xmlhttp.onreadystatechange = function () {
    //        if (window.xmlhttp.readyState == 4) {
    //            if (window.xmlhttp.status == 200) {
    //                //alert("Get rank success");
    //                var responses = window.xmlhttp.responseText.split(self.splitChar);
    //                var item = responses[0].split(",");

    //                //item 0 ��Ӧ���Σ� item 1 ��Ӧ������ ��ͬ����һ��item
    //                var responseRank = item[0];
    //                var responseHighScore = item[1];
    //                var lastRank = item[2];

    //                var rankListComponent = self.rankList.getComponent("RankList");
    //                //��ʾ�Լ�������
    //                rankListComponent.setItem(5, responseRank, lastRank, self.id.substr(0,14), responseHighScore);

    //                self.showAllRank();
    //            }
    //            else {
    //                alert("Problem retrieveing XML data");
    //            }
    //        }
    //    };
    //    window.xmlhttp.open("GET", url, true);
    //    window.xmlhttp.send(null);
    //},

    //signUp: function () {
    //    this.uuidManager.createGuid();

    //    this.id = this.uuidManager.getGuid();

    //    var url = "http://101.132.70.210/zcxs/register.php?uuid=" + this.id;

    //    window.xmlhttp = new XMLHttpRequest();
    //    window.xmlhttp.onreadystatechange = function () {
    //        if (window.xmlhttp.readyState == 4) {
    //            if (window.xmlhttp.status == 200) {
    //                console.log("Sign Up Success");
    //                //alert("Sign Up Success");
    //            }
    //            else {
    //                alert("Problem retrieveing XML data");
    //            }
    //        }
    //    };
    //    window.xmlhttp.open("GET", url, true);
    //    window.xmlhttp.send(null);
    //},

    querySort: function () {
        var gameMana = this.gameManager.getComponent("GameManager");
        var url = "http://101.132.135.78/char/db/querysort.php?userId=" + gameMana.userId + "&count=5";

        var self = this;

        window.xmlhttp = new XMLHttpRequest();
        window.xmlhttp.onreadystatechange = function () {
            if (window.xmlhttp.readyState == 4) {
                if (window.xmlhttp.status == 200) {
                    var rankListComponent = self.rankList.getComponent("RankList");
                    var responses = window.xmlhttp.responseText.trim().split("<br />");

                    //һ��ʼû������ʱ���ص��ǻس������ţ�����
                    for (var i = 0; i < responses.length; i++) {
                        var str = responses[i];
                        if (str.trim().substr(0,1) == ",") {
                            responses.remove(responses[i]);
                        }
                    }

                    for (var i = 0; i < responses.length - 1; i++) {
                        var item = responses[i].split(",");

                        var userName = item[3];
                        userName = userName.trim();
                        userName = userName.substr(0, 14);
                        var userHighscore = item[1];
                        var lastRank = item[2];

                        rankListComponent.setItem(i, i + 1 + ".", lastRank, userName, userHighscore);
                    }

                    //��ȡ�û��������Ϣ��item[4]���������
                    var item = responses[responses.length - 1].split(",");
                    var userName = item[4];
                    userName = userName.trim();
                    userName = userName.substr(0, 14);
                    var userHighscore = item[1];
                    var lastRank = item[2];
                    var cuurentRank = item[3];
                    rankListComponent.setItem(5, cuurentRank, lastRank, userName, userHighscore);
                }
                else {
                    alert("Problem retrieveing XML data");
                }
            }
        };
        window.xmlhttp.open("GET", url, true);
        window.xmlhttp.send(null);
    },

    querySelf: function () {
        var gameMana = this.gameManager.getComponent("GameManager");
        var url = "http://101.132.135.78/char/db/querysort.php?userId=" + gameMana.userId + "&count=5";

        var self = this;

        window.xmlhttp = new XMLHttpRequest();
        window.xmlhttp.onreadystatechange = function () {
            if (window.xmlhttp.readyState == 4) {
                if (window.xmlhttp.status == 200) {
                    var rankListComponent = self.rankList.getComponent("RankList");
                    var responses = window.xmlhttp.responseText.trim().split("<br />");

                    if (responses == "user info saved") {
                        return;
                    }
                    //��ȡ�û��������Ϣ��item[4]���������
                    var item = responses[responses.length - 1].split(",");
                    var currentRank = item[3];
                    for (var i = 0; i < self.rankLabels.length; i++) {
                        self.rankLabels[i].string = currentRank.toString();
                    }
                    console.log("query self succees!");
                }
                else {
                    alert("Problem retrieveing XML data");
                }
            }
        };
        window.xmlhttp.open("GET", url, false);
        window.xmlhttp.send(null);

    },

    //showUserRank: function () {
    //    this.id = this.uuidManager.getGuid();
    //    var url = "http://101.132.70.210/zcxs/queryindex.php?uuid=" + this.id;
    //    var self = this;

    //    window.xmlhttp = new XMLHttpRequest();
    //    window.xmlhttp.onreadystatechange = function () {
    //        if (window.xmlhttp.readyState == 4) {
    //            if (window.xmlhttp.status == 200) {
    //                //alert("Get rank success");
    //                var responses = window.xmlhttp.responseText.split(self.splitChar);
    //                var item = responses[0].split(",");

    //                //item 0 ��Ӧ���Σ� item 1 ��Ӧ������ ��ͬ����һ��item
    //                var responseRank = item[0];
    //                var responseHighScore = item[1];
    //                var lastRank = item[2];

    //                var rankListComponent = self.rankList.getComponent("RankList");
    //                //��ʾ�Լ�������
    //                rankListComponent.setItem(5, responseRank, lastRank, self.id.substr(0, 14), responseHighScore);
    //            }
    //            else {
    //                alert("Problem retrieveing XML data");
    //            }
    //        }
    //    };
    //    window.xmlhttp.open("GET", url, true);
    //    window.xmlhttp.send(null);
    //},

    //showAllRank: function () {
    //    this.id = this.uuidManager.getGuid();
    //    var url = "http://101.132.70.210/zcxs/querysort.php?count=5";
    //    var self = this;

    //    window.xmlhttp = new XMLHttpRequest();
    //    window.xmlhttp.onreadystatechange = function () {
    //        if (window.xmlhttp.readyState == 4) {
    //            if (window.xmlhttp.status == 200) {
    //                //alert("Get all rank success");
    //                var responses = window.xmlhttp.responseText.split(self.splitChar);
    //                for (var i = 0; i < responses.length; i++) {
    //                    var item = responses[i].split(",");

    //                    var responseUuid = item[0];
    //                    responseUuid = responseUuid.split("\n")[responseUuid.split("\n").length - 1];
    //                    responseUuid = responseUuid.trim();
    //                    responseUuid = responseUuid.substr(0, 14);
    //                    var responseHighScore = item[1];
    //                    var lastRank = item[3];

    //                    var rankListComponent = self.rankList.getComponent("RankList");
    //                    rankListComponent.setItem(i, i + 1 + ".", lastRank, responseUuid, responseHighScore);
    //                }
    //            }
    //            else {
    //                alert("Problem retrieveing XML data");
    //            }
    //        }
    //    };
    //    window.xmlhttp.open("GET", url, true);
    //    window.xmlhttp.send(null);
    //},
});