// 名称、分类与 SF Symbol 对应 Sources/RemoteFlow/Actions/ActionComponentCatalog.swift。
const groups = [
  { name: "应用", actions: [
    { id: "openApplication", name: "打开应用", description: "启动指定的 Mac 应用。", example: "备忘录", field: "目标应用", editor: "app", result: "已打开应用" },
    { id: "activateApplication", name: "激活应用", description: "让指定应用切到前台。", example: "音乐", field: "目标应用", editor: "app", result: "已激活应用" },
    { id: "switchApplication", name: "切换应用", description: "显示应用切换菜单，方向键选择，确定切换，返回取消。", example: "Finder / 备忘录 / 音乐", result: "应用切换菜单" },
  ] },
  { name: "键盘与输入", actions: [
    { id: "keyboardShortcut", name: "键盘快捷键", description: "录制并发送快捷键，也可随遥控器按住与松开。", example: "⌘ N", field: "快捷键", result: "已发送快捷键" },
    { id: "typeText", name: "输入文本", description: "将预设的单行文字输入当前焦点。", example: "今天的灵感", field: "文本内容", result: "已输入文本" },
    { id: "focusElement", name: "聚焦控件", description: "在目标应用里定位并聚焦控件，支持自动学习或手动定位。", example: "备忘录的编辑区", field: "目标控件", result: "控件已聚焦" },
    { id: "clickElement", name: "点击控件", description: "在应用作用域里选择「学习控件」，点击要学习的按钮或链接。按键或口令触发后，遥控流会重新定位并点击它。", example: "目标应用中的按钮", field: "已学习的控件", result: "控件已点击" },
  ] },
  { name: "链接与请求", actions: [
    { id: "openURL", name: "访问 URL", description: "用默认浏览器打开 HTTP 或 HTTPS 地址。", example: "https://example.com", field: "网址", result: "预览网页访问" },
    { id: "urlSchemeRequest", name: "发送 Scheme 请求", description: "把自定义 URL Scheme 请求交给注册了该协议的 App。", example: "kivo://remote/up", field: "Scheme 地址", result: "预览 Scheme 请求" },
  ] },
  { name: "系统", actions: [
    { id: "unlockScreen", name: "解锁屏幕", description: "使用保存在 macOS 钥匙串中的登录密码尝试解锁。", example: "macOS 钥匙串", result: "模拟解锁完成" },
  ] },
  { name: "流程与反馈", actions: [
    { id: "script", name: "运行脚本", description: "支持 Shell、AppleScript 和 JavaScript（JXA），可单独试运行并将标准输出交给后续动作。", example: "echo 'Hello RemoteFlow'", field: "Shell 脚本", editor: "script", result: "模拟脚本完成" },
    { id: "setVariable", name: "设置变量", description: "用文本或其他变量的值更新已有的全局变量。", example: "观影", field: "新值", result: "模拟更新变量" },
    { id: "wait", name: "等待", description: "暂停指定毫秒数，再执行下一步。", example: "300", field: "等待时长", editor: "wait", result: "等待" },
    { id: "showHUD", name: "显示 HUD", description: "在 Mac 屏幕上显示自定义提示和图标。", example: "准备好了", field: "提示内容", result: "屏幕提示" },
    { id: "showFloatingMenu", name: "显示浮动菜单", description: "呼出可用遥控器导航的灵动岛卡片。", example: "音乐 / 亮度 / 声音输出", editor: "floating", result: "灵动岛已打开" },
  ] },
];

// 动作线性图标 (对齐 SF Symbols)
const iconPaths = {
  openApplication: '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><path d="M9.5 14.5l5-5M10.2 9.5h4.3v4.3"/>',
  activateApplication: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 8.8h18M6.8 6.4h.01M9.6 6.4h.01"/>',
  switchApplication: '<path d="M4 8.5h15l-3-3M20 15.5H5l3 3"/>',
  keyboardShortcut: '<path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3z"/>',
  typeText: '<path d="M5 6V4.5h14V6M12 4.5v15M9 19.5h6"/>',
  focusElement: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2.2v2.8M12 19v2.8M2.2 12H5M19 12h2.8"/>',
  clickElement: '<path d="m5 4 3.5 15 3-5.5 5.5-3zM14 15l3 3M13 3v3M20 7l-2 2"/>',
  openURL: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  urlSchemeRequest: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  unlockScreen: '<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V7a4 4 0 0 1 7.6-1.7"/>',
  setVariable: '<path d="M9 5H7a2 2 0 0 0-2 2v3l-2 2 2 2v3a2 2 0 0 0 2 2h2m6-14h2a2 2 0 0 1 2 2v3l2 2-2 2v3a2 2 0 0 1-2 2h-2m-5-9 4 4m0-4-4 4"/>',
  script: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M7.5 9.2l3 2.8-3 2.8M13 15h4"/>',
  wait: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
  showHUD: '<rect x="3" y="5" width="18" height="12" rx="3"/><path d="M8.5 20.5h7M12 17v3.5"/>',
  showFloatingMenu: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.8"/>',
};
const svgIcon = (id) => `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[id] ?? ""}</svg>`;

