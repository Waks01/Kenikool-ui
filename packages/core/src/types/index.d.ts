/**
 * Core type definitions for Kenikool UI components
 */
export type AnimationType = "pulse" | "bounce" | "fade" | "scale" | "shake" | "glow" | "slide" | "rotate" | "flip" | "none";
export type Variant = "primary" | "secondary" | "danger";
export type Size = "sm" | "md" | "lg";
export type Padding = "sm" | "md" | "lg";
export type Shadow = "sm" | "md" | "lg" | "none";
export interface ComponentProps {
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    animation?: AnimationType;
    className?: string;
    [key: string]: any;
}
export interface ButtonProps extends ComponentProps {
    type?: "button" | "submit" | "reset";
    onClick?: (e: Event) => void;
}
export interface InputProps extends ComponentProps {
    type?: string;
    value?: string;
    onChange?: (e: Event) => void;
    placeholder?: string;
    error?: boolean;
}
export interface CardProps extends ComponentProps {
    padding?: Padding;
    shadow?: Shadow;
}
export interface ThemeConfig {
    colors: Record<string, string>;
    spacing: Record<string, string>;
    animations: Record<string, AnimationDefinition>;
}
export interface AnimationDefinition {
    duration: string;
    easing: string;
    delay?: string;
}
//# sourceMappingURL=index.d.ts.map