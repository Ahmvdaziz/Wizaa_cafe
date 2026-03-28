javascript
/* ============================================================
   VELOUR CAFÉ — script.js
   Premium Luxury Café — Complete JavaScript
   ============================================================ */

'use strict';

/* ── 1. SLIDER ────────────────────────────────────────────── */
(function initSlider() {

  const slides       = document.querySelectorAll('.slide');
  const dots         = document.querySelectorAll('.dot');
  const prevBtn      = document.getElementById('prevBtn');
  const nextBtn      = document.getElementById('nextBtn');
  const progressBar  = document.getElementById('progressBar');
  const currentLabel = document.getElementById('currentSlide');

  const SLIDE_DURATION = 6000; // ms each slide stays
  const PROGRESS_TICK  = 30;   // ms between progress bar updates

  let current       = 0;
  let autoPlayTimer = null;
  let progressTimer = null;
  let progressVal   = 0;
  let isPaused      = false;
  let isAnimating   = false;

  /* ── helpers ── */
  function pad(n) {
    return String(n + 1).padStart(2, '0');
  }

  function clearTimers() {
    clearInterval(autoPlayTimer);
    clearInterval(progressTimer);
  }

  function resetProgress() {
    progressVal = 0;
    if (progressBar) progressBar.style.transition = 'none';
    if (progressBar) progressBar.style.width = '0%';
  }

  function startProgress() {
    resetProgress();
    let elapsed = 0;
    // Allow the CSS transition reset to flush before re-enabling
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (progressBar) {
          progressBar.style.transition = `width ${SLIDE_DURATION}ms linear`;
          progressBar.style.width = '100%';
        }
      });
    });
  }

  /* ── core: go to slide n ── */
  function goTo(index, direction) {
    if (isAnimating || index === current) return;
    isAnimating = true;

    const outgoing = slides[current];
    const incoming = slides[index];

    // Mark outgoing as "prev" so it sits behind but fades out
    outgoing.classList.remove('active');
    outgoing.classList.add('prev');

    // Activate incoming
    incoming.classList.add('active');

    // Update dots
    dots[current].classList.remove('active');
    dots[index].classList.add('active');

    // Update counter
    if (currentLabel) currentLabel.textContent = pad(index);

    current = index;

    // Clean up prev class after transition
    setTimeout(() => {
      outgoing.classList.remove('prev');
      isAnimating = false;
    }, 1100); // matches the CSS opacity transition duration

    startProgress();
  }

  function next() {
    const n = (current + 1) % slides.length;
    goTo(n, 'next');
  }

  function prev() {
    const n = (current - 1 + slides.length) % slides.length;
    goTo(n, 'prev');
  }

  /* ── auto-play ── */
  function startAutoPlay() {
    clearTimers();
    if (isPaused) return;
    autoPlayTimer = setInterval(() => {
      if (!isPaused) next();
    }, SLIDE_DURATION);
    startProgress();
  }

  function stopAutoPlay() {
    clearTimers();
    resetProgress();
  }

  /* ── event listeners ── */
  if (nextBtn) nextBtn.addEventListener('click', () => {
    next();
    stopAutoPlay();
    startAutoPlay();
  });

  if (prevBtn) prevBtn.addEventListener('click', () => {
    prev();
    stopAutoPlay();
    startAutoPlay();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index, 10);
      goTo(idx);
      stopAutoPlay();
      startAutoPlay();
    });
  });

  // Pause on hover over the entire hero
  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('mouseenter', () => {
      isPaused = true;
      stopAutoPlay();
    });
    hero.addEventListener('mouseleave', () => {
      isPaused = false;
      startAutoPlay();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { next(); stopAutoPlay(); startAutoPlay(); }
    if (e.key === 'ArrowLeft')  { prev(); stopAutoPlay(); startAutoPlay(); }
  });

  // Touch / swipe support
  let touchStartX = 0;
  let touchEndX   = 0;
  if (hero) {
    hero.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    hero.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? next() : prev();
        stopAutoPlay();
        startAutoPlay();
      }
    }, { passive: true });
  }

  /* ── init ── */
  if (slides.length > 0) {
    slides[0].classList.add('active');
    if (currentLabel) currentLabel.textContent = pad(0);
    startAutoPlay();
  }

})();


