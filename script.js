var count = document.getElementById("count");
var box = document.getElementById("box");
var mainHeading = document.getElementById("mainHeading");
var sess = document.getElementById("sess");
var brek = document.getElementById("brek");
var leftMinus = document.getElementById("leftMinus");
var leftPlus = document.getElementById("leftPlus");
var rightMinus = document.getElementById("rightMinus");
var rightPlus = document.getElementById("rightPlus");
var trigger = document.getElementById("trigger");
var reset = document.getElementById("reset");
var mins = document.getElementById("mins");

var sessionTime = 1;
let sessTimeInSecs = sessionTime*60;
var breakTime = 1;
let brekTimeInSecs = breakTime*60;
var checkBreak = false;
var isStarted = true;

let id1=0;
let id2=0;
let id3=0;
let i = 1;

let sessMins = 0;
let sessSecs = 0;

count.innerHTML = `0${sessMins}:0${sessSecs}`;
mainHeading.innerHTML = "POMODORO";
sess.innerHTML = `${sessionTime} min`;
brek.innerHTML = `${breakTime} min`;


function sessCounter(timer) {
    if(timer>=0) {
        sessMins = Math.floor(timer / 60) % 60;
        sessSecs = Math.floor(timer) % 60;
        // console.log(count.innerHTML);
        formatTime();
    }
}

function formatTime() {
    if(sessMins<10 && sessSecs<10) {
        sessMins = "0"+sessMins;
        sessSecs = "0"+sessSecs;
        count.innerHTML = `${sessMins}:${sessSecs}`;
    } else if(sessMins<10 && sessSecs>=10) {
        sessMins = "0"+sessMins;
        count.innerHTML = `${sessMins}:${sessSecs}`;
    } else {
        count.innerHTML = `${sessMins}:${sessSecs}`;
    }
}

function sessionCount() {
    --sessTimeInSecs;
    // console.log("session countdown:"+sessTimeInSecs);
    sessCounter(sessTimeInSecs);
    if(sessTimeInSecs<0) {
        checkBreak = true;
        breakInterval();
    }
}

function sessionInterval() {
    if(sessionTime>0 && checkBreak===false && sessTimeInSecs>0) {
        mainHeading.innerHTML = "Session"+i;
        count.style.color = "rgba(57, 199, 218, 0.836)";
        box.style.backgroundColor = "rgba(57, 199, 218, 0.836)";
        clearInterval(id2);
        id1 = setInterval(sessionCount, 1000);
        // sessionCount();
    }
    if(brekTimeInSecs<=0)
        brekTimeInSecs = breakTime*60;
}

function breakCount() {
    --brekTimeInSecs;
    // console.log("break countdown:"+brekTimeInSecs);
    sessCounter(brekTimeInSecs);
    if(brekTimeInSecs<0) {
        checkBreak = false;
        sessionInterval();
    }
}

function breakInterval() {
    if(breakTime>0 && checkBreak===true && brekTimeInSecs>0) {
        mainHeading.innerHTML = "Break!";
        count.style.color = "rgba(233, 75, 17, 0.89)";
        box.style.backgroundColor = "rgba(233, 75, 17, 0.89)";
        clearInterval(id1);
        id2 = setInterval(breakCount, 1000);
        // breakCount();
    }
    if(sessTimeInSecs<=0) {
        ++i;
        sessTimeInSecs = sessionTime*60;
    }
}

function init() {
    if(checkBreak===false) {
        sessionInterval();
    } 
    else if(checkBreak===true) {
        breakInterval();
    }
}

function caller() {
    if(isStarted===true) {
        isStarted = false;
        trigger.value = "Pause";
        leftMinus.style.pointerEvents = "none";
        leftPlus.style.pointerEvents = "none";
        rightMinus.style.pointerEvents = "none";
        rightPlus.style.pointerEvents = "none";
        init();
        // id3 = setInterval(init, (sessionTime+breakTime)*60*1000);
    }
    else if(isStarted===false) {
        isStarted = true;
        trigger.value = "Start";
        leftMinus.style.pointerEvents = "none";
        leftPlus.style.pointerEvents = "none";
        rightMinus.style.pointerEvents = "none";
        rightPlus.style.pointerEvents = "none";
        clearInterval(id1);
        clearInterval(id2);
        // clearInterval(id3);
    }
}

leftMinus.addEventListener("click", function() {
    if(sessionTime > 1)
    sessionTime--;
    sess.innerHTML = `${sessionTime} min`;
    sessTimeInSecs = sessionTime*60;
})

leftPlus.addEventListener("click", function() {
    sessionTime++;
    sess.innerHTML = `${sessionTime} min`;
    sessTimeInSecs = sessionTime*60;
})

rightMinus.addEventListener("click", function() {
    if(breakTime > 1)
        breakTime--;
    brek.innerHTML = `${breakTime} min`;
    brekTimeInSecs = breakTime*60;
})

rightPlus.addEventListener("click", function() {
    breakTime++;
    brek.innerHTML = `${breakTime} min`;
    brekTimeInSecs = breakTime*60;
})

reset.addEventListener("click", function() {
    clearInterval(id1);
    clearInterval(id2);
    // clearInterval(id3);

    sessionTime = 1;
    sessTimeInSecs = sessionTime*60;
    breakTime = 1;
    brekTimeInSecs = breakTime*60;
    checkBreak = false;
    isStarted = true;

    id1=0;
    id2=0;
    id3=0;
    i = 1;

    sessMins = 0;
    sessSecs = 0;

    trigger.value = "Start";
    count.innerHTML = `0${sessMins}:0${sessSecs}`;
    sess.innerHTML = `${sessionTime} min`;
    brek.innerHTML = `${breakTime} min`;
    mainHeading.innerHTML = "POMODORO";
    leftMinus.style.pointerEvents = "auto";
    leftPlus.style.pointerEvents = "auto";
    rightMinus.style.pointerEvents = "auto";
    rightPlus.style.pointerEvents = "auto";
    count.style.color = "rgb(97, 97, 97)";
    box.style.backgroundColor = "rgb(97, 97, 97)";
})

trigger.addEventListener("click", caller);
