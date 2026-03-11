import type { Meta, StoryObj } from '@storybook/react';
import { KCard } from '@kenikool/react';
import React from 'react';

/**
 * Card component stories for Kenikool UI
 *
 * Demonstrates all padding variants, shadow variants, dark mode,
 * and custom content with interactive controls for all props.
 */
const meta: Meta<typeof KCard> = {
  component: KCard,
  title: 'Components/Card',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable card component with multiple padding and shadow variants, dark mode support, and flexible content.',
      },
    },
  },
  argTypes: {
    design: {
      control: 'text',
      description: 'Unified design tokens (e.g., "p:md sh:lg a:fade")',
      table: {
        type: { summary: 'string' },
      },
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Card padding size (deprecated, use design prop)',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    shadow: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'none'],
      description: 'Card shadow effect (deprecated, use design prop)',
      table: {
        type: { summary: 'sm | md | lg | none' },
        defaultValue: { summary: 'md' },
      },
    },
    animation: {
      control: 'select',
      options: [
        'pulse',
        'bounce',
        'fade',
        'scale',
        'shake',
        'glow',
        'slide',
        'rotate',
        'flip',
        'none',
      ],
      description: 'Animation effect applied to the card (deprecated, use design prop)',
      table: {
        type: {
          summary: 'pulse | bounce | fade | scale | shake | glow | slide | rotate | flip | none',
        },
        defaultValue: { summary: 'none' },
      },
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes to merge with default styles',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    padding: 'md',
    shadow: 'md',
    animation: 'none',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// DESIGN PROP STORIES (RECOMMENDED)
// ============================================================================

/**
 * Using unified design prop - Recommended approach
 */
export const DesignPropBasic: Story = {
  args: {
    design: 'p:md sh:md',
    children: (
      <div>
        <h3>Design Prop Card</h3>
        <p>Card using the unified design prop. This is the recommended approach.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Card using the unified design prop. This is the recommended approach. Format: "p:md sh:lg a:fade"',
      },
    },
  },
};

/**
 * Design prop with animation
 */
export const DesignPropWithAnimation: Story = {
  args: {
    design: 'p:lg sh:lg a:fade',
    children: (
      <div>
        <h3>Animated Design Prop Card</h3>
        <p>Card with design prop including padding, shadow, and animation tokens.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with design prop including padding, shadow, and animation tokens.',
      },
    },
  },
};

/**
 * Design prop padding showcase
 */
export const DesignPropPaddings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <KCard design="p:sm sh:md">
        <h4>Small Padding</h4>
        <p>12px padding</p>
      </KCard>
      <KCard design="p:md sh:md">
        <h4>Medium Padding</h4>
        <p>16px padding</p>
      </KCard>
      <KCard design="p:lg sh:md">
        <h4>Large Padding</h4>
        <p>24px padding</p>
      </KCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All card padding variants using the design prop.',
      },
    },
  },
};

/**
 * Design prop shadow showcase
 */
export const DesignPropShadows: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <KCard design="p:md sh:sm">
        <h4>Small Shadow</h4>
        <p>Subtle elevation</p>
      </KCard>
      <KCard design="p:md sh:md">
        <h4>Medium Shadow</h4>
        <p>Default elevation</p>
      </KCard>
      <KCard design="p:md sh:lg">
        <h4>Large Shadow</h4>
        <p>Prominent elevation</p>
      </KCard>
      <KCard design="p:md sh:none">
        <h4>No Shadow</h4>
        <p>Flat design</p>
      </KCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All card shadow variants using the design prop.',
      },
    },
  },
};

/**
 * Design prop animations showcase
 */
export const DesignPropAnimations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <KCard design="a:fade">
        <h4>Fade</h4>
        <p>Fade-in animation</p>
      </KCard>
      <KCard design="a:pulse">
        <h4>Pulse</h4>
        <p>Pulsing animation</p>
      </KCard>
      <KCard design="a:glow">
        <h4>Glow</h4>
        <p>Glowing animation</p>
      </KCard>
      <KCard design="a:slide">
        <h4>Slide</h4>
        <p>Slide animation</p>
      </KCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All card animations using the design prop.',
      },
    },
  },
};

