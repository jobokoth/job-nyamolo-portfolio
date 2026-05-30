# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Site

No build step. Open `Job Portfolio-design-files/index.html` directly in a browser, or serve the `Job Portfolio-design-files/` directory with any static file server:

```powershell
# Using Python (if available)
python -m http.server 8080 --directory "Job Portfolio-design-files"

# Using Node http-server (if available)
npx http-server "Job Portfolio-design-files"
```

No package.json, no npm install, no compilation required.

## Architecture

Single-page portfolio with no build toolchain. React and Babel run entirely in the browser via CDN.

**Entry point**: `Job Portfolio-design-files/index.html`
- Loads React 18, ReactDOM, and Babel standalone from unpkg CDN
- Contains all CSS (≈400 lines) with light/dark theme and CSS custom properties
- Mounts the React app to `#root`
- Imports `app.jsx` and `tweaks-panel.jsx` as `type="text/babel"` script tags

**Main component**: `Job Portfolio-design-files/app.jsx`
- All portfolio content lives here: career data, case studies, projects, skills
- Section components: `Hero`, `About`, `Skills`, `Work`, `Archive`, `Contact`, `Footer`
- Theme toggle persisted to `localStorage` key `theme`
- Contact form uses `mailto:` — no backend

**Tweaks panel**: `Job Portfolio-design-files/tweaks-panel.jsx`
- Reusable settings panel (accent color, layout density)
- Exports `useTweaks` hook, `TweakSlider`, `TweakColor`, `TweakSection` components
- Edit mode activates via `window.postMessage({ type: 'tweaks:edit' })`
- Settings persisted to `localStorage` key `tweaks`

## Styling Conventions

All CSS lives in `index.html` `<style>` block. Key custom properties:

- `--accent` / `--accent-dim`: primary brand color (default green `#3ddc84`)
- `--density`: spacing multiplier (0.6–1.3), scales `padding` across sections
- `--bg`, `--bg-secondary`, `--text`, `--text-muted`, `--border`: theme-aware tokens
- Breakpoint: `720px` (single column below)
- Max-width container: `960px`
- Font stack: Inter (UI), JetBrains Mono (code/accent text)

Dark/light theme toggled by `data-theme="dark"` on `<html>`.

## Content Updates

All portfolio content (case studies, skills, projects, bio) is in `app.jsx` as inline JS objects/arrays near the top of the file. No CMS or external data source.
