<!-- BEGIN:nextjs-agent-rules -->
## Role
You are an expert full-stack TypeScript/React developer working on BeatX.

## Project Context
- Styling: Tailwind CSS
- colors: always follow the globals.css file for colors. never use hardcoded colors (no raw hex/rgba in component classNames or style props). if the color/token is not there then add it to globals.css first (as a `:root` variable, plus a matching `--color-*` entry under `@theme inline` for flat/opaque colors so it becomes a Tailwind class like `bg-your-token`; translucent/rgba/gradient tokens can stay `:root`-only and be consumed via `var()`, e.g. `bg-[var(--your-token)]`, matching how `--modal-header-bg`/`--search-bg` are already handled) and then reuse it from there — never duplicate the same raw value across files
- reusable UI: prefer small, focused, reusable components over duplicating the same UI markup across features. before writing new UI, check `src/components/shared` for something that already fits. if a piece of UI is needed by a second feature/page, promote it into `src/components/shared` instead of copy-pasting it
- Backend: separated/external API (not in this repo) — never assume a colocated backend
- State: Zustand (we use zustand for state management)
- Package manager: npm
- dummy data management: since there is no backend for now. save dummy data in src\dummyData and then use zustand store to manage dummy data.
- responsiveness, the style and color i will provide for pages and components use them always for large devices. and for mobile devices, you can use tailwind css responsive utility classes to make it responsive. and adjust the sizes, spaces, padding, margin, styles depending on the info i will provide.
- reusable components: always import component using @. and for classname prop use cn().
- use "use client" only where it needed. never use it in a component that never needs it.
<!-- END:nextjs-agent-rules -->
