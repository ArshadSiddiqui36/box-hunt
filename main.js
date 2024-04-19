// alert("OK");

/*
let startBtn = document.getElementById('start'); 
let stopBtn = document.getElementById('stop'); 
let resetBtn = document.getElementById('reset'); 
  
let hour = 00; 
let minute = 00; 
let second = 00; 
let count = 00; 
  
startBtn.addEventListener('click', function () { 
    timer = true; 
    stopWatch(); 
}); 
  
stopBtn.addEventListener('click', function () { 
    timer = false; 
}); 
  
resetBtn.addEventListener('click', function () { 
    timer = false; 
    hour = 0; 
    minute = 0; 
    second = 0; 
    count = 0; 
    document.getElementById('hr').innerHTML = "00"; 
    document.getElementById('min').innerHTML = "00"; 
    document.getElementById('sec').innerHTML = "00"; 
    document.getElementById('count').innerHTML = "00"; 
}); 
  
function stopWatch() { 
    if (timer) { 
        count++; 
  
        if (count == 100) { 
            second++; 
            count = 0; 
        } 
  
        if (second == 60) { 
            minute++; 
            second = 0; 
        } 
  
        if (minute == 60) { 
            hour++; 
            minute = 0; 
            second = 0; 
        } 
  
        let hrString = hour; 
        let minString = minute; 
        let secString = second; 
        let countString = count; 
  
        if (hour < 10) { 
            hrString = "0" + hrString; 
        } 
  
        if (minute < 10) { 
            minString = "0" + minString; 
        } 
  
        if (second < 10) { 
            secString = "0" + secString; 
        } 
  
        if (count < 10) { 
            countString = "0" + countString; 
        } 
  
        document.getElementById('hr').innerHTML = hrString; 
        document.getElementById('min').innerHTML = minString; 
        document.getElementById('sec').innerHTML = secString; 
        document.getElementById('count').innerHTML = countString; 
        setTimeout(stopWatch, 10); 
    } 
}
*/

// ====================================================

let startTime; // to keep track of the start time
let stopwatchInterval; // to keep track of the interval
let elapsedPausedTime = 0; // to keep track of the elapsed time while stopped

function startStopwatch() {
    if (!stopwatchInterval) {
      startTime = new Date().getTime() - elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
      stopwatchInterval = setInterval(updateStopwatch, 1000); // update every second
    }
}
  
  function stopStopwatch() {
    clearInterval(stopwatchInterval); // stop the interval
    elapsedPausedTime = new Date().getTime() - startTime; // calculate elapsed paused time
    stopwatchInterval = null; // reset the interval variable
  }
  
  function resetStopwatch() {
    stopStopwatch(); // stop the interval
    elapsedPausedTime = 0; // reset the elapsed paused time variable
    document.getElementById("stopwatch").innerHTML = "00:00:00"; // reset the display
  }
  
  function updateStopwatch() {
    let currentTime = new Date().getTime(); // get current time in milliseconds
    let elapsedTime = currentTime - startTime; // calculate elapsed time in milliseconds
    let seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
    let minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
    let hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
    let displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds); // format display time
    document.getElementById("stopwatch").innerHTML = displayTime; // update the display

    // Modified Code for time
    // ==========================
    // let timeSec = pad(seconds);
    // console.log(typeof(timeSec));

    let reactionTime;

    if (pad(hours) == "00" && pad(minutes) == "00") {
        // console.log(`${pad(seconds)}Sec`);
        reactionTime = `${pad(seconds)}Sec`;
        
    } else if (pad(hours) == "00") {
        // console.log(`${pad(minutes)}Min ${pad(seconds)}Sec`);
        reactionTime = `${pad(minutes)}Min ${pad(seconds)}Sec`;
    } else {
        // console.log(`${pad(hours)}Hr ${pad(minutes)}Min ${pad(seconds)}Sec`);
        reactionTime = `${pad(hours)}Hr ${pad(minutes)}Min ${pad(seconds)}Sec`;
    }

    return reactionTime;

    // ==========================
  }
  
  function pad(number) {
    // add a leading zero if the number is less than 10
    return (number < 10 ? "0" : "") + number;
  }

// ====================================================

let start = document.getElementById("start");
let pause = document.getElementById("pause");
let reset = document.getElementById("reset");
let timeInterval = document.getElementById("timeInterval");

let pix = document.getElementById("pix");

let mouseClickNum = document.getElementById("mouseClickNum");
let reactionTime = document.getElementById("reactionTime");

let newMouseClick = document.createElement("li");
let newReactionTime = document.createElement("li");

let randomHeight = () => {
  return Math.floor(Math.random() * 180) + 1;
};
let randomWidth = () => {
  return Math.floor(Math.random() * Math.max(600)) + 1;
};

console.log(randomHeight());
console.log(randomWidth());

let myInterval;
let mouseClickCount = 1;
let reactionTimeCount = "0 Sec";

let gameStart = false;
function changeGameState(newState) {
    gameStart = newState;
};

let countMouseClick = () => {
  return mouseClickCount++;
};

console.log(gameStart);

// Start Button Function
start.addEventListener("click", () => {
    // alert("Start clicked");

    if (timeInterval.value) {
        // console.log("Input Value: " + timeInterval.value);

        if (timeInterval.value > 0) {

            pix.style.display = "block";
            
            changeGameState(true);

            myInterval = setInterval(function () {
                randomHeight();
                randomWidth();
                pix.style.left = randomWidth() + "px";
                pix.style.bottom = randomHeight() + "px";
            }, timeInterval.value * 1000);

            startStopwatch();
        } else {
            alert("Please Enter a valid Time Interval (Positive integer - in Seconds)");
        }

    } else {
        alert("Please Enter Time Interval (in Seconds)");
    }

});


// Pause Button Function
pause.addEventListener("click", () => {
  // alert("Pause clicked");
  // pix.style.display = "none";

  changeGameState(false);

  clearInterval(myInterval);
  resetStopwatch();
});


// Pixel Button Function
pix.addEventListener("click", () => {
    // alert("Pixel clicked");
    // console.log("Mouse Click Number"+countMouseClick());

    console.log(gameStart);

    if (gameStart) {

        newMouseClick = document.createElement("li");
        newReactionTime = document.createElement("li");
        newMouseClick.textContent = countMouseClick();
        // newReactionTime.textContent = "2s";
        newReactionTime.textContent = updateStopwatch();
        mouseClickNum.appendChild(newMouseClick);
        reactionTime.appendChild(newReactionTime);

        resetStopwatch();
        startStopwatch();
    }
});


// Reset Button Function
reset.addEventListener("click", () => {
  // alert("Reset clicked");
  pix.style.display = "block";
  pix.style.left = randomWidth() + "px";
  pix.style.bottom = randomHeight() + "px";

  changeGameState(false);

  mouseClickCount = 1;
  reactionTimeCount = "0 Sec";

  while (mouseClickNum.firstChild && reactionTime.firstChild) {
    mouseClickNum.firstChild.remove();
    reactionTime.firstChild.remove();
    console.log("removed");
  }

//   Reset the time interval value from input
  document.getElementById("timeInterval").value = "";

  clearInterval(myInterval);
  resetStopwatch();
});
