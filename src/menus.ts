/**
 * Menu and Effects Module
 * Handles menu tabs and magnetic menu item effects
 */

export function initMenuTabs(): void {
  const tabBtns = document.querySelectorAll<HTMLElement>('.tab-btn');
  const tabPanels = document.querySelectorAll<HTMLElement>('.menu-panel');

  if (tabBtns.length === 0) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = (btn as HTMLElement & { dataset: { tab: string } })
        .dataset.tab;

      // Update buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panels
      tabPanels.forEach(panel => {
        const panelEl = panel as HTMLElement & {
          style: CSSStyleDeclaration;
        };

        if (panel.id === 'tab-' + target) {
          panelEl.style.opacity = '0';
          panelEl.style.display = 'block';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              panelEl.style.transition = 'opacity .4s ease';
              panelEl.style.opacity = '1';
            });
          });
          panel.classList.add('active');

          // Re-trigger scroll animations
          panel.querySelectorAll<HTMLElement>('[data-animate]').forEach(el => {
            el.classList.remove('in-view');
            setTimeout(() => el.classList.add('in-view'), 80);
          });
        } else {
          panelEl.style.display = 'none';
          panelEl.style.opacity = '0';
          panel.classList.remove('active');
        }
      });
    });
  });
}

export function initMagneticMenuItems(): void {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const menuItems = document.querySelectorAll<HTMLElement>('.menu-item');

  menuItems.forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      item.style.transform = `translateY(-6px) translate(${x * 0.04}px, ${
        y * 0.04
      }px)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transition = 'transform .5s var(--ease-out-expo)';
      item.style.transform = 'translateY(0) translate(0,0)';
      setTimeout(() => {
        item.style.transition = '';
      }, 500);
    });
  });
}
