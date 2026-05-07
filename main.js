let is24HrFormat = false;
const meridiemElement = document.getElementById("meridiem");
const format12Btn = document.getElementById("format12");
const format24Btn = document.getElementById("format24");
const toggle = document.getElementById("toggle");
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Function that updates the time
function updateTime() {
    const now = new Date();

    // Get the current date
    const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
    const date = now.toLocaleDateString("en-US", options);

    // Get the components of time as strings
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    // Determine the meridiem depending on the hour if set in 12-hr format
    let meridiem = "";
    if (!is24HrFormat) {
        meridiem = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
    }
    hours = hours.toString().padStart(2, "0");

    // Change the textual content for each element of time
    document.getElementById("date").textContent = date;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
    meridiemElement.textContent = meridiem;
}

// Event listeners for time format toggle
format12Btn.addEventListener("click", () => {
    is24HrFormat = false;
    format12Btn.classList.add('active');
    format24Btn.classList.remove('active');
    meridiemElement.style.display = 'inline';
});

format24Btn.addEventListener("click", () => {
    is24HrFormat = true;
    format24Btn.classList.add('active');
    format12Btn.classList.remove('active');
    meridiemElement.style.display = 'none';
});

// Event listener for live changes to the OS theme 
mediaQuery.addEventListener("change", (event) => {
    toggle.checked = event.matches;
});

// Set initial state of dark mode toggle depending on the OS theme
toggle.checked = mediaQuery.matches;

// Initialize the clock and set the interval
updateTime();
setInterval(updateTime, 1000);
