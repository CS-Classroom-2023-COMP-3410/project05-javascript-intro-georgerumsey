// This file contains the JavaScript code for the digital clock project, handling time updates, user preferences, and alarm functionality.

document.addEventListener('DOMContentLoaded', () => {
    const clockElement = document.getElementById('clock');
    const toggleFormatSelect = document.getElementById('format-toggle');
    const colorPicker = document.getElementById('color-picker');
    const fontSizeInput = document.getElementById('font-size');
    const alarmInput = document.getElementById('alarm-time');
    const setAlarmButton = document.getElementById('set-alarm');
    let is24HourFormat = false;
    let alarmTime = null;

    // Load user preferences from localStorage
    if (localStorage.getItem('is24HourFormat')) {
        is24HourFormat = JSON.parse(localStorage.getItem('is24HourFormat'));
    }
    if (localStorage.getItem('color')) {
        clockElement.style.color = localStorage.getItem('color');
    }
    if (localStorage.getItem('fontSize')) {
        clockElement.style.fontSize = localStorage.getItem('fontSize');
    }

    // Function to update the clock
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        if (!is24HourFormat) {
            hours = hours % 12 || 12; // Convert to 12-hour format
        }

        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
        checkAlarm(now);
    }

    // Function to check and trigger alarm
    function checkAlarm(now) {
        if (alarmTime && now.getHours() === alarmTime.hours && now.getMinutes() === alarmTime.minutes) {
            alert('Alarm ringing!');
            alarmTime = null; // Reset alarm after it rings
        }
    }

    // Event listeners
    toggleFormatSelect.addEventListener('change', () => {
        is24HourFormat = toggleFormatSelect.value === '24';
        localStorage.setItem('is24HourFormat', is24HourFormat);
        updateClock();
    });

    colorPicker.addEventListener('input', (event) => {
        clockElement.style.color = event.target.value;
        localStorage.setItem('color', event.target.value);
    });

    fontSizeInput.addEventListener('input', (event) => {
        clockElement.style.fontSize = event.target.value + 'px';
        localStorage.setItem('fontSize', event.target.value + 'px');
    });

    setAlarmButton.addEventListener('click', () => {
        const alarmValue = alarmInput.value;
        if (alarmValue) {
            const [hours, minutes] = alarmValue.split(':').map(Number);
            alarmTime = { hours, minutes };
        }
    });

    // Update clock every second
    setInterval(updateClock, 1000);
    updateClock(); // Initial call to display clock immediately
});