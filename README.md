# @acme/design-system

React component library for ACME products, built on design tokens extracted from the
**ACME Design System** Figma file. Consumed by `acme-app` (and potentially other consumers)
as a **git dependency** (`github:...`), not (yet) a published npm package — see the
`publishConfig` in `package.json` pointing at GitHub Packages for the eventual registry target.

This document is written for an AI coding agent (Claude Code, Cursor, Copilot Workspace, etc.)
picking up this repo cold. Read it before writing or editing any component, token usage, or
consumer wiring. It is not a marketing page — every claim below is grounded in the current
state of the repo, not carried over from stale assumptions.

## The one rule that matters most: semantic tokens only

Never use raw hex values, arbitrary Tailwind values (`bg-[#1a1a1a]`, `text-[14px]`, etc.), or
guessed class names. Every color, spacing, radius, shadow, and type-scale value must come
from the semantic token layer defined in `tailwind-preset.js` (documented in full in
[`tokens/README.md`](./tokens/README.md)).

This is enforced, not just a convention:

- `.eslintrc.cjs` enables `eslint-plugin-tailwindcss` with two rules set to `error`:
  `tailwindcss/no-arbitrary-value` and `tailwindcss/classnames-order`.
- **If `npm run lint` fails on a Tailwind rule, the near-certain cause is a raw/arbitrary
  value where a semantic token should be, not a false positive from the linter.** Fix the
  class, don't suppress the rule.

Representative real semantic classes (see `tokens/README.md` for the complete list):

- Backgrounds: `bg-bg`, `bg-bg-subtle`, `bg-bg-muted`, `bg-bg-emphasis`, `bg-bg-brand`
- Surfaces: `bg-surface`, `bg-surface-inverse`, `bg-surface-overlay`
- Text: `text-content`, `text-content-muted`, `text-content-subtle`, `text-content-brand`,
  `text-content-on-brand`
- Interactive: `bg-interactive-primary`, `hover:bg-interactive-primary-hover`,
  `text-interactive-primary-fg`, `bg-interactive-primary-subtle`
- Borders: `border-border`, `border-border-input`, `border-border-focus`
- Feedback (`success` / `warning` / `error` / `info`), each with `bg` / `text` / `border`
  variants, e.g. `bg-error`, `text-error`
- Type scale (bundles font-size + line-height): `text-display-lg|md|sm`,
  `text-heading-1..4`, `text-body-lg|md|sm`, `text-label-lg|sm`, `text-code`

**Always verify a class name against `tailwind-preset.js` before using it.** A
plausible-but-wrong guess (e.g. `text-on-brand` instead of the real `text-content-on-brand`)
does not error — Tailwind silently drops classes it doesn't recognize, so the failure mode is
a component that's silently unstyled, not a build error.

## How to consume this library correctly

Exports map (from `package.json`):

```json
{
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js", "require": "./dist/index.cjs" },
    "./tailwind-preset": "./tailwind-preset.js",
    "./tokens.css": "./tokens/tokens.css"
  }
}
```

Consumer wiring, exactly as documented in `tokens/README.md`:

```js
// consumer tailwind.config.js
const acmePreset = require('@acme/design-system/tailwind-preset');
module.exports = {
  presets: [acmePreset],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};
```

```ts
// consumer app entry, imported once
import '@acme/design-system/tokens.css';
```

`darkMode: 'class'` is set in the preset — consumers toggle dark mode by adding `class="dark"`
to `<html>`; all semantic tokens flip automatically via the CSS custom properties in
`tokens.css`.

### Git-dependency build gotcha

