const categoriesHost = document.querySelector("#store-categories");
const sourceButtons = [...document.querySelectorAll("#store-source-filter [data-source]")];
const search = document.querySelector("#store-search");
const featuredSection = document.querySelector("#store-featured-section");
const featuredList = document.querySelector("#store-featured-list");
const listHost = document.querySelector("#store-list");
const listTitle = document.querySelector("#store-list-title");
const countBadge = document.querySelector("#store-count");
const emptyBox = document.querySelector("#store-empty");
const emptyTitle = document.querySelector("#store-empty-title");
const emptyDesc = document.querySelector("#store-empty-desc");
const resetBtn = document.querySelector("#store-reset");
const emptySubmitBtn = document.querySelector("#store-empty-submit");

const detailDialog = document.querySelector("#plugin-detail-dialog");
const detailContent = document.querySelector("#detail-content");
const submitDialog = document.querySelector("#submit-plugin-dialog");
const openSubmitBtns = [
  document.querySelector("#open-submit-dialog"),
  document.querySelector("#strip-submit-btn"),
  emptySubmitBtn,
].filter(Boolean);
const copySubmitJsonBtn = document.querySelector("#copy-submit-json");
const submitJsonTemplate = document.querySelector("#submit-json-template");

let registry = null;
let activeCategory = "featured";
let activeSource = "all"; // all | official | community

