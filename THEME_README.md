# Material You Theme System

This website now features a Material You design system with dynamic dark/light theme switching.

## Features

- **Dynamic Theme Switching**: Toggle between dark and light themes using the theme button in the navigation bar
- **System Preference Detection**: Respects user's system color scheme preference
- **Persistent Selection**: Theme preference is saved in localStorage and persists across sessions
- **Material You Design**: Modern Material Design 3 color tokens and component styles
- **Smooth Transitions**: All theme changes animate smoothly without flash

## Theme System Architecture

### CSS Variables
The theme system uses CSS custom properties (variables) that are dynamically updated based on the selected theme:

**Light Theme Colors:**
- Primary: `#0085a1`
- Secondary: `#7cb342`
- Tertiary: `#ff6f00`
- Background: `#fffbfe`
- Surface: `#ffffff`

**Dark Theme Colors:**
- Primary: `#80deea`
- Secondary: `#c5e1a5`
- Tertiary: `#ffb74d`
- Background: `#0f0f12`
- Surface: `#1a1a1a`

### Files

- **`/js/theme-toggle.js`**: Main theme switching logic with localStorage persistence
- **`/less/theme.less`**: Theme color definitions (light and dark variants)
- **`/less/material-design.less`**: Material Design system tokens (elevation, shapes, transitions)
- **`/less/variables.less`**: LESS variables and Material You color tokens

## Usage

### For Users
Click the sun/moon icon in the navigation bar to toggle between themes. Your preference is automatically saved.

### For Developers

#### Accessing Theme Values in JavaScript
```javascript
// Get current theme
const theme = window.themeManager.getCurrentTheme(); // 'light' or 'dark'

// Toggle theme
window.toggleTheme();

// Listen to theme changes
window.addEventListener('themechange', (e) => {
  console.log('Theme changed to:', e.detail.theme);
});
```

#### Using CSS Variables in Styles
Use Material You CSS variables directly in your CSS/LESS:

```less
.my-element {
  background-color: var(--surface);
  color: var(--on-surface);
  border: 1px solid var(--border-color);
}

// Material Design elevation system
.card {
  .elevation-2;
}

// Material Design shapes
.button {
  .shape-medium;
}

// State layers for interactions
.interactive {
  &:hover {
    background-color: var(--hover-overlay);
  }
}
```

#### Available CSS Variables

**Colors:**
- `--primary`, `--primary-container`, `--on-primary`, `--on-primary-container`
- `--secondary`, `--secondary-container`, `--on-secondary`, `--on-secondary-container`
- `--tertiary`, `--tertiary-container`, `--on-tertiary`, `--on-tertiary-container`
- `--error`, `--error-container`, `--on-error`, `--on-error-container`
- `--surface`, `--surface-dim`, `--surface-bright`, `--surface-container*`
- `--on-surface`, `--on-surface-variant`
- `--background`, `--on-background`
- `--outline`, `--outline-variant`
- `--border-color`, `--shadow-color`, `--hover-overlay`

**Material Design Classes:**
- Elevation: `.elevation-0` through `.elevation-5`
- Shapes: `.shape-extra-small`, `.shape-small`, `.shape-medium`, `.shape-large`, `.shape-extra-large`
- Transitions: `.transition-standard`, `.transition-emphasis`, `.transition-decelerate`, `.transition-accelerate`
- State Layers: `.state-hover`, `.state-focus`, `.state-active`

## Browser Support

- Modern browsers with CSS Custom Properties support
- Chrome/Edge 49+
- Firefox 31+
- Safari 9.1+
- Mobile browsers (iOS Safari 9.2+, Chrome for Android)

## Default Theme

The website defaults to **dark theme** on first visit. Users can switch to light theme using the theme toggle button.

## Customization

To customize theme colors, edit:
1. **Light theme**: `.theme-light` in `/less/theme.less`
2. **Dark theme**: `.theme-dark` in `/less/theme.less`
3. **LESS variables**: Update color definitions in `/less/variables.less`

Then rebuild CSS with:
```bash
npm run start  # or grunt
```

## GitHub Pages Deployment

The theme system works seamlessly with GitHub Pages:
- All theme logic is client-side JavaScript
- No server-side rendering required
- Theme preference persists across page loads via localStorage
- Works offline thanks to service worker support

Build and deploy:
```bash
npm run start   # Start dev server
npm run dev     # Watch mode
grunt          # Build assets
git push       # Deploy to GitHub Pages
```
