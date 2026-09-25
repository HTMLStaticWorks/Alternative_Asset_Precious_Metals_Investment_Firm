/* ═══════════════════════════════════════════════════════════════════
   AUREX CAPITAL — DASHBOARD JAVASCRIPT
   Sidebar navigation, tab switching, chart placeholders, data
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initDashboard);

  function initDashboard() {
    initSidebar();
    initTabs();
    initPortfolioChart();
  }

  /* ── Sidebar Toggle (Mobile) ───────────────────────────────────── */
  function initSidebar() {
    const toggle = document.querySelector('.dashboard__menu-toggle');
    const sidebar = document.querySelector('.dashboard__sidebar');
    const overlay = document.querySelector('.dashboard__overlay');

    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
    });

    if (overlay) {
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      });
    }

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
      }
    });
  }

  /* ── Tab Navigation ────────────────────────────────────────────── */
  function initTabs() {
    const navLinks = document.querySelectorAll('.dashboard__nav-link[data-tab]');
    const tabContents = document.querySelectorAll('.dashboard__tab-content');

    if (navLinks.length === 0) return;

    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const tabId = this.getAttribute('data-tab');

        // Update active nav link
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        this.classList.add('active');

        // Show target tab content
        tabContents.forEach(function (content) {
          content.classList.toggle('active', content.id === tabId);
        });

        // Update page title
        const topTitle = document.querySelector('.dashboard__topbar h1');
        if (topTitle) {
          topTitle.textContent = this.textContent.trim();
        }

        // Close sidebar on mobile
        const sidebar = document.querySelector('.dashboard__sidebar');
        const overlay = document.querySelector('.dashboard__overlay');
        if (window.innerWidth <= 1024) {
          if (sidebar) sidebar.classList.remove('open');
          if (overlay) overlay.classList.remove('active');
        }
      });
    });
  }

  /* ── Portfolio Donut Chart (CSS-based) ─────────────────────────── */
  function initPortfolioChart() {
    const chartEl = document.querySelector('.portfolio-chart');
    if (!chartEl) return;

    const data = [
      { label: 'Gold', value: 45, color: '#C9A96E' },
      { label: 'Silver', value: 22, color: '#A8A9AD' },
      { label: 'Platinum', value: 18, color: '#B0C4DE' },
      { label: 'Palladium', value: 10, color: '#CDA776' },
      { label: 'Other', value: 5, color: '#6E6E82' }
    ];

    let gradientParts = [];
    let cumulative = 0;

    data.forEach(function (item) {
      const start = cumulative;
      cumulative += item.value;
      gradientParts.push(item.color + ' ' + start + '% ' + cumulative + '%');
    });

    chartEl.style.background = 'conic-gradient(' + gradientParts.join(', ') + ')';

    // Legend
    const legendEl = document.querySelector('.portfolio-legend');
    if (legendEl) {
      data.forEach(function (item) {
        const legendItem = document.createElement('div');
        legendItem.classList.add('portfolio-legend__item');
        legendItem.innerHTML =
          '<span class="portfolio-legend__color" style="background:' + item.color + '"></span>' +
          '<span class="portfolio-legend__label">' + item.label + '</span>' +
          '<span class="portfolio-legend__value">' + item.value + '%</span>';
        legendEl.appendChild(legendItem);
      });
    }
  }



  /* ── Sparkline Mini Charts (CSS-based) ─────────────────────────── */
  function initSparklines() {
    document.querySelectorAll('.sparkline').forEach(function (el) {
      const values = el.getAttribute('data-values').split(',').map(Number);
      const max = Math.max.apply(null, values);
      const min = Math.min.apply(null, values);
      const range = max - min || 1;
      const width = 100 / values.length;

      values.forEach(function (val) {
        const bar = document.createElement('span');
        bar.classList.add('sparkline__bar');
        const height = ((val - min) / range) * 100;
        bar.style.height = Math.max(height, 5) + '%';
        bar.style.width = width + '%';
        el.appendChild(bar);
      });
    });
  }

})();
