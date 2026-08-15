(function () {
  "use strict";

  var body = document.querySelector(".typography-body");
  if (!body) return;

  var EMOJI_RE = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{1F1E6}-\u{1F1FF}\u{FE0F}]/gu;
  var supportsUnicodeRegex = true;
  try {
    new RegExp("[\\u{1F600}]", "u");
  } catch (e) {
    supportsUnicodeRegex = false;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function extractEmoji(text) {
    if (!supportsUnicodeRegex) return "";
    var m = text.match(EMOJI_RE);
    return m ? m[0] : "";
  }

  function stripEmoji(text) {
    if (!supportsUnicodeRegex) return text;
    return text.replace(EMOJI_RE, "").replace(/\s+/g, " ").trim();
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function slugify(text) {
    return (
      text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
        .replace(/^-+|-+$/g, "") || "section"
    );
  }

  function uniqueId(base) {
    var id = base;
    var n = 2;
    while (document.getElementById(id)) {
      id = base + "-" + n;
      n++;
    }
    return id;
  }

  // --- 1. Download buttons ---
  (function enhanceDownloads() {
    var fileLinks = Array.from(body.querySelectorAll('a[href^="/file/"], a[href*="/file/"]'));
    if (!fileLinks.length) return;

    var btnContainer = document.createElement("div");
    btnContainer.className = "download-buttons-container";

    fileLinks.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      var text = link.textContent.trim().replace(/^-\s*/, "").replace(/[.\s]+$/g, "").trim();

      if (href.match(/\.(png|jpg|jpeg|gif|webp)$/i)) return;

      var button = document.createElement("a");
      button.href = href;

      var isOnline = href.toLowerCase().indexOf("online") !== -1 || text.toLowerCase().indexOf("online") !== -1;
      var isOffline = href.toLowerCase().indexOf("offline") !== -1 || text.toLowerCase().indexOf("offline") !== -1;

      var btnClass = "md-button";
      var iconSvg = "";

      if (isOnline) {
        btnClass += " md-button--filled md-button--online";
        iconSvg =
          '<svg class="md-button__icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>';
      } else if (isOffline) {
        btnClass += " md-button--tonal md-button--offline";
        iconSvg =
          '<svg class="md-button__icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M5 20h14v-2H5v2zm7-18L5.33 11h4.67v5h4v-5h4.67L12 2z"/></svg>';
      } else {
        btnClass += " md-button--filled";
        iconSvg =
          '<svg class="md-button__icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M5 20h14v-2H5v2zm7-18L5.33 11h4.67v5h4v-5h4.67L12 2z"/></svg>';
      }

      button.className = btnClass;

      var badgeText = "";
      var lowerText = text.toLowerCase() + " " + href.toLowerCase();
      if (lowerText.indexOf("arm64") !== -1) badgeText = "arm64-v8a";
      else if (lowerText.indexOf("armeabi") !== -1) badgeText = "armeabi-v7a";
      else if (lowerText.indexOf("x64") !== -1 || lowerText.indexOf("x86_64") !== -1) badgeText = "x86_64";
      else if (lowerText.indexOf("x86") !== -1) badgeText = "x86";

      var labelText = text;
      if (!labelText) {
        labelText = isOnline ? "下载 Online 版本" : isOffline ? "下载 Offline 版本" : "立即下载";
      }

      var badgeHtml = badgeText ? '<span class="md-badge">' + escapeHtml(badgeText) + "</span>" : "";
      button.innerHTML = iconSvg + '<span class="md-button__label">' + escapeHtml(labelText) + "</span>" + badgeHtml;
      btnContainer.appendChild(button);

      var parent = link.parentElement;
      if (parent && (parent.tagName === "H2" || parent.tagName === "P" || parent.tagName === "LI")) {
        var parentText = parent.textContent.replace(link.textContent, "").replace(/[.\s]/g, "").trim();
        if (parentText === "") parent.style.display = "none";
        else link.style.display = "none";
      } else {
        link.style.display = "none";
      }
    });

    if (btnContainer.childElementCount > 0) {
      var firstLink = fileLinks[0];
      var insertRef = firstLink.parentElement;
      if (insertRef && insertRef.style.display === "none") {
        insertRef.parentNode.insertBefore(btnContainer, insertRef.nextSibling);
      } else if (firstLink) {
        firstLink.parentNode.insertBefore(btnContainer, firstLink.nextSibling);
      }
    }
  })();

  function isSectionHeader(el) {
    var tagName = el.tagName;
    if (tagName !== "H3" && tagName !== "H4") return false;

    var text = el.textContent.trim();
    var clean = text.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "").toLowerCase();
    clean = clean.replace(/(highlights|whatschanged|releases|release|changelog)/g, "");

    var categories = [
      "更新内容",
      "更新亮点",
      "新增功能",
      "新增",
      "优化与改进",
      "优化",
      "修复",
      "变更",
      "移除",
      "翻译",
      "文档与翻译",
      "文档",
      "补丁版本",
      "补丁",
      "关于",
      "下载",
      "支持版本",
      "亮点",
      "升级",
      "依赖更新",
      "已知问题",
      "未来计划",
      "计划",
    ];

    if (categories.indexOf(clean) !== -1) return true;
    if (clean.indexOf("补丁") === 0 || clean.indexOf("关于") === 0) return true;
    return false;
  }

  function isHighlightsSection(el) {
    var clean = (el.textContent || "").replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "").toLowerCase();
    return clean.indexOf("更新亮点") !== -1 || clean.indexOf("highlights") !== -1 || clean.indexOf("亮点") === 0;
  }

  function getCategoryInfo(text) {
    var lowerText = text.toLowerCase();
    if (lowerText.match(/(🚀|✨|新增|亮点|highlights)/)) return { cls: "md-release-card--added", icon: "✨" };
    if (lowerText.match(/(⚡|🎨|优化|ui|🧩|性能|效能)/)) return { cls: "md-release-card--improved", icon: "⚡" };
    if (lowerText.match(/(🛠|🔧|修复|修復)/)) return { cls: "md-release-card--fixed", icon: "🔧" };
    if (lowerText.match(/(⚙️|变更|變更)/)) return { cls: "md-release-card--changed", icon: "⚙️" };
    if (lowerText.match(/(📚|文档|翻譯|翻译)/)) return { cls: "md-release-card--docs", icon: "📚" };
    if (lowerText.match(/(🗑|移除|删除|刪除)/)) return { cls: "md-release-card--removed", icon: "🗑️" };
    if (lowerText.match(/(🐞|已知问题|已知問題|known)/)) return { cls: "md-release-card--fixed", icon: "🐞" };
    if (lowerText.match(/(🔮|未来|未來|计划|計劃)/)) return { cls: "md-release-card--changed", icon: "🔮" };
    return { cls: "md-release-card--changed", icon: "⚙️" };
  }

  var CHANGELOG_PREFIX = /^(新增|优化|修復|修复|变更|變更|移除|删除|刪除|文档|翻譯|翻译|底层|调整|补丁)/;

  function isChangelogLine(text) {
    var s = stripEmoji(text || "").replace(/\s+/g, "");
    if (CHANGELOG_PREFIX.test(s) && /[：:]/.test(s.slice(0, 8))) return true;
    if (/^(新增|优化|修復|修复|变更|變更|移除|删除|刪除|底层|调整)/.test(s) && s.length > 14) return true;
    return false;
  }

  function isBodyLikeHeading(text, level) {
    if (level < 4) return false;
    var raw = stripEmoji(text || "").replace(/\s+/g, " ").trim();
    var label = tocLabel(text);
    if (label !== raw && label.length <= 28) return false;
    return raw.length > 22;
  }

  function isDownloadHeading(h) {
    var link = h.querySelector('a[href*="/file/"]');
    if (!link) return false;
    var t = h.textContent || "";
    return /下载|download|\.apk/i.test(t) || h.querySelectorAll("a").length === 1;
  }

  function isRedundantLead(h, pageTitle) {
    if (h.tagName !== "H2") return false;
    var a = (h.textContent || "").replace(/\s+/g, "");
    var b = (pageTitle || "").replace(/\s+/g, "");
    if (!a || !b) return false;
    var core = b.slice(0, Math.min(18, b.length));
    return core.length >= 6 && a.indexOf(core) !== -1;
  }

  function isCaptionHeading(h) {
    var n = h.nextElementSibling;
    if (!n) return false;
    if (n.tagName === "IMG") return true;
    if (n.tagName === "P" && n.children.length === 1 && n.querySelector("img")) return true;
    return false;
  }

  function tocLabel(text) {
    var s = stripEmoji(text || "")
      .replace(/\s+/g, " ")
      .trim();
    var parts = s.split(/[：:]/);
    if (parts[0] && parts[0].length >= 2 && parts[0].length <= 28 && parts.length > 1) {
      return parts[0].trim();
    }
    return s;
  }

  function genericAlt(alt) {
    return !alt || /^a\s*image$/i.test(alt.trim());
  }

  // --- 2. Article media ---
  var gallery = [];

  function enhanceMedia() {
    var imgs = Array.from(body.querySelectorAll("img"));
    imgs.forEach(function (img) {
      if (img.closest(".article-media") || img.closest(".md-card__media")) return;

      var figure = document.createElement("figure");
      figure.className = "article-media";

      img.classList.add("article-media__img");
      if (!img.getAttribute("loading")) img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
      var src = img.currentSrc || img.getAttribute("src") || "";
      if (/\.gif(\?|$)/i.test(src)) figure.classList.add("article-media--gif");

      var alt = (img.getAttribute("alt") || "").trim();
      var captionText = genericAlt(alt) ? "" : alt;

      var prev = img.previousElementSibling;
      if (!prev && img.parentElement && img.parentElement !== body) {
        prev = img.parentElement.previousElementSibling;
      }
      if (!captionText && prev && /^H[3-6]$/.test(prev.tagName) && isCaptionHeading(prev)) {
        captionText = stripEmoji(prev.textContent || "").trim();
        prev.style.display = "none";
      }

      var parent = img.parentNode;
      if (parent && parent !== body && parent.tagName === "P" && parent.children.length === 1) {
        parent.parentNode.insertBefore(figure, parent);
        figure.appendChild(img);
        parent.remove();
      } else {
        parent.insertBefore(figure, img);
        figure.appendChild(img);
      }

      if (captionText) {
        var cap = document.createElement("figcaption");
        cap.className = "article-media__caption";
        cap.textContent = captionText;
        figure.appendChild(cap);
        if (genericAlt(alt)) img.setAttribute("alt", captionText);
      }

      img.addEventListener("load", function () {
        if (img.naturalWidth) {
          img.width = img.naturalWidth;
          img.height = img.naturalHeight;
        }
      });

      img.addEventListener("error", function () {
        figure.classList.add("is-error");
        if (!figure.querySelector(".article-media__fallback")) {
          var fallback = document.createElement("span");
          fallback.className = "article-media__fallback";
          fallback.textContent = "图片加载失败";
          figure.appendChild(fallback);
        }
      });

      gallery.push({ img: img, figure: figure, caption: captionText || alt });
    });
  }

  enhanceMedia();

  // --- 3. Release cards ---
  (function wrapReleaseCards() {
    var children = Array.from(body.children);
    var i = 0;
    while (i < children.length) {
      var child = children[i];

      if (isSectionHeader(child)) {
        if (isHighlightsSection(child) || (child.nextElementSibling && isSectionHeader(child.nextElementSibling))) {
          child.classList.add("article-section-title");
          i++;
          continue;
        }

        var info = getCategoryInfo(child.textContent);
        var rawText = child.textContent;
        var emoji = extractEmoji(rawText);
        var label = stripEmoji(rawText);

        var card = document.createElement("div");
        card.className = "md-release-card " + info.cls;
        child.parentNode.insertBefore(card, child);

        var header = document.createElement("div");
        header.className = "md-release-card__header";

        var icon = document.createElement("span");
        icon.className = "md-release-card__icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = emoji || info.icon;
        header.appendChild(icon);

        child.textContent = label || rawText.replace(/^[#\s]+/, "");
        header.appendChild(child);
        card.appendChild(header);

        var targetTagLevel = parseInt(child.tagName.substring(1), 10);

        while (card.nextElementSibling) {
          var next = card.nextElementSibling;
          var nextTagName = next.tagName;

          if (isSectionHeader(next)) break;

          if (nextTagName.indexOf("H") === 0) {
            var nextTagLevel = parseInt(nextTagName.substring(1), 10);
            if (!isNaN(nextTagLevel) && nextTagLevel <= targetTagLevel) break;
          }

          if (nextTagName === "HR" || next.classList.contains("download-buttons-container")) break;

          card.appendChild(next);
        }

        convertChangelogHeadings(card);

        children = Array.from(body.children);
        i = children.indexOf(card) + 1;
        continue;
      }
      i++;
    }

    convertHighlightItems();
  })();

  function convertHighlightItems() {
    var titles = Array.from(body.querySelectorAll(".article-section-title"));
    titles.forEach(function (h) {
      var cursor = h.nextElementSibling;
      while (cursor && cursor.tagName !== "H2" && cursor.tagName !== "HR" && !isSectionHeader(cursor) && !cursor.classList.contains("md-release-card") && !cursor.classList.contains("download-buttons-container")) {
        var next = cursor.nextElementSibling;
        if (/^H[4-6]$/.test(cursor.tagName)) {
          var raw = (cursor.textContent || "").replace(/\s+/g, " ").trim();
          var title = tocLabel(raw);
          var rest = stripEmoji(raw);
          if (rest.indexOf(title) === 0) {
            rest = rest.slice(title.length).replace(/^[：:]\s*/, "");
          }
          var item = document.createElement("div");
          item.className = "highlight-item";
          if (cursor.id) item.id = cursor.id;
          var strong = document.createElement("strong");
          strong.textContent = title;
          item.appendChild(strong);
          if (rest && rest !== title) {
            var p = document.createElement("p");
            p.textContent = rest;
            item.appendChild(p);
          }
          cursor.parentNode.replaceChild(item, cursor);
        }
        cursor = next;
      }
    });
  }

  function convertChangelogHeadings(root) {
    var heads = Array.from(root.querySelectorAll("h4, h5, h6"));
    heads.forEach(function (h) {
      if (h.closest(".md-release-card__header")) return;
      if (!isChangelogLine(h.textContent) && h.tagName !== "H5" && h.tagName !== "H6") return;

      var li = document.createElement("li");
      while (h.firstChild) li.appendChild(h.firstChild);

      var prev = h.previousElementSibling;
      var ul;
      if (prev && prev.classList && prev.classList.contains("release-list")) {
        ul = prev;
      } else {
        ul = document.createElement("ul");
        ul.className = "release-list";
        h.parentNode.insertBefore(ul, h);
      }
      ul.appendChild(li);
      h.remove();
    });
  }

  // --- 4. Table of contents ---
  (function buildToc() {
    var toc = document.getElementById("post-toc");
    var tocNav = document.getElementById("post-toc-nav");
    var sheetNav = document.getElementById("post-toc-sheet-nav");
    var trigger = document.getElementById("post-toc-open");
    var triggerWrap = document.getElementById("post-toc-inline-wrap");
    var fab = document.getElementById("post-toc-fab");
    var sheet = document.getElementById("toc-sheet");
    if (!tocNav) return;

    var pageTitleEl = document.querySelector(".release-hero h1") || document.querySelector(".intro-header h1");
    var pageTitle = pageTitleEl ? pageTitleEl.textContent.trim() : document.title;
    var layout = document.getElementById("post-layout") || document.querySelector(".post-layout");

    Array.from(body.querySelectorAll("h2")).forEach(function (lead) {
      if (isRedundantLead(lead, pageTitle)) lead.hidden = true;
    });

    var headings = Array.from(body.querySelectorAll("h2, h3, h4, .highlight-item"));
    var items = [];

    headings.forEach(function (h) {
      if (h.hidden || (h.style && h.style.display === "none")) return;
      if (h.classList.contains("highlight-item")) {
        var highlightLabel = (h.querySelector("strong") && h.querySelector("strong").textContent) || tocLabel(h.textContent);
        if (!highlightLabel) return;
        if (!h.id) h.id = uniqueId(slugify(highlightLabel));
        items.push({ id: h.id, label: highlightLabel, level: 4, el: h });
        return;
      }
      var level = parseInt(h.tagName.substring(1), 10);
      if (isDownloadHeading(h)) return;
      if (isRedundantLead(h, pageTitle)) return;
      if (isCaptionHeading(h)) return;
      if (isChangelogLine(h.textContent)) return;
      if (isBodyLikeHeading(h.textContent, level)) return;
      var raw = (h.textContent || "").replace(/\s+/g, " ").trim();
      if (!raw) return;

      var label = tocLabel(raw);
      if (!label) return;

      if (!h.id) h.id = uniqueId(slugify(label));
      items.push({ id: h.id, label: label, level: level, el: h });
    });

    if (!items.length) {
      if (layout) layout.classList.remove("has-toc");
      if (toc) toc.hidden = true;
      if (trigger) trigger.hidden = true;
      if (triggerWrap) triggerWrap.hidden = true;
      if (fab) fab.hidden = true;
      return;
    }

    function renderTree() {
      var root = document.createElement("ol");
      root.className = "post-toc__list";
      var stack = [{ level: 1, ol: root }];

      items.forEach(function (item) {
        while (stack.length > 1 && item.level <= stack[stack.length - 1].level) stack.pop();
        var parent = stack[stack.length - 1].ol;
        var li = document.createElement("li");
        li.className = "post-toc__item post-toc__item--h" + item.level;
        var a = document.createElement("a");
        a.href = "#" + item.id;
        a.textContent = item.label;
        a.dataset.tocTarget = item.id;
        li.appendChild(a);
        parent.appendChild(li);
        var childOl = document.createElement("ol");
        childOl.className = "post-toc__list";
        li.appendChild(childOl);
        stack.push({ level: item.level, ol: childOl });
      });

      Array.from(root.querySelectorAll("ol")).forEach(function (ol) {
        if (!ol.children.length) ol.remove();
      });
      return root;
    }

    tocNav.appendChild(renderTree());
    if (sheetNav) sheetNav.appendChild(renderTree());
    if (layout) layout.classList.add("has-toc");
    if (toc) toc.hidden = false;
    if (trigger) trigger.hidden = false;
    if (triggerWrap) triggerWrap.hidden = false;

    function scrollToId(id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    }

    function onTocClick(e) {
      var a = e.target.closest("a[href^='#']");
      if (!a) return;
      var id = decodeURIComponent((a.getAttribute("href") || "").slice(1));
      if (!id) return;
      e.preventDefault();
      scrollToId(id);
    }

    tocNav.addEventListener("click", onTocClick);
    if (sheetNav) sheetNav.addEventListener("click", onTocClick);

    var lastFocus = null;

    function closeToc() {
      if (!sheet || sheet.hidden) return;
      sheet.hidden = true;
      document.body.classList.remove("toc-open");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
      if (fab) fab.setAttribute("aria-expanded", "false");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function openToc(from) {
      if (!sheet) return;
      lastFocus = from || document.activeElement;
      sheet.hidden = false;
      document.body.classList.add("toc-open");
      if (trigger) trigger.setAttribute("aria-expanded", "true");
      if (fab) fab.setAttribute("aria-expanded", "true");
      var closeBtn = sheet.querySelector("[data-close-toc].md-icon-button") || sheet.querySelector("[data-close-toc]");
      if (closeBtn && closeBtn.focus) closeBtn.focus();
    }

    if (trigger && sheet) {
      trigger.addEventListener("click", function () {
        openToc(trigger);
      });
    }
    if (fab && sheet) {
      fab.addEventListener("click", function () {
        openToc(fab);
      });
    }
    if (sheet) {
      sheet.addEventListener("click", function (e) {
        if (e.target.closest("[data-close-toc]")) {
          closeToc();
          return;
        }
        if (e.target.closest("a")) closeToc();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeToc();
    });

    if (trigger && fab && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          var visible = entries[0] && entries[0].isIntersecting;
          fab.hidden = visible || window.matchMedia("(min-width: 1024px)").matches;
        },
        { threshold: 0 }
      );
      io.observe(trigger);
    } else if (fab) {
      fab.hidden = false;
    }

    if ("IntersectionObserver" in window && items.length) {
      var visible = {};
      var headingObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            visible[entry.target.id] = entry.isIntersecting;
          });
          var current = null;
          items.forEach(function (item) {
            if (visible[item.id]) current = item.id;
          });
          if (!current) {
            var y = window.scrollY || 0;
            items.forEach(function (item) {
              var rect = item.el.getBoundingClientRect();
              var top = rect.top + y;
              if (top <= y + 120) current = item.id;
            });
          }
          Array.from(document.querySelectorAll(".post-toc__item > a")).forEach(function (a) {
            a.classList.toggle("is-active", a.dataset.tocTarget === current);
          });
        },
        { rootMargin: "-88px 0px -55% 0px", threshold: [0, 1] }
      );
      items.forEach(function (item) {
        headingObserver.observe(item.el);
      });
    }
  })();

  // --- 5. Lightbox ---
  (function setupLightbox() {
    var root = document.getElementById("article-lightbox");
    if (!root || !gallery.length) return;

    var imgEl = root.querySelector(".lightbox__img");
    var capEl = root.querySelector(".lightbox__caption");
    var prevBtn = root.querySelector(".lightbox__prev");
    var nextBtn = root.querySelector(".lightbox__next");
    var zoomBtn = root.querySelector(".lightbox__zoom");
    var index = 0;
    var scale = 1;
    var lastFocus = null;

    function applyScale() {
      imgEl.style.transform = scale === 1 ? "" : "scale(" + scale + ")";
    }

    function show(i) {
      index = (i + gallery.length) % gallery.length;
      var item = gallery[index];
      imgEl.src = item.img.currentSrc || item.img.src;
      imgEl.alt = item.img.alt || "";
      capEl.textContent = item.caption || "";
      capEl.hidden = !item.caption;
      prevBtn.hidden = gallery.length < 2;
      nextBtn.hidden = gallery.length < 2;
      scale = 1;
      applyScale();
    }

    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      root.hidden = false;
      document.body.classList.add("lightbox-open");
      if (root.querySelector("[data-lightbox-close]")) {
        var close = root.querySelector(".lightbox__close");
        if (close) close.focus();
      }
    }

    function close() {
      root.hidden = true;
      document.body.classList.remove("lightbox-open");
      imgEl.removeAttribute("src");
      scale = 1;
      applyScale();
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    gallery.forEach(function (item, i) {
      item.img.addEventListener("click", function () {
        open(i);
      });
      item.img.setAttribute("tabindex", "0");
      item.img.setAttribute("role", "button");
      item.img.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(i);
        }
      });
    });

    root.addEventListener("click", function (e) {
      if (e.target.closest("[data-lightbox-close]")) close();
    });

    if (prevBtn) prevBtn.addEventListener("click", function () { show(index - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { show(index + 1); });
    if (zoomBtn) {
      zoomBtn.addEventListener("click", function () {
        scale = scale === 1 ? 2 : 1;
        applyScale();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (root.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(index - 1);
      else if (e.key === "ArrowRight") show(index + 1);
    });

    var startX = 0;
    imgEl.addEventListener(
      "touchstart",
      function (e) {
        if (e.touches.length === 1) startX = e.touches[0].clientX;
      },
      { passive: true }
    );
    imgEl.addEventListener(
      "touchend",
      function (e) {
        if (!e.changedTouches.length) return;
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50 && scale === 1) show(index + (dx < 0 ? 1 : -1));
      },
      { passive: true }
    );

    var pinch = 0;
    imgEl.addEventListener(
      "touchstart",
      function (e) {
        if (e.touches.length === 2) {
          var dx = e.touches[0].clientX - e.touches[1].clientX;
          var dy = e.touches[0].clientY - e.touches[1].clientY;
          pinch = Math.hypot(dx, dy);
        }
      },
      { passive: true }
    );
    imgEl.addEventListener(
      "touchmove",
      function (e) {
        if (e.touches.length === 2 && pinch) {
          var dx = e.touches[0].clientX - e.touches[1].clientX;
          var dy = e.touches[0].clientY - e.touches[1].clientY;
          var dist = Math.hypot(dx, dy);
          scale = Math.min(3, Math.max(1, scale * (dist / pinch)));
          pinch = dist;
          applyScale();
        }
      },
      { passive: true }
    );
  })();

  (function wrapVideo() {
    var media = Array.from(body.querySelectorAll("iframe, video"));
    media.forEach(function (el) {
      if (el.closest(".article-media")) return;
      var wrap = document.createElement("div");
      wrap.className = "article-media article-media--video";
      el.parentNode.insertBefore(wrap, el);
      wrap.appendChild(el);
      if (el.tagName === "IFRAME") {
        el.setAttribute("loading", "lazy");
        if (!el.getAttribute("title")) el.setAttribute("title", "Embedded video");
      }
    });
  })();

  (function markExternalLinks() {
    var host = window.location.host;
    Array.from(body.querySelectorAll('a[href^="http://"], a[href^="https://"]')).forEach(function (a) {
      if (a.host === host) return;
      if (a.classList.contains("md-button") || a.closest(".download-buttons-container")) return;
      a.classList.add("ext-link");
      if (!a.getAttribute("rel")) a.setAttribute("rel", "noopener noreferrer");
      if (!a.querySelector(".ext-link__icon")) {
        var icon = document.createElement("span");
        icon.className = "ext-link__icon";
        icon.setAttribute("aria-hidden", "true");
        a.appendChild(icon);
      }
    });
  })();

  (function readingProgress() {
    var bar = document.getElementById("read-progress");
    var article = document.querySelector(".post-content");
    if (!bar || !article) return;
    bar.hidden = false;

    function update() {
      var rect = article.getBoundingClientRect();
      var total = Math.max(1, article.offsetHeight - window.innerHeight);
      var passed = Math.min(total, Math.max(0, -rect.top));
      bar.style.transform = "scaleX(" + (passed / total) + ")";
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  })();
})();
