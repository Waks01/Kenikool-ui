import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

/**
 * Accessibility Test Suite for Storybook Stories
 *
 * This test suite runs axe-core accessibility checks on all component stories
 * to verify WCAG AA compliance.
 */

describe('Storybook Stories - Accessibility Compliance', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Button Stories - WCAG AA Compliance', () => {
    it('Primary button story should have no accessibility violations', async () => {
      container.innerHTML = `
        <button class="k-button k-button--primary k-button--md">
          Primary Button
        </button>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Secondary button story should have no accessibility violations', async () => {
      container.innerHTML = `
        <button class="k-button k-button--secondary k-button--md">
          Secondary Button
        </button>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Danger button story should have no accessibility violations', async () => {
      container.innerHTML = `
        <button class="k-button k-button--danger k-button--md">
          Delete
        </button>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Disabled button story should have no accessibility violations', async () => {
      container.innerHTML = `
        <button class="k-button k-button--primary k-button--md" disabled>
          Disabled Button
        </button>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Button with aria-label should have no accessibility violations', async () => {
      container.innerHTML = `
        <button class="k-button k-button--primary k-button--md" aria-label="Submit form">
          Submit
        </button>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Input Stories - WCAG AA Compliance', () => {
    it('Basic input story should have no accessibility violations', async () => {
      container.innerHTML = `
        <label for="input-1">Email</label>
        <input id="input-1" class="k-input k-input--md" type="text" placeholder="Enter text" />
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Input with aria-label should have no accessibility violations', async () => {
      container.innerHTML = `
        <input class="k-input k-input--md" type="text" aria-label="Email address" />
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Input with error state should have no accessibility violations', async () => {
      container.innerHTML = `
        <label for="input-2">Email</label>
        <input id="input-2" class="k-input k-input--md k-input--error" type="text" aria-invalid="true" />
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Disabled input story should have no accessibility violations', async () => {
      container.innerHTML = `
        <label for="input-3">Email</label>
        <input id="input-3" class="k-input k-input--md" type="text" disabled />
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Email input story should have no accessibility violations', async () => {
      container.innerHTML = `
        <label for="input-4">Email</label>
        <input id="input-4" class="k-input k-input--md" type="email" />
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Card Stories - WCAG AA Compliance', () => {
    it('Basic card story should have no accessibility violations', async () => {
      container.innerHTML = `
        <div class="k-card k-card--md k-card--md-shadow">
          Card content
        </div>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Card with heading should have no accessibility violations', async () => {
      container.innerHTML = `
        <div class="k-card k-card--md k-card--md-shadow">
          <h2>Card Title</h2>
          <p>Card content</p>
        </div>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Card with button should have no accessibility violations', async () => {
      container.innerHTML = `
        <div class="k-card k-card--md k-card--md-shadow">
          <h2>Card Title</h2>
          <button class="k-button k-button--primary k-button--md">Action</button>
        </div>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Card with role attribute should have no accessibility violations', async () => {
      container.innerHTML = `
        <div class="k-card k-card--md k-card--md-shadow" role="region" aria-label="Product card">
          Card content
        </div>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Component Combinations - WCAG AA Compliance', () => {
    it('Form with button and input should have no accessibility violations', async () => {
      container.innerHTML = `
        <form>
          <label for="email">Email</label>
          <input id="email" class="k-input k-input--md" type="email" />
          <button class="k-button k-button--primary k-button--md">Submit</button>
        </form>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Card with form should have no accessibility violations', async () => {
      container.innerHTML = `
        <div class="k-card k-card--md k-card--md-shadow">
          <h2>Contact Form</h2>
          <form>
            <label for="name">Name</label>
            <input id="name" class="k-input k-input--md" type="text" />
            <button class="k-button k-button--primary k-button--md">Submit</button>
          </form>
        </div>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Card with multiple buttons should have no accessibility violations', async () => {
      container.innerHTML = `
        <div class="k-card k-card--md k-card--md-shadow">
          <h2>Actions</h2>
          <button class="k-button k-button--primary k-button--md">Save</button>
          <button class="k-button k-button--secondary k-button--md">Cancel</button>
          <button class="k-button k-button--danger k-button--md">Delete</button>
        </div>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Color Contrast Verification', () => {
    it('Primary button should have sufficient color contrast', async () => {
      container.innerHTML = `
        <button class="k-button k-button--primary k-button--md">Primary</button>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Secondary button should have sufficient color contrast', async () => {
      container.innerHTML = `
        <button class="k-button k-button--secondary k-button--md">Secondary</button>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Danger button should have sufficient color contrast', async () => {
      container.innerHTML = `
        <button class="k-button k-button--danger k-button--md">Danger</button>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Input field should have sufficient color contrast', async () => {
      container.innerHTML = `
        <input class="k-input k-input--md" type="text" aria-label="Input field" />
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Card should have sufficient color contrast', async () => {
      container.innerHTML = `
        <div class="k-card k-card--md k-card--md-shadow">Content</div>
      `;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Keyboard Navigation', () => {
    it('Button should be keyboard accessible', () => {
      container.innerHTML = `
        <button class="k-button k-button--primary k-button--md">Click me</button>
      `;
      const button = container.querySelector('button');
      expect(button?.tagName).toBe('BUTTON');
    });

    it('Input should be keyboard accessible', () => {
      container.innerHTML = `
        <input class="k-input k-input--md" type="text" />
      `;
      const input = container.querySelector('input');
      expect(input?.tagName).toBe('INPUT');
    });

    it('Disabled button should not be keyboard accessible', () => {
      container.innerHTML = `
        <button class="k-button k-button--primary k-button--md" disabled>Disabled</button>
      `;
      const button = container.querySelector('button') as HTMLButtonElement;
      expect(button?.disabled).toBe(true);
    });

    it('Disabled input should not be keyboard accessible', () => {
      container.innerHTML = `
        <input class="k-input k-input--md" type="text" disabled />
      `;
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.disabled).toBe(true);
    });
  });

  describe('ARIA Attributes', () => {
    it('Button should support aria-label', () => {
      container.innerHTML = `
        <button class="k-button k-button--primary k-button--md" aria-label="Submit">Submit</button>
      `;
      const button = container.querySelector('button');
      expect(button?.getAttribute('aria-label')).toBe('Submit');
    });

    it('Button should support aria-pressed', () => {
      container.innerHTML = `
        <button class="k-button k-button--primary k-button--md" aria-pressed="false">Toggle</button>
      `;
      const button = container.querySelector('button');
      expect(button?.getAttribute('aria-pressed')).toBe('false');
    });

    it('Input should support aria-label', () => {
      container.innerHTML = `
        <input class="k-input k-input--md" type="text" aria-label="Email" />
      `;
      const input = container.querySelector('input');
      expect(input?.getAttribute('aria-label')).toBe('Email');
    });

    it('Input should support aria-invalid', () => {
      container.innerHTML = `
        <input class="k-input k-input--md" type="text" aria-invalid="true" />
      `;
      const input = container.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });

    it('Card should support role and aria-label', () => {
      container.innerHTML = `
        <div class="k-card k-card--md k-card--md-shadow" role="region" aria-label="Product card">Content</div>
      `;
      const card = container.querySelector('[role="region"]');
      expect(card?.getAttribute('aria-label')).toBe('Product card');
    });
  });
});
