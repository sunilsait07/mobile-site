/* ============================================
   DASHBOARD — Tab Switching, Sidebar, Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  // --- Sidebar Navigation Configuration ---
  const SIDEBAR_ITEMS = [
    {
      group: 'Main',
      items: [
        {
          id: 'dash-home',
          label: 'Dashboard',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`
        },
        {
          id: 'dash-schedule',
          label: 'Schedule Scan',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`
        },
        {
          id: 'dash-reports',
          label: 'Diagnostic Reports',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`
        },
        {
          id: 'dash-estimates',
          label: 'Repair Estimates',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`
        },
        {
          id: 'dash-history',
          label: 'Vehicle History',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
        }
      ]
    },
    {
      group: 'Tools',
      items: [
        {
          id: 'dash-lookup',
          label: 'Code Lookup',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
        },
        {
          id: 'dash-track',
          label: 'Track Mechanic',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
        }
      ]
    }
  ];

  function renderSidebar() {
    const navContainer = document.getElementById('sidebar-nav');
    if (!navContainer) return;

    navContainer.innerHTML = SIDEBAR_ITEMS.map(group => `
      <div class="sidebar-nav-group">
        <div class="group-label">${group.group}</div>
        ${group.items.map(item => `
          <button class="sidebar-link ${item.id === 'dash-home' ? 'active' : ''}" data-page="${item.id}" title="${item.label}">
            ${item.icon}
            <span>${item.label}</span>
          </button>
        `).join('')}
      </div>
    `).join('');
  }

  // Dynamically populate the sidebar nav
  renderSidebar();

  // --- Sidebar Navigation Links & Pages ---
  const sidebarLinks = document.querySelectorAll('.sidebar-link[data-page]');
  const dashPages = document.querySelectorAll('.dash-page');
  const topbarTitle = document.querySelector('.topbar-title');

  function switchPage(pageId) {
    // Update sidebar active
    sidebarLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-page') === pageId);
    });
    // Show page
    dashPages.forEach(page => {
      page.classList.toggle('active', page.id === pageId);
    });
    // Update title
    const activeLink = document.querySelector(`.sidebar-link[data-page="${pageId}"]`);
    if (activeLink && topbarTitle) {
      topbarTitle.textContent = activeLink.querySelector('span')?.textContent || 'Dashboard';
    } else if (pageId === 'dash-notifications' && topbarTitle) {
      topbarTitle.textContent = 'Notifications';
    }

    // Close mobile sidebar
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  sidebarLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const pageId = this.getAttribute('data-page');
      if (pageId) switchPage(pageId);
    });
  });

  // Topbar notifications toggle
  const notificationDot = document.querySelector('.notification-dot');
  if (notificationDot) {
    notificationDot.addEventListener('click', function (e) {
      e.preventDefault();
      switchPage('dash-notifications');
    });
  }

  // --- Mobile Sidebar Toggle ---
  const sidebarToggle = document.querySelector('.sidebar-toggle-btn');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
      document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function () {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // --- Code Lookup in Dashboard ---
  const dashCodeInput = document.getElementById('dash-code-input');
  const dashCodeResult = document.getElementById('dash-code-result');

  const codes = {
    'P0301': { title: 'P0301 — Cylinder 1 Misfire', severity: 'Moderate', severityClass: 'badge-warning', desc: 'Cylinder 1 is misfiring. May cause rough idle and loss of power.', system: 'Ignition', cause: 'Faulty spark plug or coil', cost: '$85 – $300' },
    'P0420': { title: 'P0420 — Catalyst Efficiency Below Threshold', severity: 'Moderate', severityClass: 'badge-warning', desc: 'Catalytic converter not performing efficiently.', system: 'Exhaust', cause: 'Worn catalytic converter', cost: '$200 – $2,500' },
    'P0171': { title: 'P0171 — System Too Lean (Bank 1)', severity: 'Low', severityClass: 'badge-primary', desc: 'Fuel mixture too lean on bank 1.', system: 'Fuel', cause: 'Vacuum leak, faulty MAF sensor', cost: '$100 – $500' },
    'P0300': { title: 'P0300 — Random Multiple Misfire', severity: 'High', severityClass: 'badge-error', desc: 'Multiple cylinders misfiring randomly.', system: 'Engine', cause: 'Low fuel pressure, worn plugs', cost: '$150 – $1,000' },
    'P0442': { title: 'P0442 — EVAP System Small Leak', severity: 'Low', severityClass: 'badge-primary', desc: 'Small leak in evaporative emission system.', system: 'EVAP', cause: 'Loose gas cap', cost: '$0 – $200' },
    'P0455': { title: 'P0455 — EVAP System Large Leak', severity: 'Moderate', severityClass: 'badge-warning', desc: 'Large leak in evaporative emission system.', system: 'EVAP', cause: 'Missing gas cap, hose disconnect', cost: '$0 – $300' },
    'P0128': { title: 'P0128 — Coolant Temp Below Thermostat', severity: 'Low', severityClass: 'badge-primary', desc: 'Engine not reaching optimal temperature.', system: 'Cooling', cause: 'Stuck open thermostat', cost: '$50 – $200' },
    'P0500': { title: 'P0500 — Vehicle Speed Sensor Malfunction', severity: 'Moderate', severityClass: 'badge-warning', desc: 'Speed sensor signal is erratic or missing.', system: 'Transmission', cause: 'Faulty speed sensor', cost: '$100 – $400' }
  };

  if (dashCodeInput && dashCodeResult) {
    dashCodeInput.addEventListener('input', function () {
      const val = this.value.toUpperCase().trim();
      if (codes[val]) {
        const c = codes[val];
        dashCodeResult.innerHTML = `
          <div class="code-result" style="display:block; margin-top: var(--space-md); background: var(--clr-bg-alt); border-radius: var(--radius-md); padding: var(--space-lg); border-inline-start: 4px solid var(--clr-secondary);">
            <div class="code-title" style="display:flex; align-items:center; gap:var(--space-sm); font-weight:600; margin-bottom:var(--space-xs);">${c.title} <span class="badge ${c.severityClass}">${c.severity}</span></div>
            <p style="font-size:var(--fs-sm); color:var(--clr-text-secondary); margin-bottom:var(--space-sm);">${c.desc}</p>
            <div style="display:grid; grid-template-columns: repeat(2,1fr); gap:var(--space-xs);">
              <div style="font-size:var(--fs-xs); color:var(--clr-text-tertiary);"><strong style="color:var(--clr-text-secondary);">System:</strong> ${c.system}</div>
              <div style="font-size:var(--fs-xs); color:var(--clr-text-tertiary);"><strong style="color:var(--clr-text-secondary);">Cause:</strong> ${c.cause}</div>
              <div style="font-size:var(--fs-xs); color:var(--clr-text-tertiary);"><strong style="color:var(--clr-text-secondary);">Est. Cost:</strong> ${c.cost}</div>
            </div>
          </div>`;
      } else if (val.length > 0) {
        dashCodeResult.innerHTML = `<p style="margin-top:var(--space-md); font-size:var(--fs-sm); color:var(--clr-text-tertiary);">No results. Try: P0301, P0420, P0171, P0300, P0442, P0455, P0128, P0500</p>`;
      } else {
        dashCodeResult.innerHTML = '';
      }
    });
  }

  // --- Logout ---
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      window.location.href = 'login.html';
    });
  }
});
