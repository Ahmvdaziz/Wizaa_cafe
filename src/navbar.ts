/**
 * Navbar Module
 * Handles navigation, mobile menu toggle, and active link highlighting
 */

import { closeMenu, openMenu } from './utils';

export function initNavbar(): void {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!navbar || !hamburger || !navLinks) return;

  // Scroll → solid navbar
  function onScroll(): void {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('mobile-open');
    if (isOpen) {
      closeMenu(navLinks, hamburger);
    } else {
      openMenu(navLinks, hamburger);
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu(navLinks, hamburger);
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (!navbar.contains(target)) {
      closeMenu(navLinks, hamburger);
    }
  });

  // Active nav link highlight based on scroll position
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navAnchors = navLinks.querySelectorAll<HTMLAnchorElement>('a');

  function highlightNav(): void {
    let found = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 100) found = sec.id;
    });
    navAnchors.forEach(a => {
      const href = a.getAttribute('href');
      if (href === '#' + found) {
        a.classList.add('active-nav');
      } else {
        a.classList.remove('active-nav');
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
}
