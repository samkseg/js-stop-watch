const timer = document.querySelector("#timerDisplay");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");

let time = new Date();
let theTime = document.createElement("p");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;
let milis = 0;

startBtn.addEventListener("click", () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1);
    }

});
stopBtn.addEventListener("click", () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});
resetBtn.addEventListener("click", () => {
    paused = true
    startTime = 0;
    elapsedTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    milis = 0;
    timerDisplay.textContent = "00:00:00:000"
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    milis = elapsedTime;
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    milis = padMili(milis % 1000);
    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    timer.textContent = `${hrs}:${mins}:${secs}:${milis}`;

    function pad(unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }

    function padMili(unit) {
        return unit > 99 ? unit : unit > 9 ? "0" + unit : "00" + unit;
    }
}

function loadTime() {
    let currentDate = new Date();

    let secs = pad(currentDate.getSeconds());
    let mins = pad(currentDate.getMinutes());
    let hrs = pad(currentDate.getHours());

    let dateTime = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + "<br>" + hrs + ":" + mins + ":" + secs;

    theTime.innerHTML = dateTime;
    document.getElementById("theTime").appendChild(theTime);

    function pad(unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}
loadTime();
setInterval(loadTime, 1000);