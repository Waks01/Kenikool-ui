import type { StorybookConfig } from '@storybook/react';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.ts', '../stories/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    './theme-addon/register.ts',
  ],
  framework: {
    name: '@storybook/react',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
