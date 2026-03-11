import React from 'react';
import { motion } from 'framer-motion';
import { ComponentProps } from '@kenikool/core';
import { mergeClasses, getTailwindInputClasses, parseDesign, DesignTokens } from '@kenikool/core';
import { getAnimationVariant } from '../animations/variants';

const isDev = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development';

/**
 * Props for the KInput component
 *
 * @interface KInputProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 *
 * @property {string} [design] - Unified design tokens (e.g., "s:md a:fade")
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The input size (deprecated, use design prop)
 * @property {boolean} [error=false] - Whether the input has an error state
 * @property {AnimationType} [animation='none'] - The animation effect to apply (deprecated, use design prop)
 * @property {string} [ariaLabel] - Accessible label for screen readers
 * @property {string} [ariaDescribedBy] - ID of element describing the input
 * @property {boolean} [ariaInvalid] - Whether the input has an invalid value
 *
 * @example
 * // Using unified design prop (recommended)
 * <KInput design="s:md a:fade" placeholder="Enter text" />
 *
 * @example
 * // Using individual props (deprecated)
 * <KInput size="md" animation="fade" placeholder="Enter text" />
 *
 * @example
 * // Input with error state
 * <KInput error placeholder="Invalid input" />
 *
 * @example
 * // Controlled input
 * <KInput value={value} onChange={(e) => setValue(e.target.value)} />
 *
 * @example
 * // Accessible input with label
 * <KInput aria-label="Email address" type="email" />
 */
export interface KInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Unified design tokens (e.g., "s:md a:fade") */
  design?: string;
  /** The input size - 'sm' (small), 'md' (medium), or 'lg' (large) @deprecated Use design prop instead */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the input has an error state (red border, error styling) */
  error?: boolean;
  /** The animation effect to apply to the input @deprecated Use design prop instead */
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
  /** ID of element describing the input */
  'aria-describedby'?: string;
  /** Whether the input has an invalid value */
  'aria-invalid'?: boolean;
}

/**
 * KInput - A customizable input component for React
 *
 * A fully accessible, animated input component with multiple sizes and states.
 * Supports both controlled and uncontrolled component patterns, and integrates
 * with Framer Motion for smooth animations.
 *
 * @component
 * @param {KInputProps} props - The component props
 * @returns {React.ReactElement} The rendered input element
 *
 * @example
 * // Using unified design prop (recommended)
 * <KInput design="s:md a:fade" placeholder="Enter text" />
 *
 * @example
 * // Using individual props (deprecated)
 * <KInput size="md" animation="fade" placeholder="Enter text" />
 *
 * @example
 * // Controlled component
 * const [value, setValue] = React.useState('');
 * <KInput value={value} onChange={(e) => setValue(e.target.value)} />
 *
 * @example
 * // With error state
 * <KInput error placeholder="Invalid input" />
 *
 * @example
 * // Disabled state
 * <KInput disabled placeholder="Disabled input" />
 *
 * @see {@link https://kenikool-ui.dev/docs/input} Input Documentation
 */
export const KInput: React.FC<KInputProps> = ({
  design,
  size: sizeProp = 'md',
  disabled = false,
  animation: animationProp = 'none',
  className,
  type = 'text',
  value,
  onChange,
  placeholder,
  error = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...props
}) => {
  // Parse design tokens if provided (memoized)
  const designTokens = React.useMemo(() => parseDesign(design), [design]);

  // Merge design tokens with individual props (individual props take precedence)
  const size = sizeProp || designTokens.size || 'md';
  const animation = animationProp !== 'none' ? animationProp : designTokens.animation || 'none';

  // Warn about deprecated props if used (dev only)
  if (isDev && (sizeProp !== 'md' || (animationProp && animationProp !== 'none'))) {
    console.warn(
      'KInput: Using individual props (size, animation) is deprecated. Use the design prop instead. Example: design="s:md a:fade"'
    );
  }

  const tailwindClasses = getTailwindInputClasses(size, animation);
  const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '';
  const classes = mergeClasses(tailwindClasses, errorClasses, className);

  const animationVariant = getAnimationVariant(animation);

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow standard keyboard navigation (Tab, Enter, etc.)
    // These are handled by the browser by default
    const onKeyDown = (props as any).onKeyDown;
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  // Handle focus for focus management
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const onFocus = (props as any).onFocus;
    if (onFocus) {
      onFocus(e);
    }
  };

  // Handle blur for focus management
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const onBlur = (props as any).onBlur;
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <motion.input
      type={type}
      className={classes}
      disabled={disabled}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-invalid={ariaInvalid ?? error}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...(animationVariant as any)}
      {...props}
    />
  );
};

KInput.displayName = 'KInput';
