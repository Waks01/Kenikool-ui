import type { Preview } from "@storybook/react";
import "../../tailwind.css";

// Initialize theme from localStorage or system preference
const initializeTheme = () => {
  const stored = localStorage.getItem('kenikool-theme');
  const theme = stored === 'light' || stored === 'dark' 
    ? stored 
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', theme);
};

// Initialize theme on load
if (typeof window !== 'undefined') {
  initializeTheme();
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
  decorators: [
    (Story) => {
      // Apply theme to story container
      const theme = document.documentElement.getAttribute('data-theme') || 'light';
      
      return (
        <div 
          style={{ 
            padding: "20px",
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
            transition: 'background-color 0.2s ease, color 0.2s ease',
            minHeight: '100vh',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
