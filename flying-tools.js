// flying-tools.js — drifting faded power-tool silhouettes for light/bright sections.
// Targets any section the design system marks as a white section (.on-light / .bg-light).
// Safe to include on every page: dark sections are skipped automatically.
(function () {
  // Tool silhouettes. Hammers and screwdrivers are listed multiple times so
  // they appear more frequently in the drift than the other tools.
  var DRILL = '<svg viewBox="0 0 64 64" fill="currentColor"><path d="M6 24h22l4-4h6v-4h10v4h6l4 4v8l-4 4h-6v4h-4l-4 6h-6v-6l-6-6H6z"/><rect x="20" y="40" width="10" height="18" rx="2"/></svg>';
  var WRENCH = '<svg viewBox="0 0 64 64" fill="currentColor"><path d="M46 6a14 14 0 0 0-13 19L8 50a5 5 0 0 0 7 7l25-25a14 14 0 0 0 19-13l-9 9-8-2-2-8z"/></svg>';
  var HAMMER = '<svg viewBox="0 0 64 64" fill="currentColor"><path d="M30 6l20 8-4 8-6-2-4 4 4 4-18 26-6-6 16-22-4-4-4 4-2-6z"/></svg>';
  var SAW = '<svg viewBox="0 0 64 64" fill="currentColor"><path d="M32 4l5 8 9-4-1 10 10 1-7 7 7 7-10 1 1 10-9-4-5 8-5-8-9 4 1-10-10-1 7-7-7-7 10-1-1-10 9 4z"/><circle cx="32" cy="32" r="7" fill="#fff"/></svg>';
  var SCREWDRIVER = '<svg viewBox="0 0 64 64" fill="currentColor"><path d="M40 6l18 18-10 6-4-4-22 22-6 8-8 2 2-8 8-6 22-22-4-4z"/></svg>';
  var TOOLS = [
    HAMMER, SCREWDRIVER, HAMMER, SCREWDRIVER,  // weighted heavier
    DRILL, WRENCH, SAW,
    HAMMER, SCREWDRIVER
  ];

  var css = `
  .ft-bg{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
  .ft-float{position:absolute;color:var(--navy,#002768);opacity:0;animation:ftDrift linear infinite}
  .ft-float svg{display:block;width:100%;height:100%}
  @keyframes ftDrift{
    0%{opacity:0;transform:translateY(40px) rotate(var(--r0))}
    12%{opacity:.07}
    88%{opacity:.07}
    100%{opacity:0;transform:translateY(-80px) rotate(var(--r1))}
  }
  @media(prefers-reduced-motion:reduce){.ft-float{animation:none;opacity:.05}}
  `;
  var style = document.createElement('style');
  style.id = 'ft-styles';
  style.textContent = css;
  document.head.appendChild(style);

  function populate(sec) {
    if (sec.dataset.ftDone) return;
    sec.dataset.ftDone = '1';
    if (getComputedStyle(sec).position === 'static') sec.style.position = 'relative';

    var bg = document.createElement('div');
    bg.className = 'ft-bg';

    var n = 8 + Math.floor(Math.random() * 3); // 8–10 tools
    // Shuffle a copy so each section gets a varied mix (still hammer/driver-heavy).
    var bag = TOOLS.slice().sort(function () { return Math.random() - 0.5; });
    for (var i = 0; i < n; i++) {
      var el = document.createElement('div');
      el.className = 'ft-float';
      var size = 70 + Math.random() * 120;
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.left = (Math.random() * 88 + 2) + '%';
      el.style.top = (Math.random() * 78 + 4) + '%';
      el.style.setProperty('--r0', (Math.random() * 60 - 30) + 'deg');
      el.style.setProperty('--r1', (Math.random() * 120 - 60) + 'deg');
      el.style.animationDuration = (16 + Math.random() * 16) + 's';
      el.style.animationDelay = (-Math.random() * 24) + 's';
      el.innerHTML = bag[i % bag.length];
      bg.appendChild(el);
    }
    sec.insertBefore(bg, sec.firstChild);
  }

  function run() {
    document.querySelectorAll('section.on-light, section.bg-light').forEach(populate);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  // Re-scan shortly after, in case sections are rendered by React (trade pages).
  setTimeout(run, 400);
  setTimeout(run, 1200);
})();
