const savedTheme = localStorage.getItem("program-theme");
let is24HrFormat = localStorage.getItem("time-format") === "24";
const dateFormatter = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
};

const dateElement = document.getElementById("date");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const meridiemElement = document.getElementById("meridiem");
const format12Btn = document.getElementById("time-format-12");
const format24Btn = document.getElementById("time-format-24");
const themeToggle = document.getElementById("theme-toggle-input");

// Function that updates the date
function updateDate() {
    dateElement.textContent = new Date().toLocaleDateString("en-US", dateFormatter);
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
    // Cache the user's preferred time format in the local storage
    localStorage.setItem("time-format", use24Hour ? "24" : "12");
    
    is24HrFormat = use24Hour;

    format12Btn.classList.toggle("active", !use24Hour);
    format24Btn.classList.toggle("active", use24Hour);

    meridiemElement.hidden = use24Hour;

    updateTime();
}

// Event listeners for time format toggle
format12Btn.addEventListener("click", () => {
    setTimeFormat(false);
});

format24Btn.addEventListener("click", () => {
    setTimeFormat(true);
});

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

// Function for setting the program theme
function setTheme(isDarkMode) {
    document.body.classList.toggle("dark", isDarkMode);
    themeToggle.checked = isDarkMode;

    // Cache the user's preferred theme in the local storage
    localStorage.setItem("program-theme", isDarkMode ? "dark" : "light");
}

// Check if the preferred theme is cached in the local storage
if (savedTheme) 
    setTheme(savedTheme === "dark");

themeToggle.addEventListener("change", (event) => {
    setTheme(themeToggle.checked);
});

// Initialize the clock
startClock();
