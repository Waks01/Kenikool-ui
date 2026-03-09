/**
 * Utility functions for Kenikool UI
 */

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
export function isValidVariant(variant: any): variant is 'primary' | 'secondary' | 'danger' {
  return ['primary', 'secondary', 'danger'].includes(variant);
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
