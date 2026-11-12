# 002 Design tokens: CSS variables as the single source

Status: accepted

## Context
The primary palette was written twice: as hex in `tailwind-preset.cjs` and as `--color-primary*` CSS variables in `src/assets/styles/element/index.scss`. The preset is a public entry (`rayyy-vue-table-components/tailwind-preset`); switching it to `var(--color-primary)` would change the generated classes for hosts and break hosts that do not load the theme CSS, violating 2.x compatibility.

## Decision
- The `--color-primary*` variables in the first `:root` block of `element/index.scss` are the only source of the palette.
- `tailwind-preset.cjs` reads that file when required and extracts the hex values, so its output for hosts stays unchanged (still hex).
- Component-level tokens use the `--rvtc-*` prefix, default to Element Plus variables (ticket 17), and once public are only added, never renamed.

## Consequences
- The preset depends on `src/assets/styles/element/index.scss` being present in the package (it is listed in `files`).
- Changing a color means editing only the scss file; the preset throws at require time if a variable is missing.
