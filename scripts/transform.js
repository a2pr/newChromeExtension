    window.onload=function () {
        var buttons=[document.getElementById('japonesKanjiGoal'),
                    document.getElementById('japonesVocaGoal'),
                    document.getElementById('portuguesVocalGoal')
    ];
    var buttonH= document.getElementById("buttonHolder");
    function remove(){
        while(buttonH.firstChild){
            buttonH.removeChild(buttonH.firstChild);
        }
    };
    function goBack() {
        
    }
    function addContent(opt) {
     switch (opt) {
         case 0:
             for(i=1;i<=7;i++){
            if (i==1 || i==3) {
             var d=document.createElement("h2");   
             if (i==1) {
                 d.innerHTML="Current goal";
             }
                else{
                    d.innerHTML="Weekly goal";
                };
            }
            if (i==2) {
                var d=document.createElement("label");
                d.id="optionsGoal";
            };
            if (i==4) {
                var d=document.createElement("input");
                 d.id="newGoal";
                 d.setAttribute("type","text");
            };
            if(i>4 && i<8){
                var d=document.createElement("button");
                if (i==5) {
                    d.id="setNewGoal";
                    d.setAttribute("type","submit");
                    d.innerHTML="Submit";
                    d.addEventListener("click", enterGoal);
                } else if (i==6) {
                    
                    d.id="resetGoal";
                    d.setAttribute("type","submit");
                    d.innerHTML="Reset Goal";
                    d.addEventListener("click",reset);
                    
                }
                 else {
                     d.id="goBackButtons";
                    d.setAttribute("type","submit");
                    d.innerHTML="Go back";
                    d.addEventListener("click",remove);
                };
                
            }
            buttonH.appendChild(d);
            if (i>=5) {
                var f= document.createElement("br");
                buttonH.appendChild(f);
            }
        };
             break;
         case 1: //next part
             
             break;
         case 2:
             
             break;
    
     
         default:
             break;
     };   
        
    }
    buttons[0].onclick= function () {
        remove();
        addContent(0);
        updateGoal();
    };
    buttons[1].onclick= function () {
        remove();
        addContent(1);
        updateGoal();
    };
    buttons[2].onclick= function () {
        remove(2);
        addContent();
        updateGoal();
    };
    }
    

