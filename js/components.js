// ===== AUTODIAG — SHARED COMPONENTS =====
// Injects shared navbar and footer across all pages

(function () {
    'use strict';

    // --- Configuration ---
    const BRAND_NAME = 'AutoDiag';
    const CURRENT_YEAR = new Date().getFullYear();

    const NAV_LINKS = [
        { label: 'Home', href: 'index.html' },
        { label: 'Home 2', href: 'home2.html' },
        { label: 'About', href: 'about.html' },
        { label: 'Services', href: 'services.html' },
        { label: 'Pricing', href: 'pricing.html' },
        { label: 'Contact', href: 'contact.html' },
        { label: 'Dashboard', href: 'dashboard.html' }
    ];

    const LOGO_SVG = `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="8" fill="currentColor" style="color: var(--clr-primary)"/>
        <path d="M8 18C8 12.477 12.477 8 18 8C23.523 8 28 12.477 28 18" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M12 18C12 14.686 14.686 12 18 12C21.314 12 24 14.686 24 18" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
        <circle cx="18" cy="18" r="3" fill="#F97316"/>
        <line x1="18" y1="21" x2="18" y2="28" stroke="#F97316" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="14" y1="26" x2="22" y2="26" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    </svg>`;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // --- Render Navbar ---
    function renderNavbar() {
        const navLinksDesktop = NAV_LINKS.map(link => {
            const isActive = link.href === currentPage;
            return `<a href="${link.href}" class="${isActive ? 'active' : ''}">${link.label}</a>`;
        }).join('');

        const navLinksMobile = NAV_LINKS.map(link => {
            const isActive = link.href === currentPage;
            return `<a href="${link.href}" class="${isActive ? 'active' : ''}">${link.label}</a>`;
        }).join('');

        return `
        <div class="navbar-inner">
            <!-- Logo -->
            <a href="index.html" class="navbar-logo" id="nav-logo">
                ${LOGO_SVG}
                <div class="navbar-logo-text">Auto<span>Diag</span></div>
            </a>

            <!-- Nav Links (Desktop) -->
            <div class="navbar-links" id="nav-links">
                ${navLinksDesktop}
            </div>

            <!-- Actions (Desktop) -->
            <div class="navbar-actions" id="nav-actions">
                <button class="nav-toggle-btn theme-toggle" aria-label="Toggle theme">
                    <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                    <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                </button>
                <button class="nav-toggle-btn rtl-toggle" aria-label="Toggle RTL">
                    <svg class="icon-exchange" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17H4M4 17l4 4M4 17l4-4M4 7h16M20 7l-4-4M20 7l-4 4" /></svg>
                </button>
                <a href="login.html" class="btn btn-primary btn-sm" id="nav-signin">Sign In</a>
            </div>

            <!-- Mobile Toggle -->
            <button class="navbar-mobile-toggle" id="mobile-toggle" aria-label="Toggle menu">
                <svg class="icon-menu" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>

        <!-- Mobile Menu -->
        <div class="navbar-mobile-menu" id="mobile-menu">
            ${navLinksMobile}
            <div class="mobile-menu-actions">
                <a href="login.html" class="btn btn-primary btn-block">Sign In</a>
            </div>
            <div class="mobile-menu-toggles">
                <button class="nav-toggle-btn theme-toggle" aria-label="Toggle theme">
                    <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                    <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                </button>
                <button class="nav-toggle-btn rtl-toggle" aria-label="Toggle RTL">
                    <svg class="icon-exchange" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17H4M4 17l4 4M4 17l4-4M4 7h16M20 7l-4-4M20 7l-4 4" /></svg>
                </button>
            </div>
        </div>`;
    }

    // --- Render Footer ---
    function renderFooter() {
        return `
        <div class="footer-grid">
            <div class="footer-brand">
                <a href="index.html" class="footer-logo">
                    ${LOGO_SVG}
                    <div class="footer-logo-text">Auto<span>Diag</span></div>
                </a>
                <p>Professional mobile diagnostic and check engine light services. Expert OBD2 scanning right at your doorstep.</p>
                <div class="footer-socials">
                    <a href="#" class="footer-social-link" aria-label="Facebook">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href="#" class="footer-social-link" aria-label="Twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                    </a>
                    <a href="#" class="footer-social-link" aria-label="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                    <a href="#" class="footer-social-link" aria-label="LinkedIn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                </div>
            </div>
            <div class="footer-column">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="home2.html">Home 2 (Premium)</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="services.html">Our Services</a></li>
                    <li><a href="pricing.html">Pricing & Sliders</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>Support & Account</h4>
                <ul>
                    <li><a href="login.html">Sign In</a></li>
                    <li><a href="signup.html">Create Account</a></li>
                    <li><a href="dashboard.html">My Dashboard</a></li>
                    <li><a href="coming-soon.html">Coming Soon</a></li>
                    <li><a href="404.html">404 Page</a></li>
                </ul>
            </div>
            <div class="footer-column footer-newsletter-col">
                <h4>Stay Updated</h4>
                <p class="newsletter-desc">Subscribe to get vehicle health tips, service alerts, and exclusive OBD2 promotion offers.</p>
                <form id="newsletter-form" class="newsletter-form">
                    <div class="newsletter-input-group">
                        <input type="email" required placeholder="Enter your email" class="newsletter-input" aria-label="Email address"/>
                        <button type="submit" class="btn btn-primary btn-newsletter-submit" aria-label="Subscribe">
                            <span class="btn-text">Subscribe</span>
                            <span class="btn-spinner" style="display:none">
                                <svg class="spinner-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle class="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.25"></circle>
                                    <path class="spinner-head" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </form>
                <p id="newsletter-success" class="newsletter-success-msg" style="display:none">
                    <svg class="success-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Thanks for subscribing! Check your inbox.
                </p>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="footer-bottom-inner">
                <p>&copy; ${CURRENT_YEAR} ${BRAND_NAME}. All rights reserved.</p>
                <div class="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Cookie Policy</a>
                </div>
            </div>
        </div>`;
    }

    // --- Initialize ---
    function init() {
        const navContainer = document.getElementById('navbar-container');
        if (navContainer) {
            navContainer.classList.add('navbar');
            navContainer.innerHTML = renderNavbar();

            // Move mobile menu to body to avoid containment and stacking issues caused by backdrop-filter
            const mobileMenu = navContainer.querySelector('#mobile-menu');
            if (mobileMenu) {
                document.body.appendChild(mobileMenu);
            }

            // Set up scroll class toggling
            window.addEventListener('scroll', function () {
                if (window.scrollY > 20) {
                    navContainer.classList.add('scrolled');
                } else {
                    navContainer.classList.remove('scrolled');
                }
            });
        }

        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.classList.add('footer');
            footerContainer.innerHTML = renderFooter();
        }

        initMobileMenu();
        initToggles();
        initNewsletterForm();
    }

    // --- Mobile Menu Toggle logic (Fixes hamburger bug) ---
    function initMobileMenu() {
        const mobileToggle = document.getElementById('mobile-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

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
    }

    // --- Re-bind Theme and RTL Toggle clicks for dynamically generated buttons ---
    function initToggles() {
        const themeToggles = document.querySelectorAll('.theme-toggle');
        themeToggles.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                if (typeof window.toggleTheme === 'function') {
                    window.toggleTheme();
                }
            });
        });

        const rtlToggles = document.querySelectorAll('.rtl-toggle');
        rtlToggles.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                if (typeof window.toggleDirection === 'function') {
                    window.toggleDirection();
                }
            });
        });

        // Initialize state of icons based on current body attributes
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            const sunIcon = btn.querySelector('.icon-sun');
            const moonIcon = btn.querySelector('.icon-moon');
            if (sunIcon && moonIcon) {
                if (currentTheme === 'dark') {
                    sunIcon.style.display = 'block';
                    moonIcon.style.display = 'none';
                } else {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'block';
                }
            }
        });

        // No-op: Using static exchange icon matching fermentation design
    }

    // --- Newsletter Form Submission ---
    function initNewsletterForm() {
        const form = document.getElementById('newsletter-form');
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const btn = form.querySelector('.btn-newsletter-submit');
                const btnText = btn.querySelector('.btn-text');
                const btnSpinner = btn.querySelector('.btn-spinner');
                const successMsg = document.getElementById('newsletter-success');

                // Enable loading state
                btn.disabled = true;
                if (btnText) btnText.style.opacity = '0.3';
                if (btnSpinner) btnSpinner.style.display = 'inline-block';

                setTimeout(() => {
                    // Hide form input and show success message
                    const inputGroup = form.querySelector('.newsletter-input-group');
                    if (inputGroup) {
                        inputGroup.style.display = 'none';
                    }
                    if (successMsg) {
                        successMsg.style.display = 'flex';
                        successMsg.classList.add('fade-in');
                    }
                }, 1200);
            });
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
