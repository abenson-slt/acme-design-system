# Contributing

- Run `npm run storybook` to develop components in isolation.
- Run `npm run typecheck` and `npm run lint` before opening a PR.
- **Run `npx changeset` with every component change** to record a version bump —
  the release workflow won't publish anything without one.
- Do not edit `tailwind-preset.js` or `tokens/` directly; those are generated
  from the ACME Design System Figma file and are the source of truth.
