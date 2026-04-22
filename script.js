/* ================================================
   SANDESH KURHADE — PORTFOLIO SCRIPT
   ================================================ */

/* ================================================
   EMAILJS CONFIG — Paste your keys here
   ================================================ */
const EMAILJS_PUBLIC_KEY  = 'o1HSD1xLbEXOYvW65';       // Account → General
const EMAILJS_SERVICE_ID  = 'service_9et5dxl';       // Email Services
const EMAILJS_TEMPLATE_ID = 'template_41licam';      // Email Templates

document.addEventListener('DOMContentLoaded', () => {
  // Init EmailJS
  emailjs.init(EMAILJS_PUBLIC_KEY);

  initTheme();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initSkillBars();
  initActiveNav();
  initTyped();
  initCounters();
  initResumeBtn();
});

/* ================================================
   THEME TOGGLE — Dark / Light
   ================================================ */
function initTheme() {
  const toggles = [document.getElementById('themeToggle')].filter(Boolean);
  const icons   = [document.getElementById('themeIcon')].filter(Boolean);
  const html    = document.documentElement;

  const saved = localStorage.getItem('sk-theme') || 'dark';
  applyTheme(saved);

  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('sk-theme', next);
    });
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    icons.forEach(icon => {
      icon.className = theme === 'dark' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
    });
  }
}

/* ================================================
   NAVBAR — scroll effect
   ================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* ================================================
   MOBILE MENU
   ================================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobileDrawer');
  const hamIcon   = document.getElementById('hamIcon');
  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeMenu() : openMenu();
  });

  document.querySelectorAll('.mob-link').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !drawer.contains(e.target)) closeMenu();
  });

  function openMenu() {
    drawer.classList.add('open');
    drawer.style.display = 'flex';
    hamburger.setAttribute('aria-expanded', 'true');
    hamIcon.className = 'bi bi-x-lg';
    requestAnimationFrame(() => {
      drawer.style.opacity = '1';
      drawer.style.transform = 'translateY(0)';
    });
  }

  function closeMenu() {
    drawer.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamIcon.className = 'bi bi-list';
  }
}

/* ================================================
   SMOOTH SCROLL
   ================================================ */
function initSmoothScroll() {
  const NAV_H = 68;
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - NAV_H, behavior: 'smooth' });
    });
  });
}

/* ================================================
   ACTIVE NAV LINK
   ================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const pills    = document.querySelectorAll('.nav-pill, .mob-link');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        pills.forEach(p => {
          p.classList.remove('active');
          if (p.getAttribute('href') === `#${id}`) p.classList.add('active');
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => obs.observe(s));
}

/* ================================================
   SCROLL REVEAL
   ================================================ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const parent   = entry.target.parentElement;
      const siblings = Array.from(parent.querySelectorAll('.reveal'));
      const idx      = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 80, 400));
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ================================================
   SKILL BARS
   ================================================ */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  fills.forEach(f => obs.observe(f));
}

/* ================================================
   TYPED TEXT
   ================================================ */
function initTyped() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'Aspiring Full Stack Developer',
    'JavaScript Enthusiast',
    'Problem Solver',
    'Web Development Learner',
    'AWS Certified Student',
  ];

  let pIdx = 0, cIdx = 0, deleting = false;

  function tick() {
    const phrase = phrases[pIdx];
    el.textContent = deleting ? phrase.slice(0, --cIdx) : phrase.slice(0, ++cIdx);

    if (!deleting && cIdx === phrase.length) {
      setTimeout(() => { deleting = true; tick(); }, 2000);
      return;
    }
    if (deleting && cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
    }
    setTimeout(tick, deleting ? 42 : 78);
  }
  setTimeout(tick, 1000);
}

/* ================================================
   STATS COUNTER
   ================================================ */
function initCounters() {
  const nums = document.querySelectorAll('.stat-num');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el   = entry.target;
      const raw  = el.textContent.trim();
      const end  = parseFloat(raw.replace(/[^0-9.]/g, ''));
      const isF  = raw.includes('.');
      const isP  = raw.includes('%');
      const isPlus = raw.includes('+');
      let cur = 0;
      const step = end / 55;

      const timer = setInterval(() => {
        cur = Math.min(cur + step, end);
        const val = isF ? cur.toFixed(1) : Math.floor(cur);
        el.textContent = val + (isP ? '%' : '') + (isPlus ? '+' : '');
        if (cur >= end) clearInterval(timer);
      }, 16);

      obs.unobserve(el);
    });
  }, { threshold: 0.8 });
  nums.forEach(n => obs.observe(n));
}

/* ================================================
   RESUME BUTTON — View & Download
   ================================================ */
function initResumeBtn() {
  const resumeBtn = document.getElementById('resumeBtn');
  if (!resumeBtn) return;

  resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Open resume in new tab so user can view + download
    const resumeUrl = 'newresumesandeshagainupdataed.pdf';
    window.open(resumeUrl, '_blank');
  });
}

/* ================================================
   CONTACT FORM — EmailJS real email
   ================================================ */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('sendBtn');
  if (!btn) return;

  // Get form values
  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    showToast('⚠ Please fill all fields!');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('⚠ Please enter a valid email!');
    return;
  }

  // Show loading state
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
  btn.disabled = true;

  // Send via EmailJS
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:  name,
    from_email: email,
    subject:    subject,
    message:    message,
    to_email:   'Sandeshkurhade88@gmail.com',
  })
  .then(() => {
    btn.innerHTML = '<i class="bi bi-check2-circle"></i> Message Sent!';
    showToast('✓ Message sent to Sandesh successfully!');

    // Clear form
    document.getElementById('contactName').value    = '';
    document.getElementById('contactEmail').value   = '';
    document.getElementById('contactSubject').value = '';
    document.getElementById('contactMessage').value = '';

    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled  = false;
    }, 3000);
  })
  .catch((err) => {
    console.error('EmailJS error:', err);
    btn.innerHTML = '<i class="bi bi-exclamation-circle"></i> Failed!';
    showToast('✗ Failed to send. Please try again!');
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled  = false;
    }, 3000);
  });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ================================================
   HOBBY CARD — 3D tilt
   ================================================ */
if (window.innerWidth >= 768) {
  document.querySelectorAll('.skill-card, .cert-card, .hobby-card, .tl-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top)  / r.height - 0.5) * -8;
      const ry = ((e.clientX - r.left) / r.width  - 0.5) *  8;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ================================================
   CURSOR GLOW
   ================================================ */
if (window.innerWidth >= 1024) {
  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position: 'fixed',
    width: '280px', height: '280px',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: '0',
    background: 'radial-gradient(circle, rgba(0,229,160,0.04) 0%, transparent 70%)',
    transform: 'translate(-50%,-50%)',
    transition: 'left 0.12s ease, top 0.12s ease',
  });
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
}
