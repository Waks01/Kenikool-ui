import type { Meta, StoryObj } from '@storybook/react';
import { KButton } from '@kenikool/react';

/**
 * Button component stories for Kenikool UI
 *
 * Demonstrates all variants, sizes, animations, and states
 * with interactive controls for all props.
 */
const meta: Meta<typeof KButton> = {
  component: KButton,
  title: 'Components/Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable button component with multiple variants, sizes, and animations.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Button style variant',
      table: {
        type: { summary: 'primary | secondary | danger' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      table: {
        type: { summary: 'sm | md | lg' },
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
      description: 'Animation effect applied to the button',
      table: {
        type: {
          summary: 'pulse | bounce | fade | scale | shake | glow | slide | rotate | flip | none',
        },
        defaultValue: { summary: 'none' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes to merge with default styles',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'Button text content',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
      table: {
        type: { summary: '(e: React.MouseEvent<HTMLButtonElement>) => void' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
      table: {
        type: { summary: 'button | submit | reset' },
        defaultValue: { summary: 'button' },
      },
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    animation: 'none',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// VARIANT STORIES
// ============================================================================

/**
 * Primary variant - Main action button with blue background
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The primary variant is used for main actions. It features a blue background with white text.',
      },
    },
  },
};

/**
 * Secondary variant - Secondary action button with gray background
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The secondary variant is used for secondary actions. It features a gray background with white text.',
      },
    },
  },
};

/**
 * Danger variant - Destructive action button with red background
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The danger variant is used for destructive actions. It features a red background with white text.',
      },
    },
  },
};

// ============================================================================
// SIZE STORIES
// ============================================================================

/**
 * Small size button
 */
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small button with reduced padding and font size (8px padding, 12px font).',
      },
    },
  },
};

/**
 * Medium size button (default)
 */
export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Medium button with standard padding and font size (12px padding, 14px font). This is the default size.',
      },
    },
  },
};

/**
 * Large size button
 */
export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large button with increased padding and font size (16px padding, 16px font).',
      },
    },
  },
};

// ============================================================================
// ANIMATION STORIES
// ============================================================================

/**
 * Pulse animation - Continuous pulsing effect
 */
export const AnimationPulse: Story = {
  args: {
    animation: 'pulse',
    children: 'Pulsing Button',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Button with continuous pulsing animation. Useful for drawing attention to important actions.',
      },
    },
  },
};

/**
 * Bounce animation - Bouncing effect on hover
 */
export const AnimationBounce: Story = {
  args: {
    animation: 'bounce',
    children: 'Bouncing Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with bouncing animation on hover. Creates a playful interaction effect.',
      },
    },
  },
};

/**
 * Fade animation - Fade-in effect on mount
 */
export const AnimationFade: Story = {
  args: {
    animation: 'fade',
    children: 'Fading Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with fade-in animation on mount. Smooth entrance effect.',
      },
    },
  },
};

/**
 * Scale animation - Scale transformation on hover
 */
export const AnimationScale: Story = {
  args: {
    animation: 'scale',
    children: 'Scaling Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with scale animation on hover. Grows slightly when hovered.',
      },
    },
  },
};

/**
 * Shake animation - Shake effect on interaction
 */
export const AnimationShake: Story = {
  args: {
    animation: 'shake',
    children: 'Shaking Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with shake animation on click. Creates a tactile feedback effect.',
      },
    },
  },
};

/**
 * Glow animation - Glowing effect animation
 */
export const AnimationGlow: Story = {
  args: {
    animation: 'glow',
    children: 'Glowing Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with glowing animation. Creates a pulsing glow effect around the button.',
      },
    },
  },
};

/**
 * Slide animation - Slide effect on mount
 */
export const AnimationSlide: Story = {
  args: {
    animation: 'slide',
    children: 'Sliding Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with slide animation on mount. Slides in from the left.',
      },
    },
  },
};

/**
 * Rotate animation - Rotation effect
 */
export const AnimationRotate: Story = {
  args: {
    animation: 'rotate',
    children: 'Rotating Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with continuous rotation animation. Useful for loading states.',
      },
    },
  },
};

/**
 * Flip animation - Flip effect
 */
export const AnimationFlip: Story = {
  args: {
    animation: 'flip',
    children: 'Flipping Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with flip animation. Rotates on the Y-axis.',
      },
    },
  },
};

/**
 * No animation (default)
 */
export const AnimationNone: Story = {
  args: {
    animation: 'none',
    children: 'Static Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button without any animation. This is the default state.',
      },
    },
  },
};

// ============================================================================
// STATE STORIES
// ============================================================================

