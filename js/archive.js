/* Vanilla JS archive filter + year collapse + mobile sheet */
(function() {
    function queryString() {
        var queryObj = {};
        var queryStr = window.location.search.substring(1);
        var queryArr = queryStr.split('&');
        for (var i = 0; i < queryArr.length; i++) {
            var pair = queryArr[i].split('=');
            if (!pair[0]) continue;
            var key = pair[0];
            var value = pair[1] || '';
            if (typeof queryObj[key] === 'undefined') {
                queryObj[key] = value;
            } else if (typeof queryObj[key] === 'string') {
                queryObj[key] = [queryObj[key], value];
            } else {
                queryObj[key].push(value);
            }
        }
        return queryObj;
    }

    var setUrlQuery = (function() {
        var baseUrl = window.location.href.split('?')[0];
        return function(query) {
            if (typeof query === 'string') {
                window.history.replaceState(null, '', baseUrl + query);
            } else {
                window.history.replaceState(null, '', baseUrl);
            }
        };
    })();

    document.addEventListener('DOMContentLoaded', function() {
        var tagsContainer = document.querySelector('.js-tags');
        if (!tagsContainer) return;

        var articleTags = Array.from(tagsContainer.querySelectorAll('.tag-button'));
        var tagShowAll = tagsContainer.querySelector('.tag-button--all');
        var resultContainer = document.querySelector('.js-result');
        var sections = Array.from(resultContainer.querySelectorAll('section'));
        var emptyEl = document.getElementById('archive-empty');
        var activeChip = document.getElementById('archive-filter-active');
        var sheet = document.getElementById('archive-filter-sheet');
        var sheetList = document.querySelector('.js-filter-sheet-list');
        var openBtn = document.getElementById('archive-filter-open');

        var sectionArticles = sections.map(function(section) {
            return Array.from(section.querySelectorAll('.item'));
        });

        var lastFocusButton = null;
        var hasInit = false;

        function searchButtonsByTag(tag) {
            if (!tag) return tagShowAll;
            var found = articleTags.filter(function(btn) {
                return btn.dataset.encode === tag;
            });
            return found.length > 0 ? found[0] : tagShowAll;
        }

        function buttonFocus(target) {
            if (target) {
                target.classList.add('focus');
                if (lastFocusButton && lastFocusButton !== target) {
                    lastFocusButton.classList.remove('focus');
                }
                lastFocusButton = target;
            }
            updateActiveChip(target);
        }

        function updateActiveChip(target) {
            if (!activeChip) return;
            var encode = target && target.dataset ? target.dataset.encode : '';
            if (!encode) {
                activeChip.hidden = true;
                activeChip.textContent = '';
                return;
            }
            var label = target.getAttribute('title') || target.textContent.replace(/\s+\d+\s*$/, '').trim();
            activeChip.hidden = false;
            activeChip.textContent = label + ' ×';
            activeChip.setAttribute('role', 'button');
            activeChip.tabIndex = 0;
        }

        function tagSelect(tag, target) {
            var result = {};
            var visibleTotal = 0;

            for (var i = 0; i < sectionArticles.length; i++) {
                var articles = sectionArticles[i];
                for (var j = 0; j < articles.length; j++) {
                    if (!tag) {
                        result[i] = result[i] || {};
                        result[i][j] = true;
                    } else {
                        var tags = (articles[j].dataset.tags || '').split(',');
                        if (tags.indexOf(tag) !== -1) {
                            result[i] = result[i] || {};
                            result[i][j] = true;
                        }
                    }
                }
            }

            for (var i = 0; i < sectionArticles.length; i++) {
                var sectionVisibleCount = 0;
                for (var j = 0; j < sectionArticles[i].length; j++) {
                    if (result[i] && result[i][j]) {
                        sectionArticles[i][j].classList.remove('d-none');
                        sectionVisibleCount++;
                        visibleTotal++;
                    } else {
                        sectionArticles[i][j].classList.add('d-none');
                    }
                }
                if (sectionVisibleCount > 0) {
                    sections[i].classList.remove('d-none');
                } else {
                    sections[i].classList.add('d-none');
                }
            }

            if (emptyEl) {
                emptyEl.classList.toggle('d-none', visibleTotal > 0);
            }

            if (!hasInit) {
                resultContainer.classList.remove('d-none');
                hasInit = true;
            }

            if (target) {
                buttonFocus(target);
                var encodedTag = target.dataset.encode;
                if (!encodedTag) {
                    setUrlQuery();
                } else {
                    setUrlQuery('?tag=' + encodedTag);
                }
            } else {
                var btn = searchButtonsByTag(tag);
                if (btn) buttonFocus(btn);
            }
        }

        var currentYear = new Date().getFullYear();
        var YEAR_KEEP_OPEN = 2;

        function isOldYearSection(section) {
            var year = parseInt(section.getAttribute('data-year'), 10);
            return !isNaN(year) && year <= currentYear - YEAR_KEEP_OPEN;
        }

        function ensureYearToggle(section) {
            if (section.querySelector('.archive-year__toggle')) return;
            var year = section.getAttribute('data-year');
            var count = section.querySelectorAll('.item').length;
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'archive-year__toggle md-button md-button--text';
            btn.textContent = '展开 ' + year + ' 年的 ' + count + ' 篇';
            btn.addEventListener('click', function() {
                section.classList.remove('is-collapsed');
            });
            var sep = section.querySelector('.listing-seperator');
            if (sep && sep.nextSibling) {
                section.insertBefore(btn, sep.nextSibling);
            } else {
                section.appendChild(btn);
            }
        }

        function setOldYearsCollapsed(collapse) {
            sections.forEach(function(section) {
                if (!isOldYearSection(section)) return;
                ensureYearToggle(section);
                section.classList.toggle('is-collapsed', collapse);
            });
        }

        var originalTagSelect = tagSelect;
        tagSelect = function(tag, target) {
            originalTagSelect(tag, target);
            setOldYearsCollapsed(!tag);
        };

        function closeSheet() {
            if (!sheet) return;
            sheet.hidden = true;
            if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
        }

        function openSheet() {
            if (!sheet || !sheetList) return;
            sheetList.innerHTML = '';
            var chips = [tagShowAll].concat(articleTags).filter(Boolean);
            chips.forEach(function(chip) {
                var opt = document.createElement('button');
                opt.type = 'button';
                opt.className = 'filter-sheet__option' + (chip.classList.contains('focus') ? ' is-selected' : '');
                opt.textContent = chip.textContent.replace(/\s+/g, ' ').trim();
                opt.addEventListener('click', function() {
                    tagSelect(chip.dataset.encode, chip);
                    closeSheet();
                });
                sheetList.appendChild(opt);
            });
            sheet.hidden = false;
            if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
        }

        if (openBtn) {
            openBtn.addEventListener('click', openSheet);
        }
        if (sheet) {
            sheet.addEventListener('click', function(e) {
                if (e.target.closest('[data-close-sheet]')) closeSheet();
            });
        }
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeSheet();
        });
        if (activeChip) {
            function clearFilter() {
                if (tagShowAll) tagSelect('', tagShowAll);
            }
            activeChip.addEventListener('click', clearFilter);
            activeChip.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    clearFilter();
                }
            });
        }
        var clearBtn = document.getElementById('archive-clear-filter');
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                if (tagShowAll) tagSelect('', tagShowAll);
            });
        }

        var SCROLL_KEY = 'inxUF_archive_scroll';
        window.addEventListener('pagehide', function() {
            try { sessionStorage.setItem(SCROLL_KEY, String(window.scrollY || 0)); } catch (e) {}
        });
        resultContainer.addEventListener('click', function(e) {
            if (e.target.closest('.item a')) {
                try { sessionStorage.setItem(SCROLL_KEY, String(window.scrollY || 0)); } catch (err) {}
            }
        });

        var query = queryString();
        var initialTag = query.tag;
        tagSelect(initialTag);

        try {
            var saved = sessionStorage.getItem(SCROLL_KEY);
            if (saved) {
                window.scrollTo(0, parseInt(saved, 10) || 0);
            }
        } catch (e) {}

        tagsContainer.addEventListener('click', function(e) {
            var link = e.target.closest('a');
            if (link && tagsContainer.contains(link)) {
                e.preventDefault();
                var tag = link.dataset.encode;
                tagSelect(tag, link);
            }
        });
    });
})();
