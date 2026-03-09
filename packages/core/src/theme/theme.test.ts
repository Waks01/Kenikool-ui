import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setTheme, getTheme, onThemeChange } from './index';

describe('Theme System', () => {
  beforeEach(() => {
    // Reset data-theme attribute before each test
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    // Clean up after each test
    document.documentElement.removeAttribute('data-theme');
  });

  describe('setTheme()', () => {
    it("should set data-theme attribute to 'dark'", () => {
      setTheme('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it("should set data-theme attribute to 'light'", () => {
      setTheme('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it("should remove data-theme attribute when set to 'auto'", () => {
      setTheme('dark');
      setTheme('auto');
      expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    });

    it('should dispatch theme-change event with correct detail', () => {
      const listener = vi.fn();
      window.addEventListener('theme-change', listener);

      setTheme('dark');

      expect(listener).toHaveBeenCalled();
      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.detail.theme).toBe('dark');

      window.removeEventListener('theme-change', listener);
    });
  });

  describe('getTheme()', () => {
    it("should return 'dark' when data-theme is set to 'dark'", () => {
      setTheme('dark');
      expect(getTheme()).toBe('dark');
    });

    it("should return 'light' when data-theme is set to 'light'", () => {
      setTheme('light');
      expect(getTheme()).toBe('light');
    });

    it("should return 'light' by default when data-theme is not set", () => {
      const theme = getTheme();
      expect(theme).toMatch(/^(light|dark)$/);
    });
  });

  describe('onThemeChange()', () => {
    it('should call callback when theme changes', () => {
      const callback = vi.fn();
      const unsubscribe = onThemeChange(callback);

      setTheme('dark');

      expect(callback).toHaveBeenCalledWith('dark');

      unsubscribe();
    });

    it('should call callback multiple times for multiple theme changes', () => {
      const callback = vi.fn();
      const unsubscribe = onThemeChange(callback);

      setTheme('dark');
      setTheme('light');
      setTheme('dark');

      expect(callback).toHaveBeenCalledTimes(3);
      expect(callback).toHaveBeenNthCalledWith(1, 'dark');
      expect(callback).toHaveBeenNthCalledWith(2, 'light');
      expect(callback).toHaveBeenNthCalledWith(3, 'dark');

      unsubscribe();
    });

    it('should stop listening after unsubscribe', () => {
      const callback = vi.fn();
      const unsubscribe = onThemeChange(callback);

      setTheme('dark');
      expect(callback).toHaveBeenCalledTimes(1);

      unsubscribe();

      setTheme('light');
      expect(callback).toHaveBeenCalledTimes(1); // Should not be called again
    });

    it('should support multiple listeners', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      const unsubscribe1 = onThemeChange(callback1);
      const unsubscribe2 = onThemeChange(callback2);

      setTheme('dark');

      expect(callback1).toHaveBeenCalledWith('dark');
      expect(callback2).toHaveBeenCalledWith('dark');

      unsubscribe1();
      unsubscribe2();
    });
  });
});
