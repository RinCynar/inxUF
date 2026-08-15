(function () {
  "use strict";

  var INDEX_URL = window.INXUF_SEARCH_JSON || "/search.json";
  var cache = null;
  var inflight = null;

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function loadIndex() {
    if (cache) return Promise.resolve(cache);
    if (inflight) return inflight;
    inflight = fetch(INDEX_URL)
      .then(function (res) {
        if (!res.ok) throw new Error("search index");
        return res.json();
      })
      .then(function (data) {
        cache = Array.isArray(data) ? data : [];
        inflight = null;
        return cache;
      })
      .catch(function () {
        inflight = null;
        cache = [];
        return cache;
      });
    return inflight;
  }

  function haystack(item) {
    return [item.title, item.subtitle, item.tags, item.category, item.content, item.date, item.date_label]
      .join(" ")
      .toLowerCase();
  }

  function queryItems(items, q, limit) {
    var needle = (q || "").trim().toLowerCase();
    if (!needle) return [];
    var out = [];
    for (var i = 0; i < items.length && out.length < limit; i++) {
      if (haystack(items[i]).indexOf(needle) !== -1) out.push(items[i]);
    }
    return out;
  }

  function renderHits(items) {
    if (!items.length) {
      return '<p class="search-empty">No results found</p>';
    }
    return items
      .map(function (item) {
        var meta = item.date_label || item.date || "";
        if (item.category) meta += (meta ? " · " : "") + item.category;
        return (
          '<a class="search-hit" href="' +
          escapeHtml(item.url) +
          '">' +
          '<span class="search-hit__title">' +
          escapeHtml(item.title) +
          "</span>" +
          (meta ? '<span class="search-hit__meta">' + escapeHtml(meta) + "</span>" : "") +
          "</a>"
        );
      })
      .join("");
  }

  function initPageSearch() {
    var input = document.getElementById("search-input");
    var results = document.getElementById("search-results");
    if (!input || !results) return;

    var guide = document.getElementById("search-guide");
    var countEl = document.getElementById("search-count");
    var timer = null;

    function apply(q) {
      var query = (q || "").trim();
      if (guide) guide.hidden = query.length > 0;
      if (!query) {
        results.innerHTML = "";
        if (countEl) countEl.hidden = true;
        return;
      }
      loadIndex().then(function (items) {
        var hits = queryItems(items, query, 24);
        results.innerHTML = renderHits(hits);
        if (countEl) {
          countEl.hidden = false;
          countEl.textContent = hits.length ? hits.length + " results" : "No results";
        }
      });
    }

    input.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        apply(input.value);
      }, 80);
    });

    var params = new URLSearchParams(window.location.search);
    var initial = params.get("q");
    if (initial) {
      input.value = initial;
      apply(initial);
    }

    input.focus();
  }

  function initHeaderSearch() {
    var bar = document.getElementById("top-app-bar");
    var open = document.getElementById("top-search-open");
    var panel = document.getElementById("top-search");
    var input = document.getElementById("top-search-input");
    var closeBtn = document.getElementById("top-search-close");
    var results = document.getElementById("top-search-results");
    if (!bar || !open || !panel || !input || !results) return;

    var timer = null;
    var lastFocus = null;

    function isDesktop() {
      return window.matchMedia("(min-width: 600px)").matches;
    }

    function close() {
      bar.classList.remove("is-searching");
      panel.hidden = true;
      results.hidden = true;
      results.innerHTML = "";
      input.value = "";
      open.setAttribute("aria-expanded", "false");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function openPanel() {
      lastFocus = document.activeElement;
      bar.classList.add("is-searching");
      panel.hidden = false;
      open.setAttribute("aria-expanded", "true");
      input.focus();
      loadIndex();
    }

    function showHits(q) {
      var query = (q || "").trim();
      if (!query) {
        results.hidden = true;
        results.innerHTML = "";
        return;
      }
      loadIndex().then(function (items) {
        var hits = queryItems(items, query, 8);
        results.innerHTML = renderHits(hits);
        results.hidden = false;
      });
    }

    open.addEventListener("click", function (e) {
      if (!isDesktop()) return;
      e.preventDefault();
      if (bar.classList.contains("is-searching")) close();
      else openPanel();
    });

    if (closeBtn) closeBtn.addEventListener("click", close);

    input.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        showHits(input.value);
      }, 80);
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Enter") {
        var q = input.value.trim();
        var first = results.querySelector(".search-hit");
        if (first && q) {
          e.preventDefault();
          window.location.href = first.getAttribute("href");
        } else if (q) {
          e.preventDefault();
          window.location.href = (open.getAttribute("href") || "/search/") + "?q=" + encodeURIComponent(q);
        }
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && bar.classList.contains("is-searching")) close();
    });

    document.addEventListener("click", function (e) {
      if (!bar.classList.contains("is-searching")) return;
      if (!bar.contains(e.target)) close();
    });

    window.addEventListener("resize", function () {
      if (!isDesktop() && bar.classList.contains("is-searching")) close();
    });
  }

  initPageSearch();
  initHeaderSearch();
})();
