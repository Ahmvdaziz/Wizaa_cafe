/**
 * Gallery Lightbox Module
 * Manages gallery image viewing and lightbox functionality
 */

export function initLightbox(): void {
  const galleryItems = document.querySelectorAll<HTMLElement>('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg') as HTMLImageElement;
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxCounter = document.getElementById('lightboxCounter');

  if (!lightbox || galleryItems.length === 0 || !lightboxImg) return;

  let currentIndex = 0;
  const sources = Array.from(galleryItems).map(
    item => (item as HTMLElement & { dataset: { src: string } }).dataset.src
  );
  const alts = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img');
    return img ? img.alt : '';
  });

  function openLightbox(index: number): void {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(): void {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightboxImage(): void {
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.97)';

    setTimeout(() => {
      lightboxImg.src = sources[currentIndex];
      lightboxImg.alt = alts[currentIndex];

      const onLoadHandler = () => {
        lightboxImg.style.transition =
          'opacity .35s ease, transform .35s ease';
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
      };

      lightboxImg.onload = onLoadHandler;

      if (lightboxImg.complete) {
        onLoadHandler();
      }

      if (lightboxCounter) {
        lightboxCounter.textContent = `${currentIndex + 1} / ${sources.length}`;
      }
    }, 180);
  }

  function showPrev(): void {
    currentIndex = (currentIndex - 1 + sources.length) % sources.length;
    updateLightboxImage();
  }

  function showNext(): void {
    currentIndex = (currentIndex + 1) % sources.length;
    updateLightboxImage();
  }

  // Open on click
  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  // Controls
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  if (lightboxPrev)
    lightboxPrev.addEventListener('click', e => {
      e.stopPropagation();
      showPrev();
    });
  if (lightboxNext)
    lightboxNext.addEventListener('click', e => {
      e.stopPropagation();
      showNext();
    });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Touch swipe
  let lbTouchStart = 0;
  lightbox.addEventListener(
    'touchstart',
    e => {
      lbTouchStart = e.changedTouches[0].screenX;
    },
    { passive: true }
  );
  lightbox.addEventListener(
    'touchend',
    e => {
      const diff = lbTouchStart - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) diff > 0 ? showNext() : showPrev();
    },
    { passive: true }
  );
}
