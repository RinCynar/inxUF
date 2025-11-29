/*!
 * Material You Theme Toggle
 * Provides dark/light theme switching with localStorage persistence
 */

(function() {
  'use strict';

  const THEME_KEY = 'inxUF_theme';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';
  const THEME_AUTO = 'auto';

  class ThemeManager {
    constructor() {
      this.currentTheme = this.getStoredTheme();
      this.init();
    }

    /**
     * Get theme from localStorage or system preference
     */
    getStoredTheme() {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === THEME_DARK || stored === THEME_LIGHT) {
        return stored;
      }
      // Default to dark if not specified
      return THEME_DARK;
    }

    /**
     * Get system preference for theme
     */
    getSystemTheme() {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return THEME_DARK;
      }
      return THEME_LIGHT;
    }

    /**
     * Apply theme to document
     */
    applyTheme(theme) {
      const html = document.documentElement;
      
      if (theme === THEME_DARK) {
        html.classList.add('theme-dark');
        html.classList.remove('theme-light');
        html.setAttribute('data-theme', THEME_DARK);
        document.documentElement.style.colorScheme = 'dark';
      } else if (theme === THEME_LIGHT) {
        html.classList.add('theme-light');
        html.classList.remove('theme-dark');
        html.setAttribute('data-theme', THEME_LIGHT);
        document.documentElement.style.colorScheme = 'light';
      }
      
      this.currentTheme = theme;
      localStorage.setItem(THEME_KEY, theme);
      
      // Dispatch custom event for other scripts to listen
      window.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme: theme }
      }));
    }

    /**
     * Toggle between dark and light themes
     */
    toggle() {
      const newTheme = this.currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
      this.applyTheme(newTheme);
    }

    /**
     * Initialize theme on page load
     */
    init() {
      // Apply theme immediately to prevent flash
      this.applyTheme(this.currentTheme);
      
      // Listen for system theme changes
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
          if (this.currentTheme === THEME_AUTO) {
            this.applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
          }
        });
      }
    }

    /**
     * Get current theme
     */
    getCurrentTheme() {
      return this.currentTheme;
    }
  }

  // Initialize theme manager globally
  window.themeManager = new ThemeManager();

  // Setup theme toggle button if it exists
  document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.themeManager.toggle();
        
        // Update button appearance
        updateToggleButton();
      });
    }
    
    // Update button appearance on load
    updateToggleButton();
  });

  function updateToggleButton() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const toggleIcon = document.getElementById('theme-toggle-icon');
    
    if (!toggleBtn || !toggleIcon) return;
    
    const isDark = window.themeManager.getCurrentTheme() === THEME_DARK;
    
    // Update icon class
    if (isDark) {
      toggleIcon.classList.remove('fa-sun-o');
      toggleIcon.classList.add('fa-moon-o');
      toggleBtn.setAttribute('aria-label', 'Switch to light mode');
      toggleBtn.title = 'Light Mode';
    } else {
      toggleIcon.classList.remove('fa-moon-o');
      toggleIcon.classList.add('fa-sun-o');
      toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
      toggleBtn.title = 'Dark Mode';
    }
  }

  // Expose toggle method globally
  window.toggleTheme = function() {
    window.themeManager.toggle();
  };
})();
