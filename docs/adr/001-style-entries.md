# 001 Style entries: `/styles/core` and `/styles/theme`

Status: accepted

## Context
`/styles` (`dist/lib/rayyy-vue-table-components.css`) contains both component styles and theme variables in `:root` / `:root.dark`, which override the host's Element Plus primary color. Hosts with their own Element Plus theme cannot opt out. Changing `/styles` content in 2.x would break existing hosts.

## Decision
- 2.x adds `/styles/core` (no theme variables) and `/styles/theme` (only theme variables). `/styles` is unchanged and still includes the theme.
- 3.0 makes `/styles` exclude the theme by default and handles unprefixed Tailwind utilities (plan 4.5).

## Consequences
- The split relies on the convention that theme variables live only in top-level `:root` / `:root.dark` rules. `scripts/split-styles.mjs` enforces it: it throws if those rules contain anything but `--` custom properties, or if no theme rule is found.
- Every theme variable reference in core has a fallback, so hosts that load only core get components that follow their Element Plus primary color; status colors fall back to the package light-mode defaults.
