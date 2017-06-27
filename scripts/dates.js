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
    chrome.storage.sync.get("storeDates", function (items) {
        var y = items.storeDates[0].date;
        var m2=items.storeDates[0].month;
        if (y+7== d && m==m2) {
            chrome.storage.sync.set({
                "storeDates":datesRequested()
            });
        }
    });
};

function comparingDates(fn) {
    var currentDate = new Date();
    var j;
    chrome.storage.sync.get("storeDates", function comparing(items) {
        if (!chrome.runtime.error) {
            var arrayDates = items.storeDates;
            var j = arrayDates.findIndex(x => x.date == currentDate.getDate());
            console.log(j);
            fn(j);
        };
    });
};