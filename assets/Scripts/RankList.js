cc.Class({
    extends: cc.Component,

    properties: {
        ranks:
        {
            default: [],
            type: [cc.Node],
        },
    },

    setItem: function (index, rank, lastRank, name, score) {
        var rankRow = this.ranks[index].getComponent("RankRow");

        for (var i = 0; i < rankRow.rank.children.length; i++) {
            if (rank > 999)
            {
                rankRow.rank.children[i].getComponent(cc.Label).string = "999+";
            }
            else
            {
                if (rankRow.rank.children[i].getComponent(cc.Label) != null)
                {
                    rankRow.rank.children[i].getComponent(cc.Label).string = rank;
                }
            }
        }

        var differLabelParent = rankRow.difference.children[1];
        var differValue = parseInt(lastRank) - parseInt(rank);
        if (differValue === 0 || parseInt(lastRank) === 0) {
            rankRow.changeDifferSprite(true, false, Math.abs(differValue));
        }
        else if (differValue > 0) {
            rankRow.changeDifferSprite(false, true, Math.abs(differValue));
        }
        else if (differValue < 0) {
            rankRow.changeDifferSprite(false, false, Math.abs(differValue));
        }


        for (var i = 0; i < rankRow.userName.children.length; i++) {
            var label = rankRow.userName.children[i].getComponent(cc.Label);
            label.string = name;
        }

        for (var i = 0; i < rankRow.userScore.children.length; i++) {
            rankRow.userScore.children[i].getComponent(cc.Label).string = score;
        }
    },
});