/**
 * Disabled state - Button is disabled and cannot be interacted with
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Disabled button with reduced opacity and cursor set to not-allowed. Cannot be clicked.',
      },
    },
  },
};

// ============================================================================
// CUSTOM STYLING STORY
// ============================================================================

/**
 * Custom className - Button with custom CSS classes merged with default styles
 */
export const CustomClassName: Story = {
  args: {
    children: 'Custom Styled Button',
    className: 'shadow-lg hover:shadow-xl',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Button with custom CSS classes merged with default styles. Custom classes are applied without breaking component functionality.',
      },
    },
  },
};

// ============================================================================
// COMBINATION STORIES
// ============================================================================

/**
 * Large primary button with pulse animation
 */
export const LargePrimaryWithAnimation: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    animation: 'pulse',
    children: 'Important Action',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Combination of large size, primary variant, and pulse animation for prominent call-to-action buttons.',
      },
    },
  },
};

/**
 * Small danger button
 */
export const SmallDanger: Story = {
  args: {
    variant: 'danger',
    size: 'sm',
    children: 'Remove',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small danger button for compact destructive actions.',
      },
    },
  },
};

/**
 * Secondary button with scale animation
 */
export const SecondaryWithScale: Story = {
  args: {
    variant: 'secondary',
    animation: 'scale',
    children: 'Hover Me',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary button with scale animation for interactive feedback.',
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
    children: 'Vanilla Button',
  },
  parameters: {
    docs: {
      description: {
        story: `
## Vanilla JavaScript Implementation

\`\`\`html
<!-- Basic button -->
<k-button variant="primary" size="md">Click me</k-button>

<!-- Button with animation -->
<k-button variant="primary" animation="pulse">Important</k-button>

<!-- Disabled button -->
<k-button disabled>Disabled</k-button>

<!-- All variants -->
<k-button variant="primary">Primary</k-button>
<k-button variant="secondary">Secondary</k-button>
<k-button variant="danger">Danger</k-button>

<!-- All sizes -->
<k-button size="sm">Small</k-button>
<k-button size="md">Medium</k-button>
<k-button size="lg">Large</k-button>

<!-- All animations -->
<k-button animation="pulse">Pulse</k-button>
<k-button animation="bounce">Bounce</k-button>
<k-button animation="fade">Fade</k-button>
<k-button animation="scale">Scale</k-button>
<k-button animation="shake">Shake</k-button>
<k-button animation="glow">Glow</k-button>
<k-button animation="slide">Slide</k-button>
<k-button animation="rotate">Rotate</k-button>
<k-button animation="flip">Flip</k-button>
\`\`\`

### Event Handling

\`\`\`javascript
const button = document.querySelector('k-button');
button.addEventListener('click', (e) => {
  console.log('Button clicked!');
});
\`\`\`

### Programmatic Attribute Changes

\`\`\`javascript
const button = document.querySelector('k-button');
button.setAttribute('variant', 'danger');
button.setAttribute('disabled', '');
button.removeAttribute('disabled');
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
    children: 'React Button',
  },
  parameters: {
    docs: {
      description: {
        story: `
## React Implementation

\`\`\`tsx
import { KButton } from '@kenikool/react';

// Basic button
<KButton variant="primary" size="md">Click me</KButton>

// Button with animation
<KButton variant="primary" animation="pulse">Important</KButton>

// Disabled button
<KButton disabled>Disabled</KButton>

// All variants
<KButton variant="primary">Primary</KButton>
<KButton variant="secondary">Secondary</KButton>
<KButton variant="danger">Danger</KButton>

// All sizes
<KButton size="sm">Small</KButton>
<KButton size="md">Medium</KButton>
<KButton size="lg">Large</KButton>

// All animations
<KButton animation="pulse">Pulse</KButton>
<KButton animation="bounce">Bounce</KButton>
<KButton animation="fade">Fade</KButton>
<KButton animation="scale">Scale</KButton>
<KButton animation="shake">Shake</KButton>
<KButton animation="glow">Glow</KButton>
<KButton animation="slide">Slide</KButton>
<KButton animation="rotate">Rotate</KButton>
<KButton animation="flip">Flip</KButton>
\`\`\`

### Event Handling

\`\`\`tsx
<KButton onClick={(e) => console.log('Clicked!')}>
  Click me
</KButton>
\`\`\`

### Custom Styling

\`\`\`tsx
<KButton className="shadow-lg hover:shadow-xl">
  Custom Styled
</KButton>
\`\`\`

### Form Integration

\`\`\`tsx
<form onSubmit={handleSubmit}>
  <KButton type="submit">Submit</KButton>
  <KButton type="reset">Reset</KButton>
</form>
\`\`\`
        `,
      },
    },
  },
};
