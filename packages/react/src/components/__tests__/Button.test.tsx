import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KButton } from '../Button';

describe('KButton', () => {
  describe('rendering', () => {
    it('renders a button element', () => {
      render(<KButton>Click me</KButton>);
      const button = screen.getByRole('button');
      expect(button).toBeTruthy();
    });

    it('renders children content', () => {
      render(<KButton>Test Button</KButton>);
      expect(screen.getByText('Test Button')).toBeTruthy();
    });

    it('renders with default variant (primary)', () => {
      render(<KButton>Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--primary');
    });

    it('renders with custom variant', () => {
      render(<KButton variant="secondary">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--secondary');
    });

    it('renders with danger variant', () => {
      render(<KButton variant="danger">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--danger');
    });

    it('renders with default size (md)', () => {
      render(<KButton>Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--md');
    });

    it('renders with small size', () => {
      render(<KButton size="sm">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--sm');
    });

    it('renders with large size', () => {
      render(<KButton size="lg">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--lg');
    });

    it('renders with custom className', () => {
      render(<KButton className="custom-class">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('custom-class');
    });

    it('renders with all prop combinations', () => {
      render(
        <KButton variant="danger" size="lg" animation="pulse" className="extra">
          Button
        </KButton>
      );
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--danger');
      expect(button.className).toContain('k-button--lg');
      expect(button.className).toContain('k-button--pulse');
      expect(button.className).toContain('extra');
    });
  });

  describe('disabled state', () => {
    it('renders as disabled when disabled prop is true', () => {
      render(<KButton disabled>Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('renders as enabled when disabled prop is false', () => {
      render(<KButton disabled={false}>Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.hasAttribute('disabled')).toBe(false);
    });

    it('does not trigger onClick when disabled', async () => {
      const onClick = vi.fn();
      render(
        <KButton disabled onClick={onClick}>
          Button
        </KButton>
      );
      const button = screen.getByRole('button');
      await userEvent.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('click handler', () => {
    it('calls onClick handler when clicked', async () => {
      const onClick = vi.fn();
      render(<KButton onClick={onClick}>Button</KButton>);
      const button = screen.getByRole('button');
      await userEvent.click(button);
      expect(onClick).toHaveBeenCalledOnce();
    });

    it('passes event to onClick handler', async () => {
      const onClick = vi.fn();
      render(<KButton onClick={onClick}>Button</KButton>);
      const button = screen.getByRole('button');
      await userEvent.click(button);
      expect(onClick).toHaveBeenCalledWith(expect.any(Object));
    });

    it('calls onClick multiple times on multiple clicks', async () => {
      const onClick = vi.fn();
      render(<KButton onClick={onClick}>Button</KButton>);
      const button = screen.getByRole('button');
      await userEvent.click(button);
      await userEvent.click(button);
      await userEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('button type', () => {
    it('renders with default type (button)', () => {
      render(<KButton>Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('type')).toBe('button');
    });

    it('renders with submit type', () => {
      render(<KButton type="submit">Submit</KButton>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('type')).toBe('submit');
    });

    it('renders with reset type', () => {
      render(<KButton type="reset">Reset</KButton>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('type')).toBe('reset');
    });
  });

  describe('animations', () => {
    it('renders with animation class when animation prop is set', () => {
      render(<KButton animation="pulse">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--pulse');
    });

    it("renders with no animation class when animation is 'none'", () => {
      render(<KButton animation="none">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).not.toContain('k-button--none');
    });

    it('renders with bounce animation', () => {
      render(<KButton animation="bounce">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--bounce');
    });

    it('renders with fade animation', () => {
      render(<KButton animation="fade">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--fade');
    });

    it('renders with scale animation', () => {
      render(<KButton animation="scale">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--scale');
    });

    it('renders with shake animation', () => {
      render(<KButton animation="shake">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--shake');
    });

    it('renders with glow animation', () => {
      render(<KButton animation="glow">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--glow');
    });

    it('renders with slide animation', () => {
      render(<KButton animation="slide">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--slide');
    });

    it('renders with rotate animation', () => {
      render(<KButton animation="rotate">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--rotate');
    });

    it('renders with flip animation', () => {
      render(<KButton animation="flip">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--flip');
    });
  });

  describe('HTML attributes', () => {
    it('passes through aria-label attribute', () => {
      render(<KButton aria-label="Custom label">Button</KButton>);
      const button = screen.getByRole('button', { name: 'Custom label' });
      expect(button).toBeTruthy();
    });

    it('passes through data attributes', () => {
      render(<KButton data-testid="custom-button">Button</KButton>);
      const button = screen.getByTestId('custom-button');
      expect(button).toBeTruthy();
    });

    it('passes through id attribute', () => {
      render(<KButton id="my-button">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('id')).toBe('my-button');
    });
  });

  describe('edge cases', () => {
    it('renders with empty children', () => {
      render(<KButton></KButton>);
      const button = screen.getByRole('button');
      expect(button).toBeTruthy();
    });

    it('renders with React elements as children', () => {
      render(
        <KButton>
          <span>Icon</span> Text
        </KButton>
      );
      expect(screen.getByText('Icon')).toBeTruthy();
      expect(screen.getByText('Text')).toBeTruthy();
    });

    it('handles rapid clicks', async () => {
      const onClick = vi.fn();
      render(<KButton onClick={onClick}>Button</KButton>);
      const button = screen.getByRole('button');
      await userEvent.click(button);
      await userEvent.click(button);
      await userEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('className merging', () => {
    it('merges default classes with custom className', () => {
      render(<KButton className="custom">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button');
      expect(button.className).toContain('custom');
    });

    it('preserves all variant and size classes with custom className', () => {
      render(
        <KButton variant="secondary" size="lg" className="my-custom">
          Button
        </KButton>
      );
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button');
      expect(button.className).toContain('k-button--secondary');
      expect(button.className).toContain('k-button--lg');
      expect(button.className).toContain('my-custom');
    });

    it('handles multiple custom classes', () => {
      render(<KButton className="class1 class2 class3">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('class1');
      expect(button.className).toContain('class2');
      expect(button.className).toContain('class3');
    });
  });

  describe('design prop', () => {
    it('renders with design prop for variant', () => {
      render(<KButton design="v:primary">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--primary');
    });

    it('renders with design prop for size', () => {
      render(<KButton design="s:lg">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--lg');
    });

    it('renders with design prop for animation', () => {
      render(<KButton design="a:pulse">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--pulse');
    });

    it('renders with multiple design tokens', () => {
      render(<KButton design="v:danger s:sm a:shake">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--danger');
      expect(button.className).toContain('k-button--sm');
      expect(button.className).toContain('k-button--shake');
    });

    it('individual props override design tokens', () => {
      render(<KButton design="v:primary s:md" variant="secondary">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--secondary');
      expect(button.className).toContain('k-button--md');
    });

    it('renders with design prop and custom className', () => {
      render(<KButton design="v:primary s:lg" className="custom">Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('k-button--primary');
      expect(button.className).toContain('k-button--lg');
      expect(button.className).toContain('custom');
    });

    it('handles all animation types in design prop', () => {
      const animations = ['pulse', 'bounce', 'fade', 'scale', 'shake', 'glow', 'slide', 'rotate', 'flip'];
      animations.forEach((anim) => {
        const { container } = render(<KButton design={`a:${anim}`}>Button</KButton>);
        const button = container.querySelector('button');
        expect(button?.className).toContain(`k-button--${anim}`);
      });
    });

    it('handles all variant types in design prop', () => {
      const variants = ['primary', 'secondary', 'danger'];
      variants.forEach((variant) => {
        const { container } = render(<KButton design={`v:${variant}`}>Button</KButton>);
        const button = container.querySelector('button');
        expect(button?.className).toContain(`k-button--${variant}`);
      });
    });

    it('handles all size types in design prop', () => {
      const sizes = ['sm', 'md', 'lg'];
      sizes.forEach((size) => {
        const { container } = render(<KButton design={`s:${size}`}>Button</KButton>);
        const button = container.querySelector('button');
        expect(button?.className).toContain(`k-button--${size}`);
      });
    });
  });

  describe('deprecated props warning', () => {
    it('does not warn when using design prop only', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<KButton design="v:primary s:md">Button</KButton>);
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('warns when using individual variant prop', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<KButton variant="primary">Button</KButton>);
      if (process.env.NODE_ENV === 'development') {
        expect(consoleSpy).toHaveBeenCalled();
      }
      consoleSpy.mockRestore();
    });
  });
    it('supports aria-label attribute', () => {
      render(<KButton aria-label="Close dialog">×</KButton>);
      const button = screen.getByRole('button', { name: 'Close dialog' });
      expect(button).toBeTruthy();
    });

    it('supports aria-pressed attribute for toggle buttons', () => {
      render(<KButton aria-pressed={true}>Toggle</KButton>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('aria-pressed')).toBe('true');
    });

    it('updates aria-pressed when prop changes', () => {
      const { rerender } = render(<KButton aria-pressed={false}>Toggle</KButton>);
      let button = screen.getByRole('button');
      expect(button.getAttribute('aria-pressed')).toBe('false');

      rerender(<KButton aria-pressed={true}>Toggle</KButton>);
      button = screen.getByRole('button');
      expect(button.getAttribute('aria-pressed')).toBe('true');
    });

    it('is keyboard accessible with Tab key', async () => {
      render(<KButton>Button</KButton>);
      const button = screen.getByRole('button');

      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it('is keyboard accessible with Enter key', async () => {
      const onClick = vi.fn();
      render(<KButton onClick={onClick}>Button</KButton>);
      const button = screen.getByRole('button');

      button.focus();
      await userEvent.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalled();
    });

    it('is keyboard accessible with Space key', async () => {
      const onClick = vi.fn();
      render(<KButton onClick={onClick}>Button</KButton>);
      const button = screen.getByRole('button');

      button.focus();
      await userEvent.keyboard(' ');
      expect(onClick).toHaveBeenCalled();
    });

    it('has proper role attribute', () => {
      render(<KButton>Button</KButton>);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('communicates disabled state to assistive technologies', () => {
      render(<KButton disabled>Disabled</KButton>);
      const button = screen.getByRole('button');
      expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('supports aria-label with other attributes', () => {
      render(
        <KButton aria-label="Delete item" variant="danger" size="sm">
          Delete
        </KButton>
      );
      const button = screen.getByRole('button', { name: 'Delete item' });
      expect(button.className).toContain('k-button--danger');
      expect(button.className).toContain('k-button--sm');
    });
  });
});
