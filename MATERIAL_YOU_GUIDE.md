# Material You Design System Implementation Guide

## Overview

This website has been completely redesigned to conform to **Material Design 3 (Material You)** specifications. Material You emphasizes dynamic color theming, expressive motion, and accessible typography.

## Color System

### Core Colors (Light Mode)

| Token | Color | Usage |
|-------|-------|-------|
| `@primary` | #0f7e4f | Primary action button, links, highlights |
| `@on-primary` | #ffffff | Text/icons on primary |
| `@primary-container` | #91f7c0 | Secondary actions, tonal buttons |
| `@on-primary-container` | #002116 | Text on primary container |
| `@secondary` | #4a635b | Secondary accent |
| `@surface` | #fffbfe | Card & background surfaces |
| `@on-surface` | #1c1b1f | Primary text |
| `@outline` | #79747e | Borders, dividers |
| `@outline-variant` | #cac4d0 | Subtle borders |
| `@error` | #b3261e | Error states |

### Semantic Colors

- **Link Color**: `@primary` (#0f7e4f)
- **Hover Link**: darken(`@primary`, 12%)
- **Background**: `@background` (#fffbfe)
- **Surface**: `@surface` (#fffbfe)
- **Border**: `@outline-variant` (#cac4d0)

## Typography System

### Scale Hierarchy

| Style | Desktop | Mobile | Font Weight | Letter Spacing |
|-------|---------|--------|------------|-----------------|
| Display Large | 57px | - | 400 | 0px |
| Headline Large | 32px | 28px | 400 | 0px |
| Headline Medium | 28px | 24px | 400 | 0px |
| Title Large | 22px | 20px | 500 | 0px |
| Title Medium | 16px | 14px | 500 | 0.15px |
| Body Large | 16px | 14px | 400 | 0.5px |
| Body Medium | 14px | 12px | 400 | 0.25px |
| Label Large | 14px | 12px | 500 | 0.1px |

### Implementation

```less
h1 { 
  font-size: 32px; 
  font-weight: 400; 
  line-height: 40px; 
}

h2 { 
  font-size: 28px; 
  font-weight: 400; 
  line-height: 36px; 
}

p { 
  font-size: 16px; 
  font-weight: 400; 
  line-height: 24px; 
  letter-spacing: 0.5px; 
}
```

## Spacing System

Consistent 4px base unit spacing:

- `@spacing-1`: 4px
- `@spacing-2`: 8px
- `@spacing-3`: 12px
- `@spacing-4`: 16px
- `@spacing-5`: 20px
- `@spacing-6`: 24px
- `@spacing-7`: 28px
- `@spacing-8`: 32px

## Component Updates

### Buttons

**Filled Button (Primary)**
```less
.btn-default {
  background-color: @primary;
  color: @on-primary;
  border-radius: @radius-md; // 12px
  padding: 10px 24px;
  font-weight: 500;
  
  &:hover {
    background-color: lighten(@primary, 8%);
    .elevation-1;
  }
}
```

**Key Changes:**
- Removed uppercase text transform
- Changed border-radius from 0 to 12px (Material rounded)
- Updated padding to 10px 24px
- Added elevation on hover
- Font weight: 800 → 500

### Cards

**Post Preview Cards**
- Now use surface-variant background
- Subtle border with outline-variant
- Elevation on hover
- Smooth transitions

### Pagers & Navigation

**Navigation Items**
- Updated from uppercase to normal case
- Font size: 13px → 14px
- Font weight: 800 → 500
- Added rounded corners (12px)
- Integrated elevation system

### Links

**All Links Now:**
- Use `@primary` color (#0f7e4f)
- No underline by default
- Underline appears on hover
- Smooth transition (150ms)

## Elevation & Shadows

Material You uses a systematic shadow system:

```less
.elevation-0 { box-shadow: none; }
.elevation-1 { box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12); }
.elevation-2 { box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16); }
.elevation-3 { box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.19); }
.elevation-4 { box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.15); }
.elevation-5 { box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2); }
```

## Transitions

Consistent motion throughout the design:

```less
@transition-short: 150ms cubic-bezier(0.4, 0, 0.2, 1);
@transition-medium: 250ms cubic-bezier(0.4, 0, 0.2, 1);
@transition-long: 350ms cubic-bezier(0.4, 0, 0.2, 1);
```

## Border Radius System

```less
@radius-none: 0;
@radius-xs: 4px;
@radius-sm: 8px;
@radius-md: 12px;
@radius-lg: 16px;
@radius-xl: 28px;
@radius-full: 50%;
```

## Files Modified

### Core LESS Files
1. **less/variables.less** - Material You color tokens
2. **less/material-you.less** - Design tokens and system definitions
3. **less/material-components.less** - Reusable component styles
4. **less/hux-blog.less** - Updated global styles
5. **less/sidebar.less** - Updated sidebar components

### Key Component Updates
- Button styles (filled, tonal, outlined, text, elevated)
- Card components
- Form inputs and controls
- Navigation bar
- Post previews
- Sidebar and featured tags
- Pager navigation
- Footer

## Migration Notes

### Old to New Mappings

| Old Variable | New Variable | Value |
|---------|---------|-------|
| `@brand-primary` | `@primary` | #0f7e4f |
| `@gray-dark` | `@on-surface` | #1c1b1f |
| `@gray-light` | `@outline` | #79747e |
| `@white-faded` | (preserved) | fade(white, 80%) |

### Backward Compatibility

All legacy variable names are maintained in `variables.less` for compatibility:
```less
@gray-dark: @on-surface;
@gray-light: @outline;
```

## Building & Deployment

To compile LESS files to CSS:

```bash
npm run build
# or
grunt
```

This will:
1. Compile LESS to CSS
2. Minify CSS and JS
3. Add copyright banners

## Accessibility

Material You emphasizes accessibility:

- **Color Contrast**: All text meets WCAG AA standards
- **Focus States**: Clear 2px outline on primary color
- **Disabled States**: Reduced opacity for disabled elements
- **Typography**: Clear hierarchy with proper line-heights
- **Motion**: Reduced motion support (optional)

## Dark Mode Support (Future)

The color system is designed to support dark mode. To implement:

1. Create `_dark.less` with inverted color tokens
2. Define alternate shadows
3. Wrap dark mode styles in `@media (prefers-color-scheme: dark)`

## Resources

- [Material Design 3 Documentation](https://m3.material.io/)
- [Material Design 3 Color System](https://m3.material.io/styles/color/overview)
- [Material Design 3 Typography](https://m3.material.io/styles/typography/overview)

## Questions & Issues

When making updates:
1. Reference Material Design 3 specs
2. Maintain color and spacing consistency
3. Test across devices
4. Check accessibility (WCAG AA+)
5. Update this guide if adding new tokens
