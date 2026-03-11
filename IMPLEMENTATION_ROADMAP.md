# Button Variants & Loaders - Implementation Roadmap

## Summary

This roadmap outlines the implementation of 10 button variants and 18 loading spinners for Kenikool UI Phase 2.

## What's Being Added

### Button Variants (10 total)

Currently implemented: 3 (primary, secondary, danger)
**New variants to add**: success, warning, info, ghost, link, gradient, outline

### Loading Spinners (18 total)

Currently: None
**New spinners to add**: All 18 types with `l:` prefix

## Implementation Tasks

### 1. Update Button Component Props

- Add `loading` prop to KButtonProps
- Add `loadingSpinner` prop (optional, defaults to 'spinner')
- Update TypeScript interfaces

### 2. Update Button Styling

- Add CSS for 7 new button variants (success, warning, info, ghost, link, gradient, outline)
- Add CSS animations for 18 loading spinners
- Ensure dark mode support for all variants

### 3. Update Button Logic

- Handle loading state (disable button, show spinner)
- Hide text when loading
- Manage spinner animation lifecycle

### 4. Update Vanilla Component

- Add loading attribute support
- Add loadingSpinner attribute support
- Update shadow DOM rendering

### 5. Update React Component

- Add loading prop handling
- Add loadingSpinner prop handling
- Integrate with Framer Motion for smooth transitions

### 6. Update Design Token Parser

- Add `l:` prefix parsing for loading spinners
- Validate spinner types
- Handle combined tokens (e.g., `v:primary s:lg l:dots`)

### 7. Update Stories

- Add stories for all 10 button variants
- Add stories for all 18 loading spinners
- Add combination examples
- Add interactive controls

### 8. Update Tests

- Unit tests for new variants
- Unit tests for loading states
- Property-based tests for token combinations
- Accessibility tests

### 9. Update Documentation

- Update README.md with new variants
- Update SETUP_GUIDE.md with examples
- Add BUTTON_VARIANTS_AND_LOADERS.md (already created)

## File Changes Required

### Core Package

- `packages/core/src/utils/parseDesign.ts` - Add `l:` prefix parsing
- `packages/core/src/types/index.ts` - Add new types

### Vanilla Package

- `packages/vanilla/src/components/button.ts` - Add loading support
- `packages/vanilla/src/styles/button.css` - Add variant & spinner styles

### React Package

- `packages/react/src/components/Button.tsx` - Add loading prop
- `packages/react/src/animations/variants.ts` - Add spinner animations

### Documentation

- `packages/docs/stories/Button.stories.ts` - Add new stories
- `README.md` - Update examples
- `BUTTON_VARIANTS_AND_LOADERS.md` - Already created

## Design Token Format

```
design="v:primary s:md a:pulse l:dots"
       ↑       ↑   ↑   ↑     ↑
       |       |   |   |     └─ loading spinner
       |       |   |   └─────── animation
       |       |   └─────────── size
       |       └─────────────── variant
       └───────────────────────── prefix
```

## Backward Compatibility

- Existing code without loading spinners continues to work
- `loading` prop is optional (defaults to false)
- `loadingSpinner` prop is optional (defaults to 'spinner')
- All existing variants remain unchanged

## Testing Strategy

1. **Unit Tests**: Each variant and spinner individually
2. **Integration Tests**: Combinations of tokens
3. **Visual Tests**: Storybook stories for manual verification
4. **Accessibility Tests**: ARIA attributes, keyboard navigation
5. **Performance Tests**: Animation performance, bundle size

## Estimated Scope

- **Lines of Code**: ~2000-3000 (CSS + JS)
- **Bundle Size Impact**: ~3-5KB gzipped
- **Implementation Time**: 4-6 hours
- **Testing Time**: 2-3 hours

## Next Steps

1. Review and approve this roadmap
2. Implement core changes (parseDesign, types)
3. Implement vanilla component changes
4. Implement React component changes
5. Add stories and documentation
6. Run full test suite
7. Update README and guides
