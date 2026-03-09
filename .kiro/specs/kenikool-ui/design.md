# Kenikool UI - Technical Design Document

## Overview

Kenikool UI is a dual-framework component library that provides production-ready UI components for both vanilla JavaScript and React applications. The library solves "Tailwind fatigue" by offering pre-built, customizable components with a comprehensive theme system, multiple variants, and extensive animation support.

### Design Goals

1. **Dual-Framework Support**: Single codebase serving both vanilla JS and React developers
2. **Zero Tailwind Fatigue**: Pre-built components eliminate repetitive class composition
3. **Comprehensive Theming**: CSS variable-based system for colors, spacing, and animations
4. **Performance First**: GPU-accelerated animations, tree-shakeable code, minimal bundle size
5. **Accessibility by Default**: WCAG AA compliance, keyboard navigation, screen reader support
6. **Developer Experience**: TypeScript support, clear documentation, interactive Storybook

### Phase 1 Scope

- Three core components: Button, Input, Card
- Multiple variants (primary, secondary, danger)
- Multiple sizes (sm, md, lg)
- 10 animation types (pulse, bounce, fade, scale, shake, glow, slide, rotate, flip, none)
- Light/dark mode support
- Full accessibility compliance

---

## Architecture Overview

### Monorepo Structure

```
kenikool-ui/
├── packages/
│   ├── core/                    # Shared logic and types
│   │   ├── src/
│   │   │   ├── types/          # TypeScript interfaces
│   │   │   ├── theme/          # Theme system
│   │   │   ├── animations/     # Animation definitions
│   │   │   └── utils/          # Shared utilities
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── vanilla/                 # Vanilla JS Web Components
│   │   ├── src/
│   │   │   ├── components/     # k-button, k-input, k-card
│   │   │   ├── styles/         # CSS and Tailwind
│   │   │   └── index.ts        # Entry point
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── react/                   # React components
│   │   ├── src/
│   │   │   ├── components/     # KButton, KInput, KCard
│   │   │   ├── hooks/          # useTheme, useAnimation
│   │   │   └── index.ts        # Entry point
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── docs/                    # Storybook documentation
│       ├── stories/
│       ├── .storybook/
│       └── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tailwind.config.ts
└── package.json
```

### Build Tooling

- **Vite**: Fast build tool with HMR support
- **TypeScript**: Strict mode for type safety
- **Tailwind CSS v4+**: CSS-first configuration (no tailwind.config.js needed)
- **pnpm**: Workspace management for monorepo
- **Storybook**: Component documentation and testing

### Package Dependencies

```
core/
  └── No external dependencies (pure TypeScript)

vanilla/
  ├── core (workspace)
  └── Peer: tailwindcss@^4.0.0

react/
  ├── core (workspace)
  ├── react@^16.8.0 (peer)
  └── tailwindcss@^4.0.0 (peer)

docs/
  ├── @storybook/react
  ├── @storybook/addon-controls
  ├── @storybook/addon-a11y
  └── vanilla & react packages (workspace)
```

---

## Component Architecture

### Shared Component Logic Layer

The `core` package defines the contract for all components:

```typescript
// core/src/types/component.ts
export interface ComponentProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  animation?: AnimationType;
  className?: string;
  [key: string]: any;
}

export interface ThemeConfig {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  animations: Record<string, AnimationDefinition>;
}

export type AnimationType =
  | "pulse"
  | "bounce"
  | "fade"
  | "scale"
  | "shake"
  | "glow"
  | "slide"
  | "rotate"
  | "flip"
  | "none";
```

### Vanilla JS Implementation Strategy

Vanilla components use Web Components (custom elements) with the `k-` prefix:

