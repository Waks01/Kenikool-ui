/**
 * Utility functions for Kenikool UI
 */

// Re-export design token utilities
export { parseDesign, mergeDesignTokens, type DesignTokens } from './parseDesign';

/**
 * Merges multiple class strings, filtering out falsy values
 * @param classes - Variable number of class strings or falsy values
 * @returns Merged class string
 */
export function mergeClasses(...classes: (string | false | undefined | null)[]): string {
  return classes
    .filter((cls): cls is string => typeof cls === 'string' && cls.length > 0)
    .join(' ');
}

/**
 * Gets CSS variable value from the root element
 * @param variableName - Name of the CSS variable (with or without --)
 * @returns The CSS variable value or undefined
 */
export function getCSSVariableValue(variableName: string): string | undefined {
  const name = variableName.startsWith('--') ? variableName : `--${variableName}`;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || undefined;
}

/**
 * Validates if a variant is valid
 * @param variant - Variant to validate
 * @returns True if variant is valid
 */
export function isValidVariant(
  variant: any
): variant is
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'ghost'
  | 'link'
  | 'gradient'
  | 'outline' {
  return [
    'primary',
    'secondary',
    'danger',
    'success',
    'warning',
    'info',
    'ghost',
    'link',
    'gradient',
    'outline',
  ].includes(variant);
}

/**
 * Validates if a size is valid
 * @param size - Size to validate
 * @returns True if size is valid
 */
export function isValidSize(size: any): size is 'sm' | 'md' | 'lg' {
  return ['sm', 'md', 'lg'].includes(size);
}

/**
 * Validates if an animation type is valid
 * @param animation - Animation type to validate
 * @returns True if animation is valid
 */
export function isValidAnimation(
  animation: any
): animation is
  | 'pulse'
  | 'bounce'
  | 'fade'
  | 'scale'
  | 'shake'
  | 'glow'
  | 'slide'
  | 'rotate'
  | 'flip'
  | 'none' {
  return [
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
  ].includes(animation);
}

/**
 * Validates if a loading spinner type is valid
 * @param spinner - Spinner type to validate
 * @returns True if spinner is valid
 */
export function isValidSpinner(
  spinner: any
): spinner is
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
  | 'hourglass' {
  return [
    'spinner',
    'dots',
    'pulse',
    'bars',
    'ring',
    'dual-ring',
    'ripple',
    'wave',
    'skeleton',
    'shimmer',
    'orbit',
    'bounce',
    'flip',
    'morph',
    'gradient-spin',
    'dots-wave',
    'progress',
    'hourglass',
  ].includes(spinner);
}

/**
 * Gets component classes based on variant, size, and animation
 * @param baseClass - Base class name
 * @param variant - Component variant
 * @param size - Component size
 * @param animation - Component animation
 * @param customClass - Custom class to merge
 * @returns Merged class string
 */
export function getComponentClasses(
  baseClass: string,
  variant?: string,
  size?: string,
  animation?: string,
  customClass?: string
): string {
  return mergeClasses(
    baseClass,
    variant && `${baseClass}--${variant}`,
    size && `${baseClass}--${size}`,
    animation && animation !== 'none' && `${baseClass}--${animation}`,
    customClass
  );
}

/**
 * Maps design tokens to Tailwind CSS classes for React components
 * @param variant - Button variant
 * @param size - Button size
 * @param animation - Animation type
 * @returns Tailwind class string
 */
export function getTailwindButtonClasses(
  variant?: string,
  size?: string,
  animation?: string
): string {
  // Variant classes
  const variantClasses: Record<string, string> = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
    danger: 'bg-red-500 hover:bg-red-700 text-white',
    success: 'bg-green-500 hover:bg-green-700 text-white',
    warning: 'bg-amber-500 hover:bg-amber-700 text-white',
    info: 'bg-sky-500 hover:bg-sky-700 text-white',
    ghost:
      'bg-transparent border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white',
    link: 'bg-transparent text-blue-500 underline hover:text-blue-700',
    gradient: 'bg-gradient-to-r from-blue-500 to-sky-500 text-white hover:opacity-90',
    outline:
      'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
  };

  // Size classes
  const sizeClasses: Record<string, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // Animation classes
  const animationClasses: Record<string, string> = {
    pulse: 'animate-pulse',
    bounce: 'hover:animate-bounce',
    fade: 'animate-fade',
    scale: 'hover:scale-105 transition-transform',
    shake: 'active:animate-shake',
    glow: 'animate-glow',
    slide: 'animate-slide',
    rotate: 'animate-spin',
    flip: 'animate-flip',
    none: '',
  };

  return mergeClasses(
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
    variant && variantClasses[variant],
    size && sizeClasses[size],
    animation && animation !== 'none' && animationClasses[animation],
    'cursor-pointer'
  );
}

/**
 * Maps design tokens to Tailwind CSS classes for React Input components
 * @param size - Input size
 * @param animation - Animation type
 * @returns Tailwind class string
 */
export function getTailwindInputClasses(size?: string, animation?: string): string {
  const sizeClasses: Record<string, string> = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  const animationClasses: Record<string, string> = {
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    fade: 'animate-fade',
    scale: 'animate-scale',
    shake: 'animate-shake',
    glow: 'animate-glow',
    slide: 'animate-slide',
    rotate: 'animate-spin',
    flip: 'animate-flip',
    none: '',
  };

  return mergeClasses(
    'w-full border border-gray-300 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100',
    size && sizeClasses[size],
    animation && animation !== 'none' && animationClasses[animation]
  );
}

/**
 * Maps design tokens to Tailwind CSS classes for React Card components
 * @param padding - Card padding
 * @param shadow - Card shadow
 * @param animation - Animation type
 * @returns Tailwind class string
 */
export function getTailwindCardClasses(
  padding?: string,
  shadow?: string,
  animation?: string
): string {
  const paddingClasses: Record<string, string> = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const shadowClasses: Record<string, string> = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    none: 'shadow-none',
  };

  const animationClasses: Record<string, string> = {
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    fade: 'animate-fade',
    scale: 'animate-scale',
    shake: 'animate-shake',
    glow: 'animate-glow',
    slide: 'animate-slide',
    rotate: 'animate-spin',
    flip: 'animate-flip',
    none: '',
  };

  return mergeClasses(
    'rounded-lg bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white',
    padding && paddingClasses[padding],
    shadow && shadowClasses[shadow],
    animation && animation !== 'none' && animationClasses[animation]
  );
}
