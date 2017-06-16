var remove = function (param) {
    while (param.firstChild) {
        param.removeChild(param.firstChild);
    }
};
var addContent =function (param, opt) {// creacion de tabla para datos 
    var f= document.createElement("table");
    var h= document.createElement("thead");
    for (var i = 0; i < 2; i++) {
        var j= document.createElement("th");
        if (i==1) {
            j.innerText="Current goal"
        }
        else{
            j.innerHTML="Week goak"
        }
        h.appendChild(j);
    }
    f.appendChild(h);
    var r=document.createElement("tbody");
    var l=document.createElement("tr");
    for (var i = 0; i < 2; i++) { 
        var o= document.createElement("th");
        o.innerText="1";
        l.appendChild(o);
    }
    r.appendChild(l);
    f.appendChild(r);
    param.appendChild(f);

      /*  switch (opt) {
            case 0:
                for (i = 1; i <= 7; i++) {
                    if (i == 1 || i == 3) {
                        var d = document.createElement("h2");
                        if (i == 1) {
                            d.innerHTML = "Current goal";
                        } else {
                            d.innerHTML = "Weekly goal";
                        };
                    }
                    if (i == 2) {
                        var d = document.createElement("label");
                        d.id = "optionsGoal";
                    };
                    if (i == 4) {
                        var d = document.createElement("input");
                        d.id = "newGoal";
                        d.setAttribute("type", "text");
                    };
                    if (i > 4 && i < 8) {
                        var d = document.createElement("button");
                        if (i == 5) {
                            d.id = "setNewGoal";
                            d.setAttribute("type", "submit");
                            d.innerHTML = "Submit";
                            d.addEventListener("click", enterGoal);
                        } else if (i == 6) {

                            d.id = "resetGoal";
                            d.setAttribute("type", "submit");
                            d.innerHTML = "Reset Goal";
                            d.addEventListener("click", reset);

                        } else {
                            d.id = "goBackButtons";
                            d.setAttribute("type", "submit");
                            d.innerHTML = "Go back";
                            d.addEventListener("click", function () {
                                remove(param);
                            });
                        };

                    }
                    param.appendChild(d);
                    if (i >= 5) {
                        var f = document.createElement("br");
                        param.appendChild(f);
                    }
                };
                break;
            case 1:

                break;
            case 2:

                break;

        };*/

};
window.onload = function () {
    var buttons = [document.getElementById('japonesKanjiGoal'),
        document.getElementById('japonesVocaGoal'),
        document.getElementById('portuguesVocalGoal')
    ];
    var buttonH = document.getElementById("buttonHolder");
    buttons[0].onclick= function () {
        remove(buttonH);
        addContent(buttonH, 0);
        updateGoal();
    };
    buttons[1].onclick= function () {
        remove(buttonH);
        addContent(buttonH, 1);
        updateGoal();
    };
    buttons[2].onclick= function () {
        remove(buttonH);
        addContent(buttonH, 2);
        updateGoal();
    };
};