function checkingPlusDate(m, y, m2) {
    while (m < 7) {
        if (m % 2 == 0) {
            var maxDates = 31;
            var maxDates = 31;
            break;
        } else if (m % 2 == 1) {
            switch (m) {
                case 1:
                    var maxDates = 28;
                    break;
                case 3:
                    var maxDates = 30;

                    break;
                case 5:
                    var maxDates = 30;

                    break;
            };

            break;
        }
    };
    while (m >= 7 && m < 12) {
        if (m % 2 == 0) {

            switch (m) {
                case 8:
                    var maxDates = 30;

                    break;
                case 10:
                    var maxDates = 30;

                    break;
            };
            break;
        } else if (m % 2 == 1) {

            var maxDates = 31;

            break;
        }
    };
    if (y > maxDates) {
        var c = y - maxDates;
        y = c;
        if (m2 == 11) {
            m2 = 0;
        } else {
            m2++;
        }

    };
    var returnObject = {};
    returnObject["date"] = y;
    returnObject["month"] = m2;
    returnObject["maxDate"] = maxDates;
    return returnObject;
};

function datesRequested() {
    var arrayDates = ["", "", "", "", "", "", ""];
    var x = new Date();
    var d = x.getDate();
    var m = x.getMonth();
    var Y = x.getFullYear();
    var y = x.getDate() + 7;
    var m2 = x.getMonth();
    var i;
    var returnValues = checkingPlusDate(m, y, m2);
    y = returnValues.date;
    m2 = returnValues.month;
    var maxDates = returnValues.maxDate
    for (var i = 0; d != y; i++) {
        arrayDates[i] = {
            "date": d,
            "month": m,
            "year": Y
        };

        d++;
        if (d > maxDates) {
            d = 1;
            m++;
            if (m == 12) {
                m = 0;
            };

        };
    };
    return arrayDates
};

function datesUpdate() {
    var x = new Date();
    var d = x.getDate();
    var Y = x.getFullYear();
    var m = x.getMonth();

    function dateChange() {
        chrome.storage.sync.set({
            "storeDates": datesRequested()
        });
        chrome.storage.sync.get(["trackWeekJapV", "trackWeekJapK", "trackWeekJapR",
            "trackWeekPortV"
        ], function (items) {
            chrome.storage.sync.set({
                "trackWeekJapV": [0, 0, 0, 0, 0, 0, 0],
                "trackWeekJapK": [0, 0, 0, 0, 0, 0, 0],
                "trackWeekJapR": [0, 0, 0, 0, 0, 0, 0],
                "trackWeekPortV": [0, 0, 0, 0, 0, 0, 0]
            });
        });
    };

    chrome.storage.sync.get("storeDates", function (items) {
        var y = items.storeDates[0].date;
        var y2 = items.storeDates[6].date;
        var m2 = items.storeDates[0].month;
        var m3 = items.storeDates[6].month;
        if (m2 == m & m == m3) {
            if (y < d && d < y2) {
                console.log("in between");
            }
            else if (d < y) {
                console.log("behind");
                dateChange();
            } else if (d==y) {
                console.log("in the left border");
            }
            else if (d==y2) {
                 console.log("in the right border");
            }
            else if (y2 < d) {
                console.log("infront");
                dateChange();
            }
            
        } else if (m2 == m | m == m3) {
            if (m3 != m) {
                if (y < d) {
                    console.log("in between");
                } else if (y == d) {
                    console.log("in the left border");
                } else {
                    dateChange();
                }
            } else if (m2 != m) {
                if (d < y2) {
                    console.log("in between");
                } else if (d == y2) {
                    console.log("in the right border");
                } else {
                    dateChange();
                }
            }
        }
    });
};

function comparingDates(fn) {
    var currentDate = new Date();
    var j;
    chrome.storage.sync.get("storeDates", function comparing(items) {
        if (!chrome.runtime.error) {
            var arrayDates = items.storeDates;
            j = arrayDates.findIndex(x => x.date == currentDate.getDate());
            console.log(j);
            fn(j);
        };
    });
};

function name(params) {

}