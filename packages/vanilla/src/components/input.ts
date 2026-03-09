/**
 * k-input Web Component
 *
 * A customizable input component with support for sizes, error states, and focus styling.
 *
 * @example
 * <k-input size="md" placeholder="Enter text"></k-input>
 */

export class KInput extends HTMLElement {
  private _size: string = 'md';
  private _disabled: boolean = false;
  private _error: boolean = false;
  private _placeholder: string = '';
  private _value: string = '';
  private _animation: string = 'none';
  private _inputElement: HTMLInputElement | null = null;
  private _mutationObserver: MutationObserver | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();

    // Watch for all attribute changes including data-* attributes
    this._mutationObserver = new MutationObserver(() => {
      this.render();
    });

    this._mutationObserver.observe(this, {
      attributes: true,
    });
  }

  disconnectedCallback() {
    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.updateAttribute(name, newValue);
      this.render();
    }
  }

  private updateAttribute(name: string, value: string | null) {
    switch (name) {
      case 'size':
        this._size = value || 'md';
        break;
      case 'disabled':
        this._disabled = value !== null;
        break;
      case 'error':
        this._error = value !== null;
        break;
      case 'placeholder':
        this._placeholder = value || '';
        break;
      case 'value':
        this._value = value || '';
        break;
      case 'animation':
        this._animation = value || 'none';
        break;
    }
  }

  private render() {
    const classes = this.getClasses();
    const styles = this.getStyles();
    const attributes = this.getInputAttributes();

    const attributesStr = attributes ? ` ${attributes}` : '';
    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <input 
        class="${classes}" 
        type="text"
        placeholder="${this._placeholder}"
        value="${this._value}"
        ${this._disabled ? 'disabled' : ''}${attributesStr}
      />
    `;

    this._inputElement = this.shadowRoot!.querySelector('input');
    this.setupEventListeners();
  }

  private getInputAttributes(): string {
    const attrs: string[] = [];

    // Add aria-invalid for error state
    if (this._error) {
      attrs.push('aria-invalid="true"');
    } else {
      attrs.push('aria-invalid="false"');
    }

    // Pass through name attribute
    const name = this.getAttribute('name');
    if (name) {
      attrs.push(`name="${name}"`);
    }

    // Pass through id attribute
    const id = this.getAttribute('id');
    if (id) {
      attrs.push(`id="${id}"`);
    }

    // Pass through aria-label attribute
    const ariaLabel = this.getAttribute('aria-label');
    if (ariaLabel) {
      attrs.push(`aria-label="${ariaLabel}"`);
    }

    // Pass through aria-describedby for error messages
    const ariaDescribedBy = this.getAttribute('aria-describedby');
    if (ariaDescribedBy) {
      attrs.push(`aria-describedby="${ariaDescribedBy}"`);
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

  private setupEventListeners() {
    if (!this._inputElement) return;

    this._inputElement.addEventListener('change', (e) => {
      this._value = this._inputElement!.value;
      this.dispatchEvent(new Event('change', { bubbles: true }));
    });

    this._inputElement.addEventListener('input', (e) => {
      this._value = this._inputElement!.value;
      this.dispatchEvent(new Event('input', { bubbles: true }));
    });

    // Handle keyboard navigation (Tab is handled by browser by default)
    this._inputElement.addEventListener('keydown', (e: KeyboardEvent) => {
      // Allow standard keyboard navigation
      if (e.key === 'Tab') {
        // Tab navigation is handled by browser
        return;
      }
      // Allow Enter key for form submission
      if (e.key === 'Enter') {
        this.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      }
    });

    // Handle focus for focus management
    this._inputElement.addEventListener('focus', () => {
      this.dispatchEvent(new Event('focus', { bubbles: true }));
    });

    this._inputElement.addEventListener('blur', () => {
      this.dispatchEvent(new Event('blur', { bubbles: true }));
    });
  }

  private getClasses(): string {
    const classes = ['k-input', `k-input--${this._size}`];

    if (this._error) {
      classes.push('k-input--error');
    }

    if (this._disabled) {
      classes.push('k-input--disabled');
    }

    if (this._animation !== 'none') {
      classes.push(`k-input--${this._animation}`);
    }

    return classes.join(' ');
  }

  private getStyles(): string {
    return `
      :host {
        --color-primary: #1e40af;
        --color-border: #d1d5db;
        --color-error: #b91c1c;
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

      input {
        font-family: inherit;
        border: 1px solid var(--color-border);
        border-radius: 0.375rem;
        font-size: inherit;
        transition: all 0.2s ease-out;
        width: 100%;
        box-sizing: border-box;
      }

      input:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      input:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .k-input--sm {
        padding: 0.5rem 0.75rem;
        font-size: 0.75rem;
      }

      .k-input--md {
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
      }

      .k-input--lg {
        padding: 1rem 1.5rem;
        font-size: 1rem;
      }

      .k-input--error {
        border-color: var(--color-error);
      }

      .k-input--error:focus {
        border-color: var(--color-error);
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }

      .k-input--error:focus-visible {
        outline: 2px solid var(--color-error);
        outline-offset: 2px;
        border-color: var(--color-error);
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }

      .k-input--disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .k-input--pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      .k-input--bounce {
        animation: bounce 0.5s ease-out;
      }

      .k-input--fade {
        animation: fade 0.3s ease-out;
      }

      .k-input--scale {
        animation: scale 0.3s ease-out;
      }

      .k-input--shake {
        animation: shake 0.3s ease-out;
      }

      .k-input--glow {
        animation: glow 2s ease-in-out infinite;
      }

      .k-input--slide {
        animation: slide 0.3s ease-out;
      }

      .k-input--rotate {
        animation: rotate 1s linear infinite;
      }

      .k-input--flip {
        animation: flip 0.6s ease-out;
      }

      @media (prefers-reduced-motion: reduce) {
        input {
          transition: none !important;
          animation: none !important;
        }
      }
    `;
  }

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    if (this._inputElement) {
      this._inputElement.value = val;
    }
  }

  focus() {
    if (this._inputElement) {
      this._inputElement.focus();
    }
  }

  blur() {
    if (this._inputElement) {
      this._inputElement.blur();
    }
  }

  static get observedAttributes() {
    return [
      'size',
      'disabled',
      'error',
      'placeholder',
      'value',
      'animation',
      'aria-label',
      'aria-describedby',
    ];
  }
}

customElements.define('k-input', KInput);
