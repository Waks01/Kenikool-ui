import { Variants } from 'framer-motion';

/**
 * Animation variants for Framer Motion
 *
 * Each variant defines the animation properties for a specific animation type.
 * These variants are used by React components to apply smooth animations
 * using Framer Motion.
 *
 * @type {Record<string, Variants>}
 *
 * @example
 * // Get animation variant for a button
 * const variant = getAnimationVariant('pulse');
 * <motion.button {...variant}>Click me</motion.button>
 *
 * @see {@link https://www.framer.com/motion/} Framer Motion Documentation
 */
export const animationVariants: Record<string, Variants> = {
  pulse: {
    animate: {
      opacity: [1, 0.5, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },

  bounce: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  },

  fade: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  },

  scale: {
    whileHover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  },

  shake: {
    animate: {
      x: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  },

  glow: {
    animate: {
      boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0.7)', '0 0 0 10px rgba(59, 130, 246, 0)'],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeOut',
      },
    },
  },

  slide: {
    initial: { x: '-100%' },
    animate: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  },

  rotate: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },

  flip: {
    animate: {
      rotateY: 360,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  },

  none: {
    // No animation
  },
};

/**
 * Get animation variant for a given animation type
 *
 * Retrieves the Framer Motion animation variant for the specified animation type.
 * Automatically respects the user's prefers-reduced-motion preference by returning
 * undefined when reduced motion is preferred.
 *
 * @param {string} animationType - The animation type (pulse, bounce, fade, scale, shake, glow, slide, rotate, flip, or none)
 * @returns {Variants | undefined} The animation variant object for Framer Motion, or undefined if no animation should be applied
 *
 * @example
 * // Get animation variant for pulse animation
 * const variant = getAnimationVariant('pulse');
 * // Returns: { animate: { opacity: [1, 0.5, 1], transition: { ... } } }
 *
 * @example
 * // Get animation variant when user prefers reduced motion
 * const variant = getAnimationVariant('bounce');
 * // Returns: undefined (respects prefers-reduced-motion)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion} prefers-reduced-motion
 */
export function getAnimationVariant(animationType: string): Variants | undefined {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || animationType === 'none') {
    return undefined;
  }

  return animationVariants[animationType] || undefined;
}