// 触发器 SF Symbols + Figma Bolt/Trash SVGs (1:1 对齐源码)
const boltSvg = '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3.75 9.84c0 .28.22.49.52.49h4.14l-2.18 5.93c-.28.76.5 1.16 1 .55l6.65-8.32c.12-.16.19-.3.19-.47 0-.28-.22-.5-.53-.5H9.4l2.19-5.93c.28-.75-.5-1.15-1-.54L3.94 9.37c-.12.16-.19.3-.19.47Z" fill="currentColor"/></svg>';
const trashSvg = '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M11.4 6c.28 0 .46.18.45.44l-.22 7.83c0 .26-.2.43-.45.43-.28 0-.47-.18-.46-.43l.22-7.83c.01-.26.2-.44.46-.44ZM6.6 6c.27 0 .45.17.46.43l.23 7.83c0 .26-.17.44-.46.44-.26 0-.44-.17-.45-.43L6.15 6.44C6.14 6.18 6.33 6 6.6 6ZM9 6c.28 0 .47.18.47.44v7.82c0 .26-.19.44-.47.44-.28 0-.47-.18-.47-.44V6.44C8.53 6.18 8.72 6 9 6Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.38.75c1.13 0 1.82.65 1.82 1.71v1.12h3.34c.3 0 .55.24.55.55 0 .3-.24.55-.55.55h-.87l-.5 10.65c-.06 1.05-.76 1.72-1.81 1.72H5.65c-1.06 0-1.75-.66-1.8-1.72L3.33 4.68h-.87a.55.55 0 0 1 0-1.1h3.33V2.46C5.79 1.4 6.48.75 7.6.75h2.78ZM4.99 15.2c.02.44.34.75.76.75h6.49c.44 0 .75-.3.77-.75l.48-10.52H4.48l.51 10.52Zm2.69-13.36c-.44 0-.73.27-.73.7v1.04h4.08V2.53c0-.42-.29-.69-.72-.69H7.68Z" fill="currentColor"/></svg>';
const globeSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.2"/><path d="M2.8 12h18.4M12 2.8a14.2 14.2 0 0 1 0 18.4M12 2.8a14.2 14.2 0 0 0 0 18.4M4.8 7.5h14.4M4.8 16.5h14.4"/></svg>';
const appFallbackSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><path d="M8.5 12h7M12 8.5v7"/></svg>';
const dpadHintSvg = '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="6.8" y="1.5" width="4.4" height="4.4" rx="1"/><rect x="6.8" y="12.1" width="4.4" height="4.4" rx="1"/><rect x="1.5" y="6.8" width="4.4" height="4.4" rx="1"/><rect x="12.1" y="6.8" width="4.4" height="4.4" rx="1"/></svg>';
const folderSvg = '<svg class="step-app-folder" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true"><path d="M2.2 5.2A1.7 1.7 0 0 1 3.9 3.5h3.2l1.6 1.7h5.4a1.7 1.7 0 0 1 1.7 1.7v6.4a1.7 1.7 0 0 1-1.7 1.7H3.9a1.7 1.7 0 0 1-1.7-1.7V5.2Z"/></svg>';
const playIconSvg = '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3.75 14.08c0 .72.42 1.07.92 1.07.21 0 .45-.07.67-.19l8.53-4.99c.6-.35.81-.59.81-.97 0-.39-.21-.62-.81-.98L5.34 3.04a1.38 1.38 0 0 0-.67-.19c-.5 0-.92.34-.92 1.07v10.16Z" fill="#fff"/></svg>';

const triggerSymbols = {
  voice: '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M15.15 11.48c.34 0 .59-.26.59-.59V7.41c0-.33-.25-.6-.59-.6-.34 0-.59.27-.59.6v3.48c0 .33.25.6.59.6ZM12.69 15.17c.33 0 .59-.26.59-.59V3.72c0-.33-.26-.6-.59-.6-.34 0-.59.27-.59.6v10.86c0 .33.25.6.59.6ZM10.22 12.96c.34 0 .59-.26.59-.59V5.93c0-.32-.25-.59-.59-.59-.33 0-.59.27-.59.6v6.43c0 .33.26.6.59.6ZM7.76 16.8c.33 0 .59-.26.59-.59V2.1c0-.33-.26-.6-.6-.6-.33 0-.58.27-.58.6v14.11c0 .33.25.6.59.6ZM5.3 13.85c.34 0 .6-.27.6-.6V5.05c0-.33-.26-.6-.6-.6-.34 0-.59.27-.59.6v8.2c0 .33.25.6.59.6ZM2.83 10.85c.34 0 .6-.26.6-.59V8.04c0-.33-.26-.6-.6-.6-.33 0-.58.27-.58.6v2.22c0 .33.25.6.58.6Z" fill="currentColor"/></svg>',
  home: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.6 8.6 9 3.2l6.4 5.4v6.1a1 1 0 0 1-1 1h-3.3v-4.2H6.9v4.2H3.6a1 1 0 0 1-1-1V8.6Z"/></svg>',
  tv: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.2" y="3.5" width="13.6" height="9.4" rx="1.8"/><path d="M5.8 15.4h6.4"/></svg>',
  menu: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M3 5h12M3 9h12M3 13h12"/></svg>',
  ok: '<svg viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="6.8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="9" r="4.2" fill="currentColor"/></svg>',
  back: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 11.5 3.5 8 7 4.5"/><path d="M3.8 8h6.7a4 4 0 0 1 4 4v1.5"/></svg>',
  power: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" aria-hidden="true"><path d="M9 2.6v6.2M5.1 4.9a6 6 0 1 0 7.8 0"/></svg>',
  up: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14.5v-11M4.5 8 9 3.5 13.5 8"/></svg>',
  down: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3.5v11M4.5 10 9 14.5 13.5 10"/></svg>',
  left: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 9h-11M8 4.5 3.5 9 8 13.5"/></svg>',
  right: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 9h11M10 4.5 14.5 9 10 13.5"/></svg>',
  volumeUp: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 7.2v3.6h2.6L8.8 14V4L5.1 7.2H2.5Z" fill="currentColor"/><path d="M12 9h4M14 7v4"/></svg>',
  volumeDown: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 7.2v3.6h2.6L8.8 14V4L5.1 7.2H2.5Z" fill="currentColor"/><path d="M12 9h4"/></svg>',
};

const byId = (id) => document.getElementById(id);
const actions = new Map(groups.flatMap((group) => group.actions.map((action) => [action.id, action])));
const buttons = { up: "上", down: "下", left: "左", right: "右", ok: "确定", back: "返回", home: "主页", menu: "菜单", tv: "TV", voice: "语音", power: "电源", volumeUp: "音量 +", volumeDown: "音量 −" };
const gestures = { single: "单击", double: "双击", long: "长按", hold: "按住同步" };
const scopeList = byId("scope-list");
const eventList = byId("event-list");
const chainList = byId("chain");
const actionPicker = byId("action-picker");
const trigger = byId("trigger");
const gesture = byId("gesture");
const phrase = byId("phrase");
const focusPriority = byId("focus-priority");
const eventName = byId("event-name");
const eventEnabled = byId("event-enabled");
const runButton = byId("run-workflow");
const runMessage = byId("run-message");
const addEvent = byId("add-event");
const removeEvent = byId("remove-event");
const addScope = byId("add-scope");
const removeScope = byId("remove-scope");
const resultIsland = byId("result-island");
const sourceButtons = [...document.querySelectorAll("[data-source]")];
const catalog = byId("catalog");
const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
const idleMessage = "选一个触发器，点「运行测试」试试。";

function step(id, value = actions.get(id).example) {
  return { id, value };
}

function flow(name, { source = "button", button = "home", gesture = "single", phrase = name, chain = [] } = {}) {
  return { name, source, button, gesture, phrase, focus: false, enabled: true, chain };
}

