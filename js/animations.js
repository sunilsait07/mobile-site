/* ============================================
   SCROLL ANIMATIONS — Intersection Observer
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  const animElements = document.querySelectorAll('.anim-fade-up, .anim-fade-down, .anim-fade-left, .anim-fade-right, .anim-scale-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements
    animElements.forEach(function (el) {
      el.classList.add('anim-visible');
    });
  }

  /* ============================================
     ANIMATED NUMBER COUNTERS
     Inspired by headlight/index.html stats showcase
     ============================================ */
  const counterElements = document.querySelectorAll('[data-count]');

  if (counterElements.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    counterElements.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function formatNumber(num) {
      if (num >= 1000) {
        // Show as "15K" for 15000, etc.
        const k = num / 1000;
        if (k % 1 === 0) {
          return k.toLocaleString() + 'K';
        }
        return k.toFixed(1) + 'K';
      }
      return num.toLocaleString();
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Final value with suffix
        el.innerHTML = formatNumber(target) + '<span class="stat-suffix">' + suffix + '</span>';
      }
    }

    requestAnimationFrame(update);
  }

  /* ============================================
     FAQ ACCORDION
     Inspired by headlight/index.html accordion
     ============================================ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', function () {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            var otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) {
              otherAnswer.style.maxHeight = null;
            }
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  /* ============================================
     LIVE TELEMETRY DASHBOARD SIMULATOR
     ============================================ */
  const canvas = document.getElementById('telemetry-sparkline');
  const rpmTxt = document.getElementById('rpm-val-txt');
  const loadTxt = document.getElementById('load-val-txt');
  const terminal = document.getElementById('terminal-logs');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let dataPoints = Array(30).fill(40); // Initial flat points
    
    // Sparkline Draw loop
    function drawSparkline() {
      if (!canvas.getContext) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background area gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
      grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      
      const sliceWidth = canvas.width / (dataPoints.length - 1);
      for (let i = 0; i < dataPoints.length; i++) {
        const x = i * sliceWidth;
        // Invert Y because canvas 0 is at top
        const y = canvas.height - (dataPoints[i] / 100) * canvas.height * 0.8 - (canvas.height * 0.1);
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      
      // Draw the line
      ctx.beginPath();
      for (let i = 0; i < dataPoints.length; i++) {
        const x = i * sliceWidth;
        const y = canvas.height - (dataPoints[i] / 100) * canvas.height * 0.8 - (canvas.height * 0.1);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = '#10B981'; // Green theme color
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Telemetry updates
    let rpmValue = 3200;
    let tempValue = 98;
    let loadValue = 62;

    function updateTelemetry() {
      // Fluctuate values slightly
      rpmValue = Math.floor(2800 + Math.random() * 800);
      tempValue = Math.floor(95 + Math.random() * 6);
      loadValue = Math.floor(55 + Math.random() * 15);

      // Update text displays
      if (rpmTxt) rpmTxt.textContent = rpmValue.toLocaleString();
      if (loadTxt) loadTxt.textContent = loadValue + '%';

      // Update circular gauges
      // Max RPM assumed 8000 for percentage gauge fill
      const rpmPercent = (rpmValue / 8000) * 100;
      // Max Temp assumed 140C for percentage gauge fill
      const tempPercent = (tempValue / 140) * 100;

      const rpmRing = document.querySelector('.rpm-val');
      const tempRing = document.querySelector('.temp-val');

      if (rpmRing) {
        const offset = 251.2 - (251.2 * rpmPercent) / 100;
        rpmRing.style.strokeDashoffset = offset;
      }
      if (tempRing) {
        const offset = 251.2 - (251.2 * tempPercent) / 100;
        tempRing.style.strokeDashoffset = offset;
      }

      // Add new data point to sparkline
      dataPoints.push(loadValue);
      dataPoints.shift(); // Remove oldest
      
      drawSparkline();
    }

    // Run telemetry update every 300ms
    setInterval(updateTelemetry, 300);
  }

  // Terminal log simulator
  if (terminal) {
    const logMessages = [
      { type: 'ok', msg: 'CAN-bus: Communication rates nominal.' },
      { type: 'ok', msg: 'O2 Sensor 1 Bank 1: Voltage fluctuating 0.1V - 0.9V.' },
      { type: 'warn', msg: 'EGR System flow: Marginal limit reached.' },
      { type: 'ok', msg: 'Fuel Trim Bank 1: Short term 1.2% (OK).' },
      { type: 'ok', msg: 'Mass Air Flow: 3.4 g/s at idle.' },
      { type: 'err', msg: 'DTC Confirmed: P0302 Cylinder 2 misfire detected.' },
      { type: 'ok', msg: 'Abs. Throttle Position: 14.8%.' },
      { type: 'warn', msg: 'EVAP System Leak: Minor purge flow detected.' },
      { type: 'ok', msg: 'SRS Airbag module: Self-test passed.' },
      { type: 'ok', msg: 'ABS Solenoid Valves check: OK.' }
    ];

    function appendLog() {
      const date = new Date();
      const timeStr = '[' + 
        String(date.getHours()).padStart(2, '0') + ':' + 
        String(date.getMinutes()).padStart(2, '0') + ':' + 
        String(date.getSeconds()).padStart(2, '0') + ']';
      
      const randomMsg = logMessages[Math.floor(Math.random() * logMessages.length)];
      
      const logLine = document.createElement('div');
      logLine.className = 'log-line';
      
      let typeSpan = '';
      if (randomMsg.type === 'ok') {
        typeSpan = '<span class="log-ok">[OK]</span>';
      } else if (randomMsg.type === 'warn') {
        typeSpan = '<span class="log-warn">[WARN]</span>';
      } else if (randomMsg.type === 'err') {
        typeSpan = '<span class="log-err">[FAIL]</span>';
      }

      logLine.innerHTML = `<span class="log-time">${timeStr}</span> ${typeSpan} ${randomMsg.msg}`;
      
      terminal.appendChild(logLine);
      
      // Auto scroll to bottom
      terminal.scrollTop = terminal.scrollHeight;
      
      // Limit number of log lines to 20 to avoid memory growth
      while (terminal.children.length > 20) {
        terminal.removeChild(terminal.firstChild);
      }
    }

    // Append new log line every 4.5 seconds
    setInterval(appendLog, 4500);
  }
});

