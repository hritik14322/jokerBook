/* ═══════════════════════════════════════════════════════════
   JOKER BOOK — Premium Gaming Website JavaScript
   ═══════════════════════════════════════════════════════════ */

// ── HEADER SCROLL EFFECT ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}, { passive: true });

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
// Close on nav link click
document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── ACTIVE NAV LINK on SCROLL ──
const sections = ['home','about','games','partners','users','services'];
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && href.includes(current)) link.classList.add('active');
  });
}, { passive: true });

// ── HERO SLIDER ──
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let sliderTimer;

function goToSlide(idx) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (idx + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startAutoSlide() {
  clearInterval(sliderTimer);
  sliderTimer = setInterval(nextSlide, 5000);
}

document.getElementById('slider-next').addEventListener('click', () => { nextSlide(); startAutoSlide(); });
document.getElementById('slider-prev').addEventListener('click', () => { prevSlide(); startAutoSlide(); });
dots.forEach((dot, i) => dot.addEventListener('click', () => { goToSlide(i); startAutoSlide(); }));
startAutoSlide();

// ── SCROLL TO TOP ──
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) scrollTopBtn.classList.add('visible');
  else scrollTopBtn.classList.remove('visible');
}, { passive: true });
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── LIVE TICKER (rotating messages) ──
const liveMessages = [
  '🎉 Kartik from Jaipur just won ₹48,000 on Teen Patti!',
  '🏆 Rahul from Mumbai just won ₹2,40,000 on Cricket!',
  '💰 Priya from Delhi just withdrew ₹85,000 instantly!',
  '🃏 Vikram from Surat just won ₹1,20,000 on Andar Bahar!',
  '⚡ 247 players are online right now — Join the action!',
  '🎲 Arjun from Bangalore is on a 10-game winning streak!',
  '🔥 New record: ₹12,50,000 won in a single Casino session!',
];
const liveText = document.getElementById('live-text');
let msgIdx = 0;
function rotateLiveTicker() {
  msgIdx = (msgIdx + 1) % liveMessages.length;
  liveText.style.opacity = '0';
  liveText.style.transform = 'translateY(8px)';
  setTimeout(() => {
    liveText.textContent = liveMessages[msgIdx];
    liveText.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    liveText.style.opacity = '1';
    liveText.style.transform = 'translateY(0)';
  }, 400);
}
setInterval(rotateLiveTicker, 4000);

// ── INTERSECTION OBSERVER — REVEAL ON SCROLL ──
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease both';
      entry.target.style.opacity = '1';
    }
  });
}, observerOptions);

const revealEls = document.querySelectorAll('.game-card, .stat-banner-card, .service-card, .ticker-item, .about-feat, .stat');
revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.animationDelay = (i * 0.07) + 's';
  revealObserver.observe(el);
});

// ── PARALLAX PARTICLES ON MOUSEMOVE ──
const heroSection = document.getElementById('home');
const particles = document.querySelectorAll('.particle');
heroSection && heroSection.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const { innerWidth, innerHeight } = window;
  const xRatio = (clientX / innerWidth - 0.5) * 2;
  const yRatio = (clientY / innerHeight - 0.5) * 2;
  particles.forEach((p, i) => {
    const depth = (i + 1) * 5;
    p.style.transform = `translate(${xRatio * depth}px, ${yRatio * depth}px)`;
  });
}, { passive: true });

// ── GAME CARD TILT EFFECT ──
document.querySelectorAll('.game-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });
});

// ── SERVICE CARD HOVER GLOW CURSOR ──
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,215,0,0.07) 0%, rgba(255,255,255,0.03) 60%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// ── SMOOTH SCROLL FOR ANCHOR LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  });
});

console.log('%c🃏 JOKER BOOK — World\'s No.1 Book Loaded!', 'background:#FFD700;color:#000;font-size:1.2rem;font-weight:900;padding:8px 16px;border-radius:4px;');
