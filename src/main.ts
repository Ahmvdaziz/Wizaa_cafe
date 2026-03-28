/**
 * Velour Café — Main Entry Point
 * Initializes all modules
 */

import { initSlider } from './slider';
import { initNavbar } from './navbar';
import {
  initScrollAnimations,
  initParallax,
  initCounters
} from './animations';
import { initMenuTabs, initMagneticMenuItems } from './menus';
import { initLightbox } from './gallery';
import { initContactForm, initNewsletter } from './forms';
import {
  initTiltEffect,
  initBackToTop,
  initSmoothScroll,
  initLazyImages,
  highlightToday,
  initActiveNavStyle
} from './effects';

/**
 * Initialize all features when DOM is ready
 */
function initializeApp(): void {
  console.log('Initializing Velour Café...');

  // Slider & Navigation
  initSlider();
  initNavbar();

  // Animations & Effects
  initScrollAnimations();
  initParallax();
  initCounters();
  initTiltEffect();
  initActiveNavStyle();

  // Menu & Gallery
  initMenuTabs();
  initMagneticMenuItems();
  initLightbox();

  // Forms
  initContactForm();
  initNewsletter();

  // Utilities
  initBackToTop();
  initSmoothScroll();
  initLazyImages();
  highlightToday();

  console.log('✓ Velour Café initialized successfully!');
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
