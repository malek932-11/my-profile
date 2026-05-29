/* ============================================
   MALEK PORTFOLIO — MAIN JAVASCRIPT
   ============================================ */

// ─── CURSOR ───────────────────────────────────
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  trail.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  trail.style.opacity = '1';
});


// ─── NAV SCROLL ───────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


// ─── REVEAL ON SCROLL ────────────────────────
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

reveals.forEach(el => revealObserver.observe(el));


// ─── COUNTER ANIMATION ───────────────────────
const counters = document.querySelectorAll('.stat-num[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      const target = parseInt(entry.target.dataset.count);
      const duration = 1500;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
          entry.target.textContent = target + '+';
        } else {
          entry.target.textContent = Math.floor(current);
        }
      }, 16);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));


// ─── SKILL BARS ──────────────────────────────
const skillBars = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      const targetWidth = entry.target.dataset.w + '%';
      setTimeout(() => {
        entry.target.style.width = targetWidth;
      }, 200);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));


// ─── SMOOTH ANCHOR SCROLL ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ─── PROJECT CARD TILT ───────────────────────
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -3;
    const rotY = ((x - centerX) / centerX) * 3;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  });
});


// ─── GLITCH EFFECT ON HERO NAME ──────────────
const heroName = document.querySelector('.hero-name');
let glitchTimeout;

if (heroName) {
  heroName.addEventListener('mouseenter', () => {
    heroName.classList.add('glitching');
    clearTimeout(glitchTimeout);
    glitchTimeout = setTimeout(() => {
      heroName.classList.remove('glitching');
    }, 400);
  });
}


// ─── TERMINAL TYPEWRITER ON LOAD ─────────────
window.addEventListener('load', () => {
  const tag = document.querySelector('.hero-tag span:last-child');
  if (!tag) return;

  const fullText = tag.textContent;
  tag.textContent = '';
  let i = 0;

  const type = () => {
    if (i < fullText.length) {
      tag.textContent += fullText[i];
      i++;
      setTimeout(type, 35);
    }
  };

  setTimeout(type, 600);
});


// ─── PAGE ENTRANCE ANIMATION ─────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});


// ─── ACTIVE NAV LINK ON SCROLL ───────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeObserver.observe(s));


// ─── KONAMI CODE EASTER EGG ──────────────────
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      triggerEasterEgg();
    }
  } else {
    konamiIndex = 0;
  }
});

function triggerEasterEgg() {
  const msg = document.createElement('div');
  msg.innerHTML = '🎮 مَلَكوت Mode Activated';
  msg.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--accent);
    color: #000;
    padding: 1.5rem 3rem;
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    z-index: 99999;
    animation: fadeEgg 2.5s forwards;
    pointer-events: none;
    clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px));
  `;
  document.body.appendChild(msg);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeEgg {
      0% { opacity: 0; transform: translate(-50%, -40%) scale(0.8); }
      20% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
      80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -60%) scale(0.95); }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    msg.remove();
    style.remove();
  }, 2600);
}

console.log(`
 ███╗   ███╗ █████╗ ██╗     ███████╗██╗  ██╗
 ████╗ ████║██╔══██╗██║     ██╔════╝██║ ██╔╝
 ██╔████╔██║███████║██║     █████╗  █████╔╝ 
 ██║╚██╔╝██║██╔══██║██║     ██╔══╝  ██╔═██╗ 
 ██║ ╚═╝ ██║██║  ██║███████╗███████╗██║  ██╗
 ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
 
 Hey there, developer 👀
 You found the console. Try the Konami Code!
 ↑↑↓↓←→←→BA
`);
