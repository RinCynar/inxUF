# Material You Quick Reference Card

## Color Palette

```less
// Primary (Green)
@primary: #0f7e4f                // Main action color
@on-primary: #ffffff              // Text on primary
@primary-container: #91f7c0       // Secondary button bg
@on-primary-container: #002116    // Text on container

// Secondary (Teal)
@secondary: #4a635b
@on-secondary: #ffffff

// Surface & Text
@surface: #fffbfe                 // Card/background
@on-surface: #1c1b1f              // Primary text
@surface-variant: #ece4f0         // Chip/tag bg
@on-surface-variant: #49454e      // Secondary text

// Borders & Error
@outline: #79747e                 // Strong border
@outline-variant: #cac4d0         // Subtle border
@error: #b3261e                   // Error color
```

## Typography

```less
// Headings
h1 { font-size: 32px; font-weight: 400; line-height: 40px; }
h2 { font-size: 28px; font-weight: 400; line-height: 36px; }
h3 { font-size: 24px; font-weight: 400; line-height: 32px; }
h4 { font-size: 22px; font-weight: 500; line-height: 28px; }
h5 { font-size: 16px; font-weight: 500; line-height: 24px; }

// Body
p { font-size: 16px; font-weight: 400; line-height: 24px; }
small { font-size: 12px; font-weight: 400; line-height: 16px; }
```

## Spacing Grid

```less
@spacing-1: 4px      @spacing-2: 8px      @spacing-3: 12px
@spacing-4: 16px     @spacing-5: 20px     @spacing-6: 24px
@spacing-7: 28px     @spacing-8: 32px
```

## Border Radius

```less
@radius-xs: 4px       @radius-sm: 8px      @radius-md: 12px
@radius-lg: 16px      @radius-xl: 28px     @radius-full: 50%
```

## Components

### Button

```html
<!-- Filled (Primary) -->
<button class="btn btn-default">Action</button>

<!-- Tonal -->
<button class="btn btn-tonal">Secondary</button>

<!-- Outlined -->
<button class="btn btn-outlined">Outlined</button>

<!-- Text -->
<button class="btn btn-text">Text</button>
```

### Card

```html
<div class="card">
  <div class="card-content">
    <!-- Content -->
  </div>
</div>

<div class="card card-elevated">Elevated Card</div>
<div class="card card-filled">Filled Card</div>
```

### Chip

```html
<span class="chip">Chip</span>
<span class="chip chip-filled">Filled</span>
<span class="chip chip-outlined">Outlined</span>
```

### Tag

```html
<a href="#">#tag</a>
<!-- Tags in #tag_cloud use auto-styling -->
```

## Transitions

```less
.transition-short()    // 150ms (state changes)
.transition-medium()   // 250ms (navigation)
.transition-long()     // 350ms (complex)
```

## Elevation

```less
.elevation-0   // No shadow
.elevation-1   // Subtle (card hover)
.elevation-2   // Lifted
.elevation-3   // Floating (dialog)
.elevation-4   // High (modal)
.elevation-5   // Top-level overlay
```

## Common Patterns

### Link

```less
a {
  color: @primary;
  text-decoration: none;
  .transition-short();
  
  &:hover {
    color: darken(@primary, 12%);
    text-decoration: underline;
  }
}
```

### Button

```less
.btn {
  background-color: @primary;
  color: @on-primary;
  border-radius: @radius-md;
  padding: 10px 24px;
  .transition-medium();
  
  &:hover {
    .elevation-1;
  }
}
```

### Card

```less
.card {
  background-color: @surface;
  border: 1px solid @outline-variant;
  border-radius: @radius-md;
  padding: @spacing-6;
  .elevation-0;
  .transition-medium();
  
  &:hover {
    .elevation-1;
  }
}
```

### Input

```less
input {
  background-color: @surface-variant;
  border: 1px solid @outline;
  border-radius: @radius-xs;
  padding: @spacing-4;
  color: @on-surface;
  
  &:focus {
    border-color: @primary;
    box-shadow: 0 0 0 3px fade(@primary, 12%);
  }
}
```

## Do's and Don'ts

✅ **Do**
- Use color variables (@primary, @surface, etc.)
- Use spacing variables (@spacing-*)
- Use transition mixins
- Use elevation system
- Maintain contrast ratios (WCAG AA)

❌ **Don't**
- Use hardcoded colors
- Use irregular spacing
- Skip transitions on interactions
- Create custom shadows
- Break color contrast rules

## File Structure

```
less/
├── variables.less          // Material colors & legacy compat
├── material-you.less       // Design tokens & system
├── material-components.less // Component library
├── mixins.less             // Utility mixins
├── hux-blog.less          // Global styles (updated)
├── sidebar.less           // Sidebar (updated)
└── other files...
```

## Build

```bash
npm run build      # Compile & minify
npm run dev        # Watch mode
grunt              # Manual build
```

## Resources

- [Material Design 3](https://m3.material.io/)
- [MATERIAL_YOU_GUIDE.md](./MATERIAL_YOU_GUIDE.md)
- [MATERIAL_YOU_IMPLEMENTATION_SUMMARY.md](./MATERIAL_YOU_IMPLEMENTATION_SUMMARY.md)

---

**Quick Tips:**
1. Always use variables, never hardcode
2. Use `@primary` for action colors
3. Use `@on-surface` for text
4. Use `@outline-variant` for borders
5. Use `.transition-short()` for state changes
6. Use elevation for depth
7. Test WCAG contrast in DevTools
