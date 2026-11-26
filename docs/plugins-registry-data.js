window.__REMOTEFLOW_PLUGIN_REGISTRY__ = {
  "schemaVersion": 1,
  "submissionRepo": "https://github.com/kailous/RemoteFlow-downloads",
  "categories": [
    { "id": "featured", "label": "精选插件" },
    { "id": "all", "label": "全部插件" },
    { "id": "music", "label": "音乐与媒体" },
    { "id": "system", "label": "系统工具" },
    { "id": "productivity", "label": "效率办公" },
    { "id": "smart-home", "label": "智能家居" }
  ],
  "plugins": [
    {
      "id": "com.remoteflow.apple-music",
      "releaseArtifact": "apple-music",
      "name": "Apple Music",
      "tagline": "在灵动岛查看专辑封面与进度，遥控器切歌和播放控制",
      "description": "在灵动岛实时展示正在播放的专辑封面、歌名、歌手与播放进度条，用遥控器方向键切歌、确定键播放或暂停，完整支持 Apple Music 订阅曲库与「音乐」App 本地资料库。",
      "category": "music",
      "featured": true,
      "featuredAccent": "music",
      "official": true,
      "author": "RemoteFlow",
      "authorUrl": "https://github.com/kailous",
      "repoUrl": "https://github.com/kailous/RemoteFlow-downloads",
      "version": "1.5.0",
      "sizeLabel": "ZIP · 36 KB",
      "compatibility": "Apple 芯片 · macOS 14+",
      "signing": {
        "type": "ad-hoc",
        "label": "临时签名 · 需开发者模式"
      },
      "downloadUrl": "https://github.com/kailous/RemoteFlow-downloads/releases/download/v1.5.0-beta.1/RemoteFlow-Plugin-AppleMusic-1.5.0-macos-arm64.zip",
      "icon": {
        "type": "image",
        "src": "assets/ui-music.webp"
      },
      "preview": {
        "type": "music-card",
        "src": "assets/island-music-card.webp",
        "alt": "Apple Music 灵动岛卡片，显示专辑封面、曲目与播放进度",
        "caption": "↑ ↓ 切歌 · OK 播放/暂停"
      },
      "features": [
        "按遥控器上、下键切换曲目，按确定键播放或暂停。",
        "实时展示高清专辑封面、曲目名称与播放进度。",
        "支持 Apple Music 订阅曲目及「音乐」App 本地资料库。"
      ],
      "requirements": "首次使用在卡片上按确定，按 macOS 系统提示授权 RemoteFlow 控制「音乐」。",
      "keywords": ["音乐播放", "媒体", "歌曲", "切歌", "上一首", "下一首", "暂停", "专辑", "封面", "播放进度", "apple music"]
    },
    {
      "id": "com.remoteflow.system-controls",
      "releaseArtifact": "system-controls",
      "name": "系统快控",
      "tagline": "音量键调屏幕亮度，一键锁屏、切换声音输出与蓝牙",
      "description": "把高频 macOS 系统操作放进灵动岛 2×2 卡片：聚焦亮度卡片即可用遥控器音量键调节屏幕亮度，还支持一键锁屏、原地切换扬声器/耳机输出设备与打开蓝牙配对设置。",
      "category": "system",
      "featured": true,
      "featuredAccent": "system",
      "official": true,
      "author": "RemoteFlow",
      "authorUrl": "https://github.com/kailous",
      "repoUrl": "https://github.com/kailous/RemoteFlow-downloads",
      "version": "1.1.2",
      "sizeLabel": "ZIP · 89 KB",
      "compatibility": "Apple 芯片 · macOS 14+",
      "signing": {
        "type": "ad-hoc",
        "label": "临时签名 · 需开发者模式"
      },
      "downloadUrl": "https://github.com/kailous/RemoteFlow-downloads/releases/download/v1.5.0-beta.1/RemoteFlow-Plugin-SystemControls-1.1.2-macos-arm64.zip",
      "icon": {
        "type": "system-grid"
      },
      "preview": {
        "type": "system-tiles",
        "src": "assets/island-controls.webp",
        "alt": "系统快控的亮度、锁屏、声音输出和连接蓝牙卡片",
        "caption": "音量 ＋／− 调亮度"
      },
      "features": [
        "聚焦「亮度」卡片时，按遥控器音量 ＋／− 直接调节亮度。",
        "一键锁屏，或原地展开「声音输出」列表切换扬声器与蓝牙耳机。",
        "快速打开 macOS 蓝牙设置面板配对新设备。"
      ],
      "requirements": "锁屏需要辅助功能权限；外接显示器亮度调节取决于显示器硬件支持情况。",
      "keywords": ["系统快控", "系统工具", "亮度", "锁屏", "音频", "声音输出", "扬声器", "耳机", "蓝牙", "controls"]
    },
    {
      "id": "local.kivo.remoteflow.progress",
      "name": "Kivo · 观看进度",
      "tagline": "在灵动岛轮播未看完的作品，按确定回到 Kivo 续播",
      "description": "轮播最近没看完的作品，显示单集封面、集名和已播进度。 聚焦卡片后用上下键翻页，按确定在 Kivo 续播当前集。",
      "category": "music",
      "featured": true,
      "featuredAccent": "music",
      "official": true,
      "author": "Kivo",
      "authorUrl": "https://kivo.rainforest.org.cn/",
      "repoUrl": "https://github.com/kailous/kivo-download",
      "version": "2.5.3",
      "sizeLabel": "ZIP · 34 KB",
      "compatibility": "Apple 芯片 · macOS 14+ · RemoteFlow 原生卡片 ABI 2",
      "signing": {
        "type": "ad-hoc",
        "label": "临时签名 · 需开发者模式"
      },
      "downloadUrl": "https://github.com/kailous/kivo-download/releases/download/remoteflow-plugins-v2.5.3/RemoteFlow-Plugin-KivoProgress-2.5.3-macos-arm64.zip",
      "sha256": "e80025f8b058988cf04b50649dac741cc2b93770254d115212d0712ce3457e74",
      "icon": {
        "type": "image",
        "src": "assets/kivo-app-icon.webp"
      },
      "preview": {
        "type": "music-card",
        "src": "assets/island-video-full.webp",
        "alt": "Kivo 观看进度卡片，显示单集封面、剧集和进度条"
      },
      "features": [
        "轮播最近没看完的作品，显示单集封面、集名和已播进度。",
        "聚焦卡片后用上下键翻页，按确定在 Kivo 续播当前集。",
        "可以调整轮播间隔，或关闭封面显示。"
      ],
      "requirements": "需要安装并使用过 Kivo 0.5.0，以及支持 ABI 2 原生卡片的 RemoteFlow。插件使用临时签名。",
      "keywords": [
        "Kivo",
        "续播",
        "播放记录",
        "视频",
        "进度",
        "影视"
      ]
    },
    {
      "id": "local.kivo.remoteflow.updates",
      "name": "Kivo · 追剧更新",
      "tagline": "在灵动岛查看收藏与追番上新，按确定打开详情",
      "description": "检查收藏和追番中的剧集更新，支持 Bilibili 番剧与普通爱奇艺剧集。 上下键翻看检查结果，按确定在 Kivo 打开作品详情。",
      "category": "music",
      "featured": true,
      "featuredAccent": "music",
      "official": true,
      "author": "Kivo",
      "authorUrl": "https://kivo.rainforest.org.cn/",
      "repoUrl": "https://github.com/kailous/kivo-download",
      "version": "2.5.3",
      "sizeLabel": "ZIP · 34 KB",
      "compatibility": "Apple 芯片 · macOS 14+ · RemoteFlow 原生卡片 ABI 2",
      "signing": {
        "type": "ad-hoc",
        "label": "临时签名 · 需开发者模式"
      },
      "downloadUrl": "https://github.com/kailous/kivo-download/releases/download/remoteflow-plugins-v2.5.3/RemoteFlow-Plugin-KivoUpdates-2.5.3-macos-arm64.zip",
      "sha256": "27d107415d5fc9e97eaf132bf9c3749bc7c53119e5d7953635a017377f22a8f1",
      "icon": {
        "type": "image",
        "src": "assets/kivo-app-icon.webp"
      },
      "preview": {
        "type": "music-card",
        "src": "assets/island-bangumi-card.webp",
        "alt": "Kivo 追剧更新卡片，显示收藏与追番检查状态"
      },
      "features": [
        "检查收藏和追番中的剧集更新，支持 Bilibili 番剧与普通爱奇艺剧集。",
        "上下键翻看检查结果，按确定在 Kivo 打开作品详情。",
        "可以调整检查间隔、摘要数量与错误提示。"
      ],
      "requirements": "需要安装并使用过 Kivo 0.5.0，以及支持 ABI 2 原生卡片的 RemoteFlow。插件使用临时签名。",
      "keywords": [
        "Kivo",
        "更新",
        "追番",
        "收藏",
        "新集",
        "番剧"
      ]
    }
  ]
};
