// declare the varibale using DOM
let trackImage = document.querySelector(".trackImage");
let trackName = document.querySelector(".trackName");
let trackArtist = document.querySelector(".trackArtist");
let audioTag = document.querySelector(".audioTag");
let playBtn = document.querySelector(".playBtn");
let pauseBtn = document.querySelector(".pauseBtn");
let totalDiplay = document.querySelector(".totalDisplay");
let currentDisplay = document.querySelector(".currentDisplay");
let currentTime = document.querySelector(".currentTime");
let bgcontainer = document.querySelector(".bgcontainer");
let totalLength = document.querySelector(".totalTimeLength");
let count = 0;
let isPlay = false;

// song array
const songList = [
  {
    name: "Fictional",
    artist: "Khole Rose",
    image: "./Images/image1.jpg",
    path: "./audio/song1.mp3",
  },
  {
    name: "Turn the page",
    artist: "Sam Lin",
    image: "./Images/image2.jpeg",
    path: "./audio/song2.mp3",
  },
  {
    name: "Takeaway",
    artist: "The Chainsmokers,ILLENIUM",
    image: "./Images/image3.jpg",
    path: "./audio/song3.mp3",
  },
  {
    name: "Complicated",
    artist: "Dimitri Vegas,Like Mike,David Guetta,Kiiar",
    image: "./Images/image4.jpeg",
    path: "./audio/song4.mp3",
  },
  {
    name: "I Can Do It With A Broken Heart",
    artist: "Taylor Swift",
    image: "./Images/image5.jpeg",
    path: "./audio/song5.mp3",
  },
];

// function start
function start() {
  bgcontainer.style.backgroundImage = "url(" + songList[count].image + ")";
  trackImage.style.backgroundImage = "url(" + songList[count].image + ")";
  trackName.innerHTML = songList[count].name;
  trackArtist.innerHTML = songList[count].artist;
  audioTag.src = songList[count].path;
}

// play function
function playSong() {
  isPlay = true;
  trackImage.classList.add("round");
  audioTag.play();
  playBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
  
}

// pause function
function pauseSong() {
  isPlay = false;
  trackImage.classList.remove("round");
  audioTag.pause();
  playBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
}

// next function
function next() {
  if (count == 4) {
    return;
  }
  if (count < 5) {
    count++;
    start();
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
  }
  trackImage.classList.remove("round");
  
  
}

// previous function
function previous() {
  if (count > 0) {
    count--;
    start();
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
  }
  trackImage.classList.remove("round");
}

// display song time
audioTag.addEventListener("loadeddata", function () {
  let totalDuration = Math.floor(audioTag.duration);
  let minutes = Math.floor(totalDuration / 60);
  let seconds = Math.floor(totalDuration % 60);
  totalDiplay.textContent =
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);

  audioTag.addEventListener("timeupdate", function () {
    let currentDuration = audioTag.currentTime;
    let minutes = Math.floor(currentDuration / 60);
    let seconds = Math.floor(currentDuration % 60);
    currentDisplay.textContent =
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);
    currentTime.style.width = (currentDuration / totalDuration) * 100 + "%";
  });

  // When the song finishes, ensure the button reverts to the 'play' state
  audioTag.addEventListener('ended', function() {
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
    next();
    trackImage.classList.remove("round");
  });
});


// progress on change
totalLength.addEventListener("click", (e) => {
  let widthbar2 = (e.offsetX/e.target.clientWidth) * audioTag.duration;
  audioTag.currentTime = widthbar2;
})

start();


