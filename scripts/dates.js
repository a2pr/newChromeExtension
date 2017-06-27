function datesRequested() {
    var arrayDates = ["", "", "", "", "", "", ""];
    var x = new Date();
    var d = x.getDate();
    var m = x.getMonth();
    var Y = x.getFullYear();
    var y = x.getDate() + 7;
    var m2 = x.getMonth();
    var i;

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