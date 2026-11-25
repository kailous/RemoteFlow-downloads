const searchBox = document.querySelector("#store-search-box");
const search = document.querySelector("#store-search");
const filters = document.querySelector("#store-filters");
const categoryButtons = [...filters.querySelectorAll("[data-category]")];
const items = [...document.querySelectorAll("[data-plugin-category]")];
const title = document.querySelector("#store-list-title");
const count = document.querySelector("#store-count");
const empty = document.querySelector("#store-empty");
const reset = document.querySelector("#store-reset");
let category = "all";

function renderResults() {
  const terms = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  let visible = 0;

  for (const item of items) {
    const text = `${item.querySelector(".store-item-info").textContent} ${item.dataset.keywords}`.toLocaleLowerCase();
    const matchesCategory = category === "all" || item.dataset.pluginCategory === category;
    item.hidden = !matchesCategory || !terms.every((term) => text.includes(term));
    if (!item.hidden) visible++;
  }

  empty.hidden = visible !== 0;
  count.textContent = `${visible} 个插件`;
  for (const button of categoryButtons) {
    const active = button.dataset.category === category;
    button.setAttribute("aria-pressed", String(active));
    if (active) title.textContent = button.textContent.trim();
  }
}

search.addEventListener("input", renderResults);
for (const button of categoryButtons) {
  button.addEventListener("click", () => {
    category = button.dataset.category;
    renderResults();
  });
}
reset.addEventListener("click", () => {
  search.value = "";
  category = "all";
  renderResults();
  search.focus();
});

searchBox.hidden = false;
filters.hidden = false;
renderResults();

for (const button of document.querySelectorAll("[data-plugin-details]")) {
  const dialog = document.getElementById(button.dataset.pluginDetails);
  if (typeof dialog.showModal !== "function") continue;

  button.hidden = false;
  button.addEventListener("click", () => {
    button.focus({ preventScroll: true });
    dialog.showModal();
  });
  dialog.querySelector('a[href="#install"]').addEventListener("click", () => dialog.close());
}
