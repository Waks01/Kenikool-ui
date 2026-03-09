# Cross-Browser Testing Guide - Kenikool UI

## Overview

This guide provides instructions for testing Kenikool UI components across different browsers. It covers manual testing procedures, automated testing setup, and troubleshooting common issues.

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Modern browsers (Chrome, Firefox, Safari, Edge)

### Running Tests Locally

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run property-based tests
npm run test:property

# Run accessibility tests
npm run test:a11y
```

## Manual Testing Procedures

### 1. CSS Variables Testing

#### Test Procedure

1. Open Storybook: `npm run storybook`
2. Navigate to any component story
3. Open browser DevTools (F12)
4. In the Console, run:

```javascript
// Check if CSS variables are defined
const styles = getComputedStyle(document.documentElement);
console.log('Primary Color:', styles.getPropertyValue('--color-primary'));
console.log('Secondary Color:', styles.getPropertyValue('--color-secondary'));
console.log('Danger Color:', styles.getPropertyValue('--color-danger'));
```

5. Verify that all color variables are defined
6. Test theme switching using the Storybook theme switcher
7. Verify that colors change when theme is switched

#### Expected Results

- All CSS variables are defined on the root element
- Colors change when theme is switched
- No console errors

#### Browser-Specific Notes

- **Chrome**: CSS variables display correctly in DevTools
- **Firefox**: CSS variables display correctly in DevTools
- **Safari**: CSS variables display correctly in DevTools
- **Edge**: CSS variables display correctly in DevTools

### 2. Web Components Testing

#### Test Procedure

1. Open Storybook: `npm run storybook`
2. Navigate to Button story
3. Open browser DevTools (F12)
4. In the Console, run:

```javascript
// Check if custom element is registered
console.log('k-button registered:', customElements.get('k-button'));

// Check Shadow DOM
const button = document.querySelector('k-button');
console.log('Shadow DOM:', button.shadowRoot);

// Check slot content
const slot = button.shadowRoot.querySelector('slot');
console.log('Slot:', slot);
```

5. Verify that custom element is registered
6. Verify that Shadow DOM is attached
7. Verify that slot content is rendered
8. Test attribute changes:

```javascript
// Test attribute changes
const button = document.querySelector('k-button');
button.setAttribute('variant', 'danger');
button.setAttribute('size', 'lg');
button.setAttribute('animation', 'pulse');
```

9. Verify that component updates when attributes change

#### Expected Results

- Custom element is registered
- Shadow DOM is attached
- Slot content is rendered
- Component updates when attributes change
- No console errors

#### Browser-Specific Notes

- **Chrome**: Full Web Components support
- **Firefox**: Full Web Components support
- **Safari**: Full Web Components support
- **Edge**: Full Web Components support

### 3. Animation Testing

#### Test Procedure

1. Open Storybook: `npm run storybook`
2. Navigate to Button story
3. Select different animation types from the controls
4. Observe animations rendering smoothly
5. Open DevTools Performance tab (F12 → Performance)
6. Record animation performance:

```javascript
// Record animation performance
const button = document.querySelector('k-button');
button.setAttribute('animation', 'pulse');

