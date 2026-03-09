import { describe, it, expect, beforeEach } from 'vitest';
import {
  mergeClasses,
  getCSSVariableValue,
  isValidVariant,
  isValidSize,
  isValidAnimation,
  getComponentClasses,
} from './index';

describe('Utility Functions', () => {
  describe('mergeClasses()', () => {
    it('should merge multiple class strings', () => {
      const result = mergeClasses('btn', 'btn-primary', 'btn-lg');
      expect(result).toBe('btn btn-primary btn-lg');
    });

    it('should filter out falsy values', () => {
      const result = mergeClasses('btn', false, 'btn-primary', undefined, null);
      expect(result).toBe('btn btn-primary');
    });

    it('should handle empty strings', () => {
      const result = mergeClasses('btn', '', 'btn-primary');
      expect(result).toBe('btn btn-primary');
    });

    it('should return empty string when all values are falsy', () => {
      const result = mergeClasses(false, undefined, null, '');
      expect(result).toBe('');
    });

    it('should handle single class', () => {
      const result = mergeClasses('btn');
      expect(result).toBe('btn');
    });

    it('should handle no arguments', () => {
      const result = mergeClasses();
      expect(result).toBe('');
    });

    it('should preserve class order', () => {
      const result = mergeClasses('z', 'a', 'm');
      expect(result).toBe('z a m');
    });
  });

  describe('getCSSVariableValue()', () => {
    beforeEach(() => {
      // Set up test CSS variables
      document.documentElement.style.setProperty('--test-color', '#ff0000');
      document.documentElement.style.setProperty('--test-size', '16px');
    });

    it('should get CSS variable value with -- prefix', () => {
      const value = getCSSVariableValue('--test-color');
      expect(value).toBe('#ff0000');
    });

    it('should get CSS variable value without -- prefix', () => {
      const value = getCSSVariableValue('test-color');
      expect(value).toBe('#ff0000');
    });

    it('should return undefined for non-existent variable', () => {
      const value = getCSSVariableValue('--non-existent');
      expect(value).toBeUndefined();
    });

    it('should trim whitespace from value', () => {
      document.documentElement.style.setProperty('--test-space', '  value  ');
      const value = getCSSVariableValue('--test-space');
      expect(value).toBe('value');
    });

    it('should handle multiple CSS variables', () => {
      const color = getCSSVariableValue('--test-color');
      const size = getCSSVariableValue('--test-size');
      expect(color).toBe('#ff0000');
      expect(size).toBe('16px');
    });
  });

  describe('isValidVariant()', () => {
    it("should return true for 'primary'", () => {
      expect(isValidVariant('primary')).toBe(true);
    });

    it("should return true for 'secondary'", () => {
      expect(isValidVariant('secondary')).toBe(true);
    });

    it("should return true for 'danger'", () => {
      expect(isValidVariant('danger')).toBe(true);
    });

    it('should return false for invalid variant', () => {
      expect(isValidVariant('invalid')).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isValidVariant(undefined)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isValidVariant(null)).toBe(false);
    });

    it('should be case-sensitive', () => {
      expect(isValidVariant('Primary')).toBe(false);
      expect(isValidVariant('PRIMARY')).toBe(false);
    });
  });

  describe('isValidSize()', () => {
    it("should return true for 'sm'", () => {
      expect(isValidSize('sm')).toBe(true);
    });

    it("should return true for 'md'", () => {
      expect(isValidSize('md')).toBe(true);
    });

    it("should return true for 'lg'", () => {
      expect(isValidSize('lg')).toBe(true);
    });

    it('should return false for invalid size', () => {
      expect(isValidSize('xl')).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isValidSize(undefined)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isValidSize(null)).toBe(false);
    });

    it('should be case-sensitive', () => {
      expect(isValidSize('SM')).toBe(false);
      expect(isValidSize('Md')).toBe(false);
    });
  });

  describe('isValidAnimation()', () => {
    const validAnimations = [
      'pulse',
      'bounce',
      'fade',
      'scale',
      'shake',
      'glow',
      'slide',
      'rotate',
      'flip',
      'none',
    ];

    it('should return true for all valid animations', () => {
      validAnimations.forEach((animation) => {
        expect(isValidAnimation(animation)).toBe(true);
      });
    });

    it('should return false for invalid animation', () => {
      expect(isValidAnimation('invalid')).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isValidAnimation(undefined)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isValidAnimation(null)).toBe(false);
    });

    it('should be case-sensitive', () => {
      expect(isValidAnimation('Pulse')).toBe(false);
      expect(isValidAnimation('BOUNCE')).toBe(false);
    });
  });

  describe('getComponentClasses()', () => {
    it('should return base class only', () => {
      const result = getComponentClasses('k-button');
      expect(result).toBe('k-button');
    });

    it('should include variant class', () => {
      const result = getComponentClasses('k-button', 'primary');
      expect(result).toBe('k-button k-button--primary');
    });

    it('should include size class', () => {
      const result = getComponentClasses('k-button', undefined, 'lg');
      expect(result).toBe('k-button k-button--lg');
    });

    it('should include animation class', () => {
      const result = getComponentClasses('k-button', undefined, undefined, 'pulse');
      expect(result).toBe('k-button k-button--pulse');
    });

    it("should not include animation class when 'none'", () => {
      const result = getComponentClasses('k-button', undefined, undefined, 'none');
      expect(result).toBe('k-button');
    });

    it('should include custom class', () => {
      const result = getComponentClasses(
        'k-button',
        undefined,
        undefined,
        undefined,
        'custom-class'
      );
      expect(result).toBe('k-button custom-class');
    });

    it('should combine all classes', () => {
      const result = getComponentClasses('k-button', 'primary', 'lg', 'pulse', 'custom-class');
      expect(result).toBe('k-button k-button--primary k-button--lg k-button--pulse custom-class');
    });

    it('should handle undefined values gracefully', () => {
      const result = getComponentClasses('k-button', undefined, undefined, undefined, undefined);
      expect(result).toBe('k-button');
    });

    it("should filter out 'none' animation", () => {
      const result = getComponentClasses('k-button', 'primary', 'md', 'none');
      expect(result).toBe('k-button k-button--primary k-button--md');
    });
  });
});
