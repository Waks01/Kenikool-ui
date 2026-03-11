import type { Meta, StoryObj } from '@storybook/react';
import { KButton } from '@kenikool/react';

const meta: Meta<typeof KButton> = {
  component: KButton,
  title: 'Components/Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable button component with 10 variants, 3 sizes, 9 animations, and 18 loading spinners.',
      },
    },
  },
  argTypes: {
    design: {
      control: 'text',
      description: 'Unified design tokens (e.g., "v:primary s:md a:pulse l:dots")',
    },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'danger',
        'success',
        'warning',
        'info',
        'ghost',
        'link',
        'gradient',
        'outline',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
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
    },
    loading: {
      control: 'boolean',
    },
    loadingSpinner: {
      control: 'select',
      options: [
        'spinner',
        'dots',
        'pulse',
        'bars',
        'ring',
        'dual-ring',
        'ripple',
        'wave',
        'skeleton',
        'shimmer',
        'orbit',
        'bounce',
        'flip',
        'morph',
        'gradient-spin',
        'dots-wave',
        'progress',
        'hourglass',
      ],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    animation: 'none',
    disabled: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Variants
export const Primary: Story = {
  args: { design: 'v:primary s:md', children: 'Primary' },
};

export const Secondary: Story = {
  args: { design: 'v:secondary s:md', children: 'Secondary' },
};

export const Danger: Story = {
  args: { design: 'v:danger s:md', children: 'Danger' },
};

export const Success: Story = {
  args: { design: 'v:success s:md', children: 'Success' },
};

export const Warning: Story = {
  args: { design: 'v:warning s:md', children: 'Warning' },
};

export const Info: Story = {
  args: { design: 'v:info s:md', children: 'Info' },
};

export const Ghost: Story = {
  args: { design: 'v:ghost s:md', children: 'Ghost' },
};

export const Link: Story = {
  args: { design: 'v:link s:md', children: 'Link' },
};

export const Gradient: Story = {
  args: { design: 'v:gradient s:md', children: 'Gradient' },
};

export const Outline: Story = {
  args: { design: 'v:outline s:md', children: 'Outline' },
};

// Sizes
export const Small: Story = {
  args: { design: 'v:primary s:sm', children: 'Small' },
};

export const Medium: Story = {
  args: { design: 'v:primary s:md', children: 'Medium' },
};

export const Large: Story = {
  args: { design: 'v:primary s:lg', children: 'Large' },
};

// Animations
export const AnimationPulse: Story = {
  args: { design: 'v:primary s:md a:pulse', children: 'Pulse' },
};

export const AnimationBounce: Story = {
  args: { design: 'v:primary s:md a:bounce', children: 'Bounce' },
};

export const AnimationFade: Story = {
  args: { design: 'v:primary s:md a:fade', children: 'Fade' },
};

export const AnimationScale: Story = {
  args: { design: 'v:primary s:md a:scale', children: 'Scale' },
};

export const AnimationShake: Story = {
  args: { design: 'v:primary s:md a:shake', children: 'Shake' },
};

export const AnimationGlow: Story = {
  args: { design: 'v:primary s:md a:glow', children: 'Glow' },
};

export const AnimationSlide: Story = {
  args: { design: 'v:primary s:md a:slide', children: 'Slide' },
};

export const AnimationRotate: Story = {
  args: { design: 'v:primary s:md a:rotate', children: 'Rotate' },
};

export const AnimationFlip: Story = {
  args: { design: 'v:primary s:md a:flip', children: 'Flip' },
};

// Loading Spinners
export const LoadingSpinner: Story = {
  args: { design: 'v:primary s:md l:spinner', loading: true, children: 'Loading' },
};

export const LoadingDots: Story = {
  args: { design: 'v:primary s:md l:dots', loading: true, children: 'Loading' },
};

export const LoadingPulse: Story = {
  args: { design: 'v:primary s:md l:pulse', loading: true, children: 'Loading' },
};

export const LoadingBars: Story = {
  args: { design: 'v:primary s:md l:bars', loading: true, children: 'Loading' },
};

export const LoadingRing: Story = {
  args: { design: 'v:primary s:md l:ring', loading: true, children: 'Loading' },
};

export const LoadingDualRing: Story = {
  args: { design: 'v:primary s:md l:dual-ring', loading: true, children: 'Loading' },
};

export const LoadingRipple: Story = {
  args: { design: 'v:primary s:md l:ripple', loading: true, children: 'Loading' },
};

export const LoadingWave: Story = {
  args: { design: 'v:primary s:md l:wave', loading: true, children: 'Loading' },
};

export const LoadingSkeleton: Story = {
  args: { design: 'v:primary s:md l:skeleton', loading: true, children: 'Loading' },
};

export const LoadingShimmer: Story = {
  args: { design: 'v:primary s:md l:shimmer', loading: true, children: 'Loading' },
};

export const LoadingOrbit: Story = {
  args: { design: 'v:primary s:md l:orbit', loading: true, children: 'Loading' },
};

export const LoadingBounce: Story = {
  args: { design: 'v:primary s:md l:bounce', loading: true, children: 'Loading' },
};

export const LoadingFlip: Story = {
  args: { design: 'v:primary s:md l:flip', loading: true, children: 'Loading' },
};

export const LoadingMorph: Story = {
  args: { design: 'v:primary s:md l:morph', loading: true, children: 'Loading' },
};

export const LoadingGradientSpin: Story = {
  args: { design: 'v:primary s:md l:gradient-spin', loading: true, children: 'Loading' },
};

export const LoadingDotsWave: Story = {
  args: { design: 'v:primary s:md l:dots-wave', loading: true, children: 'Loading' },
};

export const LoadingProgress: Story = {
  args: { design: 'v:primary s:md l:progress', loading: true, children: 'Loading' },
};

export const LoadingHourglass: Story = {
  args: { design: 'v:primary s:md l:hourglass', loading: true, children: 'Loading' },
};

// States
export const Disabled: Story = {
  args: { design: 'v:primary s:md', disabled: true, children: 'Disabled' },
};

export const Combined: Story = {
  args: { design: 'v:success s:lg a:pulse', children: 'Success with Pulse' },
};
