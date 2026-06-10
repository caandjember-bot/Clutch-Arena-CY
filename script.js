document.addEventListener('DOMContentLoaded', () => {
    
  // --- 1. Canvas Particle Effect (Apex Embers) ---
  const canvas = document.getElementById('arena-canvas');
  if (canvas) {
      const ctx = canvas.getContext('2d');
      let particlesArray = [];

      function setCanvasSize() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
      }
      setCanvasSize();
      window.addEventListener('resize', setCanvasSize);

      class Particle {
          constructor() {
              this.x = Math.random() * canvas.width;
              this.y = Math.random() * canvas.height;
              this.size = Math.random() * 3 + 1;
              this.speedX = Math.random() * 1 - 0.5;
              this.speedY = Math.random() * -1 - 0.5; // Drift upwards
              this.opacity = Math.random() * 0.5 + 0.1;
          }
          update() {
              this.x += this.speedX;
              this.y += this.speedY;
              // Reset particle if it goes off screen
              if (this.y < 0) {
                  this.y = canvas.height;
                  this.x = Math.random() * canvas.width;
              }
          }
          draw() {
              ctx.fillStyle = `rgba(218, 41, 42, ${this.opacity})`; // Apex Red
              ctx.beginPath();
              ctx.rect(this.x, this.y, this.size, this.size); // Square "tech" particles
              ctx.fill();
          }
      }

      function initParticles() {
          particlesArray = [];
          for (let i = 0; i < 70; i++) {
              particlesArray.push(new Particle());
          }
      }
      initParticles();

      function animateParticles() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (let i = 0; i < particlesArray.length; i++) {
              particlesArray[i].update();
              particlesArray[i].draw();
          }
          requestAnimationFrame(animateParticles);
      }
      animateParticles();
  }

  // --- 2. Countdown Timer ---
// Set your tournament target date here
const targetDate = new Date("August 01, 2026 10:00:00").getTime(); 

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins');
const secsEl = document.getElementById('secs');

// FIX 1: Safety Guard. If these elements don't exist on the current page 
// (like rules.html), stop here so the script doesn't crash!
if (daysEl && hoursEl && minsEl && secsEl) {
    
    let countdownInterval;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // If the countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minsEl.innerText = "00";
            secsEl.innerText = "00";
            return;
        }

        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display results
        daysEl.innerText = days < 10 ? '0' + days : days;
        hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        minsEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        secsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    // Run immediately so there's no 1-second blank delay on load
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    // FIX 2: Mobile Tab Wakeup. Forces the clock to catch up instantly 
    // the exact moment a user tabs back into the website!
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            updateCountdown();
        }
    });
}

// --- 3. Clean Mobile Nav Toggle ---
const navToggle = document.querySelector('[data-nav-toggle]');
const siteNav = document.querySelector('[data-nav]');

if (navToggle && siteNav) {
    // Clear out any old lingering inline style attributes
    siteNav.removeAttribute('style');

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Simply toggle our active CSS class!
        siteNav.classList.toggle('active');
    });
}
});