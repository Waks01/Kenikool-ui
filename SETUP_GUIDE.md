# Kenikool UI - Setup & Configuration Guide

A quick reference for developers installing and configuring Kenikool UI in their projects.

## Installation

### Step 1: Install the Package

Choose your package manager:

```bash
# npm
npm install @kenikool/ui

# pnpm
pnpm add @kenikool/ui

# yarn
yarn add @kenikool/ui
```

### Step 2: Install Peer Dependencies

Kenikool UI requires Tailwind CSS v4+:

```bash
npm install -D tailwindcss@^4.0.0
```

For React projects, ensure React 16.8+ is installed:

```bash
npm install react@^16.8.0
```

---

## Configuration by Framework

### Vanilla JavaScript

#### 1. Import Styles

Add the CSS import to your HTML file:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Import Kenikool UI styles -->
    <link rel="stylesheet" href="node_modules/@kenikool/ui/dist/styles.css" />
  </head>
  <body>
    <!-- Your content here -->
  </body>
</html>
```

#### 2. Import Components

Import the components in your JavaScript:

```javascript
// Import all components
import '@kenikool/ui/vanilla';

// Now you can use components in HTML
// <k-button design="v:primary s:md">Click me</k-button>
// <k-input design="s:md" placeholder="Enter text"></k-input>
// <k-card design="p:md sh:lg">Card content</k-card>
```

#### 3. Basic Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="node_modules/@kenikool/ui/dist/styles.css" />
  </head>
  <body>
    <!-- Button with design prop -->
    <k-button design="v:primary s:md">Click me</k-button>

    <!-- Input with design prop -->
    <k-input design="s:md" placeholder="Enter text" aria-label="Text input"></k-input>

    <!-- Card with design prop -->
    <k-card design="p:md sh:lg">
      <h2>Card Title</h2>
      <p>Card content goes here</p>
    </k-card>

    <script type="module">
      import '@kenikool/ui/vanilla';
    </script>
  </body>
</html>
```

---

### React

#### 1. Import Components and Styles

```tsx
import { KButton, KInput, KCard } from '@kenikool/ui/react';
import '@kenikool/ui/css';
```

#### 2. Basic Usage

```tsx
import { KButton, KInput, KCard } from '@kenikool/ui/react';
import '@kenikool/ui/css';

export function App() {
  return (
    <>
      {/* Button with design prop */}
      <KButton design="v:primary s:md">Click me</KButton>

      {/* Input with design prop */}
      <KInput design="s:md" placeholder="Enter text" aria-label="Text input" />

      {/* Card with design prop */}
      <KCard design="p:md sh:lg">
        <h2>Card Title</h2>
        <p>Card content goes here</p>
      </KCard>
    </>
  );
}
```

#### 3. Controlled Input Example

```tsx
import { useState } from 'react';
import { KInput } from '@kenikool/ui/react';
import '@kenikool/ui/css';

export function Form() {
  const [value, setValue] = useState('');

  return (
    <KInput
      design="s:md"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter text"
    />
  );
}
```

---

## Theme Configuration

### Light/Dark Mode

#### Automatic (System Preference)

By default, Kenikool UI respects the system's color scheme preference:

```javascript
// JavaScript
import { getTheme } from '@kenikool/ui';

const currentTheme = getTheme(); // 'light' or 'dark'
```

#### Manual Override

Force a specific theme using the `data-theme` attribute:

```html
<!-- Force dark mode -->
<html data-theme="dark">
  <!-- All components use dark mode -->
</html>

<!-- Force light mode -->
<html data-theme="light">
  <!-- All components use light mode -->
</html>
```

Or programmatically:

```javascript
import { setTheme } from '@kenikool/ui';

setTheme('dark'); // 'light' | 'dark' | 'auto'
```

### Custom CSS Variables

Override default colors, spacing, and animations by defining CSS variables:

```css
:root {
  /* Color tokens */
  --color-primary: #3b82f6;
  --color-primary-light: #60a5fa;
  --color-primary-dark: #1e40af;

  --color-secondary: #6b7280;
  --color-secondary-light: #9ca3af;
  --color-secondary-dark: #374151;

  --color-danger: #ef4444;
  --color-danger-light: #f87171;
  --color-danger-dark: #dc2626;

  /* Spacing tokens */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Font size tokens */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;

  /* Animation duration tokens */
  --animation-duration-fast: 150ms;
  --animation-duration-normal: 300ms;
  --animation-duration-slow: 500ms;
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1f2937;
    --color-text: #f3f4f6;
    --color-border: #374151;
  }
}
```

