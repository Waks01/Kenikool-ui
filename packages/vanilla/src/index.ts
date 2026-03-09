/**
 * Kenikool UI - Vanilla JavaScript Web Components
 *
 * This package provides Web Components for vanilla JavaScript applications.
 * Components are registered with the 'k-' prefix (e.g., k-button, k-input, k-card).
 */

// Import and register components
import "./components/button";
import "./components/input";
import "./components/card";

// Export component classes for advanced usage
export { KButton } from "./components/button";
export { KInput } from "./components/input";
export { KCard } from "./components/card";

// Re-export types and utilities from core
export * from "@kenikool/core";
