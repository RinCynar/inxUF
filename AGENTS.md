# Agent Guidelines

## Build and Commands

- **Start dev server**: `npm run start` or `bundle exec jekyll serve`
- **Watch mode**: `npm run dev` (runs Grunt watch and Jekyll server in parallel)
- **Build assets**: `grunt` (minifies JS, compiles LESS, adds banners)
- **No tests**: This is a Jekyll static site with no test suite

## Architecture

This is a Jekyll-based static blog generator (v3.8.2) forked from Hux Blog with Material You theme system.

**Key directories:**
- `_posts/` - Markdown blog posts with YAML front matter
- `_layouts/` - Jekyll templates (default, post, page, keynote)
- `_includes/` - Reusable Jekyll components
- `js/` - JavaScript (jQuery-based; includes theme-toggle.js for dark/light themes)
- `less/` - LESS stylesheets (hux-blog.less, theme.less, material-design.less)
- `css/` - Generated minified stylesheets (build output)
- `pwa/` - Progressive Web App assets, service worker config

**Build pipeline:** LESS → CSS, JS minified via Grunt; Jekyll processes Markdown → HTML

**Theme System:** CSS variables (custom properties) define light/dark themes; JavaScript manages localStorage persistence

## Code Style

- **Markdown/YAML**: GFM syntax with kramdown; use `---` for front matter
- **CSS/LESS**: Use Material You CSS variables: `var(--primary)`, `var(--surface)`, `var(--on-surface)`, etc. Use LESS mixins: `.transition-standard`, `.elevation-2`, `.shape-medium`
- **JS**: No linting; use existing jQuery patterns; theme manager: `window.themeManager.toggleTheme()`
- **HTML**: Use Jekyll template tags; no spaces in Liquid syntax
- **Naming**: kebab-case for files, camelCase for JS, snake_case for YAML; CSS vars use `--kebab-case`
- **Colors**: Always use CSS variables, never hardcode colors (for theme support)

## Theme System

**CSS Variables** (40+ tokens):
- Colors: `--primary`, `--secondary`, `--surface`, `--on-surface`, `--border-color`, etc.
- Design: `.elevation-0` to `.elevation-5`, `.shape-small` to `.shape-large`, `.transition-standard`
- States: `.state-hover`, `.state-focus`, `.state-active`

**JavaScript API**:
- `window.themeManager.getCurrentTheme()` - Get 'light' or 'dark'
- `window.toggleTheme()` - Toggle between themes
- `window.addEventListener('themechange', callback)` - Listen for theme changes

**Files**: `/js/theme-toggle.js`, `/less/theme.less`, `/less/material-design.less`

**Documentation**: See THEME_README.md, BUILD_GUIDE.md, QUICK_START.md
