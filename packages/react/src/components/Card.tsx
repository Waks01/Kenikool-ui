import React from 'react';
import { motion } from 'framer-motion';
import { mergeClasses } from '@kenikool/core';
import { getAnimationVariant } from '../animations/variants';

/**
 * Props for the KCard component
 *
 * @interface KCardProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 *
 * @property {React.ReactNode} [children] - The card content
 * @property {'sm' | 'md' | 'lg'} [padding='md'] - The card padding
 * @property {'sm' | 'md' | 'lg' | 'none'} [shadow='md'] - The card shadow effect
 * @property {AnimationType} [animation='none'] - The animation effect to apply
 * @property {string} [role] - ARIA role for the card
 * @property {string} [ariaLabel] - Accessible label for screen readers
 *
 * @example
 * // Basic card
 * <KCard padding="md" shadow="lg">
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
  /** The card padding - 'sm' (12px), 'md' (16px), or 'lg' (24px) */
  padding?: 'sm' | 'md' | 'lg';
  /** The card shadow effect - 'sm' (small), 'md' (medium), 'lg' (large), or 'none' */
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  /** The animation effect to apply to the card */
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
 * // Basic card with content
 * <KCard padding="md" shadow="lg">
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
 * // Card with animation
 * <KCard animation="fade" padding="lg">
 *   <p>Fading card</p>
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
  padding = 'md',
  shadow = 'md',
  animation = 'none',
  className,
  children,
  role,
  'aria-label': ariaLabel,
  onAnimationStart,
  onAnimationEnd,
  onAnimationIteration,
  ...props
}) => {
  const classes = mergeClasses(
    'k-card',
    `k-card--padding-${padding}`,
    `k-card--shadow-${shadow}`,
    animation !== 'none' ? `k-card--${animation}` : '',
    className
  );

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
      {...animationVariant}
      {...restProps}
    >
      {children}
    </motion.div>
  );
};

KCard.displayName = 'KCard';
