/**
 * k-button Web Component
 *
 * A customizable button component with support for variants, sizes, and animations.
 *
 * @example
 * // Using unified design attribute (recommended)
 * <k-button design="v:primary s:md a:pulse">Click me</k-button>
 *
 * @example
 * // Using individual attributes (deprecated)
 * <k-button variant="primary" size="md" animation="pulse">Click me</k-button>
 */

import { parseDesign } from '@kenikool/core';

export class KButton extends HTMLElement {
  private _design: string = '';
  private _variant: string = 'primary';
  private _size: string = 'md';
  private _disabled: boolean = false;
  private _animation: string = 'none';
  private _loading: boolean = false;
  private _loadingSpinner: string = 'spinner';
  private _mutationObserver: MutationObserver | null = null;

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
      case 'design':
        this._design = value || '';
        this.parseDesignTokens();
        break;
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
      case 'loading':
        this._loading = value !== null;
        break;
      case 'loading-spinner':
        this._loadingSpinner = value || 'spinner';
        break;
    }
  }

  private parseDesignTokens() {
    if (!this._design) return;

    const tokens = parseDesign(this._design);
    if (tokens.variant) this._variant = tokens.variant;
    if (tokens.size) this._size = tokens.size;
    if (tokens.animation) this._animation = tokens.animation;
    if (tokens.loading) this._loadingSpinner = tokens.loading;

    // Warn about deprecated attributes if design is used
    if (
      this.hasAttribute('variant') ||
      this.hasAttribute('size') ||
      this.hasAttribute('animation') ||
      this.hasAttribute('loading-spinner')
    ) {
      console.warn(
        'k-button: Using individual attributes (variant, size, animation, loading-spinner) is deprecated. Use the design attribute instead. Example: design="v:primary s:md a:pulse l:dots"'
      );
    }
  }

  private render() {
    const classes = this.getClasses();
    const styles = this.getStyles();
    const attributes = this.getButtonAttributes();

    const attributesStr = attributes ? ` ${attributes}` : '';
    const content = this._loading
      ? `<span class="k-button__spinner k-button__spinner--${this._loadingSpinner}"></span>`
      : '<slot></slot>';

    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <button class="${classes}"${attributesStr}>
        ${content}
      </button>
    `;
  }

  private getButtonAttributes(): string {
    const attrs: string[] = [];

    if (this._disabled || this._loading) {
      attrs.push('disabled');
      attrs.push('aria-disabled="true"');
    } else {
      attrs.push('aria-disabled="false"');
    }

    if (this._loading) {
      attrs.push('aria-busy="true"');
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
        --color-primary: #3b82f6;
        --color-primary-dark: #1e40af;
        --color-secondary: #6b7280;
        --color-secondary-dark: #374151;
        --color-danger: #ef4444;
        --color-danger-dark: #dc2626;
        --color-success: #10b981;
        --color-success-dark: #059669;
        --color-warning: #f59e0b;
        --color-warning-dark: #d97706;
        --color-info: #0ea5e9;
        --color-info-dark: #0284c7;
      }

      @keyframes spinner {
        to { transform: rotate(360deg); }
      }

      @keyframes dots {
        0%, 80%, 100% { opacity: 0.5; transform: translateY(0); }
        40% { opacity: 1; transform: translateY(-10px); }
      }

      @keyframes bars {
        0%, 100% { height: 10px; }
        50% { height: 20px; }
      }

      @keyframes ring {
        to { transform: rotate(360deg); }
      }

      @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
      }

      @keyframes wave {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }

      @keyframes orbit {
        to { transform: rotate(360deg); }
      }

      @keyframes bounce-loader {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }

      @keyframes flip-loader {
        0% { transform: rotateY(0deg); }
        100% { transform: rotateY(360deg); }
      }

      @keyframes morph {
        0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      }

      @keyframes gradient-spin {
        to { transform: rotate(360deg); }
      }

      @keyframes dots-wave {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }

      @keyframes progress {
        0% { width: 0%; }
        50% { width: 100%; }
        100% { width: 0%; }
      }

      @keyframes hourglass {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(180deg); }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      @keyframes fade {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes scale {
        from { transform: scale(1); }
        to { transform: scale(1.05); }
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }

      @keyframes glow {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.05); }
      }

      @keyframes slide {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
      }

      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @keyframes flip {
        from { transform: rotateY(0deg); }
        to { transform: rotateY(360deg); }
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

      /* Variants */
      .k-button--primary {
        background-color: var(--color-primary);
        color: white;
      }

      .k-button--primary:hover:not(:disabled) {
        background-color: var(--color-primary-dark);
      }

      .k-button--secondary {
        background-color: var(--color-secondary);
        color: white;
      }

      .k-button--secondary:hover:not(:disabled) {
        background-color: var(--color-secondary-dark);
      }

      .k-button--danger {
        background-color: var(--color-danger);
        color: white;
      }

      .k-button--danger:hover:not(:disabled) {
        background-color: var(--color-danger-dark);
      }

      .k-button--success {
        background-color: var(--color-success);
        color: white;
      }

      .k-button--success:hover:not(:disabled) {
        background-color: var(--color-success-dark);
      }

      .k-button--warning {
        background-color: var(--color-warning);
        color: white;
      }

      .k-button--warning:hover:not(:disabled) {
        background-color: var(--color-warning-dark);
      }

      .k-button--info {
        background-color: var(--color-info);
        color: white;
      }

      .k-button--info:hover:not(:disabled) {
        background-color: var(--color-info-dark);
      }

      .k-button--ghost {
        background-color: transparent;
        border: 2px solid var(--color-secondary);
        color: var(--color-secondary);
      }

      .k-button--ghost:hover:not(:disabled) {
        background-color: var(--color-secondary);
        color: white;
      }

      .k-button--link {
        background-color: transparent;
        color: var(--color-primary);
        text-decoration: underline;
      }

      .k-button--link:hover:not(:disabled) {
        color: var(--color-primary-dark);
      }

      .k-button--gradient {
        background: linear-gradient(135deg, var(--color-primary), var(--color-info));
        color: white;
      }

      .k-button--gradient:hover:not(:disabled) {
        opacity: 0.9;
      }

      .k-button--outline {
        background-color: transparent;
        border: 2px solid var(--color-primary);
        color: var(--color-primary);
      }

      .k-button--outline:hover:not(:disabled) {
        background-color: var(--color-primary);
        color: white;
      }

      /* Sizes */
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

      /* Disabled state */
      .k-button--disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Loading spinner styles */
      .k-button__spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
      }

      .k-button__spinner--spinner {
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spinner 1s linear infinite;
      }

      .k-button__spinner--dots {
        display: flex;
        gap: 4px;
      }

      .k-button__spinner--dots::before,
      .k-button__spinner--dots::after {
        content: '';
        width: 4px;
        height: 4px;
        background: white;
        border-radius: 50%;
        animation: dots 1.4s infinite;
      }

      .k-button__spinner--dots::before {
        animation-delay: -0.2s;
      }

      .k-button__spinner--dots::after {
        animation-delay: 0.2s;
      }

      .k-button__spinner--pulse {
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      .k-button__spinner--bars {
        display: flex;
        gap: 3px;
      }

      .k-button__spinner--bars::before,
      .k-button__spinner--bars::after {
        content: '';
        width: 3px;
        height: 10px;
        background: white;
        border-radius: 2px;
        animation: bars 1.2s infinite;
      }

      .k-button__spinner--bars::before {
        animation-delay: -0.4s;
      }

      .k-button__spinner--bars::after {
        animation-delay: 0.4s;
      }

      .k-button__spinner--ring {
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: ring 1s linear infinite;
      }

      .k-button__spinner--dual-ring {
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: ring 1.5s linear infinite;
        box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.3);
      }

      .k-button__spinner--ripple {
        border: 2px solid white;
        border-radius: 50%;
        animation: ripple 1s infinite;
      }

      .k-button__spinner--wave {
        display: flex;
        gap: 2px;
      }

      .k-button__spinner--wave::before,
      .k-button__spinner--wave::after {
        content: '';
        width: 3px;
        height: 12px;
        background: white;
        border-radius: 2px;
        animation: wave 1.2s infinite;
      }

      .k-button__spinner--wave::before {
        animation-delay: -0.4s;
      }

      .k-button__spinner--wave::after {
        animation-delay: 0.4s;
      }

      .k-button__spinner--skeleton {
        width: 60px;
        height: 8px;
        background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%);
        background-size: 200% 100%;
        border-radius: 4px;
        animation: shimmer 1.5s infinite;
      }

      .k-button__spinner--shimmer {
        width: 60px;
        height: 8px;
        background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%);
        background-size: 200% 100%;
        border-radius: 4px;
        animation: shimmer 1.5s infinite;
      }

      .k-button__spinner--orbit {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: orbit 1.5s linear infinite;
      }

      .k-button__spinner--progress {
        width: 50px;
        height: 3px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        overflow: hidden;
        position: relative;
      }

      .k-button__spinner--progress::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 20%;
        background: white;
        border-radius: 2px;
        animation: progress 1.5s infinite;
      }

      /* Animations */
      .k-button--pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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

      .k-button--flip:hover {
        animation: flip 0.6s ease-out;
      }

      @media (prefers-reduced-motion: reduce) {
        button {
          animation: none !important;
          transition: none !important;
        }

        .k-button__spinner {
          animation: none !important;
        }
      }
    `;
  }

  static get observedAttributes() {
    return [
      'design',
      'variant',
      'size',
      'disabled',
      'animation',
      'loading',
      'loading-spinner',
      'type',
      'aria-label',
      'aria-pressed',
    ];
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
