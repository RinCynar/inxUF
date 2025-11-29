# Build Guide - Material You Theme Implementation

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
# or if using yarn:
yarn install
```

### 2. Build Assets
```bash
# One-time build
grunt

# Or watch for changes during development
npm run dev
```

### 3. Start Development Server
```bash
npm run start
# or manually:
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`

## Build Pipeline

The build system compiles LESS to CSS and minifies JavaScript:

1. **LESS Compilation**: `less/*.less` → `css/*.css`
   - `hux-blog.less` (expanded version)
   - `hux-blog.min.css` (minified version)

2. **JavaScript Minification**: `js/hux-blog.js` → `js/hux-blog.min.js`

3. **Banner Addition**: Adds copyright headers to compiled files

## Key Files Modified

### New Files (Theme System)
- `/js/theme-toggle.js` - Theme switching logic
- `/less/theme.less` - Color definitions for light/dark themes
- `/less/material-design.less` - Material Design system tokens

### Modified Files
- `/less/variables.less` - Added Material You color tokens
- `/less/hux-blog.less` - Updated to use CSS variables
- `/_includes/head.html` - Added theme flash prevention script
- `/_includes/nav.html` - Added theme toggle button
- `/_layouts/default.html` - Included theme toggle script

## CSS Variables Used

The theme system uses CSS custom properties. Key color tokens:

```css
:root {
  --primary: /* primary brand color */
  --secondary: /* secondary accent color */
  --surface: /* background surface */
  --on-surface: /* text on surface */
  --border-color: /* borders */
  --shadow-color: /* shadows */
  --hover-overlay: /* hover state overlay */
  /* ... and more */
}
```

## Deployment to GitHub Pages

### Prerequisites
- Git configured with GitHub credentials
- Repository set to use GitHub Pages from `master` or `gh-pages` branch

### Deploy Steps
```bash
# Build all assets
grunt

# Commit and push
git add -A
git commit -m "feat: Material You theme system implementation"
git push origin master
```

GitHub Actions will automatically build and deploy if configured, or:

1. Push to the branch configured in GitHub Pages settings
2. GitHub Pages automatically builds with Jekyll
3. Site updates within a few seconds

## Troubleshooting

### LESS Compilation Errors
If LESS compilation fails, ensure:
- All `.less` files are syntactically correct
- Variable references are valid
- Import paths are correct

### Theme Not Switching
- Check browser console for JavaScript errors
- Verify `theme-toggle.js` is loaded
- Check localStorage is enabled
- Clear browser cache

### CSS Not Loading
- Run `grunt` to rebuild CSS
- Check that `hux-blog.min.css` is referenced in `head.html`
- Hard refresh page (Ctrl+Shift+R or Cmd+Shift+R)

## Development Workflow

### For Development
```bash
npm run dev
# Runs: grunt watch & npm run start
# Automatically rebuilds on file changes
```

### CSS/LESS Changes
1. Edit `.less` files in `/less/`
2. `grunt watch` automatically compiles to `/css/`
3. Refresh browser to see changes

### JavaScript Changes
1. Edit files in `/js/` (except `.min.js` files)
2. `grunt watch` automatically minifies
3. Refresh browser to see changes

## File Structure

```
project/
├── less/
│   ├── hux-blog.less          (main stylesheet)
│   ├── theme.less             (color definitions) NEW
│   ├── material-design.less   (design system) NEW
│   ├── variables.less         (color tokens) MODIFIED
│   ├── mixins.less
│   └── ...
├── css/
│   ├── hux-blog.css           (compiled, expanded)
│   └── hux-blog.min.css       (compiled, minified)
├── js/
│   ├── hux-blog.js
│   ├── hux-blog.min.js
│   └── theme-toggle.js        (theme switching) NEW
├── _includes/
│   ├── head.html              (MODIFIED)
│   ├── nav.html               (MODIFIED)
│   └── ...
├── _layouts/
│   ├── default.html           (MODIFIED)
│   └── ...
├── Gruntfile.js
└── package.json
```

## Next Steps

### Customize Colors
Edit theme colors in `/less/theme.less`:
- `.theme-light` block for light mode
- `.theme-dark` block for dark mode

### Extend Material Design
Add more design tokens in `/less/material-design.less`:
- Additional elevation levels
- Custom animation definitions
- Typography scales

### Performance Optimization
- Minify CSS/JS further using newer tools
- Implement critical CSS inlining
- Add image optimization

## Support

For issues with:
- **Jekyll**: Check Jekyll documentation
- **LESS**: See LESS language docs
- **Grunt**: Review Grunt plugins documentation
- **Theme System**: Check `THEME_README.md`

## References

- [Material Design 3](https://m3.material.io/)
- [LESS Language](http://lesscss.org/)
- [Grunt Documentation](https://gruntjs.com/)
- [Jekyll Documentation](https://jekyllrb.com/)
- [GitHub Pages](https://pages.github.com/)
