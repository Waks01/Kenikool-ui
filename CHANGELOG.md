# Changelog

All notable changes to Kenikool UI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-01-XX

### Added

#### Core Features

- Initial release of Kenikool UI component library
- Dual-framework support for vanilla JavaScript and React
- Three core components: Button, Input, and Card
- Comprehensive theme system with CSS variables
- Light/dark mode support with automatic system preference detection
- 10 animation types: pulse, bounce, fade, scale, shake, glow, slide, rotate, flip, none

#### Button Component

- Vanilla Web Component (`<k-button>`)
- React component (`<KButton>`)
- Three variants: primary, secondary, danger
- Three sizes: sm, md, lg
- Full keyboard navigation support (Tab, Enter, Space)
- ARIA attributes for accessibility (role, aria-label, aria-pressed, aria-disabled)
- Visible focus indicators
- Support for all HTML button attributes
- Animation support with all 10 animation types
- Disabled state with proper styling and interaction prevention

#### Input Component

- Vanilla Web Component (`<k-input>`)
- React component (`<KInput>`)
- Three sizes: sm, md, lg
- Focus styling with border color change and shadow effect
- Error state with red border and error text color
- Disabled state with reduced opacity and cursor not-allowed
- Placeholder support
- Change event emission on value changes
- Support for all HTML input attributes
- Controlled and uncontrolled component support (React)
- ARIA attributes for accessibility (aria-label, aria-invalid, aria-describedby)

#### Card Component

- Vanilla Web Component (`<k-card>`)
- React component (`<KCard>`)
- Three padding variants: sm (12px), md (16px), lg (24px)
- Four shadow variants: sm, md, lg, none
- Dark mode styling with automatic color adaptation
- Slot-based content insertion (vanilla)
- Children prop support (React)
- Support for all HTML div attributes
- Semantic HTML structure

#### Theme System

- CSS variable-based theming
- Primary, secondary, and danger color tokens
- Spacing tokens (xs, sm, md, lg, xl)
- Font size tokens (xs, sm, md, lg)
- Animation duration tokens (fast, normal, slow)
- Light/dark mode support with `prefers-color-scheme` media query
- Manual theme switching with `data-theme` attribute
- Programmatic theme control with `setTheme()` and `getTheme()` functions
- Theme change event dispatching for component reactivity

#### Animations

- 10 CSS animation types with GPU acceleration
- All animations use transform and opacity for performance
- Smooth 60fps animations on modern devices
- `prefers-reduced-motion` support for accessibility
- Animation timing: fast (150ms), normal (300ms), slow (500ms)
- Easing functions: ease-in-out, ease-out, linear

#### Accessibility

- WCAG 2.1 Level AA compliance
- Full keyboard navigation support
- Proper ARIA attributes on all components
- Visible focus indicators with 2px outline
- Color contrast compliance (4.5:1 minimum for normal text)
- Screen reader support
- `prefers-reduced-motion` media query support
- Semantic HTML structure
- 38 automated accessibility tests with axe-core

#### Documentation

- Interactive Storybook with all components and variants
- Code examples for vanilla JavaScript and React
- Accessibility guidelines and best practices
- Cross-browser testing report
- Theme customization guide
- Animation usage examples
- Comprehensive README with quick start guides
- CHANGELOG documentation

#### Storybook Features

- Interactive controls for all component props
- Code examples embedded in stories
- Accessibility documentation
- Custom theme switcher addon for light/dark mode preview
- Theme persistence across stories
- Automatic documentation generation

#### Testing

- 59 unit tests for vanilla Button component
- 76 unit tests for vanilla Input component
- 47 unit tests for vanilla Card component
- 38 accessibility tests with axe-core
- 31 performance tests for animations
- 40 unit tests for core utilities
- 11 unit tests for theme system
- 16 unit tests for animations
- 100% test coverage for vanilla components
- All tests passing with vitest

#### Performance

- Vanilla bundle size: ~50KB (gzipped)
- React bundle size: ~75KB (gzipped)
- GPU-accelerated animations using transform and opacity
- Tree-shakeable ES modules
- CSS purging with Tailwind CSS v4
- Minimal JavaScript footprint

#### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Full CSS variable support
- Full Web Components support
- Full CSS animation support

#### Developer Experience

- Full TypeScript support with strict mode
- Type definitions for all components
- JSDoc/TSDoc comments on all exports
- ESLint and Prettier configuration
- Pre-commit hooks with husky
- Monorepo structure with pnpm workspaces
- Hot Module Replacement (HMR) for development
- Vite build tool for fast development and production builds

#### Build & Distribution

- Dual entry points for vanilla and React
- CSS entry point for standalone styling
- CommonJS and ES module exports
- TypeScript type definitions included
- Source maps for debugging
- Minified production builds
- GitHub Actions CI/CD pipeline

### Documentation Files

- `README.md` - Installation, quick start, and usage guide
- `CHANGELOG.md` - Version history and changes
- `packages/vanilla/ACCESSIBILITY.md` - Accessibility features documentation
- `packages/docs/stories/Accessibility.stories.mdx` - Storybook accessibility guide
- `packages/docs/CROSS_BROWSER_TESTING.md` - Browser compatibility report

### Configuration Files

- `package.json` - Root package with workspace configuration
- `tsconfig.base.json` - Base TypeScript configuration
- `tailwind.css` - Tailwind CSS v4 configuration with theme tokens
- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `vitest.config.ts` - Vitest test runner configuration

### Known Limitations

- React components require React 16.8+ for hooks support
- Tailwind CSS v4+ is required as a peer dependency
- CSS variables require modern browser support (IE 11 not supported)
- Web Components require custom element support (IE 11 not supported)

### Migration Guide

This is the initial release, so no migration is needed.

### Future Roadmap

- Phase 2: Additional components (Badge, Dropdown, Modal, Toast)
- Phase 3: Advanced features (form validation, date picker, etc.)
- Phase 4: Theming system enhancements
- Phase 5: Community contributions and plugins

### Contributors

- Kenikool Team

### Support

- 📖 [Documentation](https://kenikool-ui.vercel.app)
- 🐛 [Report Issues](https://github.com/kenikool/kenikool-ui/issues)
- 💬 [Discussions](https://github.com/kenikool/kenikool-ui/discussions)

---

## Versioning

Kenikool UI follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality in a backwards-compatible manner
- **PATCH** version for backwards-compatible bug fixes

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md` with changes
3. Create git tag: `git tag v0.1.0`
4. Push to GitHub: `git push origin main --tags`
5. Publish to npm: `npm publish`
6. Create GitHub release with release notes
