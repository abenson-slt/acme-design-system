# Figma Code Connect — Button (TODO)

## Status: not completed — needs a human or a session with direct file access to finish

## What was attempted

Figma MCP tools were available in this session (`whoami` succeeded, connected as
`abenson@straightlinetheory.com`). The `figma-code-connect` skill was loaded and followed.

`search_design_system` (queried for "Button" against file key `LGc6BjmuWdIwA4aJGgCmiS`) confirmed
a **published** `Button` component set exists in the "ACME Design System" library:

- Library name: `ACME Design System`
- Component name: `Button`
- Component type: `component_set`
- Component key: `15b4977912930995a0a3b26b41b614b7fbafa677`
- Library key: `lk-489e7dd00abf2b7b4fce4d3117fe5b337e0fc555bb7511683760602a0b625c72fbcabaadfc5535532db081e2c60c2aa28c12610664d7d3a583dc0ed080350b76`
- Indexed path: `design_systems/ACME Design System/components/Button`
- Description (from Figma): "Triggers an action or event. Use Primary for the main
  call-to-action on a page, Secondary for supporting actions, Outline for a low-emphasis
  alternative to Secondary on colored or image backgrounds, Ghost for low-emphasis or inline
  actions, and Destructive for irreversible or dangerous actions. Pair an icon with the label
  using the ShowIcon property."

However, `get_metadata` on file key `LGc6BjmuWdIwA4aJGgCmiS` only returns a single top-level page:
`0:1: Cover` — a marketing/cover page for the design system, with no "Components" page and no
Button node reachable from it. The Button component set that the search index found is a
**published library component**, and its actual node presumably lives in a separate source file
(the library's underlying file) that this session does not have a fileKey/node-id for.

Code Connect's `get_code_connect_suggestions` / `get_context_for_code_connect` tools both require
a real `fileKey` + `nodeId` pointing at the component (or an instance of it) inside a design file —
a component key alone is not sufficient input for either tool. Guessing a node ID was avoided per
instructions not to fabricate a mapping.

## What's needed to finish this

1. Open the actual ACME Design System **library source file** in Figma (not the cover-page file
   `LGc6BjmuWdIwA4aJGgCmiS` linked above) and navigate to the "Components" page containing the
   `Button` component set.
2. Copy the Figma URL for that component set — it must include a `node-id` query param, e.g.
   `https://www.figma.com/design/<fileKey>/<fileName>?node-id=<X>-<Y>`.
3. Re-run the `figma-code-connect` skill workflow with that URL:
   - `get_code_connect_suggestions(fileKey, nodeId)` to confirm the component is published and
     find the `mainComponentNodeId` for the component set.
   - `get_context_for_code_connect(fileKey, mainComponentNodeId, clientFrameworks: ["react"],
     clientLanguages: ["typescript"])` to get the full property list (expected: `Size` variant,
     `Style` variant with options Primary/Secondary/Ghost/Destructive/Outline, a `State` variant,
     and a `ShowIcon` boolean per the component description above).
4. Map properties to `src/components/Button/Button.tsx`'s real prop types:
   - Figma `Style` → code `variant`: `Primary → primary`, `Secondary → secondary`,
     `Outline → outline`, `Ghost → ghost`, `Destructive → destructive`
   - Figma `Size` → code `size`: map to whatever size values the component set actually exposes
     against `sm | md | lg`
   - Figma `State` — likely has no direct code prop (state is usually derived from `disabled`/
     `:hover` in code rather than an explicit variant); omit unless it maps to `disabled`
   - `ShowIcon` (boolean) → likely maps to presence of `leadingIcon`/`trailingIcon` props, not a
     direct boolean prop — needs inspection of how the icon child instance is structured
     (INSTANCE_SWAP) to decide whether it corresponds to `leadingIcon` or `trailingIcon`.
5. Write `src/components/Button/Button.figma.tsx` using the template format described in the
   `figma-code-connect` skill (`figma.connect()` parser-based file, since this appears to be a
   normal git-based project rather one using MCP template `.figma.ts` — confirm which format the
   team's Code Connect config expects before writing).
6. Validate the generated file against `Button.tsx`'s actual `ButtonProps` interface — do not
   invent props that don't exist in code.

Nothing was fabricated or guessed to unblock this — this file exists so a human (or a future
session with the correct file URL) can pick it up with full context.
