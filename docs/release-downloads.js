(() => {
  const repository = "kailous/RemoteFlow-downloads";
  const version = "([0-9]+\\.[0-9]+(?:\\.[0-9]+)?(?:-[A-Za-z0-9]+(?:[.-][A-Za-z0-9]+)*)?)";
  const archive = "-macos-(?:universal|arm64)";
  const artifacts = [
    { id: "app", packageName: new RegExp(`^RemoteFlow-${version}${archive}\\.(zip|dmg|pkg)$`) },
    { id: "apple-music", title: "Apple Music", packageName: new RegExp(`^RemoteFlow-Plugin-AppleMusic-${version}${archive}\\.(zip)$`) },
    { id: "system-controls", title: "系统快控", packageName: new RegExp(`^RemoteFlow-Plugin-SystemControls-${version}${archive}\\.(zip)$`) },
  ];

  async function refreshDownloads() {
    const response = await fetch(`https://api.github.com/repos/${repository}/releases?per_page=20`);
    if (!response.ok) return;
    const releases = (await response.json())
      .filter((release) => !release.draft && /^v[0-9][\w.-]*$/.test(release.tag_name))
      .sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at));

    for (const { id, title, packageName } of artifacts) {
      const links = document.querySelectorAll(`[data-release-artifact="${id}"]`);
      if (!links.length) continue;

      for (const release of releases) {
        const asset = release.assets.find((item) => item.state === "uploaded" && packageName.test(item.name));
        if (!asset) continue;
        const [, packageVersion, extension] = asset.name.match(packageName);
        const url = `https://github.com/${repository}/releases/download/${release.tag_name}/${asset.name}`;
        const format = extension.toUpperCase();

        for (const link of links) {
          link.href = url;
          if (title) link.setAttribute("aria-label", `下载 ${title} ${packageVersion} ${format}`);
        }
        for (const label of document.querySelectorAll(`[data-release-version="${id}"]`)) {
          label.textContent = packageVersion;
        }
        for (const label of document.querySelectorAll(`[data-release-size="${id}"]`)) {
          label.textContent = `${format} · ${Math.round(asset.size / 1024)} KB`;
        }
        if (id === "app") {
          for (const label of document.querySelectorAll("[data-release-status]")) {
            label.textContent = `${release.prerelease ? "内测版" : "正式版"} · ${packageVersion}`;
          }
        }
        break;
      }
    }
  }

  // The HTML links remain usable if the public releases API is unavailable.
  refreshDownloads().catch(() => {});
})();
