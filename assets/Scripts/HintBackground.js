var TransitionBackground = require("TransitionBackground");

cc.Class({
    extends: cc.Component,

    properties:
    {
        transition: TransitionBackground,
    },

    showTransition() {
        this.transition.showTransitionNode(2);
        this.node.active = false;
    },
});
