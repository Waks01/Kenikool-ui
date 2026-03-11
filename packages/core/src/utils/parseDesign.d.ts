/**
 * Design token parser for unified component styling
 * Converts prefixed design strings into component props
 *
 * @example
 * parseDesign("v:primary s:md a:pulse")
 * // Returns: { variant: 'primary', size: 'md', animation: 'pulse' }
 */
export interface DesignTokens {
    variant?: string;
    size?: string;
    animation?: string;
    padding?: string;
    shadow?: string;
    state?: string;
    loading?: string;
    [key: string]: string | undefined;
}
/**
 * Parse design string into design tokens
 * @param designString - Space-separated prefixed tokens (e.g., "v:primary s:md a:pulse")
 * @returns Object with design tokens
 */
export declare function parseDesign(designString?: string): DesignTokens;
/**
 * Merge design tokens with individual props (individual props take precedence)
 * @param designString - Design string to parse
 * @param overrides - Individual prop overrides
 * @returns Merged design tokens
 */
export declare function mergeDesignTokens(designString?: string, overrides?: Partial<DesignTokens>): DesignTokens;
//# sourceMappingURL=parseDesign.d.ts.map