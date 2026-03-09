# Kenikool UI

A dual-framework component library that solves "Tailwind fatigue" by providing pre-built, production-ready UI components for both vanilla JavaScript and React applications.

[![npm version](https://img.shields.io/npm/v/@kenikool/ui.svg)](https://www.npmjs.com/package/@kenikool/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![WCAG 2.1 Level AA](https://img.shields.io/badge/WCAG-2.1%20Level%20AA-green.svg)](https://www.w3.org/WAI/WCAG21/quickref/)

## Features

✨ **Dual-Framework Support** - Single codebase serving both vanilla JS and React developers

🎨 **Zero Tailwind Fatigue** - Pre-built components eliminate repetitive class composition

🎭 **Comprehensive Theming** - CSS variable-based system for colors, spacing, and animations

⚡ **Performance First** - GPU-accelerated animations, tree-shakeable code, minimal bundle size

♿ **Accessibility by Default** - WCAG AA compliance, keyboard navigation, screen reader support

📚 **Developer Experience** - TypeScript support, clear documentation, interactive Storybook

## Installation

### npm

```bash
npm install @kenikool/ui
```

### pnpm

```bash
pnpm add @kenikool/ui
```

### yarn

```bash
yarn add @kenikool/ui
```

### Peer Dependencies

Kenikool UI requires Tailwind CSS v4+ as a peer dependency:

```bash
npm install -D tailwindcss@^4.0.0
```

For React applications, ensure you have React 16.8+ installed:

```bash
npm install react@^16.8.0
```

## Quick Start

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="node_modules/@kenikool/ui/dist/styles.css" />
  </head>
  <body>
    <!-- Button Component -->
    <k-button variant="primary" size="md">Click me</k-button>

    <!-- Input Component -->
    <k-input placeholder="Enter text" aria-label="Text input"></k-input>

    <!-- Card Component -->
    <k-card padding="md" shadow="lg">
      <h2>Card Title</h2>
      <p>Card content goes here</p>
    </k-card>

    <script type="module">
      import '@kenikool/ui/vanilla';
    </script>
  </body>
</html>
```

### React

```tsx
import { KButton, KInput, KCard } from '@kenikool/ui/react';
import '@kenikool/ui/css';

export function App() {
  return (
    <>
      {/* Button Component */}
      <KButton variant="primary" size="md">
        Click me
      </KButton>

      {/* Input Component */}
      <KInput placeholder="Enter text" aria-label="Text input" />

      {/* Card Component */}
      <KCard padding="md" shadow="lg">
        <h2>Card Title</h2>
        <p>Card content goes here</p>
      </KCard>
    </>
  );
}
```

## Components

### Button

A customizable button component with multiple variants, sizes, and animations.

**Vanilla:**

```html
<k-button variant="primary" size="md" animation="pulse"> Click me </k-button>
```

**React:**

```tsx
<KButton variant="primary" size="md" animation="pulse">
  Click me
</KButton>
```

#### Props & Attributes

| Prop/Attribute      | Type                                 | Default   | Description                         |
| ------------------- | ------------------------------------ | --------- | ----------------------------------- |
| `variant`           | 'primary' \| 'secondary' \| 'danger' | 'primary' | Button style variant                |
| `size`              | 'sm' \| 'md' \| 'lg'                 | 'md'      | Button size                         |
| `disabled`          | boolean                              | false     | Disable button interaction          |
| `animation`         | AnimationType                        | 'none'    | Animation effect                    |
| `type`              | 'button' \| 'submit' \| 'reset'      | 'button'  | HTML button type                    |
| `aria-label`        | string                               | -         | Accessible label for screen readers |
| `className` (React) | string                               | -         | Additional CSS classes              |

#### Styling Details

- **Primary**: Blue background (#3b82f6), white text, hover darkens to #1e40af
- **Secondary**: Gray background (#6b7280), white text, hover darkens to #374151
- **Danger**: Red background (#ef4444), white text, hover darkens to #dc2626
- **Sizes**:
  - `sm`: 8px padding, 12px font size
  - `md`: 12px padding, 14px font size
  - `lg`: 16px padding, 16px font size

### Input

A customizable input component with multiple sizes and states.

**Vanilla:**

```html
<k-input size="md" placeholder="Enter text" aria-label="Email"></k-input>
```

**React:**

```tsx
<KInput size="md" placeholder="Enter text" aria-label="Email" />
```

#### Props & Attributes

| Prop/Attribute      | Type                 | Default | Description                              |
| ------------------- | -------------------- | ------- | ---------------------------------------- |
| `size`              | 'sm' \| 'md' \| 'lg' | 'md'    | Input size                               |
| `disabled`          | boolean              | false   | Disable input interaction                |
| `error`             | boolean              | false   | Show error state                         |
| `placeholder`       | string               | -       | Placeholder text                         |
| `type`              | string               | 'text'  | HTML input type                          |
| `value`             | string               | -       | Input value (React controlled)           |
| `aria-label`        | string               | -       | Accessible label for screen readers      |
| `aria-invalid`      | boolean              | -       | Mark input as invalid for screen readers |
| `className` (React) | string               | -       | Additional CSS classes                   |

#### Styling Details

- **Focus State**: Border color changes to primary color, shadow effect applied
- **Error State**: Red border (#ef4444), error text color applied
- **Disabled State**: Reduced opacity (0.5), cursor set to 'not-allowed'
- **Sizes**:
  - `sm`: 8px padding, 12px font size
  - `md`: 12px padding, 14px font size
  - `lg`: 16px padding, 16px font size

#### React Controlled vs Uncontrolled

```tsx
// Controlled component
const [value, setValue] = useState('');
<KInput value={value} onChange={(e) => setValue(e.target.value)} />

// Uncontrolled component
<KInput defaultValue="initial" />
```

### Card

A flexible card component with padding and shadow variants.

**Vanilla:**

```html
<k-card padding="md" shadow="lg">
  <h2>Card Title</h2>
  <p>Card content</p>
</k-card>
```

**React:**

```tsx
<KCard padding="md" shadow="lg">
  <h2>Card Title</h2>
  <p>Card content</p>
</KCard>
```

#### Props & Attributes

| Prop/Attribute      | Type                           | Default | Description            |
| ------------------- | ------------------------------ | ------- | ---------------------- |
| `padding`           | 'sm' \| 'md' \| 'lg'           | 'md'    | Internal padding       |
| `shadow`            | 'sm' \| 'md' \| 'lg' \| 'none' | 'md'    | Shadow effect          |
| `className` (React) | string                         | -       | Additional CSS classes |

#### Styling Details

- **Padding**:
  - `sm`: 12px
  - `md`: 16px
  - `lg`: 24px
- **Shadow**:
  - `sm`: 0 1px 2px rgba(0, 0, 0, 0.05)
  - `md`: 0 4px 6px rgba(0, 0, 0, 0.1)
  - `lg`: 0 10px 15px rgba(0, 0, 0, 0.1)
  - `none`: No shadow
- **Theme-Aware**: Automatically adapts background and text colors for light/dark mode

## Animations

All components support 10 animation types for enhanced user experience:

| Animation  | Description               | Trigger         | Duration    |
| ---------- | ------------------------- | --------------- | ----------- |
| **pulse**  | Continuous pulsing effect | Always active   | 2s infinite |
| **bounce** | Bouncing effect           | On hover        | 0.5s        |
| **fade**   | Fade-in effect            | On mount        | 0.3s        |
| **scale**  | Scale transformation      | On hover        | 0.3s        |
| **shake**  | Shake effect              | On click/active | 0.3s        |
| **glow**   | Glowing effect            | Always active   | 2s infinite |
| **slide**  | Slide effect              | On mount        | 0.3s        |
| **rotate** | Rotation animation        | Always active   | 1s infinite |
| **flip**   | Flip animation            | On mount        | 0.6s        |
| **none**   | No animation              | -               | -           |

### Animation Usage

**Vanilla:**

```html
<!-- Pulsing button -->
<k-button animation="pulse">Pulsing Button</k-button>

<!-- Bouncing input on hover -->
<k-input animation="bounce" placeholder="Hover me"></k-input>

<!-- Glowing card -->
<k-card animation="glow" padding="md">
  <p>Glowing card content</p>
</k-card>
```

**React:**

```tsx
// Pulsing button
<KButton animation="pulse">Pulsing Button</KButton>

// Bouncing input on hover
<KInput animation="bounce" placeholder="Hover me" />

// Glowing card
<KCard animation="glow" padding="md">
  <p>Glowing card content</p>
</KCard>
```

### Animation Performance

All animations use GPU-accelerated CSS properties (transform, opacity) for optimal performance:

- Maintains 60fps on modern devices
- Respects `prefers-reduced-motion` for accessibility
- No JavaScript overhead - pure CSS animations
- Minimal performance impact on page load

### Disabling Animations

To disable animations globally for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Kenikool UI automatically respects this preference.

## Theme Customization

### Light/Dark Mode

Kenikool UI automatically adapts to system preferences and supports manual theme switching.

```javascript
// Set theme programmatically
import { setTheme, getTheme } from '@kenikool/ui';

setTheme('dark'); // 'light' | 'dark' | 'auto'
const currentTheme = getTheme(); // 'light' | 'dark'
```

### Manual Theme Override

Use the `data-theme` attribute on the root element to override system preferences:

```html
<!-- Force dark mode -->
<html data-theme="dark">
  <!-- All components will use dark mode -->
</html>

<!-- Force light mode -->
<html data-theme="light">
  <!-- All components will use light mode -->
</html>
```

### CSS Variables

Customize colors, spacing, and other design tokens using CSS variables. Define them in your root CSS file:

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

### Theme Customization Examples

#### Custom Brand Colors

```css
:root {
  /* Override primary color to match your brand */
  --color-primary: #8b5cf6; /* Purple */
  --color-primary-light: #a78bfa;
  --color-primary-dark: #6d28d9;

  /* Override secondary color */
  --color-secondary: #06b6d4; /* Cyan */
  --color-secondary-light: #22d3ee;
  --color-secondary-dark: #0891b2;
}
```

#### Custom Spacing

```css
:root {
  /* Increase spacing for more spacious layout */
  --spacing-sm: 0.75rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
}
```

#### Custom Font Sizes

```css
:root {
  /* Increase font sizes for better readability */
  --font-size-sm: 1rem;
  --font-size-md: 1.125rem;
  --font-size-lg: 1.25rem;
}
```

#### Custom Animation Speeds

```css
:root {
  /* Slow down animations for a more elegant feel */
  --animation-duration-fast: 250ms;
  --animation-duration-normal: 500ms;
  --animation-duration-slow: 750ms;
}
```

### Dark Mode Example

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="node_modules/@kenikool/ui/dist/styles.css" />
    <style>
      :root {
        --color-primary: #3b82f6;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --color-bg: #1f2937;
          --color-text: #f3f4f6;
        }
      }
    </style>
  </head>
  <body>
    <k-button variant="primary">Click me</k-button>

    <script type="module">
      import { setTheme } from '@kenikool/ui';

      // Toggle theme on button click
      document.querySelector('button').addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    </script>
  </body>
</html>
```

## Accessibility

All Kenikool UI components are built with accessibility as a core principle and comply with WCAG 2.1 Level AA standards:

- ✓ WCAG 2.1 Level AA compliance
- ✓ Full keyboard navigation support
- ✓ Proper ARIA attributes
- ✓ Visible focus indicators
- ✓ Screen reader support
- ✓ Respects `prefers-reduced-motion`
- ✓ Sufficient color contrast (4.5:1 minimum)

### Keyboard Navigation

All interactive components support full keyboard navigation:

| Key             | Action                                   |
| --------------- | ---------------------------------------- |
| **Tab**         | Navigate to next interactive element     |
| **Shift + Tab** | Navigate to previous interactive element |
| **Enter**       | Activate button or submit form           |
| **Space**       | Activate button                          |
| **Escape**      | Close modals or cancel operations        |

### ARIA Attributes

Components include proper ARIA attributes for screen reader support:

```html
<!-- Button with aria-label -->
<k-button aria-label="Submit form">Submit</k-button>

<!-- Button with aria-pressed for toggle state -->
<k-button aria-pressed="false">Toggle</k-button>

<!-- Input with error state -->
<k-input error aria-invalid="true" aria-describedby="error-msg"></k-input>
<div id="error-msg">This field is required</div>

<!-- Input with associated label -->
<label for="email-input">Email Address</label>
<k-input id="email-input" type="email" aria-label="Email address"></k-input>
```

### Focus Management

All components have visible focus indicators for keyboard users:

```css
/* Focus indicator styling (automatically applied) */
.k-button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.k-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### Color Contrast

All components meet WCAG AA color contrast requirements (4.5:1 minimum for text):

- **Primary Button**: Blue (#3b82f6) on white - 4.54:1 contrast
- **Secondary Button**: Gray (#6b7280) on white - 4.54:1 contrast
- **Danger Button**: Red (#ef4444) on white - 5.25:1 contrast

### Reduced Motion Support

Components automatically respect the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Users with motion sensitivity will see animations disabled automatically.

### Accessibility Best Practices

#### 1. Always Provide Labels

```html
<!-- Good: Label associated with input -->
<label for="username">Username</label>
<k-input id="username" aria-label="Username"></k-input>

<!-- Good: aria-label for icon-only buttons -->
<k-button aria-label="Close menu">×</k-button>

<!-- Avoid: No label or aria-label -->
<k-input placeholder="Username"></k-input>
```

#### 2. Use Semantic HTML

```html
<!-- Good: Semantic form structure -->
<form>
  <fieldset>
    <legend>Contact Information</legend>
    <label>
      Email
      <k-input type="email" required></k-input>
    </label>
  </fieldset>
</form>

<!-- Avoid: Non-semantic structure -->
<div>
  <div>Contact Information</div>
  <div>Email</div>
  <k-input type="email"></k-input>
</div>
```

#### 3. Provide Error Messages

```html
<!-- Good: Error message linked to input -->
<k-input
  id="password"
  type="password"
  error
  aria-invalid="true"
  aria-describedby="password-error"
></k-input>
<div id="password-error" role="alert">Password must be at least 8 characters</div>

<!-- Avoid: No error message -->
<k-input type="password" error></k-input>
```

#### 4. Use Proper Button Types

```html
<!-- Good: Semantic button types -->
<k-button type="submit">Submit Form</k-button>
<k-button type="reset">Clear Form</k-button>
<k-button type="button">Cancel</k-button>

<!-- Avoid: All buttons are type="button" -->
<k-button>Submit Form</k-button>
```

#### 5. Test with Screen Readers

Test your implementation with screen readers:

- **NVDA** (Windows) - Free and open source
- **JAWS** (Windows) - Commercial
- **VoiceOver** (macOS/iOS) - Built-in
- **TalkBack** (Android) - Built-in

### Accessibility Testing

Run automated accessibility checks:

```bash
# Install axe-core
npm install --save-dev @axe-core/react

# Run accessibility tests
npm run test:a11y
```

### Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Storybook Accessibility Addon](https://storybook.js.org/docs/react/writing-stories/accessibility-testing)

## Browser Support

Kenikool UI supports all modern browsers:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Bundle Size

- **Vanilla**: ~3.32KB (gzipped)
- **React**: ~48.32KB (gzipped)

## Customization & Extending Components

### Custom CSS Classes

Add custom styles to components using the `className` prop (React) or `class` attribute (Vanilla):

**Vanilla:**

```html
<k-button class="custom-shadow custom-hover">Custom Button</k-button>

<style>
  .custom-shadow {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  .custom-hover:hover {
    transform: translateY(-2px);
  }
</style>
```

**React:**

```tsx
<KButton className="custom-shadow custom-hover">Custom Button</KButton>

<style>
  .custom-shadow {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  .custom-hover:hover {
    transform: translateY(-2px);
  }
</style>
```

### Inline Styles

Apply inline styles without breaking component functionality:

**Vanilla:**

```html
<k-button style="border-radius: 20px; font-weight: bold;"> Rounded Button </k-button>
```

**React:**

```tsx
<KButton style={{ borderRadius: '20px', fontWeight: 'bold' }}>Rounded Button</KButton>
```

### CSS Specificity Overrides

Override component styles with higher CSS specificity:

```css
/* Component default */
.k-button--primary {
  background-color: var(--color-primary);
}

/* Your override (higher specificity) */
.my-custom-section .k-button--primary {
  background-color: #8b5cf6; /* Purple */
}
```

### Extending Components (React)

Create custom components by wrapping Kenikool components:

```tsx
import { KButton, KButtonProps } from '@kenikool/ui/react';

interface CustomButtonProps extends KButtonProps {
  loading?: boolean;
}

export function LoadingButton({ loading, children, ...props }: CustomButtonProps) {
  return (
    <KButton disabled={loading} {...props}>
      {loading ? 'Loading...' : children}
    </KButton>
  );
}

// Usage
<LoadingButton loading={isSubmitting}>Submit</LoadingButton>;
```

### Extending Components (Vanilla)

Extend Web Components by creating custom elements:

```javascript
class CustomButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const button = document.createElement('k-button');
    button.setAttribute('variant', this.getAttribute('variant') || 'primary');
    button.textContent = this.textContent;

    this.appendChild(button);
  }
}

customElements.define('custom-button', CustomButton);
```

Usage:

```html
<custom-button variant="primary">Custom Button</custom-button>
```

## Documentation

- [Storybook](https://kenikool-ui.vercel.app) - Interactive component documentation
- [Accessibility Guide](./packages/docs/stories/Accessibility.stories.mdx) - Accessibility features and guidelines
- [Cross-Browser Testing](./packages/docs/CROSS_BROWSER_TESTING.md) - Browser compatibility report

## Examples

### Form with Validation

**Vanilla:**

```html
<form id="contact-form">
  <div>
    <label for="email">Email</label>
    <k-input
      id="email"
      type="email"
      placeholder="your@email.com"
      aria-label="Email address"
      required
    ></k-input>
    <div id="email-error" role="alert" style="color: #ef4444; font-size: 0.875rem;"></div>
  </div>

  <div>
    <label for="message">Message</label>
    <textarea
      id="message"
      placeholder="Your message"
      required
      style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;"
    ></textarea>
  </div>

  <k-button type="submit" variant="primary">Send</k-button>
</form>

<script>
  const form = document.getElementById('contact-form');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate email
    if (!emailInput.value.includes('@')) {
      emailInput.setAttribute('error', '');
      emailError.textContent = 'Please enter a valid email address';
      return;
    }

    emailInput.removeAttribute('error');
    emailError.textContent = '';

    // Submit form
    console.log('Form submitted');
  });
