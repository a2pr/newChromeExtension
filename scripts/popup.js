var updateTrack = function () {
    chrome.storage.sync.get("track", function (items) {
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
var removeAll =  function (param) {
        while (first_child(param)) {
            param.removeChild(first_child(param));
        }
    };
var goBackEntry= function (param) {
    var f= document.createElement("button");
    f.innerHTML="Select another category";
    f.id="CategoryGoback";
    f.setAttribute("type","submit");
    f.addEventListener("click",removeAll);
    param.appendChild(f);
};
window.onload = function () {

    updateGoal();
    updateTrack();
 
    document.getElementById("JapVCategory").onclick = function () {
        categoryClick(this);
        var b=this.parentElement;
        removeAll(this.parentElement);
        goBackEntry(b);
    };
    document.getElementById("JapKCategory").onclick = function () {
        categoryClick(this);
        var b=this.parentElement;
        removeAll(this.parentElement);
        goBackEntry(b);
    };
    document.getElementById("JapRCategory").onclick = function () {
        categoryClick(this);
        var b=this.parentElement;
        removeAll(this.parentElement);
        goBackEntry(b);
    };
    document.getElementById("PortVCategory").onclick = function () {
        categoryClick(this);
        var b=this.parentElement;
        removeAll(this.parentElement);
        goBackEntry(b);
    }; //seleccion de categoria
    document.getElementById("tracking").onclick = function () {
        var cat = document.getElementById("categorySelected").innerText;
        catSelected(cat);
        var num = document.getElementById("track").value; //obtiene valor de input
        document.getElementById("track").value = ""; //borra valor de input
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
                catSelected();
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
    }
    document.getElementById("reset").onclick = function () {
        reset();
    }
    document.getElementById("options").onclick = function () {
        chrome.runtime.openOptionsPage();
    }
}