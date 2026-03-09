import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KInput } from '../Input';

describe('KInput', () => {
  describe('rendering', () => {
    it('renders an input element', () => {
      render(<KInput />);
      const input = screen.getByRole('textbox');
      expect(input).toBeTruthy();
    });

    it('renders with default size (md)', () => {
      render(<KInput />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('k-input--md');
    });

    it('renders with small size', () => {
      render(<KInput size="sm" />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('k-input--sm');
    });

    it('renders with large size', () => {
      render(<KInput size="lg" />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('k-input--lg');
    });

    it('renders with custom className', () => {
      render(<KInput className="custom-class" />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('custom-class');
    });

    it('renders with placeholder', () => {
      render(<KInput placeholder="Enter text" />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeTruthy();
    });

    it('renders with custom type', () => {
      render(<KInput type="email" />);
      const input = screen.getByRole('textbox');
      expect(input.getAttribute('type')).toBe('email');
    });

    it('renders with password type', () => {
      const { container } = render(<KInput type="password" />);
      const input = container.querySelector('input[type="password"]');
      expect(input).toBeTruthy();
    });
  });

  describe('disabled state', () => {
    it('renders as disabled when disabled prop is true', () => {
      render(<KInput disabled />);
      const input = screen.getByRole('textbox');
      expect(input.hasAttribute('disabled')).toBe(true);
    });

    it('renders as enabled when disabled prop is false', () => {
      render(<KInput disabled={false} />);
      const input = screen.getByRole('textbox');
      expect(input.hasAttribute('disabled')).toBe(false);
    });

    it('applies disabled class when disabled', () => {
      render(<KInput disabled />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('k-input--disabled');
    });

    it('does not accept input when disabled', async () => {
      render(<KInput disabled value="" onChange={() => {}} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      await userEvent.type(input, 'test');
      expect(input.value).toBe('');
    });
  });

  describe('error state', () => {
    it('applies error class when error prop is true', () => {
      render(<KInput error />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('k-input--error');
    });

    it('does not apply error class when error prop is false', () => {
      render(<KInput error={false} />);
      const input = screen.getByRole('textbox');
      expect(input.className).not.toContain('k-input--error');
    });

    it('renders with error styling', () => {
      render(<KInput error size="md" />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('k-input--error');
      expect(input.className).toContain('k-input--md');
    });
  });

  describe('controlled component', () => {
    it('renders with value prop', () => {
      render(<KInput value="test value" onChange={() => {}} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('test value');
    });

    it('updates value when value prop changes', () => {
      const { rerender } = render(<KInput value="initial" onChange={() => {}} />);
      let input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('initial');

      rerender(<KInput value="updated" onChange={() => {}} />);
      input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('updated');
    });

    it('calls onChange handler when value changes', async () => {
      const onChange = vi.fn();
      render(<KInput value="" onChange={onChange} />);
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'a');
      expect(onChange).toHaveBeenCalled();
    });

    it('passes event to onChange handler', async () => {
      const onChange = vi.fn();
      render(<KInput value="" onChange={onChange} />);
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'a');
      expect(onChange).toHaveBeenCalledWith(expect.any(Object));
    });

    it('handles multiple character input', async () => {
      const onChange = vi.fn();
      render(<KInput value="" onChange={onChange} />);
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'hello');
      expect(onChange).toHaveBeenCalledTimes(5);
    });
  });

  describe('uncontrolled component', () => {
    it('renders without value prop', () => {
      render(<KInput />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('maintains internal state without value prop', async () => {
      render(<KInput />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      await userEvent.type(input, 'test');
      expect(input.value).toBe('test');
    });

    it('calls onChange handler in uncontrolled mode', async () => {
      const onChange = vi.fn();
      render(<KInput onChange={onChange} />);
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'a');
      expect(onChange).toHaveBeenCalled();
    });

    it('allows clearing input in uncontrolled mode', async () => {
      render(<KInput />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      await userEvent.type(input, 'test');
      expect(input.value).toBe('test');
      await userEvent.clear(input);
      expect(input.value).toBe('');
    });
  });

  describe('animations', () => {
    it('renders with animation class when animation prop is set', () => {
      render(<KInput animation="fade" />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('k-input--fade');
    });

    it("renders with no animation class when animation is 'none'", () => {
      render(<KInput animation="none" />);
      const input = screen.getByRole('textbox');
      expect(input.className).not.toContain('k-input--none');
    });
  });

  describe('HTML attributes', () => {
    it('passes through aria-label attribute', () => {
      render(<KInput aria-label="Email input" />);
      const input = screen.getByLabelText('Email input');
      expect(input).toBeTruthy();
    });

    it('passes through data attributes', () => {
      render(<KInput data-testid="custom-input" />);
      const input = screen.getByTestId('custom-input');
      expect(input).toBeTruthy();
    });

    it('passes through id attribute', () => {
      render(<KInput id="my-input" />);
      const input = screen.getByRole('textbox');
      expect(input.getAttribute('id')).toBe('my-input');
    });

    it('passes through name attribute', () => {
      render(<KInput name="email" />);
      const input = screen.getByRole('textbox');
      expect(input.getAttribute('name')).toBe('email');
    });
  });

  describe('edge cases', () => {
    it('handles empty placeholder', () => {
      render(<KInput placeholder="" />);
      const input = screen.getByRole('textbox');
      expect(input.getAttribute('placeholder')).toBe('');
    });

    it('handles special characters in value', async () => {
      render(<KInput />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      await userEvent.type(input, '!@#$%^&*()');
      expect(input.value).toBe('!@#$%^&*()');
    });

    it('handles very long input', async () => {
      render(<KInput />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const longText = 'a'.repeat(100);
      await userEvent.type(input, longText);
      expect(input.value).toBe(longText);
    });

    it('handles rapid input changes', async () => {
      const onChange = vi.fn();
      render(<KInput onChange={onChange} />);
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'abc');
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls.length).toBeGreaterThanOrEqual(3);
    });

    it('handles focus and blur events', async () => {
      render(<KInput />);
      const input = screen.getByRole('textbox');
      await userEvent.click(input);
      expect(document.activeElement).toBe(input);
      await userEvent.tab();
      expect(document.activeElement).not.toBe(input);
    });
  });

  describe('all prop combinations', () => {
    it('renders with all props combined', () => {
      render(
        <KInput
          size="lg"
          disabled={false}
          error={true}
          placeholder="Enter email"
          type="email"
          value="test@example.com"
          onChange={() => {}}
          className="custom"
          aria-label="Email field"
        />
      );
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('k-input--lg');
      expect(input.className).toContain('k-input--error');
      expect(input.className).toContain('custom');
      expect(input.getAttribute('type')).toBe('email');
      expect(input.getAttribute('placeholder')).toBe('Enter email');
      expect(input.getAttribute('aria-label')).toBe('Email field');
    });
  });

  describe('className merging', () => {
    it('merges default classes with custom className', () => {
      render(<KInput className="custom" />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('k-input');
      expect(input.className).toContain('custom');
    });

    it('preserves all size and error classes with custom className', () => {
      render(<KInput size="lg" error className="my-custom" />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('k-input');
      expect(input.className).toContain('k-input--lg');
      expect(input.className).toContain('k-input--error');
      expect(input.className).toContain('my-custom');
    });

    it('handles multiple custom classes', () => {
      render(<KInput className="class1 class2 class3" />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('class1');
      expect(input.className).toContain('class2');
      expect(input.className).toContain('class3');
    });
  });

  describe('accessibility', () => {
    it('supports aria-label attribute', () => {
      render(<KInput aria-label="Email address" />);
      const input = screen.getByLabelText('Email address');
      expect(input).toBeTruthy();
    });

    it('supports aria-describedby attribute', () => {
      render(
        <>
          <KInput aria-describedby="error-message" />
          <div id="error-message">This field is required</div>
        </>
      );
      const input = screen.getByRole('textbox');
      expect(input.getAttribute('aria-describedby')).toBe('error-message');
    });

    it('sets aria-invalid when error prop is true', () => {
      render(<KInput error />);
      const input = screen.getByRole('textbox');
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });

    it('sets aria-invalid to false when error prop is false', () => {
      render(<KInput error={false} />);
      const input = screen.getByRole('textbox');
      expect(input.getAttribute('aria-invalid')).toBe('false');
    });

    it('respects explicit aria-invalid prop over error prop', () => {
      render(<KInput error={false} aria-invalid={true} />);
      const input = screen.getByRole('textbox');
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });

    it('is keyboard accessible with Tab key', async () => {
      render(<KInput />);
      const input = screen.getByRole('textbox');

      input.focus();
      expect(document.activeElement).toBe(input);
    });

    it('accepts keyboard input', async () => {
      render(<KInput />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      input.focus();
      await userEvent.type(input, 'hello');
      expect(input.value).toBe('hello');
    });

    it('supports screen reader interaction', () => {
      render(<KInput aria-label="Search" type="search" />);
      const input = screen.getByLabelText('Search');
      expect(input.getAttribute('type')).toBe('search');
    });

    it('communicates disabled state to assistive technologies', () => {
      render(<KInput disabled />);
      const input = screen.getByRole('textbox');
      expect(input.hasAttribute('disabled')).toBe(true);
    });

    it('supports aria-label with other attributes', () => {
      render(<KInput aria-label="Email input" type="email" size="lg" error={true} />);
      const input = screen.getByLabelText('Email input');
      expect(input.getAttribute('type')).toBe('email');
      expect(input.className).toContain('k-input--lg');
      expect(input.className).toContain('k-input--error');
    });

    it('supports aria-describedby with error messages', () => {
      render(
        <>
          <KInput aria-label="Password" aria-describedby="password-hint" type="password" />
          <div id="password-hint">Must be at least 8 characters</div>
        </>
      );
      const input = screen.getByLabelText('Password');
      expect(input.getAttribute('aria-describedby')).toBe('password-hint');
    });
  });
});
