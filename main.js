let is24HrFormat = false;
const dateElement = document.getElementById("date");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const meridiemElement = document.getElementById("meridiem");
const format12Btn = document.getElementById("format12");
const format24Btn = document.getElementById("format24");
const toggle = document.getElementById("toggle");
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Function that updates the date
function updateDate() {
    dateElement.textContent = new Date().toLocaleDateString("en-US", 
        {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long"
        }
    );
}

// Function that updates the time
function updateTime() {
    const now = new Date();

    // Get the components of time as strings
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Determine the meridiem depending on the hour if set in 12-hr format
    let meridiem = "";
    if (!is24HrFormat) {
        meridiem = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
    }

    hours = String(hours).padStart(2, "0");

    // Change the textual content for each element of time
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
    meridiemElement.textContent = meridiem;
}

// Function for time format toggle
function setTimeFormat(use24Hour) {
    is24HrFormat = use24Hour;
    format12Btn.classList.toggle("active", !use24Hour);
    format24Btn.classList.toggle("active", use24Hour);
    meridiemElement.hidden = use24Hour;

    updateTime();
}

// Function to start the clock and sync with real seconds
function startClock() {
    updateDate();
    updateTime();

    setTimeFormat(is24HrFormat);
    setInterval(updateDate, 60000);

    const delay = 1000 - (Date.now() % 1000);

    setTimeout(() => {
        updateTime();
        setInterval(updateTime, 1000);
    }, delay);
}

// Event listeners for time format toggle
format12Btn.addEventListener("click", () => {
    setTimeFormat(false);
});

format24Btn.addEventListener("click", () => {
    setTimeFormat(true);
});

// Event listener for live changes to the OS theme 
mediaQuery.addEventListener("change", (event) => {
    toggle.checked = event.matches;
});

toggle.checked = mediaQuery.matches;
startClock();