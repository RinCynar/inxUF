# AGENTS.md

## Build & Development Commands

- **Start local server**: `npm start` or `bundle exec jekyll serve`
- **Development watch mode**: `npm run dev` (runs Grunt watch + Jekyll serve simultaneously)
- **Build assets**: `grunt` (compiles LESS to CSS, minifies JS, adds banners)
- **Watch assets**: `grunt watch` (auto-compiles LESS/JS on file changes)
- **Deploy**: `npm run push` (git push with tags)

## Codebase Architecture

**Jekyll static site generator** with custom styling/scripting. Key directories:
- `_includes/`: HTML partials
- `_layouts/`: Jekyll page templates
- `_posts/`: Blog post markdown files
- `less/`: LESS source files (compiled to css/)
- `js/`: JavaScript source and libraries
- `pwa/`: Progressive Web App files
- `_config.yml`: Jekyll configuration (site title, plugins, markdown settings)

Base theme: Hux Blog (forked/customized). Service worker enabled. Bootstrap + jQuery.

## Code Style & Conventions

- **LESS variables/mixins**: defined in `less/variables.less` and `less/mixins.less`
- **JS**: Vanilla ES5 + jQuery; minified output in `hux-blog.min.js`
- **Markdown**: GitHub Flavored Markdown (GFM) with kramdown
- **HTML**: Jekyll Liquid templating; responsive Bootstrap grid
- **Naming**: kebab-case for CSS classes, camelCase for JS variables
- **Assets**: Always reference minified versions in production; source maps not used

## Important Notes

- Site uses Jekyll for static generation; posts in `_posts/` use YAML frontmatter
- Grunt builds are automatic—modify LESS/JS sources, never commit generated CSS/JS
- Service worker (sw.js) for offline functionality; update cache manifest when assets change
