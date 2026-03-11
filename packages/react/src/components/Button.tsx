import React from 'react';
import { motion } from 'framer-motion';
import { ComponentProps } from '@kenikool/core';
import { mergeClasses, getTailwindButtonClasses, parseDesign, DesignTokens } from '@kenikool/core';
import { getAnimationVariant } from '../animations/variants';

const isDev = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development';

/**
 * Props for the KButton component
 *
 * @interface KButtonProps
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>}
 *
 * @property {React.ReactNode} [children] - The button text or content
 * @property {string} [design] - Unified design tokens (e.g., "v:primary s:md a:pulse")
 * @property {'primary' | 'secondary' | 'danger'} [variant='primary'] - The button style variant (deprecated, use design prop)
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The button size (deprecated, use design prop)
 * @property {boolean} [disabled=false] - Whether the button is disabled
 * @property {AnimationType} [animation='none'] - The animation effect to apply (deprecated, use design prop)
 * @property {string} [ariaLabel] - Accessible label for screen readers
 * @property {boolean} [ariaPressed] - Whether the button is in a pressed state (for toggle buttons)
 *
 * @example
 * // Using unified design prop (recommended)
 * <KButton design="v:primary s:lg a:pulse">Click me</KButton>
 *
 * @example
 * // Using individual props (deprecated)
 * <KButton variant="primary" size="lg" animation="pulse">Click me</KButton>
 *
 * @example
 * // Disabled button
 * <KButton disabled>Disabled</KButton>
 *
 * @example
 * // Accessible button with aria-label
 * <KButton aria-label="Close dialog">×</KButton>
 */
export interface KButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The button text or content */
  children?: React.ReactNode;
  /** Unified design tokens (e.g., "v:primary s:md a:pulse l:dots") */
  design?: string;
  /** The button style variant - 'primary', 'secondary', 'danger', 'success', 'warning', 'info', 'ghost', 'link', 'gradient', 'outline' @deprecated Use design prop instead */
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info'
    | 'ghost'
    | 'link'
    | 'gradient'
    | 'outline';
  /** The button size - 'sm' (small), 'md' (medium), or 'lg' (large) @deprecated Use design prop instead */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is disabled and non-interactive */
  disabled?: boolean;
  /** The animation effect to apply to the button @deprecated Use design prop instead */
  animation?:
    | 'pulse'
    | 'bounce'
    | 'fade'
    | 'scale'
    | 'shake'
    | 'glow'
    | 'slide'
    | 'rotate'
    | 'flip'
    | 'none';
  /** Whether the button is in loading state */
  loading?: boolean;
  /** The loading spinner type @deprecated Use design prop with l: prefix instead */
  loadingSpinner?:
    | 'spinner'
    | 'dots'
    | 'pulse'
    | 'bars'
    | 'ring'
    | 'dual-ring'
    | 'ripple'
    | 'wave'
    | 'skeleton'
    | 'shimmer'
    | 'orbit'
    | 'bounce'
    | 'flip'
    | 'morph'
    | 'gradient-spin'
    | 'dots-wave'
    | 'progress'
    | 'hourglass';
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** Whether the button is in a pressed state (for toggle buttons) */
  'aria-pressed'?: boolean;
}

/**
 * KButton - A customizable button component for React
 *
 * A fully accessible, animated button component with multiple variants and sizes.
 * Supports all standard HTML button attributes and integrates with Framer Motion
 * for smooth animations.
 *
 * @component
 * @param {KButtonProps} props - The component props
 * @returns {React.ReactElement} The rendered button element
 *
 * @example
 * // Using unified design prop (recommended)
 * <KButton design="v:primary s:lg a:pulse">Click me</KButton>
 *
 * @example
 * // Using individual props (deprecated)
 * <KButton variant="primary" size="lg" animation="pulse">Click me</KButton>
 *
 * @example
 * // With click handler
 * <KButton onClick={() => console.log('clicked')}>
 *   Click me
 * </KButton>
 *
 * @example
 * // Disabled state
 * <KButton disabled>Disabled Button</KButton>
 *
 * @see {@link https://kenikool-ui.dev/docs/button} Button Documentation
 */
export const KButton: React.FC<KButtonProps> = ({
  design,
  variant: variantProp,
  size: sizeProp,
  disabled = false,
  animation: animationProp = 'none',
  loading = false,
  loadingSpinner: loadingSpinnerProp,
  className,
  children,
  type = 'button',
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
  ...props
}) => {
  // Parse design tokens if provided (memoized)
  const designTokens = React.useMemo(() => parseDesign(design), [design]);

  // Merge design tokens with individual props (individual props take precedence)
  const variant = variantProp || designTokens.variant || 'primary';
  const size = sizeProp || designTokens.size || 'md';
  const animation = animationProp !== 'none' ? animationProp : designTokens.animation || 'none';
  const loadingSpinner = loadingSpinnerProp || designTokens.loading || 'spinner';

  // Warn about deprecated props if used (dev only)
  if (
    isDev &&
    (variantProp || sizeProp || (animationProp && animationProp !== 'none') || loadingSpinnerProp)
  ) {
    console.warn(
      'KButton: Using individual props (variant, size, animation, loadingSpinner) is deprecated. Use the design prop instead. Example: design="v:primary s:md a:pulse l:dots"'
    );
  }

  const tailwindClasses = getTailwindButtonClasses(variant, size, animation);
  const classes = mergeClasses(tailwindClasses, className);

  const animationVariant = getAnimationVariant(animation);

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    // Allow Enter and Space to activate the button
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && !loading) {
      e.preventDefault();
      (e.currentTarget as HTMLButtonElement).click();
    }
    // Call the original onKeyDown handler if provided
    const onKeyDown = (props as any).onKeyDown;
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-busy={loading}
      onKeyDown={handleKeyDown}
      {...(animationVariant as any)}
      {...props}
    >
      {loading ? (
        <span className={`k-button__spinner k-button__spinner--${loadingSpinner}`} />
      ) : (
        children
      )}
    </motion.button>
  );
};

KButton.displayName = 'KButton';
