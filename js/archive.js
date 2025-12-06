<<<<<<< HEAD
/* Vanilla JS replacement for jQuery archive.js */
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
=======
/*
Credits: this script is shamelessly borrowed from
https://github.com/kitian616/jekyll-TeXt-theme
*/
(function() {
  function queryString() {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var i = 0, queryObj = {}, pair;
    var queryStr = window.location.search.substring(1);
    var queryArr = queryStr.split('&');
    for (i = 0; i < queryArr.length; i++) {
      pair = queryArr[i].split('=');
      // If first entry with this name
      if (typeof queryObj[pair[0]] === 'undefined') {
        queryObj[pair[0]] = pair[1];
        // If second entry with this name
      } else if (typeof queryObj[pair[0]] === 'string') {
        queryObj[pair[0]] = [queryObj[pair[0]], pair[1]];
        // If third or later entry with this name
      } else {
        queryObj[pair[0]].push(pair[1]);
      }
    }
    return queryObj;
  }

  var setUrlQuery = (function() {
    var baseUrl =  window.location.href.split('?')[0];
    return function(query) {
      if (typeof query === 'string') {
        window.history.replaceState(null, '', baseUrl + query);
      } else {
        window.history.replaceState(null, '', baseUrl);
      }
    };
  })();

  $(document).ready(function() {
    var $tags = $('.js-tags');
    var $articleTags = $tags.find('.tag-button');
    var $tagShowAll = $tags.find('.tag-button--all');
    var $result = $('.js-result');
    var $sections = $result.find('section');
    var sectionArticles = []
    var $lastFocusButton = null;
    var sectionTopArticleIndex = [];
    var hasInit = false;

    $sections.each(function() {
      sectionArticles.push($(this).find('.item'));
    });

    function init() {
      var i, index = 0;
      for (i = 0; i < $sections.length; i++) {
        sectionTopArticleIndex.push(index);
        index += $sections.eq(i).find('.item').length;
      }
      sectionTopArticleIndex.push(index);
    }

    function searchButtonsByTag(_tag/*raw tag*/) {
      if (!_tag) {
        return $tagShowAll;
      }
      var _buttons = $articleTags.filter('[data-encode="' + _tag + '"]');
      if (_buttons.length === 0) {
        return $tagShowAll;
      }
      return _buttons;
    }

    function buttonFocus(target) {
      if (target) {
        target.addClass('focus');
        $lastFocusButton && !$lastFocusButton.is(target) && $lastFocusButton.removeClass('focus');
        $lastFocusButton = target;
      }
    }

    function tagSelect (tag/*raw tag*/, target) {
      var result = {}, $articles;
      var i, j, k, _tag;

      for (i = 0; i < sectionArticles.length; i++) {
        $articles = sectionArticles[i];
        for (j = 0; j < $articles.length; j++) {
          if (tag === '' || tag === undefined) {
            result[i] || (result[i] = {});
            result[i][j] = true;
          } else {
            var tags = $articles.eq(j).data('tags').split(',');
            for (k = 0; k < tags.length; k++) {
              if (tags[k] === tag) {
                result[i] || (result[i] = {});
                result[i][j] = true; break;
              }
            }
          }
        }
      }

      for (i = 0; i < sectionArticles.length; i++) {
        result[i] && $sections.eq(i).removeClass('d-none');
        result[i] || $sections.eq(i).addClass('d-none');
        for (j = 0; j < sectionArticles[i].length; j++) {
          if (result[i] && result[i][j]) {
            sectionArticles[i].eq(j).removeClass('d-none');
          } else {
            sectionArticles[i].eq(j).addClass('d-none');
          }
        }
      }

      hasInit || ($result.removeClass('d-none'), hasInit = true);


      if (target) {
        buttonFocus(target);
        _tag = target.attr('data-encode');
        if (_tag === '' || typeof _tag !== 'string') {
          setUrlQuery();
        } else {
          setUrlQuery('?tag=' + _tag);
        }
      } else {
        buttonFocus(searchButtonsByTag(tag));
      }
    }

    var query = queryString(), 
        _tag = query.tag;

    init(); 
    tagSelect(_tag);

    $tags.on('click', 'a', function() {   /* only change */
      tagSelect($(this).data('encode'), $(this));
    });

  });
>>>>>>> 7bae149 (rollback)
})();
