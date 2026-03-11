# Theme Configuration Guide

Kenikool UI components support theme customization through CSS custom properties (variables). Developers can override the default colors to match their brand.

## Quick Start

### 1. Override CSS Variables in Your HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      :root {
        /* Button colors */
        --color-primary: #3b82f6;
        --color-primary-dark: #1e40af;
        --color-secondary: #6b7280;
        --color-secondary-dark: #374151;
        --color-danger: #ef4444;
        --color-danger-dark: #dc2626;
        --color-success: #10b981;
        --color-success-dark: #059669;
        --color-warning: #f59e0b;
        --color-warning-dark: #d97706;
        --color-info: #0ea5e9;
        --color-info-dark: #0284c7;

        /* Input/Card colors */
        --color-bg: #ffffff;
        --color-text: #1f2937;
        --color-border: #d1d5db;
        --color-error: #b91c1c;
      }

      /* Dark mode */
      [data-theme='dark'] {
        --color-bg: #1f2937;
        --color-text: #f3f4f6;
        --color-border: #374151;
      }
    </style>
  </head>
  <body>
    <k-button design="v:primary">Click me</k-button>
  </body>
</html>
```

## Available CSS Variables

### Button Colors

- `--color-primary` - Primary button background
- `--color-primary-dark` - Primary button hover state
- `--color-secondary` - Secondary button background
- `--color-secondary-dark` - Secondary button hover state
- `--color-danger` - Danger button background
- `--color-danger-dark` - Danger button hover state
- `--color-success` - Success button background
- `--color-success-dark` - Success button hover state
- `--color-warning` - Warning button background
- `--color-warning-dark` - Warning button hover state
- `--color-info` - Info button background
- `--color-info-dark` - Info button hover state

### Input/Card Colors

- `--color-bg` - Background color
- `--color-text` - Text color
- `--color-border` - Border color
- `--color-error` - Error state color

## Theme Switching

### JavaScript API

```javascript
// Set theme
document.documentElement.setAttribute('data-theme', 'dark');

// Get current theme
const theme = document.documentElement.getAttribute('data-theme');

// Toggle theme
function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
}
```

### Persist Theme to localStorage

```javascript
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function loadTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
}

// On page load
loadTheme();
```

## Example: Custom Brand Theme

```html
<style>
  :root {
    /* Brand colors */
    --color-primary: #8b5cf6; /* Purple */
    --color-primary-dark: #6d28d9;
    --color-secondary: #ec4899; /* Pink */
    --color-secondary-dark: #be185d;
    --color-success: #06b6d4; /* Cyan */
    --color-success-dark: #0891b2;
  }
</style>
```

## Example: Dark Mode Only

```html
<style>
  :root {
    --color-bg: #0f172a;
    --color-text: #f1f5f9;
    --color-border: #1e293b;
  }

  [data-theme='dark'] {
    --color-bg: #0f172a;
    --color-text: #f1f5f9;
    --color-border: #1e293b;
  }
</style>
```

## React Integration

```jsx
import { useEffect, useState } from 'react';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = saved || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {children}
    </div>
  );
}
```

## CSS-in-JS (Styled Components)

```javascript
import styled from 'styled-components';

const GlobalStyle = styled.div`
  :root {
    --color-primary: #3b82f6;
    --color-primary-dark: #1e40af;
    --color-secondary: #6b7280;
    --color-secondary-dark: #374151;
  }

  [data-theme='dark'] {
    --color-bg: #1f2937;
    --color-text: #f3f4f6;
    --color-border: #374151;
  }
`;
```

## Tailwind CSS Integration

```css
/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        'kenikool-primary':'var(--color-primary)','kenikool-secondary': 'var(--color-secondary)';
      }
    }
  }
}
```

Then use in your HTML:

```html
<style>
  :root {
    --color-primary: #3b82f6;
    --color-secondary: #6b7280;
  }
</style>
```

## Best Practices

1. **Define variables at `:root`** - Makes them available globally
2. **Use `data-theme` attribute** - Standard way to switch themes
3. **Persist to localStorage** - Remember user preference
4. **Respect system preference** - Use `prefers-color-scheme` media query
5. **Test both themes** - Ensure readability in light and dark modes
6. **Use semantic names** - `--color-primary` instead of `--color-blue`

## Troubleshooting

**Colors not changing?**

- Ensure CSS variables are defined before components load
- Check browser DevTools to verify variable values
- Make sure `data-theme` attribute is set on `<html>` element

**Theme not persisting?**

- Check localStorage is enabled
- Verify `localStorage.setItem()` is called
- Check for localStorage quota errors in console

**Dark mode not working?**

- Verify `[data-theme="dark"]` selector is in your CSS
- Check that variables are overridden for dark mode
- Ensure `data-theme="dark"` is set on html element
