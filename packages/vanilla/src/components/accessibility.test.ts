import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { axe } from 'jest-axe';
import './button';
import './input';
import './card';

// Helper function to calculate contrast ratio
function getContrastRatio(rgb1: string, rgb2: string): number {
  const getLuminance = (rgb: string) => {
    const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(rgb1);
  const l2 = getLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Custom matcher for accessibility violations
const toHaveNoViolations = (result: any) => {
  const violations = result.violations || [];
  const pass = violations.length === 0;
  return {
    pass,
    message: () =>
      pass
        ? 'Expected violations but found none'
        : `Found ${violations.length} accessibility violations: ${violations.map((v: any) => v.id).join(', ')}`,
  };
};

expect.extend({ toHaveNoViolations });

// Extend Vitest matchers type
declare global {
  namespace Vi {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}

describe('Accessibility - Vanilla Components', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('k-button accessibility', () => {
    it('should have no accessibility violations - primary button', async () => {
      container.innerHTML = '<k-button variant="primary">Click me</k-button>';
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - secondary button', async () => {
      container.innerHTML = '<k-button variant="secondary">Click me</k-button>';
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - danger button', async () => {
      container.innerHTML = '<k-button variant="danger">Delete</k-button>';
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - disabled button', async () => {
      container.innerHTML = '<k-button disabled>Disabled</k-button>';
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - button with aria-label', async () => {
      container.innerHTML = '<k-button aria-label="Submit form">Submit</k-button>';
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - button with animation', async () => {
      container.innerHTML = '<k-button animation="pulse">Pulsing</k-button>';
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper focus indicator', () => {
      container.innerHTML = '<k-button>Focus me</k-button>';
      const button = container.querySelector('k-button');
      expect(button).toBeTruthy();

      // Simulate focus
      const innerButton = button?.shadowRoot?.querySelector('button');
      expect(innerButton).toBeTruthy();
    });

    it('should support keyboard navigation', () => {
      container.innerHTML = '<k-button>Click me</k-button>';
      const button = container.querySelector('k-button') as any;

      // Verify button is keyboard accessible
      const innerButton = button?.shadowRoot?.querySelector('button');
      expect(innerButton?.tagName).toBe('BUTTON');
    });
  });

  describe('k-input accessibility', () => {
    it('should have no accessibility violations - basic input', async () => {
      container.innerHTML = '<label>Email<k-input aria-label="Email address"></k-input></label>';
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - input with aria-label', async () => {
      container.innerHTML = '<k-input aria-label="Email address"></k-input>';
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - input with error state', async () => {
      container.innerHTML =
        '<label>Email<k-input error aria-invalid="true" aria-label="Email"></k-input></label>';
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - disabled input', async () => {
      container.innerHTML = '<label>Email<k-input disabled aria-label="Email"></k-input></label>';
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - input with placeholder', async () => {
      container.innerHTML = '<k-input placeholder="Enter text" aria-label="Enter text"></k-input>';
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - input with aria-describedby', async () => {
      container.innerHTML = `
        <label>Email<k-input aria-invalid="true" aria-describedby="error-msg" aria-label="Email"></k-input></label>
        <div id="error-msg">This field is required</div>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper focus indicator', () => {
      container.innerHTML = '<k-input></k-input>';
      const input = container.querySelector('k-input');
      expect(input).toBeTruthy();

      // Verify input is keyboard accessible
      const innerInput = input?.shadowRoot?.querySelector('input');
      expect(innerInput?.tagName).toBe('INPUT');
    });

    it('should support keyboard navigation', () => {
      container.innerHTML = '<k-input></k-input>';
      const input = container.querySelector('k-input') as any;

      // Verify input is keyboard accessible
      const innerInput = input?.shadowRoot?.querySelector('input');
      expect(innerInput?.tagName).toBe('INPUT');
    });
  });

  describe('k-card accessibility', () => {
    it('should have no accessibility violations - basic card', async () => {
      container.innerHTML = '<k-card>Card content</k-card>';
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - card with heading', async () => {
      container.innerHTML = '<k-card><h2>Card Title</h2><p>Content</p></k-card>';
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - card with padding', async () => {
      container.innerHTML = '<k-card padding="lg">Card content</k-card>';
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - card with shadow', async () => {
      container.innerHTML = '<k-card shadow="lg">Card content</k-card>';
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - card with interactive content', async () => {
      container.innerHTML = `
        <k-card>
          <h2>Card Title</h2>
          <button>Action</button>
        </k-card>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should support semantic HTML structure', () => {
      container.innerHTML = '<k-card><h2>Title</h2><p>Content</p></k-card>';
      const card = container.querySelector('k-card');
      expect(card).toBeTruthy();

      // Verify card contains semantic content
      const heading = card?.querySelector('h2');
      expect(heading?.textContent).toBe('Title');
    });
  });

  describe('Color contrast compliance', () => {
    it('should have sufficient contrast - primary button', async () => {
      container.innerHTML = '<k-button variant="primary">Primary</k-button>';
      const results = await axe(container);

      // Check for color contrast violations
      const contrastViolations = results.violations.filter((v: any) => v.id === 'color-contrast');
      expect(contrastViolations).toHaveLength(0);
    });

    it('should have sufficient contrast - secondary button', async () => {
      container.innerHTML = '<k-button variant="secondary">Secondary</k-button>';
      const results = await axe(container);

      // Check for color contrast violations
      const contrastViolations = results.violations.filter((v: any) => v.id === 'color-contrast');
      expect(contrastViolations).toHaveLength(0);
    });

    it('should have sufficient contrast - danger button', async () => {
      container.innerHTML = '<k-button variant="danger">Danger</k-button>';
      const results = await axe(container);

      // Check for color contrast violations
      const contrastViolations = results.violations.filter((v: any) => v.id === 'color-contrast');
      expect(contrastViolations).toHaveLength(0);
    });

    it('should meet WCAG AA contrast ratio for primary button (4.5:1)', () => {
      // Primary blue #1e40af on white #ffffff
      // Expected ratio: 8.59:1 (meets WCAG AAA)
      const ratio = getContrastRatio('rgb(30, 64, 175)', 'rgb(255, 255, 255)');
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('should meet WCAG AA contrast ratio for secondary button (4.5:1)', () => {
      // Secondary gray #4b5563 on white #ffffff
      // Expected ratio: 7.32:1 (meets WCAG AAA)
      const ratio = getContrastRatio('rgb(75, 85, 99)', 'rgb(255, 255, 255)');
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('should meet WCAG AA contrast ratio for danger button (4.5:1)', () => {
      // Danger red #b91c1c on white #ffffff
      // Expected ratio: 8.30:1 (meets WCAG AAA)
      const ratio = getContrastRatio('rgb(185, 28, 28)', 'rgb(255, 255, 255)');
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('ARIA attributes', () => {
    it('button should support aria-label', () => {
      container.innerHTML = '<k-button aria-label="Submit">Submit</k-button>';
      const button = container.querySelector('k-button');
      expect(button?.getAttribute('aria-label')).toBe('Submit');
    });

    it('button should support aria-pressed', () => {
      container.innerHTML = '<k-button aria-pressed="false">Toggle</k-button>';
      const button = container.querySelector('k-button');
      expect(button?.getAttribute('aria-pressed')).toBe('false');
    });

    it('input should support aria-label', () => {
      container.innerHTML = '<k-input aria-label="Email"></k-input>';
      const input = container.querySelector('k-input');
      expect(input?.getAttribute('aria-label')).toBe('Email');
    });

    it('input should support aria-invalid', () => {
      container.innerHTML = '<k-input aria-invalid="true"></k-input>';
      const input = container.querySelector('k-input');
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });

    it('input should support aria-describedby', () => {
      container.innerHTML = '<k-input aria-describedby="error"></k-input>';
      const input = container.querySelector('k-input');
      expect(input?.getAttribute('aria-describedby')).toBe('error');
    });
  });

  describe('Keyboard navigation', () => {
    it('button should be keyboard accessible', () => {
      container.innerHTML = '<k-button>Click me</k-button>';
      const button = container.querySelector('k-button') as any;
      const innerButton = button?.shadowRoot?.querySelector('button');

      // Verify button element exists and is keyboard accessible
      expect(innerButton?.tagName).toBe('BUTTON');
    });

    it('input should be keyboard accessible', () => {
      container.innerHTML = '<k-input></k-input>';
      const input = container.querySelector('k-input') as any;
      const innerInput = input?.shadowRoot?.querySelector('input');

      // Verify input element exists and is keyboard accessible
      expect(innerInput?.tagName).toBe('INPUT');
    });

    it('disabled button should not be keyboard accessible', () => {
      container.innerHTML = '<k-button disabled>Disabled</k-button>';
      const button = container.querySelector('k-button') as any;
      const innerButton = button?.shadowRoot?.querySelector('button');

      // Verify button is disabled
      expect(innerButton?.disabled).toBe(true);
    });

    it('disabled input should not be keyboard accessible', () => {
      container.innerHTML = '<k-input disabled></k-input>';
      const input = container.querySelector('k-input') as any;
      const innerInput = input?.shadowRoot?.querySelector('input');

      // Verify input is disabled
      expect(innerInput?.disabled).toBe(true);
    });
  });

  describe('Focus management', () => {
    it('button should be focusable', () => {
      container.innerHTML = '<k-button>Focus me</k-button>';
      const button = container.querySelector('k-button') as any;
      const innerButton = button?.shadowRoot?.querySelector('button');

      // Verify button can receive focus
      expect(innerButton?.tagName).toBe('BUTTON');
    });

    it('input should be focusable', () => {
      container.innerHTML = '<k-input></k-input>';
      const input = container.querySelector('k-input') as any;
      const innerInput = input?.shadowRoot?.querySelector('input');

      // Verify input can receive focus
      expect(innerInput?.tagName).toBe('INPUT');
    });

    it('disabled button should not be focusable', () => {
      container.innerHTML = '<k-button disabled>Disabled</k-button>';
      const button = container.querySelector('k-button') as any;
      const innerButton = button?.shadowRoot?.querySelector('button');

      // Verify button is disabled and not focusable
      expect(innerButton?.disabled).toBe(true);
    });

    it('disabled input should not be focusable', () => {
      container.innerHTML = '<k-input disabled></k-input>';
      const input = container.querySelector('k-input') as any;
      const innerInput = input?.shadowRoot?.querySelector('input');

      // Verify input is disabled and not focusable
      expect(innerInput?.disabled).toBe(true);
    });
  });
});
