/* ============================================
   THEME TOGGLE — Dark / Light Mode
   ============================================ */

(function () {
  const STORAGE_KEY = 'mds-theme';

  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleIcons(theme);
  }

  function updateToggleIcons(theme) {
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(btn => {
      const sunIcon = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        }
      }
    });
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  // Initialize theme
  const stored = getStoredTheme();
  if (stored) {
    setTheme(stored);
  } else {
    // Default to light
    setTheme('light');
  }

  // Bind click events after DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });
    // Re-apply icons
    updateToggleIcons(document.documentElement.getAttribute('data-theme') || 'light');
  });

  // Expose globally
  window.toggleTheme = toggleTheme;
})();
