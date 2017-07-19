var checkingDates = function () { //tomando valores de date.js 
    chrome.storage.sync.get("storeDates", function (items) {
        if (!items.storeDates) {
            chrome.storage.sync.set({
                "storeDates": datesRequested()
            });
        };
        if (!chrome.runtime.error) {
            for (var i = 1; i < 8; i++) {
                var a = items.storeDates[i - 1].date;
                var b = items.storeDates[i - 1].month + 1;
                var c = items.storeDates[i - 1].year;
                document.getElementById("weekTrackTable").rows[0].cells[i].innerText = a + "/" + b + "/" + c;
            }
        }
    });
};
var updateTrack = function () {
    chrome.storage.sync.get("track", function (items) {
        if (!items.track) {
            chrome.storage.sync.set({
                "track": [0, 0, 0, 0]
            });
        };
        if (!chrome.runtime.error) {
            for (var i = 0; i < 4; i++) {
                document.getElementById("tableTrack").rows[1].cells[i].innerText = items.track[i];
            };
        };
    });
};
var updateWeeklyTrack = function () {
    chrome.storage.sync.get(["trackWeekJapV", "trackWeekJapK", "trackWeekJapR",
        "trackWeekPortV"
    ], function (items) {
        if (!items.trackWeekJapV && !items.trackWeekJapK && !items.trackWeekJapR && !items.trackWeekPortV) {
            chrome.storage.sync.set({
                "trackWeekJapV": [0, 0, 0, 0, 0, 0, 0],
                "trackWeekJapK": [0, 0, 0, 0, 0, 0, 0],
                "trackWeekJapR": [0, 0, 0, 0, 0, 0, 0],
                "trackWeekPortV": [0, 0, 0, 0, 0, 0, 0]
            });
        };
        if (!chrome.runtime.error) {
            for (var j = 1; j < 5; j++) { //seleccionando fila
                switch (j) {
                    case 1:
                        for (var i = 1; i < 8; i++) {
                            document.getElementById("weekTrackTable").rows[j].cells[i].innerText = items.trackWeekJapV[i - 1];
                        };
                        break;
                    case 2:
                        for (var i = 1; i < 8; i++) {
                            document.getElementById("weekTrackTable").rows[j].cells[i].innerText = items.trackWeekJapK[i - 1];
                        };
                        break;
                    case 3:
                        for (var i = 1; i < 8; i++) {
                            document.getElementById("weekTrackTable").rows[j].cells[i].innerText = items.trackWeekJapR[i - 1];
                        };
                        break;
                    case 4:
                        for (var i = 1; i < 8; i++) {
                            document.getElementById("weekTrackTable").rows[j].cells[i].innerText = items.trackWeekPortV[i - 1];
                        };
                        break;
                }
            };

        };
    });
};
var updateGoal = function () {
    chrome.storage.sync.get("goal", function (items) {
        if (!items.goal) {
            chrome.storage.sync.set({
                "goal": [0, 0, 0, 0]
            });
        };
        if (!chrome.runtime.error) {
            console.log(items.goal);
            for (var i = 0; i < 4; i++) {
                document.getElementById("tableGoal").rows[1].cells[i].innerText = items.goal[i];
            };
        };
    });
}
var reset = function () { //borra datos de data
    chrome.storage.sync.set({
        "track": [0, 0, 0, 0]
    });
    updateTrack();
};
var catSelected = function (cat) {
    switch (cat) {
        case "JapV":
            i = 0;
            break;
        case "JapK":
            i = 1;
            break;
        case "JapR":
            i = 2;
            break;
        case "PortV":
            i = 3;
            break;
        default:
            break;
    };
    return i;
};
var categoryClick = function (param) {
    var d = param.innerText;
    document.getElementById("categoryMarked").innerText = "Category selected:" + "\n";
    document.getElementById("categorySelected").innerText = d;

};
var removeAll = function (param) {
    while (first_child(param)) { //elimina elementos de contenedor
        param.removeChild(first_child(param));
    }
};
var removeCatSelec = function (params) {
    var d = document.getElementById("categorySelection").children;
    for (var i = 0; i < 2; i++) {
        d[i].innerText = "";
    }
}
var goBackEntry = function (param) { //agrega opcion de go back
    var f = document.createElement("button");
    f.innerHTML = "Select another category";
    f.id = "CategoryGoback";
    f.setAttribute("type", "submit");
    f.addEventListener("click", function () {
        removeAll(this.parentElement);
        removeCatSelec(this);
        addCategories(param);
    });
    param.appendChild(f);
};
var addCategories = function (param) {
    for (var i = 0; i < 9; i++) {
        var d;
        if (i == 0) {
            d = document.createElement("label");
            d.innerText = "Set track category:";
        } else if (i == 1 || i == 4 || i > 6) {
            d = document.createElement("br");
        } else {
            if (i == 2 || i == 3 || i > 4 && i < 7) {}
            d = document.createElement("button");
            d.setAttribute("type", "submit");
            switch (i) {
                case 2:
                    d.id = "JapVCategory";
                    d.innerText = "JapV";
                    d.addEventListener("click", function () {
                        categoryClick(this);
                        var b = param;
                        removeAll(param);
                        goBackEntry(b);
                    });
                    break;
                case 3:
                    d.id = "JapKCategory";
                    d.innerText = "JapK";
                    d.addEventListener("click", function () {
                        categoryClick(this);
                        var b = param;
                        removeAll(param);
                        goBackEntry(b);
                    });
                    break;
                case 5:
                    d.id = "JapRCategory";
                    d.innerText = "JapR";
                    d.addEventListener("click", function () {
                        categoryClick(this);
                        var b = param;
                        removeAll(param);
                        goBackEntry(b);
                    });
                    break;
                case 6:
                    d.id = "PortVCategory";
                    d.innerText = "PortV";
                    d.addEventListener("click", function () {
                        categoryClick(this);
                        var b = param;
                        removeAll(param);
                        goBackEntry(b);
                    });
                    break;
            };
        }
        param.appendChild(d);
    }
};
var submit = function (newValue, cat) {
    var currentDay;
    comparingDates(function (l1) {
        if (!l1) {
            console.log("error");
        } else {
            currentDay = l1;
            console.log("succes");
        };

    });
    switch (cat) {
        case 0:
            chrome.storage.sync.get(["track", "trackWeekJapV"], function (items) {
                var arrayChangingDaily = items.track;
                var arrayChangingWeekly = items.trackWeekJapV;
                if (items.track[cat] == "0") { //daily
                    arrayChangingDaily.splice(cat, 1, newValue);
                    chrome.storage.sync.set({
                        "track": arrayChangingDaily
                    });
                    if (items.trackWeekJapV[currentDay] == "0") { //weekly
                        arrayChangingWeekly.splice(currentDay, 1, newValue);
                        chrome.storage.sync.set({
                            "trackWeekJapV": arrayChangingWeekly
                        });
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal();
                    } else if (items.trackWeekJapV[currentDay]) {
                        var num1 = (+items.trackWeekJapV[currentDay]) + (+newValue);
                        arrayChangingWeekly.splice(currentDay, 1, num1);
                        chrome.storage.sync.set({
                            "trackWeekJapV": arrayChangingWeekly
                        });
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal();
                    };
                } else { //daily
                    var num2 = (+items.track[cat]) + (+newValue);
                    arrayChangingDaily.splice(cat, 1, num2);
                    chrome.storage.sync.set({
                        "track": arrayChangingDaily
                    });
                    if (items.trackWeekJapV[currentDay] == "0") { //weekly
                        arrayChangingWeekly.splice(currentDay, 1, newValue);
                        chrome.storage.sync.set({
                            "trackWeekJapV": arrayChangingWeekly
                        });
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal();
                    } else if (items.trackWeekJapV[currentDay]) {
                        var num1 = (+items.trackWeekJapV[currentDay]) + (+newValue);
                        arrayChangingWeekly.splice(currentDay, 1, num1);
                        chrome.storage.sync.set({
                            "trackWeekJapV": arrayChangingWeekly
                        });
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal();
                    };
                };

            });
            break;
        case 1:
            chrome.storage.sync.get(["track", "trackWeekJapK"], function (items) {
                var arrayChangingDaily = items.track;
                var arrayChangingWeekly = items.trackWeekJapK;
                if (items.track[cat] == "0") { //daily
                    arrayChangingDaily.splice(cat, 1, newValue);
                    chrome.storage.sync.set({
                        "track": arrayChangingDaily
                    });
                    if (items.trackWeekJapK[currentDay] == "0") { //weekly
                        arrayChangingWeekly.splice(currentDay, 1, newValue);
                        chrome.storage.sync.set({
                            "trackWeekJapK": arrayChangingWeekly
                        });
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal();
                    } else if (items.trackWeekJapK[currentDay]) {
                        var num1 = (+items.trackWeekJapK[currentDay]) + (+newValue);
                        arrayChangingWeekly.splice(currentDay, 1, num1);
                        chrome.storage.sync.set({
                            "trackWeekJapK": arrayChangingWeekly
                        });
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal();
                    };
                } else { //daily
                    var num2 = (+items.track[cat]) + (+newValue);
                    arrayChangingDaily.splice(cat, 1, num2);
                    chrome.storage.sync.set({
                        "track": arrayChangingDaily
                    });
                    if (items.trackWeekJapK[currentDay] == "0") { //weekly
                        arrayChangingWeekly.splice(currentDay, 1, newValue);
                        chrome.storage.sync.set({
                            "trackWeekJapK": arrayChangingWeekly
                        });
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal();
                    } else if (items.trackWeekJapK[currentDay]) {
                        var num1 = (+items.trackWeekJapK[currentDay]) + (+newValue);
                        arrayChangingWeekly.splice(currentDay, 1, num1);
                        chrome.storage.sync.set({
                            "trackWeekJapK": arrayChangingWeekly
                        });
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal();
                    };
                };

            });
            break;
        case 2:
            chrome.storage.sync.get(["track", "trackWeekJapR"], function (items) {
                var arrayChangingDaily = items.track;
                var arrayChangingWeekly = items.trackWeekJapR;
                if (items.track[cat] == "0") { //daily
                    arrayChangingDaily.splice(cat, 1, newValue);
                    chrome.storage.sync.set({
                        "track": arrayChangingDaily
                    });
                    if (items.trackWeekJapR[currentDay] == "0") { //weekly
                        arrayChangingWeekly.splice(currentDay, 1, newValue);
                        chrome.storage.sync.set({
                            "trackWeekJapR": arrayChangingWeekly
                        });
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal();
                    } else if (items.trackWeekJapR[currentDay]) {
                        var num1 = (+items.trackWeekJapR[currentDay]) + (+newValue);
                        arrayChangingWeekly.splice(currentDay, 1, num1);
                        chrome.storage.sync.set({
                            "trackWeekJapR": arrayChangingWeekly
                        });
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal(); //
                    };
                } else { //daily
                    var num2 = (+items.track[cat]) + (+newValue);
                    arrayChangingDaily.splice(cat, 1, num2);
                    chrome.storage.sync.set({
                        "track": arrayChangingDaily
                    });
                    if (items.trackWeekJapR[currentDay] == "0") { //weekly
                        arrayChangingWeekly.splice(currentDay, 1, newValue);
                        chrome.storage.sync.set({
                            "trackWeekJapR": arrayChangingWeekly
                        });
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal();
                    } else if (items.trackWeekJapR[currentDay]) {
                        var num1 = (+items.trackWeekJapR[currentDay]) + (+newValue);
                        arrayChangingWeekly.splice(currentDay, 1, num1);
                        chrome.storage.sync.set({
                            "trackWeekJapR": arrayChangingWeekly
                        });
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal();
                    };
                };

            });
            break;
        case 3:
            chrome.storage.sync.get(["track", "trackWeekPortV"], function (items) {
                var arrayChangingDaily = items.track;
                var arrayChangingWeekly = items.trackWeekPortV;
                if (items.track[cat] == "0") { //daily
                    arrayChangingDaily.splice(cat, 1, newValue);
                    chrome.storage.sync.set({
                        "track": arrayChangingDaily
                    });
                    if (items.trackWeekPortV[currentDay] == "0") { //weekly
                        arrayChangingWeekly.splice(currentDay, 1, newValue);
                        chrome.storage.sync.set({
                            "trackWeekPortV": arrayChangingWeekly
                        });
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal();
                    } else if (items.trackWeekPortV[currentDay]) {
                        var num1 = (+items.trackWeekPortV[currentDay]) + (+newValue);
                        arrayChangingWeekly.splice(currentDay, 1, num1);
                        chrome.storage.sync.set({
                            "trackWeekPortV": arrayChangingWeekly
                        }); //
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal();
                    };
                } else { //daily
                    var num2 = (+items.track[cat]) + (+newValue);
                    arrayChangingDaily.splice(cat, 1, num2);
                    chrome.storage.sync.set({
                        "track": arrayChangingDaily
                    });
                    if (items.trackWeekPortV[currentDay] == "0") { //weekly
                        arrayChangingWeekly.splice(currentDay, 1, newValue);
                        chrome.storage.sync.set({
                            "trackWeekPortV": arrayChangingWeekly
                        });
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal();
                    } else if (items.trackWeekPortV[currentDay]) {
                        var num1 = (+items.trackWeekPortV[currentDay]) + (+newValue);
                        arrayChangingWeekly.splice(currentDay, 1, num1);
                        chrome.storage.sync.set({
                            "trackWeekPortV": arrayChangingWeekly
                        });
                        updateTrack();
                        updateWeeklyTrack();
                        checkGoal();
                    };
                };

            });
            break;
    };

}
window.onload = function () {
    //Recarga de datos goal, TrackWeek, track actuales
    updateGoal();
    datesUpdate();
    updateTrack();
    checkingDates();
    updateWeeklyTrack();
    //Seleccion de categoria
    document.getElementById("JapVCategory").onclick = function () {
        categoryClick(this);
        var b = this.parentElement;
        removeAll(this.parentElement);
        goBackEntry(b);
    };
    document.getElementById("JapKCategory").onclick = function () {
        categoryClick(this);
        var b = this.parentElement;
        removeAll(this.parentElement);
        goBackEntry(b);
    };
    document.getElementById("JapRCategory").onclick = function () {
        categoryClick(this);
        var b = this.parentElement;
        removeAll(this.parentElement);
        goBackEntry(b);
    };
    document.getElementById("PortVCategory").onclick = function () {
        categoryClick(this);
        var b = this.parentElement;
        removeAll(this.parentElement);
        goBackEntry(b);
    };
    //Ingresar nuevo track
    document.getElementById("tracking").onclick = function () {
        var cat = document.getElementById("categorySelected").innerText;
        catSelected(cat);
        var num = document.getElementById("track").value; //obtiene valor de input
        clearInput(0); //borra valor de input
        submit(num, i);
        updateTrack();
        updateWeeklyTrack();
    }
    //resetear datos de track
    document.getElementById("reset").onclick = function () {
        reset();
    };
    // abrir pagina options
    document.getElementById("options").onclick = function () {
        chrome.runtime.openOptionsPage();
    };
};