/**
 * k-button Web Component
 *
 * A customizable button component with support for variants, sizes, and animations.
 *
 * @example
 * <k-button variant="primary" size="md">Click me</k-button>
 */

export class KButton extends HTMLElement {
  private _variant: string = 'primary';
  private _size: string = 'md';
  private _disabled: boolean = false;
  private _animation: string = 'none';
  private _mutationObserver: MutationObserver | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();

    // Watch for all attribute changes including data-* attributes
    this._mutationObserver = new MutationObserver(() => {
      this.render();
    });

    this._mutationObserver.observe(this, {
      attributes: true,
    });

    // Setup keyboard event listeners
    this.setupKeyboardListeners();
  }

  disconnectedCallback() {
    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
    }
  }

  private setupKeyboardListeners() {
    const button = this.shadowRoot?.querySelector('button');
    if (!button) return;

    // Handle Enter and Space key presses for keyboard navigation
    button.addEventListener('keydown', (e: KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !this._disabled) {
        e.preventDefault();
        button.click();
      }
    });
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.updateAttribute(name, newValue);
      this.render();
    }
  }

  private updateAttribute(name: string, value: string) {
    switch (name) {
      case 'variant':
        this._variant = value || 'primary';
        break;
      case 'size':
        this._size = value || 'md';
        break;
      case 'disabled':
        this._disabled = value !== null;
        break;
      case 'animation':
        this._animation = value || 'none';
        break;
    }
  }

  private render() {
    const classes = this.getClasses();
    const styles = this.getStyles();
    const attributes = this.getButtonAttributes();

    const attributesStr = attributes ? ` ${attributes}` : '';
    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <button class="${classes}"${attributesStr}>
        <slot></slot>
      </button>
    `;
  }

  private getButtonAttributes(): string {
    const attrs: string[] = [];

    if (this._disabled) {
      attrs.push('disabled');
      attrs.push('aria-disabled="true"');
    } else {
      attrs.push('aria-disabled="false"');
    }

    // Add role attribute for accessibility
    attrs.push('role="button"');

    // Pass through type attribute
    const type = this.getAttribute('type');
    if (type) {
      attrs.push(`type="${type}"`);
    }

    // Pass through aria-label attribute
    const ariaLabel = this.getAttribute('aria-label');
    if (ariaLabel) {
      attrs.push(`aria-label="${ariaLabel}"`);
    }

    // Pass through aria-pressed attribute for toggle buttons
    const ariaPressed = this.getAttribute('aria-pressed');
    if (ariaPressed !== null) {
      attrs.push(`aria-pressed="${ariaPressed}"`);
    }

    // Pass through data-* attributes
    for (let i = 0; i < this.attributes.length; i++) {
      const attr = this.attributes[i];
      if (attr.name.startsWith('data-')) {
        // Escape quotes in attribute values
        const escapedValue = attr.value.replace(/"/g, '&quot;');
        attrs.push(`${attr.name}="${escapedValue}"`);
      }
    }

    return attrs.length > 0 ? attrs.join(' ') : '';
  }

  private getClasses(): string {
    const classes = ['k-button', `k-button--${this._variant}`, `k-button--${this._size}`];

    if (this._animation !== 'none') {
      classes.push(`k-button--${this._animation}`);
    }

    if (this._disabled) {
      classes.push('k-button--disabled');
    }

    return classes.join(' ');
  }

  private getStyles(): string {
    return `
      :host {
        --color-primary: #1e40af;
        --color-primary-dark: #1e3a8a;
        --color-secondary: #4b5563;
        --color-secondary-dark: #2d3748;
        --color-danger: #b91c1c;
        --color-danger-dark: #7f1d1d;
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

      button {
        font-family: inherit;
        border: none;
        border-radius: 0.5rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease-out;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      button:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }

      button:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }

      .k-button--primary {
        background-color: var(--color-primary);
        color: white;
      }

      .k-button--primary:hover:not(:disabled) {
        background-color: var(--color-primary-dark);
      }

      .k-button--primary:focus-visible {
        outline: 2px solid var(--color-primary-dark);
        outline-offset: 2px;
      }

      .k-button--secondary {
        background-color: var(--color-secondary);
        color: white;
      }

      .k-button--secondary:hover:not(:disabled) {
        background-color: var(--color-secondary-dark);
      }

      .k-button--secondary:focus-visible {
        outline: 2px solid var(--color-secondary-dark);
        outline-offset: 2px;
      }

      .k-button--danger {
        background-color: var(--color-danger);
        color: white;
      }

      .k-button--danger:hover:not(:disabled) {
        background-color: var(--color-danger-dark);
      }

      .k-button--danger:focus-visible {
        outline: 2px solid var(--color-danger-dark);
        outline-offset: 2px;
      }

      .k-button--sm {
        padding: 0.5rem 0.75rem;
        font-size: 0.75rem;
      }

      .k-button--md {
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
      }

      .k-button--lg {
        padding: 1rem 1.5rem;
        font-size: 1rem;
      }

      .k-button--disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .k-button--pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      .k-button--bounce {
        animation: bounce 0.5s ease-out;
      }

      .k-button--bounce:hover {
        animation: bounce 0.5s ease-out;
      }

      .k-button--fade {
        animation: fade 0.3s ease-out;
      }

      .k-button--scale:hover {
        animation: scale 0.3s ease-out forwards;
      }

      .k-button--shake:active {
        animation: shake 0.3s ease-out;
      }

      .k-button--glow {
        animation: glow 2s ease-in-out infinite;
      }

      .k-button--slide {
        animation: slide 0.3s ease-out;
      }

      .k-button--rotate {
        animation: rotate 1s linear infinite;
      }

      .k-button--flip {
        animation: flip 0.6s ease-out;
      }

      @media (prefers-reduced-motion: reduce) {
        button {
          animation: none !important;
          transition: none !important;
        }
      }
    `;
  }

  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'animation', 'type', 'aria-label', 'aria-pressed'];
  }

  focus() {
    const button = this.shadowRoot?.querySelector('button');
    if (button) {
      button.focus();
    }
  }

  blur() {
    const button = this.shadowRoot?.querySelector('button');
    if (button) {
      button.blur();
    }
  }
}

customElements.define('k-button', KButton);
