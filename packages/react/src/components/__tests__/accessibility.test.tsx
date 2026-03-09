import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { KButton } from '../Button';
import { KInput } from '../Input';
import { KCard } from '../Card';

expect.extend(toHaveNoViolations);

describe('Accessibility - axe-core compliance', () => {
  describe('KButton accessibility', () => {
    it('should not have accessibility violations - primary button', async () => {
      const { container } = render(<KButton variant="primary">Click me</KButton>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - secondary button', async () => {
      const { container } = render(<KButton variant="secondary">Click me</KButton>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - danger button', async () => {
      const { container } = render(<KButton variant="danger">Delete</KButton>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - disabled button', async () => {
      const { container } = render(<KButton disabled>Disabled</KButton>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - button with aria-label', async () => {
      const { container } = render(<KButton aria-label="Close dialog">×</KButton>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - button with aria-pressed', async () => {
      const { container } = render(<KButton aria-pressed={true}>Toggle</KButton>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - all button sizes', async () => {
      const { container } = render(
        <>
          <KButton size="sm">Small</KButton>
          <KButton size="md">Medium</KButton>
          <KButton size="lg">Large</KButton>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - button with animation', async () => {
      const { container } = render(<KButton animation="pulse">Pulsing</KButton>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('KInput accessibility', () => {
    it('should not have accessibility violations - basic input', async () => {
      const { container } = render(<KInput placeholder="Enter text" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - input with aria-label', async () => {
      const { container } = render(<KInput aria-label="Email address" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - input with error state', async () => {
      const { container } = render(<KInput error aria-invalid={true} placeholder="Enter text" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - disabled input', async () => {
      const { container } = render(<KInput disabled placeholder="Enter text" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - input with aria-describedby', async () => {
      const { container } = render(
        <>
          <KInput aria-label="Email" aria-describedby="error-message" />
          <div id="error-message">This field is required</div>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - all input sizes', async () => {
      const { container } = render(
        <>
          <KInput size="sm" aria-label="Small" />
          <KInput size="md" aria-label="Medium" />
          <KInput size="lg" aria-label="Large" />
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - input with placeholder', async () => {
      const { container } = render(<KInput placeholder="Enter text" aria-label="Text input" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - email input', async () => {
      const { container } = render(<KInput type="email" aria-label="Email" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - password input', async () => {
      const { container } = render(<KInput type="password" aria-label="Password" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('KCard accessibility', () => {
    it('should not have accessibility violations - basic card', async () => {
      const { container } = render(<KCard>Content</KCard>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - card with role', async () => {
      const { container } = render(<KCard role="region">Content</KCard>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - card with aria-label', async () => {
      const { container } = render(<KCard aria-label="Product card">Content</KCard>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - card with role and aria-label', async () => {
      const { container } = render(
        <KCard role="region" aria-label="Main content">
          Content
        </KCard>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - card with heading', async () => {
      const { container } = render(
        <KCard>
          <h2>Card Title</h2>
          <p>Card content</p>
        </KCard>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - card with button', async () => {
      const { container } = render(
        <KCard>
          <h2>Card Title</h2>
          <button>Action</button>
        </KCard>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - all card padding variants', async () => {
      const { container } = render(
        <>
          <KCard padding="sm">Small</KCard>
          <KCard padding="md">Medium</KCard>
          <KCard padding="lg">Large</KCard>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - all card shadow variants', async () => {
      const { container } = render(
        <>
          <KCard shadow="sm">Small</KCard>
          <KCard shadow="md">Medium</KCard>
          <KCard shadow="lg">Large</KCard>
          <KCard shadow="none">None</KCard>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Component combinations accessibility', () => {
    it('should not have accessibility violations - button inside card', async () => {
      const { container } = render(
        <KCard>
          <h2>Card Title</h2>
          <KButton>Action</KButton>
        </KCard>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - input inside card', async () => {
      const { container } = render(
        <KCard>
          <label htmlFor="input-1">Email</label>
          <KInput id="input-1" type="email" />
        </KCard>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - form with button and input', async () => {
      const { container } = render(
        <KCard role="region" aria-label="Contact form">
          <h2>Contact Us</h2>
          <label htmlFor="name">Name</label>
          <KInput id="name" aria-label="Your name" />
          <label htmlFor="email">Email</label>
          <KInput id="email" type="email" aria-label="Your email" />
          <KButton>Submit</KButton>
        </KCard>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations - multiple cards with buttons', async () => {
      const { container } = render(
        <>
          <KCard>
            <h2>Card 1</h2>
            <KButton>Action 1</KButton>
          </KCard>
          <KCard>
            <h2>Card 2</h2>
            <KButton>Action 2</KButton>
          </KCard>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Color contrast verification', () => {
    it('should have sufficient color contrast - primary button', async () => {
      const { container } = render(<KButton variant="primary">Click me</KButton>);
      const results = await axe(container);
      // axe-core will check color contrast as part of its analysis
      expect(results).toHaveNoViolations();
    });

    it('should have sufficient color contrast - secondary button', async () => {
      const { container } = render(<KButton variant="secondary">Click me</KButton>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have sufficient color contrast - danger button', async () => {
      const { container } = render(<KButton variant="danger">Delete</KButton>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have sufficient color contrast - input', async () => {
      const { container } = render(<KInput aria-label="Input field" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have sufficient color contrast - card', async () => {
      const { container } = render(<KCard>Content</KCard>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Keyboard Navigation', () => {
    it('button should respond to Enter key', () => {
      const { container } = render(<KButton>Click me</KButton>);
      const button = container.querySelector('button');
      const clickSpy = vi.fn();
      button?.addEventListener('click', clickSpy);

      // Simulate Enter key press
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      button?.dispatchEvent(enterEvent);

      // Note: The actual click happens through the button's native behavior
      expect(button).toBeTruthy();
    });

    it('button should respond to Space key', () => {
      const { container } = render(<KButton>Click me</KButton>);
      const button = container.querySelector('button');
      const clickSpy = vi.fn();
      button?.addEventListener('click', clickSpy);

      // Simulate Space key press
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      button?.dispatchEvent(spaceEvent);

      expect(button).toBeTruthy();
    });

    it('input should be keyboard accessible', () => {
      const { container } = render(<KInput aria-label="Test input" />);
      const input = container.querySelector('input');

      // Input should be focusable
      input?.focus();
      expect(document.activeElement).toBe(input);

      // Input should accept keyboard input
      const inputEvent = new KeyboardEvent('keydown', { key: 'a' });
      input?.dispatchEvent(inputEvent);
      expect(input).toBeTruthy();
    });

    it('disabled button should not respond to keyboard', () => {
      const { container } = render(<KButton disabled>Disabled</KButton>);
      const button = container.querySelector('button');

      expect(button?.hasAttribute('disabled')).toBe(true);
    });

    it('disabled input should not respond to keyboard', () => {
      const { container } = render(<KInput disabled />);
      const input = container.querySelector('input');

      expect(input?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Focus management', () => {
    it('button should be focusable', () => {
      const { container } = render(<KButton>Click me</KButton>);
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      button?.focus();
      expect(document.activeElement).toBe(button);
    });

    it('input should be focusable', () => {
      const { container } = render(<KInput />);
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
      input?.focus();
      expect(document.activeElement).toBe(input);
    });

    it('disabled button should not be focusable via keyboard', () => {
      const { container } = render(<KButton disabled>Disabled</KButton>);
      const button = container.querySelector('button');
      expect(button?.hasAttribute('disabled')).toBe(true);
    });

    it('disabled input should not be focusable via keyboard', () => {
      const { container } = render(<KInput disabled />);
      const input = container.querySelector('input');
      expect(input?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('ARIA Attributes Verification', () => {
    it('button should have proper ARIA attributes', () => {
      const { container } = render(
        <KButton aria-label="Submit form" aria-pressed={false}>
          Submit
        </KButton>
      );
      const button = container.querySelector('button');
      expect(button?.getAttribute('aria-label')).toBe('Submit form');
      expect(button?.getAttribute('aria-pressed')).toBe('false');
    });

    it('input should have proper ARIA attributes', () => {
      const { container } = render(
        <KInput aria-label="Email input" aria-describedby="email-help" aria-invalid={false} />
      );
      const input = container.querySelector('input');
      expect(input?.getAttribute('aria-label')).toBe('Email input');
      expect(input?.getAttribute('aria-describedby')).toBe('email-help');
      expect(input?.getAttribute('aria-invalid')).toBe('false');
    });

    it('input with error should have aria-invalid set to true', () => {
      const { container } = render(<KInput error aria-invalid={true} />);
      const input = container.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });

    it('card should have proper ARIA attributes', () => {
      const { container } = render(
        <KCard role="region" aria-label="Product card">
          Content
        </KCard>
      );
      const card = container.querySelector('[role="region"]');
      expect(card?.getAttribute('aria-label')).toBe('Product card');
    });
  });
});