// ============================================================================
// PADDING STORIES
// ============================================================================

/**
 * Small padding variant
 */
export const PaddingSmall: Story = {
  args: {
    padding: 'sm',
    children: (
      <div>
        <h3>Small Padding Card</h3>
        <p>This card has small padding (12px).</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with small padding (12px). Useful for compact layouts.',
      },
    },
  },
};

/**
 * Medium padding variant (default)
 */
export const PaddingMedium: Story = {
  args: {
    padding: 'md',
    children: (
      <div>
        <h3>Medium Padding Card</h3>
        <p>This card has medium padding (16px). This is the default size.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with medium padding (16px). This is the default and most commonly used size.',
      },
    },
  },
};

/**
 * Large padding variant
 */
export const PaddingLarge: Story = {
  args: {
    padding: 'lg',
    children: (
      <div>
        <h3>Large Padding Card</h3>
        <p>This card has large padding (24px). Useful for spacious layouts.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with large padding (24px). Useful for spacious, premium layouts.',
      },
    },
  },
};

// ============================================================================
// SHADOW STORIES
// ============================================================================

/**
 * Small shadow variant
 */
export const ShadowSmall: Story = {
  args: {
    shadow: 'sm',
    children: (
      <div>
        <h3>Small Shadow Card</h3>
        <p>This card has a small shadow effect.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with small shadow effect (0 1px 2px). Subtle elevation.',
      },
    },
  },
};

/**
 * Medium shadow variant (default)
 */
export const ShadowMedium: Story = {
  args: {
    shadow: 'md',
    children: (
      <div>
        <h3>Medium Shadow Card</h3>
        <p>This card has a medium shadow effect. This is the default.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Card with medium shadow effect (0 4px 6px). This is the default and provides good depth.',
      },
    },
  },
};

/**
 * Large shadow variant
 */
export const ShadowLarge: Story = {
  args: {
    shadow: 'lg',
    children: (
      <div>
        <h3>Large Shadow Card</h3>
        <p>This card has a large shadow effect.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with large shadow effect (0 10px 15px). Prominent elevation.',
      },
    },
  },
};

/**
 * No shadow variant
 */
export const ShadowNone: Story = {
  args: {
    shadow: 'none',
    children: (
      <div>
        <h3>No Shadow Card</h3>
        <p>This card has no shadow effect. Flat design.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with no shadow effect. Flat design approach.',
      },
    },
  },
};

// ============================================================================
// DARK MODE STORY
// ============================================================================

/**
 * Dark mode story
 */
export const DarkMode: Story = {
  args: {
    padding: 'md',
    shadow: 'md',
    children: (
      <div>
        <h3>Dark Mode Card</h3>
        <p>This card adapts to dark mode with dark background and light text.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Card in dark mode. The component automatically adapts to the system theme preference or manual theme setting.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '0.5rem' }}>
        <Story />
      </div>
    ),
  ],
};

// ============================================================================
// CUSTOM CONTENT STORIES
// ============================================================================

/**
 * Card with custom content
 */
export const CustomContent: Story = {
  args: {
    padding: 'lg',
    shadow: 'lg',
    children: (
      <div>
        <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>Product Card</h2>
        <img
          src="https://via.placeholder.com/300x200"
          alt="Product"
          style={{ width: '100%', borderRadius: '0.5rem', marginBottom: '1rem' }}
        />
        <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Premium Product</h3>
        <p style={{ marginTop: 0, marginBottom: '1rem', color: '#666' }}>
          High-quality product with excellent features and design.
        </p>
        <button
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            cursor: 'pointer',
          }}
        >
          Learn More
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Card with rich custom content including images, headings, text, and interactive elements.',
      },
    },
  },
};

/**
 * Card with list content
 */
export const ListContent: Story = {
  args: {
    padding: 'md',
    shadow: 'md',
    children: (
      <div>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Features</h3>
        <ul style={{ marginTop: 0, paddingLeft: '1.5rem' }}>
          <li>Fast and responsive</li>
          <li>Fully customizable</li>
          <li>Accessible by default</li>
          <li>Multiple variants</li>
          <li>Dark mode support</li>
        </ul>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with list content for displaying features or items.',
      },
    },
  },
};

