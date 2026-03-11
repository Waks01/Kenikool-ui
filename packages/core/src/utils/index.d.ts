/**
 * Utility functions for Kenikool UI
 */
export { parseDesign, mergeDesignTokens, type DesignTokens } from './parseDesign';
/**
 * Merges multiple class strings, filtering out falsy values
 * @param classes - Variable number of class strings or falsy values
 * @returns Merged class string
 */
export declare function mergeClasses(...classes: (string | false | undefined | null)[]): string;
/**
 * Gets CSS variable value from the root element
 * @param variableName - Name of the CSS variable (with or without --)
 * @returns The CSS variable value or undefined
 */
export declare function getCSSVariableValue(variableName: string): string | undefined;
/**
 * Validates if a variant is valid
 * @param variant - Variant to validate
 * @returns True if variant is valid
 */
export declare function isValidVariant(variant: any): variant is 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'ghost' | 'link' | 'gradient' | 'outline';
/**
 * Validates if a size is valid
 * @param size - Size to validate
 * @returns True if size is valid
 */
export declare function isValidSize(size: any): size is 'sm' | 'md' | 'lg';
/**
 * Validates if an animation type is valid
 * @param animation - Animation type to validate
 * @returns True if animation is valid
 */
export declare function isValidAnimation(animation: any): animation is 'pulse' | 'bounce' | 'fade' | 'scale' | 'shake' | 'glow' | 'slide' | 'rotate' | 'flip' | 'none';
/**
 * Validates if a loading spinner type is valid
 * @param spinner - Spinner type to validate
 * @returns True if spinner is valid
 */
export declare function isValidSpinner(spinner: any): spinner is 'spinner' | 'dots' | 'pulse' | 'bars' | 'ring' | 'dual-ring' | 'ripple' | 'wave' | 'skeleton' | 'shimmer' | 'orbit' | 'bounce' | 'flip' | 'morph' | 'gradient-spin' | 'dots-wave' | 'progress' | 'hourglass';
/**
 * Gets component classes based on variant, size, and animation
 * @param baseClass - Base class name
 * @param variant - Component variant
 * @param size - Component size
 * @param animation - Component animation
 * @param customClass - Custom class to merge
 * @returns Merged class string
 */
export declare function getComponentClasses(baseClass: string, variant?: string, size?: string, animation?: string, customClass?: string): string;
/**
 * Maps design tokens to Tailwind CSS classes for React components
 * @param variant - Button variant
 * @param size - Button size
 * @param animation - Animation type
 * @returns Tailwind class string
 */
export declare function getTailwindButtonClasses(variant?: string, size?: string, animation?: string): string;
/**
 * Maps design tokens to Tailwind CSS classes for React Input components
 * @param size - Input size
 * @param animation - Animation type
 * @returns Tailwind class string
 */
export declare function getTailwindInputClasses(size?: string, animation?: string): string;
/**
 * Maps design tokens to Tailwind CSS classes for React Card components
 * @param padding - Card padding
 * @param shadow - Card shadow
 * @param animation - Animation type
 * @returns Tailwind class string
 */
export declare function getTailwindCardClasses(padding?: string, shadow?: string, animation?: string): string;
//# sourceMappingURL=index.d.ts.map