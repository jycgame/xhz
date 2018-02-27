window.dropGenSpeedMin = 200;
window.dropGenSpeedMax = 300;


cc.Class({
    extends: cc.Component,

    properties: {
        dropRangeMin: 0.2,
        dropRangeMax: 0.8,
        dropGenRangeMin: 1,
        dropGenRangeMax: 3,
        dropGenSpeedMin: 50,
        dropGenSpeedMax: 60,

        nextTime: 2,
        timeElapse: 0,

        dropPrefab: {
            default: null,
            type: cc.Prefab,
        },

        seansonMan: {
            default: null,
            type: cc.Node,
        },

        gameManager: {
            default: null,
            type: cc.Node,
        },

        chunTotal: 0,
        xiaTotal: 0,
        qiuTotal: 0,
        dongTotal: 0,
        isPaused: false,

        chunColor: cc.Color,
        xiaColor: cc.Color,
        qiuColor: cc.Color,
        dongColor: cc.Color,

        chunJieqi: [],
        xiaJieqi: [],
        qiuJieqi: [],
        dongJieqi: [],

        chanceArrays: [],

        chunChance: null,
        xiaChance: null,
        qiuChance: null,
        dongChance: null,
    },

    isStart: null,

    reset: function () {
        this.chunTotal = 0;
        this.xiaTotal = 0;
        this.qiuTotal = 0;
        this.dongTotal = 0;
        this.chunTotal = 0;
        this.xiaTotal = 0;
        this.qiuTotal = 0;
        this.dongTotal = 0;
        this.resume();
        this.isPaused = true;

        var children = this.node.children;
        for (var i = 0; i < children.length; i++) {
            children[i].destroy();
        }
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
        cc.loader.loadRes("Data/Level2Data", function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
                return;
            } else {
                var lines = csvData.trim().split('\n');

                var line = lines[2];

                var contents = line.split(',');

                //
                self.dropRangeMin = parseFloat(contents[5].split(';')[0]);
                self.dropRangeMax = parseFloat(contents[5].split(';')[1]);

                self.dropGenRangeMin = parseFloat(contents[6].split(';')[0]);
                self.dropGenRangeMax = parseFloat(contents[6].split(';')[1]);

                self.dropGenSpeedMin = parseFloat(contents[7].split(';')[0]);
                self.dropGenSpeedMax = parseFloat(contents[7].split(';')[1]);

                for (var i = 4; i < lines.length; i++) {
                    line = lines[i];
                    contents = line.split(',');
                    self.chanceArrays[i - 4] = new Array();
                    for (var j = 0; j < contents.length; j++) {
                        self.chanceArrays[i - 4][j] = contents[j];
                    }
                }

                //window.dropGenSpeedMin = parseInt(contents[7].split(';')[0]);;
                //window.dropGenSpeedMax = parseInt(contents[7].split(';')[1]);

                self.isStart = true;
                self.isPaused = true;
            }
        });

        this.isPaused = true;

        this.chunColor = new cc.Color(72, 129, 126);
        this.xiaColor = new cc.Color(125, 78, 76);
        this.qiuColor = new cc.Color(125, 120, 76);
        this.dongColor = new cc.Color(76, 98, 125);

        this.chunJieqi.push("立春");
        this.chunJieqi.push("雨水");
        this.chunJieqi.push("惊蛰");
        this.chunJieqi.push("春分");
        this.chunJieqi.push("清明");
        this.chunJieqi.push("谷雨");

        this.xiaJieqi.push("立夏");
        this.xiaJieqi.push("小满");
        this.xiaJieqi.push("芒种");
        this.xiaJieqi.push("夏至");
        this.xiaJieqi.push("小暑");
        this.xiaJieqi.push("大暑");

        this.qiuJieqi.push("立秋");
        this.qiuJieqi.push("处暑");
        this.qiuJieqi.push("白露");
        this.qiuJieqi.push("秋分");
        this.qiuJieqi.push("寒露");
        this.qiuJieqi.push("霜降");

        this.dongJieqi.push("立冬");
        this.dongJieqi.push("小雪");
        this.dongJieqi.push("大雪");
        this.dongJieqi.push("冬至");
        this.dongJieqi.push("小寒");
        this.dongJieqi.push("大寒");
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

        if (this.isPaused) return;

        this.timeElapse += dt;

        this.nextTime = Math.random() * (this.dropGenRangeMax - this.dropGenRangeMin) + this.dropGenRangeMin;

        if (this.timeElapse >= this.nextTime) {

            var dropInstance = cc.instantiate(this.dropPrefab);
            dropInstance.parent = this.node;

            //生成drop的速度随机
            var speed = Math.random() * (this.dropGenSpeedMax - this.dropGenSpeedMin) + this.dropGenSpeedMin;
            //var speed = Math.random() * (window.dropGenSpeedMax - window.dropGenSpeedMin) + window.dropGenSpeedMin;
            // console.log("max: " + window.dropGenSpeedMax);
            // console.log("min: " + window.dropGenSpeedMin);
            // console.log("速度为:" + speed);

            //生成的x位置随机
            var seed = Math.random();
            if (seed <= this.dropRangeMin) seed = this.dropRangeMin;
            if (seed >= this.dropRangeMax) seed = this.dropRangeMax;

            var xpos = 1080 * seed;

            //设置该drop的速度和位置
            var dropScript = dropInstance.getComponent("Drop");

            dropScript.speed = speed;
            dropInstance.x = xpos;
            dropInstance.y = 1910;

            //设置雨滴的色彩
            var cuurentIndex = this.seansonMan.getComponent("SeasonManager").currentSeason;
            this.chunChance = parseFloat(this.chanceArrays[cuurentIndex][1]);
            this.xiaChance =  parseFloat(this.chanceArrays[cuurentIndex][2]);
            this.qiuChance =  parseFloat(this.chanceArrays[cuurentIndex][3]);
            this.dongChance = parseFloat(this.chanceArrays[cuurentIndex][4]);

            var s = null;
            var chance = Math.random();

            if (chance < this.chunChance) {
                s = 0;
            }
            else if (chance < this.chunChance + this.xiaChance) {
                s = 1;
            }
            else if (chance < this.chunChance + this.xiaChance + this.qiuChance) {
                s = 2;
            }
            else {
                s = 3;
            }

            //var s = Math.floor(Math.random() * 4);

            dropScript.typ = s;

            var seansonManager = this.seansonMan.getComponent("SeasonManager");
            var array = seansonManager.dropArray;

            var index = Math.round(Math.random() * 5);
            if (s == 0) {
                dropInstance.getComponent("cc.Sprite").spriteFrame = array[0];
                this.chunTotal += 1;
                dropScript.setColor(this.chunColor);
                dropScript.setLabel(this.chunJieqi[index]);
            } else if (s == 1) {
                dropInstance.getComponent("cc.Sprite").spriteFrame = array[1];
                this.xiaTotal += 1;
                dropScript.setColor(this.xiaColor);
                dropScript.setLabel(this.xiaJieqi[index]);
            } else if (s == 2) {
                dropInstance.getComponent("cc.Sprite").spriteFrame = array[2];
                this.qiuTotal += 1;
                dropScript.setColor(this.qiuColor);
                dropScript.setLabel(this.qiuJieqi[index]);
                dropScript.labelNode.color = new cc.Color(89, 37, 36);
            } else if (s == 3) {
                dropInstance.getComponent("cc.Sprite").spriteFrame = array[3];
                this.dongTotal += 1;
                dropScript.setColor(this.dongColor);
                dropScript.setLabel(this.dongJieqi[index]);
            }

            //下次生成的时间
            this.timeElapse = 0;
        }

    },
});
