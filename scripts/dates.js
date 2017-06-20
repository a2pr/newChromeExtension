var arrayDates=["","","","","","",""];
var x =new Date();
var d=x.getDate();
var m=x.getMonth();
var Y=x.getFullYear();
var y= x.getDate() + 7;
var i;
for (var i = 0; d < y; i++) {
    arrayDates[i]={
        "date": d,
        "month":m,
        "year":Y
    };
    console.log(arrayDates[i]);
    
    d++;
};
console.log(arrayDates);