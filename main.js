const parallax = document.getElementById("home-img-lg");
const parallax1 = document.getElementById("parallax1");
const parallax2 = document.getElementById("parallax2");

window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionX = offset*(-0.3)-100 + "px";
})


window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    offset-=3100;
    parallax1.style.backgroundPositionY = offset*(0.1) + "px";
})

window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    offset-=4800;
    parallax2.style.backgroundPositionY = offset*(-0.1) + "px";
})

function myFunction() {
    document.getElementById("check").checked = false;
  }


  
function reveal() {
var reveals = document.querySelectorAll(".reveal");
  
for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
}
  
window.addEventListener("scroll", reveal);

function updateCountdown() {
  const weddingDate = new Date("April 19, 2026 00:00:00").getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const time = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
  };

  updateCard("days-card", time.days);
  updateCard("hours-card", time.hours);
  updateCard("minutes-card", time.minutes);
  updateCard("seconds-card", time.seconds);
}

function updateCard(id, value) {
  const card = document.getElementById(id);
  if (!card) return; 

  const displayValue = value < 10 ? "0" + value : value.toString();
  
  const top = card.querySelector(".top");
  const bottom = card.querySelector(".bottom");
  const leafFront = card.querySelector(".leaf-front");
  const leafBack = card.querySelector(".leaf-back");

  if (top.innerText !== displayValue) {
      // 1. Set the NEXT number on the back of the leaf
      leafBack.innerText = displayValue;
      
      // 2. Start the animation
      card.classList.add("flipping");

      // 3. WAIT for the leaf to fall (600ms) before updating static plates
      setTimeout(() => {
          // Now that the leaf has landed, update everything else
          top.innerText = displayValue;
          leafFront.innerText = displayValue;
          bottom.innerText = displayValue;
          
          // 4. Reset the leaf position instantly behind the scenes
          card.classList.remove("flipping");
      }, 350); 
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();


function fadeIn(audio) {
  let vol = 0;
  const maxVolume = 0.25; // LOW volume

  audio.volume = 0;

  const fade = setInterval(() => {
    if (vol < maxVolume) {
      vol += 0.01;
      audio.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 50);
}

function fadeOut(audio) {
  let vol = audio.volume;

  const fade = setInterval(() => {
    if (vol > 0.01) {
      vol -= 0.01;
      audio.volume = vol;
    } else {
      audio.pause();
      clearInterval(fade);
    }
  }, 50);
}

const music = document.getElementById("bgMusic");
const toggle = document.getElementById("musicToggle");

let isPlaying = false;
let started = false;

// BUTTON CONTROL
toggle.addEventListener("click", startMusic);

function startMusic() {
  if (!isPlaying) {
    music.play();
    fadeIn(music);
    toggle.classList.add("playing");
    isPlaying = true;
  } else {
    fadeOut(music);
    toggle.classList.remove("playing");
    isPlaying = false;
  }
}

// FIRST SCROLL AUTOSTART
window.addEventListener("scroll", () => {
  if (!started) {
    startMusic();
    started = true;
  }
}, { once: true });

music.addEventListener("canplaythrough", () => {
  console.log("Music loaded successfully");
});

music.addEventListener("error", () => {
  console.log("Music failed to load");
});

document.addEventListener("click", () => {
  if (!started) {
    startMusic();
    started = true;
  }
}, { once: true });
