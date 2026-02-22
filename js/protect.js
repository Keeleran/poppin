/* ============================================
   POPPIN — Code Protection Suite
   Anti-copy, anti-inspect, anti-scrape
   ============================================ */
(function () {
    'use strict';

    /* Disable right-click */
    document.addEventListener('contextmenu', function (e) { e.preventDefault(); });

    /* Disable text selection */
    document.addEventListener('selectstart', function (e) { e.preventDefault(); });

    /* Disable drag */
    document.addEventListener('dragstart', function (e) { e.preventDefault(); });

    /* Disable copy/cut/paste */
    ['copy', 'cut', 'paste'].forEach(function (ev) {
        document.addEventListener(ev, function (e) { e.preventDefault(); });
    });

    /* Block keyboard shortcuts */
    document.addEventListener('keydown', function (e) {
        /* F12 — DevTools */
        if (e.key === 'F12') { e.preventDefault(); return false; }
        /* Ctrl/Cmd + U — View Source */
        if ((e.ctrlKey || e.metaKey) && e.key === 'u') { e.preventDefault(); return false; }
        /* Ctrl/Cmd + S — Save */
        if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); return false; }
        /* Ctrl/Cmd + A — Select All */
        if ((e.ctrlKey || e.metaKey) && e.key === 'a') { e.preventDefault(); return false; }
        /* Ctrl/Cmd + C — Copy */
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') { e.preventDefault(); return false; }
        /* Ctrl/Cmd + Shift + I — Inspect */
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') { e.preventDefault(); return false; }
        /* Ctrl/Cmd + Shift + J — Console */
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') { e.preventDefault(); return false; }
        /* Ctrl/Cmd + Shift + C — Element Picker */
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') { e.preventDefault(); return false; }
        /* Ctrl/Cmd + P — Print */
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') { e.preventDefault(); return false; }
        /* PrintScreen */
        if (e.key === 'PrintScreen') { e.preventDefault(); return false; }
    });

    /* Anti-DevTools detection */
    var devtoolsOpen = false;
    var threshold = 160;
    setInterval(function () {
        var widthThreshold = window.outerWidth - window.innerWidth > threshold;
        var heightThreshold = window.outerHeight - window.innerHeight > threshold;
        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0a0612;color:#7c3aed;font-family:sans-serif;font-size:1.5rem;text-align:center;padding:2rem"><div>🔒 Access Restricted<br><small style="color:#666;font-size:0.8rem">Developer tools are not permitted on this platform.</small></div></div>';
            }
        }
    }, 1000);

    /* Disable console methods */
    var noop = function () { };
    try {
        Object.defineProperty(window, 'console', {
            get: function () {
                return { log: noop, warn: noop, error: noop, info: noop, debug: noop, table: noop, trace: noop, dir: noop, clear: noop };
            },
            set: noop
        });
    } catch (e) { }

    /* CSS Protection */
    var style = document.createElement('style');
    style.textContent = '* { -webkit-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; user-select: none !important; } input, textarea { -webkit-user-select: text !important; -moz-user-select: text !important; user-select: text !important; } img { pointer-events: none !important; }';
    document.head.appendChild(style);
})();
