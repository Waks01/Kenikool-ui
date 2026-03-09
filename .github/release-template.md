# Kenikool UI v0.1.0

🎉 **Initial Release of Kenikool UI**

Kenikool UI is a dual-framework component library that solves "Tailwind fatigue" by providing pre-built, production-ready UI components for both vanilla JavaScript and React applications.

## 🚀 What's New

### Core Components

- **Button** - Customizable button with variants, sizes, and animations
- **Input** - Flexible input component with multiple states
- **Card** - Versatile card component with padding and shadow variants

### Features

- ✨ Dual-framework support (vanilla JS + React)
- 🎨 Comprehensive theming with CSS variables
- 🎭 10 animation types with GPU acceleration
- ♿ WCAG 2.1 Level AA accessibility compliance
- ⚡ Minimal bundle size (~50KB vanilla, ~75KB React)
- 📚 Interactive Storybook documentation
- 🧪 Comprehensive test coverage

### Animations

- pulse - Continuous pulsing effect
- bounce - Bouncing effect on hover
- fade - Fade-in effect on mount
- scale - Scale transformation on hover
- shake - Shake effect on interaction
- glow - Glowing effect animation
- slide - Slide effect on mount
- rotate - Rotation animation
- flip - Flip animation
- none - No animation (default)

### Accessibility

- Full keyboard navigation support
- Proper ARIA attributes
- Visible focus indicators
- Color contrast compliance (4.5:1 minimum)
- Screen reader support
- Respects `prefers-reduced-motion`

## 📦 Installation

```bash
npm install @kenikool/ui
```

## 🚀 Quick Start

### Vanilla JavaScript

```html
<k-button variant="primary">Click me</k-button>
<script type="module">
  import '@kenikool/ui/vanilla';
</script>
```

### React

```tsx
import { KButton } from '@kenikool/ui/react';

export function App() {
  return <KButton variant="primary">Click me</KButton>;
}
```

## 📚 Documentation

- [Storybook](https://kenikool-ui.vercel.app) - Interactive component documentation
- [README](https://github.com/kenikool/kenikool-ui#readme) - Installation and usage guide
- [Accessibility Guide](https://github.com/kenikool/kenikool-ui/blob/main/packages/docs/stories/Accessibility.stories.mdx) - Accessibility features

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📊 Test Coverage

- 59 unit tests for Button component
- 76 unit tests for Input component
- 47 unit tests for Card component
- 38 accessibility tests with axe-core
- 31 performance tests for animations
- 100% test coverage for vanilla components

## 🎯 What's Included

### Vanilla Components

- `<k-button>` - Web Component button
- `<k-input>` - Web Component input
- `<k-card>` - Web Component card

### React Components

- `<KButton>` - React button component
- `<KInput>` - React input component
- `<KCard>` - React card component

### Theme System

- CSS variable-based theming
- Light/dark mode support
- Customizable colors, spacing, and fonts
- Programmatic theme control

### Storybook

- Interactive component explorer
- Code examples for vanilla and React
- Accessibility documentation
- Theme switcher addon

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/@kenikool/ui)
- [GitHub Repository](https://github.com/kenikool/kenikool-ui)
- [Storybook](https://kenikool-ui.vercel.app)
- [Issues](https://github.com/kenikool/kenikool-ui/issues)

## 📝 Changelog

See [CHANGELOG.md](https://github.com/kenikool/kenikool-ui/blob/main/CHANGELOG.md) for detailed changes.

## 🙏 Thanks

Thanks to everyone who contributed to this release!

## 📄 License

MIT © 2024 Kenikool

---

**Ready to get started?** Check out the [README](https://github.com/kenikool/kenikool-ui#readme) for installation and usage instructions.
