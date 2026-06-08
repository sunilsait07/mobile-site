/* ============================================
   PRICING PAGE — Toggle & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  const toggleOptions = document.querySelectorAll('.pricing-toggle .toggle-option');
  const monthlyPrices = document.querySelectorAll('[data-monthly]');
  const annualPrices = document.querySelectorAll('[data-annual]');

  toggleOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      toggleOptions.forEach(o => o.classList.remove('active'));
      this.classList.add('active');

      const period = this.getAttribute('data-period');

      monthlyPrices.forEach(function (el) {
        if (period === 'monthly') {
          el.textContent = el.getAttribute('data-monthly');
        } else {
          el.textContent = el.getAttribute('data-annual');
        }
      });

      // Update period labels
      document.querySelectorAll('.price-period').forEach(function (label) {
        label.textContent = period === 'monthly' ? '/month' : '/month (billed annually)';
      });
    });
  });

  // Accordion for pricing FAQ
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      const item = this.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(function (otherItem) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordion-content').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Fleet calculator logic
  const fleetSlider = document.getElementById('fleet-size-slider');
  const fleetSizeVal = document.getElementById('fleet-size-val');
  const packageCost = document.getElementById('package-cost');
  const savingsVal = document.getElementById('savings-val');

  if (fleetSlider) {
    fleetSlider.addEventListener('input', function() {
      const vehicles = parseInt(this.value);
      fleetSizeVal.textContent = vehicles >= 100 ? '100+ Vehicles' : `${vehicles} Vehicles`;
      
      // Calculate costs: package is $30 per vehicle up to 20, $25 up to 50, $20 above 50
      let perVehicleRate = 30;
      if (vehicles > 50) {
        perVehicleRate = 20;
      } else if (vehicles > 20) {
        perVehicleRate = 25;
      }
      
      const cost = vehicles * perVehicleRate;
      // Savings are approximately 40% of standard diagnostics (which cost $49/vehicle standard basic scan)
      const savings = Math.round(vehicles * (49 - perVehicleRate));
      
      packageCost.innerHTML = `$${cost}<span style="font-size: var(--fs-xs); font-weight: var(--fw-medium);">/mo</span>`;
      savingsVal.innerHTML = `$${savings}<span style="font-size: var(--fs-xs); font-weight: var(--fw-medium);">/mo</span>`;
    });
  }
});
