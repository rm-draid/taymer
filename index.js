let countdownInterval;
let remainingTime = 0;

const alarmSound = new Audio("the-way-home-6674.mp3");

function updateTime() {
  const timeDisplay = document.getElementById("time");

  const minutes = Math.floor(remainingTime / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (remainingTime % 60).toString().padStart(2, "0");

  timeDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (!countdownInterval && remainingTime > 0) {
    countdownInterval = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        updateTime();
      } else {
        clearInterval(countdownInterval);
        countdownInterval = null;
        alert("Taymer tugadi!");

        alarmSound.play();
      }
    }, 1000);
  }
}

document.getElementById("startBtn").addEventListener("click", () => {
  const minutesInput = document.getElementById("minutesInput").value;
  if (!countdownInterval && minutesInput !== "") {
    remainingTime = parseInt(minutesInput) * 60;
    updateTime();
    startTimer();
  }
});

document.getElementById("stopBtn").addEventListener("click", () => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;

    alarmSound.pause();
    alarmSound.currentTime = 0;
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownInterval = null;
  remainingTime = 0;
  updateTime();

  alarmSound.pause();
  alarmSound.currentTime = 0;
});

updateTime();
