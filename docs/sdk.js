const headerList = document.querySelector("#sdk-header-list");
const docTabs = [...document.querySelectorAll("[data-doc-tab]")];
const docBody = document.querySelector("#sdk-doc-body");
const tocNav = document.querySelector("#sdk-toc-nav");
const docSource = document.querySelector("#sdk-doc-source");

let sdkData = null;
let activeDocId = "overview";

function attachCopyButtons(root) {
  for (const btn of root.querySelectorAll(".sdk-copy-btn")) {
    if (btn.dataset.bound) continue;
    btn.dataset.bound = "1";
    btn.addEventListener("click", async () => {
      const box = btn.closest(".sdk-code-block, .sdk-cmd-box");
      const code = box?.querySelector("code")?.textContent ?? "";
      if (!code) return;
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = "已复制";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "复制";
          btn.classList.remove("copied");
        }, 1600);
      } catch {
        btn.textContent = "复制失败";
        setTimeout(() => { btn.textContent = "复制"; }, 1400);
      }
    });
  }
}

function renderHeaders(headers) {
  headerList.replaceChildren(...headers.map((item) => {
    const li = document.createElement("li");
    li.className = "sdk-file-card";
    li.innerHTML = `
      <div class="sdk-file-head">
        <code>${item.name}</code>
        <span class="sdk-file-meta">${item.lines} 行</span>
      </div>
      <p>${item.summary}</p>`;
    return li;
  }));
}

function renderDoc(docId) {
  if (!sdkData) return;
  const doc = sdkData.docs.find((d) => d.id === docId) || sdkData.docs[0];
  if (!doc) return;
  activeDocId = doc.id;

  for (const tab of docTabs) {
    tab.setAttribute("aria-selected", String(tab.dataset.docTab === doc.id));
  }
  docSource.textContent = doc.source;
  docBody.innerHTML = doc.html;
  attachCopyButtons(docBody);

  tocNav.replaceChildren(...doc.headings.map((h) => {
    const a = document.createElement("a");
    a.href = `#${h.id}`;
    a.textContent = h.title;
    return a;
  }));

  for (const jump of docBody.querySelectorAll("[data-doc-jump]")) {
    jump.addEventListener("click", (event) => {
      event.preventDefault();
      renderDoc(jump.dataset.docJump);
      document.querySelector("#sdk-docs").scrollIntoView({ behavior: "smooth" });
    });
  }
}

for (const tab of docTabs) {
  tab.addEventListener("click", () => renderDoc(tab.dataset.docTab));
}

attachCopyButtons(document);

function applySdkData(data) {
  sdkData = data;
  // 仅当页面上还没有被 release-downloads.js 覆盖为更新的远程 Release 信息时，使用本地同步信息
  for (const el of document.querySelectorAll('[data-release-version="plugin-sdk"]')) {
    if (!el.dataset.fromRelease) el.textContent = data.version;
  }
  for (const el of document.querySelectorAll('[data-release-size="plugin-sdk"]')) {
    if (!el.dataset.fromRelease) el.textContent = data.zipSizeLabel;
  }
  renderHeaders(data.headers || []);
  renderDoc(activeDocId);
}

if (window.__REMOTEFLOW_SDK_DATA__) {
  applySdkData(window.__REMOTEFLOW_SDK_DATA__);
} else {
  fetch("sdk-docs.json")
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error("load failed"))))
    .then(applySdkData)
    .catch(() => {
      docBody.innerHTML = '<p class="sdk-loading">无法加载 SDK 文档，请运行 python3 Scripts/sync-sdk-website.py 生成文档数据。</p>';
    });
}

// 页头滚动态
const header = document.querySelector("[data-header]");
if (header) {
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
