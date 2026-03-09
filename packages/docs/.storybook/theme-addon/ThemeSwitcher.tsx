import React, { useEffect, useState } from 'react';
import { API } from '@storybook/manager-api';

interface ThemeSwitcherProps {
  api: API;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ api }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Get theme from localStorage or system preference
    const stored = localStorage.getItem('kenikool-theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    // Store theme preference
    localStorage.setItem('kenikool-theme', theme);

    // Dispatch custom event for components to react
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme } }));
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        fontSize: '12px',
        fontWeight: 500,
      }}
    >
      <label htmlFor="theme-toggle" style={{ margin: 0 }}>
        Theme:
      </label>
      <button
        id="theme-toggle"
        onClick={toggleTheme}
        style={{
          padding: '4px 8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
          color: theme === 'light' ? '#000' : '#fff',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 500,
          transition: 'all 0.2s ease',
        }}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
};