function launch(name, app, triggerPhrase = name) {
  return flow(name, { source: "voice", phrase: triggerPhrase, chain: [step("openApplication", app)] });
}

// 1:1 对应实机截图 workspace.webp 的配置列表
const scopes = [
  { name: "全局", icon: "global", kind: "global", events: [
    flow("演示脚本输出", { button: "menu", chain: [
      { ...step("script", "echo '准备好了'"), output: "result" },
      step("showHUD", "{{prefix}} · {{result}}"),
    ] }),
    launch("启动Figma", "Figma", "启动 Figma"),
    launch("打开 Codex", "Codex", "打开 Codex"),
    launch("打开微信", "微信", "打开微信"),
    launch("打开Chrome", "Google Chrome", "启动 Chrome"),
    flow("浮动菜单", { button: "home", chain: [step("showFloatingMenu")] }),
    flow("切换应用", { button: "tv", chain: [step("switchApplication")] }),
    flow("开始写作", { source: "voice", phrase: "开始写作", chain: [step("openApplication", "备忘录"), step("wait", "300"), step("typeText", "今天的灵感")] }),
  ] },
  { name: "Figma", icon: "figma", kind: "app", events: [flow("运行快速操作", { button: "menu", chain: [step("keyboardShortcut", "⌘ K")] })] },
  { name: "Codex", icon: "codex", kind: "app", events: [
    flow("聚焦输入框", { button: "ok", chain: [step("focusElement", "输入框")] }),
    flow("输入提示", { source: "voice", phrase: "整理代码", chain: [step("typeText", "帮我整理这段代码")] }),
    flow("新建会话", { button: "menu", chain: [step("keyboardShortcut", "⌘ N")] }),
    flow("发送请求", { button: "ok", gesture: "double", chain: [step("keyboardShortcut", "⌘ ↵")] }),
  ] },
  { name: "微信", icon: "wechat", kind: "app", events: [
    flow("聚焦消息输入框", { button: "ok", chain: [step("focusElement", "消息输入框")] }),
    flow("向上翻会话", { button: "up", chain: [step("keyboardShortcut", "⌥ ↑")] }),
    flow("向下翻会话", { button: "down", chain: [step("keyboardShortcut", "⌥ ↓")] }),
    flow("搜索聊天", { button: "menu", chain: [step("keyboardShortcut", "⌘ F")] }),
    flow("语音回复", { source: "voice", phrase: "稍后回复", chain: [step("typeText", "稍等，马上回你")] }),
    flow("隐藏窗口", { button: "back", chain: [step("keyboardShortcut", "⌘ W")] }),
  ] },
  { name: "音乐", icon: "music", kind: "app", events: [
    flow("播放 / 暂停", { button: "ok", chain: [step("keyboardShortcut", "空格")] }),
    flow("下一首", { button: "right", chain: [step("keyboardShortcut", "⌘ →")] }),
    flow("上一首", { button: "left", chain: [step("keyboardShortcut", "⌘ ←")] }),
    flow("打开音乐", { source: "voice", phrase: "播放音乐", chain: [step("activateApplication", "音乐")] }),
  ] },
  { name: "Google Chrome", icon: "chrome", kind: "app", events: [flow("打开新标签页", { button: "menu", chain: [step("keyboardShortcut", "⌘ T")] })] },
  { name: "Kivo", icon: "kivo", kind: "app", events: [
    flow("向上选择", { button: "up", chain: [step("urlSchemeRequest", "kivo://remote/up")] }),
    flow("向下选择", { button: "down", chain: [step("urlSchemeRequest", "kivo://remote/down")] }),
    flow("向左选择", { button: "left", chain: [step("urlSchemeRequest", "kivo://remote/left")] }),
    flow("向右选择", { button: "right", chain: [step("urlSchemeRequest", "kivo://remote/right")] }),
    flow("确认播放", { button: "ok", chain: [step("urlSchemeRequest", "kivo://remote/select")] }),
    flow("返回上级", { button: "back", chain: [step("urlSchemeRequest", "kivo://remote/back")] }),
  ] },
];

const appIcons = new Set(["figma", "codex", "wechat", "music", "chrome", "kivo"]);
let scopeIndex = 0;
let eventIndex = 0; // 默认展示脚本输出传给 HUD 的示例
let running = false;
const scope = () => scopes[scopeIndex];
const currentEvent = () => scope().events[eventIndex];
const displayName = (event) => event.name.trim() || "未命名触发器";
const count = (number) => String(number).padStart(2, "0");

function triggerSummary(event) {
  if (event.source === "voice") return `“${event.phrase || displayName(event)}”`;
  const base = `${buttons[event.button]} · ${gestures[event.gesture]}`;
  return event.focus ? `${base} · 输入框优先` : base;
}

function status(message = idleMessage, showIsland = false) {
  runMessage.textContent = message;
  resultIsland.hidden = !showIsland;
}

function optionGroups(selected = "", placeholder) {
  const options = [];
  if (placeholder) {
    const option = new Option(placeholder, "", true, true);
    option.disabled = true;
    options.push(option);
  }
  for (const group of groups) {
    const optgroup = document.createElement("optgroup");
    optgroup.label = group.name;
    for (const action of group.actions) optgroup.append(new Option(action.name, action.id, false, action.id === selected));
    options.push(optgroup);
  }
  return options;
}

function renderScopes(focusIndex) {
  const scroll = scopeList.scrollTop;
  scopeList.replaceChildren(...scopes.map((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "native-row";
    button.setAttribute("aria-pressed", String(index === scopeIndex));
    button.disabled = running;

    const tile = document.createElement("span");
    tile.setAttribute("aria-hidden", "true");
    if (item.kind === "global") {
      tile.className = "native-row-icon global-tile";
      tile.innerHTML = globeSvg;
    } else if (appIcons.has(item.icon)) {
      tile.className = "native-row-icon app-tile";
      const img = document.createElement("img");
      img.src = `assets/ui-${item.icon}.webp`;
      img.alt = "";
      img.width = img.height = 38;
      tile.append(img);
    } else {
      tile.className = "native-row-icon global-tile";
      tile.innerHTML = appFallbackSvg;
    }

    const labels = document.createElement("span");
    const name = document.createElement("strong");
    const summary = document.createElement("small");
    name.textContent = item.name;
    summary.textContent = `${item.events.length} 个配置`;
    labels.append(name, summary);
    button.append(tile, labels);

    button.addEventListener("click", () => {
      scopeIndex = index;
      eventIndex = 0;
      status();
      renderWorkspace();
      eventList.scrollTop = 0;
      scopeList.children[index]?.focus({ preventScroll: true });
    });
    return button;
  }));
  scopeList.scrollTop = scroll;
  byId("scope-count").textContent = count(scopes.length);
  if (removeScope) removeScope.disabled = running || scope().kind === "global";
  if (focusIndex !== undefined) scopeList.children[focusIndex]?.focus({ preventScroll: true });
}

