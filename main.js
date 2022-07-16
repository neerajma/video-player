let playBtn = document.getElementById("play-btn");
let video = document.querySelector(".video");
let progressBar = document.querySelector(".progress-bar");
let progressRange = document.querySelector(".progress-range");
let timeElapsed = document.querySelector(".time-elapsed");
let timeDuration = document.querySelector(".time-duration");
let volumeRange = document.querySelector(".volume-range");
let volumeBar = document.querySelector(".volume-bar");

let isPlaying = false;
let currentPosition;
let currentDuration;
let totalTime;
let width;

function PlayPausevideo() {
    if (!isPlaying) {
        video.play();
        isPlaying = true;
        playBtn.classList.replace("fa-play", "fa-pause");
    } else {
        video.pause();
        isPlaying = false;
        playBtn.classList.replace("fa-pause", "fa-play");
    }
}

function spaceBarPausePlay(e) {
    if (e.keyCode === 32) {
        PlayPausevideo();
    }
}

function progressBarRun(e) {
    currentPosition = e.target.currentTime;
    totalTime = e.target.duration;
    width = (e.target.currentTime / e.target.duration) * 100;
    progressBar.style.cssText = `width : ${width}%`;
    let totalTimeInHour = Math.floor(totalTime / 3600);
    let totalTimeinMin = Math.floor((totalTime - totalTimeInHour * 3600) / 60);
    let totalTimeInSec = Math.floor((totalTime - totalTimeInHour * 3600) % 60);

    if (totalTimeInHour === 0) {
        timeDuration.innerHTML = `${totalTimeinMin}:${totalTimeInSec}`;

    } else {
        timeDuration.innerHTML = `${totalTimeInHour}:${totalTimeinMin}:${totalTimeInSec}`;
    }
    let currrentTimeInHour = Math.floor(currentPosition / 3600);
    let currrentTimeinMin = Math.floor((currentPosition - currrentTimeInHour * 3600) / 60);
    let currrentTimeInSec = Math.floor((currentPosition - currrentTimeInHour * 3600) % 60);
    console.log(currrentTimeInHour, currrentTimeinMin, currrentTimeInSec)
    if (currrentTimeInHour === 0) {
        timeElapsed.innerHTML = `${currrentTimeinMin}:${currrentTimeInSec}`;

    } else {
        timeElapsed.innerHTML = `${currrentTimeInHour}:${currrentTimeinMin}:${currrentTimeInSec}`;
    }
}

function seekProgressBar(e) {
    let progressBarWidth
    if (e.target.className == 'progress-bar') {

        progressBarWidth = e.target.parentElement.offsetWidth;
    } else {
        progressBarWidth = e.target.offsetWidth;
    }
    currentPosition = e.offsetX;
    let currentTimePos = (currentPosition / progressBarWidth) * totalTime;
    width = (currentTimePos / totalTime) * 100;
    progressBar.style.cssText = `width : ${width}%`;
    video.currentTime = currentTimePos;

}

function seekvolumeRangeBar(e) {
    let volumeBarWidth;
    if (e.target.className === "volume-bar") {

        volumeBarWidth = (e.target.parentElement.offsetWidth);
    } else {
        volumeBarWidth = (e.target.offsetWidth);
    }
    let clickWidth = (e.offsetX);
    let volumeRangeWidth = (clickWidth / volumeBarWidth) * 100;
    volumeBar.style.cssText = `width:${volumeRangeWidth}%`;
    video.volume = (volumeRangeWidth / 100);
    console.log(video.volume)

}

playBtn.addEventListener("click", PlayPausevideo);
video.addEventListener("click", PlayPausevideo);
document.addEventListener("keyup", spaceBarPausePlay);
video.addEventListener("timeupdate", progressBarRun);
progressRange.addEventListener("click", seekProgressBar);
volumeRange.addEventListener("click", seekvolumeRangeBar);