cc.Class({
    extends: cc.Component,

    readPhraseData: function () {
        var self = this;
        cc.loader.loadRes("Data/PhraseData", function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
                return;
            } else {
                var phraseData = self.parse(csvData);
                self.phraseList = phraseData;
            }
        });
    },

    parse: function (csvText) {
        var dataArray = [];
        var lines = csvText.trim().split('\n');
        var rowDataCount = lines[0].split(',').length;
        for (var i = 0; i < lines.length; i++) {
            var lineString = lines[i].trim();
            var lineArray = lineString.split(',');
            dataArray[i] = lineArray;
        }
        return dataArray;
    }
});
