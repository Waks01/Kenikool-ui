import type { Meta, StoryObj } from '@storybook/react';
import { KInput } from '@kenikool/react';
import React from 'react';

/**
 * Input component stories for Kenikool UI
 *
 * Demonstrates all sizes, states, and animations
 * with interactive controls for all props.
 */
const meta: Meta<typeof KInput> = {
  component: KInput,
  title: 'Components/Input',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable input component with multiple sizes, states, and animations.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'HTML input type',
      table: {
        type: { summary: 'text | email | password | number | tel | url' },
        defaultValue: { summary: 'text' },
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
      description: 'Animation effect applied to the input',
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
    value: {
      control: 'text',
      description: 'Input value (controlled component)',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Change event handler',
      table: {
        type: { summary: '(e: React.ChangeEvent<HTMLInputElement>) => void' },
      },
    },
  },
  args: {
    size: 'md',
    disabled: false,
    error: false,
    placeholder: 'Enter text...',
    type: 'text',
    animation: 'none',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// SIZE STORIES
// ============================================================================

/**
 * Small size input
 */
export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small input with reduced padding and font size (8px padding, 12px font).',
      },
    },
  },
};

/**
 * Medium size input (default)
 */
export const Medium: Story = {
  args: {
    size: 'md',
    placeholder: 'Medium input',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Medium input with standard padding and font size (12px padding, 14px font). This is the default size.',
      },
    },
  },
};

/**
 * Large size input
 */
export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large input with increased padding and font size (16px padding, 16px font).',
      },
    },
  },
};

// ============================================================================
// STATE STORIES
// ============================================================================

/**
 * Focus state - Input with focus styling
 */
export const Focus: Story = {
  args: {
    placeholder: 'Click to focus',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Input with focus styling applied. When focused, the border color changes and a shadow effect is applied.',
      },
    },
  },
  render: (args) => {
    const ref = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
      ref.current?.focus();
    }, []);
    return <KInput {...args} ref={ref} />;
  },
};

/**
 * Error state - Input with error styling
 */
export const Error: Story = {
  args: {
    error: true,
    placeholder: 'Error input',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Input with error state applied. Shows red border and error text color to indicate validation failure.',
      },
    },
  },
};

/**
 * Disabled state - Input is disabled and cannot be interacted with
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Disabled input with reduced opacity and cursor set to not-allowed. Cannot be edited.',
      },
    },
  },
};

/**
 * Placeholder story - Input with placeholder text
 */
export const Placeholder: Story = {
  args: {
    placeholder: 'This is a placeholder',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Input with placeholder text displayed when the input is empty. Placeholder disappears when user starts typing.',
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
    placeholder: 'Pulsing input',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Input with continuous pulsing animation. Useful for drawing attention to important form fields.',
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
    placeholder: 'Fading input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with fade-in animation on mount. Smooth entrance effect.',
      },
    },
  },
};

/**
 * Scale animation - Scale transformation
 */
export const AnimationScale: Story = {
  args: {
    animation: 'scale',
    placeholder: 'Scaling input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with scale animation. Grows slightly for emphasis.',
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
    placeholder: 'Glowing input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with glowing animation. Creates a pulsing glow effect around the input.',
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
    placeholder: 'Sliding input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with slide animation on mount. Slides in from the left.',
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
    placeholder: 'Static input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input without any animation. This is the default state.',
      },
    },
  },
};

// ============================================================================
// INPUT TYPE STORIES
// ============================================================================

/**
 * Email input type
 */
export const EmailInput: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with type="email" for email address entry with browser validation.',
      },
    },
  },
};

/**
 * Password input type
 */
export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with type="password" for secure password entry with masked characters.',
      },
    },
  },
};

/**
 * Number input type
 */
export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter a number',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with type="number" for numeric entry with spinner controls.',
      },
    },
  },
};

// ============================================================================
// CONTROLLED COMPONENT STORY
// ============================================================================

/**
 * Controlled component - Input with React state management
 */
