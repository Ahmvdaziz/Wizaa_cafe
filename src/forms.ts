/**
 * Forms Module
 * Handles contact form and newsletter form submissions
 */

import { isValidEmail } from './utils';

export function initContactForm(): void {
  const form = document.getElementById('contactForm') as HTMLFormElement;
  const successMsg = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Validation
    let valid = true;
    const required = form.querySelectorAll<HTMLInputElement>('[required]');

    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#c0392b';
        valid = false;
      }
      if (field.type === 'email' && field.value) {
        if (!isValidEmail(field.value)) {
          field.style.borderColor = '#c0392b';
          valid = false;
        }
      }
    });

    if (!valid) return;

    // Simulate submission
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      const span = btn.querySelector('span');
      if (span) span.textContent = 'Sending…';
    }

    setTimeout(() => {
      form.reset();
      if (btn) {
        btn.disabled = false;
        const span = btn.querySelector('span');
        if (span) span.textContent = 'Send Reservation Request';
      }
      if (successMsg) {
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 6000);
      }
    }, 1600);
  });

  // Clear red border on input
  form
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input, select, textarea'
    )
    .forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
}

export function initNewsletter(): void {
  const form = document.getElementById(
    'newsletterForm'
  ) as HTMLFormElement;
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector<HTMLInputElement>('input[type="email"]');
    const btn = form.querySelector<HTMLButtonElement>('button');

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
}
