
const min = 60;
const hrs = 60 * min;
const day = 24 * hrs;
const year = 365 * day;

function $(property) {
    return document.querySelector(property);
}

function numberOf(seconds, unit) {
    let numberof = (seconds - (seconds % unit)) / unit;
    return numberof;
}

function numberOfUnit(seconds) {

    let years = 0;
    let days = 0;
    let hours = 0;
    let minutes = 0;

    let restSeconds = seconds % 60;
    seconds = seconds - restSeconds;

    if (seconds >= year) {
        years = numberOf(seconds, year);
        seconds = seconds - (year * years);
    }
    if (seconds < year && seconds >= day) {
        days = numberOf(seconds, day);
        seconds = seconds - (day * days);
    }
    if (seconds < day && seconds >= hrs) {
        hours = numberOf(seconds, hrs);
        seconds = seconds - (hrs * hours);
    }
    if (seconds < hrs && seconds >= min) {
        minutes = numberOf(seconds, min);
        seconds = seconds - (min * minutes);
    }
    return {
        years: years,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: restSeconds
    };
}

function stringUnits(time) {

    let arrayTime = [];
    let j = 0;

    for (let k in time) {

        if (time[k] != 0 && time[k] > 1) {
            arrayTime[j] = time[k] + " " + k;
            j++;

        } else if (time[k] != 0 && time[k] == 1) {
            let newK = k.slice(0, k.length - 1);
            arrayTime[j] = time[k] + " " + newK;
            j++;
        }
    }
    return arrayTime;
}

function stringTime(print) {

    let string = "";

    for (let i = 0; i < print.length; i++) {

        if (i < (print.length - 2)) {
            string = string.concat(print[i] + ", ");
        } else if (i == (print.length - 2)) {
            string = string.concat(print[i] + " and ");
        } else if (i == (print.length - 1)) {
            string = string.concat(print[i]);
        }
    }
    return string;
}

function Print() {
    let sec = parseInt($("input#seconds").value, 10);
    let p = $("p#print-time");

    if (sec < 0 || sec != $("input#seconds").value) {
        alert("The number must be a non-negative integer");
        location.reload();

    } else if (sec == 0) {
        p.innerHTML = "now";

    } else {
        let time = numberOfUnit(sec);
        let print = stringUnits(time);
        let stringtime = stringTime(print);
        p.innerHTML = stringtime;
    }
}

let button = $("button#submit");
button.addEventListener('click', Print);
