var timerInterval;
var stopwatchInterval;
var timerRunning = false;
var stopwatchRunning = false;

function startTimer()
{
    if (!timerRunning)
    {
        var hours = parseInt(document.getElementById("timer-hours").textContent);
        var minutes = parseInt(document.getElementById("timer-minutes").textContent);
        var seconds = parseInt(document.getElementById("timer-seconds").textContent);

        var totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

        if (totalSeconds > 0)
        {
            timerInterval = setInterval(decrementTimer, 1000);
            timerRunning = true;
        }
    }
}

function pauseTimer()
{
    if (timerRunning)
    {
        clearInterval(timerInterval);
        timerRunning = false;
    }
}

function resetTimer()
{
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById("timer-hours").textContent = "00";
    document.getElementById("timer-minutes").textContent = "00";
    document.getElementById("timer-seconds").textContent = "00";
}

function decrementTimer()
{
    var hours = parseInt(document.getElementById("timer-hours").textContent);
    var minutes = parseInt(document.getElementById("timer-minutes").textContent);
    var seconds = parseInt(document.getElementById("timer-seconds").textContent);

    if (hours === 0 && minutes === 0 && seconds === 0)
    {
        pauseTimer();
        return;
    }

    if (seconds === 0)
    {
        if (minutes === 0)
        {
            hours--;
            minutes = 59;
        } else
        {
            minutes--;
        }
        seconds = 59;
    } else
    {
        seconds--;
    }

    document.getElementById("timer-hours").textContent = padZero(hours);
    document.getElementById("timer-minutes").textContent = padZero(minutes);
    document.getElementById("timer-seconds").textContent = padZero(seconds);
}

function padZero(value)
{
    return value.toString().padStart(2, "0");
}

function startStopwatch()
{
    if (!stopwatchRunning)
    {
        var startTime = new Date().getTime();
        stopwatchInterval = setInterval(function ()
        {
            var elapsedTime = new Date().getTime() - startTime;
            updateStopwatch(elapsedTime);
        }, 10);
        stopwatchRunning = true;
    }
}

function pauseStopwatch()
{
    if (stopwatchRunning)
    {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
    }
}

function resetStopwatch()
{
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    document.getElementById("stopwatch-minutes").textContent = "00";
    document.getElementById("stopwatch-seconds").textContent = "00";
    document.getElementById("stopwatch-milliseconds").textContent = "000";
}

function updateStopwatch(elapsedTime)
{
    var minutes = Math.floor(elapsedTime / 60000);
    var seconds = Math.floor((elapsedTime % 60000) / 1000);
    var milliseconds = elapsedTime % 1000;

    document.getElementById("stopwatch-minutes").textContent = padZero(minutes);
    document.getElementById("stopwatch-seconds").textContent = padZero(seconds);
    document.getElementById("stopwatch-milliseconds").textContent = padZero(milliseconds, 3);
}

function setTimer()
{
    var hoursInput = prompt("Enter the number of hours:");
    var minutesInput = prompt("Enter the number of minutes:");
    var secondsInput = prompt("Enter the number of seconds:");

    var hours = parseInt(hoursInput) || 0;
    var minutes = parseInt(minutesInput) || 0;
    var seconds = parseInt(secondsInput) || 0;

    document.getElementById("timer-hours").textContent = padZero(hours);
    document.getElementById("timer-minutes").textContent = padZero(minutes);
    document.getElementById("timer-seconds").textContent = padZero(seconds);
}

document.getElementById("set-timer-btn").addEventListener("click", setTimer);
