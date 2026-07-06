import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// tailwind-merge's default config only knows Tailwind's built-in scales. Our preset
// (tailwind-preset.js) adds custom semantic color and type-scale names that don't match
// any pattern tailwind-merge recognizes, so without this extension it silently lumps
// e.g. `text-interactive-primary-fg` (a color) and `text-body-md` (our custom font-size
// scale) into the same "text" conflict group and drops one of them — see the incident
// this fixed: every non-default text color class was being stripped whenever paired with
// a custom type-scale class in the same className.
const colorSuffixes = [
  'bg',
  'bg-subtle',
  'bg-muted',
  'bg-emphasis',
  'bg-brand',
  'surface',
  'surface-inverse',
  'surface-overlay',
  'content',
  'content-muted',
  'content-subtle',
  'content-inverted',
  'content-on-inverse',
  'content-disabled',
  'content-brand',
  'content-on-brand',
  'content-accent-on-inverse',
  'interactive-primary',
  'interactive-primary-hover',
  'interactive-primary-fg',
  'interactive-primary-subtle',
  'interactive-primary-light',
  'interactive-neutral',
  'border',
  'border-strong',
  'border-input',
  'border-focus',
  'border-brand',
  'success',
  'success-bg',
  'success-text',
  'success-border',
  'warning',
  'warning-bg',
  'warning-text',
  'warning-border',
  'error',
  'error-bg',
  'error-text',
  'error-border',
  'info-bg',
  'info-border',
  'info-icon',
  'info-text',
];

const fontSizeSuffixes = [
  'display-lg',
  'display-md',
  'display-sm',
  'heading-1',
  'heading-2',
  'heading-3',
  'heading-4',
  'body-lg',
  'body-md',
  'body-sm',
  'label-lg',
  'label-sm',
  'code',
];

const shadowSuffixes = ['xs', 'sm', 'md', 'lg', 'xl', 'focus', 'focus-subtle', 'focus-error'];

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: fontSizeSuffixes }],
      'text-color': [{ text: colorSuffixes }],
      'bg-color': [{ bg: colorSuffixes }],
      'border-color': [{ border: colorSuffixes }],
      shadow: [{ shadow: shadowSuffixes }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
