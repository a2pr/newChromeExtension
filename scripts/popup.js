/*chrome.runtime.onInstalled.addListener(function (details) {
    if (details == "install") {
        chrome.storage.sync.set({
            "track": [0, 1, 2, 3]
        }, function () {});
        chrome.storage.sync.set({
            "goal": [0, 1, 2, 3]
        }, function () {});
    };
})*/
var checkingDates= function () {
    chrome.storage.sync.get("storeDates", function (items) {
       if (!items.storeDates) {
           chrome.storage.sync.set({"storeDates":  datesRequested()});
       };
    });
}
var updateTrack = function () {
    chrome.storage.sync.get("track", function (items) {
        if (!items.track) {
            chrome.storage.sync.set({"track":  [0,0,0,0]});
        };
        if (!chrome.runtime.error) {
            console.log(items.track);
            for (var i = 0; i < 4; i++) {
                document.getElementById("tableTrack").rows[1].cells[i].innerText = items.track[i];
            };
        };
    });
};

var updateGoal = function () {
    chrome.storage.sync.get("goal", function (items) {
        if (!items.goal) {
            chrome.storage.sync.set({"goal":  [0,0,0,0]});
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
}
window.onload = function () {
    //Recarga de datos goal  track actuales
    updateGoal();
    updateTrack();
    checkingDates();
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
        chrome.storage.sync.get("track", function (items) {
            var arrayChanging = items.track;
            if (items.track == "0") {
                arrayChanging.splice(i, 1, num);
                chrome.storage.sync.set({
                    "track": arrayChanging
                }, function () {
                    if (chrome.runtime.error) {
                        console.log("error");
                    }
                    updateTrack();
                });
            } else {
                var num2 = (+items.track[i]) + (+num);
                arrayChanging.splice(i, 1, num2);
                chrome.storage.sync.set({
                    "track": arrayChanging
                }, function () {
                    if (chrome.runtime.error) {
                        console.log("error");
                    }
                    updateTrack();
                });
            }
        });
    };
    //resetear datos de track
    document.getElementById("reset").onclick = function () {
        reset();
    };
    // abrir pagina options
    document.getElementById("options").onclick = function () {
        chrome.runtime.openOptionsPage();
    };
}