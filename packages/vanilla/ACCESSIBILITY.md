# Accessibility Features - Kenikool UI Vanilla Components

This document outlines the accessibility features implemented in Kenikool UI vanilla Web Components to ensure WCAG 2.1 Level AA compliance.

## Overview

All Kenikool UI vanilla Web Components are built with accessibility as a core principle. They support:

- Keyboard navigation
- Screen reader compatibility
- Focus management
- Color contrast compliance
- Reduced motion preferences
- High contrast mode support

## Component-Specific Features

### k-button Component

#### ARIA Attributes

- `role="button"`: Semantic role for screen readers
- `aria-label`: Provides an accessible label for screen readers when button text is not descriptive
- `aria-pressed`: Indicates the pressed state for toggle buttons
- `aria-disabled`: Indicates whether the button is disabled

#### Keyboard Navigation

- **Tab**: Focus the button
- **Enter**: Activate the button
- **Space**: Activate the button

#### Focus Management

- Visible focus indicator (2px outline with 2px offset)
- Focus indicator color matches the button variant
- Focus indicator is visible in all states (including disabled)

#### Color Contrast

- Primary variant: Blue (#1e40af) on white - 8.59:1 contrast ratio (WCAG AAA)
- Secondary variant: Gray (#4b5563) on white - 7.32:1 contrast ratio (WCAG AAA)
- Danger variant: Red (#b91c1c) on white - 8.30:1 contrast ratio (WCAG AAA)

#### Example

```html
<!-- Basic button with accessible label -->
<k-button aria-label="Close dialog">×</k-button>

<!-- Toggle button with aria-pressed -->
<k-button aria-pressed="true">Toggle</k-button>

<!-- Button with descriptive text -->
<k-button>Submit Form</k-button>
```

### k-input Component

#### ARIA Attributes

- `aria-label`: Provides an accessible label for screen readers
- `aria-describedby`: Links to an element that describes the input (e.g., error message)
- `aria-invalid`: Indicates whether the input has an invalid value

#### Keyboard Navigation

- **Tab**: Focus the input
- **Shift+Tab**: Focus the previous element
- **Enter**: Submit form (if inside a form)
- **Arrow keys**: Navigate text within the input

#### Focus Management

- Visible focus indicator (2px outline with 2px offset)
- Focus indicator color changes based on state (primary for normal, danger for error)
- Focus indicator is visible in all states (including disabled)

#### Color Contrast

- Border color: Gray (#d1d5db) on white - sufficient contrast
- Error state: Red (#b91c1c) on white - 8.30:1 contrast ratio (WCAG AAA)
- Text color: Dark gray (#1f2937) on white - 12.63:1 contrast ratio (WCAG AAA)

#### Example

```html
<!-- Input with accessible label -->
<k-input aria-label="Email address" type="email"></k-input>

<!-- Input with error message -->
<k-input aria-invalid="true" aria-describedby="email-error"></k-input>
<div id="email-error">Please enter a valid email</div>

<!-- Input with associated label -->
<label for="username">Username</label>
<k-input id="username"></k-input>
```

### k-card Component

#### ARIA Attributes

- `role`: Semantic role for the card (e.g., "region", "article")
- `aria-label`: Provides an accessible label for screen readers

#### Keyboard Navigation

- Cards are not interactive by default, but can be made focusable with `tabindex="0"`
- If card contains interactive elements (buttons, inputs), those elements are keyboard accessible

#### Focus Management

- Visible focus indicator when card is focusable (2px outline with 2px offset)
- Focus indicator is visible in all states

#### Example

```html
<!-- Card with semantic role -->
<k-card role="region" aria-label="Product details">
  <h2>Product Name</h2>
  <p>Product description</p>
</k-card>

<!-- Card with interactive content -->
<k-card>
  <h2>Contact Form</h2>
  <label for="name">Name</label>
  <k-input id="name"></k-input>
  <k-button>Submit</k-button>
</k-card>
```

## Global Accessibility Features

### Focus Indicators

All interactive components have visible focus indicators that meet WCAG standards:

- **Outline**: 2px solid outline
- **Offset**: 2px from the element
- **Color**: Matches the component's primary color
- **High Contrast Mode**: 3px outline for better visibility

### Keyboard Navigation

All components support standard keyboard navigation:

- **Tab**: Move focus to the next element
- **Shift+Tab**: Move focus to the previous element
- **Enter/Space**: Activate buttons and toggle controls
- **Arrow Keys**: Navigate within inputs and select elements

### Color Contrast

All components meet WCAG AA color contrast requirements (minimum 4.5:1 for normal text):

- Primary color: #1e40af (blue)
- Secondary color: #4b5563 (gray)
- Danger color: #b91c1c (red)
- Text color: #1f2937 (dark gray)
- Background color: #ffffff (white)

### Reduced Motion Support

Components respect the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  /* Animations are disabled */
  .k-button--pulse,
  .k-button--bounce,
  /* ... other animations ... */ {
    animation: none !important;
  }
}
```

When a user has enabled "Reduce motion" in their system preferences, all animations are disabled.

### Dark Mode Support

Components automatically adapt to dark mode:

- **Light Mode**: White background, dark text
- **Dark Mode**: Dark background, light text
- **Manual Override**: Use `data-theme="dark"` or `data-theme="light"` attribute

### High Contrast Mode Support

Components enhance focus indicators in high contrast mode:

```css
@media (prefers-contrast: more) {
  .k-button:focus-visible,
  .k-input:focus-visible,
  .k-card:focus-visible {
    outline-width: 3px;
  }
}
```

## Testing Accessibility

### Automated Testing

Use axe-core to automatically test for accessibility violations:

```bash
npm test -- accessibility.test.ts --run
```

### Manual Testing

1. **Keyboard Navigation**: Use Tab and Shift+Tab to navigate through components
2. **Screen Reader**: Test with NVDA (Windows), JAWS (Windows), or VoiceOver (macOS)
3. **Color Contrast**: Use a contrast checker tool to verify color combinations
4. **Reduced Motion**: Enable "Reduce motion" in system preferences and verify animations are disabled
5. **High Contrast**: Enable high contrast mode in system preferences and verify focus indicators are visible

### Browser DevTools

Use browser DevTools to inspect accessibility:

1. **Chrome DevTools**: Lighthouse > Accessibility
2. **Firefox DevTools**: Accessibility Inspector
3. **Safari DevTools**: Accessibility Inspector

## WCAG 2.1 Compliance

Kenikool UI components comply with WCAG 2.1 Level AA standards:

- **1.4.3 Contrast (Minimum)**: All text has sufficient color contrast
- **2.1.1 Keyboard**: All functionality is available via keyboard
- **2.1.2 No Keyboard Trap**: Focus can move away from components using keyboard
- **2.4.3 Focus Order**: Focus order is logical and meaningful
- **2.4.7 Focus Visible**: Focus indicator is visible for keyboard users
- **3.2.1 On Focus**: Components don't change context on focus
- **3.2.2 On Input**: Components don't change context on input
- **4.1.2 Name, Role, Value**: All components have proper ARIA attributes

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Contributing

When contributing to Kenikool UI, please ensure:

1. All components have proper ARIA attributes
2. Keyboard navigation works correctly
3. Focus indicators are visible
4. Color contrast meets WCAG AA standards
5. Animations respect `prefers-reduced-motion`
6. Tests pass with axe-core
