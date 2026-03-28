/**
 * Animation Module
 * Handles scroll animations and parallax effects
 */

export function initScrollAnimations(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-animate]');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('in-view');
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
}

export function initParallax(): void {
  const hero = document.getElementById('hero');
  if (!hero) return;

  // Only run on non-touch devices for performance
  if (!window.matchMedia('(hover: hover)').matches) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        const heroH = hero.offsetHeight;

        if (scrollY < heroH) {
          const slides = hero.querySelectorAll<HTMLElement>('.slide.active');
          slides.forEach(slide => {
            slide.style.transform = `translateY(${scrollY * 0.25}px)`;
          });
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

export function initCounters(): void {
  const stats = document.querySelectorAll<HTMLElement>('.stat-number');
  if (stats.length === 0) return;

  function animateCounter(el: HTMLElement): void {
    const raw = el.textContent?.trim() || '';
    const suffix = raw.replace(/[\d.]/g, '');
    const target = parseFloat(raw);
    if (isNaN(target)) return;

    const duration = 1800;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = 1 - Math.pow(1 - step / steps, 3);
      current = target * progress;

      el.textContent =
        (Number.isInteger(target)
          ? Math.round(current)
          : current.toFixed(1)) + suffix;

      if (step >= steps) {
        clearInterval(timer);
        el.textContent = raw;
      }
    }, stepTime);
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach(el => observer.observe(el));
}
