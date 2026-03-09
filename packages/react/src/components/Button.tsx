import React from 'react';
import { motion } from 'framer-motion';
import { ComponentProps } from '@kenikool/core';
import { mergeClasses, getComponentClasses } from '@kenikool/core';
import { getAnimationVariant } from '../animations/variants';

/**
 * Props for the KButton component
 *
 * @interface KButtonProps
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>}
 *
 * @property {React.ReactNode} [children] - The button text or content
 * @property {'primary' | 'secondary' | 'danger'} [variant='primary'] - The button style variant
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The button size
 * @property {boolean} [disabled=false] - Whether the button is disabled
 * @property {AnimationType} [animation='none'] - The animation effect to apply
 * @property {string} [ariaLabel] - Accessible label for screen readers
 * @property {boolean} [ariaPressed] - Whether the button is in a pressed state (for toggle buttons)
 *
 * @example
 * // Primary button with large size
 * <KButton variant="primary" size="lg">Click me</KButton>
 *
 * @example
 * // Danger button with pulse animation
 * <KButton variant="danger" animation="pulse">Delete</KButton>
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
  /** The button style variant - 'primary' (blue), 'secondary' (gray), or 'danger' (red) */
  variant?: 'primary' | 'secondary' | 'danger';
  /** The button size - 'sm' (small), 'md' (medium), or 'lg' (large) */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is disabled and non-interactive */
  disabled?: boolean;
  /** The animation effect to apply to the button */
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
 * // Basic usage
 * <KButton variant="primary" size="lg">Click me</KButton>
 *
 * @example
 * // With animation
 * <KButton variant="primary" animation="pulse">Pulsing Button</KButton>
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
  variant = 'primary',
  size = 'md',
  disabled = false,
  animation = 'none',
  className,
  children,
  type = 'button',
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
  ...props
}) => {
  const classes = getComponentClasses('k-button', variant, size, animation, className);

  const animationVariant = getAnimationVariant(animation);

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    // Allow Enter and Space to activate the button
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
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
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      onKeyDown={handleKeyDown}
      {...animationVariant}
      {...props}
    >
      {children}
    </motion.button>
  );
};

KButton.displayName = 'KButton';
