window.SITE_BASEURL = window.SITE_BASEURL || '';

(function () {
    'use strict';

    var baseurl = window.SITE_BASEURL;
    var form = document.querySelector('.search-form');
    var input = document.getElementById('search');
    var results = document.getElementById('search-results');
    var status = document.getElementById('search-status');

    if (!form || !input || !results) {
        return;
    }

    var postsPromise = null;

    function loadPosts() {
        if (!postsPromise) {
            postsPromise = fetch(baseurl + '/search.json').then(function (response) {
                if (!response.ok) {
                    throw new Error('HTTP ' + response.status);
                }
                return response.json();
            });
        }
        return postsPromise;
    }

    function toWords(query) {
        return query.toLowerCase().split(/\s+/).filter(Boolean);
    }

    function haystack(post) {
        return [
            post.title,
            post.url,
            post.date,
            (post.tags || []).join(' '),
            post.content || ''
        ].join(' ').toLowerCase();
    }

    function snippet(content, words) {
        if (!content) {
            return '';
        }
        var lower = content.toLowerCase();
        var at = -1;
        for (var i = 0; i < words.length; i++) {
            var found = lower.indexOf(words[i]);
            if (found !== -1 && (at === -1 || found < at)) {
                at = found;
            }
        }
        if (at === -1) {
            return content.slice(0, 150);
        }
        var start = Math.max(0, at - 60);
        return (start > 0 ? '…' : '') + content.slice(start, start + 170) + '…';
    }

    function buildCard(post, words) {
        var card = document.createElement('article');
        card.className = 'post-card';

        var title = document.createElement('h2');
        title.className = 'post-card__title';
        var link = document.createElement('a');
        link.href = baseurl + post.url;
        link.textContent = post.title;
        title.appendChild(link);

        var meta = document.createElement('div');
        meta.className = 'post-meta';
        var time = document.createElement('time');
        time.dateTime = post.date;
        time.textContent = post.date;
        meta.appendChild(time);
        if (post.tags && post.tags.length) {
            var dot = document.createElement('span');
            dot.className = 'post-meta__dot';
            dot.setAttribute('aria-hidden', 'true');
            dot.textContent = '·';
            meta.appendChild(dot);
            var tags = document.createElement('span');
            tags.className = 'tag-list';
            post.tags.forEach(function (tag) {
                var chip = document.createElement('a');
                chip.className = 'tag';
                chip.href = baseurl + '/tags/#' + tag;
                chip.textContent = tag;
                tags.appendChild(chip);
            });
            meta.appendChild(tags);
        }

        var excerpt = document.createElement('div');
        excerpt.className = 'post-card__excerpt';
        var paragraph = document.createElement('p');
        paragraph.textContent = snippet(post.content, words);
        excerpt.appendChild(paragraph);

        card.appendChild(title);
        card.appendChild(meta);
        card.appendChild(excerpt);
        return card;
    }

    function render(query) {
        var trimmed = query.trim();

        if (!trimmed) {
            results.textContent = '';
            status.hidden = true;
            return;
        }

        var words = toWords(trimmed);

        loadPosts().then(function (posts) {
            var matched = posts.filter(function (post) {
                var hay = haystack(post);
                return words.every(function (word) {
                    return hay.indexOf(word) !== -1;
                });
            });

            results.textContent = '';
            matched.forEach(function (post) {
                results.appendChild(buildCard(post, words));
            });

            status.hidden = false;
            status.textContent = matched.length
                ? '找到 ' + matched.length + ' 篇匹配 “' + trimmed + '” 的文章'
                : '没有找到匹配 “' + trimmed + '” 的文章';
        }).catch(function () {
            results.textContent = '';
            status.hidden = false;
            status.textContent = '搜索索引加载失败，请稍后再试。';
        });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var query = input.value;
        var url = form.getAttribute('action') + (query ? '?q=' + encodeURIComponent(query) : '');
        window.history.pushState({ q: query }, '', url);
        render(query);
    });

    var debounce = null;
    input.addEventListener('input', function () {
        window.clearTimeout(debounce);
        debounce = window.setTimeout(function () {
            render(input.value);
        }, 150);
    });

    var initial = new URLSearchParams(window.location.search).get('q') || '';
    if (initial) {
        input.value = initial;
        input.focus();
    }
    render(initial);
})();