const systemGridIconSvg = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/></svg>`;

const miniSystemTilesMarkup = `
  <div class="mini-tiles" aria-hidden="true">
    <div class="mini-tile active">
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2" fill="currentColor"/><g stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 2.2v2.4M12 19.4v2.4M2.2 12h2.4M19.4 12h2.4M5.1 5.1l1.7 1.7M17.2 17.2l1.7 1.7M5.1 18.9l1.7-1.7M17.2 6.8l1.7-1.7"/></g></svg>
      <span>亮度</span>
    </div>
    <div class="mini-tile">
      <svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="9.5" rx="2.5" fill="currentColor"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>
      <span>锁屏</span>
    </div>
    <div class="mini-tile">
      <svg viewBox="0 0 24 24"><path d="M4 9.5v5h3.5L12 19V5L7.5 9.5H4z" fill="currentColor"/><path d="M15.8 8.6a4.6 4.6 0 0 1 0 6.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      <span>音频</span>
    </div>
    <div class="mini-tile">
      <svg viewBox="0 0 24 24"><path d="M10.2 13.8a4.2 4.2 0 0 0 6 0l1.6-1.6a4.2 4.2 0 0 0-6-6l-1 1M13.8 10.2a4.2 4.2 0 0 0-6 0l-1.6 1.6a4.2 4.2 0 0 0 6 6l1-1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      <span>蓝牙</span>
    </div>
  </div>`;

function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function categoryLabel(catId) {
  const found = registry?.categories.find((c) => c.id === catId);
  return found ? found.label : catId;
}

function renderIconMarkup(plugin, size = 52) {
  if (plugin.icon?.type === "image" && plugin.icon.src) {
    return `<img class="app-icon" src="${escapeHtml(plugin.icon.src)}" alt="" width="${size}" height="${size}">`;
  }
  if (plugin.icon?.type === "system-grid") {
    return `<div class="app-icon app-icon-system" aria-hidden="true">${systemGridIconSvg}</div>`;
  }
  const initial = escapeHtml((plugin.name || "P").slice(0, 1).toUpperCase());
  return `<div class="app-icon app-icon-fallback" aria-hidden="true">${initial}</div>`;
}

function releaseAttr(plugin) {
  return plugin.releaseArtifact ? `data-release-artifact="${escapeHtml(plugin.releaseArtifact)}"` : "";
}

function versionAttr(plugin) {
  return plugin.releaseArtifact ? `data-release-version="${escapeHtml(plugin.releaseArtifact)}"` : "";
}

function sizeAttr(plugin) {
  return plugin.releaseArtifact ? `data-release-size="${escapeHtml(plugin.releaseArtifact)}"` : "";
}

function matchesSource(plugin) {
  if (activeSource === "official") return Boolean(plugin.official);
  if (activeSource === "community") return !plugin.official;
  return true;
}

function matchesCategory(plugin, catId) {
  if (catId === "all") return true;
  if (catId === "featured") return Boolean(plugin.featured);
  return plugin.category === catId;
}

function matchesSearch(plugin, terms) {
  if (!terms.length) return true;
  const hay = [
    plugin.name,
    plugin.tagline,
    plugin.description,
    plugin.author,
    categoryLabel(plugin.category),
    ...(plugin.keywords || []),
  ].join(" ").toLocaleLowerCase();
  return terms.every((term) => hay.includes(term));
}

function renderCategoryTabs() {
  const plugins = registry.plugins;
  categoriesHost.replaceChildren(...registry.categories.map((cat) => {
    const count = plugins.filter((p) => matchesCategory(p, cat.id) && matchesSource(p)).length;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("role", "tab");
    btn.dataset.category = cat.id;
    btn.setAttribute("aria-selected", String(cat.id === activeCategory));
    btn.innerHTML = `${escapeHtml(cat.label)} <span class="cat-count">${count}</span>`;
    btn.addEventListener("click", () => {
      activeCategory = cat.id;
      renderAll();
    });
    return btn;
  }));
}

function renderFeatured() {
  const terms = search.value.trim();
  const shouldShow = !terms && (activeCategory === "featured" || activeCategory === "all") && activeSource !== "community";
  const featuredPlugins = registry.plugins.filter((p) => p.featured && matchesSource(p));
  featuredSection.hidden = !shouldShow || featuredPlugins.length === 0;
  if (featuredSection.hidden) return;

  featuredList.replaceChildren(...featuredPlugins.map((plugin) => {
    const accentClass = plugin.featuredAccent === "music" ? "featured-card-music" : "featured-card-system";
    const card = document.createElement("article");
    card.className = `featured-card ${accentClass}`;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `查看 ${plugin.name} 详情`);

    const visual = plugin.preview?.type === "system-tiles"
      ? miniSystemTilesMarkup
      : `<img src="${escapeHtml(plugin.preview?.src || plugin.icon?.src || "")}" alt="${escapeHtml(plugin.preview?.alt || plugin.name)}" width="112" height="112">`;

    card.innerHTML = `
      <div class="featured-copy">
        <span class="featured-kicker">★ 编辑精选 · ${escapeHtml(categoryLabel(plugin.category))}</span>
        <h3>${escapeHtml(plugin.name)}</h3>
        <p>${escapeHtml(plugin.tagline)}</p>
        <div class="featured-actions">
          <a class="btn btn-primary featured-get" href="${escapeHtml(plugin.downloadUrl)}" ${releaseAttr(plugin)} aria-label="下载 ${escapeHtml(plugin.name)}">获取</a>
          <span class="featured-meta">v<span ${versionAttr(plugin)}>${escapeHtml(plugin.version)}</span> · ${escapeHtml(plugin.author)}</span>
        </div>
      </div>
      <div class="featured-visual">${visual}</div>`;

    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      openDetail(plugin);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDetail(plugin);
      }
    });
    return card;
  }));
}

function renderDirectory() {
  const terms = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const filtered = registry.plugins.filter(
    (p) => matchesCategory(p, activeCategory) && matchesSource(p) && matchesSearch(p, terms)
  );

  listTitle.textContent = terms.length ? "搜索结果" : categoryLabel(activeCategory);
  countBadge.textContent = `${filtered.length} 个插件`;
  emptyBox.hidden = filtered.length !== 0;

  if (!filtered.length) {
    if (terms.length) {
      emptyTitle.textContent = "找不到匹配的插件";
      emptyDesc.textContent = "试试其他关键词，或清除筛选查看全部可用插件。";
    } else if (activeSource === "community") {
      emptyTitle.textContent = "社区插件席位虚位以待";
      emptyDesc.textContent = "成为第一位提交社区灵动岛插件的开发者，直连你的 GitHub Release。";
    } else {
      emptyTitle.textContent = `「${categoryLabel(activeCategory)}」分类暂无插件`;
      emptyDesc.textContent = "欢迎使用 Plugin SDK 开发该分类下的第一个灵动岛插件并提交上架。";
    }
  }

  listHost.replaceChildren(...filtered.map((plugin) => {
    const li = document.createElement("li");
    li.className = "app-tile";
    li.tabIndex = 0;
    li.setAttribute("role", "button");
    li.setAttribute("aria-label", `查看 ${plugin.name} 详情`);

    const badge = plugin.official
      ? `<span class="app-tag-official">官方</span>`
      : `<span class="app-tag-community">社区</span>`;

    li.innerHTML = `
      <div class="app-tile-top">
        ${renderIconMarkup(plugin, 52)}
        <div class="app-tile-head">
          <div class="app-name-row">
            <h3>${escapeHtml(plugin.name)}</h3>
            ${badge}
          </div>
          <p class="app-author">${escapeHtml(plugin.author)}</p>
        </div>
        <a class="app-get-btn" href="${escapeHtml(plugin.downloadUrl)}" ${releaseAttr(plugin)} aria-label="下载 ${escapeHtml(plugin.name)}">获取</a>
      </div>
      <p class="app-tagline">${escapeHtml(plugin.tagline)}</p>
      <div class="app-tile-foot">
        <span class="app-foot-cat">${escapeHtml(categoryLabel(plugin.category))}</span>
        <span>v<span ${versionAttr(plugin)}>${escapeHtml(plugin.version)}</span> · <span ${sizeAttr(plugin)}>${escapeHtml(plugin.sizeLabel)}</span></span>
      </div>`;

    li.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      openDetail(plugin);
    });
    li.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDetail(plugin);
      }
    });
    return li;
  }));
}

function openDetail(plugin) {
  const previewMarkup = plugin.preview?.type === "system-tiles"
    ? `<div class="store-controls-crop"><img src="${escapeHtml(plugin.preview.src)}" width="1734" height="552" alt="${escapeHtml(plugin.preview.alt)}"></div>`
    : `<img src="${escapeHtml(plugin.preview?.src || plugin.icon?.src || "")}" width="360" height="360" alt="${escapeHtml(plugin.preview?.alt || plugin.name)}">`;

  const featuresList = (plugin.features || [])
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join("");

  const repoLink = plugin.repoUrl
    ? `<a href="${escapeHtml(plugin.repoUrl)}" target="_blank" rel="noopener">开发者仓库 ↗</a>`
    : "";

  const shaRow = plugin.sha256
    ? `<div><dt>SHA-256</dt><dd><code>${escapeHtml(plugin.sha256.slice(0, 12))}…</code></dd></div>`
    : `<div><dt>安装包</dt><dd ${sizeAttr(plugin)}>${escapeHtml(plugin.sizeLabel)}</dd></div>`;

  detailContent.innerHTML = `
    <header class="store-detail-heading">
      <div class="store-detail-brand">
        ${renderIconMarkup(plugin, 52)}
        <div>
          <h2 id="detail-title">${escapeHtml(plugin.name)}</h2>
          <p>${escapeHtml(plugin.author)} · ${plugin.official ? "官方插件" : "社区插件"} · ${escapeHtml(plugin.signing?.label || "已校验")}</p>
        </div>
      </div>
      <a class="btn btn-primary" href="${escapeHtml(plugin.downloadUrl)}" ${releaseAttr(plugin)}>获取</a>
    </header>
    <dl class="store-detail-meta">
      <div><dt>版本</dt><dd ${versionAttr(plugin)}>${escapeHtml(plugin.version)}</dd></div>
      <div><dt>分类</dt><dd>${escapeHtml(categoryLabel(plugin.category))}</dd></div>
      <div><dt>兼容性</dt><dd>${escapeHtml(plugin.compatibility)}</dd></div>
      ${shaRow}
    </dl>
    <div class="store-detail-body">
      <figure class="store-detail-preview">${previewMarkup}</figure>
      <div class="store-detail-info">
        <h3>简介与功能</h3>
        <ul>${featuresList}</ul>
        <h3>使用要求</h3>
        <p>${escapeHtml(plugin.requirements || "按安装说明导入 RemoteFlow 后即可在灵动岛使用。")}</p>
        <div class="store-detail-links">
          <a href="#install" data-close-detail>查看安装说明 ↓</a>
          ${repoLink}
        </div>
      </div>
    </div>`;

  detailContent.querySelector("[data-close-detail]")?.addEventListener("click", () => detailDialog.close());
  if (typeof detailDialog.showModal === "function") {
    detailDialog.showModal();
  }
}

function renderAll() {
  if (!registry) return;
  renderCategoryTabs();
  renderFeatured();
  renderDirectory();
  for (const btn of sourceButtons) {
    btn.setAttribute("aria-pressed", String(btn.dataset.source === activeSource));
  }
}

for (const btn of sourceButtons) {
  btn.addEventListener("click", () => {
    activeSource = btn.dataset.source;
    renderAll();
  });
}

search.addEventListener("input", renderAll);

resetBtn.addEventListener("click", () => {
  search.value = "";
  activeCategory = "all";
  activeSource = "all";
  renderAll();
});

for (const btn of openSubmitBtns) {
  btn.addEventListener("click", () => {
    if (typeof submitDialog.showModal === "function") submitDialog.showModal();
  });
}

for (const dlg of [detailDialog, submitDialog]) {
  dlg?.addEventListener("click", (event) => {
    if (event.target === dlg) dlg.close();
  });
}

copySubmitJsonBtn?.addEventListener("click", async () => {
  const text = submitJsonTemplate?.textContent ?? "";
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    copySubmitJsonBtn.textContent = "已复制";
    setTimeout(() => { copySubmitJsonBtn.textContent = "复制模板"; }, 1600);
  } catch {
    copySubmitJsonBtn.textContent = "复制失败";
    setTimeout(() => { copySubmitJsonBtn.textContent = "复制模板"; }, 1400);
  }
});

// "/" 快捷键聚焦搜索
window.addEventListener("keydown", (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  const tag = event.target?.tagName;
  if (event.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA" && !document.querySelector("dialog[open]")) {
    event.preventDefault();
    search.focus();
  } else if (event.key === "Escape" && document.activeElement === search && search.value) {
    search.value = "";
    renderAll();
  }
});

function initRegistry(data) {
  registry = data;
  const query = new URLSearchParams(window.location.search).get("q")?.trim();
  if (query) {
    search.value = query;
    activeCategory = "all";
  }
  renderAll();
}

if (window.__REMOTEFLOW_PLUGIN_REGISTRY__) {
  initRegistry(window.__REMOTEFLOW_PLUGIN_REGISTRY__);
} else {
  fetch("plugins-registry.json")
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error("load failed"))))
    .then(initRegistry)
    .catch(() => {
      listHost.innerHTML = '<li class="store-empty"><p>无法加载插件索引数据。</p></li>';
    });
}

// 页头滚动态
const header = document.querySelector("[data-header]");
if (header) {
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
