# Button Variants & Loading Spinners - Implementation Guide

## Overview

This document details the implementation of 10 button variants and 18 modern loading spinners for Kenikool UI. All variants use the unified `design` prop with prefixes for easy composition.

---

## Button Variants (10 Types)

### 1. Primary

- **Color**: Blue (#3b82f6)
- **Use Case**: Main call-to-action buttons
- **Design Token**: `v:primary`

```tsx
// React
<KButton design="v:primary s:md">Submit</KButton>

// Vanilla
<k-button design="v:primary s:md">Submit</k-button>
```

### 2. Secondary

- **Color**: Gray (#6b7280)
- **Use Case**: Alternative actions
- **Design Token**: `v:secondary`

```tsx
<KButton design="v:secondary s:md">Cancel</KButton>
```

### 3. Danger

- **Color**: Red (#ef4444)
- **Use Case**: Destructive actions (delete, remove)
- **Design Token**: `v:danger`

```tsx
<KButton design="v:danger s:md">Delete</KButton>
```

### 4. Success

- **Color**: Green (#10b981)
- **Use Case**: Positive/confirmation actions
- **Design Token**: `v:success`

```tsx
<KButton design="v:success s:md">Confirm</KButton>
```

### 5. Warning

- **Color**: Orange (#f59e0b)
- **Use Case**: Caution/alert actions
- **Design Token**: `v:warning`

```tsx
<KButton design="v:warning s:md">Proceed with caution</KButton>
```

### 6. Info

- **Color**: Light Blue (#0ea5e9)
- **Use Case**: Informational actions
- **Design Token**: `v:info`

```tsx
<KButton design="v:info s:md">Learn more</KButton>
```

### 7. Ghost

- **Color**: Transparent with border
- **Use Case**: Secondary/subtle actions
- **Design Token**: `v:ghost`

```tsx
<KButton design="v:ghost s:md">Skip</KButton>
```

### 8. Link

- **Color**: Text-only (no background)
- **Use Case**: Minimal/text-based actions
- **Design Token**: `v:link`

```tsx
<KButton design="v:link s:md">Forgot password?</KButton>
```

### 9. Gradient

- **Color**: Multi-color gradient
- **Use Case**: Premium/featured actions
- **Design Token**: `v:gradient`

```tsx
<KButton design="v:gradient s:md">Upgrade Now</KButton>
```

### 10. Outline

- **Color**: Bordered style with transparent background
- **Use Case**: Alternative primary actions
- **Design Token**: `v:outline`

```tsx
<KButton design="v:outline s:md">Learn More</KButton>
```

---

## Loading Spinners (18 Types)

All spinners use the `l:` prefix in the design prop. When a loading spinner is active, the button text is hidden and replaced with the spinner animation.

### 1. Spinner (Classic Rotating Circle)

- **Animation**: 360° rotation
- **Speed**: 1s per rotation
- **Design Token**: `l:spinner`

```tsx
<KButton design="v:primary l:spinner" loading>
  Loading...
</KButton>
```

### 2. Dots (Bouncing Dots)

- **Animation**: 3 dots bouncing up and down
- **Speed**: 1.4s cycle
- **Design Token**: `l:dots`

```tsx
<KButton design="v:primary l:dots" loading>
  Processing...
</KButton>
```

### 3. Pulse (Fading Circle)

- **Animation**: Opacity fade in/out
- **Speed**: 2s cycle
- **Design Token**: `l:pulse`

```tsx
<KButton design="v:primary l:pulse" loading>
  Saving...
</KButton>
```

### 4. Bars (Animated Bars)

- **Animation**: Bars growing and shrinking
- **Speed**: 1.2s cycle
- **Design Token**: `l:bars`

```tsx
<KButton design="v:primary l:bars" loading>
  Uploading...
</KButton>
```

### 5. Ring (Rotating Donut)

- **Animation**: Rotating ring with gap
- **Speed**: 1s per rotation
- **Design Token**: `l:ring`

```tsx
<KButton design="v:primary l:ring" loading>
  Connecting...
</KButton>
```

### 6. Dual Ring (Two Rotating Rings)

- **Animation**: Two concentric rings rotating in opposite directions
- **Speed**: 1.5s cycle
- **Design Token**: `l:dual-ring`

```tsx
<KButton design="v:primary l:dual-ring" loading>
  Syncing...
</KButton>
```

### 7. Ripple (Expanding Ripple)

- **Animation**: Expanding circles from center
- **Speed**: 1s cycle
- **Design Token**: `l:ripple`

```tsx
<KButton design="v:primary l:ripple" loading>
  Searching...
</KButton>
```

### 8. Wave (Wave Animation)

- **Animation**: Wave-like motion of bars
- **Speed**: 1.2s cycle
- **Design Token**: `l:wave`

```tsx
<KButton design="v:primary l:wave" loading>
  Loading...
</KButton>
```

### 9. Skeleton (Placeholder Shimmer)

- **Animation**: Skeleton screen placeholder
- **Speed**: 2s cycle
- **Design Token**: `l:skeleton`

```tsx
<KButton design="v:primary l:skeleton" loading>
  Loading content...
</KButton>
```

### 10. Shimmer (Shine Effect)

- **Animation**: Shimmer/shine moving across
- **Speed**: 2s cycle
- **Design Token**: `l:shimmer`

```tsx
<KButton design="v:primary l:shimmer" loading>
  Fetching...
</KButton>
```

### 11. Orbit (Orbiting Dots)

- **Animation**: Dots orbiting around center
- **Speed**: 1.5s cycle
- **Design Token**: `l:orbit`

```tsx
<KButton design="v:primary l:orbit" loading>
  Initializing...
</KButton>
```

### 12. Bounce (Bouncing Balls)

- **Animation**: Balls bouncing in sequence
- **Speed**: 1.4s cycle
- **Design Token**: `l:bounce`

```tsx
<KButton design="v:primary l:bounce" loading>
  Processing...
</KButton>
```

### 13. Flip (Flipping Card)

- **Animation**: Card flipping animation
- **Speed**: 0.8s cycle
- **Design Token**: `l:flip`

```tsx
<KButton design="v:primary l:flip" loading>
  Transforming...
</KButton>
```

### 14. Morph (Morphing Shapes)

- **Animation**: Shapes morphing between forms
- **Speed**: 1.5s cycle
- **Design Token**: `l:morph`

```tsx
<KButton design="v:primary l:morph" loading>
  Adapting...
</KButton>
```

### 15. Gradient Spin (Gradient Rotating)

- **Animation**: Gradient rotating around circle
- **Speed**: 2s per rotation
- **Design Token**: `l:gradient-spin`

```tsx
<KButton design="v:primary l:gradient-spin" loading>
  Enhancing...
</KButton>
```

### 16. Dots Wave (Wave of Dots)

- **Animation**: Dots moving in wave pattern
- **Speed**: 1.6s cycle
- **Design Token**: `l:dots-wave`

```tsx
<KButton design="v:primary l:dots-wave" loading>
  Streaming...
</KButton>
```

### 17. Progress (Linear Progress Bar)

- **Animation**: Animated progress bar
- **Speed**: 2s cycle
- **Design Token**: `l:progress`

```tsx
<KButton design="v:primary l:progress" loading>
  Uploading...
</KButton>
```

### 18. Hourglass (Hourglass Animation)

- **Animation**: Hourglass sand falling
- **Speed**: 1.2s cycle
- **Design Token**: `l:hourglass`

```tsx
<KButton design="v:primary l:hourglass" loading>
  Time remaining...
</KButton>
```

---

## Usage Examples

### Basic Loading Button

```tsx
// React
const [loading, setLoading] = useState(false);

<KButton design="v:primary l:spinner" loading={loading} onClick={() => setLoading(true)}>
  Submit
</KButton>;
```

### Combining Variants with Loaders

```tsx
// All combinations work
<KButton design="v:success s:lg l:dots" loading>Success Action</KButton>
<KButton design="v:danger s:sm l:pulse" loading>Delete</KButton>
<KButton design="v:warning l:wave" loading>Warning</KButton>
<KButton design="v:info l:orbit" loading>Info</KButton>
```

### Vanilla JavaScript

```html
<k-button design="v:primary l:spinner" loading> Submit </k-button>

<script>
  const button = document.querySelector('k-button');
  button.addEventListener('click', async () => {
    button.setAttribute('loading', '');
    // Do async work
    await fetch('/api/submit');
    button.removeAttribute('loading');
  });
</script>
```

### Form Integration

```tsx
export function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <KInput design="s:md" type="email" placeholder="Email" />
      <KInput design="s:md" type="password" placeholder="Password" />
      <KButton design="v:primary s:lg l:dots" loading={loading} disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </KButton>
    </form>
  );
}
```

---

## Design Token Reference

### Button Variants (v:)

| Token         | Color       | Use Case            |
| ------------- | ----------- | ------------------- |
| `v:primary`   | Blue        | Main actions        |
| `v:secondary` | Gray        | Alternative actions |
| `v:danger`    | Red         | Destructive actions |
| `v:success`   | Green       | Positive actions    |
| `v:warning`   | Orange      | Caution actions     |
| `v:info`      | Light Blue  | Informational       |
| `v:ghost`     | Transparent | Subtle actions      |
| `v:link`      | Text-only   | Minimal actions     |
| `v:gradient`  | Multi-color | Premium actions     |
| `v:outline`   | Bordered    | Alternative primary |

### Sizes (s:)

| Token  | Padding | Font Size |
| ------ | ------- | --------- |
| `s:sm` | 8px     | 12px      |
| `s:md` | 12px    | 14px      |
| `s:lg` | 16px    | 16px      |

### Loading Spinners (l:)

| Token             | Animation         | Speed |
| ----------------- | ----------------- | ----- |
| `l:spinner`       | Rotating circle   | 1s    |
| `l:dots`          | Bouncing dots     | 1.4s  |
| `l:pulse`         | Fading            | 2s    |
| `l:bars`          | Growing bars      | 1.2s  |
| `l:ring`          | Rotating ring     | 1s    |
| `l:dual-ring`     | Dual rings        | 1.5s  |
| `l:ripple`        | Expanding ripple  | 1s    |
| `l:wave`          | Wave motion       | 1.2s  |
| `l:skeleton`      | Placeholder       | 2s    |
| `l:shimmer`       | Shine effect      | 2s    |
| `l:orbit`         | Orbiting dots     | 1.5s  |
| `l:bounce`        | Bouncing balls    | 1.4s  |
| `l:flip`          | Flipping card     | 0.8s  |
| `l:morph`         | Morphing shapes   | 1.5s  |
| `l:gradient-spin` | Gradient rotation | 2s    |
| `l:dots-wave`     | Wave of dots      | 1.6s  |
| `l:progress`      | Progress bar      | 2s    |
| `l:hourglass`     | Hourglass         | 1.2s  |

### Animations (a:)

| Token      | Effect       |
| ---------- | ------------ |
| `a:pulse`  | Pulsing      |
| `a:bounce` | Bouncing     |
| `a:fade`   | Fade-in      |
| `a:scale`  | Scaling      |
| `a:shake`  | Shaking      |
| `a:glow`   | Glowing      |
| `a:slide`  | Sliding      |
| `a:rotate` | Rotating     |
| `a:flip`   | Flipping     |
| `a:none`   | No animation |

---

## Accessibility Considerations

### Loading State

- When `loading` is true, the button should be disabled
- Screen readers should announce "Loading" or similar status
- Use `aria-busy="true"` when loading

```tsx
<KButton design="v:primary l:spinner" loading={loading} disabled={loading} aria-busy={loading}>
  Submit
</KButton>
```

### Keyboard Navigation

- All buttons remain keyboard accessible
- Loading spinners don't interfere with focus management
- Tab order is preserved

### Color Contrast

- All variants meet WCAG AA standards (4.5:1 minimum)
- Spinners use high-contrast colors
- Works in light and dark modes

### Reduced Motion

- Respects `prefers-reduced-motion` media query
- Spinners pause when reduced motion is enabled
- Fallback to static indicator

---

## Performance Notes

- All spinners use CSS animations (GPU-accelerated)
- No JavaScript overhead for animations
- Minimal bundle size impact (~2KB gzipped)
- Smooth 60fps performance on modern devices

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

All variants and spinners are fully supported across modern browsers.