/**
 * Card with form content
 */
export const FormContent: Story = {
  args: {
    padding: 'lg',
    shadow: 'md',
    children: (
      <div>
        <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Contact Form</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '0.375rem',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Email
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '0.375rem',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Send
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with form content for contact forms or data entry.',
      },
    },
  },
};

// ============================================================================
// ANIMATION STORIES
// ============================================================================

/**
 * Fade animation
 */
export const AnimationFade: Story = {
  args: {
    animation: 'fade',
    children: (
      <div>
        <h3>Fading Card</h3>
        <p>This card has a fade-in animation on mount.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with fade-in animation on mount. Smooth entrance effect.',
      },
    },
  },
};

/**
 * Pulse animation
 */
export const AnimationPulse: Story = {
  args: {
    animation: 'pulse',
    children: (
      <div>
        <h3>Pulsing Card</h3>
        <p>This card has a continuous pulsing animation.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with continuous pulsing animation. Useful for drawing attention.',
      },
    },
  },
};

/**
 * Scale animation
 */
export const AnimationScale: Story = {
  args: {
    animation: 'scale',
    children: (
      <div>
        <h3>Scaling Card</h3>
        <p>This card has a scale animation.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with scale animation for emphasis.',
      },
    },
  },
};

/**
 * Glow animation
 */
export const AnimationGlow: Story = {
  args: {
    animation: 'glow',
    children: (
      <div>
        <h3>Glowing Card</h3>
        <p>This card has a glowing animation.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with glowing animation. Creates a pulsing glow effect.',
      },
    },
  },
};

/**
 * Slide animation
 */
export const AnimationSlide: Story = {
  args: {
    animation: 'slide',
    children: (
      <div>
        <h3>Sliding Card</h3>
        <p>This card has a slide animation on mount.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with slide animation on mount. Slides in from the left.',
      },
    },
  },
};

// ============================================================================
// COMBINATION STORIES
// ============================================================================

/**
 * Large padding with large shadow
 */
export const LargePaddingLargeShadow: Story = {
  args: {
    padding: 'lg',
    shadow: 'lg',
    children: (
      <div>
        <h3>Premium Card</h3>
        <p>This card has large padding and large shadow for a premium appearance.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with large padding and large shadow for a premium, elevated appearance.',
      },
    },
  },
};

/**
 * Small padding with no shadow
 */
export const SmallPaddingNoShadow: Story = {
  args: {
    padding: 'sm',
    shadow: 'none',
    children: (
      <div>
        <h3>Compact Card</h3>
        <p>This card has small padding and no shadow for a compact, flat design.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with small padding and no shadow for a compact, flat design.',
      },
    },
  },
};

/**
 * Medium padding with fade animation
 */
export const MediumWithFade: Story = {
  args: {
    padding: 'md',
    shadow: 'md',
    animation: 'fade',
    children: (
      <div>
        <h3>Animated Card</h3>
        <p>This card has medium padding, medium shadow, and fade animation.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with medium padding, medium shadow, and fade animation for smooth entrance.',
      },
    },
  },
};

// ============================================================================
// CUSTOM STYLING STORY
// ============================================================================

/**
 * Custom className - Card with custom CSS classes merged with default styles
 */
export const CustomClassName: Story = {
  args: {
    padding: 'md',
    shadow: 'md',
    className: 'border-2 border-blue-500',
    children: (
      <div>
        <h3>Custom Styled Card</h3>
        <p>This card has custom CSS classes merged with default styles.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Card with custom CSS classes merged with default styles. Custom classes are applied without breaking component functionality.',
      },
    },
  },
};

// ============================================================================
// CODE EXAMPLES
// ============================================================================

/**
 * Vanilla JavaScript implementation example
 */
