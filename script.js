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
  // Set your J-60 announcement date here
  const targetDate = new Date('2026-08-01T12:00:00').getTime(); 

  const daysEl = document.querySelector('[data-countdown-days]');
  const hoursEl = document.querySelector('[data-countdown-hours]');
  const minsEl = document.querySelector('[data-countdown-minutes]');
  const secsEl = document.querySelector('[data-countdown-seconds]');

  if (daysEl && hoursEl && minsEl && secsEl) {
      const countdownTimer = setInterval(() => {
          const now = new Date().getTime();
          const distance = targetDate - now;

          if (distance < 0) {
              clearInterval(countdownTimer);
              return;
          }

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          daysEl.innerText = days < 10 ? '0' + days : days;
          hoursEl.innerText = hours < 10 ? '0' + hours : hours;
          minsEl.innerText = minutes < 10 ? '0' + minutes : minutes;
          secsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
      }, 1000);
  }

  // --- 3. Simple Mobile Nav Toggle ---
  const navToggle = document.querySelector('[data-nav-toggle]');
  const siteNav = document.querySelector('[data-nav]');

  if (navToggle && siteNav) {
      navToggle.addEventListener('click', () => {
          const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
          navToggle.setAttribute('aria-expanded', !isExpanded);
          
          if (!isExpanded) {
              siteNav.style.display = 'flex';
              siteNav.style.flexDirection = 'column';
              siteNav.style.position = 'absolute';
              siteNav.style.top = '70px';
              siteNav.style.left = '0';
              siteNav.style.width = '100%';
              siteNav.style.background = 'rgba(10, 10, 12, 0.95)';
              siteNav.style.padding = '2rem';
          } else {
              siteNav.style.display = 'none';
          }
      });
  }
});

