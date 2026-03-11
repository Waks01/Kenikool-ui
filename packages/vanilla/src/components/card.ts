/**
 * k-card Web Component
 *
 * A customizable card component with support for padding and shadow variants.
 *
 * @example
 * // Using unified design attribute (recommended)
 * <k-card design="p:md sh:lg a:fade">
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </k-card>
 *
 * @example
 * // Using individual attributes (deprecated)
 * <k-card padding="md" shadow="lg" animation="fade">
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </k-card>
 */

import { parseDesign } from '@kenikool/core';

export class KCard extends HTMLElement {
  private _design: string = '';
  private _padding: string = 'md';
  private _shadow: string = 'md';
  private _animation: string = 'none';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Read design attribute on initial connection
    const design = this.getAttribute('design');
    if (design) {
      this._design = design;
      this.parseDesignTokens();
    }

    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.updateAttribute(name, newValue);
      this.render();
    }
  }

  private updateAttribute(name: string, value: string) {
    switch (name) {
      case 'design':
        this._design = value || '';
        this.parseDesignTokens();
        break;
      case 'padding':
        this._padding = value || 'md';
        break;
      case 'shadow':
        this._shadow = value || 'md';
        break;
      case 'animation':
        this._animation = value || 'none';
        break;
    }
  }

  private parseDesignTokens() {
    if (!this._design) return;

    const tokens = parseDesign(this._design);
    if (tokens.padding) this._padding = tokens.padding;
    if (tokens.shadow) this._shadow = tokens.shadow;
    if (tokens.animation) this._animation = tokens.animation;

    // Warn about deprecated attributes if design is used
    if (
      this.hasAttribute('padding') ||
      this.hasAttribute('shadow') ||
      this.hasAttribute('animation')
    ) {
      console.warn(
        'k-card: Using individual attributes (padding, shadow, animation) is deprecated. Use the design attribute instead. Example: design="p:md sh:lg a:fade"'
      );
    }
  }

  private render() {
    const classes = this.getClasses();
    const styles = this.getStyles();

    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <div class="${classes}">
        <slot></slot>
      </div>
    `;
  }

  private getClasses(): string {
    const classes = [
      'k-card',
      `k-card--padding-${this._padding}`,
      `k-card--shadow-${this._shadow}`,
    ];

    if (this._animation !== 'none') {
      classes.push(`k-card--${this._animation}`);
    }

    return classes.join(' ');
  }

  private getStyles(): string {
    return `
      :host {
        --color-bg: #ffffff;
        --color-text: #1f2937;
        --color-border: #e5e7eb;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      @keyframes fade {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes scale {
        from {
          transform: scale(1);
        }
        to {
          transform: scale(1.05);
        }
      }

      @keyframes shake {
        0%, 100% {
          transform: translateX(0);
        }
        25% {
          transform: translateX(-5px);
        }
        75% {
          transform: translateX(5px);
        }
      }

      @keyframes glow {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.7;
          transform: scale(1.05);
        }
      }

      @keyframes slide {
        from {
          transform: translateX(-100%);
        }
        to {
          transform: translateX(0);
        }
      }

      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes flip {
        from {
          transform: rotateY(0deg);
        }
        to {
          transform: rotateY(360deg);
        }
      }

      div {
        background-color: var(--color-bg);
        color: var(--color-text);
        border-radius: 0.5rem;
        border: 1px solid var(--color-border);
        transition: all 0.2s ease-out;
      }

      .k-card--padding-sm {
        padding: 0.75rem;
      }

      .k-card--padding-md {
        padding: 1rem;
      }

      .k-card--padding-lg {
        padding: 1.5rem;
      }

      .k-card--shadow-none {
        box-shadow: none;
      }

      .k-card--shadow-sm {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      }

      .k-card--shadow-md {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }

      .k-card--shadow-lg {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }

      .k-card--pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      .k-card--bounce {
        animation: bounce 0.5s ease-out;
      }

      .k-card--fade {
        animation: fade 0.3s ease-out;
      }

      .k-card--scale {
        animation: scale 0.3s ease-out;
      }

      .k-card--shake {
        animation: shake 0.3s ease-out;
      }

      .k-card--glow {
        animation: glow 2s ease-in-out infinite;
      }

      .k-card--slide {
        animation: slide 0.3s ease-out;
      }

      .k-card--rotate {
        animation: rotate 1s linear infinite;
      }

      .k-card--flip {
        animation: flip 0.6s ease-out;
      }

      @media (prefers-reduced-motion: reduce) {
        div {
          animation: none !important;
          transition: none !important;
        }
      }
    `;
  }

  static get observedAttributes() {
    return ['design', 'padding', 'shadow', 'animation'];
  }
}
