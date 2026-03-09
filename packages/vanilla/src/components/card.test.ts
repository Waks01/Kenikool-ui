/**
 * Unit tests for k-card Web Component
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './card';

describe('KCard Web Component', () => {
  let card: HTMLElement;

  beforeEach(() => {
    card = document.createElement('k-card');
    document.body.appendChild(card);
  });

  afterEach(() => {
    document.body.removeChild(card);
  });

  describe('Rendering', () => {
    it('should render as a div element', () => {
      const innerDiv = card.shadowRoot?.querySelector('div');
      expect(innerDiv).toBeTruthy();
    });

    it('should render slot content', () => {
      card.textContent = 'Card content';
      const slot = card.shadowRoot?.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('should have k-card class', () => {
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card');
    });
  });

  describe('Padding Styling', () => {
    it('should apply medium padding by default', () => {
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--padding-md');
    });

    it('should apply small padding when set', () => {
      card.setAttribute('padding', 'sm');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--padding-sm');
    });

    it('should apply medium padding when set', () => {
      card.setAttribute('padding', 'md');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--padding-md');
    });

    it('should apply large padding when set', () => {
      card.setAttribute('padding', 'lg');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--padding-lg');
    });

    it('should update padding when attribute changes', () => {
      card.setAttribute('padding', 'sm');
      let classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--padding-sm');

      card.setAttribute('padding', 'lg');
      classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--padding-lg');
    });
  });

  describe('Shadow Styling', () => {
    it('should apply medium shadow by default', () => {
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--shadow-md');
    });

    it('should apply small shadow when set', () => {
      card.setAttribute('shadow', 'sm');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--shadow-sm');
    });

    it('should apply medium shadow when set', () => {
      card.setAttribute('shadow', 'md');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--shadow-md');
    });

    it('should apply large shadow when set', () => {
      card.setAttribute('shadow', 'lg');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--shadow-lg');
    });

    it('should apply no shadow when set to none', () => {
      card.setAttribute('shadow', 'none');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--shadow-none');
    });

    it('should update shadow when attribute changes', () => {
      card.setAttribute('shadow', 'sm');
      let classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--shadow-sm');

      card.setAttribute('shadow', 'lg');
      classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--shadow-lg');
    });
  });

  describe('Animation Support', () => {
    it('should not apply animation by default', () => {
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).not.toContain('k-card--pulse');
      expect(classes).not.toContain('k-card--bounce');
    });

    it('should apply pulse animation when set', () => {
      card.setAttribute('animation', 'pulse');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--pulse');
    });

    it('should apply bounce animation when set', () => {
      card.setAttribute('animation', 'bounce');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--bounce');
    });

    it('should apply fade animation when set', () => {
      card.setAttribute('animation', 'fade');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--fade');
    });

    it('should apply scale animation when set', () => {
      card.setAttribute('animation', 'scale');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--scale');
    });

    it('should apply shake animation when set', () => {
      card.setAttribute('animation', 'shake');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--shake');
    });

    it('should apply glow animation when set', () => {
      card.setAttribute('animation', 'glow');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--glow');
    });

    it('should apply slide animation when set', () => {
      card.setAttribute('animation', 'slide');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--slide');
    });

    it('should apply rotate animation when set', () => {
      card.setAttribute('animation', 'rotate');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--rotate');
    });

    it('should apply flip animation when set', () => {
      card.setAttribute('animation', 'flip');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--flip');
    });

    it('should not apply animation when set to none', () => {
      card.setAttribute('animation', 'none');
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).not.toContain('k-card--pulse');
      expect(classes).not.toContain('k-card--bounce');
    });

    it('should update animation when attribute changes', () => {
      card.setAttribute('animation', 'pulse');
      let classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--pulse');

      card.setAttribute('animation', 'bounce');
      classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--bounce');
      expect(classes).not.toContain('k-card--pulse');
    });
  });

  describe('Multiple Attributes', () => {
    it('should combine padding, shadow, and animation classes', () => {
      card.setAttribute('padding', 'lg');
      card.setAttribute('shadow', 'sm');
      card.setAttribute('animation', 'fade');

      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--padding-lg');
      expect(classes).toContain('k-card--shadow-sm');
      expect(classes).toContain('k-card--fade');
    });

    it('should combine all attributes correctly', () => {
      card.setAttribute('padding', 'sm');
      card.setAttribute('shadow', 'lg');
      card.setAttribute('animation', 'pulse');

      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--padding-sm');
      expect(classes).toContain('k-card--shadow-lg');
      expect(classes).toContain('k-card--pulse');
    });
  });

  describe('Theme Support', () => {
    it('should have theme CSS variables defined', () => {
      const styles = card.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('--color-bg');
      expect(styles).toContain('--color-text');
      expect(styles).toContain('--color-border');
    });

    it('should apply background color from CSS variable', () => {
      const styles = card.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('background-color: var(--color-bg)');
    });

    it('should apply text color from CSS variable', () => {
      const styles = card.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('color: var(--color-text)');
    });

    it('should apply border color from CSS variable', () => {
      const styles = card.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('border: 1px solid var(--color-border)');
    });

    it('should have dark mode media query', () => {
      const styles = card.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('@media (prefers-color-scheme: dark)');
    });

    it('should have data-theme dark mode support', () => {
      const styles = card.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('[data-theme="dark"]');
    });

    it('should have data-theme light mode support', () => {
      const styles = card.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('[data-theme="light"]');
    });
  });

  describe('Observed Attributes', () => {
    it('should observe padding attribute', () => {
      const observed = (card.constructor as any).observedAttributes;
      expect(observed).toContain('padding');
    });

    it('should observe shadow attribute', () => {
      const observed = (card.constructor as any).observedAttributes;
      expect(observed).toContain('shadow');
    });

    it('should observe animation attribute', () => {
      const observed = (card.constructor as any).observedAttributes;
      expect(observed).toContain('animation');
    });
  });

  describe('Slot Content', () => {
    it('should render text content in slot', () => {
      const textContent = 'This is card content';
      card.textContent = textContent;
      expect(card.textContent).toContain(textContent);
    });

    it('should render HTML content in slot', () => {
      const heading = document.createElement('h2');
      heading.textContent = 'Card Title';
      card.appendChild(heading);

      expect(card.querySelector('h2')).toBeTruthy();
      expect(card.querySelector('h2')?.textContent).toBe('Card Title');
    });

    it('should render multiple child elements', () => {
      const heading = document.createElement('h2');
      heading.textContent = 'Title';
      const paragraph = document.createElement('p');
      paragraph.textContent = 'Content';

      card.appendChild(heading);
      card.appendChild(paragraph);

      expect(card.querySelector('h2')).toBeTruthy();
      expect(card.querySelector('p')).toBeTruthy();
    });
  });

  describe('Styling Properties', () => {
    it('should have border-radius defined', () => {
      const styles = card.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('border-radius: 0.5rem');
    });

    it('should have transition defined', () => {
      const styles = card.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('transition: all 0.2s ease-out');
    });

    it('should have prefers-reduced-motion support', () => {
      const styles = card.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    });
  });

  describe('Default Values', () => {
    it('should have default padding of md', () => {
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--padding-md');
    });

    it('should have default shadow of md', () => {
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).toContain('k-card--shadow-md');
    });

    it('should have default animation of none', () => {
      const classes = card.shadowRoot?.querySelector('div')?.className;
      expect(classes).not.toContain('k-card--pulse');
      expect(classes).not.toContain('k-card--bounce');
    });
  });
});