function renderEvents(focusIndex) {
  const scroll = eventList.scrollTop;
  eventList.replaceChildren(...scope().events.map((event, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "native-row";
    button.setAttribute("aria-pressed", String(index === eventIndex));
    button.disabled = running;

    const tile = document.createElement("span");
    tile.className = "native-row-icon";
    tile.setAttribute("aria-hidden", "true");
    tile.innerHTML = event.source === "voice" ? triggerSymbols.voice : (triggerSymbols[event.button] ?? triggerSymbols.ok);

    const labels = document.createElement("span");
    const name = document.createElement("strong");
    const summary = document.createElement("small");
    name.textContent = displayName(event);
    summary.textContent = `${triggerSummary(event)} · ${event.chain.length}步`;
    labels.append(name, summary);

    const bolt = document.createElement("span");
    bolt.className = "native-bolt";
    bolt.setAttribute("aria-hidden", "true");
    bolt.dataset.inactive = String(!event.enabled);
    bolt.innerHTML = boltSvg;

    button.append(tile, labels, bolt);
    button.addEventListener("click", () => {
      eventIndex = index;
      status();
      renderWorkspace();
      eventList.children[index]?.focus({ preventScroll: true });
    });
    return button;
  }));
  eventList.scrollTop = scroll;
  byId("event-scope").textContent = scope().name;
  byId("event-count").textContent = count(scope().events.length);
  if (focusIndex !== undefined) eventList.children[focusIndex]?.focus({ preventScroll: true });
}

function renderSummary() {
  const event = currentEvent();
  byId("chain-summary").textContent = event ? `${scope().name} · ${triggerSummary(event)} · ${event.chain.length}步` : "";
  byId("inspector-summary").textContent = event ? `${scope().name} · ${displayName(event)}` : "选择一个触发器";
  runButton.disabled = running || !event?.enabled || !event.chain.length;
  runButton.innerHTML = running ? "<span>执行中</span>" : `${playIconSvg}<span>运行测试</span>`;
}

function renderConfig() {
  const event = currentEvent();
  byId("native-config").hidden = !event;
  eventEnabled.checked = Boolean(event?.enabled);
  eventEnabled.disabled = running || !event;
  actionPicker.disabled = removeEvent.disabled = running || !event;
  addEvent.disabled = addScope.disabled = running;
  for (const button of catalog.querySelectorAll("button")) button.disabled = running;
  if (!event) return;
  eventName.value = event.name;
  trigger.value = event.button;
  gesture.value = event.gesture;
  focusPriority.checked = event.focus;
  phrase.value = event.phrase;
  byId("button-fields").hidden = event.source !== "button";
  byId("voice-fields").hidden = event.source !== "voice";
  for (const control of [eventName, trigger, gesture, focusPriority, phrase, ...sourceButtons]) control.disabled = running;
  for (const button of sourceButtons) button.setAttribute("aria-pressed", String(button.dataset.source === event.source));
}

function renderChain() {
  const scroll = chainList.scrollTop;
  const event = currentEvent();
  const rows = (event?.chain ?? []).map((item, index) => {
    const action = actions.get(item.id);
    const row = document.createElement("li");
    row.className = "chain-step";
    row.innerHTML = `
      <span class="step-number">${index + 1}</span>
      <div class="step-card">
        <span class="step-icon" aria-hidden="true">${svgIcon(item.id)}</span>
        <div class="step-info">
          <div class="select-wrap"><select aria-label="第 ${index + 1} 步动作类型"></select></div>
          <div class="step-divider" aria-hidden="true"></div>
          <div class="step-inset"></div>
        </div>
        <button type="button" class="native-trash" aria-label="删除第 ${index + 1} 步动作">${trashSvg}</button>
      </div>`;
    const select = row.querySelector("select");
    select.append(...optionGroups(item.id));
    select.disabled = running;
    select.addEventListener("change", () => {
      event.chain[index] = step(select.value);
      status("动作类型已更新");
      renderWorkspace();
      chainList.children[index].querySelector("select").focus({ preventScroll: true });
    });

    const inset = row.querySelector(".step-inset");
    if (action.editor === "floating") {
      const box = document.createElement("div");
      box.className = "step-inset-box";
      box.innerHTML = `${dpadHintSvg}<span>打开常用功能菜单；方向键选择，确定执行，返回关闭。</span>`;
      inset.append(box);
    } else if (action.editor === "app") {
      const wrap = document.createElement("div");
      wrap.className = "step-app-picker";
      const cap = document.createElement("span");
      cap.textContent = action.field;
      const appRow = document.createElement("div");
      appRow.className = "step-app-row";
      const input = document.createElement("input");
      input.value = item.value;
      input.maxLength = 40;
      input.disabled = running;
      input.setAttribute("aria-label", action.field);
      input.addEventListener("input", () => {
        item.value = input.value;
        status("目标应用已更新");
      });
      appRow.innerHTML = folderSvg;
      appRow.prepend(input);
      wrap.append(cap, appRow);
      inset.append(wrap);
    } else if (action.editor === "script") {
      inset.innerHTML = `
        <label><span>脚本类型</span><input value="Shell" readonly></label>
        <label><span>脚本内容</span><textarea rows="2" spellcheck="false"></textarea></label>
        <label><span>将标准输出保存为变量</span><input data-script-output placeholder="例如 result"></label>
        <button class="btn btn-small btn-ghost" type="button">试运行</button>
        <output class="demo-script-result" aria-live="polite"></output>`;
      const source = inset.querySelector("textarea");
      const outputName = inset.querySelector("[data-script-output]");
      const trial = inset.querySelector("button");
      source.value = item.value;
      outputName.value = item.output ?? "";
      source.disabled = outputName.disabled = trial.disabled = running;
      source.addEventListener("input", () => { item.value = source.value; });
      outputName.addEventListener("input", () => { item.output = outputName.value; });
      trial.addEventListener("click", () => {
        const result = readDemoEcho(item.value);
        inset.querySelector("output").textContent = result === null
          ? "网页演示仅模拟 echo 文本。"
          : `模拟成功 · 退出码 0 · 标准输出：${result}`;
      });
    } else if (action.editor === "wait") {
      const waitRow = document.createElement("div");
      waitRow.className = "step-wait-row";
      const input = document.createElement("input");
      input.value = item.value;
      input.maxLength = 4;
      input.inputMode = "numeric";
      input.disabled = running;
      input.setAttribute("aria-label", "等待时长");
      input.addEventListener("input", () => {
        item.value = input.value;
        status("等待时长已更新");
      });
      const unit = document.createElement("em");
      unit.textContent = "毫秒";
      waitRow.append(input, unit);
      inset.append(waitRow);
    } else if (action.field) {
      const label = document.createElement("label");
      const caption = document.createElement("span");
      const input = document.createElement("input");
      caption.textContent = action.field;
      input.value = item.value;
      input.maxLength = 64;
      input.disabled = running;
      input.addEventListener("input", () => {
        item.value = input.value;
        status("动作参数已更新");
      });
      label.append(caption, input);
      inset.append(label);
    } else {
      inset.textContent = action.description;
    }

    const remove = row.querySelector("button.native-trash");
    remove.disabled = running;
    remove.addEventListener("click", () => {
      event.chain.splice(index, 1);
      status("动作已删除");
      renderWorkspace();
      (chainList.children[index]?.querySelector("button") ?? actionPicker).focus({ preventScroll: true });
    });
    return row;
  });
  if (!rows.length) {
    const empty = document.createElement("li");
    empty.className = "empty-chain";
    empty.textContent = event ? "还没有动作。添加动作后，它们会从上到下依次执行。" : "选择一个触发器";
    rows.push(empty);
  }
  chainList.replaceChildren(...rows);
  chainList.scrollTop = scroll;
}

