// const { min } = require("underscore");

let startingMinutes;
let intervalID;
let savedTime;
let currentTime;
let tomatoCount = 0;
const tomatoStr = "🍅";
const buttonSound = new Audio("Dry-Fire-Gun.mp3");
let toggleBit = document.getElementById("toggle-button");
const countDownEl = document.getElementById("countDown");
const tomatoDisplayer = document.querySelector(".tomato--counter");
const containerEl = document.getElementById("container");

function clearTimer() {
  clearInterval(intervalID);
}

toggleBit.addEventListener("click", handlePauseStart);

function handlePauseStart() {
  console.log("The button was pressed");
  if (toggleBit.classList.contains("resume")) {
    console.log("class list was resume and will change to pause");
    toggleBit.classList.remove("resume");
    toggleBit.classList.add("pause");
    pauseTimer();
  } else if (toggleBit.classList.contains("pause")) {
    console.log("class list was pause and will change to resume");
    toggleBit.classList.remove("pause");
    toggleBit.classList.add("resume");
    startTimer(currentTime);
  }
}

function pauseTimer() {
  function getCurrentTime(minutes, seconds) {
    minutes = parseInt(countDownEl.innerHTML.slice(0, 2)) * 60;
    seconds = parseInt(countDownEl.innerHTML.slice(3));
    return minutes + seconds;
  }
  currentTime = getCurrentTime();
  clearTimer();
  console.log(currentTime);
  toggleBit.innerHTML = "Resume";
}

function resumeTimer() {
  function getCurrentTime(minutes, seconds) {
    minutes = parseInt(countDownEl.innerHTML.slice(0, 2)) * 60;
    seconds = parseInt(countDownEl.innerHTML.slice(3));
    return minutes + seconds;
  }
  currentTime = getCurrentTime();
  startTimer(currentTime);
  console.log(currentTime);
  toggleBit.innerHTML = "Pause";
}

const startTimer = function (startingMinutes) {
  if (currentTime != null) {
    clearTimer();
    toggleBit.innerHTML = "Pause";
    let time = currentTime;

    intervalID = setInterval(updateCountDown, 1000);

    function updateCountDown() {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (seconds < 0) {
        clearTimer();
        toggleBit.innerHTML = "";
        if (containerEl.classList.contains("pomodoro-mode")) {
          console.log("its pomo and clock is 0");
          addTomato();
        }
        buttonSound.play();
        console.log("timer has reached 0");
        return;
      }

      countDownEl.innerHTML = `${minutes
        .toString()
        .padStart(2, "0")}: ${seconds.toString().padStart(2, "0")}`;
      time--;
    }
  } else {
    clearTimer();
    toggleBit.innerHTML = "Pause";
    let time = startingMinutes * 60;

    intervalID = setInterval(updateCountDown, 1000);

    function updateCountDown() {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (seconds < 0) {
        return;
      }

      countDownEl.innerHTML = `${minutes
        .toString()
        .padStart(2, "0")}: ${seconds.toString().padStart(2, "0")}`;
      time--;
    }
  }
};

let buttons = document.querySelectorAll(".btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    console.log(event.target.className.slice(4));
    let currentMode = event.target.className.slice(4);

    if (currentMode === "shortBreak") {
      startingMinutes = 0.5;
      containerEl.classList.remove(...containerEl.classList);
      containerEl.classList.add("shortBreak-mode");
    }
    if (currentMode === "longBreak") {
      startingMinutes = 15;
      containerEl.classList.remove(...containerEl.classList);
      containerEl.classList.add("longBreak-mode");
    }
    if (currentMode === "pomodoro") {
      startingMinutes = 25;
      containerEl.classList.remove(...containerEl.classList);
      containerEl.classList.add("pomodoro-mode");
    }
    console.log(startingMinutes);
    clearTimer();
    currentTime = startingMinutes * 60;
    if (toggleBit.classList.contains("pause")) {
      toggleBit.classList.remove("pause");
      toggleBit.classList.add("resume");
    }
    buttonSound.play();
    startTimer(startingMinutes);
  });
});

function addTomato() {
  tomatoCount++;
  console.log(`tomato was fired ${tomatoCount}`);
  tomatoDisplayer.innerHTML = `${tomatoStr.repeat(tomatoCount)}`;
}

console.log("this is a test log");
