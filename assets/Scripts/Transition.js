var TransitionBackground = require("TransitionBackground");

cc.Class({
    extends: cc.Component,

    properties: {
        transitionNode:
        {
            default: [],
            type: cc.Node,
        },

        transition: TransitionBackground,

        transitionTime: 2,
        startIndex: -1,
        isPlaying: false,
        isEnd: false,
        ratio: 0,

        currentTime: 0,
    },

    update: function (dt) {

        if (!this.isPlaying && this.startIndex < this.transitionNode.length) {
            this.isPlaying = true;
            this.ratio = 0;
            this.startIndex++;
        }

        this.ratio += 1 / this.transitionTime * dt;

        if (this.startIndex < this.transitionNode.length && this.ratio<1) {
            this.transitionNode[this.startIndex].opacity = cc.lerp(0, 255, this.ratio);
        }

        if (this.ratio >= 1) {
            this.isPlaying = false;
        }

        if (this.startIndex >= this.transitionNode.length)
        {
            this.currentTime += dt;
            if (this.currentTime >= this.transitionTime)
            {
                this.node.active = false;
                if (this.transition.gameManager.currentStageName == "Game3" && !this.transition.gameManager.isGameWin)
                {
                    this.transition.showSuccessPanel();
                }
                else
                {
                    this.transition.showWinBackground();
                }
            }
        }
    },
});