// Start recording in DevTools Performance tab
// Let animation run for 2-3 seconds
// Stop recording and check FPS
```

7. Verify that animations maintain 60fps
8. Test prefers-reduced-motion:

```javascript
// Test prefers-reduced-motion
// In DevTools, go to Rendering tab
// Check "Emulate CSS media feature prefers-reduced-motion"
// Verify that animations are disabled
```

#### Expected Results

- All animations render smoothly
- Animations maintain 60fps
- prefers-reduced-motion is respected
- No jank or stuttering observed

#### Browser-Specific Notes

- **Chrome**: Smooth animations, excellent DevTools
- **Firefox**: Smooth animations, good DevTools
- **Safari**: Smooth animations, good performance
- **Edge**: Smooth animations, good performance

### 4. Accessibility Testing

#### Test Procedure

1. Open Storybook: `npm run storybook`
2. Navigate to Button story
3. Test keyboard navigation:

```
- Press Tab to focus button
- Press Enter to click button
- Press Space to click button
- Verify button responds to keyboard input
```

4. Test focus indicator:

```
- Press Tab to focus button
- Verify focus indicator is visible
- Verify focus indicator has sufficient contrast
```

5. Test ARIA attributes:

```javascript
// Check ARIA attributes
const button = document.querySelector('k-button');
const innerButton = button.shadowRoot.querySelector('button');
console.log('role:', innerButton.getAttribute('role'));
console.log('aria-disabled:', innerButton.getAttribute('aria-disabled'));
console.log('aria-label:', innerButton.getAttribute('aria-label'));
```

6. Test with screen reader:

```
- Enable screen reader (NVDA on Windows, JAWS, VoiceOver on Mac)
- Navigate to button using screen reader
- Verify button is announced correctly
- Verify button state is announced (enabled/disabled)
```

#### Expected Results

- Keyboard navigation works correctly
- Focus indicator is visible
- ARIA attributes are present and correct
- Screen reader announces button correctly
- No accessibility violations

#### Browser-Specific Notes

- **Chrome**: Good accessibility support
- **Firefox**: Good accessibility support
- **Safari**: Good accessibility support
- **Edge**: Good accessibility support

### 5. Theme Switching Testing

#### Test Procedure

1. Open Storybook: `npm run storybook`
2. Use the theme switcher in Storybook header
3. Switch between light and dark modes
4. Verify all components update correctly
5. Test programmatic theme switching:

```javascript
// Test programmatic theme switching
import { setTheme, getTheme } from '@kenikool/core';

// Get current theme
console.log('Current theme:', getTheme());

// Set theme to dark
setTheme('dark');
console.log('Theme after setTheme("dark"):', getTheme());

// Set theme to light
setTheme('light');
console.log('Theme after setTheme("light"):', getTheme());

// Set theme to auto
setTheme('auto');
console.log('Theme after setTheme("auto"):', getTheme());
```

6. Verify theme changes without page reload
7. Verify all components update when theme changes

#### Expected Results

- Theme switcher works correctly
- All components update when theme changes
- Programmatic theme switching works
- Theme changes without page reload
- No console errors

#### Browser-Specific Notes

- **Chrome**: Theme switching works smoothly
- **Firefox**: Theme switching works smoothly
- **Safari**: Theme switching works smoothly
- **Edge**: Theme switching works smoothly

## Automated Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run property-based tests
npm run test:property

# Run accessibility tests
npm run test:a11y
```

### Test Files

- `packages/vanilla/src/components/button.test.ts` - Button component tests
- `packages/vanilla/src/components/k-input.test.ts` - Input component tests
- `packages/vanilla/src/components/card.test.ts` - Card component tests
- `packages/vanilla/src/components/accessibility.test.ts` - Accessibility tests
- `packages/vanilla/src/components/animations.performance.test.ts` - Performance tests
- `packages/react/src/components/__tests__/Button.test.tsx` - React Button tests
- `packages/react/src/components/__tests__/Input.test.tsx` - React Input tests
- `packages/react/src/components/__tests__/Card.test.tsx` - React Card tests
- `packages/react/src/components/__tests__/accessibility.test.tsx` - React accessibility tests
- `packages/react/src/animations/variants.test.ts` - Animation variants tests
- `packages/docs/accessibility.test.ts` - Storybook accessibility tests

### Test Coverage

```bash
# Run tests with coverage report
npm run test:coverage

# View coverage report
open coverage/index.html
```

### Accessibility Testing

```bash
# Run accessibility tests
npm run test:a11y

# Run accessibility tests with axe-core
npm test -- --grep "accessibility"
```

## Browser-Specific Testing

### Chrome/Chromium

#### Setup

1. Install Chrome or Chromium
2. Open DevTools (F12)
3. Go to Settings → Experiments
4. Enable "Protocol Monitor"

#### Testing Steps

1. Open Storybook: `npm run storybook`
2. Test CSS variables in Console
3. Test Web Components in Console
4. Test animations in Performance tab
5. Test accessibility with Lighthouse

#### DevTools Features

- Excellent CSS variable inspection
- Good Web Components debugging
- Excellent performance profiling
- Good accessibility auditing

### Firefox

#### Setup

1. Install Firefox
2. Open DevTools (F12)
3. Go to Settings → Advanced

