var opt = {
    type: "basic",
    title: "Congrats",
    message: "",
    iconUrl: "images/icon48.png"
}
var checkGoal = function () {
    chrome.storage.sync.get(["trackWeekJapV", "trackWeekJapK", "trackWeekJapR",
        "trackWeekPortV", "goal"
    ], function (items) {
        var sumTrack = [0, 0, 0, 0];
        for (var i = 0; i < items.trackWeekJapV.length; i++) {
            var a = parseInt(items.trackWeekJapV[i])
            sumTrack[0] += a;
        };
        for (var i = 0; i < items.trackWeekJapK.length; i++) {
            var a = parseInt(items.trackWeekJapK[i])
            sumTrack[1] += a;
        };
        for (var i = 0; i < items.trackWeekJapR.length; i++) {
            var a = parseInt(items.trackWeekJapR[i])
            sumTrack[2] += a;
        };
        for (var i = 0; i < items.trackWeekPortV.length; i++) {
            var a = parseInt(items.trackWeekPortV[i])
            sumTrack[3] += a;
        };
        if (items.goal[0] <= sumTrack[0]) {
            opt.message = "Japanese Vocab Review Goal Reached";
            chrome.notifications.create(opt);
        }
        else if (items.goal[1] <= sumTrack[1]) {
            opt.message = "Japanese Kanji Goal Reached";
            chrome.notifications.create(opt);
        } 
         else if (items.goal[2] <= sumTrack[2]) {
            opt.message = "Japanese  Weekly Review Goal Reached";
            chrome.notifications.create(opt);
        } else if (items.goal[3] <= sumTrack[3]) {
            opt.message = "Portuguese Weekly Review Goal Reached";
            chrome.notifications.create(opt);
        } 
         
    });
}