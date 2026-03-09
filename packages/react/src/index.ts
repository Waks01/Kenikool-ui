/**
 * Kenikool UI - React Components
 *
 * This package provides production-ready React components for building user interfaces.
 * All components are fully typed with TypeScript, support all standard React patterns,
 * and include comprehensive accessibility features.
 *
 * @packageDocumentation
 *
 * @example
 * // Import components
 * import { KButton, KInput, KCard } from '@kenikool/react';
 *
 * // Use in your React app
 * export function App() {
 *   return (
 *     <KCard padding="md" shadow="lg">
 *       <h1>Welcome</h1>
 *       <KInput placeholder="Enter your name" />
 *       <KButton variant="primary">Submit</KButton>
 *     </KCard>
 *   );
 * }
 *
 * @see {@link https://kenikool-ui.dev} Kenikool UI Documentation
 * @see {@link https://kenikool-ui.dev/docs/react} React Components Guide
 */

// Export components
export { KButton } from './components/Button';
export { KInput } from './components/Input';
export { KCard } from './components/Card';

// Export types
export type { KButtonProps } from './components/Button';
export type { KInputProps } from './components/Input';
export type { KCardProps } from './components/Card';

// Re-export types and utilities from core
export * from '@kenikool/core';
