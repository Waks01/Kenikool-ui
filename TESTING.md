# Testing Configuration - Kenikool UI

This document describes the testing setup for the Kenikool UI component library using Vitest and fast-check.

## Overview

The testing infrastructure is configured with:

- **Vitest**: Fast unit test runner with jsdom environment for DOM testing
- **fast-check**: Property-based testing library for generating test cases
- **@vitest/ui**: Interactive UI for test visualization
- **@vitest/coverage-v8**: Code coverage reporting with 80% minimum thresholds

## Configuration Files

### Root Configuration

- `vitest.config.ts` - Main Vitest configuration with shared settings
- `vitest.setup.ts` - Global test setup and mocks

### Package-Level Configurations

- `packages/core/vitest.config.ts` - Core package test configuration
- `packages/vanilla/vitest.config.ts` - Vanilla components test configuration
- `packages/react/vitest.config.ts` - React components test configuration

## Running Tests

### From Root Directory

```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Run only property-based tests
npm run test:property
```

### From Package Directory

```bash
# Run tests for a specific package
cd packages/core
npm run test

# Run property-based tests only
npm run test:property
```

## Test File Patterns

Tests are discovered using the following patterns:

- `**/*.test.ts` - Unit tests (TypeScript)
- `**/*.test.tsx` - Unit tests (React/TSX)
- `**/*.property.test.ts` - Property-based tests (TypeScript)
- `**/*.property.test.tsx` - Property-based tests (React/TSX)

## Environment Configuration

### jsdom Environment

All tests run in a jsdom environment, which provides:

- DOM API simulation
- Window and document objects
- Event handling
- CSS parsing (basic)

### Global Test Utilities

The following are available globally in all tests:

- `describe`, `it`, `test` - Test definition
- `expect` - Assertions
- `beforeEach`, `afterEach` - Hooks
- `vi` - Vitest utilities for mocking

## Coverage Thresholds

All packages enforce **80% minimum coverage** across:

- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 80%
- **Statements**: 80%

Coverage reports are generated in:

- `coverage/` - HTML report
- `coverage/coverage-final.json` - JSON report
- `coverage/lcov.info` - LCOV format

## Writing Tests

### Unit Tests

```typescript
// src/components/__tests__/button.test.ts
import { describe, it, expect } from 'vitest';
import { KButton } from '../Button';

describe('KButton', () => {
  it('renders with primary variant', () => {
    const button = document.createElement('k-button');
    button.setAttribute('variant', 'primary');
    document.body.appendChild(button);

    expect(button).toBeTruthy();
  });
});
```

### Property-Based Tests

```typescript
// src/components/__tests__/button.property.test.ts
import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { KButton } from '../Button';

describe('KButton - Property Tests', () => {
  it('Property 1: Button Variant Styling', () => {
    fc.assert(
      fc.property(fc.constantFrom('primary', 'secondary', 'danger'), (variant) => {
        const button = document.createElement('k-button');
        button.setAttribute('variant', variant);
        document.body.appendChild(button);

        const classes = button.shadowRoot?.querySelector('button')?.className;
        expect(classes).toContain(`k-button--${variant}`);
      })
    );
  });
});
```

## Fast-Check Generators

Common generators for property-based testing:

```typescript
import fc from 'fast-check';

// Variants
fc.constantFrom('primary', 'secondary', 'danger');

// Sizes
fc.constantFrom('sm', 'md', 'lg');

// Animations
fc.constantFrom(
  'pulse',
  'bounce',
  'fade',
  'scale',
  'shake',
  'glow',
  'slide',
  'rotate',
  'flip',
  'none'
);

// Strings
fc.string();

// Numbers
fc.integer({ min: 0, max: 100 });

// Booleans
fc.boolean();

// Arrays
fc.array(fc.string());

// Objects
fc.record({
  variant: fc.constantFrom('primary', 'secondary', 'danger'),
  size: fc.constantFrom('sm', 'md', 'lg'),
});
```

## Mocked APIs

The following browser APIs are mocked in `vitest.setup.ts`:

### window.matchMedia

Used for theme testing (light/dark mode):

```typescript
window.matchMedia('(prefers-color-scheme: dark)');
```

### IntersectionObserver

Mocked for components that use intersection detection.

### ResizeObserver

Mocked for components that respond to size changes.

## Debugging Tests

### Run Single Test File

```bash
npm run test -- src/components/__tests__/button.test.ts
```

### Run Tests Matching Pattern

```bash
npm run test -- --grep "Button"
```

### Run with Debug Output

```bash
npm run test -- --reporter=verbose
```

### Interactive UI

```bash
npm run test:ui
```

## CI/CD Integration

Tests are configured to run in CI environments:

- Exit with non-zero code on failure
- Generate coverage reports
- Support parallel execution

## Best Practices

1. **Test Organization**: Keep tests close to source files
2. **Naming**: Use descriptive test names that explain what is being tested
3. **Isolation**: Each test should be independent
4. **Coverage**: Aim for 80%+ coverage, but focus on meaningful tests
5. **Property Tests**: Use for universal properties that should hold across all inputs
6. **Unit Tests**: Use for specific examples and edge cases
7. **Mocking**: Mock external dependencies, not internal logic
8. **Assertions**: Use clear, specific assertions

## Troubleshooting

### Tests Not Found

- Ensure files match the pattern: `**/*.test.ts` or `**/*.property.test.ts`
- Check that files are in the correct package directory

### Coverage Below Threshold

- Add tests for uncovered lines
- Check if coverage excludes are too broad
- Use `npm run test:coverage` to see detailed report

### jsdom Limitations

- Some browser APIs may not be fully supported
- Use mocks for unsupported APIs
- Consider using `@testing-library/dom` for DOM testing utilities

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [fast-check Documentation](https://github.com/dubzzz/fast-check)
- [jsdom Documentation](https://github.com/jsdom/jsdom)
- [Property-Based Testing Guide](https://hypothesis.works/articles/what-is-property-based-testing/)