export const ControlledComponent: Story = {
  args: {
    placeholder: 'Type something...',
  },
  parameters: {
    docs: {
      description: {
        story: `
## Controlled Component Example

This input is controlled by React state. The value is managed by the parent component.

\`\`\`tsx
import { useState } from 'react';
import { KInput } from '@kenikool/react';

export function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <KInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type something..."
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  render: (args) => {
    const [value, setValue] = React.useState('');
    return (
      <div>
        <KInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Current value: {value || '(empty)'}
        </p>
      </div>
    );
  },
};

// ============================================================================
// COMBINATION STORIES
// ============================================================================

/**
 * Large input with error state
 */
export const LargeWithError: Story = {
  args: {
    size: 'lg',
    error: true,
    placeholder: 'Invalid input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large input with error state for prominent validation feedback.',
      },
    },
  },
};

/**
 * Small input with glow animation
 */
export const SmallWithGlow: Story = {
  args: {
    size: 'sm',
    animation: 'glow',
    placeholder: 'Glowing small input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small input with glow animation for emphasis.',
      },
    },
  },
};

/**
 * Email input with fade animation
 */
export const EmailWithFade: Story = {
  args: {
    type: 'email',
    animation: 'fade',
    placeholder: 'your@email.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input with fade animation for smooth entrance.',
      },
    },
  },
};

// ============================================================================
// CUSTOM STYLING STORY
// ============================================================================

/**
 * Custom className - Input with custom CSS classes merged with default styles
 */
export const CustomClassName: Story = {
  args: {
    placeholder: 'Custom styled input',
    className: 'shadow-lg focus:shadow-xl',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Input with custom CSS classes merged with default styles. Custom classes are applied without breaking component functionality.',
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
    placeholder: 'Vanilla input',
  },
  parameters: {
    docs: {
      description: {
        story: `
## Vanilla JavaScript Implementation

\`\`\`html
<!-- Basic input -->
<k-input size="md" placeholder="Enter text"></k-input>

<!-- Input with error state -->
<k-input error placeholder="Invalid input"></k-input>

<!-- Disabled input -->
<k-input disabled placeholder="Disabled"></k-input>

<!-- All sizes -->
<k-input size="sm" placeholder="Small"></k-input>
<k-input size="md" placeholder="Medium"></k-input>
<k-input size="lg" placeholder="Large"></k-input>

<!-- Different input types -->
<k-input type="email" placeholder="your@email.com"></k-input>
<k-input type="password" placeholder="Password"></k-input>
<k-input type="number" placeholder="Enter a number"></k-input>

<!-- With animation -->
<k-input animation="pulse" placeholder="Pulsing"></k-input>
<k-input animation="glow" placeholder="Glowing"></k-input>
<k-input animation="fade" placeholder="Fading"></k-input>
\`\`\`

### Event Handling

\`\`\`javascript
const input = document.querySelector('k-input');
input.addEventListener('change', (e) => {
  console.log('Input value:', e.target.value);
});

input.addEventListener('input', (e) => {
  console.log('Current value:', e.target.value);
});
\`\`\`

### Programmatic Access

\`\`\`javascript
const input = document.querySelector('k-input');

// Get value
const value = input.value;

// Set value
input.value = 'New value';

// Set attributes
input.setAttribute('error', '');
input.setAttribute('disabled', '');
input.removeAttribute('error');
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
    placeholder: 'React input',
  },
  parameters: {
    docs: {
      description: {
        story: `
## React Implementation

\`\`\`tsx
import { KInput } from '@kenikool/react';

// Basic input
<KInput size="md" placeholder="Enter text" />

// Input with error state
<KInput error placeholder="Invalid input" />

// Disabled input
<KInput disabled placeholder="Disabled" />

// All sizes
<KInput size="sm" placeholder="Small" />
<KInput size="md" placeholder="Medium" />
<KInput size="lg" placeholder="Large" />

// Different input types
<KInput type="email" placeholder="your@email.com" />
<KInput type="password" placeholder="Password" />
<KInput type="number" placeholder="Enter a number" />

// With animation
<KInput animation="pulse" placeholder="Pulsing" />
<KInput animation="glow" placeholder="Glowing" />
<KInput animation="fade" placeholder="Fading" />
\`\`\`

### Uncontrolled Component

\`\`\`tsx
import { useRef } from 'react';
import { KInput } from '@kenikool/react';

export function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    console.log('Input value:', inputRef.current?.value);
  };

  return (
    <>
      <KInput ref={inputRef} placeholder="Enter text" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
\`\`\`

### Controlled Component

\`\`\`tsx
import { useState } from 'react';
import { KInput } from '@kenikool/react';

export function ControlledInput() {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setError(newValue.length < 3);
  };

  return (
    <KInput
      value={value}
      onChange={handleChange}
      error={error}
      placeholder="Enter at least 3 characters"
    />
  );
}
\`\`\`

### Form Integration

\`\`\`tsx
import { useState } from 'react';
import { KInput } from '@kenikool/react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <KInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <KInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
\`\`\`
        `,
      },
    },
  },
};
