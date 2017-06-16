/*var updateGoal = function () {
    chrome.storage.sync.get("goal", function (items) {
        if (!chrome.runtime.error) {
            for (var i = 0; i < 4; i++) {
              document.getElementById("")//no terminado

    }
            document.getElementById("optionsGoal").innerText = items.goal;
        };
    });
}*/ //on hold
var reset = function () { //borra datos de data
    chrome.storage.sync.set({
        "goal": [0,0,0,0]
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