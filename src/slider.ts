/**
 * Hero Slider Module
 * Manages slide transitions, auto-play, and progress tracking
 */

const SLIDE_DURATION = 6000; // ms each slide stays
const PROGRESS_TICK = 30; // ms between progress bar updates

export function initSlider(): void {
  const slides = document.querySelectorAll<HTMLElement>('.slide');
  const dots = document.querySelectorAll<HTMLElement>('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressBar = document.getElementById('progressBar');
  const currentLabel = document.getElementById('currentSlide');
  const hero = document.getElementById('hero');

  if (slides.length === 0) return;

  let current = 0;
  let autoPlayTimer: ReturnType<typeof setInterval> | null = null;
  let progressTimer: ReturnType<typeof setInterval> | null = null;
  let progressVal = 0;
  let isPaused = false;
  let isAnimating = false;

  function clearTimers(): void {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    if (progressTimer) clearInterval(progressTimer);
  }

  function resetProgress(): void {
    progressVal = 0;
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
    }
  }

  function startProgress(): void {
    resetProgress();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (progressBar) {
          progressBar.style.transition = `width ${SLIDE_DURATION}ms linear`;
          progressBar.style.width = '100%';
        }
      });
    });
  }

  function goTo(index: number): void {
    if (isAnimating || index === current) return;
    isAnimating = true;

    const outgoing = slides[current];
    const incoming = slides[index];

    outgoing.classList.remove('active');
    outgoing.classList.add('prev');
    incoming.classList.add('active');

    dots[current].classList.remove('active');
    dots[index].classList.add('active');

    if (currentLabel) {
      currentLabel.textContent = String(index + 1).padStart(2, '0');
    }

    current = index;

    setTimeout(() => {
      outgoing.classList.remove('prev');
      isAnimating = false;
    }, 1100);

    startProgress();
  }

  function next(): void {
    const n = (current + 1) % slides.length;
    goTo(n);
  }

  function prev(): void {
    const n = (current - 1 + slides.length) % slides.length;
    goTo(n);
  }

  function startAutoPlay(): void {
    clearTimers();
    if (isPaused) return;
    autoPlayTimer = setInterval(() => {
      if (!isPaused) next();
    }, SLIDE_DURATION);
    startProgress();
  }

  function stopAutoPlay(): void {
    clearTimers();
    resetProgress();
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      next();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prev();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index || '0', 10);
      goTo(idx);
      stopAutoPlay();
      startAutoPlay();
    });
  });

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
    if (e.key === 'ArrowRight') {
      next();
      stopAutoPlay();
      startAutoPlay();
    }
    if (e.key === 'ArrowLeft') {
      prev();
      stopAutoPlay();
      startAutoPlay();
    }
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  if (hero) {
    hero.addEventListener(
      'touchstart',
      e => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );
    hero.addEventListener(
      'touchend',
      e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? next() : prev();
          stopAutoPlay();
          startAutoPlay();
        }
      },
      { passive: true }
    );
  }

  // Initialize
  if (slides.length > 0) {
    slides[0].classList.add('active');
    if (currentLabel) currentLabel.textContent = '01';
    startAutoPlay();
  }
}