</script>
```

**React:**

```tsx
import { useState } from 'react';
import { KInput, KButton } from '@kenikool/ui/react';

export function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');

    // Submit form
    console.log('Form submitted', { email, message });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <KInput
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          aria-label="Email address"
          aria-invalid={!!emailError}
          aria-describedby={emailError ? 'email-error' : undefined}
          required
        />
        {emailError && (
          <div id="email-error" role="alert" style={{ color: '#ef4444', fontSize: '0.875rem' }}>
            {emailError}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
          }}
        ></textarea>
      </div>

      <KButton type="submit" variant="primary">
        Send
      </KButton>
    </form>
  );
}
```

### Card Grid

**Vanilla:**

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
  <k-card padding="lg" shadow="md">
    <h3>Feature 1</h3>
    <p>Description of feature 1</p>
    <k-button variant="secondary" size="sm">Learn More</k-button>
  </k-card>

  <k-card padding="lg" shadow="md">
    <h3>Feature 2</h3>
    <p>Description of feature 2</p>
    <k-button variant="secondary" size="sm">Learn More</k-button>
  </k-card>

  <k-card padding="lg" shadow="md">
    <h3>Feature 3</h3>
    <p>Description of feature 3</p>
    <k-button variant="secondary" size="sm">Learn More</k-button>
  </k-card>
</div>
```