export const VanillaExample: Story = {
  args: {
    padding: 'md',
    shadow: 'md',
    children: (
      <div>
        <h3>Vanilla Card</h3>
        <p>See code examples below.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `
## Vanilla JavaScript Implementation

\`\`\`html
<!-- Basic card -->
<k-card padding="md" shadow="md">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</k-card>

<!-- All padding variants -->
<k-card padding="sm">Small padding</k-card>
<k-card padding="md">Medium padding</k-card>
<k-card padding="lg">Large padding</k-card>

<!-- All shadow variants -->
<k-card shadow="sm">Small shadow</k-card>
<k-card shadow="md">Medium shadow</k-card>
<k-card shadow="lg">Large shadow</k-card>
<k-card shadow="none">No shadow</k-card>

<!-- With animation -->
<k-card animation="fade">Fading card</k-card>
<k-card animation="pulse">Pulsing card</k-card>
<k-card animation="glow">Glowing card</k-card>
<k-card animation="slide">Sliding card</k-card>

<!-- Complex content -->
<k-card padding="lg" shadow="lg">
  <img src="image.jpg" alt="Product" />
  <h3>Product Title</h3>
  <p>Product description</p>
  <button>Learn More</button>
</k-card>
\`\`\`

### Programmatic Access

\`\`\`javascript
const card = document.querySelector('k-card');

// Set attributes
card.setAttribute('padding', 'lg');
card.setAttribute('shadow', 'lg');
card.setAttribute('animation', 'fade');

// Get attributes
const padding = card.getAttribute('padding');
const shadow = card.getAttribute('shadow');
\`\`\`

### Dynamic Content

\`\`\`javascript
const card = document.querySelector('k-card');
card.innerHTML = \`
  <h2>Dynamic Title</h2>
  <p>Dynamic content</p>
\`;
\`\`\`
        `,
      },
    },
  },
};

/**
 * React implementation example
 */
export const ReactExample: Story = {
  args: {
    padding: 'md',
    shadow: 'md',
    children: (
      <div>
        <h3>React Card</h3>
        <p>See code examples below.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `
## React Implementation

\`\`\`tsx
import { KCard } from '@kenikool/react';

// Basic card
<KCard padding="md" shadow="md">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</KCard>

// All padding variants
<KCard padding="sm">Small padding</KCard>
<KCard padding="md">Medium padding</KCard>
<KCard padding="lg">Large padding</KCard>

// All shadow variants
<KCard shadow="sm">Small shadow</KCard>
<KCard shadow="md">Medium shadow</KCard>
<KCard shadow="lg">Large shadow</KCard>
<KCard shadow="none">No shadow</KCard>

// With animation
<KCard animation="fade">Fading card</KCard>
<KCard animation="pulse">Pulsing card</KCard>
<KCard animation="glow">Glowing card</KCard>
<KCard animation="slide">Sliding card</KCard>
\`\`\`

### Product Card Component

\`\`\`tsx
import { KCard } from '@kenikool/react';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  onLearnMore: () => void;
}

export function ProductCard({
  title,
  description,
  image,
  onLearnMore,
}: ProductCardProps) {
  return (
    <KCard padding="lg" shadow="lg">
      <img src={image} alt={title} style={{ width: '100%', borderRadius: '0.5rem' }} />
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onLearnMore}>Learn More</button>
    </KCard>
  );
}
\`\`\`

### Grid Layout

\`\`\`tsx
import { KCard } from '@kenikool/react';

export function CardGrid() {
  const items = [
    { id: 1, title: 'Card 1', content: 'Content 1' },
    { id: 2, title: 'Card 2', content: 'Content 2' },
    { id: 3, title: 'Card 3', content: 'Content 3' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      {items.map((item) => (
        <KCard key={item.id} padding="md" shadow="md">
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </KCard>
      ))}
    </div>
  );
}
\`\`\`

### Dark Mode Support

\`\`\`tsx
import { KCard } from '@kenikool/react';
import { useTheme } from '@kenikool/react';

export function ThemedCard() {
  const { theme } = useTheme();

  return (
    <KCard padding="md" shadow="md">
      <h3>Theme: {theme}</h3>
      <p>This card adapts to the current theme.</p>
    </KCard>
  );
}
\`\`\`

### Custom Styling

\`\`\`tsx
<KCard
  padding="md"
  shadow="md"
  className="border-2 border-blue-500 rounded-lg"
>
  Custom styled card
</KCard>
\`\`\`
        `,
      },
    },
  },
};