function renderWorkspace() {
  renderScopes();
  renderEvents();
  renderSummary();
  renderConfig();
  renderChain();
}

trigger.append(...Object.entries(buttons).map(([id, name]) => new Option(name, id)));
gesture.append(...Object.entries(gestures).map(([id, name]) => new Option(name, id)));
actionPicker.append(...optionGroups("", "添加动作"));

const catalogTabs = ["全部", ...groups.map((group) => group.name)];
let catalogActive = "全部";

function buildCard(action, groupName) {
  const card = document.createElement("article");
  card.className = "action-card";
  card.innerHTML = `
    <div class="card-top">
      <span class="catalog-icon" aria-hidden="true">${svgIcon(action.id)}</span>
      <span class="card-tag">${groupName}</span>
    </div>
    <strong>${action.name}</strong>
    <p>${action.description}</p>`;
  return card;
}

function renderCatalog() {
  const tabs = document.createElement("div");
  tabs.className = "catalog-tabs";
  tabs.setAttribute("role", "group");
  tabs.setAttribute("aria-label", "动作分类");
  for (const name of catalogTabs) {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.dataset.tab = name;
    tab.setAttribute("aria-pressed", String(name === catalogActive));
    tab.textContent = name;
    tabs.append(tab);
  }
  const grid = document.createElement("div");
  grid.className = "catalog-grid";
  const group = catalogActive === "全部" ? null : groups.find((item) => item.name === catalogActive);
  const list = (group ? group.actions.map((action) => [action, group.name]) : groups.flatMap((item) => item.actions.map((action) => [action, item.name])));
  grid.append(...list.map(([action, groupName]) => buildCard(action, groupName)));
  catalog.replaceChildren(tabs, grid);
}
byId("action-total").textContent = actions.size;
renderCatalog();

for (const [field, key] of [[eventName, "name"], [trigger, "button"], [gesture, "gesture"], [phrase, "phrase"], [focusPriority, "focus"], [eventEnabled, "enabled"]]) {
  field.addEventListener(field.tagName === "INPUT" && field.type !== "checkbox" ? "input" : "change", () => {
    const event = currentEvent();
    event[key] = field.type === "checkbox" ? field.checked : field.value;
    status("触发器配置已更新");
    renderEvents();
    renderSummary();
  });
}
for (const button of sourceButtons) {
  button.addEventListener("click", () => {
    currentEvent().source = button.dataset.source;
    renderConfig();
    renderEvents();
    renderSummary();
    status("触发器配置已更新");
  });
}

function appendAction(id) {
  if (!currentEvent()) {
    scope().events.push(flow("新触发器"));
    eventIndex = scope().events.length - 1;
  }
  currentEvent().chain.push(step(id));
  status(`已添加「${actions.get(id).name}」`);
  renderWorkspace();
  chainList.scrollTop = chainList.scrollHeight;
}
actionPicker.addEventListener("change", () => {
  appendAction(actionPicker.value);
  actionPicker.value = "";
});
catalog.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-tab]");
  if (!tab || tab.dataset.tab === catalogActive) return;
  catalogActive = tab.dataset.tab;
  renderCatalog();
  catalog.querySelector('[data-tab][aria-pressed="true"]').focus({ preventScroll: true });
});
addEvent.addEventListener("change", () => {
  scope().events.push(flow(addEvent.value === "voice" ? "新语音指令" : "新按键事件", { source: addEvent.value }));
  eventIndex = scope().events.length - 1;
  addEvent.value = "";
  status("已添加触发器");
  renderWorkspace();
  eventName.focus({ preventScroll: true });
});
removeEvent.addEventListener("click", () => {
  scope().events.splice(eventIndex, 1);
  eventIndex = Math.max(0, Math.min(eventIndex, scope().events.length - 1));
  status("已删除触发器");
  renderWorkspace();
  (eventList.children[eventIndex] ?? addEvent).focus({ preventScroll: true });
});

const scopeDialog = byId("scope-dialog");
addScope.addEventListener("click", () => scopeDialog.showModal());
removeScope?.addEventListener("click", () => {
  if (scope().kind === "global") return;
  const removed = scope().name;
  scopes.splice(scopeIndex, 1);
  scopeIndex = 0;
  eventIndex = 0;
  status(`已移除「${removed}」工作空间`);
  renderWorkspace();
});
byId("scope-form").addEventListener("submit", (event) => {
  if (event.submitter?.value !== "add") return;
  const name = byId("scope-picker").value;
  const existing = scopes.findIndex((item) => item.name === name);
  if (existing === -1) scopes.push({ name, icon: "custom", kind: "app", events: [flow("快捷操作", { button: "ok", chain: [step("showHUD", `${name} 就绪`)] })] });
  scopeIndex = existing === -1 ? scopes.length - 1 : existing;
  eventIndex = 0;
  status(`已切换到「${name}」工作空间`);
  renderWorkspace();
});