Because consumers install this as a git dependency rather than from a registry, there is no
npm publish step that runs `build` for them. `package.json` has a `prepare` script
(`"prepare": "tsup"`) specifically so that `npm install` on a git dependency triggers a build
and produces `dist/` locally in the consumer's `node_modules`. **If the build pipeline ever
changes (e.g. `build` script is renamed or gains steps `prepare` doesn't mirror), keep
`prepare` in sync with `build` or git-dependency installs will silently ship a stale or empty
`dist/`.**

### Why `package.json` has no `"type": "module"`

This is intentional, not an oversight. `tailwind-preset.js` is consumed via `require()`
(see the consumer snippet above and `tokens/README.md`), and tsup's default output extensions
depend on this field — the explicit `outExtension` override in `tsup.config.ts`
(`.js` for ESM, `.cjs` for CJS output) exists to keep the dual `import`/`require` exports
working under CJS-default. Adding `"type": "module"` back changes tsup's default extension
behavior and breaks `require()`-based consumption of `tailwind-preset.js`. Don't add it
without re-verifying both consumption paths.

## How to add a new component correctly

**Before assuming a component doesn't exist, check `components.json` and `src/index.ts`
first.** This library is under active development; treating your own prior knowledge of
"what's built" as authoritative instead of checking these two files is a known failure mode
that has already produced wasted/duplicate work in this project's history. `components.json`
is a hand-authored, AI-facing manifest — see its `$schema` field for its stated purpose:
props, variants, and a usage example per component, meant to be read instead of full source.

Current components (from `src/index.ts`, 20 total): Button, Input, Textarea, Label,
FormField, Spinner, Badge, Tag, Avatar, Checkbox, Radio, Switch, Select, Tooltip, Popover,
DropdownMenu, Dialog, Toast, Card, Alert.

Folder convention, one directory per component under `src/components/`:

```
src/components/ComponentName/
  ComponentName.tsx          # implementation
  ComponentName.stories.tsx  # Storybook stories, tags: ['autodocs']
  index.ts                   # barrel: export component + its prop types
```

Implementation pattern (see `src/components/Button/Button.tsx` and
`src/components/FormField/FormField.tsx` for real examples):

- Variants via `cva` (`class-variance-authority`) with a `variants` map and
  `defaultVariants`; export the `VariantProps<typeof xVariants>` as part of the public props
  interface.
- Class merging via `cn()` from `src/lib/cn.ts` (`clsx` + `tailwind-merge`) — always
  `cn(xVariants({...}), className)` so consumers can override.
- `React.forwardRef` for anything rendering a real DOM element, with `displayName` set.
- Components wrapping a Radix primitive (Checkbox, Radio, Switch, Select, Tooltip, Popover,
  DropdownMenu, Dialog, Toast) forward `React.ComponentPropsWithoutRef<typeof Primitive.Root>`
  (or similar) and add only the minimal extra props this library needs (typically `invalid`).
  Re-export all the subcomponents consumers need (e.g. Dialog exports `DialogTrigger`,
  `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`,
  `DialogClose` — see `components.json` for the full per-component subcomponent lists and any
  required provider setup, e.g. Toast's `ToastProvider` or Tooltip's `TooltipProvider`).

To finish adding a component:

1. Add `ComponentName.stories.tsx` with `tags: ['autodocs']` in the story `meta`, plus a
   dedicated dark-mode story (pattern: wrap render output in a `<div className="dark ...">`,
   see `DarkMode` story in `src/components/Button/Button.stories.tsx`).
2. Export it from `src/index.ts` (`export * from './components/ComponentName'`).
3. Add an entry to `components.json` (name, importPath, description, props, variants if any,
   a usage `example`, and a `setup` note if the component requires a provider mounted
   elsewhere).

## Known sharp edges / gotchas

- **No `"type": "module"` in `package.json`, on purpose** — see above. This affects both
  `tailwind-preset.js`'s `require()`-based consumption and tsup's output extensions.
- **Verify semantic class names against `tailwind-preset.js` before using them** — wrong
  guesses fail silently (unstyled output), not with a build error.
- **Figma Code Connect for Button is blocked on a Figma plan/seat tier, not a technical gap.**
  The node is already resolved (file key `LGc6BjmuWdIwA4aJGgCmiS`, node `24:2`); don't
  re-diagnose the lookup. Full context, including the exact prop-mapping plan for when the
  seat is upgraded, is in [`FIGMA_CODE_CONNECT_TODO.md`](./FIGMA_CODE_CONNECT_TODO.md).
- **Don't edit `tailwind-preset.js` or anything under `tokens/`.** Both are generated from
  the ACME Design System Figma file and treated as source of truth (see
  [`tokens/README.md`](./tokens/README.md) and [`CONTRIBUTING.md`](./CONTRIBUTING.md)). If a
  component needs a token that doesn't exist yet, that's a Figma-side conversation, not a
  local patch.
- The 164-entry Figma "Components" variable collection (button/input/etc. dimensions) was
  deliberately left out of the global Tailwind preset; component-specific sizing is applied
  per-component in each component's own `cva` config instead (see `tokens/README.md`).

## Where to verify things

- `npm run build` — runs `tsup` (also runs automatically via `prepare` on install).
- `npm run typecheck` — `tsc --noEmit`.
- `npm run lint` — `eslint src`; failures on Tailwind rules almost always mean a raw/arbitrary
  value was used, see above.
- `npm run storybook` — dev server on port 6006, live component preview with autodocs and a
  light/dark theme toggle (`.storybook/preview.ts`).
- `npx storybook build` (i.e. `npm run build-storybook`) — static Storybook build; use this to
  verify component rendering/stories in environments without a live browser preview.
- `components.json` and Storybook autodocs (generated from each story's `tags: ['autodocs']`)
  are the two machine-readable sources of truth for "what exists and how do I use it" — prefer
  them over reading full component source when just trying to consume something.

## Also see

- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — human-facing contributor workflow, including the
  `npx changeset` requirement on every component change (the release workflow won't publish
  without one).
- [`tokens/README.md`](./tokens/README.md) — full token model, dark mode, type scale, fonts,
  and how tokens are regenerated from Figma.
- [`FIGMA_CODE_CONNECT_TODO.md`](./FIGMA_CODE_CONNECT_TODO.md) — current Code Connect status
  and the exact steps to finish it once unblocked.
- [`components.json`](./components.json) — machine-readable manifest of every component.
