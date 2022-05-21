var n = document.querySelectorAll(".btn").length;
var m = document.querySelectorAll(".operator").length;
var num1 = 0;
var num2 = 0;
var lastKey;
var operator;
var active = false;

for(var i = 0; i < n; i++){
    document.querySelectorAll(".btn")[i].addEventListener("click", function(){
        var buttonInnerHTML = this.innerHTML;
        Operation(buttonInnerHTML);
        playSound(1);
    });
}
for(var i = 0; i < m; i++){
    document.querySelectorAll(".operator")[i].addEventListener("click", function(){
        var buttonInnerHTML = this.innerHTML;
        performOperation(buttonInnerHTML);
        playSound(2);
    });
}

function playSound(name){
    var audio = new Audio("resources\\"+name+".mp3");
    audio.play();
}

function Operation(key){
    if(key==="C"){
        location.reload();
    }
    else if(key==="CE"){
        document.querySelector(".box").innerHTML = 0;
        num1 = 0;
        num2 = 0;
        lastKey = "CE";
        active = false;
    }
    else if(key==="%"){
        num1 = Number(num1)/100.0;
        document.querySelector(".box").innerHTML = num1;
    }
    else if(key==="¹∕ₓ"){
        num1 = 1/Number(num1);
        document.querySelector(".box").innerHTML = num1;
    }
    else if(key==="𝑥²"){
        num1 = Number(num1)*Number(num1);
        document.querySelector(".box").innerHTML = num1;
    }
    else if(key==="√𝑥"){
        num1 = Math.sqrt(Number(num1));
        document.querySelector(".box").innerHTML = num1;
    }
    else if(key==="±"){
        if(num1===0) num1 = "-";
        else num1 = -1*Number(num1);
        document.querySelector(".box").innerHTML = num1;
    }
    else if(key==="."){
        if(lastKey!=="." && active === false){
            num1 = num1 + ".";
            document.querySelector(".box").innerHTML = num1;
        }
        else if(lastKey!=="."){
            num2 = num2 + ".";
            document.querySelector(".box").innerHTML = num2;
        }
        lastKey = ".";
    }
    else if(key >= 0 && key <= 9){
        if(document.querySelector(".box").innerHTML === "NaN"){
            document.querySelector(".box").innerHTML = 0
        }
        if(active === false){
            if(num1===0) num1 = key;
            else num1 = num1 + key;
            document.querySelector(".box").innerHTML = num1;
        }
        else{
            if(num2===0) num2 = key;
            else num2 = num2 + key;
            document.querySelector(".box").innerHTML = num2;
        }
    }
    else{
        if(active === false){
            num1 = num1.slice(0, num1.length-1);
            document.querySelector(".box").innerHTML = num1;
        }
        else{
            var len = document.querySelector(".box").innerHTML;
            len = len.slice(0, len.length-1);
            document.querySelector(".box").innerHTML = len;
            num2 = len;
        }
    }
}

function performOperation(opr){
    if(opr!=="="){
        document.querySelector("#last-operation_history").innerHTML = num1 + " " + opr; 
        operator = opr;
        num2 = 0;
        document.querySelector(".box").innerHTML = num2;
        lastKey=opr;
    }
    else{
        document.querySelector("#last-operation_history").innerHTML = num1 + " " + operator + " " + num2 + " " + opr;
        if(operator==="+"){
            num1 = Number(num1) + Number(num2);
        }
        else if(operator==="-"){
            num1 = Number(num1) - Number(num2);
        }
        else if(operator==="×"){
            num1 = Number(num1) * Number(num2);
        }
        else if(operator==="÷")num1 = Number(num1) / Number(num2); 
        document.querySelector(".box").innerHTML = num1;

    }
    active = true;
}
