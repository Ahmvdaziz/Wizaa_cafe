/**
 * Utility functions for Velour Café
 */

/**
 * Pad a number to 2 digits
 */
export function pad(n: number): string {
  return String(n + 1).padStart(2, '0');
}

/**
 * Get element or return null
 */
export function getElement<T extends HTMLElement>(
  selector: string
): T | null {
  return document.querySelector<T>(selector);
}

/**
 * Get all elements matching selector
 */
export function getElements<T extends HTMLElement>(
  selector: string
): T[] {
  return Array.from(document.querySelectorAll<T>(selector));
}

/**
 * Add class to element
 */
export function addClass(el: HTMLElement | null, className: string): void {
  el?.classList.add(className);
}

/**
 * Remove class from element
 */
export function removeClass(el: HTMLElement | null, className: string): void {
  el?.classList.remove(className);
}

/**
 * Toggle class on element
 */
export function toggleClass(
  el: HTMLElement | null,
  className: string,
  force?: boolean
): boolean {
  return el?.classList.toggle(className, force) ?? false;
}

/**
 * Check if element has class
 */
export function hasClass(el: HTMLElement | null, className: string): boolean {
  return el?.classList.contains(className) ?? false;
}

/**
 * Throttle function execution
 */
export function throttle(func: Function, limit: number): (...args: any[]) => void {
  let inThrottle: boolean;
  return function (...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Debounce function execution
 */
export function debounce(func: Function, delay: number): (...args: any[]) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Close menu (prevent body scroll)
 */
export function closeMenu(navLinks: HTMLElement, hamburger: HTMLElement): void {
  removeClass(navLinks, 'mobile-open');
  removeClass(hamburger, 'open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/**
 * Open menu (allow body scroll)
 */
export function openMenu(navLinks: HTMLElement, hamburger: HTMLElement): void {
  addClass(navLinks, 'mobile-open');
  addClass(hamburger, 'open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

/**
 * Sleep for X milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
