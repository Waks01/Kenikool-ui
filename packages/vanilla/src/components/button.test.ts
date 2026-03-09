/**
 * Unit tests for k-button Web Component
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './button';

describe('KButton Web Component', () => {
  let button: HTMLElement;

  beforeEach(() => {
    button = document.createElement('k-button');
    document.body.appendChild(button);
  });

  afterEach(() => {
    document.body.removeChild(button);
  });

  describe('Rendering', () => {
    it('should render as a button element', () => {
      const innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton).toBeTruthy();
    });

    it('should render slot content', () => {
      button.textContent = 'Click me';
      const slot = button.shadowRoot?.querySelector('slot');
      expect(slot).toBeTruthy();
    });
  });

  describe('Variant Styling', () => {
    it('should apply primary variant by default', () => {
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--primary');
    });

    it('should apply primary variant when set', () => {
      button.setAttribute('variant', 'primary');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--primary');
    });

    it('should apply secondary variant when set', () => {
      button.setAttribute('variant', 'secondary');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--secondary');
    });

    it('should apply danger variant when set', () => {
      button.setAttribute('variant', 'danger');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--danger');
    });

    it('should update variant when attribute changes', () => {
      button.setAttribute('variant', 'secondary');
      let classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--secondary');

      button.setAttribute('variant', 'danger');
      classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--danger');
    });
  });

  describe('Size Styling', () => {
    it('should apply medium size by default', () => {
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--md');
    });

    it('should apply small size when set', () => {
      button.setAttribute('size', 'sm');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--sm');
    });

    it('should apply medium size when set', () => {
      button.setAttribute('size', 'md');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--md');
    });

    it('should apply large size when set', () => {
      button.setAttribute('size', 'lg');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--lg');
    });

    it('should update size when attribute changes', () => {
      button.setAttribute('size', 'sm');
      let classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--sm');

      button.setAttribute('size', 'lg');
      classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--lg');
    });
  });

  describe('Disabled State', () => {
    it('should not be disabled by default', () => {
      const innerButton = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      expect(innerButton?.disabled).toBe(false);
    });

    it('should be disabled when attribute is set', () => {
      button.setAttribute('disabled', '');
      const innerButton = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      expect(innerButton?.disabled).toBe(true);
    });

    it('should apply disabled class when disabled', () => {
      button.setAttribute('disabled', '');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--disabled');
    });

    it('should remove disabled state when attribute is removed', () => {
      button.setAttribute('disabled', '');
      let innerButton = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      expect(innerButton?.disabled).toBe(true);

      button.removeAttribute('disabled');
      innerButton = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      expect(innerButton?.disabled).toBe(false);
    });
  });

  describe('Animation Support', () => {
    it('should not apply animation by default', () => {
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).not.toContain('k-button--pulse');
      expect(classes).not.toContain('k-button--bounce');
    });

    it('should apply pulse animation when set', () => {
      button.setAttribute('animation', 'pulse');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--pulse');
    });

    it('should apply bounce animation when set', () => {
      button.setAttribute('animation', 'bounce');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--bounce');
    });

    it('should apply fade animation when set', () => {
      button.setAttribute('animation', 'fade');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--fade');
    });

    it('should apply scale animation when set', () => {
      button.setAttribute('animation', 'scale');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--scale');
    });

    it('should apply shake animation when set', () => {
      button.setAttribute('animation', 'shake');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--shake');
    });

    it('should apply glow animation when set', () => {
      button.setAttribute('animation', 'glow');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--glow');
    });

    it('should apply slide animation when set', () => {
      button.setAttribute('animation', 'slide');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--slide');
    });

    it('should apply rotate animation when set', () => {
      button.setAttribute('animation', 'rotate');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--rotate');
    });

    it('should apply flip animation when set', () => {
      button.setAttribute('animation', 'flip');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--flip');
    });

    it('should not apply animation when set to none', () => {
      button.setAttribute('animation', 'none');
      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).not.toContain('k-button--pulse');
      expect(classes).not.toContain('k-button--bounce');
    });

    it('should update animation when attribute changes', () => {
      button.setAttribute('animation', 'pulse');
      let classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--pulse');

      button.setAttribute('animation', 'bounce');
      classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--bounce');
      expect(classes).not.toContain('k-button--pulse');
    });
  });

  describe('Focus Indicator', () => {
    it('should have focus styles defined', () => {
      const styles = button.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('button:focus');
      expect(styles).toContain('outline');
    });
  });

  describe('Multiple Attributes', () => {
    it('should combine variant, size, and animation classes', () => {
      button.setAttribute('variant', 'danger');
      button.setAttribute('size', 'lg');
      button.setAttribute('animation', 'pulse');

      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--danger');
      expect(classes).toContain('k-button--lg');
      expect(classes).toContain('k-button--pulse');
    });

    it('should combine variant, size, disabled, and animation classes', () => {
      button.setAttribute('variant', 'secondary');
      button.setAttribute('size', 'sm');
      button.setAttribute('disabled', '');
      button.setAttribute('animation', 'fade');

      const classes = button.shadowRoot?.querySelector('button')?.className;
      expect(classes).toContain('k-button--secondary');
      expect(classes).toContain('k-button--sm');
      expect(classes).toContain('k-button--disabled');
      expect(classes).toContain('k-button--fade');
    });
  });

  describe('Accessibility', () => {
    it('should have proper button element', () => {
      const innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton?.tagName).toBe('BUTTON');
    });

    it('should support focus', () => {
      const innerButton = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      innerButton?.focus();
      expect(
        document.activeElement === button || button.shadowRoot?.activeElement === innerButton
      ).toBeTruthy();
    });
  });

  describe('Observed Attributes', () => {
    it('should observe variant attribute', () => {
      const observed = (button.constructor as any).observedAttributes;
      expect(observed).toContain('variant');
    });

    it('should observe size attribute', () => {
      const observed = (button.constructor as any).observedAttributes;
      expect(observed).toContain('size');
    });

    it('should observe disabled attribute', () => {
      const observed = (button.constructor as any).observedAttributes;
      expect(observed).toContain('disabled');
    });

    it('should observe animation attribute', () => {
      const observed = (button.constructor as any).observedAttributes;
      expect(observed).toContain('animation');
    });
  });

  describe('Accessibility - ARIA Attributes', () => {
    it('should have role="button" attribute', () => {
      const innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton?.getAttribute('role')).toBe('button');
    });

    it('should have aria-disabled="false" by default', () => {
      const innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton?.getAttribute('aria-disabled')).toBe('false');
    });

    it('should have aria-disabled="true" when disabled', () => {
      button.setAttribute('disabled', '');
      const innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should support aria-pressed attribute for toggle buttons', () => {
      button.setAttribute('aria-pressed', 'false');
      let innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton?.getAttribute('aria-pressed')).toBe('false');

      button.setAttribute('aria-pressed', 'true');
      innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton?.getAttribute('aria-pressed')).toBe('true');
    });

    it('should support aria-label for accessibility', () => {
      button.setAttribute('aria-label', 'Close dialog');
      const innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton?.getAttribute('aria-label')).toBe('Close dialog');
    });
  });

  describe('Accessibility - Keyboard Navigation', () => {
    it('should handle Enter key press', async () => {
      const innerButton = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      let clicked = false;

      innerButton?.addEventListener('click', () => {
        clicked = true;
      });

      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      innerButton?.dispatchEvent(event);

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(clicked).toBe(true);
    });

    it('should handle Space key press', async () => {
      const innerButton = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      let clicked = false;

      innerButton?.addEventListener('click', () => {
        clicked = true;
      });

      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      innerButton?.dispatchEvent(event);

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(clicked).toBe(true);
    });

    it('should not trigger click on Enter when disabled', async () => {
      button.setAttribute('disabled', '');
      const innerButton = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      let clicked = false;

      innerButton?.addEventListener('click', () => {
        clicked = true;
      });

      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      innerButton?.dispatchEvent(event);

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(clicked).toBe(false);
    });

    it('should support Tab navigation', () => {
      const innerButton = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      expect(innerButton?.tagName).toBe('BUTTON');
      // Tab navigation is handled by browser by default
    });
  });

  describe('Accessibility - Focus Management', () => {
    it('should have focus method', () => {
      expect(typeof (button as any).focus).toBe('function');
    });

    it('should have blur method', () => {
      expect(typeof (button as any).blur).toBe('function');
    });

    it('should focus inner button when focus() is called', () => {
      (button as any).focus();
      const innerButton = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      expect(
        document.activeElement === button || button.shadowRoot?.activeElement === innerButton
      ).toBeTruthy();
    });

    it('should have visible focus indicator', () => {
      const styles = button.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('button:focus');
      expect(styles).toContain('outline');
    });

    it('should have focus-visible styles', () => {
      const styles = button.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('button:focus-visible');
    });
  });

  describe('Accessibility - Color Contrast', () => {
    it('should have white text on primary button', () => {
      button.setAttribute('variant', 'primary');
      const styles = button.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('color: white');
    });

    it('should have white text on secondary button', () => {
      button.setAttribute('variant', 'secondary');
      const styles = button.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('color: white');
    });

    it('should have white text on danger button', () => {
      button.setAttribute('variant', 'danger');
      const styles = button.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('color: white');
    });
  });

  describe('HTML Attribute Pass-Through', () => {
    it('should pass through type attribute', () => {
      button.setAttribute('type', 'submit');
      const innerButton = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      expect(innerButton?.type).toBe('submit');
    });

    it('should pass through aria-label attribute', () => {
      button.setAttribute('aria-label', 'Submit form');
      const innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton?.getAttribute('aria-label')).toBe('Submit form');
    });

    it('should pass through data-* attributes', async () => {
      button.setAttribute('data-testid', 'submit-button');
      button.setAttribute('data-action', 'submit');

      // Wait for MutationObserver to fire
      await new Promise((resolve) => setTimeout(resolve, 0));

      const innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton?.getAttribute('data-testid')).toBe('submit-button');
      expect(innerButton?.getAttribute('data-action')).toBe('submit');
    });

    it('should update type attribute when changed', () => {
      button.setAttribute('type', 'button');
      let innerButton = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      expect(innerButton?.type).toBe('button');

      button.setAttribute('type', 'reset');
      innerButton = button.shadowRoot?.querySelector('button') as HTMLButtonElement;
      expect(innerButton?.type).toBe('reset');
    });

    it('should update aria-label attribute when changed', () => {
      button.setAttribute('aria-label', 'First label');
      let innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton?.getAttribute('aria-label')).toBe('First label');

      button.setAttribute('aria-label', 'Second label');
      innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton?.getAttribute('aria-label')).toBe('Second label');
    });
  });
});