**React:**

```tsx
import { KCard, KButton } from '@kenikool/ui/react';

export function FeatureGrid() {
  const features = [
    { title: 'Feature 1', description: 'Description of feature 1' },
    { title: 'Feature 2', description: 'Description of feature 2' },
    { title: 'Feature 3', description: 'Description of feature 3' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
      }}
    >
      {features.map((feature) => (
        <KCard key={feature.title} padding="lg" shadow="md">
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
          <KButton variant="secondary" size="sm">
            Learn More
          </KButton>
        </KCard>
      ))}
    </div>
  );
}
```

### Button Variants Showcase

**Vanilla:**

```html
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <!-- Primary variants -->
  <k-button variant="primary" size="sm">Small</k-button>
  <k-button variant="primary" size="md">Medium</k-button>
  <k-button variant="primary" size="lg">Large</k-button>

  <!-- Secondary variants -->
  <k-button variant="secondary" size="md">Secondary</k-button>

  <!-- Danger variants -->
  <k-button variant="danger" size="md">Delete</k-button>

  <!-- Disabled state -->
  <k-button variant="primary" disabled>Disabled</k-button>

  <!-- With animation -->
  <k-button variant="primary" animation="pulse">Pulse</k-button>
</div>
```

**React:**

```tsx
import { KButton } from '@kenikool/ui/react';

export function ButtonShowcase() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {/* Primary variants */}
      <KButton variant="primary" size="sm">
        Small
      </KButton>
      <KButton variant="primary" size="md">
        Medium
      </KButton>
      <KButton variant="primary" size="lg">
        Large
      </KButton>

      {/* Secondary variants */}
      <KButton variant="secondary" size="md">
        Secondary
      </KButton>

      {/* Danger variants */}
      <KButton variant="danger" size="md">
        Delete
      </KButton>

      {/* Disabled state */}
      <KButton variant="primary" disabled>
        Disabled
      </KButton>

      {/* With animation */}
      <KButton variant="primary" animation="pulse">
        Pulse
      </KButton>
    </div>
  );
}
```

