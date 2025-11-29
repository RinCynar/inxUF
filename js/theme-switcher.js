/**
 * Material You Theme Switcher
 * Supports light and dark mode with localStorage persistence
 * Default: Dark mode
 */

(function() {
  'use strict';

  const THEME_KEY = 'inxuf-theme';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';
  const SYSTEM_THEME = 'system';

  /**
   * Get the system's preferred color scheme
   */
  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK_THEME;
    }
    return LIGHT_THEME;
  }

  /**
   * Get the current theme (from storage or system preference)
   */
  function getCurrentTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) {
      return stored;
    }
    // Default to dark mode
    return DARK_THEME;
  }

  /**
   * Apply theme to the document
   */
  function applyTheme(theme) {
    const html = document.documentElement;
    
    if (theme === SYSTEM_THEME) {
      const systemTheme = getSystemTheme();
      html.setAttribute('data-theme', systemTheme);
      localStorage.setItem(THEME_KEY, SYSTEM_THEME);
      updateThemeSwitcher(SYSTEM_THEME);
    } else if (theme === LIGHT_THEME) {
      html.setAttribute('data-theme', LIGHT_THEME);
      localStorage.setItem(THEME_KEY, LIGHT_THEME);
      updateThemeSwitcher(LIGHT_THEME);
    } else {
      // Default to dark
      html.removeAttribute('data-theme');
      localStorage.setItem(THEME_KEY, DARK_THEME);
      updateThemeSwitcher(DARK_THEME);
    }
  }

  /**
   * Update the theme switcher button/indicator
   */
  function updateThemeSwitcher(theme) {
    const switches = document.querySelectorAll('[data-theme-switcher]');
    switches.forEach(switcher => {
      // Update button states
      const buttons = switcher.querySelectorAll('[data-theme-option]');
      buttons.forEach(btn => {
        const btnTheme = btn.getAttribute('data-theme-option');
        if (btnTheme === theme) {
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');
        } else {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        }
      });

      // Update icon/text if using a toggle button
      const toggleBtn = switcher.querySelector('[data-theme-toggle]');
      if (toggleBtn) {
        const icon = toggleBtn.querySelector('[data-theme-icon]');
        const label = toggleBtn.getAttribute('aria-label');
        
        if (theme === LIGHT_THEME) {
          if (icon) icon.textContent = '☀️';
          if (label) toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
        } else if (theme === DARK_THEME) {
          if (icon) icon.textContent = '🌙';
          if (label) toggleBtn.setAttribute('aria-label', 'Switch to light mode');
        } else {
          if (icon) icon.textContent = '🎨';
          if (label) toggleBtn.setAttribute('aria-label', 'Use system theme');
        }
      }
    });
  }

  /**
   * Toggle between dark and light themes
   */
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    applyTheme(newTheme);
    
    // Dispatch custom event for other scripts to listen
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
  }

  /**
   * Initialize theme system
   */
  function initThemeSystem() {
    const currentTheme = getCurrentTheme();
    applyTheme(currentTheme);

    // Bind theme switcher buttons
    const themeSwitchers = document.querySelectorAll('[data-theme-switcher]');
    themeSwitchers.forEach(switcher => {
      // Handle individual theme option buttons
      const buttons = switcher.querySelectorAll('[data-theme-option]');
      buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          const theme = this.getAttribute('data-theme-option');
          applyTheme(theme);
          window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
        });
      });

      // Handle quick toggle button
      const toggleBtn = switcher.querySelector('[data-theme-toggle]');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
          e.preventDefault();
          toggleTheme();
        });
      }
    });

    // Listen to system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
        const currentTheme = localStorage.getItem(THEME_KEY);
        if (currentTheme === SYSTEM_THEME) {
          applyTheme(SYSTEM_THEME);
        }
      });
    }
  }

  // Expose public API
  window.ThemeSwitcher = {
    init: initThemeSystem,
    getCurrentTheme: getCurrentTheme,
    applyTheme: applyTheme,
    toggle: toggleTheme
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSystem);
  } else {
    initThemeSystem();
  }
})();
