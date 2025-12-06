/* Vanilla JS replacement for jQuery archive.js */
(function() {
    function queryString() {
        var queryObj = {};
        var queryStr = window.location.search.substring(1);
        var queryArr = queryStr.split('&');
        for (var i = 0; i < queryArr.length; i++) {
            var pair = queryArr[i].split('=');
            if (!pair[0]) continue;
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1] || '');
            
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
        
        // Map section index -> array of items
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
        }

        function tagSelect(tag, target) {
            var result = {}; // { sectionIndex: { articleIndex: true } }

            for (var i = 0; i < sectionArticles.length; i++) {
                var articles = sectionArticles[i];
                for (var j = 0; j < articles.length; j++) {
                    if (!tag) {
                        result[i] = result[i] || {};
                        result[i][j] = true;
                    } else {
                        var articleTags = articles[j].dataset.tags.split(',');
                        if (articleTags.indexOf(tag) !== -1) {
                            result[i] = result[i] || {};
                            result[i][j] = true;
                        }
                    }
                }
            }

            // Update visibility
            for (var i = 0; i < sectionArticles.length; i++) {
                // Section Visibility
                if (result[i]) {
                    sections[i].classList.remove('d-none');
                } else {
                    sections[i].classList.add('d-none');
                }
                
                // Article Visibility
                for (var j = 0; j < sectionArticles[i].length; j++) {
                    if (result[i] && result[i][j]) {
                        sectionArticles[i][j].classList.remove('d-none');
                    } else {
                        sectionArticles[i][j].classList.add('d-none');
                    }
                }
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
                // Find button by tag
                var btn = searchButtonsByTag(tag);
                if (btn) buttonFocus(btn);
            }
        }

        var query = queryString();
        var initialTag = query.tag;

        tagSelect(initialTag);

        // Event Delegation
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
