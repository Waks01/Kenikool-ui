import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getAnimationVariant, animationVariants } from './variants';

describe('Animation Variants', () => {
  describe('animationVariants object', () => {
    it('should have all animation types defined', () => {
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

    it('pulse animation should have correct properties', () => {
      const pulse = animationVariants.pulse;
      expect(pulse.animate).toBeDefined();
      expect(pulse.animate.opacity).toEqual([1, 0.5, 1]);
      expect(pulse.animate.transition.duration).toBe(2);
      expect(pulse.animate.transition.repeat).toBe(Infinity);
    });

    it('bounce animation should have correct properties', () => {
      const bounce = animationVariants.bounce;
      expect(bounce.animate).toBeDefined();
      expect(bounce.animate.y).toEqual([0, -10, 0]);
      expect(bounce.animate.transition.duration).toBe(0.5);
    });

    it('fade animation should have initial and animate states', () => {
      const fade = animationVariants.fade;
      expect(fade.initial).toBeDefined();
      expect(fade.initial.opacity).toBe(0);
      expect(fade.animate).toBeDefined();
      expect(fade.animate.opacity).toBe(1);
      expect(fade.animate.transition.duration).toBe(0.3);
    });

    it('scale animation should have whileHover state', () => {
      const scale = animationVariants.scale;
      expect(scale.whileHover).toBeDefined();
      expect(scale.whileHover.scale).toBe(1.05);
      expect(scale.whileHover.transition.duration).toBe(0.3);
    });

    it('shake animation should have correct keyframes', () => {
      const shake = animationVariants.shake;
      expect(shake.animate).toBeDefined();
      expect(shake.animate.x).toEqual([0, -5, 5, -5, 0]);
      expect(shake.animate.transition.duration).toBe(0.3);
    });

    it('glow animation should have boxShadow animation', () => {
      const glow = animationVariants.glow;
      expect(glow.animate).toBeDefined();
      expect(glow.animate.boxShadow).toBeDefined();
      expect(glow.animate.transition.duration).toBe(2);
      expect(glow.animate.transition.repeat).toBe(Infinity);
    });

    it('slide animation should have initial x position', () => {
      const slide = animationVariants.slide;
      expect(slide.initial).toBeDefined();
      expect(slide.initial.x).toBe('-100%');
      expect(slide.animate).toBeDefined();
      expect(slide.animate.x).toBe(0);
    });

    it('rotate animation should have continuous rotation', () => {
      const rotate = animationVariants.rotate;
      expect(rotate.animate).toBeDefined();
      expect(rotate.animate.rotate).toBe(360);
      expect(rotate.animate.transition.duration).toBe(1);
      expect(rotate.animate.transition.repeat).toBe(Infinity);
      expect(rotate.animate.transition.ease).toBe('linear');
    });

    it('flip animation should have rotateY transformation', () => {
      const flip = animationVariants.flip;
      expect(flip.animate).toBeDefined();
      expect(flip.animate.rotateY).toBe(360);
      expect(flip.animate.transition.duration).toBe(0.6);
    });

    it('none animation should be empty', () => {
      const none = animationVariants.none;
      expect(Object.keys(none).length).toBe(0);
    });
  });

  describe('getAnimationVariant function', () => {
    let matchMediaMock: any;

    beforeEach(() => {
      // Mock window.matchMedia
      matchMediaMock = vi.fn().mockReturnValue({
        matches: false,
      });
      window.matchMedia = matchMediaMock;
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should return animation variant for valid animation type', () => {
      const variant = getAnimationVariant('pulse');
      expect(variant).toBeDefined();
      expect(variant).toEqual(animationVariants.pulse);
    });

    it('should return undefined for "none" animation', () => {
      const variant = getAnimationVariant('none');
      expect(variant).toBeUndefined();
    });

    it('should return undefined for invalid animation type', () => {
      const variant = getAnimationVariant('invalid');
      expect(variant).toBeUndefined();
    });

    it('should return undefined when prefers-reduced-motion is set', () => {
      matchMediaMock.mockReturnValue({
        matches: true,
      });

      const variant = getAnimationVariant('pulse');
      expect(variant).toBeUndefined();
    });

    it('should check prefers-reduced-motion media query', () => {
      getAnimationVariant('pulse');
      expect(matchMediaMock).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
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
        expect(variant).toEqual(animationVariants[animation]);
      });
    });
  });
});
