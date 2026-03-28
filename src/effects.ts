/**
 * Effects Module
 * Handles various visual effects and interactions
 */

export function initTiltEffect(): void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    .matches;
  if (prefersReduced || !window.matchMedia('(hover: hover)').matches) return;

  const cards = document.querySelectorAll<HTMLElement>('.exp-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) * 6;

      card.style.transform =
        `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .5s var(--ease-out-expo)';
      card.style.transform =
        'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
      setTimeout(() => {
        card.style.transition = '';
      }, 500);
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .1s ease';
    });
  });
}

export function initBackToTop(): void {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

export function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector<HTMLElement>(href || '');
      if (target) {
        e.preventDefault();
        const navH =
          parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              '--nav-h'
            ),
            10
          ) || 80;
        const top =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

export function initLazyImages(): void {
  if ('loading' in HTMLImageElement.prototype) return;

  const lazyImgs = document.querySelectorAll<HTMLImageElement>(
    'img[loading="lazy"]'
  );
  if (lazyImgs.length === 0) return;

  const imgObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement & {
          dataset: { src: string };
        };
        if (img.dataset.src) img.src = img.dataset.src;
        imgObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '200px' });

  lazyImgs.forEach(img => imgObserver.observe(img));
}

export function highlightToday(): void {
  const dayMap: Record<number, number> = {
    0: 3, // Sunday
    1: 0, // Monday
    2: 0,
    3: 0,
    4: 0,
    5: 0, // Friday
    6: 1  // Saturday
  };

  const rows = document.querySelectorAll<HTMLElement>('.hours-row');
  if (rows.length === 0) return;

  const todayIdx = dayMap[new Date().getDay()];

  rows.forEach(row => {
    row.classList.remove('highlight');
  });

  if (rows[todayIdx]) {
    rows[todayIdx].classList.add('highlight');
    const day = rows[todayIdx].querySelector('.day');
    if (day && !day.querySelector('.today-badge')) {
      const badge = document.createElement('span');
      badge.className = 'today-badge';
      badge.textContent = ' (Today)';
      day.appendChild(badge);
    }
  }
}

export function initActiveNavStyle(): void {
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
}
