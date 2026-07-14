/* ── Universal Header Injection Script ──────────────────────────────── */
/* 
  Load this script in every plain HTML page as:
  <script src="inject-header.js"></script>
  
  Place it BEFORE any other scripts that need the header to exist.
*/

(function injectHeader() {
  // Fetch the shared header HTML
  fetch('shared-header.html')
    .then(response => response.text())
    .then(headerHTML => {
      // Insert header at the very top of body
      document.body.insertAdjacentHTML('afterbegin', headerHTML);
      
      // Initialize header functionality
      initHeaderInteractions();
      initMobileDrawer();
      setActiveNavLink();
    })
    .catch(error => console.error('Failed to inject header:', error));
})();

// ── Mobile drawer ─────────────────────────────────────────────────────

function initMobileDrawer() {
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileBackdrop');
  const closeBtn = document.getElementById('mdClose');
  if (!toggle || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
  }

  toggle.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  const sub = document.getElementById('mdTrades');
  if (sub) {
    const subToggle = sub.querySelector('.md-sub-toggle');
    if (subToggle) subToggle.addEventListener('click', () => sub.classList.toggle('open'));
  }

  const svcSub = document.getElementById('mdServices');
  if (svcSub) {
    const svcToggle = svcSub.querySelector('.md-sub-toggle');
    if (svcToggle) svcToggle.addEventListener('click', () => svcSub.classList.toggle('open'));
  }
}

// ── Header Interactions ──────────────────────────────────────────────

function initHeaderInteractions() {
  const header = document.querySelector('header');
  if (!header) return;

  // ── Scroll shrink removed — header stays full height ─────────────

  const dropdowns = header.querySelectorAll('.nav-dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    
    if (!toggle || !menu) return;

    // Close when clicking a link in the dropdown
    const items = menu.querySelectorAll('a');
    items.forEach(item => {
      item.addEventListener('click', () => {
        menu.style.display = 'none';
      });
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.nav-dropdown-menu');
        if (menu) menu.style.display = 'none';
      });
    }
  });
}

// ── Set Active Nav Link ──────────────────────────────────────────────

function setActiveNavLink() {
  const header = document.querySelector('header');
  if (!header) return;

  // Get current page filename
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Find and mark active link
  const navLinks = header.querySelectorAll('nav.nav-links a.nav-link:not(.nav-dropdown-toggle)');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}