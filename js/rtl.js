/* ============================================
   RTL TOGGLE — LTR / RTL Direction
   ============================================ */

(function () {
  const STORAGE_KEY = 'mds-dir';

  function getStoredDir() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function setDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(STORAGE_KEY, dir);
    updateToggleIcons(dir);
  }

  function updateToggleIcons(dir) {
    // No-op: using static horizontal exchange arrow icon matching fermentation design
  }

  function toggleDirection() {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    const next = current === 'rtl' ? 'ltr' : 'rtl';
    setDirection(next);
  }

  // Initialize
  const stored = getStoredDir();
  if (stored) {
    setDirection(stored);
  } else {
    setDirection('ltr');
  }

  // Bind
  document.addEventListener('DOMContentLoaded', function () {
    const toggles = document.querySelectorAll('.rtl-toggle');
    toggles.forEach(btn => {
      btn.addEventListener('click', toggleDirection);
    });
    updateToggleIcons(document.documentElement.getAttribute('dir') || 'ltr');
  });

  window.toggleDirection = toggleDirection;
})();
