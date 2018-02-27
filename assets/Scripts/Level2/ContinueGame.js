cc.Class({
    extends: cc.Component,

    properties: {
        seasonManager: {
            default: null,
            type: cc.Node,
        },
        failPanel: {
            default: null,
            type: cc.Node,
        },
    },

    continue: function () {
        this.seasonManager.getComponent("SeasonManager").initiate();
        this.failPanel.active = false;
    },
});