### Input States

**Vanilla:**

```html
<div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
  <!-- Normal state -->
  <div>
    <label for="input-normal">Normal</label>
    <k-input id="input-normal" placeholder="Enter text"></k-input>
  </div>

  <!-- Focus state -->
  <div>
    <label for="input-focus">Focus (click to see)</label>
    <k-input id="input-focus" placeholder="Click to focus"></k-input>
  </div>

  <!-- Error state -->
  <div>
    <label for="input-error">Error</label>
    <k-input id="input-error" error placeholder="Error state"></k-input>
    <div style="color: #ef4444; font-size: 0.875rem;">This field is required</div>
  </div>

  <!-- Disabled state -->
  <div>
    <label for="input-disabled">Disabled</label>
    <k-input id="input-disabled" disabled placeholder="Disabled"></k-input>
  </div>
</div>
```

**React:**

```tsx
import { useState } from 'react';
import { KInput } from '@kenikool/ui/react';

export function InputStates() {
  const [focusedId, setFocusedId] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
      {/* Normal state */}
      <div>
        <label htmlFor="input-normal">Normal</label>
        <KInput id="input-normal" placeholder="Enter text" />
      </div>

      {/* Focus state */}
      <div>
        <label htmlFor="input-focus">Focus (click to see)</label>
        <KInput
          id="input-focus"
          placeholder="Click to focus"
          onFocus={() => setFocusedId('input-focus')}
          onBlur={() => setFocusedId('')}
        />
      </div>

      {/* Error state */}
      <div>
        <label htmlFor="input-error">Error</label>
        <KInput id="input-error" error placeholder="Error state" />
        <div style={{ color: '#ef4444', fontSize: '0.875rem' }}>This field is required</div>
      </div>

      {/* Disabled state */}
      <div>
        <label htmlFor="input-disabled">Disabled</label>
        <KInput id="input-disabled" disabled placeholder="Disabled" />
      </div>
    </div>
  );
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

## License

MIT © 2024 Kenikool

## Support

- 📖 [Documentation](https://kenikool-ui.vercel.app)
- 🐛 [Report Issues](https://github.com/kenikool/kenikool-ui/issues)
- 💬 [Discussions](https://github.com/kenikool/kenikool-ui/discussions)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a list of changes in each release.
"# Kenikool-ui" 
