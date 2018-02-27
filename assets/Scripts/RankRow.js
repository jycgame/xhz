cc.Class({
    extends: cc.Component,

    properties: {
        rank:
        {
            default: null,
            type: cc.Node,
        },
        difference:
        {
            default: null,
            type: cc.Node,
        },
        difference2:
        {
            default: null,
            type: cc.Node,
        },
        userName:
        {
            default: null,
            type: cc.Node,
        },
        userScore:
        {
            default: null,
            type: cc.Node,
        },
        upSprite:
        {
            default: null,
            type: cc.SpriteFrame,
        },
        downSprite:
        {
            default: null,
            type: cc.SpriteFrame,
        },
        evenSprite:
        {
            default: null,
            type: cc.SpriteFrame,
        },
    },

    changeDifferSprite: function (isEven, isUp, differ) {

        this.difference.active = !isEven;
        this.difference2.active = isEven;

        if (!isEven) {
            var sprite = this.difference.getChildByName("UpDownSprite").getComponent(cc.Sprite);
            var differLabel = this.difference.getChildByName("Rank").getChildByName("RankLabel").getComponent(cc.Label);
            if (isUp) {
                sprite.spriteFrame = this.upSprite;
            }
            else {
                sprite.spriteFrame = this.downSprite;
            }
            differLabel.string = differ;
        }
    }
});
