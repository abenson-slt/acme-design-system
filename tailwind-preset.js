/**
 * ACME Design System — Tailwind preset.
 *
 * Usage (in the app repo's tailwind.config.js):
 *   const acmePreset = require('@acme/design-system/tailwind-preset');
 *   module.exports = {
 *     presets: [acmePreset],
 *     content: ['./src/**\/*.{js,ts,jsx,tsx}'],
 *   };
 *
 * Also import the token variables once at your app root:
 *   import '@acme/design-system/tokens.css';
 *
 * Semantic colors/shadows resolve via CSS variables, so light/dark is handled
 * by toggling the `dark` class on <html>. Primitives are static values, useful
 * for one-off cases but prefer semantic tokens in product code.
 */

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // --- Primitive ramps (use sparingly; prefer semantic) ---
        indigo: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc',
          400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
          800: '#3730a3', 900: '#312e81', 950: '#1e1b4b',
        },
        slate: {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1',
          400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155',
          800: '#1e293b', 900: '#0f172a', 950: '#020617',
        },
        emerald: {
          50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
          400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
          800: '#065f46', 900: '#064e3b', 950: '#022c22',
        },
        amber: {
          50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
          400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
          800: '#92400e', 900: '#78350f', 950: '#451a03',
        },
        red: {
          50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5',
          400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c',
          800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a',
        },
        violet: { 50: '#f5f2ff', 900: '#4c1d95' },

        // --- Semantic tokens (light/dark-aware via CSS vars) ---
        bg: {
          DEFAULT: 'var(--acme-bg-default)',
          subtle: 'var(--acme-bg-subtle)',
          muted: 'var(--acme-bg-muted)',
          emphasis: 'var(--acme-bg-emphasis)',
          brand: 'var(--acme-bg-brand)',
        },
        surface: {
          DEFAULT: 'var(--acme-surface)',
          inverse: 'var(--acme-surface-inverse)',
          overlay: 'var(--acme-surface-overlay)',
        },
        content: {
          DEFAULT: 'var(--acme-text-default)',
          muted: 'var(--acme-text-muted)',
          subtle: 'var(--acme-text-subtle)',
          inverted: 'var(--acme-text-inverted)',
          'on-inverse': 'var(--acme-text-on-inverse)',
          disabled: 'var(--acme-text-disabled)',
          brand: 'var(--acme-text-brand)',
          'on-brand': 'var(--acme-text-on-brand)',
          'accent-on-inverse': 'var(--acme-text-accent-on-inverse)',
        },
        interactive: {
          primary: 'var(--acme-interactive-primary)',
          'primary-hover': 'var(--acme-interactive-primary-hover)',
          'primary-fg': 'var(--acme-interactive-primary-fg)',
          'primary-subtle': 'var(--acme-interactive-primary-subtle)',
          'primary-light': 'var(--acme-interactive-primary-light)',
          neutral: 'var(--acme-interactive-neutral)',
        },
        border: {
          DEFAULT: 'var(--acme-border-default)',
          strong: 'var(--acme-border-strong)',
          input: 'var(--acme-border-input)',
          focus: 'var(--acme-border-focus)',
          brand: 'var(--acme-border-brand)',
        },
        success: {
          DEFAULT: 'var(--acme-success)',
          bg: 'var(--acme-success-bg)',
          text: 'var(--acme-success-text)',
          border: 'var(--acme-success-border)',
        },
        warning: {
          DEFAULT: 'var(--acme-warning)',
          bg: 'var(--acme-warning-bg)',
          text: 'var(--acme-warning-text)',
          border: 'var(--acme-warning-border)',
        },
        error: {
          DEFAULT: 'var(--acme-error)',
          bg: 'var(--acme-error-bg)',
          text: 'var(--acme-error-text)',
          border: 'var(--acme-error-border)',
        },
        info: {
          bg: 'var(--acme-info-bg)',
          border: 'var(--acme-info-border)',
          icon: 'var(--acme-info-icon)',
          text: 'var(--acme-info-text)',
        },
      },

      spacing: {
        1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '20px',
        6: '24px', 8: '32px', 10: '40px', 12: '48px', 16: '64px', 20: '80px',
      },

      borderRadius: {
        none: '0px', sm: '4px', md: '6px', lg: '8px',
        xl: '12px', '2xl': '16px', full: '9999px',
      },

      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },

      fontWeight: {
        regular: '400', medium: '500', semibold: '600', bold: '700', extrabold: '800',
      },

      letterSpacing: {
        tightest: '-1.5px', tighter: '-1px', tight: '-0.5px',
        normal: '0px', wide: '0.5px',
      },

      // fontSize entries bundle their line-height: text-heading-1 => 30px/38px
      fontSize: {
        'display-lg': ['64px', { lineHeight: '72px', letterSpacing: '-1.5px' }],
        'display-md': ['48px', { lineHeight: '56px', letterSpacing: '-1px' }],
        'display-sm': ['36px', { lineHeight: '44px', letterSpacing: '-0.5px' }],
        'heading-1': ['30px', { lineHeight: '38px', letterSpacing: '-0.5px' }],
        'heading-2': ['24px', { lineHeight: '32px', letterSpacing: '-0.5px' }],
        'heading-3': ['20px', { lineHeight: '28px' }],
        'heading-4': ['18px', { lineHeight: '26px' }],
        'body-lg': ['16px', { lineHeight: '24px' }],
        'body-md': ['14px', { lineHeight: '20px' }],
        'body-sm': ['12px', { lineHeight: '18px' }],
        'label-lg': ['14px', { lineHeight: '20px' }],
        'label-sm': ['12px', { lineHeight: '18px' }],
        code: ['14px', { lineHeight: '20px' }],
      },

      boxShadow: {
        xs: 'var(--acme-shadow-xs)',
        sm: 'var(--acme-shadow-sm)',
        md: 'var(--acme-shadow-md)',
        lg: 'var(--acme-shadow-lg)',
        xl: 'var(--acme-shadow-xl)',
        focus: 'var(--acme-shadow-focus)',
        'focus-subtle': 'var(--acme-shadow-focus-subtle)',
        'focus-error': 'var(--acme-shadow-focus-error)',
      },
    },
  },
  plugins: [],
};
