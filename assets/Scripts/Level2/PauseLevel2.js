cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        isPause: false,

        continueButton: {
            default: null,
            type: cc.Node
        },

        exitButton: {
            default: null,
            type: cc.Node,
        },

        mask: {
            default: null,
            type: cc.Node,
        },

        heroNode: {
            default: null,
            type: cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {

            this.continueButton.active = false;
            this.exitButton.active = false;
            this.mask.active = false;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    onPause: function () {
        if (this.isPause) {
            cc.director.resume();
            this.isPause = false;

            this.continueButton.active = false;
            this.exitButton.active = false;
            this.mask.active = false;
            this.node.active = true;
        }
        else {
            cc.director.pause();

            this.continueButton.active = true;
            this.exitButton.active = true;
            this.mask.active = true;

            this.isPause = true;

            this.node.active = false;
        }
    },

    reset: function () {
        cc.director.loadScene("Main");
    },

});
