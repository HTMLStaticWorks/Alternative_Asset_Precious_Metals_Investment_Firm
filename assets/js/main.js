/* ═══════════════════════════════════════════════════════════════════
   AUREX CAPITAL — MAIN JAVASCRIPT
   Navigation, Theme, RTL, Animations, Forms, Carousel
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── DOM Ready ─────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initTheme();
    initRTL();
    initNavbar();
    initScrollReveal();
    initTestimonials();
    initForms();
    initCountdown();
    initMarketTicker();
    initTypingEffect();

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     THEME TOGGLE (Dark / Light)
     ═══════════════════════════════════════════════════════════════ */
  function initTheme() {
    const saved = localStorage.getItem('aurex-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcons(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('aurex-theme', next);
    updateThemeIcons(next);
  }

  function updateThemeIcons(theme) {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      }
    });
    // Re-render Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Expose globally
  window.toggleTheme = toggleTheme;

  /* ═══════════════════════════════════════════════════════════════
     RTL TOGGLE
     ═══════════════════════════════════════════════════════════════ */
  function initRTL() {
    const saved = localStorage.getItem('aurex-rtl');
    if (saved === 'true') {
      document.documentElement.setAttribute('dir', 'rtl');
    }
  }

  function toggleRTL() {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    if (isRTL) {
      document.documentElement.removeAttribute('dir');
      localStorage.setItem('aurex-rtl', 'false');
    } else {
      document.documentElement.setAttribute('dir', 'rtl');
      localStorage.setItem('aurex-rtl', 'true');
    }
  }

  window.toggleRTL = toggleRTL;

  /* ═══════════════════════════════════════════════════════════════
     NAVBAR
     ═══════════════════════════════════════════════════════════════ */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.navbar__hamburger');
    const drawer = document.querySelector('.navbar__drawer');
    const overlay = document.querySelector('.navbar__overlay');
    const closeBtn = document.querySelector('.navbar__drawer-close');

    if (!navbar) return;

    // Scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      if (scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });

    // Hamburger toggle
    if (hamburger) {
      hamburger.addEventListener('click', function () {
        openDrawer();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeDrawer);
    }

    if (overlay) {
      overlay.addEventListener('click', closeDrawer);
    }

    // Close drawer on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    function openDrawer() {
      if (drawer) drawer.classList.add('open');
      if (overlay) overlay.classList.add('active');
      if (hamburger) hamburger.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      if (drawer) drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      if (hamburger) hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Active link highlight
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar__link, .navbar__drawer-link').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     SCROLL REVEAL
     ═══════════════════════════════════════════════════════════════ */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     TESTIMONIALS CAROUSEL
     ═══════════════════════════════════════════════════════════════ */
  function initTestimonials() {
    const track = document.querySelector('.testimonials__track');
    const prevBtn = document.querySelector('.testimonials__nav .prev-btn');
    const nextBtn = document.querySelector('.testimonials__nav .next-btn');
    const dotsContainer = document.querySelector('.testimonials__dots');

    if (!track) return;

    const slides = track.querySelectorAll('.testimonial');
    let current = 0;
    const total = slides.length;

    // Create dots
    if (dotsContainer) {
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.classList.add('testimonials__dot');
        dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', function () {
          goTo(i);
        });
        dotsContainer.appendChild(dot);
      }
    }

    function goTo(index) {
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      updateDots();
    }

    function updateDots() {
      if (!dotsContainer) return;
      dotsContainer.querySelectorAll('.testimonials__dot').forEach(function (dot, i) {
        dot.classList.toggle('active', i === current);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goTo(current <= 0 ? total - 1 : current - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goTo(current >= total - 1 ? 0 : current + 1);
      });
    }

    // Auto-play
    let autoplay = setInterval(function () {
      goTo(current >= total - 1 ? 0 : current + 1);
    }, 6000);

    track.closest('.testimonials__slider')?.addEventListener('mouseenter', function () {
      clearInterval(autoplay);
    });

    track.closest('.testimonials__slider')?.addEventListener('mouseleave', function () {
      autoplay = setInterval(function () {
        goTo(current >= total - 1 ? 0 : current + 1);
      }, 6000);
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     FORM VALIDATION
     ═══════════════════════════════════════════════════════════════ */
  function initForms() {
    document.querySelectorAll('[data-validate]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm(form)) {
          showFormSuccess(form);
        }
      });
    });
  }

  function validateForm(form) {
    let isValid = true;
    clearErrors(form);

    // Required fields
    form.querySelectorAll('[required]').forEach(function (field) {
      if (field.type === 'checkbox') {
        if (!field.checked) {
          showError(field, 'This field is required');
          isValid = false;
        }
      } else if (!field.value.trim()) {
        showError(field, 'This field is required');
        isValid = false;
      }
    });

    // Email validation
    form.querySelectorAll('[type="email"]').forEach(function (field) {
      if (field.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        showError(field, 'Please enter a valid email address');
        isValid = false;
      }
    });

    // Password min length
    form.querySelectorAll('[data-min-length]').forEach(function (field) {
      const min = parseInt(field.getAttribute('data-min-length'));
      if (field.value.trim() && field.value.length < min) {
        showError(field, 'Must be at least ' + min + ' characters');
        isValid = false;
      }
    });

    // Confirm password
    const password = form.querySelector('[name="password"]');
    const confirm = form.querySelector('[name="confirm-password"]');
    if (password && confirm && confirm.value && password.value !== confirm.value) {
      showError(confirm, 'Passwords do not match');
      isValid = false;
    }

    return isValid;
  }

  function showError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    const group = field.closest('.form__group');
    if (group) {
      let errorEl = group.querySelector('.form__error');
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.classList.add('form__error');
        group.appendChild(errorEl);
      }
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  function clearErrors(form) {
    form.querySelectorAll('.error').forEach(function (el) {
      el.classList.remove('error');
    });
    form.querySelectorAll('.form__error').forEach(function (el) {
      el.classList.remove('visible');
      el.textContent = '';
    });
  }

  function showFormSuccess(form) {
    const successEl = form.querySelector('.form__success');
    if (successEl) {
      successEl.classList.add('visible');
      form.reset();
      setTimeout(function () {
        successEl.classList.remove('visible');
      }, 5000);
    }

    // Mark all inputs as success briefly
    form.querySelectorAll('.form__input').forEach(function (input) {
      input.classList.add('success');
      setTimeout(function () {
        input.classList.remove('success');
      }, 3000);
    });
  }

  // Real-time validation on blur
  document.addEventListener('focusout', function (e) {
    const field = e.target;
    if (!field.closest('[data-validate]')) return;

    // Clear previous error
    field.classList.remove('error');
    const group = field.closest('.form__group');
    if (group) {
      const errorEl = group.querySelector('.form__error');
      if (errorEl) {
        errorEl.classList.remove('visible');
      }
    }

    // Validate on blur
    if (field.hasAttribute('required') && !field.value.trim()) {
      showError(field, 'This field is required');
    } else if (field.type === 'email' && field.value.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        showError(field, 'Please enter a valid email address');
      } else {
        field.classList.add('success');
      }
    } else if (field.value.trim()) {
      field.classList.add('success');
    }
  });

  /* ═══════════════════════════════════════════════════════════════
     COUNTDOWN TIMER (Coming Soon)
     ═══════════════════════════════════════════════════════════════ */
  function initCountdown() {
    const countdown = document.querySelector('.countdown');
    if (!countdown) return;

    // Set target to 90 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 90);

    function update() {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) return;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const daysEl = document.getElementById('countdown-days');
      const hoursEl = document.getElementById('countdown-hours');
      const minutesEl = document.getElementById('countdown-minutes');
      const secondsEl = document.getElementById('countdown-seconds');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  /* ═══════════════════════════════════════════════════════════════
     MARKET TICKER
     ═══════════════════════════════════════════════════════════════ */
  function initMarketTicker() {
    const track = document.querySelector('.market-ticker__track');
    if (!track) return;

    // Duplicate content for seamless loop
    const clone = track.innerHTML;
    track.innerHTML = clone + clone;
  }

  /* ═══════════════════════════════════════════════════════════════
     TYPING EFFECT (Home2 Hero)
     ═══════════════════════════════════════════════════════════════ */
  function initTypingEffect() {
    const typeEl = document.querySelector('[data-typing]');
    if (!typeEl) return;

    const words = typeEl.getAttribute('data-typing').split('|');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const speed = 80;
    const pause = 2000;

    function type() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typeEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typeEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? speed / 2 : speed;

      if (!isDeleting && charIndex === currentWord.length) {
        delay = pause;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = speed;
      }

      setTimeout(type, delay);
    }

    // Start after hero animation
    setTimeout(type, 1200);
  }

  /* ═══════════════════════════════════════════════════════════════
     SMOOTH SCROLL
     ═══════════════════════════════════════════════════════════════ */
  document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

})();