/* ── 2. NAVBAR ────────────────────────────────────────────── */
(function initNavbar() {

  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (!navbar) return;

  /* Scroll → solid navbar */
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* Hamburger toggle */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Active nav link highlight based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks ? navLinks.querySelectorAll('a') : [];

  function highlightNav() {
    let found = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 100) found = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active-nav',
        a.getAttribute('href') === '#' + found
      );
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });

})();


/* ── 3. SCROLL ANIMATIONS ─────────────────────────────────── */
(function initScrollAnimations() {

  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));

})();


/* ── 4. MENU TABS ─────────────────────────────────────────── */
(function initMenuTabs() {

  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.menu-panel');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      // Update buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panels with a fade transition
      tabPanels.forEach(panel => {
        if (panel.id === 'tab-' + target) {
          panel.style.opacity = '0';
          panel.style.display = 'block';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              panel.style.transition = 'opacity .4s ease';
              panel.style.opacity = '1';
            });
          });
          panel.classList.add('active');

          // Re-trigger scroll animations for newly visible items
          panel.querySelectorAll('[data-animate]').forEach(el => {
            el.classList.remove('in-view');
            setTimeout(() => el.classList.add('in-view'), 80);
          });
        } else {
          panel.style.display = 'none';
          panel.style.opacity = '0';
          panel.classList.remove('active');
        }
      });
    });
  });

})();


/* ── 5. GALLERY LIGHTBOX ──────────────────────────────────── */
(function initLightbox() {

  const galleryItems  = document.querySelectorAll('.gallery-item');
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev  = document.getElementById('lightboxPrev');
  const lightboxNext  = document.getElementById('lightboxNext');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxCounter = document.getElementById('lightboxCounter');

  if (!lightbox || !galleryItems.length) return;

  let currentIndex = 0;
  const sources = Array.from(galleryItems).map(item => item.dataset.src);
  const alts    = Array.from(galleryItems).map(item =>
    item.querySelector('img') ? item.querySelector('img').alt : ''
  );

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    if (!lightboxImg) return;

    // Fade out
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.97)';

    setTimeout(() => {
      lightboxImg.src = sources[currentIndex];
      lightboxImg.alt = alts[currentIndex];

      lightboxImg.onload = () => {
        lightboxImg.style.transition = 'opacity .35s ease, transform .35s ease';
        lightboxImg.style.opacity    = '1';
        lightboxImg.style.transform  = 'scale(1)';
      };

      // Fallback if already cached
      if (lightboxImg.complete) {
        lightboxImg.style.transition = 'opacity .35s ease, transform .35s ease';
        lightboxImg.style.opacity    = '1';
        lightboxImg.style.transform  = 'scale(1)';
      }

      if (lightboxCounter) {
        lightboxCounter.textContent =
          (currentIndex + 1) + ' / ' + sources.length;
      }
    }, 180);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + sources.length) % sources.length;
    updateLightboxImage();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % sources.length;
    updateLightboxImage();
  }

  // Open on click
  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  // Controls
  if (lightboxClose)   lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  if (lightboxPrev)    lightboxPrev.addEventListener('click', e => { e.stopPropagation(); showPrev(); });
  if (lightboxNext)    lightboxNext.addEventListener('click', e => { e.stopPropagation(); showNext(); });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowRight')  showNext();
    if (e.key === 'ArrowLeft')   showPrev();
  });

  // Touch swipe inside lightbox
  let lbTouchStart = 0;
  lightbox.addEventListener('touchstart', e => {
    lbTouchStart = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const diff = lbTouchStart - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) diff > 0 ? showNext() : showPrev();
  }, { passive: true });

})();


/* ── 6. CONTACT FORM ──────────────────────────────────────── */
(function initContactForm() {

  const form        = document.getElementById('contactForm');
  const successMsg  = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Basic client-side validation
    let valid = true;
    const required = form.querySelectorAll('[required]');

    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#c0392b';
        valid = false;
      }
      if (field.type === 'email' && field.value) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(field.value)) {
          field.style.borderColor = '#c0392b';
          valid = false;
        }
      }
    });

    if (!valid) return;

    // Simulate async form submission
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.querySelector('span').textContent = 'Sending…';
    }

    setTimeout(() => {
      form.reset();
      if (btn) {
        btn.disabled = false;
        btn.querySelector('span').textContent = 'Send Reservation Request';
      }
      if (successMsg) {
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 6000);
      }
    }, 1600);
  });

  // Clear red border on input
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
    });
  });

})();


