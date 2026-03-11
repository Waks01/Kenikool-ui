/**
 * Animation definitions for Kenikool UI
 */
export interface AnimationConfig {
    duration: string;
    easing: string;
    delay?: string;
}
export declare const animationConfigs: Record<string, AnimationConfig>;
/**
 * Gets animation configuration by name
 * @param animationName - Name of the animation
 * @returns Animation configuration or undefined
 */
export declare function getAnimationConfig(animationName: string): AnimationConfig | undefined;
//# sourceMappingURL=index.d.ts.map