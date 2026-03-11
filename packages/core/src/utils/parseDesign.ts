/**
 * Design token parser for unified component styling
 * Converts prefixed design strings into component props
 *
 * @example
 * parseDesign("v:primary s:md a:pulse")
 * // Returns: { variant: 'primary', size: 'md', animation: 'pulse' }
 */

export interface DesignTokens {
  variant?: string;
  size?: string;
  animation?: string;
  padding?: string;
  shadow?: string;
  state?: string;
  loading?: string;
  [key: string]: string | undefined;
}

const PREFIX_MAP: Record<string, string> = {
  v: 'variant',
  s: 'size',
  a: 'animation',
  p: 'padding',
  sh: 'shadow',
  st: 'state',
  l: 'loading',
};

const VALID_TOKENS: Record<string, string[]> = {
  v: [
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
  s: ['sm', 'md', 'lg'],
  a: ['pulse', 'bounce', 'fade', 'scale', 'shake', 'glow', 'slide', 'rotate', 'flip', 'none'],
  p: ['sm', 'md', 'lg'],
  sh: ['sm', 'md', 'lg', 'none'],
  st: ['normal', 'error', 'disabled'],
  l: [
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
};

// Common typos and mistakes
const COMMON_MISTAKES: Record<string, { correct: string; reason: string }> = {
  'shadow:': { correct: 'sh:', reason: 'Use "sh:" prefix for shadow, not "shadow:"' },
  'size:': { correct: 's:', reason: 'Use "s:" prefix for size, not "size:"' },
  'variant:': { correct: 'v:', reason: 'Use "v:" prefix for variant, not "variant:"' },
  'animation:': { correct: 'a:', reason: 'Use "a:" prefix for animation, not "animation:"' },
  'padding:': { correct: 'p:', reason: 'Use "p:" prefix for padding, not "padding:"' },
};

const isDev = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development';

/**
 * Parse design string into design tokens
 * @param designString - Space-separated prefixed tokens (e.g., "v:primary s:md a:pulse")
 * @returns Object with design tokens
 */
export function parseDesign(designString?: string): DesignTokens {
  if (!designString || typeof designString !== 'string') {
    return {};
  }

  const trimmedString = designString.trim();

  // Check for common mistakes
  if (isDev) {
    for (const [mistake, { correct, reason }] of Object.entries(COMMON_MISTAKES)) {
      if (trimmedString.includes(mistake)) {
        console.warn(
          `Design token warning: "${mistake}" detected. ${reason}. Example: "v:primary ${correct}md a:pulse"`
        );
      }
    }
  }

  const tokens = trimmedString.split(/\s+/);
  const result: DesignTokens = {};

  tokens.forEach((token) => {
    const [prefix, value] = token.split(':');

    if (!prefix || !value) {
      if (isDev) {
        console.warn(`Invalid design token: "${token}". Expected format: "prefix:value"`);
      }
      return;
    }

    const fullKey = PREFIX_MAP[prefix];
    if (!fullKey) {
      if (isDev) {
        console.warn(
          `Unknown prefix: "${prefix}". Valid prefixes: ${Object.keys(PREFIX_MAP).join(', ')}`
        );
      }
      return;
    }

    if (VALID_TOKENS[prefix] && !VALID_TOKENS[prefix].includes(value)) {
      if (isDev) {
        console.warn(
          `Invalid value "${value}" for prefix "${prefix}". Valid values: ${VALID_TOKENS[prefix].join(', ')}`
        );
      }
      return;
    }

    result[fullKey] = value;
  });

  return result;
}

/**
 * Merge design tokens with individual props (individual props take precedence)
 * @param designString - Design string to parse
 * @param overrides - Individual prop overrides
 * @returns Merged design tokens
 */
export function mergeDesignTokens(
  designString?: string,
  overrides?: Partial<DesignTokens>
): DesignTokens {
  const designTokens = parseDesign(designString);
  return { ...designTokens, ...overrides };
}
