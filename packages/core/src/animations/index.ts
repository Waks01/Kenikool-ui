/**
 * Animation definitions for Kenikool UI
 */

export interface AnimationConfig {
  duration: string;
  easing: string;
  delay?: string;
}

export const animationConfigs: Record<string, AnimationConfig> = {
  pulse: {
    duration: '2s',
    easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  bounce: {
    duration: '0.5s',
    easing: 'ease-out',
  },
  fade: {
    duration: '0.3s',
    easing: 'ease-out',
  },
  scale: {
    duration: '0.3s',
    easing: 'ease-out',
  },
  shake: {
    duration: '0.3s',
    easing: 'ease-out',
  },
  glow: {
    duration: '2s',
    easing: 'ease-in-out',
  },
  slide: {
    duration: '0.3s',
    easing: 'ease-out',
  },
  rotate: {
    duration: '1s',
    easing: 'linear',
  },
  flip: {
    duration: '0.6s',
    easing: 'ease-out',
  },
  none: {
    duration: '0s',
    easing: 'linear',
  },
};

/**
 * Gets animation configuration by name
 * @param animationName - Name of the animation
 * @returns Animation configuration or undefined
 */
export function getAnimationConfig(animationName: string): AnimationConfig | undefined {
  return animationConfigs[animationName];
}
