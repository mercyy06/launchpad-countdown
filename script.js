"use strict";

const daysDisplay = document.getElementById("days");
const hoursDisplay = document.getElementById("hour");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const dayInput = document.getElementById("dayInput");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");
const startBtn = document.getElementById("startBtn");

// error validation
const showError = (input, message) => {
  const parent = input.parentElement;
  const label = parent.querySelector("label");
  const errorText = parent.querySelector("small");

  input.classList.remove("inputs");
  input.classList.add(
    "border-[red]",
    "focus:outline-none",
    "focus:border-[red]",
    "focus:ring-[red]"
  );

  label.classList.remove("labels");
  label.classList.add("text-[red]");

  errorText.innerText = message;
  errorText.classList.remove("hidden");
};

// RESETING THE ERRORS
const resetError = (input) => {
  const parent = input.parentElement;
  const label = parent.querySelector("label");
  const errorText = parent.querySelector("small");

  input.classList.add("inputs");
  input.classList.remove(
    "border-[red]",
    "focus:outline-none",
    "focus:border-[red]",
    "focus:ring-[red]"
  );

  label.classList.add("labels");
  label.classList.remove("text-[red]");

  errorText.classList.add("hidden");
  errorText.innerText = "";
};

// CHECK FOR LEAP YEAR
const isLeapYear = (y) => {
  const leapYear = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  return leapYear;
};

const backToZero = () => {
  daysDisplay.textContent = "00";
  hoursDisplay.textContent = "00";
  minutesDisplay.textContent = "00";
  secondsDisplay.textContent = "00";
};

let countdownTimer;

startBtn.addEventListener("click", () => {
  const d = +dayInput.value;
  const m = +monthInput.value;
  const y = +yearInput.value;

  resetError(dayInput);
  resetError(monthInput);
  resetError(yearInput);

  // DAYS IN EACH MONTHS
  const daysInMonth = [
    31,
    isLeapYear(y) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  if (d < 1 || d > daysInMonth[m - 1]) {
    showError(dayInput, "Must be a valid day");
    backToZero();
    return false;
  }

  // EMPTY CHECK
  if (!d) {
    showError(dayInput, "This Field is required");
    return false;
  }
  if (!m) {
    showError(monthInput, "This field is required");
    return false;
  }
  if (!y) {
    showError(yearInput, "This field is required");
    return false;
  }

  if (countdownTimer) clearInterval(countdownTimer);

  // target date
  const targetDate = new Date(y, m - 1, d);

  if (targetDate.getFullYear() < new Date().getFullYear()) {
    clearInterval(countdownTimer);
    showError(yearInput, "Target year should be in the future");
    backToZero();
    return;
  }
  if (
    targetDate.getFullYear() === new Date().getFullYear() &&
    targetDate.getMonth() < new Date().getMonth()
  ) {
    clearInterval(countdownTimer);
    showError(monthInput, "Target month should be in the future");
    backToZero();
    return;
  }

  if (
    targetDate.getFullYear() === new Date().getFullYear() &&
    targetDate.getMonth() === new Date().getMonth() &&
    targetDate.getDate() <= new Date().getDate()
  ) {
    clearInterval(countdownTimer);
    showError(dayInput, "Target day should be in the future");
    backToZero();
    return;
  }

  countdownTimer = setInterval(() => {
    const currentDate = new Date();
    const diff = targetDate - currentDate;

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    const day = Math.floor(diff / oneDay);
    daysDisplay.textContent = `${day}`.padStart(2, 0);
    const remDayMs = diff % oneDay;

    const hour = Math.floor(remDayMs / oneHour);
    hoursDisplay.textContent = `${hour}`.padStart(2, 0);
    const remHourMs = remDayMs % oneHour;

    const min = Math.floor(remHourMs / oneMinute);
    minutesDisplay.textContent = `${min}`.padStart(2, 0);
    const remMinMs = remHourMs % oneMinute;

    const sec = Math.floor(remMinMs / 1000);
    secondsDisplay.textContent = `${sec}`.padStart(2, 0);

    if (diff <= 0) {
      clearInterval(countdownTimer);
      backToZero();
    }
  }, 1000);
});

// const countdownTimer = setInterval(() => {
//   // target date
//   const targetDate = new Date(2026, 0, 20);
//   const currentDate = new Date();
//   const diff = targetDate - currentDate;

//   const oneDay = 24 * 60 * 60 * 1000;
//   const oneHour = 60 * 60 * 1000;
//   const oneMinute = 60 * 1000;

//   const day = Math.floor(diff / oneDay);
//   daysDisplay.textContent = `${day}`.padStart(2, 0);
//   const remDayMs = diff % oneDay;

//   const hour = Math.floor(remDayMs / oneHour);
//   hoursDisplay.textContent = `${hour}`.padStart(2, 0);
//   const remHourMs = remDayMs % oneHour;

//   const min = Math.floor(remHourMs / oneMinute);
//   minutesDisplay.textContent = `${min}`.padStart(2, 0);
//   const remMinMs = remHourMs % oneMinute;

//   const sec = Math.floor(remMinMs / 1000);
//   secondsDisplay.textContent = `${sec}`.padStart(2, 0);

//   if (day === 0 && hour === 0 && min === 0 && sec === 0) {
//     clearInterval(countdownTimer);
//   }
// }, 1000);
