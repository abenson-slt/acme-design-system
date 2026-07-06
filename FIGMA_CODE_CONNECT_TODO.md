# Figma Code Connect — Button (TODO)

## Status: blocked on Figma plan/seat tier — not a node-lookup problem

## Root cause (confirmed 2026-07-06)

The Button component set **is** reachable — it lives at file key
`LGc6BjmuWdIwA4aJGgCmiS`, node `24:2` (page "Button", node `12:8`), with all 45 variants
(Size × Style[Primary/Secondary/Ghost/Destructive/Outline] × State) plus the row labels,
exactly matching the component this repo's `src/components/Button/Button.tsx` was built from.

An earlier attempt concluded the file "only exposes a Cover page" — that was a false lead.
`get_metadata` called with **no** `nodeId` only lists top-level pages, and for this file that
call returns just `0:1: Cover`. But calling `get_metadata` (or any other tool) **with** a known
node ID (`12:8` / `24:2`) resolves correctly and returns full content. The page-listing call
appears to be an incomplete/best-effort index in this bridge, not a reliable page enumeration —
don't trust "no other pages found" as evidence a node doesn't exist; look it up directly if you
already know (or can search-index) the ID.

The actual blocker is licensing, not lookup: calling either Code Connect tool on this node returns

```
You need a Dev or Full seat on an Organization or Enterprise plan to use Code Connect.
Ask a Figma admin to upgrade your plan or seat.
https://developers.figma.com/docs/code-connect/
```

Confirmed on both:
- `get_context_for_code_connect(fileKey: "LGc6BjmuWdIwA4aJGgCmiS", nodeId: "24:2")`
- `get_code_connect_suggestions(fileKey: "LGc6BjmuWdIwA4aJGgCmiS", nodeId: "24:2")`

This is an account/org plan restriction on whoever's Figma credentials this MCP session is
authenticated as (`abenson@straightlinetheory.com` per `whoami`) — it cannot be worked around
with a different node ID, a different file, or different tool arguments.

## What's needed to finish this

1. A Figma admin upgrades the relevant seat to **Dev or Full on an Organization or Enterprise
   plan**. (Team/Starter/Professional-plan seats, or Viewer/Collaborator seats on any plan, do
   not unlock Code Connect regardless of node.)
2. Once upgraded, re-run, exactly as-is (no new lookup needed):
   ```
   get_context_for_code_connect(fileKey: "LGc6BjmuWdIwA4aJGgCmiS", nodeId: "24:2",
     clientFrameworks: "react", clientLanguages: "typescript")
   ```
   This should return the full property list (`Size`, `Style`, `State`, `Label`, `ShowIcon`,
   `Icon`) and descendant tree needed to write the mapping.
3. Map properties to `src/components/Button/Button.tsx`'s real prop types:
   - Figma `Style` → code `variant`: `Primary → primary`, `Secondary → secondary`,
     `Outline → outline`, `Ghost → ghost`, `Destructive → destructive`
   - Figma `Size` → code `size`: `Small → sm`, `Medium → md`, `Large → lg`
   - Figma `State` — likely no direct code prop; state (hover/disabled) is derived from
     `:hover`/the `disabled` prop in code rather than an explicit variant — omit unless it maps
     to `disabled`
   - `ShowIcon` (boolean) + `Icon` (instance swap) → likely maps to presence of
     `leadingIcon`/`trailingIcon` props rather than a single boolean — needs inspection of the
     icon child instance to decide which prop it corresponds to
4. Write `src/components/Button/Button.figma.tsx` using the `figma.connect()` format from the
   `figma-code-connect` skill.
5. Validate the generated file against `Button.tsx`'s actual `ButtonProps` interface — do not
   invent props that don't exist in code.

Nothing was fabricated or guessed to unblock this. The node lookup is solved and documented above
so no future session needs to re-diagnose it — only the plan/seat upgrade remains outside this
session's control.
