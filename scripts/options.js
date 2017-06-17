var updateOptionGoal = function () {
    chrome.storage.sync.get("goal", function (items) {
        if (!chrome.runtime.error) {
                var j= document.getElementById("optionGoalTable").rows[0].cells[0];
                switch (j.id) {
                    case "JapVGoal":
                        j.innerText= items.goal[0];
                        break;
                    case "JapKGoal":
                        j.innerText= items.goal[1];
                        break;
                    case "JapRGoal":
                        j.innerText= items.goal[2];
                        break;
                    case "PortVGoal":
                        j.innerText= items.goal[3];
                        break;
                
                    default:
                        break;
                };//algo esta pasando XDD
            
        };
    });
} //on hold
var reset = function () { //borra datos de data
    chrome.storage.sync.set({
        "goal": [0, 0, 0, 0]
    });
    updateOptionGoal();
};
var clearInput = function () { //limpiar el input
    document.getElementById("newGoal").value = "";
};
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
function enterGoal() {
    var cat = document.getElementById("optionGoalTable").rows[0].cells[0].id;//cattegory
    console.log(cat);
    catSelected(cat);
    var num = document.getElementById("newGoal").value; //obtiene valor de input
    clearInput();
    chrome.storage.sync.get("goal", function (items) {
        var arrayChanging = items.goal;
        if (items.track == "0") {
            arrayChanging.splice(i,1,num);
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
            arrayChanging.splice(i,1, num2);
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