### Custom Brand Colors Example

```css
:root {
  /* Override to match your brand */
  --color-primary: #8b5cf6; /* Purple */
  --color-primary-light: #a78bfa;
  --color-primary-dark: #6d28d9;

  --color-secondary: #06b6d4; /* Cyan */
  --color-secondary-light: #22d3ee;
  --color-secondary-dark: #0891b2;
}
```

---

## Design Prop Format

All components use a unified `design` prop with space-separated tokens:

```
design="v:primary s:md a:pulse"
       ↑       ↑   ↑   ↑
       |       |   |   └─ animation
       |       |   └───── size
       |       └───────── variant
       └───────────────── prefix
```

### Available Tokens

#### Button

| Prefix | Token     | Values                                                             |
| ------ | --------- | ------------------------------------------------------------------ |
| `v:`   | variant   | primary, secondary, danger                                         |
| `s:`   | size      | sm, md, lg                                                         |
| `a:`   | animation | pulse, bounce, fade, scale, shake, glow, slide, rotate, flip, none |

**Example:** `design="v:primary s:lg a:pulse"`

#### Input

| Prefix | Token     | Values                                                             |
| ------ | --------- | ------------------------------------------------------------------ |
| `s:`   | size      | sm, md, lg                                                         |
| `a:`   | animation | pulse, bounce, fade, scale, shake, glow, slide, rotate, flip, none |

**Example:** `design="s:md a:fade"`

#### Card

| Prefix | Token     | Values                                                             |
| ------ | --------- | ------------------------------------------------------------------ |
| `p:`   | padding   | sm, md, lg                                                         |
| `sh:`  | shadow    | sm, md, lg, none                                                   |
| `a:`   | animation | pulse, bounce, fade, scale, shake, glow, slide, rotate, flip, none |

**Example:** `design="p:md sh:lg a:glow"`

---

## Common Setup Patterns

### Next.js

```tsx
// app/layout.tsx
import '@kenikool/ui/css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

### Vite + React

```tsx
// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@kenikool/ui/css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Create React App

```tsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@kenikool/ui/css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Astro

```astro
---
// src/layouts/Layout.astro
import '@kenikool/ui/css';
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Site</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

---

## Accessibility Setup

### Enable Keyboard Navigation

All components support keyboard navigation by default. No additional setup needed.

### Screen Reader Support

Components include proper ARIA attributes. Use semantic HTML:

```html
<!-- Good: Label associated with input -->
<label for="email">Email</label>
<k-input id="email" type="email" aria-label="Email address"></k-input>

<!-- Good: aria-label for icon-only buttons -->
<k-button aria-label="Close menu">×</k-button>
```

### Reduced Motion Support

Kenikool UI automatically respects `prefers-reduced-motion`. No configuration needed.

---

## Troubleshooting

### Styles Not Loading

**Problem:** Components appear unstyled.

**Solution:** Ensure CSS is imported before using components:

```tsx
// ✓ Correct
import '@kenikool/ui/css';
import { KButton } from '@kenikool/ui/react';

// ✗ Wrong
import { KButton } from '@kenikool/ui/react';
import '@kenikool/ui/css';
```

### Components Not Registering (Vanilla)

**Problem:** Web components not recognized.

**Solution:** Import the vanilla module before using components:

```html
<script type="module">
  import '@kenikool/ui/vanilla';
</script>

<!-- Now components are available -->
<k-button>Click me</k-button>
```

### TypeScript Errors

**Problem:** TypeScript doesn't recognize component types.

**Solution:** Ensure TypeScript version is 4.5+:

```bash
npm install -D typescript@^4.5.0
```

### Theme Not Changing

**Problem:** `setTheme()` doesn't update components.

**Solution:** Ensure `data-theme` attribute is on the root element:

```html
<html data-theme="dark">
  <!-- Components will use dark theme -->
</html>
```

---

## Next Steps

- 📖 Read the [full documentation](README.md)
- 🎨 Explore [Storybook](https://kenikool-ui.vercel.app)
- ♿ Review [Accessibility Guide](./packages/docs/stories/Accessibility.stories.mdx)
- 🐛 Report issues on [GitHub](https://github.com/kenikool/kenikool-ui/issues)
