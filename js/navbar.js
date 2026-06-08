/* ============================================
   NAVBAR — Mobile Menu, Scroll, Dropdown
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.navbar-mobile-toggle');
  const mobileMenu = document.querySelector('.navbar-mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.navbar-mobile-menu a');

  // --- Mobile menu toggle ---
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.contains('active');
      mobileMenu.classList.toggle('active');
      // Toggle hamburger icon
      const openIcon = mobileToggle.querySelector('.icon-menu');
      const closeIcon = mobileToggle.querySelector('.icon-close');
      if (openIcon && closeIcon) {
        openIcon.style.display = isOpen ? 'block' : 'none';
        closeIcon.style.display = isOpen ? 'none' : 'block';
      }
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close menu when a link is clicked
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        const openIcon = mobileToggle.querySelector('.icon-menu');
        const closeIcon = mobileToggle.querySelector('.icon-close');
        if (openIcon && closeIcon) {
          openIcon.style.display = 'block';
          closeIcon.style.display = 'none';
        }
      });
    });
  }

  // --- Scroll state ---
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // --- Active link highlight ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-links a, .navbar-mobile-menu a:not(.btn)');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
