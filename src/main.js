import {home} from "./js/home.js";
import {bride} from "./js/bride.js";
import {time} from "./js/time.js";
import {galeri} from "./js/galeri.js";
import {wishas} from "./js/wishas.js";
import {navbar} from "./js/navbar.js";
import {welcome} from "./js/welcome.js";

// Global hardening: block copy/paste and context menu; mitigate zoom gestures on mobile
(() => {
    const blocked = ['copy', 'cut', 'paste', 'contextmenu', 'dragstart'];
    blocked.forEach(evt => document.addEventListener(evt, (e) => e.preventDefault(), true));

    // prevent selecting text (extra guard besides CSS)
    document.addEventListener('selectstart', (e) => e.preventDefault(), true);

    // Block common keyboard shortcuts for copy/paste
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'v'].includes(e.key.toLowerCase())) {
            e.preventDefault();
        }
    }, true);

    // iOS Safari pinch gesture events
    ['gesturestart', 'gesturechange', 'gestureend'].forEach(evt => {
        document.addEventListener(evt, (e) => e.preventDefault(), { passive: false });
    });
})();

// load content
document.addEventListener('DOMContentLoaded', () => {
    AOS.init();

    welcome();
    navbar();
    home();
    bride()
    time();
    galeri();
    wishas();
});