function revealStep(row) {
  chainList.scrollTop += Math.max(0, row.getBoundingClientRect().bottom - chainList.getBoundingClientRect().bottom);
}

function readDemoEcho(source) {
  const match = source.trim().match(/^echo\s+(?:'([^']*)'|"([^"]*)")$/);
  return match ? match[1] ?? match[2] : null;
}

runButton.addEventListener("click", async () => {
  const event = currentEvent();
  if (running || !event?.enabled || !event.chain.length) return;
  const variables = new Map([["prefix", "结果"]]);
  let finalValue;
  for (const item of event.chain) {
    if (item.id === "script" && item.output) {
      const output = readDemoEcho(item.value);
      if (output === null || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(item.output)) {
        status("请使用示例 echo 脚本和有效的输出变量名。");
        return;
      }
      variables.set(item.output, output);
    }
    finalValue = item.id === "script" ? item.value : item.value.replace(
      /\{\{([A-Za-z_][A-Za-z0-9_]*)\}\}/g, (reference, name) => variables.get(name) ?? reference
    );
  }
  const badIndex = event.chain.findIndex(({ id, value }) => !value.trim() || (id === "wait" && !/^\d{1,4}$/.test(value.trim())));
  if (badIndex !== -1) {
    status(`请检查第 ${badIndex + 1} 步参数，演示等待时间支持 0–9999 毫秒。`);
    chainList.children[badIndex].querySelector("input")?.focus();
    return;
  }
  running = true;
  renderWorkspace();
  chainList.scrollTop = 0;
  for (const [index, item] of event.chain.entries()) {
    const row = chainList.children[index];
    const action = actions.get(item.id);
    row.dataset.state = "active";
    revealStep(row);
    status(`第 ${index + 1} 步 · ${action.name}`);
    await new Promise((resolve) => setTimeout(resolve, item.id === "wait" ? Number(item.value) : 360));
    row.dataset.state = "done";
  }
  running = false;
  renderWorkspace();
  for (const row of chainList.children) row.dataset.state = "done";
  const last = event.chain.at(-1);
  const action = actions.get(last.id);
  status(`模拟完成 · ${action.result}${action.field && last.id !== "wait" ? " · " + finalValue : ""}`, last.id === "showFloatingMenu");
  if (document.activeElement === document.body) runButton.focus({ preventScroll: true });
});
renderWorkspace();

/* ==========================================================================
   灵动岛 1:1 交互 · 滚动到视口自动展开 + 全局键盘直接操控 + 浮动文字提示与说明
   ========================================================================== */
const islandDemo = document.querySelector("#island-demo");
const islandMenu = document.querySelector("#island-menu");
const islandViewport = document.querySelector("#island-viewport");
const islandTrack = document.querySelector("#island-track");
const islandNotch = document.querySelector("#island-notch");
const islandCloseBtn = document.querySelector("#island-close-btn");
const islandStatus = document.querySelector("#island-status");
const islandKeyhints = document.querySelector("#island-keyhints");
const islandCounter = document.querySelector("#island-counter");
const islandNavHint = document.querySelector("#island-nav-hint");
const islandCardHint = document.querySelector("#island-card-hint");
const islandCloseLabel = document.querySelector("#island-close-label");
const islandList = document.querySelector("#island-list");
const islandCards = [...islandMenu.querySelectorAll(".icard")];
const brightnessValue = document.querySelector("#island-brightness");
const soundRows = [...islandList.querySelectorAll(".row")];
const sounds = soundRows.map((row) => row.querySelector("span").textContent);

const islandTitles = ["视频续播", "Apple Music", "追番", "亮度", "锁屏", "声音输出", "连接蓝牙"];
const islandDescriptions = [
  "视频续播 · 《在下打更人》第 3 集，按 Enter 从上次进度继续播放",
  "Apple Music · 《深夜一角》毛不易，按 Enter 播放或暂停",
  "追番 · 收藏与追番已检查，按 Enter 查看剧集动态",
  () => `亮度 ${brightnessValue.textContent} · 按 ＋ / − 键实时调节屏幕亮度`,
  "锁屏 · 按 Enter 立即锁定 Mac 屏幕并收起灵动岛",
  "声音输出 · 按 Enter 展开输出设备列表（扬声器 / 耳机）",
  "连接蓝牙 · 按 Enter 快速打开系统蓝牙配对设置",
];
const islandRemoteHints = [
  "OK 继续播放",
  "OK 播放 / 暂停",
  "OK 查看更新",
  "音量 ＋／− 调亮度",
  "OK 锁屏",
  "OK 选择输出设备",
  "OK 连接新设备",
];
const islandNav = {
  left: [0, 0, 1, 2, 3, 3, 5],
  right: [1, 2, 3, 4, 5, 6, 6],
  up: [0, 1, 2, 3, 4, 3, 4],
  down: [0, 1, 2, 5, 6, 5, 6],
};

// 1:1 复刻 PluginCardLayout.swift 的轮播块几何 (总宽 1000pt，视口 843pt)
const carouselViewport = 843;
const carouselCardFrames = [
  [0, 320],   // 0: 视频续播
  [332, 512], // 1: Apple Music
  [524, 784], // 2: 追番
  [796, 892], // 3: 亮度
  [904, 1000],// 4: 锁屏
  [796, 892], // 5: 声音输出
  [904, 1000],// 6: 连接蓝牙
];
const carouselBlocks = [
  { indices: [0], minX: 0, maxX: 320 },
  { indices: [1], minX: 332, maxX: 512 },
  { indices: [2], minX: 524, maxX: 784 },
  { indices: [3, 4, 5, 6], minX: 796, maxX: 1000 },
];

// 初始为收起态，滚入视口时自动从刘海生长展开
let islandExpanded = false;
let islandInView = false;
let islandIndex = 3;      // 初始聚焦「亮度」(04 / 07)，偏移 157pt
let carouselOffset = 157;
let playing = false;
let brightness = 54;
let soundIndex = 0;
let currentSound = 0;
let choosingSound = false;

