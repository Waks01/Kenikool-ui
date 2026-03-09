/**
 * Performance tests for animations
 *
 * Verifies that animations use GPU-accelerated properties and respect prefers-reduced-motion
 */

import { describe, it, expect } from 'vitest';
import './button';
import './input';
import './card';

describe('Animation Performance', () => {
  describe('GPU-Accelerated Properties', () => {
    it('should use transform and opacity for animations', () => {
      const button = document.createElement('k-button');
      button.setAttribute('animation', 'pulse');
      document.body.appendChild(button);

      const styles = button.shadowRoot?.querySelector('style')?.textContent || '';

      // Verify keyframes use GPU-accelerated properties
      expect(styles).toContain('opacity');
      expect(styles).toContain('transform');

      // Verify no CPU-intensive properties in animations
      expect(styles).not.toMatch(/@keyframes.*left:/);
      expect(styles).not.toMatch(/@keyframes.*width:/);
      expect(styles).not.toMatch(/@keyframes.*height:/);

      document.body.removeChild(button);
    });

    it('should use transform for bounce animation', () => {
      const button = document.createElement('k-button');
      document.body.appendChild(button);

      const styles = button.shadowRoot?.querySelector('style')?.textContent || '';

      // Verify bounce uses translateY (GPU-accelerated)
      expect(styles).toContain('translateY');

      document.body.removeChild(button);
    });

    it('should use transform for scale animation', () => {
      const button = document.createElement('k-button');
      document.body.appendChild(button);

      const styles = button.shadowRoot?.querySelector('style')?.textContent || '';

      // Verify scale uses transform scale (GPU-accelerated)
      expect(styles).toContain('scale(');

      document.body.removeChild(button);
    });

    it('should use transform for shake animation', () => {
      const button = document.createElement('k-button');
      document.body.appendChild(button);

      const styles = button.shadowRoot?.querySelector('style')?.textContent || '';

      // Verify shake uses translateX (GPU-accelerated)
      expect(styles).toContain('translateX');

      document.body.removeChild(button);
    });

    it('should use transform for slide animation', () => {
      const button = document.createElement('k-button');
      document.body.appendChild(button);

      const styles = button.shadowRoot?.querySelector('style')?.textContent || '';

      // Verify slide uses translateX (GPU-accelerated)
      expect(styles).toContain('translateX(-100%)');

      document.body.removeChild(button);
    });

    it('should use transform for rotate animation', () => {
      const button = document.createElement('k-button');
      document.body.appendChild(button);

      const styles = button.shadowRoot?.querySelector('style')?.textContent || '';

      // Verify rotate uses transform rotate (GPU-accelerated)
      expect(styles).toContain('rotate(');

      document.body.removeChild(button);
    });

    it('should use transform for flip animation', () => {
      const button = document.createElement('k-button');
      document.body.appendChild(button);

      const styles = button.shadowRoot?.querySelector('style')?.textContent || '';

      // Verify flip uses rotateY (GPU-accelerated)
      expect(styles).toContain('rotateY(');

      document.body.removeChild(button);
    });

    it('should use opacity and transform for glow animation', () => {
      const button = document.createElement('k-button');
      document.body.appendChild(button);

      const styles = button.shadowRoot?.querySelector('style')?.textContent || '';

      // Verify glow uses opacity and scale (GPU-accelerated)
      expect(styles).toContain('@keyframes glow');
      expect(styles).toContain('opacity');
      expect(styles).toContain('scale(');

      document.body.removeChild(button);
    });
  });

  describe('prefers-reduced-motion Support', () => {
    it('should have prefers-reduced-motion media query in button', () => {
      const button = document.createElement('k-button');
      document.body.appendChild(button);

      const styles = button.shadowRoot?.querySelector('style')?.textContent || '';
      expect(styles).toContain('@media (prefers-reduced-motion: reduce)');

      document.body.removeChild(button);
    });

    it('should have prefers-reduced-motion media query in input', () => {
      const input = document.createElement('k-input');
      document.body.appendChild(input);

      const styles = input.shadowRoot?.querySelector('style')?.textContent || '';
      expect(styles).toContain('@media (prefers-reduced-motion: reduce)');

      document.body.removeChild(input);
    });

    it('should have prefers-reduced-motion media query in card', () => {
      const card = document.createElement('k-card');
      document.body.appendChild(card);

      const styles = card.shadowRoot?.querySelector('style')?.textContent || '';
      expect(styles).toContain('@media (prefers-reduced-motion: reduce)');

      document.body.removeChild(card);
    });

    it('should disable animations when prefers-reduced-motion is set', () => {
      const button = document.createElement('k-button');
      button.setAttribute('animation', 'pulse');
      document.body.appendChild(button);

      const styles = button.shadowRoot?.querySelector('style')?.textContent || '';

      // Verify that prefers-reduced-motion sets animation to none
      expect(styles).toContain('animation: none !important');

      document.body.removeChild(button);
    });

    it('should disable transitions when prefers-reduced-motion is set', () => {
      const button = document.createElement('k-button');
      document.body.appendChild(button);

      const styles = button.shadowRoot?.querySelector('style')?.textContent || '';

      // Verify that prefers-reduced-motion sets transition to none
      expect(styles).toContain('transition: none !important');

      document.body.removeChild(button);
    });
  });

  describe('Animation Timing', () => {
    it('should have reasonable animation durations for 60fps', () => {
      const button = document.createElement('k-button');
      document.body.appendChild(button);

      const styles = button.shadowRoot?.querySelector('style')?.textContent || '';

      // Verify animations have reasonable durations (not too fast to cause jank)
      // 60fps = 16.67ms per frame, so animations should be at least 100ms
      expect(styles).toContain('0.2s'); // transitions
      expect(styles).toContain('0.3s'); // fade, scale, shake, slide
      expect(styles).toContain('0.5s'); // bounce
      expect(styles).toContain('0.6s'); // flip
      expect(styles).toContain('1s'); // rotate
      expect(styles).toContain('2s'); // pulse, glow

      document.body.removeChild(button);
    });

    it('should use appropriate easing functions', () => {
      const button = document.createElement('k-button');
      document.body.appendChild(button);

      const styles = button.shadowRoot?.querySelector('style')?.textContent || '';

      // Verify easing functions are used
      expect(styles).toContain('ease-out');
      expect(styles).toContain('ease-in-out');
      expect(styles).toContain('linear');

      document.body.removeChild(button);
    });
  });

  describe('All 10 Animation Types', () => {
    const animationTypes = [
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

    animationTypes.forEach((animationType) => {
      it(`should support ${animationType} animation`, () => {
        const button = document.createElement('k-button');
        button.setAttribute('animation', animationType);
        document.body.appendChild(button);

        const classes = button.shadowRoot?.querySelector('button')?.className || '';

        if (animationType === 'none') {
          // 'none' should not add any animation class
          expect(classes).not.toContain('k-button--pulse');
          expect(classes).not.toContain('k-button--bounce');
        } else {
          expect(classes).toContain(`k-button--${animationType}`);
        }

        document.body.removeChild(button);
      });
    });
  });

  describe('Animation Classes Applied Correctly', () => {
    it('should apply animation class to button', () => {
      const button = document.createElement('k-button');
      button.setAttribute('animation', 'pulse');
      document.body.appendChild(button);

      const innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton?.className).toContain('k-button--pulse');

      document.body.removeChild(button);
    });

    it('should apply animation class to input', () => {
      const input = document.createElement('k-input');
      input.setAttribute('animation', 'bounce');
      document.body.appendChild(input);

      const innerInput = input.shadowRoot?.querySelector('input');
      expect(innerInput?.className).toContain('k-input--bounce');

      document.body.removeChild(input);
    });

    it('should apply animation class to card', () => {
      const card = document.createElement('k-card');
      card.setAttribute('animation', 'fade');
      document.body.appendChild(card);

      const innerDiv = card.shadowRoot?.querySelector('div');
      expect(innerDiv?.className).toContain('k-card--fade');

      document.body.removeChild(card);
    });
  });

  describe('Animation Keyframes Defined', () => {
    it('should define all 10 animation keyframes in button', () => {
      const button = document.createElement('k-button');
      document.body.appendChild(button);

      const styles = button.shadowRoot?.querySelector('style')?.textContent || '';

      expect(styles).toContain('@keyframes pulse');
      expect(styles).toContain('@keyframes bounce');
      expect(styles).toContain('@keyframes fade');
      expect(styles).toContain('@keyframes scale');
      expect(styles).toContain('@keyframes shake');
      expect(styles).toContain('@keyframes glow');
      expect(styles).toContain('@keyframes slide');
      expect(styles).toContain('@keyframes rotate');
      expect(styles).toContain('@keyframes flip');

      document.body.removeChild(button);
    });

    it('should define all 10 animation keyframes in input', () => {
      const input = document.createElement('k-input');
      document.body.appendChild(input);

      const styles = input.shadowRoot?.querySelector('style')?.textContent || '';

      expect(styles).toContain('@keyframes pulse');
      expect(styles).toContain('@keyframes bounce');
      expect(styles).toContain('@keyframes fade');
      expect(styles).toContain('@keyframes scale');
      expect(styles).toContain('@keyframes shake');
      expect(styles).toContain('@keyframes glow');
      expect(styles).toContain('@keyframes slide');
      expect(styles).toContain('@keyframes rotate');
      expect(styles).toContain('@keyframes flip');

      document.body.removeChild(input);
    });

    it('should define all 10 animation keyframes in card', () => {
      const card = document.createElement('k-card');
      document.body.appendChild(card);

      const styles = card.shadowRoot?.querySelector('style')?.textContent || '';

      expect(styles).toContain('@keyframes pulse');
      expect(styles).toContain('@keyframes bounce');
      expect(styles).toContain('@keyframes fade');
      expect(styles).toContain('@keyframes scale');
      expect(styles).toContain('@keyframes shake');
      expect(styles).toContain('@keyframes glow');
      expect(styles).toContain('@keyframes slide');
      expect(styles).toContain('@keyframes rotate');
      expect(styles).toContain('@keyframes flip');

      document.body.removeChild(card);
    });
  });
});
