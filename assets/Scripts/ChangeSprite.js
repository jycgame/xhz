cc.Class({
    extends: cc.Component,

    properties: {
        anim: cc.Animation,
        sprite: cc.Sprite,
        gameManagerNode: cc.Node,

        buttons: 
        {
            default: [],
            type: cc.Button,
        }
    },

    showTransition: function (spriteFrame)
    {
        this.node.active = true;
        this.sprite.spriteFrame = spriteFrame;
        this.anim.play();
    },

    goStage: function ()
    {
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].interactable = true;
        }
        this.gameManagerNode.getComponent("GameManager").gotoStage(true);
    },

    disableButton: function ()
    {
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].interactable = false;
        }
    }
});