function updateCarousel(index) {
  const selected = carouselBlocks.find((b) => b.indices.includes(index));
  const end = 1000 - carouselViewport; // 157pt
  const anchors = [0, end];
  const current = anchors.reduce((a, b) => (Math.abs(a - carouselOffset) < Math.abs(b - carouselOffset) ? a : b), 0);
  if (selected.minX < current) {
    carouselOffset = selected.minX;
  } else if (selected.maxX > current + carouselViewport) {
    carouselOffset = end;
  }
  islandTrack.style.setProperty("--carousel-x", String(-carouselOffset));
  const cutsLeft = carouselCardFrames.some(([minX, maxX]) => carouselOffset > minX && carouselOffset < maxX);
  const cutsRight = carouselCardFrames.some(([minX, maxX]) => (carouselOffset + carouselViewport) > minX && (carouselOffset + carouselViewport) < maxX);
  islandViewport.dataset.fadeLeft = String(cutsLeft);
  islandViewport.dataset.fadeRight = String(cutsRight);
}

function islandSyncCards() {
  islandCards.forEach((card, index) => card.setAttribute("aria-pressed", String(index === islandIndex)));
  islandCards[1].setAttribute("aria-label", playing ? "Apple Music，正在播放" : "Apple Music，已暂停");
}

function islandSyncFooter() {
  islandCounter.textContent = `${count(islandIndex + 1)} / 07`;
  if (choosingSound) {
    islandNavHint.textContent = "↑ ↓ 切换声音输出";
    islandCardHint.textContent = "";
    islandCloseLabel.textContent = "返回";
  } else {
    islandNavHint.textContent = "选择";
    islandCardHint.textContent = islandRemoteHints[islandIndex] || "";
    islandCloseLabel.textContent = "关闭";
  }
}

function renderKeyHints() {
  if (!islandExpanded) {
    islandKeyhints.innerHTML = `
      <span><kbd data-key="Enter">Enter</kbd> / <kbd data-key="Space">Space</kbd> 呼出灵动岛</span>
      <span><kbd data-key="Arrow">← ↑ ↓ →</kbd> 唤醒并选择</span>
      <span>或点击顶部刘海</span>`;
    return;
  }
  if (choosingSound) {
    islandKeyhints.innerHTML = `
      <span><kbd data-key="ArrowUp">↑</kbd><kbd data-key="ArrowDown">↓</kbd> 切换输出设备</span>
      <span><kbd data-key="Enter">Enter</kbd> 确认选择</span>
      <span><kbd data-key="Escape">Esc</kbd> 返回卡片</span>`;
    return;
  }
  const volumeHint = islandIndex === 3
    ? `<span><kbd data-key="-">−</kbd><kbd data-key="+">＋</kbd> 调节亮度</span>`
    : "";
  const enterLabel = islandIndex === 5 ? "进入列表" : (islandIndex === 1 ? (playing ? "暂停音乐" : "播放音乐") : "确定执行");
  islandKeyhints.innerHTML = `
    <span><kbd data-key="ArrowLeft">←</kbd><kbd data-key="ArrowUp">↑</kbd><kbd data-key="ArrowDown">↓</kbd><kbd data-key="ArrowRight">→</kbd> 选择卡片</span>
    ${volumeHint}
    <span><kbd data-key="Enter">Enter</kbd> ${enterLabel}</span>
    <span><kbd data-key="Escape">Esc</kbd> 收起回刘海</span>`;
}

function flashKeycap(key) {
  const normalized = key === "_" ? "-" : (key === "=" ? "+" : (key === " " ? "Space" : key));
  const cap = islandKeyhints.querySelector(`kbd[data-key="${CSS.escape(normalized)}"]`)
    || (key.startsWith("Arrow") ? islandKeyhints.querySelector('kbd[data-key="Arrow"]') : null);
  if (!cap) return;
  cap.classList.add("pressed");
  setTimeout(() => cap.classList.remove("pressed"), 160);
}

function islandSyncList() {
  soundRows.forEach((row, index) => {
    row.classList.toggle("focused", index === soundIndex);
    row.classList.toggle("current", index === currentSound);
    row.setAttribute("aria-pressed", String(index === currentSound));
  });
}

function describeCard(index) {
  const desc = islandDescriptions[index];
  return typeof desc === "function" ? desc() : desc;
}

function selectIsland(index) {
  islandIndex = index;
  choosingSound = false;
  islandList.hidden = true;
  islandMenu.classList.remove("output-mode");
  updateCarousel(index);
  islandSyncCards();
  islandSyncFooter();
  renderKeyHints();
  if (islandExpanded) {
    islandStatus.textContent = describeCard(index);
  }
}

function expandIsland(focusMenu = false) {
  if (islandExpanded) return;
  islandExpanded = true;
  islandMenu.dataset.state = "expanded";
  selectIsland(islandIndex);
  if (focusMenu) islandMenu.focus({ preventScroll: true });
}

function collapseIsland(customMessage) {
  if (!islandExpanded) return;
  choosingSound = false;
  islandList.hidden = true;
  islandMenu.classList.remove("output-mode");
  islandExpanded = false;
  islandMenu.dataset.state = "collapsed";
  islandStatus.textContent = customMessage || "灵动岛已收起回顶部刘海 · 按 Enter、方向键或点击刘海重新展开";
  renderKeyHints();
}

function adjustBrightness(amount) {
  if (!islandExpanded || choosingSound || islandIndex !== 3) return;
  brightness = Math.min(100, Math.max(1, brightness + amount));
  brightnessValue.textContent = `${Math.round(brightness)}%`;
  islandStatus.textContent = `亮度已调至 ${brightnessValue.textContent} · 继续按 ＋ / − 键微调`;
  islandCards[3].setAttribute("aria-label", `亮度 ${brightnessValue.textContent}`);
}

function changeSound(delta) {
  soundIndex = (soundIndex + delta + sounds.length) % sounds.length;
  currentSound = soundIndex;
  islandSyncList();
  islandStatus.textContent = `声音输出已切换至「${sounds[currentSound]}」`;
}

function confirmSound() {
  currentSound = soundIndex;
  islandSyncList();
  islandStatus.textContent = `当前声音输出：${sounds[currentSound]} · 按 Esc 返回卡片`;
}

