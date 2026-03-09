/**
 * Theme system for Kenikool UI
 */

export type ThemeMode = "light" | "dark" | "auto";

/**
 * Sets the theme for the application
 * @param theme - Theme mode to set ('light', 'dark', or 'auto')
 */
export function setTheme(theme: ThemeMode): void {
  const root = document.documentElement;

  if (theme === "auto") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }

  // Dispatch custom event for components to react
  window.dispatchEvent(new CustomEvent("theme-change", { detail: { theme } }));
}

/**
 * Gets the current theme
 * @returns Current theme ('light' or 'dark')
 */
export function getTheme(): "light" | "dark" {
  const theme = document.documentElement.getAttribute("data-theme");
  if (theme === "light" || theme === "dark") return theme;

  // Check system preference
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return "light";
}

/**
 * Listens for theme changes
 * @param callback - Function to call when theme changes
 * @returns Unsubscribe function
 */
export function onThemeChange(
  callback: (theme: "light" | "dark") => void,
): () => void {
  const handler = (event: Event) => {
    if (event instanceof CustomEvent) {
      callback(event.detail.theme);
    }
  };

  window.addEventListener("theme-change", handler);

  return () => {
    window.removeEventListener("theme-change", handler);
  };
}
