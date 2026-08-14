/*!
 * Material You Theme
 * Preference: system | light | dark
 */

(function() {
  'use strict';

  var THEME_KEY = 'inxUF_theme';
  var THEME_DARK = 'dark';
  var THEME_LIGHT = 'light';
  var THEME_SYSTEM = 'system';

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEME_DARK;
    }
    return THEME_LIGHT;
  }

  function getStoredPref() {
    var stored = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch (e) { /* storage unavailable */ }
    if (stored === THEME_DARK || stored === THEME_LIGHT || stored === THEME_SYSTEM) {
      return stored;
    }
    return THEME_SYSTEM;
  }

  function resolveTheme(pref) {
    return pref === THEME_LIGHT || pref === THEME_DARK ? pref : getSystemTheme();
  }

  var currentPref = getStoredPref();
  var currentTheme = resolveTheme(currentPref);

  function setThemeColor(theme) {
    var themeMeta = document.getElementById('theme-color-meta');
    if (themeMeta) {
      themeMeta.setAttribute('content', theme === THEME_DARK ? '#1c1b1f' : '#fffbfe');
    }
  }

  function applyResolvedTheme(theme) {
    var html = document.documentElement;
    html.classList.toggle('theme-dark', theme === THEME_DARK);
    html.classList.toggle('theme-light', theme === THEME_LIGHT);
    html.setAttribute('data-theme', theme);
    html.style.colorScheme = theme;
    setThemeColor(theme);
    currentTheme = theme;
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: theme, preference: currentPref }
    }));
  }

  function persistPref(pref) {
    try {
      localStorage.setItem(THEME_KEY, pref);
    } catch (e) { /* storage unavailable */ }
  }

  function applyPreference(pref) {
    currentPref = pref;
    persistPref(pref);
    applyResolvedTheme(resolveTheme(pref));
    updateMenu();
  }

  function updateMenu() {
    var btn = document.getElementById('theme-toggle-btn');
    var menu = document.getElementById('theme-menu');
    if (btn) {
      var label = currentPref === THEME_SYSTEM ? 'Theme: System' : (currentPref === THEME_DARK ? 'Theme: Dark' : 'Theme: Light');
      btn.setAttribute('aria-label', label);
      btn.title = label;
    }
    if (menu) {
      Array.prototype.forEach.call(menu.querySelectorAll('[data-theme-pref]'), function(item) {
        var selected = item.getAttribute('data-theme-pref') === currentPref;
        item.setAttribute('aria-checked', selected ? 'true' : 'false');
        item.classList.toggle('is-selected', selected);
      });
    }
  }

  function closeMenu() {
    var menu = document.getElementById('theme-menu');
    var btn = document.getElementById('theme-toggle-btn');
    if (menu) menu.hidden = true;
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    var menu = document.getElementById('theme-menu');
    var btn = document.getElementById('theme-toggle-btn');
    if (!menu || !btn) return;
    var open = menu.hidden;
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  applyResolvedTheme(currentTheme);

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      if (getStoredPref() === THEME_SYSTEM) {
        applyResolvedTheme(e.matches ? THEME_DARK : THEME_LIGHT);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('theme-toggle-btn');
    var menu = document.getElementById('theme-menu');
    if (btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
      });
    }
    if (menu) {
      menu.addEventListener('click', function(e) {
        var item = e.target.closest('[data-theme-pref]');
        if (!item) return;
        applyPreference(item.getAttribute('data-theme-pref'));
        closeMenu();
      });
    }
    document.addEventListener('click', function(e) {
      var wrap = document.getElementById('theme-menu-wrap');
      if (wrap && !wrap.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeMenu();
    });
    updateMenu();
  });

  window.themeManager = {
    getCurrentTheme: function() { return currentTheme; },
    getPreference: function() { return currentPref; },
    setPreference: applyPreference,
    toggle: function() {
      applyPreference(currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK);
    }
  };
  window.toggleTheme = function() {
    window.themeManager.toggle();
  };
})();