function activateCard() {
  if (!islandExpanded) {
    expandIsland(false);
    return;
  }
  if (choosingSound) {
    confirmSound();
    return;
  }
  switch (islandIndex) {
    case 0:
      islandStatus.textContent = "《在下打更人》第 3 集 · 已从 0:11 继续播放（演示）";
      break;
    case 1:
      playing = !playing;
      islandSyncCards();
      renderKeyHints();
      islandStatus.textContent = playing ? "Apple Music · 正在播放《深夜一角》— 毛不易" : "Apple Music · 已暂停《深夜一角》";
      break;
    case 2:
      islandStatus.textContent = "追番 · 已打开番剧更新列表（演示）";
      break;
    case 3:
      islandStatus.textContent = `当前屏幕亮度 ${brightnessValue.textContent} · 按键盘 ＋ / − 键即可调节`;
      break;
    case 4:
      collapseIsland("已执行锁屏并自动收起灵动岛 · 按 Enter 重新呼出");
      break;
    case 5:
      choosingSound = true;
      soundIndex = currentSound;
      islandList.hidden = false;
      islandMenu.classList.add("output-mode");
      islandSyncList();
      islandSyncFooter();
      renderKeyHints();
      islandStatus.textContent = `声音输出列表 · 当前为「${sounds[currentSound]}」，按 ↑ ↓ 切换设备`;
      break;
    case 6:
      islandStatus.textContent = "连接蓝牙 · 已打开 macOS 蓝牙设置面板（演示）";
      break;
  }
}

function backIsland() {
  if (!islandExpanded) return;
  if (choosingSound) {
    selectIsland(5);
    return;
  }
  collapseIsland();
}

function moveIsland(direction) {
  if (!islandExpanded) {
    expandIsland(false);
    return;
  }
  if (choosingSound) {
    if (direction === "up") changeSound(-1);
    else if (direction === "down") changeSound(1);
    return;
  }
  selectIsland(islandNav[direction][islandIndex]);
}

for (const [index, card] of islandCards.entries()) {
  card.addEventListener("click", () => {
    if (!islandExpanded) return;
    if (index === islandIndex) activateCard();
    else selectIsland(index);
  });
}

for (const row of soundRows) {
  row.addEventListener("click", () => {
    soundIndex = Number(row.dataset.sound);
    confirmSound();
  });
}

const islandCommands = {
  previous: () => moveIsland("left"),
  next: () => moveIsland("right"),
  up: () => moveIsland("up"),
  down: () => moveIsland("down"),
  activate: activateCard,
  close: backIsland,
  brightnessDown: () => adjustBrightness(-6.25),
  brightnessUp: () => adjustBrightness(6.25),
};

islandCloseBtn.addEventListener("click", () => backIsland());
islandNotch.addEventListener("click", () => {
  if (islandExpanded) collapseIsland();
  else expandIsland(false);
});

// 点击「去操作灵动岛 →」时平滑滚动并确保展开
resultIsland.addEventListener("click", () => {
  setTimeout(() => expandIsland(false), 320);
});

// 支持鼠标触控板横向滚动切换轮播
let wheelAccumulator = 0;
islandViewport.addEventListener("wheel", (event) => {
  if (!islandExpanded || choosingSound || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
  event.preventDefault();
  wheelAccumulator += event.deltaX;
  if (Math.abs(wheelAccumulator) >= 28) {
    moveIsland(wheelAccumulator > 0 ? "right" : "left");
    wheelAccumulator = 0;
  }
}, { passive: false });

// 全局键盘监听：只要灵动岛区域在当前视口内且焦点不在表单控件上，直接按键盘即可操控！
function isEditableTarget(el) {
  if (!el) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA" || el.isContentEditable) return true;
  if (el.closest("dialog[open]") || el.closest(".native-window")) return true;
  return false;
}

function isIslandOnScreen() {
  const rect = islandDemo.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
  return visible >= Math.min(180, rect.height * 0.35);
}

window.addEventListener("keydown", (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (!islandInView && !isIslandOnScreen() && !islandMenu.contains(document.activeElement)) return;
  if (isEditableTarget(event.target)) return;

  const keys = {
    ArrowLeft: "previous",
    ArrowRight: "next",
    ArrowUp: "up",
    ArrowDown: "down",
    Enter: "activate",
    Escape: "close",
    "-": "brightnessDown",
    "_": "brightnessDown",
    "+": "brightnessUp",
    "=": "brightnessUp",
  };
  let command = keys[event.key];
  if (!command && event.key === " " && !islandExpanded) {
    command = "activate";
  }
  if (!command) return;
  // 若用户正在聚焦页面其他普通按钮/链接且按 Enter，不劫持其原生点击
  if (event.key === "Enter" && event.target !== document.body && !islandDemo.contains(event.target)) return;

  event.preventDefault();
  flashKeycap(event.key);
  islandCommands[command]();
});

// 初始化卡片数据与提示（保持初始 collapsed 状态，等待视口展开）
updateCarousel(islandIndex);
islandSyncCards();
islandSyncFooter();
renderKeyHints();

// 页头滚动态
const siteHeader = document.querySelector("[data-header]");
const onHeaderScroll = () => siteHeader.classList.toggle("scrolled", window.scrollY > 8);
onHeaderScroll();
window.addEventListener("scroll", onHeaderScroll, { passive: true });

// 公开到 window 方便调试与自动化验证
Object.assign(window, { selectIsland, activateCard, collapseIsland, expandIsland });

// 入场揭示 + 灵动岛视口监听（滚入视口时自动从物理刘海生长展开，滚出视口后自动复位以便下次再看动画）
const reveals = [...document.querySelectorAll("[data-reveal]")];
if (!("IntersectionObserver" in window)) {
  reveals.forEach((el) => el.classList.add("in"));
  islandInView = true;
  expandIsland(false);
} else {
  if (motion.matches) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach((el) => observer.observe(el));
  }

  let expandTimer = 0;
  const islandObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const ratio = entry.intersectionRatio;
      const visiblePx = entry.intersectionRect.height;
      islandInView = entry.isIntersecting && (ratio >= 0.25 || visiblePx >= 180);
      clearTimeout(expandTimer);
      if (entry.isIntersecting && (ratio >= 0.25 || visiblePx >= 180)) {
        if (!islandExpanded) {
          expandTimer = setTimeout(() => expandIsland(false), 180);
        }
      } else if (!entry.isIntersecting && islandExpanded) {
        // 完全离开视口时静默复位为收起态，下次滚回来还能看到自动展开动画
        choosingSound = false;
        islandList.hidden = true;
        islandMenu.classList.remove("output-mode");
        islandExpanded = false;
        islandMenu.dataset.state = "collapsed";
        renderKeyHints();
      }
    }
  }, { threshold: [0, 0.12, 0.25, 0.45] });
  islandObserver.observe(islandDemo);
}
