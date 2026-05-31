/* =============================================
   CLUB SQUASH ALGEMESÍ — JAVASCRIPT
   ============================================= */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 30);

  // Back to top button
  document.getElementById('back-to-top').classList.toggle('visible', scrollY > 400);

  // Active nav link based on section
  updateActiveNav();

  lastScrollY = scrollY;
}, { passive: true });

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open');

  // Animate hamburger spans
  const spans = hamburger.querySelectorAll('span');
  if (hamburger.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const targetY = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  });
});

// ── Back to top ──
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Scroll reveal animation ──
const revealElements = document.querySelectorAll(
  '.install-card, .schedule-card, .pricing-card, .news-card, .subs-card, .contact-item, .stat'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (Array.from(revealElements).indexOf(entry.target) % 4));
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Reveal bigger sections
const sectionRevealEls = document.querySelectorAll(
  '.install-showcase, .subs-intro, .subs-banner, .contact-form'
);

sectionRevealEls.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ── Contact form ──
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = document.getElementById('form-submit-btn');
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Enviando...';

  // Simulate async send
  setTimeout(() => {
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Enviar mensaje';
    contactForm.reset();
    formSuccess.classList.add('visible');

    setTimeout(() => {
      formSuccess.classList.remove('visible');
    }, 4000);
  }, 1200);
});

// ── Newsletter form ──
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('newsletter-email');
  if (input.value) {
    const btn = document.getElementById('newsletter-submit');
    btn.innerHTML = '✓';
    btn.style.background = 'var(--gradient)';
    input.value = '';
    input.placeholder = '¡Suscrito!';
    setTimeout(() => {
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      input.placeholder = 'tu@email.com';
    }, 3000);
  }
});

// ── Counter animation for hero stats ──
function animateCounter(element, target, duration = 1200) {
  let start = 0;
  const increment = target / (duration / 16);
  const isFloat = target !== Math.floor(target);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    element.textContent = isFloat
      ? start.toFixed(1)
      : Math.floor(start) + (element.dataset.suffix || '');
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(num => {
        const text = num.textContent.replace(/\D/g, '');
        const hasSuffix = num.textContent.includes('+');
        if (hasSuffix) num.dataset.suffix = '+';
        const target = parseInt(text);
        if (!isNaN(target)) animateCounter(num, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ── Subtle parallax on hero ──
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroImg.style.transform = `translateY(${scrolled * 0.25}px)`;
    }
  }, { passive: true });
}
