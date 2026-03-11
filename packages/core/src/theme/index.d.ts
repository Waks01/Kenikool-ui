/**
 * Theme system for Kenikool UI
 */
export type ThemeMode = "light" | "dark" | "auto";
/**
 * Sets the theme for the application
 * @param theme - Theme mode to set ('light', 'dark', or 'auto')
 */
export declare function setTheme(theme: ThemeMode): void;
/**
 * Gets the current theme
 * @returns Current theme ('light' or 'dark')
 */
export declare function getTheme(): "light" | "dark";
/**
 * Listens for theme changes
 * @param callback - Function to call when theme changes
 * @returns Unsubscribe function
 */
export declare function onThemeChange(callback: (theme: "light" | "dark") => void): () => void;
//# sourceMappingURL=index.d.ts.map