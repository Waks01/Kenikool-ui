import { describe, it, expect } from 'vitest';
import { getAnimationConfig, animationConfigs } from './index';

describe('Animation System', () => {
  describe('animationConfigs', () => {
    it('should have all 10 animation types defined', () => {
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

      animationTypes.forEach((type) => {
        expect(animationConfigs).toHaveProperty(type);
      });
    });

    it('should have correct configuration for pulse animation', () => {
      expect(animationConfigs.pulse).toEqual({
        duration: '2s',
        easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
      });
    });

    it('should have correct configuration for bounce animation', () => {
      expect(animationConfigs.bounce).toEqual({
        duration: '0.5s',
        easing: 'ease-out',
      });
    });

    it('should have correct configuration for fade animation', () => {
      expect(animationConfigs.fade).toEqual({
        duration: '0.3s',
        easing: 'ease-out',
      });
    });

    it('should have correct configuration for scale animation', () => {
      expect(animationConfigs.scale).toEqual({
        duration: '0.3s',
        easing: 'ease-out',
      });
    });

    it('should have correct configuration for shake animation', () => {
      expect(animationConfigs.shake).toEqual({
        duration: '0.3s',
        easing: 'ease-out',
      });
    });

    it('should have correct configuration for glow animation', () => {
      expect(animationConfigs.glow).toEqual({
        duration: '2s',
        easing: 'ease-in-out',
      });
    });

    it('should have correct configuration for slide animation', () => {
      expect(animationConfigs.slide).toEqual({
        duration: '0.3s',
        easing: 'ease-out',
      });
    });

    it('should have correct configuration for rotate animation', () => {
      expect(animationConfigs.rotate).toEqual({
        duration: '1s',
        easing: 'linear',
      });
    });

    it('should have correct configuration for flip animation', () => {
      expect(animationConfigs.flip).toEqual({
        duration: '0.6s',
        easing: 'ease-out',
      });
    });

    it('should have correct configuration for none animation', () => {
      expect(animationConfigs.none).toEqual({
        duration: '0s',
        easing: 'linear',
      });
    });

    it('should have duration and easing properties for all animations', () => {
      Object.values(animationConfigs).forEach((config) => {
        expect(config).toHaveProperty('duration');
        expect(config).toHaveProperty('easing');
        expect(typeof config.duration).toBe('string');
        expect(typeof config.easing).toBe('string');
      });
    });
  });

  describe('getAnimationConfig()', () => {
    it('should return animation config for valid animation name', () => {
      const config = getAnimationConfig('pulse');
      expect(config).toEqual(animationConfigs.pulse);
    });

    it('should return undefined for invalid animation name', () => {
      const config = getAnimationConfig('invalid');
      expect(config).toBeUndefined();
    });

    it('should return correct config for all animation types', () => {
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

      animationTypes.forEach((type) => {
        const config = getAnimationConfig(type);
        expect(config).toBeDefined();
        expect(config).toEqual(animationConfigs[type]);
      });
    });

    it('should be case-sensitive', () => {
      expect(getAnimationConfig('Pulse')).toBeUndefined();
      expect(getAnimationConfig('PULSE')).toBeUndefined();
      expect(getAnimationConfig('pulse')).toBeDefined();
    });
  });
});
