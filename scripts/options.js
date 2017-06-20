var updateOptionGoal = function () {// recarga datos de Goal
    chrome.storage.sync.get("goal", function (items) {
        if (!chrome.runtime.error) {
            var j = document.getElementById("optionGoalTable").rows[0].cells[0];
            switch (j.id) {
                case "JapVGoal":
                    j.innerText = items.goal[0];
                    break;
                case "JapKGoal":
                    j.innerText = items.goal[1];
                    break;
                case "JapRGoal":
                    j.innerText = items.goal[2];
                    break;
                case "PortVGoal":
                    j.innerText = items.goal[3];
                    break;

                default:
                    break;
            };
        };
    });
};
var reset = function () { //borra datos de data
    var opt = document.getElementById("optionGoalTable").rows[0].cells[0];
    switch (opt.id) {
        case "JapVGoal":
            chrome.storage.sync.get("goal", function (items) {
                var arrayChanging = items.goal;
                arrayChanging.splice(0, 1, 0);
                chrome.storage.sync.set({
                    "goal": arrayChanging
                });
            });
            break;
        case "JapKGoal":
            chrome.storage.sync.get("goal", function (items) {
                var arrayChanging = items.goal;
                arrayChanging.splice(1, 1, 0);
                chrome.storage.sync.set({
                    "goal": arrayChanging
                });
            });
            break;
        case "JapRGoal":
            chrome.storage.sync.get("goal", function (items) {
                var arrayChanging = items.goal;
                arrayChanging.splice(2, 1, 0);
                chrome.storage.sync.set({
                    "goal": arrayChanging
                });
            });
            break;
        case "PortVGoal":
            chrome.storage.sync.get("goal", function (items) {
                var arrayChanging = items.goal;
                arrayChanging.splice(3, 1, 0);
                chrome.storage.sync.set({
                    "goal": arrayChanging
                });
            });
            break;
    };
    updateOptionGoal();
};
//seleccion de categoria
var catSelected = function (cat) {
    switch (cat) {
        case "JapVGoal":
            i = 0;
            break;
        case "JapKGoal":
            i = 1;
            break;
        case "JapRGoal":
            i = 2;
            break;
        case "PortVGoal":
            i = 3;
            break;
        default:
            break;
    };
    return i;
};
//ingreso de un nuevo Goal
function enterGoal() {
    var cat = document.getElementById("optionGoalTable").rows[0].cells[0].id; //cattegory
    console.log(cat);
    catSelected(cat);
    var num = document.getElementById("newGoal").value; //obtiene valor de input
    clearInput(1);
    chrome.storage.sync.get("goal", function (items) {
        var arrayChanging = items.goal;
        if (items.track == "0") {
            arrayChanging.splice(i, 1, num);
            chrome.storage.sync.set({
                "goal": arrayChanging
            }, function () {
                if (chrome.runtime.error) {
                    console.log("error");
                }
                updateOptionGoal();
            });
        } else {
            var num2 = (+items.goal[i]) + (+num);
            arrayChanging.splice(i, 1, num2);
            chrome.storage.sync.set({
                "goal": arrayChanging
            }, function () {
                if (chrome.runtime.error) {
                    console.log("error");
                }
                updateOptionGoal();
            });
        }

    });
}