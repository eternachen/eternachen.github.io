(function () {
    'use strict';

    var root = document.documentElement;

    /* ---------------------------------------------------------------------
       Colour scheme
       The stored preference (if any) is applied by an inline script in the
       document head; this only wires up the toggle button.
       --------------------------------------------------------------------- */

    var toggle = document.querySelector('.theme-toggle');

    if (toggle) {
        var media = window.matchMedia('(prefers-color-scheme: dark)');

        var currentTheme = function () {
            return root.getAttribute('data-theme') || (media.matches ? 'dark' : 'light');
        };

        var syncToggle = function () {
            var isDark = currentTheme() === 'dark';
            toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
            toggle.setAttribute('aria-label', isDark ? '切换到浅色模式' : '切换到深色模式');
        };

        toggle.addEventListener('click', function () {
            var next = currentTheme() === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try {
                window.localStorage.setItem('theme', next);
            } catch (e) { /* storage unavailable — the choice just won't persist */ }
            syncToggle();
        });

        var onSystemChange = function () {
            syncToggle();
        };

        if (media.addEventListener) {
            media.addEventListener('change', onSystemChange);
        } else if (media.addListener) {
            media.addListener(onSystemChange);
        }

        syncToggle();
    }

    /* ---------------------------------------------------------------------
       Back to top
       --------------------------------------------------------------------- */

    var toTop = document.querySelector('.to-top');

    if (toTop) {
        var updateToTop = function () {
            var offset = window.pageYOffset || document.documentElement.scrollTop || 0;
            toTop.classList.toggle('is-visible', offset > 400);
        };

        window.addEventListener('scroll', updateToTop, { passive: true });
        updateToTop();
    }
})();
