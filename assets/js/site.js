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

    /* ---------------------------------------------------------------------
       Table of contents
       `_includes/toc.html` renders <details class="post-toc"> for long
       articles. Here we collapse it on narrow screens, highlight the section
       currently in view, and give every heading a copyable anchor link.
       Pages without a TOC leave all of this alone.
       --------------------------------------------------------------------- */

    var TOC_DESKTOP = 1080;   // matches the $L breakpoint in the stylesheet
    var HEADING_OFFSET = 96;  // keeps the sticky header clear when picking a section

    var toc = document.querySelector('.post-toc');
    var prose = document.querySelector('.prose');

    if (toc) {
        var syncTocOpen = function () {
            if (window.innerWidth < TOC_DESKTOP) {
                toc.removeAttribute('open');
            } else {
                toc.setAttribute('open', '');
            }
        };

        syncTocOpen();
        window.addEventListener('resize', syncTocOpen, { passive: true });
    }

    if (prose) {
        /* Every section heading becomes independently linkable. */
        var headings = prose.querySelectorAll('h2[id], h3[id]');

        Array.prototype.forEach.call(headings, function (heading) {
            if (heading.querySelector('.heading-anchor')) {
                return;
            }
            var anchor = document.createElement('a');
            anchor.className = 'heading-anchor';
            anchor.href = '#' + heading.id;
            anchor.setAttribute('aria-label', '链接到本节');
            anchor.textContent = '§';
            heading.appendChild(anchor);
        });
    }

    if (toc && prose) {
        var headingList = prose.querySelectorAll('h2[id], h3[id]');

        /* id -> link, so the spy never has to build a selector from an id. */
        var tocLinks = {};
        Array.prototype.forEach.call(toc.querySelectorAll('.post-toc__link'), function (link) {
            var id = (link.getAttribute('href') || '').replace(/^#/, '');
            if (id) {
                tocLinks[id] = link;
            }
        });

        var setCurrent = function (id) {
            var previous = toc.querySelector('.post-toc__link[aria-current]');
            if (previous) {
                previous.removeAttribute('aria-current');
            }
            if (id && tocLinks[id]) {
                tocLinks[id].setAttribute('aria-current', 'true');
            }
        };

        /* The current section is the lowest heading whose top edge has
           already crossed the offset line just below the header. */
        var syncCurrent = function () {
            var current = '';
            var top = -Infinity;
            Array.prototype.forEach.call(headingList, function (heading) {
                var rect = heading.getBoundingClientRect();
                if (rect.top <= HEADING_OFFSET && rect.top > top) {
                    top = rect.top;
                    current = heading.id;
                }
            });
            if (!current && headingList.length) {
                current = headingList[0].id;
            }
            setCurrent(current);
        };

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(syncCurrent, {
                rootMargin: '-' + HEADING_OFFSET + 'px 0px -70% 0px',
                threshold: 0
            });
            Array.prototype.forEach.call(headingList, function (heading) {
                observer.observe(heading);
            });
        } else {
            window.addEventListener('scroll', syncCurrent, { passive: true });
        }

        syncCurrent();

        /* Anchors scroll with the visitor's motion preference in mind. */
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        toc.addEventListener('click', function (event) {
            var node = event.target;
            var link = node && node.closest ? node.closest('.post-toc__link') : null;
            if (!link) {
                return;
            }
            var hash = link.getAttribute('href') || '';
            if (hash.charAt(0) !== '#') {
                return;
            }
            var target = document.getElementById(hash.slice(1));
            if (!target) {
                return;
            }
            event.preventDefault();
            target.scrollIntoView({
                behavior: reduceMotion.matches ? 'auto' : 'smooth',
                block: 'start'
            });
            if (window.history && window.history.replaceState) {
                window.history.replaceState(null, '', hash);
            }
        });
    }
})();
