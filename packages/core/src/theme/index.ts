import { Theme, themes } from './themes.js';

let currentTheme: string = 'light';
let availableThemes: Record<string, Theme> = themes;

/**
 * Initialize theme system with custom themes
 * @param customThemes - Custom theme definitions
 * @param defaultTheme - Default theme to apply
 */
export function initTheme(customThemes?: Record<string, Theme>, defaultTheme: string = 'light') {
  if (customThemes) {
    availableThemes = customThemes;
  }
  currentTheme = defaultTheme;
  applyTheme(defaultTheme);
}

/**
 * Switch to a different theme
 * @param themeName - Name of the theme to switch to
 */
export function switchTheme(themeName: string) {
  if (!availableThemes[themeName]) {
    console.warn(`Theme "${themeName}" not found`);
    return;
  }
  currentTheme = themeName;
  applyTheme(themeName);
  localStorage.setItem('kenikool-theme', themeName);
  window.dispatchEvent(new CustomEvent('theme-switched', { detail: { theme: themeName } }));
}

/**
 * Get current theme name
 */
export function getCurrentTheme(): string {
  return currentTheme;
}

/**
 * Get list of available theme names
 */
export function getAvailableThemes(): string[] {
  return Object.keys(availableThemes);
}

/**
 * Apply theme by injecting CSS variables
 */
function applyTheme(themeName: string) {
  const theme = availableThemes[themeName];
  if (!theme) return;

  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-primary-dark', theme.primaryDark);
  root.style.setProperty('--color-secondary', theme.secondary);
  root.style.setProperty('--color-secondary-dark', theme.secondaryDark);
  root.style.setProperty('--color-danger', theme.danger);
  root.style.setProperty('--color-danger-dark', theme.dangerDark);
  root.style.setProperty('--color-success', theme.success);
  root.style.setProperty('--color-success-dark', theme.successDark);
  root.style.setProperty('--color-warning', theme.warning);
  root.style.setProperty('--color-warning-dark', theme.warningDark);
  root.style.setProperty('--color-info', theme.info);
  root.style.setProperty('--color-info-dark', theme.infoDark);
  root.style.setProperty('--color-bg', theme.bg);
  root.style.setProperty('--color-text', theme.text);
  root.style.setProperty('--color-border', theme.border);
  root.style.setProperty('--color-error', theme.error);

  // Also apply to all k-button, k-input, k-card elements
  const buttons = document.querySelectorAll('k-button');
  const inputs = document.querySelectorAll('k-input');
  const cards = document.querySelectorAll('k-card');

  [buttons, inputs, cards].forEach((elements) => {
    elements.forEach((el: Element) => {
      (el as HTMLElement).style.setProperty('--color-primary', theme.primary);
      (el as HTMLElement).style.setProperty('--color-primary-dark', theme.primaryDark);
      (el as HTMLElement).style.setProperty('--color-secondary', theme.secondary);
      (el as HTMLElement).style.setProperty('--color-secondary-dark', theme.secondaryDark);
      (el as HTMLElement).style.setProperty('--color-danger', theme.danger);
      (el as HTMLElement).style.setProperty('--color-danger-dark', theme.dangerDark);
      (el as HTMLElement).style.setProperty('--color-success', theme.success);
      (el as HTMLElement).style.setProperty('--color-success-dark', theme.successDark);
      (el as HTMLElement).style.setProperty('--color-warning', theme.warning);
      (el as HTMLElement).style.setProperty('--color-warning-dark', theme.warningDark);
      (el as HTMLElement).style.setProperty('--color-info', theme.info);
      (el as HTMLElement).style.setProperty('--color-info-dark', theme.infoDark);
      (el as HTMLElement).style.setProperty('--color-bg', theme.bg);
      (el as HTMLElement).style.setProperty('--color-text', theme.text);
      (el as HTMLElement).style.setProperty('--color-border', theme.border);
      (el as HTMLElement).style.setProperty('--color-error', theme.error);
    });
  });
}

/**
 * Load saved theme from localStorage
 */
export function loadSavedTheme() {
  const saved = localStorage.getItem('kenikool-theme');
  if (saved && availableThemes[saved]) {
    switchTheme(saved);
  }
}

/**
 * Toggle to next available theme
 */
export function toggleNextTheme() {
  const available = getAvailableThemes();
  const current = getCurrentTheme();
  const nextIndex = (available.indexOf(current) + 1) % available.length;
  switchTheme(available[nextIndex]);
}

export { themes } from './themes.js';
export type { Theme } from './themes';
