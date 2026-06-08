/* ============================================
   HOME 2 — Premium Page Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Animated Counters ---
  const counters = document.querySelectorAll('[data-count]');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const start = 0;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * (target - start) + start);
        counter.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString() + suffix;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // Observe stats section
  const statsSection = document.querySelector('.live-stats');
  if (statsSection) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  // --- Code Lookup Demo ---
  const codeInput = document.getElementById('code-search-input');
  const codeResult = document.getElementById('code-result');

  const codeDatabase = {
    'P0301': {
      title: 'P0301 — Cylinder 1 Misfire Detected',
      severity: 'Moderate',
      severityClass: 'badge-warning',
      description: 'The engine control module has detected that cylinder 1 is misfiring. This can cause rough idle, loss of power, and increased emissions.',
      system: 'Ignition System',
      commonCause: 'Faulty spark plug, ignition coil, or fuel injector',
      estimatedCost: '$85 – $300'
    },
    'P0420': {
      title: 'P0420 — Catalyst System Efficiency Below Threshold',
      severity: 'Moderate',
      severityClass: 'badge-warning',
      description: 'The catalytic converter is not performing as efficiently as expected. This may cause increased emissions and reduced fuel economy.',
      system: 'Exhaust System',
      commonCause: 'Worn catalytic converter, oxygen sensor failure',
      estimatedCost: '$200 – $2,500'
    },
    'P0171': {
      title: 'P0171 — System Too Lean (Bank 1)',
      severity: 'Low',
      severityClass: 'badge-primary',
      description: 'The fuel mixture is too lean on bank 1, meaning there is too much air or not enough fuel in the combustion mix.',
      system: 'Fuel System',
      commonCause: 'Vacuum leak, faulty MAF sensor, weak fuel pump',
      estimatedCost: '$100 – $500'
    },
    'P0300': {
      title: 'P0300 — Random/Multiple Cylinder Misfire Detected',
      severity: 'High',
      severityClass: 'badge-error',
      description: 'Multiple cylinders are misfiring randomly. This indicates a serious engine problem that should be addressed immediately.',
      system: 'Engine/Ignition',
      commonCause: 'Low fuel pressure, vacuum leak, worn spark plugs',
      estimatedCost: '$150 – $1,000'
    },
    'P0442': {
      title: 'P0442 — EVAP System Small Leak Detected',
      severity: 'Low',
      severityClass: 'badge-primary',
      description: 'A small leak has been detected in the evaporative emission control system. Usually a loose gas cap or minor hose issue.',
      system: 'EVAP System',
      commonCause: 'Loose gas cap, cracked EVAP hose',
      estimatedCost: '$0 – $200'
    }
  };

  if (codeInput && codeResult) {
    codeInput.addEventListener('input', function () {
      const value = this.value.toUpperCase().trim();
      if (codeDatabase[value]) {
        const data = codeDatabase[value];
        codeResult.innerHTML = `
          <div class="code-title">
            ${data.title}
            <span class="code-badge badge ${data.severityClass}">${data.severity}</span>
          </div>
          <p class="code-description">${data.description}</p>
          <div class="code-details">
            <div class="code-detail"><strong>System:</strong> ${data.system}</div>
            <div class="code-detail"><strong>Common Cause:</strong> ${data.commonCause}</div>
            <div class="code-detail"><strong>Est. Repair:</strong> ${data.estimatedCost}</div>
          </div>
        `;
        codeResult.style.display = 'block';
      } else if (value.length > 0) {
        codeResult.innerHTML = `
          <div class="code-title">Searching...</div>
          <p class="code-description">Try codes like P0301, P0420, P0171, P0300, or P0442</p>
        `;
        codeResult.style.display = 'block';
      } else {
        codeResult.style.display = 'none';
      }
    });
  }

  // --- Dashboard Preview Chart Animation ---
  const chartBars = document.querySelectorAll('.chart-bar');
  const previewMockup = document.querySelector('.preview-mockup');

  if (previewMockup && chartBars.length) {
    const chartObserver = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          chartBars.forEach(bar => {
            const height = bar.getAttribute('data-height');
            bar.style.height = height;
          });
          chartObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    chartObserver.observe(previewMockup);
  }
});
