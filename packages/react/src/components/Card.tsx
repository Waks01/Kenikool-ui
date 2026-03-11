import React from 'react';
import { motion } from 'framer-motion';
import { mergeClasses, getTailwindCardClasses, parseDesign, DesignTokens } from '@kenikool/core';
import { getAnimationVariant } from '../animations/variants';

const isDev = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development';

/**
 * Props for the KCard component
 *
 * @interface KCardProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 *
 * @property {React.ReactNode} [children] - The card content
 * @property {string} [design] - Unified design tokens (e.g., "p:md sh:lg a:fade")
 * @property {'sm' | 'md' | 'lg'} [padding='md'] - The card padding (deprecated, use design prop)
 * @property {'sm' | 'md' | 'lg' | 'none'} [shadow='md'] - The card shadow effect (deprecated, use design prop)
 * @property {AnimationType} [animation='none'] - The animation effect to apply (deprecated, use design prop)
 * @property {string} [role] - ARIA role for the card
 * @property {string} [ariaLabel] - Accessible label for screen readers
 *
 * @example
 * // Using unified design prop (recommended)
 * <KCard design="p:md sh:lg a:fade">
 *   <h2>Card Title</h2>
 *   <p>Card content</p>
 * </KCard>
 *
 * @example
 * // Using individual props (deprecated)
 * <KCard padding="md" shadow="lg" animation="fade">
 *   <h2>Card Title</h2>
 *   <p>Card content</p>
 * </KCard>
 *
 * @example
 * // Card with no shadow
 * <KCard shadow="none">
 *   <p>Minimal card</p>
 * </KCard>
 *
 * @example
 * // Accessible card with region role
 * <KCard role="region" aria-label="Product details">
 *   <h2>Product</h2>
 *   <p>Details here</p>
 * </KCard>
 */
export interface KCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The card content */
  children?: React.ReactNode;
  /** Unified design tokens (e.g., "p:md sh:lg a:fade") */
  design?: string;
  /** The card padding - 'sm' (12px), 'md' (16px), or 'lg' (24px) @deprecated Use design prop instead */
  padding?: 'sm' | 'md' | 'lg';
  /** The card shadow effect - 'sm' (small), 'md' (medium), 'lg' (large), or 'none' @deprecated Use design prop instead */
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  /** The animation effect to apply to the card @deprecated Use design prop instead */
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
  /** ARIA role for the card */
  role?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

/**
 * KCard - A customizable card component for React
 *
 * A flexible container component with multiple padding and shadow variants.
 * Supports theme-aware styling (light/dark mode) and integrates with Framer Motion
 * for smooth animations.
 *
 * @component
 * @param {KCardProps} props - The component props
 * @returns {React.ReactElement} The rendered card element
 *
 * @example
 * // Using unified design prop (recommended)
 * <KCard design="p:md sh:lg a:fade">
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </KCard>
 *
 * @example
 * // Using individual props (deprecated)
 * <KCard padding="md" shadow="lg" animation="fade">
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </KCard>
 *
 * @example
 * // Card with minimal styling
 * <KCard shadow="none">
 *   <p>Minimal card</p>
 * </KCard>
 *
 * @example
 * // Card with custom className
 * <KCard className="custom-card">
 *   <p>Custom styled card</p>
 * </KCard>
 *
 * @see {@link https://kenikool-ui.dev/docs/card} Card Documentation
 */
export const KCard: React.FC<KCardProps> = ({
  design,
  padding: paddingProp = 'md',
  shadow: shadowProp = 'md',
  animation: animationProp = 'none',
  className,
  children,
  role,
  'aria-label': ariaLabel,
  onAnimationStart,
  onAnimationEnd,
  onAnimationIteration,
  ...props
}) => {
  // Parse design tokens if provided (memoized)
  const designTokens = React.useMemo(() => parseDesign(design), [design]);

  // Merge design tokens with individual props (individual props take precedence)
  const padding = paddingProp || designTokens.padding || 'md';
  const shadow = shadowProp || designTokens.shadow || 'md';
  const animation = animationProp !== 'none' ? animationProp : designTokens.animation || 'none';

  // Warn about deprecated props if used (dev only)
  if (
    isDev &&
    (paddingProp !== 'md' || shadowProp !== 'md' || (animationProp && animationProp !== 'none'))
  ) {
    console.warn(
      'KCard: Using individual props (padding, shadow, animation) is deprecated. Use the design prop instead. Example: design="p:md sh:lg a:fade"'
    );
  }

  const tailwindClasses = getTailwindCardClasses(padding, shadow, animation);
  const classes = mergeClasses(tailwindClasses, className);

  const animationVariant = getAnimationVariant(animation);

  // Filter out animation event handlers to avoid type conflicts with Framer Motion
  const {
    onAnimationStart: _,
    onAnimationEnd: __,
    onAnimationIteration: ___,
    ...restProps
  } = props as any;

  // Handle keyboard navigation for interactive cards
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const onKeyDown = (props as any).onKeyDown;
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  // Handle focus for focus management
  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    const onFocus = (props as any).onFocus;
    if (onFocus) {
      onFocus(e);
    }
  };

  // Handle blur for focus management
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const onBlur = (props as any).onBlur;
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <motion.div
      className={classes}
      role={role}
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...(animationVariant as any)}
      {...restProps}
    >
      {children}
    </motion.div>
  );
};

KCard.displayName = 'KCard';
