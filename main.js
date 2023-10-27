// Get elements
const startButton = document.getElementById("startButton");
const datetimePicker = document.getElementById("datetime");
const datetimeIcon = document.getElementById("datetimeIcon");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

// Define the initial target time variable
let initialTargetTime;

// Function to update the countdown
function updateCountdown() {
  if (!initialTargetTime) {
    return; // Do not update the countdown if the initial target time is not set
  }

  const currentDate = new Date().getTime();
  const timeRemaining = initialTargetTime - currentDate;

  if (timeRemaining <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    clearInterval(interval);
    return;
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  daysElement.textContent = days.toString().padStart(2, "0");
  hoursElement.textContent = hours.toString().padStart(2, "0");
  minutesElement.textContent = minutes.toString().padStart(2, "0");
  secondsElement.textContent = seconds.toString().padStart(2, "0");
}

// Function to start the countdown timer
function startCountdown() {
  // Save the initial target time
  initialTargetTime = new Date(datetimePicker.value).getTime();

  // Save the chosen date and time to sessionStorage
  sessionStorage.setItem("targetDateTime", datetimePicker.value);

  // Start the countdown timer
  updateCountdown();
  interval = setInterval(updateCountdown, 1000);
}

// Event listener for the start button
startButton.addEventListener("click", startCountdown);

// Event listener to open the datetime picker when clicking the icon
datetimeIcon.addEventListener("click", function () {
  datetimePicker._flatpickr.open();
});

// Initialize flatpickr on the datetime input
flatpickr(datetimePicker, {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  time_24hr: true,
});

// Load the chosen date and time from sessionStorage
const savedDateTime = sessionStorage.getItem("targetDateTime");
if (savedDateTime) {
  datetimePicker.value = savedDateTime;
  startCountdown(); // Start the countdown
}
