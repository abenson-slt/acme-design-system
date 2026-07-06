# ACME Design System — Tokens

Extracted from the ACME Design System Figma file. This is the foundation layer:
colors, spacing, radii, typography, and shadows. Components build on top of these.

## Files

| File | What it is | Where it goes |
|---|---|---|
| `tokens/tokens.json` | Source-of-truth tokens (primitive → semantic), light/dark. Framework-agnostic. | Design system repo, `tokens/` |
| `tokens/tokens.css` | CSS custom properties for the semantic layer, with a `.dark` override block. | Design system repo; ship in the published package |
| `tailwind-preset.js` | Tailwind theme mapping the tokens. Semantic colors resolve via the CSS vars. | Design system repo root; exported from the package |

## How the two repos consume this

**Design system repo (`@acme/design-system`)** owns these files and exports them:

```json
// package.json
{
  "exports": {
    "./tailwind-preset": "./tailwind-preset.js",
    "./tokens.css": "./tokens/tokens.css"
  }
}
```

**App repo** consumes the published package:

```js
// tailwind.config.js
const acmePreset = require('@acme/design-system/tailwind-preset');
module.exports = {
  presets: [acmePreset],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};
```

```ts
// app entry (e.g. main.tsx) — import once
import '@acme/design-system/tokens.css';
```

## Token model

- **Primitive** ramps (`indigo.600`, `slate.100`, …) are raw values. Available in
  Tailwind but prefer semantic tokens in product code.
- **Semantic** tokens describe intent and are light/dark-aware through CSS vars:
  - Backgrounds: `bg-bg`, `bg-bg-subtle`, `bg-bg-muted`, `bg-bg-emphasis`, `bg-bg-brand`
  - Surfaces: `bg-surface`, `bg-surface-inverse`, `bg-surface-overlay`
  - Text: `text-content`, `text-content-muted`, `text-content-subtle`, `text-content-brand`, …
  - Interactive: `bg-interactive-primary`, `hover:bg-interactive-primary-hover`, `text-interactive-primary-fg`, …
  - Borders: `border-border`, `border-border-input`, `border-border-focus`, …
  - Feedback: `success`, `warning`, `error`, `info` — each with `bg` / `text` / `border` variants

## Dark mode

`darkMode: 'class'`. Add `class="dark"` to `<html>` to switch. All semantic tokens
flip automatically; no component changes needed.

## Type scale

Font size and line-height are bundled: `text-heading-1` applies 30px/38px, `text-body-md`
applies 14px/20px, etc. Full set: `display-lg|md|sm`, `heading-1..4`, `body-lg|md|sm`,
`label-lg|sm`, `code`.

## Fonts

`Inter` (sans) and `JetBrains Mono` (mono). Add these to the app — e.g. via `@fontsource/inter`
and `@fontsource/jetbrains-mono`, or Google Fonts. The preset only sets the family stacks.

## Regenerating

These were pulled from Figma variable collections: Primitives, Color (Light/Dark),
Spacing, Typography, Shadows (Light/Dark). The 164-entry **Components** collection
(button/input/etc. dimensions) was intentionally left out of the global preset and
will be applied per-component during the component build.
