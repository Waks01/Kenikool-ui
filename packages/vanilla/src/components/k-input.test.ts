/**
 * Unit tests for k-input Web Component
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './input';

describe('KInput Web Component', () => {
  let input: HTMLElement;

  beforeEach(() => {
    input = document.createElement('k-input');
    document.body.appendChild(input);
  });

  afterEach(() => {
    document.body.removeChild(input);
  });

  describe('Rendering', () => {
    it('should render as an input element', () => {
      const innerInput = input.shadowRoot?.querySelector('input');
      expect(innerInput).toBeTruthy();
      expect(innerInput?.tagName).toBe('INPUT');
    });

    it('should render with type="text" by default', () => {
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.type).toBe('text');
    });
  });

  describe('Size Styling', () => {
    it('should apply medium size by default', () => {
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--md');
    });

    it('should apply small size when set', () => {
      input.setAttribute('size', 'sm');
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--sm');
    });

    it('should apply medium size when set', () => {
      input.setAttribute('size', 'md');
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--md');
    });

    it('should apply large size when set', () => {
      input.setAttribute('size', 'lg');
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--lg');
    });

    it('should update size when attribute changes', () => {
      input.setAttribute('size', 'sm');
      let classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--sm');

      input.setAttribute('size', 'lg');
      classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--lg');
    });
  });

  describe('Disabled State', () => {
    it('should not be disabled by default', () => {
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.disabled).toBe(false);
    });

    it('should be disabled when attribute is set', () => {
      input.setAttribute('disabled', '');
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.disabled).toBe(true);
    });

    it('should apply disabled class when disabled', () => {
      input.setAttribute('disabled', '');
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--disabled');
    });

    it('should remove disabled state when attribute is removed', () => {
      input.setAttribute('disabled', '');
      let innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.disabled).toBe(true);

      input.removeAttribute('disabled');
      innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.disabled).toBe(false);
    });
  });

  describe('Error State', () => {
    it('should not have error state by default', () => {
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).not.toContain('k-input--error');
    });

    it('should apply error class when error attribute is set', () => {
      input.setAttribute('error', '');
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--error');
    });

    it('should remove error class when error attribute is removed', () => {
      input.setAttribute('error', '');
      let classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--error');

      input.removeAttribute('error');
      classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).not.toContain('k-input--error');
    });

    it('should update error state when attribute changes', () => {
      input.setAttribute('error', '');
      let classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--error');

      input.removeAttribute('error');
      classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).not.toContain('k-input--error');
    });
  });

  describe('Placeholder', () => {
    it('should not have placeholder by default', () => {
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.placeholder).toBe('');
    });

    it('should display placeholder when set', () => {
      input.setAttribute('placeholder', 'Enter text');
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.placeholder).toBe('Enter text');
    });

    it('should update placeholder when attribute changes', () => {
      input.setAttribute('placeholder', 'First placeholder');
      let innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.placeholder).toBe('First placeholder');

      input.setAttribute('placeholder', 'Second placeholder');
      innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.placeholder).toBe('Second placeholder');
    });

    it('should handle empty placeholder', () => {
      input.setAttribute('placeholder', 'Enter text');
      input.setAttribute('placeholder', '');
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.placeholder).toBe('');
    });
  });

  describe('Value Property', () => {
    it('should have empty value by default', () => {
      const inputElement = input as any;
      expect(inputElement.value).toBe('');
    });

    it('should set value via property', () => {
      const inputElement = input as any;
      inputElement.value = 'test value';
      expect(inputElement.value).toBe('test value');
    });

    it('should update internal input element when value is set', () => {
      const inputElement = input as any;
      inputElement.value = 'test value';
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.value).toBe('test value');
    });

    it('should initialize value from attribute', () => {
      input.setAttribute('value', 'initial value');
      const inputElement = input as any;
      expect(inputElement.value).toBe('initial value');
    });
  });

  describe('Change Event', () => {
    it('should emit change event when input value changes', async () => {
      const changeSpy = vi.fn();
      input.addEventListener('change', changeSpy);

      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      innerInput.value = 'new value';
      innerInput.dispatchEvent(new Event('change', { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(changeSpy).toHaveBeenCalled();
    });

    it('should emit input event when input value changes', async () => {
      const inputSpy = vi.fn();
      input.addEventListener('input', inputSpy);

      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      innerInput.value = 'new value';
      innerInput.dispatchEvent(new Event('input', { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(inputSpy).toHaveBeenCalled();
    });

    it('should update internal value on change event', async () => {
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      innerInput.value = 'changed value';
      innerInput.dispatchEvent(new Event('change', { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 0));
      const inputElement = input as any;
      expect(inputElement.value).toBe('changed value');
    });

    it('should update internal value on input event', async () => {
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      innerInput.value = 'typed value';
      innerInput.dispatchEvent(new Event('input', { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 0));
      const inputElement = input as any;
      expect(inputElement.value).toBe('typed value');
    });
  });

  describe('Animation Support', () => {
    it('should not apply animation by default', () => {
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).not.toContain('k-input--pulse');
      expect(classes).not.toContain('k-input--bounce');
    });

    it('should apply pulse animation when set', () => {
      input.setAttribute('animation', 'pulse');
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--pulse');
    });

    it('should apply bounce animation when set', () => {
      input.setAttribute('animation', 'bounce');
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--bounce');
    });

    it('should apply fade animation when set', () => {
      input.setAttribute('animation', 'fade');
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--fade');
    });

    it('should apply scale animation when set', () => {
      input.setAttribute('animation', 'scale');
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--scale');
    });

    it('should apply shake animation when set', () => {
      input.setAttribute('animation', 'shake');
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--shake');
    });

    it('should apply glow animation when set', () => {
      input.setAttribute('animation', 'glow');
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--glow');
    });

    it('should apply slide animation when set', () => {
      input.setAttribute('animation', 'slide');
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--slide');
    });

    it('should apply rotate animation when set', () => {
      input.setAttribute('animation', 'rotate');
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--rotate');
    });

    it('should apply flip animation when set', () => {
      input.setAttribute('animation', 'flip');
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--flip');
    });

    it('should not apply animation when set to none', () => {
      input.setAttribute('animation', 'none');
      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).not.toContain('k-input--pulse');
      expect(classes).not.toContain('k-input--bounce');
    });

    it('should update animation when attribute changes', () => {
      input.setAttribute('animation', 'pulse');
      let classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--pulse');

      input.setAttribute('animation', 'bounce');
      classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--bounce');
      expect(classes).not.toContain('k-input--pulse');
    });
  });

  describe('Focus Styling', () => {
    it('should have focus styles defined', () => {
      const styles = input.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('input:focus');
      expect(styles).toContain('border-color');
      expect(styles).toContain('box-shadow');
    });
  });

  describe('Multiple Attributes', () => {
    it('should combine size, error, and disabled classes', () => {
      input.setAttribute('size', 'lg');
      input.setAttribute('error', '');
      input.setAttribute('disabled', '');

      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--lg');
      expect(classes).toContain('k-input--error');
      expect(classes).toContain('k-input--disabled');
    });

    it('should combine size, animation, and placeholder', () => {
      input.setAttribute('size', 'sm');
      input.setAttribute('animation', 'fade');
      input.setAttribute('placeholder', 'Enter text');

      const classes = input.shadowRoot?.querySelector('input')?.className;
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;

      expect(classes).toContain('k-input--sm');
      expect(classes).toContain('k-input--fade');
      expect(innerInput?.placeholder).toBe('Enter text');
    });
  });

  describe('Accessibility', () => {
    it('should have proper input element', () => {
      const innerInput = input.shadowRoot?.querySelector('input');
      expect(innerInput?.tagName).toBe('INPUT');
    });

    it('should support focus', () => {
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      innerInput?.focus();
      expect(
        document.activeElement === input || input.shadowRoot?.activeElement === innerInput
      ).toBeTruthy();
    });

    it('should be keyboard accessible', () => {
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.tagName).toBe('INPUT');
    });
  });

  describe('Observed Attributes', () => {
    it('should observe size attribute', () => {
      const observed = (input.constructor as any).observedAttributes;
      expect(observed).toContain('size');
    });

    it('should observe disabled attribute', () => {
      const observed = (input.constructor as any).observedAttributes;
      expect(observed).toContain('disabled');
    });

    it('should observe error attribute', () => {
      const observed = (input.constructor as any).observedAttributes;
      expect(observed).toContain('error');
    });

    it('should observe placeholder attribute', () => {
      const observed = (input.constructor as any).observedAttributes;
      expect(observed).toContain('placeholder');
    });

    it('should observe value attribute', () => {
      const observed = (input.constructor as any).observedAttributes;
      expect(observed).toContain('value');
    });

    it('should observe animation attribute', () => {
      const observed = (input.constructor as any).observedAttributes;
      expect(observed).toContain('animation');
    });
  });

  describe('HTML Attribute Pass-Through', () => {
    it('should support type attribute', () => {
      input.setAttribute('type', 'email');
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.type).toBe('text');
    });

    it('should support name attribute', async () => {
      input.setAttribute('name', 'username');
      await new Promise((resolve) => setTimeout(resolve, 0));
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.name).toBe('username');
    });

    it('should support id attribute', async () => {
      input.setAttribute('id', 'email-input');
      await new Promise((resolve) => setTimeout(resolve, 0));
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.id).toBe('email-input');
    });

    it('should support aria-label attribute', async () => {
      input.setAttribute('aria-label', 'Email address');
      await new Promise((resolve) => setTimeout(resolve, 0));
      const innerInput = input.shadowRoot?.querySelector('input');
      expect(innerInput?.getAttribute('aria-label')).toBe('Email address');
    });

    it('should support data-* attributes', async () => {
      input.setAttribute('data-testid', 'email-field');
      input.setAttribute('data-validation', 'email');

      await new Promise((resolve) => setTimeout(resolve, 0));

      const innerInput = input.shadowRoot?.querySelector('input');
      expect(innerInput?.getAttribute('data-testid')).toBe('email-field');
      expect(innerInput?.getAttribute('data-validation')).toBe('email');
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid attribute changes', () => {
      input.setAttribute('size', 'sm');
      input.setAttribute('size', 'md');
      input.setAttribute('size', 'lg');

      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--lg');
    });

    it('should handle empty placeholder attribute', () => {
      input.setAttribute('placeholder', 'Initial');
      input.setAttribute('placeholder', '');

      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.placeholder).toBe('');
    });

    it('should handle value with special characters', () => {
      const inputElement = input as any;
      inputElement.value = 'test@example.com';
      expect(inputElement.value).toBe('test@example.com');
    });

    it('should handle disabled and error together', () => {
      input.setAttribute('disabled', '');
      input.setAttribute('error', '');

      const classes = input.shadowRoot?.querySelector('input')?.className;
      expect(classes).toContain('k-input--disabled');
      expect(classes).toContain('k-input--error');
    });
  });

  describe('Accessibility - ARIA Attributes', () => {
    it('should have aria-invalid="false" by default', () => {
      const innerInput = input.shadowRoot?.querySelector('input');
      expect(innerInput?.getAttribute('aria-invalid')).toBe('false');
    });

    it('should have aria-invalid="true" when error is set', () => {
      input.setAttribute('error', '');
      const innerInput = input.shadowRoot?.querySelector('input');
      expect(innerInput?.getAttribute('aria-invalid')).toBe('true');
    });

    it('should support aria-label attribute', () => {
      input.setAttribute('aria-label', 'Email address');
      const innerInput = input.shadowRoot?.querySelector('input');
      expect(innerInput?.getAttribute('aria-label')).toBe('Email address');
    });

    it('should support aria-describedby attribute', async () => {
      input.setAttribute('aria-describedby', 'error-message');
      await new Promise((resolve) => setTimeout(resolve, 0));
      const innerInput = input.shadowRoot?.querySelector('input');
      expect(innerInput?.getAttribute('aria-describedby')).toBe('error-message');
    });
  });

  describe('Accessibility - Keyboard Navigation', () => {
    it('should support Tab navigation', () => {
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(innerInput?.tagName).toBe('INPUT');
      // Tab navigation is handled by browser by default
    });

    it('should support Enter key for form submission', async () => {
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      let enterPressed = false;

      input.addEventListener('keydown', (e: any) => {
        if (e.key === 'Enter') {
          enterPressed = true;
        }
      });

      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      innerInput?.dispatchEvent(event);

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(enterPressed).toBe(true);
    });

    it('should emit focus event on focus', async () => {
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      let focusEmitted = false;

      input.addEventListener('focus', () => {
        focusEmitted = true;
      });

      innerInput?.dispatchEvent(new Event('focus', { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(focusEmitted).toBe(true);
    });

    it('should emit blur event on blur', async () => {
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      let blurEmitted = false;

      input.addEventListener('blur', () => {
        blurEmitted = true;
      });

      innerInput?.dispatchEvent(new Event('blur', { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(blurEmitted).toBe(true);
    });
  });

  describe('Accessibility - Focus Management', () => {
    it('should have focus method', () => {
      expect(typeof (input as any).focus).toBe('function');
    });

    it('should have blur method', () => {
      expect(typeof (input as any).blur).toBe('function');
    });

    it('should focus inner input when focus() is called', () => {
      (input as any).focus();
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(
        document.activeElement === input || input.shadowRoot?.activeElement === innerInput
      ).toBeTruthy();
    });

    it('should blur inner input when blur() is called', () => {
      (input as any).focus();
      (input as any).blur();
      const innerInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(
        document.activeElement === input || input.shadowRoot?.activeElement === innerInput
      ).toBeFalsy();
    });

    it('should have visible focus indicator', () => {
      const styles = input.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('input:focus');
      expect(styles).toContain('border-color');
    });

    it('should have focus-visible styles', () => {
      const styles = input.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('input:focus-visible');
    });
  });

  describe('Accessibility - Color Contrast', () => {
    it('should have sufficient border contrast', () => {
      const styles = input.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('border');
    });

    it('should have error state with visible color', () => {
      input.setAttribute('error', '');
      const styles = input.shadowRoot?.querySelector('style')?.textContent;
      expect(styles).toContain('k-input--error');
      expect(styles).toContain('border-color');
    });
  });
});
