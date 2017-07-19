var remove = function (param) {
    while (param.firstChild) {
        param.removeChild(param.firstChild);
    }
};
var addContent = function (param, opt) {
    //creacion de titulo
    var b = document.createElement("h1");
    b.id = "optionGoalTitle";
    switch (opt) {
        case 0:
            b.innerText = "Japanese Vocab Goal";
            break;
        case 1:
            b.innerText = "Japanese Kanji Goal";
            break;
        case 2:
            b.innerText = "Japanese Review Goal";
            break;
        case 3:
            b.innerText = "Portuguese Vocab Goal";
            break;
    };
    param.appendChild(b);
    // creacion de tabla para datos 
    var f = document.createElement("table");
    f.id = "optionGoalTable";
    var h = document.createElement("thead");
    var k = document.createElement("th");
    k.innerText = "Current goal"
    h.appendChild(k);
    f.appendChild(h);
    var r = document.createElement("tbody");
    var l = document.createElement("tr");
    var j = document.createElement("th");
    switch (opt) {
        case 0:
            j.id = "JapVGoal";
            break;
        case 1:
            j.id = "JapKGoal";
            break;
        case 2:
            j.id = "JapRGoal";
            break;
        case 3:
            j.id = "PortVGoal";
            break;
    };
    j.innerText = "";
    l.appendChild(j);
    r.appendChild(l);
    f.appendChild(r);
    param.appendChild(f);
    //creacion de botones
    var l = document.createElement("input");
    l.id = "newGoal";
    l.setAttribute("type", "text");
    param.appendChild(l);
    for (var i = 0; i < 3; i++) {
        var j = document.createElement("button");
        switch (i) {
            case 0:
                j.id = "setNewGoal";
                j.setAttribute("type", "submit");
                j.addEventListener("click", enterGoal);
                j.innerText = "Submit";
                break;
            case 1:
                j.id = "resetGoal";
                j.setAttribute("type", "submit");
                j.addEventListener("click", reset);
                j.innerText = "Reset Goal";
                break;
            case 2:
                j.id = "goBackButton";
                j.setAttribute("type", "submit");
                j.addEventListener("click", function () {
                    remove(param)
                });
                j.innerText = "Set another Goal";
                break;
        };
        param.appendChild(j);
    };
};
window.onload = function () {
    //agrupacion de botones 
    var buttons = [document.getElementById('japonesVocaGoal'),
        document.getElementById('japonesKanjiGoal'),
        document.getElementById('japonesRepaGoal'),
        document.getElementById('portuguesVocalGoal')
    ];
    //seleccion de div de transformacion
    var buttonH = document.getElementById("buttonHolder");
    //transformaciones de botones
    buttons[0].onclick = function () {
        remove(buttonH);
        addContent(buttonH, 0);
        updateOptionGoal();
    };
    buttons[1].onclick = function () {
        remove(buttonH);
        addContent(buttonH, 1);
        updateOptionGoal();
    };
    buttons[2].onclick = function () {
        remove(buttonH);
        addContent(buttonH, 2);
        updateOptionGoal();
    };
    buttons[3].onclick = function () {
        remove(buttonH);
        addContent(buttonH, 3);
        updateOptionGoal();
    };
};