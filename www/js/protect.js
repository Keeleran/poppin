/* ============================================
   POPPIN — Lightweight Protection  v2.1
   Mobile-safe · iOS-compatible · Non-blocking
   ============================================ */

(function () {
    'use strict';

    /* Detect mobile — skip aggressive checks on iOS/Android */
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    /* --- Disable right-click context menu --- */
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    /* --- Disable text selection on non-input elements --- */
    document.addEventListener('selectstart', function (e) {
        const tag = e.target.tagName.toLowerCase();
        if (['input', 'textarea', 'select'].includes(tag)) return;
        e.preventDefault();
    });

    /* --- Disable drag --- */
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
    });

    /* --- Block copy/cut/paste on non-input elements --- */
    ['copy', 'cut', 'paste'].forEach(function (evt) {
        document.addEventListener(evt, function (e) {
            const tag = e.target.tagName.toLowerCase();
            if (['input', 'textarea', 'select'].includes(tag)) return;
            e.preventDefault();
        });
    });

    /* --- Block common DevTools keyboard shortcuts (desktop only) --- */
    if (!isMobile) {
        document.addEventListener('keydown', function (e) {
            /* F12 */
            if (e.key === 'F12') { e.preventDefault(); return; }
            /* Ctrl+Shift+I/J/C */
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
                e.preventDefault(); return;
            }
            /* Ctrl+U (view source) */
            if ((e.ctrlKey || e.metaKey) && e.key.toUpperCase() === 'U') {
                e.preventDefault(); return;
            }
        });
    }
})();
