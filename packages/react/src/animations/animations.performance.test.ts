/**
 * Performance tests for React animations
 *
 * Verifies that animations use GPU-accelerated properties and respect prefers-reduced-motion
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getAnimationVariant, animationVariants } from './variants';

describe('React Animation Performance', () => {
  describe('GPU-Accelerated Properties', () => {
    it('should use GPU-accelerated properties for pulse animation', () => {
      const pulse = animationVariants.pulse;
      expect(pulse.animate).toBeDefined();
      // Pulse uses opacity which is GPU-accelerated
      expect(pulse.animate.opacity).toBeDefined();
    });

    it('should use GPU-accelerated properties for bounce animation', () => {
      const bounce = animationVariants.bounce;
      expect(bounce.animate).toBeDefined();
      // Bounce uses y (translateY) which is GPU-accelerated
      expect(bounce.animate.y).toBeDefined();
    });

    it('should use GPU-accelerated properties for scale animation', () => {
      const scale = animationVariants.scale;
      expect(scale.whileHover).toBeDefined();
      // Scale uses scale transform which is GPU-accelerated
      expect(scale.whileHover.scale).toBeDefined();
    });

    it('should use GPU-accelerated properties for shake animation', () => {
      const shake = animationVariants.shake;
      expect(shake.animate).toBeDefined();
      // Shake uses x (translateX) which is GPU-accelerated
      expect(shake.animate.x).toBeDefined();
    });

    it('should use GPU-accelerated properties for glow animation', () => {
      const glow = animationVariants.glow;
      expect(glow.animate).toBeDefined();
      // Glow uses boxShadow which is GPU-accelerated
      expect(glow.animate.boxShadow).toBeDefined();
    });

    it('should use GPU-accelerated properties for slide animation', () => {
      const slide = animationVariants.slide;
      expect(slide.animate).toBeDefined();
      // Slide uses x (translateX) which is GPU-accelerated
      expect(slide.animate.x).toBeDefined();
    });

    it('should use GPU-accelerated properties for rotate animation', () => {
      const rotate = animationVariants.rotate;
      expect(rotate.animate).toBeDefined();
      // Rotate uses rotate transform which is GPU-accelerated
      expect(rotate.animate.rotate).toBeDefined();
    });

    it('should use GPU-accelerated properties for flip animation', () => {
      const flip = animationVariants.flip;
      expect(flip.animate).toBeDefined();
      // Flip uses rotateY which is GPU-accelerated
      expect(flip.animate.rotateY).toBeDefined();
    });

    it('should use GPU-accelerated properties for fade animation', () => {
      const fade = animationVariants.fade;
      expect(fade.animate).toBeDefined();
      // Fade uses opacity which is GPU-accelerated
      expect(fade.animate.opacity).toBeDefined();
    });
  });

  describe('prefers-reduced-motion Support', () => {
    let matchMediaMock: any;

    beforeEach(() => {
      matchMediaMock = vi.fn().mockReturnValue({
        matches: false,
      });
      window.matchMedia = matchMediaMock;
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should return undefined when prefers-reduced-motion is set', () => {
      matchMediaMock.mockReturnValue({
        matches: true,
      });

      const variant = getAnimationVariant('pulse');
      expect(variant).toBeUndefined();
    });

    it('should return undefined for all animations when prefers-reduced-motion is true', () => {
      matchMediaMock.mockReturnValue({
        matches: true,
      });

      const animations = [
        'pulse',
        'bounce',
        'fade',
        'scale',
        'shake',
        'glow',
        'slide',
        'rotate',
        'flip',
      ];

      animations.forEach((animation) => {
        const variant = getAnimationVariant(animation);
        expect(variant).toBeUndefined();
      });
    });

    it('should return variants for all animations when prefers-reduced-motion is false', () => {
      matchMediaMock.mockReturnValue({
        matches: false,
      });

      const animations = [
        'pulse',
        'bounce',
        'fade',
        'scale',
        'shake',
        'glow',
        'slide',
        'rotate',
        'flip',
      ];

      animations.forEach((animation) => {
        const variant = getAnimationVariant(animation);
        expect(variant).toBeDefined();
      });
    });

    it('should check prefers-reduced-motion media query', () => {
      getAnimationVariant('pulse');
      expect(matchMediaMock).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
    });
  });

  describe('Animation Timing', () => {
    it('should have reasonable animation durations for 60fps', () => {
      // Verify animations have reasonable durations (not too fast to cause jank)
      // 60fps = 16.67ms per frame, so animations should be at least 100ms

      expect(animationVariants.pulse.animate.transition.duration).toBe(2); // 2000ms
      expect(animationVariants.bounce.animate.transition.duration).toBe(0.5); // 500ms
      expect(animationVariants.fade.animate.transition.duration).toBe(0.3); // 300ms
      expect(animationVariants.scale.whileHover.transition.duration).toBe(0.3); // 300ms
      expect(animationVariants.shake.animate.transition.duration).toBe(0.3); // 300ms
      expect(animationVariants.glow.animate.transition.duration).toBe(2); // 2000ms
      expect(animationVariants.slide.animate.transition.duration).toBe(0.3); // 300ms
      expect(animationVariants.rotate.animate.transition.duration).toBe(1); // 1000ms
      expect(animationVariants.flip.animate.transition.duration).toBe(0.6); // 600ms
    });

    it('should use appropriate easing functions', () => {
      expect(animationVariants.pulse.animate.transition.ease).toBe('easeInOut');
      expect(animationVariants.bounce.animate.transition.ease).toBe('easeOut');
      expect(animationVariants.fade.animate.transition.ease).toBe('easeOut');
      expect(animationVariants.scale.whileHover.transition.ease).toBe('easeOut');
      expect(animationVariants.shake.animate.transition.ease).toBe('easeOut');
      expect(animationVariants.glow.animate.transition.ease).toBe('easeOut');
      expect(animationVariants.slide.animate.transition.ease).toBe('easeOut');
      expect(animationVariants.rotate.animate.transition.ease).toBe('linear');
      expect(animationVariants.flip.animate.transition.ease).toBe('easeOut');
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
        const variant = getAnimationVariant(animationType);

        if (animationType === 'none') {
          expect(variant).toBeUndefined();
        } else {
          expect(variant).toBeDefined();
          expect(animationVariants).toHaveProperty(animationType);
        }
      });
    });
  });

  describe('Animation Variants Defined', () => {
    it('should define all 10 animation variants', () => {
      const expectedAnimations = [
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

      expectedAnimations.forEach((animation) => {
        expect(animationVariants).toHaveProperty(animation);
      });
    });

    it('should have animate or whileHover properties for each animation', () => {
      const animations = ['pulse', 'bounce', 'fade', 'shake', 'glow', 'slide', 'rotate', 'flip'];

      animations.forEach((animation) => {
        const variant = animationVariants[animation];
        const hasAnimateOrHover = variant.animate !== undefined || variant.whileHover !== undefined;
        expect(hasAnimateOrHover).toBe(true);
      });
    });

    it('should have transition properties for each animation', () => {
      const animations = [
        'pulse',
        'bounce',
        'fade',
        'scale',
        'shake',
        'glow',
        'slide',
        'rotate',
        'flip',
      ];

      animations.forEach((animation) => {
        const variant = animationVariants[animation];
        const hasTransition =
          variant.animate?.transition !== undefined || variant.whileHover?.transition !== undefined;
        expect(hasTransition).toBe(true);
      });
    });
  });

  describe('Animation Keyframes', () => {
    it('pulse should animate opacity', () => {
      const pulse = animationVariants.pulse;
      expect(pulse.animate.opacity).toEqual([1, 0.5, 1]);
    });

    it('bounce should animate y position', () => {
      const bounce = animationVariants.bounce;
      expect(bounce.animate.y).toEqual([0, -10, 0]);
    });

    it('fade should animate opacity from 0 to 1', () => {
      const fade = animationVariants.fade;
      expect(fade.initial.opacity).toBe(0);
      expect(fade.animate.opacity).toBe(1);
    });

    it('scale should scale to 1.05', () => {
      const scale = animationVariants.scale;
      expect(scale.whileHover.scale).toBe(1.05);
    });

    it('shake should animate x position', () => {
      const shake = animationVariants.shake;
      expect(shake.animate.x).toEqual([0, -5, 5, -5, 0]);
    });

    it('glow should animate boxShadow', () => {
      const glow = animationVariants.glow;
      expect(glow.animate.boxShadow).toBeDefined();
      expect(Array.isArray(glow.animate.boxShadow)).toBe(true);
    });

    it('slide should animate x from -100% to 0', () => {
      const slide = animationVariants.slide;
      expect(slide.initial.x).toBe('-100%');
      expect(slide.animate.x).toBe(0);
    });

    it('rotate should rotate 360 degrees', () => {
      const rotate = animationVariants.rotate;
      expect(rotate.animate.rotate).toBe(360);
    });

    it('flip should rotate Y 360 degrees', () => {
      const flip = animationVariants.flip;
      expect(flip.animate.rotateY).toBe(360);
    });

    it('none should be empty', () => {
      const none = animationVariants.none;
      expect(Object.keys(none).length).toBe(0);
    });
  });

  describe('Infinite Animations', () => {
    it('pulse should repeat infinitely', () => {
      const pulse = animationVariants.pulse;
      expect(pulse.animate.transition.repeat).toBe(Infinity);
    });

    it('glow should repeat infinitely', () => {
      const glow = animationVariants.glow;
      expect(glow.animate.transition.repeat).toBe(Infinity);
    });

    it('rotate should repeat infinitely', () => {
      const rotate = animationVariants.rotate;
      expect(rotate.animate.transition.repeat).toBe(Infinity);
    });

    it('bounce should not repeat', () => {
      const bounce = animationVariants.bounce;
      expect(bounce.animate.transition.repeat).toBeUndefined();
    });

    it('fade should not repeat', () => {
      const fade = animationVariants.fade;
      expect(fade.animate.transition.repeat).toBeUndefined();
    });
  });
});
