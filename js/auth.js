/* ============================================
   AUTH — Login & Signup Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  // --- Password visibility toggle ---
  const passwordToggles = document.querySelectorAll('.password-toggle');
  passwordToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      const field = this.closest('.password-field');
      const input = field.querySelector('.form-input');
      const eyeOpen = this.querySelector('.eye-open');
      const eyeClosed = this.querySelector('.eye-closed');

      const isSecured = input.classList.contains('secured') || input.type === 'password';

      if (isSecured) {
        input.type = 'text';
        input.classList.remove('secured');
        if (eyeOpen) eyeOpen.style.display = 'none';
        if (eyeClosed) eyeClosed.style.display = 'block';
      } else {
        input.type = 'text';
        input.classList.add('secured');
        if (eyeOpen) eyeOpen.style.display = 'block';
        if (eyeClosed) eyeClosed.style.display = 'none';
      }
    });
  });

  // --- Form Redirects for Interactivity ---
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = document.getElementById('login-submit');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Signing in...';
      }
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 800);
    });
  }

  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = document.getElementById('signup-submit');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Creating account...';
      }
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 800);
    });
  }
});

