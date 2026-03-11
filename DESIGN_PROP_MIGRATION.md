# Unified Design Prop API - Migration Guide

## Overview

Kenikool UI now supports a unified `design` prop that consolidates all styling attributes into a single, space-separated token string. This eliminates the need to juggle multiple props like `variant`, `size`, `padding`, `shadow`, and `animation`.

## Design Token Format

The `design` prop uses **prefixed tokens** separated by spaces:

```
design="prefix:value prefix:value prefix:value"
```

### Available Prefixes

| Prefix | Token Name | Component(s)        | Values                                                             |
| ------ | ---------- | ------------------- | ------------------------------------------------------------------ |
| `v:`   | variant    | Button              | primary, secondary, danger                                         |
| `s:`   | size       | Button, Input       | sm, md, lg                                                         |
| `a:`   | animation  | Button, Input, Card | pulse, bounce, fade, scale, shake, glow, slide, rotate, flip, none |
| `p:`   | padding    | Card                | sm, md, lg                                                         |
| `sh:`  | shadow     | Card                | sm, md, lg, none                                                   |
| `st:`  | state      | (reserved)          | normal, error, disabled                                            |

## Component Examples

### Button

**Old API (Deprecated):**

```tsx
<KButton variant="primary" size="lg" animation="pulse">
  Click me
</KButton>
```

**New API (Recommended):**

```tsx
<KButton design="v:primary s:lg a:pulse">Click me</KButton>
```

### Input

**Old API (Deprecated):**

```tsx
<KInput size="md" animation="fade" placeholder="Enter text" />
```

**New API (Recommended):**

```tsx
<KInput design="s:md a:fade" placeholder="Enter text" />
```

### Card

**Old API (Deprecated):**

```tsx
<KCard padding="md" shadow="lg" animation="fade">
  <h2>Title</h2>
  <p>Content</p>
</KCard>
```

**New API (Recommended):**

```tsx
<KCard design="p:md sh:lg a:fade">
  <h2>Title</h2>
  <p>Content</p>
</KCard>
```

## Why Prefixed Tokens?

The prefixed approach avoids conflicts between tokens that appear in multiple contexts:

- `sm`, `md`, `lg` are used for **size**, **padding**, and **shadow**
- Without prefixes, `design="md"` would be ambiguous
- With prefixes, `design="s:md p:md sh:md"` is clear and unambiguous

## Backward Compatibility

Individual props are still supported but **deprecated**. They will trigger console warnings:

```tsx
// This still works but shows a deprecation warning
<KButton variant="primary" size="md">
  Click me
</KButton>

// Console output:
// "KButton: Using individual props (variant, size, animation) is deprecated.
//  Use the design prop instead. Example: design="v:primary s:md a:pulse""
```

## Migration Path

1. **Identify components** using old props
2. **Convert to design tokens** using the prefix mapping
3. **Test thoroughly** to ensure styling is preserved
4. **Remove deprecation warnings** by using the new API

### Migration Examples

#### Button

```tsx
// Before
<KButton variant="danger" size="sm" animation="shake" disabled>
  Delete
</KButton>

// After
<KButton design="v:danger s:sm a:shake" disabled>
  Delete
</KButton>
```

#### Input

```tsx
// Before
<KInput size="lg" animation="bounce" error placeholder="Email" />

// After
<KInput design="s:lg a:bounce" error placeholder="Email" />
```

#### Card

```tsx
// Before
<KCard padding="lg" shadow="none" animation="glow">
  <p>Content</p>
</KCard>

// After
<KCard design="p:lg sh:none a:glow">
  <p>Content</p>
</KCard>
```

## Implementation Details

### React Components

All React components now accept a `design` prop that:

1. Parses the design string using `parseDesign()`
2. Merges parsed tokens with individual prop overrides
3. Individual props take precedence over design tokens
4. Shows deprecation warnings when individual props are used

### Vanilla Web Components

All vanilla components now accept a `design` attribute that:

1. Parses the design string using `parseDesign()`
2. Updates internal state based on parsed tokens
3. Triggers re-render when design attribute changes
4. Shows deprecation warnings when individual attributes are used

### Core Utilities

New utilities in `@kenikool/core`:

```typescript
// Parse design string into tokens
parseDesign(designString: string): DesignTokens

// Merge design tokens with overrides
mergeDesignTokens(designString: string, overrides?: Partial<DesignTokens>): DesignTokens

// Type definition
interface DesignTokens {
  variant?: string;
  size?: string;
  animation?: string;
  padding?: string;
  shadow?: string;
  state?: string;
  [key: string]: string | undefined;
}
```

## Benefits

✅ **Cleaner API** - Single prop instead of multiple scattered props
✅ **No Conflicts** - Prefixed tokens eliminate ambiguity
✅ **Backward Compatible** - Old props still work with deprecation warnings
✅ **Type Safe** - Full TypeScript support
✅ **Consistent** - Same format across all components
✅ **Extensible** - Easy to add new tokens in the future

## Future Enhancements

Potential future additions:

- `c:` for custom color overrides
- `r:` for border radius
- `b:` for border styles
- `o:` for opacity
- `t:` for transitions

## Questions?

Refer to the updated README.md for complete documentation and examples.