```typescript
// vanilla/src/components/button.ts
export class KButton extends HTMLElement {
  private _variant: string = "primary";
  private _size: string = "md";
  private _disabled: boolean = false;
  private _animation: string = "none";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  private render() {
    const classes = this.getClasses();
    this.shadowRoot!.innerHTML = `
      <style>${this.getStyles()}</style>
      <button class="${classes}" ${this._disabled ? "disabled" : ""}>
        <slot></slot>
      </button>
    `;
  }

  private getClasses(): string {
    return [
      "k-button",
      `k-button--${this._variant}`,
      `k-button--${this._size}`,
      this._animation !== "none" && `k-button--${this._animation}`,
    ]
      .filter(Boolean)
      .join(" ");
  }

  static get observedAttributes() {
    return ["variant", "size", "disabled", "animation"];
  }
}

customElements.define("k-button", KButton);
```

### React Implementation Strategy

React components are functional components with TypeScript support:

```typescript
// react/src/components/Button.tsx
import React from 'react';
import { ComponentProps } from '@kenikool/core';
import { mergeClasses } from '../utils/classUtils';

export interface KButtonProps extends ComponentProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const KButton: React.FC<KButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  animation = 'none',
  className,
  children,
  ...props
}) => {
  const classes = mergeClasses(
    'k-button',
    `k-button--${variant}`,
    `k-button--${size}`,
    animation !== 'none' && `k-button--${animation}`,
    className
  );

  return (
    <button
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Prop/Attribute Mapping Strategy

**Vanilla Components**:

- Use HTML attributes (lowercase, kebab-case)
- Reflect properties to attributes for observability
- Support data-\* attributes for custom data

**React Components**:

- Use camelCase props (React convention)
- Support className and style props
- Spread remaining props to underlying HTML element

**Mapping Example**:

```
Vanilla:  <k-button variant="primary" size="lg" animation="pulse">
React:    <KButton variant="primary" size="lg" animation="pulse">
```

---

## Theme System Design

### CSS Variable Namespaces

Tailwind v4 uses `@theme` directive for CSS variables. The theme system defines:

```css
/* core/src/theme/variables.css */
@theme {
  --color-primary: #3b82f6;
  --color-primary-light: #60a5fa;
  --color-primary-dark: #1e40af;

  --color-secondary: #6b7280;
  --color-secondary-light: #9ca3af;
  --color-secondary-dark: #374151;

  --color-danger: #ef4444;
  --color-danger-light: #f87171;
  --color-danger-dark: #dc2626;

  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;

  --animation-duration-fast: 150ms;
  --animation-duration-normal: 300ms;
  --animation-duration-slow: 500ms;
}
```

### Color Tokens

```
Primary:   #3b82f6 (blue) - Main action color
Secondary: #6b7280 (gray) - Neutral/secondary actions
Danger:    #ef4444 (red)  - Destructive actions
```

### Spacing Tokens

```
sm: 8px   (0.5rem)
md: 12px  (0.75rem)
lg: 16px  (1rem)
```

### Animation Tokens

```
Duration:
  - fast:   150ms
  - normal: 300ms
  - slow:   500ms

Easing:
  - ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
  - ease-out:    cubic-bezier(0, 0, 0.2, 1)
```

### Light/Dark Mode Implementation

```css
/* Light mode (default) */
:root {
  --color-bg: #ffffff;
  --color-text: #1f2937;
  --color-border: #e5e7eb;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1f2937;
    --color-text: #f3f4f6;
    --color-border: #374151;
  }
}

/* Manual override */
[data-theme="dark"] {
  --color-bg: #1f2937;
  --color-text: #f3f4f6;
  --color-border: #374151;
}

[data-theme="light"] {
  --color-bg: #ffffff;
  --color-text: #1f2937;
  --color-border: #e5e7eb;
}
```

### Theme Switching Mechanism

```typescript
// core/src/theme/useTheme.ts
export function setTheme(theme: "light" | "dark" | "auto") {
  const root = document.documentElement;

  if (theme === "auto") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }

  // Dispatch custom event for components to react
  window.dispatchEvent(new CustomEvent("theme-change", { detail: { theme } }));
}