#### Testing Steps

1. Open Storybook: `npm run storybook`
2. Test CSS variables in Console
3. Test Web Components in Console
4. Test animations in Performance tab
5. Test accessibility with Inspector

#### DevTools Features

- Good CSS variable inspection
- Good Web Components debugging
- Good performance profiling
- Good accessibility support

### Safari

#### Setup

1. Install Safari (macOS only)
2. Enable Developer Menu (Safari → Preferences → Advanced)
3. Open Web Inspector (Cmd+Option+I)

#### Testing Steps

1. Open Storybook: `npm run storybook`
2. Test CSS variables in Console
3. Test Web Components in Console
4. Test animations in Timeline
5. Test accessibility with Inspector

#### DevTools Features

- Good CSS variable inspection
- Good Web Components debugging
- Good performance profiling
- Good accessibility support

### Edge

#### Setup

1. Install Edge
2. Open DevTools (F12)
3. Go to Settings → Experiments

#### Testing Steps

1. Open Storybook: `npm run storybook`
2. Test CSS variables in Console
3. Test Web Components in Console
4. Test animations in Performance tab
5. Test accessibility with Lighthouse

#### DevTools Features

- Excellent CSS variable inspection (Chromium-based)
- Good Web Components debugging
- Excellent performance profiling
- Good accessibility auditing

## Troubleshooting

### CSS Variables Not Working

**Symptoms:**

- Colors not changing
- Theme switching not working
- CSS variables showing as undefined

**Solutions:**

1. Check if CSS variables are defined:

```javascript
const styles = getComputedStyle(document.documentElement);
console.log(styles.getPropertyValue('--color-primary'));
```

2. Check if tailwind.css is imported:

```javascript
// In your HTML or main.ts
import 'tailwind.css';
```

3. Check browser console for errors
4. Clear browser cache and reload

### Web Components Not Rendering

**Symptoms:**

- Custom elements not appearing
- Shadow DOM not attached
- Slot content not rendering

**Solutions:**

1. Check if custom element is registered:

```javascript
console.log(customElements.get('k-button'));
```

2. Check browser console for errors
3. Verify custom element tag name is correct
4. Check if Shadow DOM is supported in browser

### Animations Not Smooth

**Symptoms:**

- Animations stuttering
- Animations not running
- Low FPS

**Solutions:**

1. Check if animations are using GPU-accelerated properties:

```css
/* Good */
transform: translateX(10px);
opacity: 0.5;

/* Bad */
left: 10px;
width: 100px;
```

2. Check if prefers-reduced-motion is enabled
3. Check browser performance in DevTools
4. Reduce animation complexity

### Accessibility Issues

**Symptoms:**

- Screen reader not announcing elements
- Keyboard navigation not working
- Focus indicator not visible

**Solutions:**

1. Check if ARIA attributes are present:

```javascript
const button = document.querySelector('k-button');
const innerButton = button.shadowRoot.querySelector('button');
console.log(innerButton.getAttribute('role'));
console.log(innerButton.getAttribute('aria-disabled'));
```

2. Check if focus indicator is visible
3. Test with screen reader
4. Run axe-core accessibility audit

## Performance Testing

### Animation Performance

```bash
# Run performance tests
npm test -- --grep "performance"
```

### Bundle Size

```bash
# Check bundle size
npm run build

# Analyze bundle
npm run build -- --analyze
```

### Rendering Performance

1. Open DevTools Performance tab
2. Record page load and interactions
3. Check for long tasks
4. Check for layout thrashing
5. Verify 60fps animations

## Continuous Integration

### GitHub Actions

The project includes GitHub Actions workflows for:

1. Running tests on every push
2. Checking bundle size
3. Running accessibility tests
4. Building Storybook

### Local CI Simulation

```bash
# Run all checks locally
npm run lint
npm run test
npm run test:coverage
npm run test:a11y
npm run build
```

## Resources

- [MDN: Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [MDN: CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [MDN: CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Vitest Documentation](https://vitest.dev/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)

## Conclusion

This guide provides comprehensive instructions for testing Kenikool UI components across different browsers. By following these procedures, you can ensure that components work correctly and consistently across all supported browsers.
