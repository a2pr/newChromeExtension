var opt = {
    type: "basic",
    title: "Congrats",
    message: "",
    iconUrl: "images/icon48.png"
}
var counterCheck = function () {
    chrome.storage.sync.get("counter", function (items) {
        if (!items.counter) {
            chrome.storage.sync.set({
                "counter": [0, 0, 0, 0]
            });
        };

    });
};
var checkGoal = function () {
    counterCheck();
    chrome.storage.sync.get(["trackWeekJapV", "trackWeekJapK", "trackWeekJapR",
        "trackWeekPortV", "goal", "counter"
    ], function (items) {
        var counter = items.counter;
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
        if (!items.goal[0]==0 && items.goal[0] <= sumTrack[0] && items.counter[0] == 0) {
            opt.message = "Japanese Vocab Review Goal Reached";
            chrome.notifications.create(opt);
            counter.splice(0, 1, 1);
            chrome.storage.sync.set({
                "counter": counter
            });
        } else if (!items.goal[1]==0 && items.goal[1] <= sumTrack[1] && items.counter[0] == 0) {
            opt.message = "Japanese Kanji Goal Reached";
            chrome.notifications.create(opt);
            counter.splice(1, 1, 1);
            chrome.storage.sync.set({
                "counter": counter
            })
        } else if (!items.goal[2]==0 && items.goal[2] <= sumTrack[2] && items.counter[2] == 0) {
            opt.message = "Japanese  Weekly Review Goal Reached";
            chrome.notifications.create(opt);
            counter.splice(2, 1, 1);
            chrome.storage.sync.set({
                "counter": counter
            })
        } else if (!items.goal[3]==0 && items.goal[3] <= sumTrack[3] && items.counter[3] == 0) {
            opt.message = "Portuguese Weekly Review Goal Reached";
            chrome.notifications.create(opt);
            counter.splice(3, 1, 1);
            chrome.storage.sync.set({
                "counter": counter
            })
        }
        var b;
            for (var i = 0; i < items.goal.length; i++) {
                if (!items.goal[0]==0) {
                    b++
                }
            };
        for (var i = 0; i < items.counter.length; i++) {
            var a;
            a += items.counter[i];
            if (a == b) {
                chrome.storage.sync.set({"counter":[0,0,0,0]});
            };
        };
    });
}