export function getTheme(): "light" | "dark" {
  const theme = document.documentElement.getAttribute("data-theme");
  if (theme === "light" || theme === "dark") return theme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
```

---

## Animation Strategy

### CSS Animations for Vanilla

All animations use CSS keyframes for performance:

```css
/* vanilla/src/styles/animations.css */

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scale {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

@keyframes glow {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
}

@keyframes slide {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes flip {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}

/* Animation classes */
.k-button--pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.k-button--bounce {
  animation: bounce 0.5s ease-out;
}
.k-button--bounce:hover {
  animation: bounce 0.5s ease-out;
}
.k-button--fade {
  animation: fade 0.3s ease-out;
}
.k-button--scale:hover {
  animation: scale 0.3s ease-out forwards;
}
.k-button--shake:active {
  animation: shake 0.3s ease-out;
}
.k-button--glow {
  animation: glow 2s infinite;
}
.k-button--slide {
  animation: slide 0.3s ease-out;
}
.k-button--rotate {
  animation: rotate 1s linear infinite;
}
.k-button--flip {
  animation: flip 0.6s ease-out;
}
```

### Framer Motion Integration for React

```typescript
// react/src/components/Button.tsx
import { motion } from 'framer-motion';

const animationVariants = {
  pulse: {
    opacity: [1, 0.5, 1],
    transition: { duration: 2, repeat: Infinity }
  },
  bounce: {
    y: [0, -10, 0],
    transition: { duration: 0.5 }
  },
  fade: {
    opacity: [0, 1],
    transition: { duration: 0.3 }
  },
  scale: {
    scale: [1, 1.05],
    transition: { duration: 0.3 }
  },
  // ... other animations
};

export const KButton: React.FC<KButtonProps> = ({ animation = 'none', ...props }) => {
  const variant = animation !== 'none' ? animationVariants[animation] : {};

  return (
    <motion.button
      className={classes}
      {...variant}
      {...props}
    >
      {children}
    </motion.button>
  );
};
```

### GPU-Accelerated Properties

All animations use transform and opacity for optimal performance:

```css
/* Good: GPU-accelerated */
transform: translateX(10px);
transform: scale(1.05);
transform: rotate(360deg);
opacity: 0.5;

/* Avoid: CPU-intensive */
left: 10px;
width: 100px;
height: 100px;
```

### prefers-reduced-motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Styling Approach

### Tailwind v4 CSS-First Configuration

Tailwind v4 eliminates the need for `tailwind.config.js`. Configuration is done via CSS:

```css
/* tailwind.css */
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --color-danger: #ef4444;

  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
}

@layer components {
  .k-button {
    @apply inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200;
  }

  .k-button--primary {
    @apply bg-primary text-white hover:bg-primary-dark;
  }

  .k-button--secondary {
    @apply bg-secondary text-white hover:bg-secondary-dark;
  }

  .k-button--danger {
    @apply bg-danger text-white hover:bg-danger-dark;
  }

  .k-button--sm {
    @apply px-2 py-1 text-xs;
  }

  .k-button--md {
    @apply px-3 py-2 text-sm;
  }

  .k-button--lg {
    @apply px-4 py-3 text-base;
  }

  .k-button:disabled {
    @apply opacity-50 cursor-not-allowed;
  }
}
```

### Component Class Composition Strategy

```typescript
// utils/classUtils.ts
export function mergeClasses(
  ...classes: (string | false | undefined)[]
): string {
  return classes
    .filter((cls): cls is string => typeof cls === "string" && cls.length > 0)
    .join(" ");
}

// Usage in components
const buttonClasses = mergeClasses(
  "k-button",
  `k-button--${variant}`,
  `k-button--${size}`,
  animation !== "none" && `k-button--${animation}`,
  disabled && "k-button--disabled",
  className, // Custom classes from user
);
```

### Custom Class Merging for Extensibility

```typescript
// React example
export const KButton: React.FC<KButtonProps> = ({
  className,
  ...props
}) => {
  const baseClasses = 'k-button k-button--primary k-button--md';
  const finalClasses = mergeClasses(baseClasses, className);

  return <button className={finalClasses} {...props} />;
};

// Usage
<KButton className="custom-shadow custom-hover">Click me</KButton>
```

### CSS Variable Usage for Theming

```css
.k-button--primary {
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border-color: var(--color-primary-border);
}

.k-button--primary:hover {
  background-color: var(--color-primary-dark);
}

.k-button--sm {
  padding: var(--spacing-sm);
  font-size: var(--font-size-sm);
}
```

---

## Component Specifications

### Button Component

**Vanilla**: `<k-button>`
**React**: `<KButton />`

**Attributes/Props**:

- `variant`: 'primary' | 'secondary' | 'danger' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `disabled`: boolean (default: false)
- `animation`: AnimationType (default: 'none')
- `type`: 'button' | 'submit' | 'reset' (default: 'button')
- `aria-label`: string (for accessibility)

**Styling**:

- Primary: Blue background (#3b82f6), white text
- Secondary: Gray background (#6b7280), white text
- Danger: Red background (#ef4444), white text
- Sizes: sm (8px padding, 12px font), md (12px padding, 14px font), lg (16px padding, 16px font)

**Accessibility**:

- Keyboard navigation (Tab, Enter, Space)
- Focus indicator visible
- ARIA attributes for screen readers
- Disabled state properly communicated

### Input Component

**Vanilla**: `<k-input>`
**React**: `<KInput />`

**Attributes/Props**:

- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `disabled`: boolean (default: false)
- `error`: boolean (default: false)
- `placeholder`: string
- `value`: string (React controlled component)
- `type`: 'text' | 'email' | 'password' | etc.
- `aria-label`: string

**Styling**:

- Focus: Border color change, shadow effect
- Error: Red border, error text color
- Disabled: Reduced opacity, cursor not-allowed
- Sizes: sm (8px padding, 12px font), md (12px padding, 14px font), lg (16px padding, 16px font)

**Accessibility**:

- Keyboard navigation
- Focus indicator
- Associated labels via aria-label
- Error messages for screen readers

### Card Component

**Vanilla**: `<k-card>`
**React**: `<KCard />`

**Attributes/Props**:

- `padding`: 'sm' | 'md' | 'lg' (default: 'md')
- `shadow`: 'sm' | 'md' | 'lg' | 'none' (default: 'md')
- `className`: string (React)

**Styling**:

- Padding: sm (12px), md (16px), lg (24px)
- Shadow: sm (0 1px 2px), md (0 4px 6px), lg (0 10px 15px)
- Theme-aware: Adapts to light/dark mode

**Content**:

- Vanilla: Slot-based content insertion
- React: Children prop

---

## Build & Distribution

### Entry Points

```json
{
  "name": "@kenikool/ui",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./vanilla": {
      "types": "./dist/vanilla/index.d.ts",
      "import": "./dist/vanilla/index.mjs",
      "require": "./dist/vanilla/index.cjs"
    },
    "./react": {
      "types": "./dist/react/index.d.ts",
      "import": "./dist/react/index.mjs",
      "require": "./dist/react/index.cjs"
    },
    "./css": "./dist/styles.css"
  }
}
```

### Tree-Shaking Support

```typescript
// vanilla/src/index.ts
export { KButton } from "./components/button";
export { KInput } from "./components/input";
export { KCard } from "./components/card";