/* ── 7. NEWSLETTER FORM ───────────────────────────────────── */
(function initNewsletter() {

  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn   = form.querySelector('button');

    if (!input || !input.value.trim()) return;

    if (btn) {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = 'ri-check-line';
        btn.style.background = '#27ae60';
      }
    }

    setTimeout(() => {
      form.reset();
      if (btn) {
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'ri-arrow-right-line';
        btn.style.background = '';
      }
    }, 3000);
  });

})();


/* ── 8. BACK TO TOP ───────────────────────────────────────── */
(function initBackToTop() {

  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();


/* ── 9. SMOOTH SCROLL FOR ALL ANCHOR LINKS ────────────────── */
(function initSmoothScroll() {

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue('--nav-h'), 10
        ) || 80;
        const top = target.getBoundingClientRect().top
                  + window.pageYOffset
                  - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();


/* ── 10. PARALLAX EFFECT ON HERO ──────────────────────────── */
(function initParallax() {

  const hero = document.getElementById('hero');
  if (!hero) return;

  // Only run on 
   // Only run on non-touch devices for performance
  if (window.matchMedia('(hover: hover)').matches) {

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;
          const heroH   = hero.offsetHeight;

          // Only apply while hero is in view
          if (scrollY < heroH) {
            const slides = hero.querySelectorAll('.slide.active');
            slides.forEach(slide => {
              slide.style.transform =
                `translateY(${scrollY * 0.25}px)`;
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

})();


/* ── 11. COUNTER ANIMATION (About Stats) ──────────────────── */
(function initCounters() {

  const stats = document.querySelectorAll('.stat-number');
  if (!stats.length) return;

  function animateCounter(el) {
    const raw    = el.textContent.trim();
    const suffix = raw.replace(/[\d.]/g, '');   // e.g. '+', '%'
    const target = parseFloat(raw);
    if (isNaN(target)) return;

    const duration = 1800; // ms
    const steps    = 60;
    const stepTime = duration / steps;
    let current    = 0;
    let step       = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out curve
      const progress = 1 - Math.pow(1 - step / steps, 3);
      current = target * progress;

      // Format: if original had decimal, keep one place
      el.textContent = (Number.isInteger(target)
        ? Math.round(current)
        : current.toFixed(1)) + suffix;

      if (step >= steps) {
        clearInterval(timer);
        el.textContent = raw; // restore exact original
      }
    }, stepTime);
  }

  // Trigger only once when stat enters viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));

})();


/* ── 12. EXPERIENCE CARDS — TILT EFFECT ───────────────────── */
(function initTiltEffect() {

  // Only on non-touch, non-reduced-motion devices
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReduced || !window.matchMedia('(hover: hover)').matches) return;

  const cards = document.querySelectorAll('.exp-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;  // max 6deg
      const rotateY = ((x - cx) / cx) *  6;

      card.style.transform =
        `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .5s var(--ease-out-expo)';
      card.style.transform  = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .1s ease';
    });
  });

})();


/* ── 13. MENU ITEM HOVER — MAGNETIC BUTTON EFFECT ────────── */
(function initMagneticMenuItems() {

  if (!window.matchMedia('(hover: hover)').matches) return;

  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x    = e.clientX - rect.left - rect.width  / 2;
      const y    = e.clientY - rect.top  - rect.height / 2;

      item.style.transform =
        `translateY(-6px) translate(${x * 0.04}px, ${y * 0.04}px)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transition = 'transform .5s var(--ease-out-expo), box-shadow .5s ease';
      item.style.transform  = 'translateY(0) translate(0,0)';
      setTimeout(() => { item.style.transition = ''; }, 500);
    });
  });

})();


/* ── 14. ACTIVE NAV LINK HIGHLIGHT (CSS class) ────────────── */
(function initActiveNavStyle() {

  // Inject a tiny style rule for active nav links
  const style = document.createElement('style');
  style.textContent = `
    .nav-links a.active-nav {
      color: var(--clr-gold) !important;
    }
    .nav-links a.active-nav::after {
      transform: scaleX(1) !important;
    }
  `;
  document.head.appendChild(style);

})();


/* ── 15. LAZY-LOAD IMAGES (fallback for older browsers) ───── */
(function initLazyImages() {

  // Modern browsers handle loading="lazy" natively.
  // This is a polyfill fallback for older browsers.
  if ('loading' in HTMLImageElement.prototype) return;

  const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
  if (!lazyImgs.length) return;

  const imgObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  lazyImgs.forEach(img => imgObserver.observe(img));

})();


/* ── 16. HOURS ROW — HIGHLIGHT TODAY ─────────────────────── */
(function highlightToday() {

  const dayMap = {
    0: 3,  // Sunday    → row index 3 (Sunday row)
    1: 0,  // Monday    → row index 0 (Mon–Fri)
    2: 0,
    3: 0,
    4: 0,
    5: 0,  // Friday
    6: 1   // Saturday  → row index 1
  };

  const rows = document.querySelectorAll('.hours-row');
  if (!rows.length) return;

  const todayIdx = dayMap[new Date().getDay()];

  rows.forEach((row, i) => {
    row.classList.remove('highlight');
  });

  if (rows[todayIdx]) {
    rows[todayIdx].classList.add('highlight');

    // Add a small "Today" badge
    const day = rows[todayIdx].querySelector('.day');
    if (day && !day.querySelector('.today-badge')) {
      const badge = document.createElement('span');
      badge.className = 'today-badge';
      badge.textContent = 'Today';
      badge.style.cssText = `
        font-size: .6rem;
        font-weight: 600;
        letter-spacing: .1em;
        text-transform: uppercase;
        background: var(--clr-gold);
        color: var(--clr-black);
        padding: 2px 8px;
        border-radius: 50px;
        margin-left: 10px;
        vertical-align: middle;
      `;
      day.appendChild(badge);
    }
  }

})();


/* ── 17. GALLERY FILTER ANIMATION ON LOAD ─────────────────── */
(function initGalleryStagger() {

  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger each item's appearance
        galleryItems.forEach((item, i) => {
          setTimeout(() => {
            item.style.opacity   = '1';
            item.style.transform = 'translateY(0) scale(1)';
          }, i * 80);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.08 });

  // Set initial hidden state
  galleryItems.forEach(item => {
    item.style.opacity    = '0';
    item.style.transform  = 'translateY(24px) scale(0.97)';
    item.style.transition =
      'opacity .55s var(--ease-out-expo), transform .55s var(--ease-out-expo)';
  });

  const gallerySection = document.getElementById('gallery');
  if (gallerySection) observer.observe(gallerySection);

})();


/* ── 18. PAGE LOAD — REVEAL ANIMATION ────────────────────── */
(function initPageReveal() {

  // Fade the whole page in on load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .55s ease';

  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

  // Fallback: if load event already fired
  if (document.readyState === 'complete') {
    document.body.style.opacity = '1';
  }

})();


/* ── 19. PREFERS-REDUCED-MOTION — DISABLE ANIMATIONS ─────── */
(function respectReducedMotion() {

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

  function applyReducedMotion(reduced) {
    if (reduced) {
      const style = document.createElement('style');
      style.id = 'reduced-motion-override';
      style.textContent = `
        *, *::before, *::after {
          animation-duration: .01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: .01ms !important;
        }
        .slide { transition: none !important; }
        [data-animate] { opacity: 1 !important; transform: none !important; }
      `;
      document.head.appendChild(style);
    } else {
      const existing = document.getElementById('reduced-motion-override');
      if (existing) existing.remove();
    }
  }

  applyReducedMotion(mq.matches);
  mq.addEventListener('change', e => applyReducedMotion(e.matches));

})();


/* ── 20. CONSOLE BRANDING ─────────────────────────────────── */
(function consoleBranding() {
  console.log(
    '%c☕ Velour Café',
    'font-size:22px;font-weight:bold;color:#c8973a;font-family:Georgia,serif;'
  );
  console.log(
    '%cHandcrafted with precision. Built for elegance.',
    'font-size:12px;color:#7a5c3e;font-family:sans-serif;'
  );
})();