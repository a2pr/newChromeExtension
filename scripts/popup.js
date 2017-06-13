var updateTrack= function () {
    chrome.storage.sync.get("track", function (items) {
       if(!chrome.runtime.error){
           console.log(items.track);
           document.getElementById("current-track").innerText=items.track;
       } 
    });
};
var updateGoal= function () {
    chrome.storage.sync.get("goal", function (items) {
       if(!chrome.runtime.error){
           console.log(items.goal);
           document.getElementById("week-goal").innerText=items.goal;
       } 
    });
}
var reset = function () {   //borra datos de data
    chrome.storage.sync.set({"track":0});
    updateTrack();
};
window.onload = function () {
    updateGoal();
    updateTrack();
    document.getElementById("tracking").onclick= function () {
        var num =document.getElementById("track").value; //obtiene valor de input
        document.getElementById("track").value=""; //borra valor de input
        chrome.storage.sync.get("track", function (items) {
            if (items.track=="0") {
                chrome.storage.sync.set({"track":num}, function () {
                    if (chrome.runtime.error) {
                        console.log("error");
                    }
                updateTrack();
                });
            }
            else{
                var num2= (+items.track) + (+num);
                chrome.storage.sync.set({"track":num2}, function () {
                    if (chrome.runtime.error) {
                        console.log("error");
                    }
                updateTrack();
                });
            }
        });
    }
    document.getElementById("reset").onclick= function () {
        reset();
    }
    document.getElementById("options").onclick= function () {
        chrome.runtime.openOptionsPage();
    }
}