// react/src/index.ts
export { KButton } from "./components/Button";
export { KInput } from "./components/Input";
export { KCard } from "./components/Card";
```

### TypeScript Type Definitions

```typescript
// core/src/types/index.ts
export interface ComponentProps {
  variant?: string;
  size?: string;
  disabled?: boolean;
  animation?: AnimationType;
  className?: string;
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
  padding?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg" | "none";
}
```

### Bundle Optimization Strategy

1. **Code Splitting**: Separate vanilla and React bundles
2. **CSS Purging**: Tailwind removes unused styles
3. **Minification**: Vite handles minification
4. **Compression**: gzip compression for distribution
5. **Tree-shaking**: ES modules with side-effect-free code

---

## Documentation & Testing

### Storybook Setup

```typescript
// docs/.storybook/main.ts
export default {
  stories: ["../stories/**/*.stories.ts"],
  addons: [
    "@storybook/addon-controls",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
};
```

### Component Stories

```typescript
// docs/stories/Button.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import { KButton } from "@kenikool/react";

const meta: Meta<typeof KButton> = {
  component: KButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    animation: {
      control: "select",
      options: [
        "pulse",
        "bounce",
        "fade",
        "scale",
        "shake",
        "glow",
        "slide",
        "rotate",
        "flip",
        "none",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const WithAnimation: Story = {
  args: {
    variant: "primary",
    animation: "pulse",
    children: "Pulsing Button",
  },
};
```

### Unit Test Strategy

```typescript
// vanilla/src/components/__tests__/button.test.ts
import { describe, it, expect } from "vitest";
import "../button";

describe("KButton", () => {
  it("renders as a button element", () => {
    const button = document.createElement("k-button");
    document.body.appendChild(button);

    const innerButton = button.shadowRoot?.querySelector("button");
    expect(innerButton).toBeTruthy();
  });

  it("applies primary variant styling", () => {
    const button = document.createElement("k-button");
    button.setAttribute("variant", "primary");
    document.body.appendChild(button);

    const classes = button.shadowRoot?.querySelector("button")?.className;
    expect(classes).toContain("k-button--primary");
  });
});
```

---

## Development Workflow

### Local Development Setup

```bash
# Install dependencies
pnpm install

# Start Storybook
pnpm run storybook

# Watch mode for development
pnpm run dev

# Run tests
pnpm run test

# Build all packages
pnpm run build
```

### Hot Module Replacement (HMR)

Vite provides HMR for instant feedback during development:

```typescript
// vite.config.ts
export default {
  server: {
    middlewareMode: true,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173,
    },
  },
};
```

### Testing Approach

- **Unit Tests**: Vitest for component logic
- **Integration Tests**: Testing component interactions
- **Accessibility Tests**: axe-core for automated a11y checks
- **Visual Tests**: Storybook for manual verification

### Build Process

```bash
# Development build
vite build --mode development

# Production build with minification
vite build --mode production

# Generate type definitions
tsc --emitDeclarationOnly
```

---

## Deployment & Publishing

### npm Package Structure

```
@kenikool/ui/
├── dist/
│   ├── vanilla/
│   │   ├── index.mjs
│   │   ├── index.cjs
│   │   └── index.d.ts
│   ├── react/
│   │   ├── index.mjs
│   │   ├── index.cjs
│   │   └── index.d.ts
│   ├── styles.css
│   └── index.d.ts
├── package.json
├── README.md
└── CHANGELOG.md
```

### Version Management

- Semantic versioning (MAJOR.MINOR.PATCH)
- Changelog tracking all changes
- Git tags for releases

### Release Process

```bash
# Bump version
pnpm version patch|minor|major

# Build
pnpm run build

# Publish to npm
pnpm publish

# Push to git
git push origin main --tags
```

### Documentation Deployment

- Storybook deployed to Vercel/Netlify
- README with quick start guide
- API documentation auto-generated from JSDoc/TSDoc

---

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Button Variant Styling

_For any_ button component with a variant attribute set to one of 'primary', 'secondary', or 'danger', the computed styles should match the expected styling for that variant (background color, text color, and hover state).

**Validates: Requirements 1.2, 1.3, 1.4, 2.1**

### Property 2: Button Size Consistency

_For any_ button component with a size attribute set to one of 'sm', 'md', or 'lg', the computed padding and font-size should match the expected values for that size.

**Validates: Requirements 1.5, 1.6, 1.7, 2.2**

### Property 3: Disabled Button State

_For any_ button component with the disabled attribute present, the button should have reduced opacity (0.5), cursor set to 'not-allowed', and should not respond to click events.

**Validates: Requirements 1.8, 2.3**

### Property 4: Button Focus Indicator

_For any_ button component that receives focus, a visible focus indicator should be present in the computed styles (outline or box-shadow).

**Validates: Requirements 1.9**

### Property 5: Button HTML Attributes Pass-Through

_For any_ button component with arbitrary HTML attributes (type, aria-label, data-\*), those attributes should be present on the underlying button element.

**Validates: Requirements 1.10, 2.6**

### Property 6: Button Click Handler Execution

_For any_ button component with an onClick handler, the handler should be called exactly once when the button is clicked.

**Validates: Requirements 2.4**

### Property 7: Button Children Rendering

_For any_ button component rendered with children content, that content should appear in the rendered button element.

**Validates: Requirements 2.5**

### Property 8: Animation Application

_For any_ button component with an animation attribute set to one of the valid animation types (pulse, bounce, fade, scale, shake, glow, slide, rotate, flip), the corresponding CSS animation should be present in the computed styles.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9**

### Property 9: No Animation When None

_For any_ button component with animation set to 'none', no animation should be applied to the element.

**Validates: Requirements 3.10**

### Property 10: Input Size Consistency

_For any_ input component with a size attribute set to one of 'sm', 'md', or 'lg', the computed padding and font-size should match the expected values for that size.

**Validates: Requirements 4.2, 4.3, 4.4, 5.1**

### Property 11: Input Focus Styling

_For any_ input component that receives focus, the border color should change and a shadow effect should be applied.

**Validates: Requirements 4.5**

### Property 12: Input Error State

_For any_ input component with the error attribute present, the border should be red and error text color should be applied.

**Validates: Requirements 4.6, 5.2**

### Property 13: Input Disabled State

_For any_ input component with the disabled attribute present, the input should have reduced opacity and cursor set to 'not-allowed', and should not accept user input.

**Validates: Requirements 4.7, 5.3**

### Property 14: Input Placeholder Display

_For any_ input component with a placeholder attribute, the placeholder text should be visible when the input is empty.

**Validates: Requirements 4.8**

### Property 15: Input Value Change Event

_For any_ input component, when a value is entered, a change event should be emitted with the new value.

**Validates: Requirements 4.9, 5.4**

### Property 16: Input HTML Attributes Pass-Through

_For any_ input component with arbitrary HTML attributes (type, name, id, aria-label, data-\*), those attributes should be present on the underlying input element.

**Validates: Requirements 4.10, 5.7**

### Property 17: Input Controlled Component

_For any_ React input component rendered with a value prop, the input should function as a controlled component and display the provided value.

**Validates: Requirements 5.5**

### Property 18: Input Uncontrolled Component

_For any_ React input component rendered without a value prop, the input should function as an uncontrolled component and maintain its own internal state.

**Validates: Requirements 5.6**

### Property 19: Card Padding Consistency

_For any_ card component with a padding attribute set to one of 'sm', 'md', or 'lg', the computed padding should match the expected values (sm: 12px, md: 16px, lg: 24px).

**Validates: Requirements 6.2, 6.3, 6.4, 7.1**

### Property 20: Card Shadow Consistency

_For any_ card component with a shadow attribute set to one of 'sm', 'md', 'lg', or 'none', the computed box-shadow should match the expected values for that shadow level.

**Validates: Requirements 6.5, 6.6, 6.7, 6.8, 7.2**

### Property 21: Card Dark Mode Styling

_For any_ card component when the theme is set to dark mode, the background should be dark and text should be light.

**Validates: Requirements 6.9, 7.4**

### Property 22: Card Content Rendering

_For any_ card component rendered with content (slot or children), that content should be visible inside the card.

**Validates: Requirements 6.10, 7.3**

### Property 23: Card HTML Attributes Pass-Through

_For any_ card component with arbitrary HTML attributes, those attributes should be present on the underlying container element.

**Validates: Requirements 7.5**

### Property 24: Theme System CSS Variables Definition

_For any_ initialized theme system, CSS variables for primary, secondary, and danger colors should be defined on the root element.

**Validates: Requirements 8.1**

### Property 25: CSS Variable Override Application

_For any_ CSS variable overridden on the root element, all components should use the custom value instead of the default.

**Validates: Requirements 8.2**

### Property 26: Light Mode Color Values

_For any_ theme system set to light mode, the computed color values should match the light mode palette.

**Validates: Requirements 8.3**

### Property 27: Dark Mode Color Values

_For any_ theme system set to dark mode, the computed color values should match the dark mode palette.

**Validates: Requirements 8.4**

### Property 28: Custom Color Definitions

_For any_ custom color CSS variable defined, components should use that custom value when referenced.

**Validates: Requirements 8.5**

### Property 29: Custom Spacing Definitions

_For any_ custom spacing CSS variable defined, components should use that custom value when referenced.

**Validates: Requirements 8.6**

### Property 30: Custom Font Size Definitions

_For any_ custom font size CSS variable defined, components should use that custom value when referenced.

**Validates: Requirements 8.7**

### Property 31: System Preference Dark Mode

_For any_ system with prefers-color-scheme set to dark, components should automatically apply dark mode styling.

**Validates: Requirements 9.1**

### Property 32: System Preference Light Mode

_For any_ system with prefers-color-scheme set to light, components should automatically apply light mode styling.

**Validates: Requirements 9.2**

### Property 33: Manual Dark Mode Override

_For any_ data-theme attribute set to "dark" on the root element, components should apply dark mode styling regardless of system preference.

**Validates: Requirements 9.3**

### Property 34: Manual Light Mode Override

_For any_ data-theme attribute set to "light" on the root element, components should apply light mode styling regardless of system preference.

**Validates: Requirements 9.4**

### Property 35: Programmatic Theme Update

_For any_ programmatic theme change, all components should update their styling without requiring a page reload.

**Validates: Requirements 9.5**

### Property 36: prefers-color-scheme Media Query Respect

_For any_ change in the prefers-color-scheme media query, components should automatically update their styling to match the new preference.

**Validates: Requirements 9.6**

### Property 37: Custom Class Merging

_For any_ component with a custom className prop, the custom classes should be merged with default classes without breaking component functionality.

**Validates: Requirements 10.1**

### Property 38: Inline Style Application

_For any_ component with a style prop, inline styles should be applied without breaking component functionality.

**Validates: Requirements 10.2**

### Property 39: CSS Specificity Override

_For any_ custom CSS defined in the application with higher specificity, component styles should be overridable.

**Validates: Requirements 10.3**

### Property 40: Button Keyboard Navigation

_For any_ button component, keyboard navigation (Tab, Enter, Space) should work correctly to focus and activate the button.

**Validates: Requirements 13.1**

### Property 41: Button ARIA Attributes

_For any_ button component, proper ARIA attributes (role, aria-label, aria-pressed) should be present and correct.

**Validates: Requirements 13.2**

### Property 42: Input Keyboard Navigation

_For any_ input component, keyboard navigation should work correctly and screen readers should be able to interact with it.

**Validates: Requirements 13.3**

### Property 43: Input Label Association

_For any_ input component with aria-label or associated label element, screen readers should correctly identify the input.

**Validates: Requirements 13.4**

### Property 44: Color Contrast Compliance

_For any_ component, the color contrast between text and background should meet WCAG AA standards (minimum 4.5:1 for normal text).

**Validates: Requirements 13.5**

### Property 45: Focus Indicator Visibility

_For any_ interactive component, a focus indicator should be visible and meet WCAG standards for visibility.

**Validates: Requirements 13.6**

### Property 46: prefers-reduced-motion Respect

_For any_ component with animations, when prefers-reduced-motion is set to reduce, animations should be disabled or significantly reduced.

**Validates: Requirements 13.7**

### Property 47: Vanilla Component Custom Element Registration

_For any_ vanilla component, the custom element should be properly registered and instantiable via document.createElement.

**Validates: Requirements 1.1, 4.1, 6.1**

### Property 48: React Component TypeScript Typing

_For any_ React component, TypeScript should provide full type checking for all props and prevent invalid prop combinations.

**Validates: Requirements 2.7, 5.8, 7.6**

---

## Error Handling

### Component-Level Error Handling

1. **Invalid Variant/Size**: Components should fall back to default values if invalid variants or sizes are provided
2. **Missing Required Props**: React components should provide sensible defaults for optional props
3. **Attribute Parsing**: Vanilla components should gracefully handle malformed attribute values
4. **Theme System Errors**: If CSS variables are not defined, components should use fallback colors

### User Input Validation

1. **Input Component**: Should validate input type and format, emit error events for invalid input
2. **Button Component**: Should handle rapid clicks gracefully (debounce if needed)
3. **Card Component**: Should handle overflow content with appropriate CSS (overflow: auto)

### Accessibility Error Prevention

1. **Missing Labels**: Components should warn in development if labels are missing
2. **Color Contrast**: Build process should warn if custom colors don't meet WCAG standards
3. **Focus Management**: Components should maintain focus visibility in all states

---

## Testing Strategy

### Dual Testing Approach

The library uses both unit tests and property-based tests for comprehensive coverage:

**Unit Tests** (Vitest):

- Specific examples and edge cases
- Component rendering and DOM structure
- Event handling and callbacks
- Integration between components and theme system
- Accessibility attribute verification

**Property-Based Tests** (fast-check for JavaScript):

- Universal properties across all valid inputs
- Variant/size combinations
- Theme switching behavior
- Animation application
- CSS variable overrides
- Keyboard navigation
- ARIA attribute correctness

### Unit Testing Examples

```typescript
// vanilla/src/components/__tests__/button.test.ts
describe("KButton", () => {
  it("renders with primary variant by default", () => {
    const button = document.createElement("k-button");
    document.body.appendChild(button);
    expect(button.shadowRoot?.querySelector("button")?.className).toContain(
      "k-button--primary",
    );
  });

  it("applies disabled styling when disabled attribute is present", () => {
    const button = document.createElement("k-button");
    button.setAttribute("disabled", "");
    document.body.appendChild(button);
    expect(button.shadowRoot?.querySelector("button")?.disabled).toBe(true);
  });

  it("emits click event when clicked", () => {
    const button = document.createElement("k-button");
    const clickSpy = vi.fn();
    button.addEventListener("click", clickSpy);
    document.body.appendChild(button);

    button.shadowRoot?.querySelector("button")?.click();
    expect(clickSpy).toHaveBeenCalled();
  });
});
```

### Property-Based Testing Configuration

Each property-based test:

- Runs minimum 100 iterations with random inputs
- Includes a comment referencing the design property
- Uses generators for valid component states
- Verifies the property holds across all generated inputs

```typescript
// vanilla/src/components/__tests__/button.property.test.ts
import fc from "fast-check";

describe("KButton Properties", () => {
  it("Property 2: Button size consistency", () => {
    // Feature: kenikool-ui, Property 2: Button Size Consistency
    fc.assert(
      fc.property(
        fc.oneof(fc.constant("sm"), fc.constant("md"), fc.constant("lg")),
        (size) => {
          const button = document.createElement("k-button");
          button.setAttribute("size", size);
          document.body.appendChild(button);

          const innerButton = button.shadowRoot?.querySelector("button");
          const classes = innerButton?.className || "";

          expect(classes).toContain(`k-button--${size}`);

          document.body.removeChild(button);
          return true;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("Property 25: CSS variable override application", () => {
    // Feature: kenikool-ui, Property 25: CSS Variable Override Application
    fc.assert(
      fc.property(fc.hexaString({ minLength: 6, maxLength: 6 }), (colorHex) => {
        const root = document.documentElement;
        root.style.setProperty("--color-primary", `#${colorHex}`);

        const button = document.createElement("k-button");
        button.setAttribute("variant", "primary");
        document.body.appendChild(button);

        const computed = window.getComputedStyle(
          button.shadowRoot?.querySelector("button")!,
        );
        const bgColor = computed.backgroundColor;

        // Verify the custom color is applied
        expect(bgColor).toBeTruthy();

        root.style.removeProperty("--color-primary");
        document.body.removeChild(button);
        return true;
      }),
      { numRuns: 100 },
    );
  });
});
```

### Test Coverage Goals

- **Unit Tests**: 80% code coverage minimum
- **Property Tests**: All testable acceptance criteria covered
- **Accessibility Tests**: axe-core automated checks on all components
- **Visual Tests**: Storybook stories for manual verification

### Continuous Integration

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: "pnpm"
      - run: pnpm install
      - run: pnpm run test
      - run: pnpm run test:a11y
      - run: pnpm run build
      - run: pnpm run bundle-size-check
```
