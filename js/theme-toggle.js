/*!
 * Material You Theme Toggle
 * Dark/light switching with localStorage persistence and a
 * system-preference fallback (M3 dynamic color friendly).
 */

(function() {
  'use strict';

  var THEME_KEY = 'inxUF_theme';
  var THEME_DARK = 'dark';
  var THEME_LIGHT = 'light';

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEME_DARK;
    }
    return THEME_LIGHT;
  }

  function getStoredTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch (e) { /* storage unavailable */ }
    return stored === THEME_DARK || stored === THEME_LIGHT ? stored : null;
  }

  var currentTheme = getStoredTheme() || getSystemTheme();

  function applyTheme(theme) {
    var html = document.documentElement;
    html.classList.toggle('theme-dark', theme === THEME_DARK);
    html.classList.toggle('theme-light', theme === THEME_LIGHT);
    html.setAttribute('data-theme', theme);
    html.style.colorScheme = theme;

    var themeMeta = document.getElementById('theme-color-meta');
    if (themeMeta) {
      themeMeta.setAttribute('content', theme === THEME_DARK ? '#1c1b1f' : '#fffbfe');
    }

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) { /* storage unavailable */ }

    currentTheme = theme;
    updateToggleButton(theme);

    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: theme }
    }));
  }

  function updateToggleButton(theme) {
    var btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    var isDark = theme === THEME_DARK;
    btn.setAttribute('aria-label', isDark ? '切换到浅色模式' : '切换到深色模式');
    btn.title = isDark ? 'Light mode' : 'Dark mode';
  }

  // Apply theme immediately to prevent flash
  applyTheme(currentTheme);

  // React to OS-level theme changes only when the user has not chosen a theme
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      if (!getStoredTheme()) {
        applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
      }
    });
  }

  // Wire up the toggle button
  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        applyTheme(currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK);
      });
    }
    updateToggleButton(currentTheme);
  });

  // Public API
  window.themeManager = {
    getCurrentTheme: function() { return currentTheme; },
    toggle: function() {
      applyTheme(currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK);
    }
  };
  window.toggleTheme = function() {
    window.themeManager.toggle();
  };
})();
