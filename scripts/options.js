var updateOptionGoal = function () {
    chrome.storage.sync.get("goal", function (items) {
        if (!chrome.runtime.error) {
                var j= document.getElementById("optionGoalTable").rows[0].cells[0]; //no terminado
                console.log(j);
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
    updateGoal();
};
var clearInput = function () { //limpiar el input
    document.getElementById("newGoal").value = "";
};

function enterGoal() {
    updateGoal();
    var num = document.getElementById("newGoal").value; //obtiene valor de input
    clearInput();
    chrome.storage.sync.get("goal", function (items) {
        if (items.goal == "0") {
            chrome.storage.sync.set({
                "goal": num
            }, function () {
                if (chrome.runtime.error) {
                    console.log("error");
                }
                updateGoal();
            });
        } else {
            var num2 = (+items.goal) + (+num);
            chrome.storage.sync.set({
                "goal": num2
            }, function () {
                if (chrome.runtime.error) {
                    console.log("error");
                }
                updateGoal();
            });
        }

    });
}