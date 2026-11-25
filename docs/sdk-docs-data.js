window.__REMOTEFLOW_SDK_DATA__ = {
  "version": "2.3.0",
  "abiVersion": 2,
  "zipFile": "downloads/RemoteFlow-PluginSDK-2.3.0.zip",
  "zipSizeBytes": 26940,
  "zipSizeLabel": "ZIP · 26 KB",
  "headers": [
    {
      "name": "RemoteFlowCardPlugin.h",
      "summary": "ABI 2 原生卡片入口、遥控事件路由与动态尺寸通知",
      "lines": 46,
      "bytes": 2920
    },
    {
      "name": "RemoteFlowMenuPlugin.h",
      "summary": "ABI 1 旧版菜单接口与 SDK 版本常量",
      "lines": 27,
      "bytes": 1330
    },
    {
      "name": "RemoteFlowSettings.h",
      "summary": "声明式设置菜单的配置接收回调",
      "lines": 17,
      "bytes": 754
    },
    {
      "name": "RemoteFlowProgressLayout.h",
      "summary": "标准进度卡片（180pt 高）的固定布局尺寸常量",
      "lines": 12,
      "bytes": 414
    },
    {
      "name": "RemoteFlowUI.h",
      "summary": "Header-only AppKit 原生暗色控件与遥控焦点样式",
      "lines": 88,
      "bytes": 4567
    },
    {
      "name": "RemoteFlowUI.swift",
      "summary": "SwiftUI 主题、分组容器、按钮与 .rfRemoteFocused 修饰符",
      "lines": 63,
      "bytes": 2094
    }
  ],
  "examples": [
    {
      "name": "HelloMenu",
      "abi": "ABI 1",
      "buildCommand": "zsh PluginSDK/Examples/HelloMenu/build.sh /private/tmp/HelloMenu.bundle",
      "description": "ABI 1 快捷菜单示例：演示最小 C 导出入口与动态菜单项。"
    },
    {
      "name": "RichCards",
      "abi": "ABI 2",
      "buildCommand": "zsh PluginSDK/Examples/RichCards/build.sh /private/tmp/RichCards.bundle",
      "description": "完整 ABI 2 原生卡片示例：音乐卡片（封面、播放控制、音量滑块、动态撑开列表）+ 图片卡片 + 统一设置菜单。"
    }
  ],
  "docs": [
    {
      "id": "overview",
      "title": "总览与 ABI 2 指南",
      "source": "PluginSDK/README.md",
      "headings": [
        {
          "id": "统一设置与控件",
          "title": "统一设置与控件"
        },
        {
          "id": "编译与安装图片卡片示例",
          "title": "编译与安装图片卡片示例"
        },
        {
          "id": "插件包与清单",
          "title": "插件包与清单"
        },
        {
          "id": "abi-2-原生卡片",
          "title": "ABI 2：原生卡片"
        },
        {
          "id": "卡片内遥控与鼠标",
          "title": "卡片内遥控与鼠标"
        },
        {
          "id": "打开期间实时撑开",
          "title": "打开期间实时撑开"
        },
        {
          "id": "生命周期-签名与兼容",
          "title": "生命周期、签名与兼容"
        },
        {
          "id": "签名与信任",
          "title": "签名与信任"
        },
        {
          "id": "标准进度卡片",
          "title": "标准进度卡片"
        }
      ],
      "html": "<p><strong>基础展示元素是卡片。</strong> 插件可以独立开发每张卡片的完整 UI，包括本地图片、远程图片加载、富文本、按钮、进度条、滑块、列表和自定义绘制。容器负责卡片外框、排列、自适应窗口、焦点与遥控路由，卡片内部布局和交互由插件决定。</p>\n<p>宿主支持 ABI 2 原生卡片和 ABI 1 旧版菜单。新版卡片使用 <a href=\"#sdk-files\"><code>RemoteFlowCardPlugin.h</code></a>，与宿主之间只交换 C ABI 和 AppKit NSView；插件内部可以使用 AppKit，也可以通过 NSHostingView 使用 SwiftUI。</p>\n<h2 id=\"统一设置与控件\">统一设置与控件</h2>\n<p>SDK 2.1 新增声明式设置菜单与统一控件库：<a href=\"#doc-settings\" data-doc-jump=\"settings\">设置菜单与 UI 控件指南</a>。插件通过 <code>settings.json</code> 声明设置项，宿主统一渲染并保存；通过 <code>RemoteFlowSettings.h</code> 接收配置。卡片内可复用 <code>RemoteFlowUI.h</code>（AppKit）或 <code>RemoteFlowUI.swift</code>（SwiftUI）的控件和主题。ABI 1/2 保持兼容。</p>\n<p>SDK 2.2 新增 <a href=\"#sdk-files\"><code>RemoteFlowProgressLayout.h</code></a>：标准进度卡片的固定尺寸约定，所有带播放进度的卡片都应使用。具体数值见文末<a href=\"#标准进度卡片\">标准进度卡片</a>。</p>\n<p>SDK 2.3（宿主 1.5 起）新增签名与信任策略，见<a href=\"#签名与信任\">签名与信任</a>；C ABI 与清单 schema 不变。</p>\n<h2 id=\"编译与安装图片卡片示例\">编译与安装图片卡片示例</h2>\n<div class=\"sdk-code-block\"><div class=\"sdk-code-head\"><span>sh</span><button type=\"button\" class=\"sdk-copy-btn\">复制</button></div><pre><code class=\"lang-sh\">zsh PluginSDK/Examples/RichCards/build.sh /private/tmp/RichCards.bundle</code></pre></div>\n<p>在菜单设置中点“安装插件”，导入输出的 <code>.bundle</code>，然后打开灵动岛：</p>\n<ul><li>音乐卡片：封面 PNG、标题、播放/上一首/下一首按钮、进度条、音量滑块和可展开列表。</li><li>图片卡片：独立图片、标题和说明，由插件自由布局。</li><li>方向键选择卡片，确定进入卡片，方向键在内部控件间移动，确定操作；音量滑块选中时左右键调整数值。</li><li>展开播放列表会在<strong>菜单保持打开时</strong>撑高卡片和容器，再次操作会收起。</li><li>返回退出卡片内部操作，再次返回关闭容器；菜单键或主页键直接关闭容器。</li></ul>\n<p>选择安装项后，其统一设置面板可配置卡片显隐、曲目名称、说明、自定义封面、音量、宽度和显示模式。示例播放操作用于演示 UI 状态，不连接真实媒体播放器。示例包内附带原创 PNG，无需网络。每次打开创建新视图，示例状态在本次展示期间保留。</p>\n<p>旧 ABI 1 示例仍可编译使用：</p>\n<div class=\"sdk-code-block\"><div class=\"sdk-code-head\"><span>sh</span><button type=\"button\" class=\"sdk-copy-btn\">复制</button></div><pre><code class=\"lang-sh\">zsh PluginSDK/Examples/HelloMenu/build.sh /private/tmp/HelloMenu.bundle</code></pre></div>\n<p>它演示简单菜单项和 3 / 24 项数量切换；复杂 UI 请以 RichCards 为起点。</p>\n<h2 id=\"插件包与清单\">插件包与清单</h2>\n<div class=\"sdk-code-block\"><div class=\"sdk-code-head\"><span>text</span><button type=\"button\" class=\"sdk-copy-btn\">复制</button></div><pre><code class=\"lang-text\">RichCards.bundle/\n  Contents/\n    Info.plist                         # CFBundleExecutable 指向 RichCards\n    MacOS/RichCards                     # 与宿主架构兼容的 Mach-O bundle\n    Resources/menu-plugin.json         # 静态安装清单\n    Resources/Artwork.png              # 插件自己的资源\n    Resources/settings.json            # 可选，宿主渲染的统一设置菜单\n    _CodeSignature/                    # codesign 生成</code></pre></div>\n<div class=\"sdk-code-block\"><div class=\"sdk-code-head\"><span>json</span><button type=\"button\" class=\"sdk-copy-btn\">复制</button></div><pre><code class=\"lang-json\">{\n  &quot;schemaVersion&quot;: 1,\n  &quot;identifier&quot;: &quot;com.example.my-cards&quot;,\n  &quot;version&quot;: &quot;2.0.0&quot;,\n  &quot;author&quot;: &quot;Example&quot;,\n  &quot;title&quot;: &quot;我的卡片插件&quot;,\n  &quot;symbolName&quot;: &quot;rectangle.on.rectangle&quot;\n}</code></pre></div>\n<p>清单 schema 保持为 1，C ABI 由二进制入口返回，二者独立。<code>identifier</code> 是更新身份；安装列表用清单标题和图标，实际卡片内容来自插件运行时。</p>\n<p>插件包不支持符号链接，资源和依赖应完整置于包内；动态依赖可使用 <code>@loader_path</code>。创建视图时会传入<strong>安装副本</strong>的 Bundle 路径，应从该路径读取资源，不应依赖源码目录、原始安装来源或当前工作目录。异步加载远程图片及其缓存、失败状态由插件实现。</p>\n<h2 id=\"abi-2-原生卡片\">ABI 2：原生卡片</h2>\n<p>所有入口及尺寸通知均在主线程使用。每个插件一次可提供最多 100 张卡片，描述 JSON 最多 1 MB，卡片 ID 唯一且非空。</p>\n<div class=\"sdk-table-wrap\"><table><thead><tr><th>导出入口</th><th>要求</th></tr></thead><tbody><tr><td><code>remoteflow_menu_abi_version()</code></td><td>返回 <code>REMOTEFLOW_CARD_ABI_VERSION</code>（2）</td></tr><tr><td><code>remoteflow_menu_content()</code></td><td>返回插件拥有的 UTF-8 卡片描述数组；宿主复制后不释放字符串</td></tr><tr><td><code>remoteflow_card_create_view(card_id, bundle_path)</code></td><td>返回一个 <strong>+1 retain</strong> 的 NSView 指针，宿主接管该引用</td></tr><tr><td><code>remoteflow_card_handle_remote(view, event, pressed)</code></td><td>借用 NSView 指针，返回 1 表示已处理，0 表示未处理</td></tr><tr><td><code>remoteflow_card_will_close(view)</code></td><td>可选；在卡片移除前停止计时器、订阅和异步任务；不释放传入指针</td></tr></tbody></table></div>\n<p>卡片描述示例：</p>\n<div class=\"sdk-code-block\"><div class=\"sdk-code-head\"><span>json</span><button type=\"button\" class=\"sdk-copy-btn\">复制</button></div><pre><code class=\"lang-json\">[\n  {&quot;id&quot;:&quot;player&quot;,&quot;title&quot;:&quot;音乐卡片&quot;,&quot;preferredWidth&quot;:520,&quot;preferredHeight&quot;:292},\n  {&quot;id&quot;:&quot;photo&quot;,&quot;title&quot;:&quot;图片卡片&quot;,&quot;preferredWidth&quot;:280,&quot;preferredHeight&quot;:292}\n]</code></pre></div>\n<p><code>preferredWidth</code> / <code>preferredHeight</code> 表示卡片<strong>内部内容</strong>所需的 pt 尺寸，不含宿主外框和标题栏。省略时采用视图 <code>fittingSize</code>，无有效尺寸时回退到 480 × 280。宿主对宽度限制为 160–4096 pt（<code>isCompact: true</code> 时为 96–4096 pt）、高度 80–4096 pt；卡片之间可使用不同尺寸，按可用宽度换行排列。</p>\n<p>创建 AppKit 视图：</p>\n<div class=\"sdk-code-block\"><div class=\"sdk-code-head\"><span>objc</span><button type=\"button\" class=\"sdk-copy-btn\">复制</button></div><pre><code class=\"lang-objc\">void *remoteflow_card_create_view(const char *card_id, const char *bundle_path) {\n    NSView *view = /* 插件自己的完整 UI */;\n    return (__bridge_retained void *)view;\n}</code></pre></div>\n<p>创建 SwiftUI 视图的桥接形式：</p>\n<div class=\"sdk-code-block\"><div class=\"sdk-code-head\"><span>swift</span><button type=\"button\" class=\"sdk-copy-btn\">复制</button></div><pre><code class=\"lang-swift\">@_cdecl(&quot;remoteflow_card_create_view&quot;)\nfunc createCard(_ cardID: UnsafePointer&lt;CChar&gt;,\n                _ bundlePath: UnsafePointer&lt;CChar&gt;) -&gt; UnsafeMutableRawPointer? {\n    MainActor.assumeIsolated {\n        let view = NSHostingView(rootView: MyCardView())\n        return Unmanaged.passRetained(view).toOpaque()\n    }\n}</code></pre></div>\n<p>插件还需导出表中的 ABI、内容及遥控入口。宿主不接收 SwiftUI 泛型值。每次创建返回独立 NSView；不要把同一个视图同时交给多个卡片。传入的 C 字符串只在调用期间有效，需要长期使用时应复制。</p>\n<h2 id=\"卡片内遥控与鼠标\">卡片内遥控与鼠标</h2>\n<div class=\"sdk-table-wrap\"><table><thead><tr><th>状态</th><th>行为</th></tr></thead><tbody><tr><td>选择卡片</td><td>容器按卡片几何位置处理方向键，确定进入卡片</td></tr><tr><td>进入卡片</td><td>插件收到 <code>enter</code>，<code>pressed=1</code>；可选中第一个内部控件</td></tr><tr><td>内部操作</td><td>插件收到 <code>up/down/left/right/ok</code> 的按下（1）和抬起（0）</td></tr><tr><td>退出内部操作</td><td>容器先释放仍按住的键，再发送 <code>leave</code>，<code>pressed=1</code></td></tr><tr><td>返回键</td><td>内部操作时退出到卡片选择；卡片选择时关闭容器</td></tr><tr><td>菜单 / 主页键</td><td>直接关闭容器；始终由宿主保留</td></tr></tbody></table></div>\n<p>卡片可用可选字段 <code>handlesVolumeKeys: true</code> 声明使用音量键。卡片内部操作时，或直接选中小卡片（<code>isCompact: true</code>）时，宿主发送 <code>wantsVolumeKeys</code>（<code>pressed=1</code>）询问当前焦点是否接收音量键。查询应只读取状态。返回 1 时，宿主转发 <code>volumeUp</code> / <code>volumeDown</code> 的按下和抬起，并沿用宿主的原生按键拦截机制。返回 0 时音量键走原有路径。旧版宿主会忽略该字段。</p>\n<p>卡片可在描述中提供 <code>remoteHint</code>，由宿主显示在底部按键说明栏。<code>activeRemoteHint</code> 可在卡片内部操作期间替换底栏的方向键提示。同一插件中连续声明 <code>layoutRow</code> 的卡片会组成一块区域，相同字符串标识区域内的同一行。这块区域和其他卡片横向并排。超出视窗的内容以卡片或整块区域为单位吸附切换。区域内可交互的卡片可声明 <code>replacesGroupOnEnter: true</code>，在操作期间占用整块区域，退出后恢复原布局。小卡片仍可使用 <code>showsHeader: false</code> 隐藏标题栏，并用 <code>handlesActivation: true</code> 直接处理选中时的 OK。可交互或处理直接激活的小卡片在未进入内部操作时，也可以点击整张卡片来触发同一操作。</p>\n<p>进入卡片的那次确定键仅触发 <code>enter</code>，不会立即触发内部按钮。卡片内返回 0 的事件也由容器消费，避免误操作其他绑定。插件负责内部控件焦点、焦点高亮、按钮动作、滑块调整等；宿主不知道插件内部控件结构。</p>\n<p>鼠标可直接操作插件原生控件；卡片头部也有“进入卡片”按钮。边框用于区分卡片焦点和内部操作状态。文字输入等 AppKit 控件可按需让浮动面板成为 key window；容器不抢占主应用的 main window。</p>\n<h2 id=\"打开期间实时撑开\">打开期间实时撑开</h2>\n<p>内容变化时，插件应更新自己的 UI，并请求新尺寸：</p>\n<div class=\"sdk-code-block\"><div class=\"sdk-code-head\"><span>objc</span><button type=\"button\" class=\"sdk-copy-btn\">复制</button></div><pre><code class=\"lang-objc\">RFCardRequestSize(view, 520, 472);</code></pre></div>\n<p>Swift 等实现可发送相同通知：</p>\n<div class=\"sdk-code-block\"><div class=\"sdk-code-head\"><span>swift</span><button type=\"button\" class=\"sdk-copy-btn\">复制</button></div><pre><code class=\"lang-swift\">NotificationCenter.default.post(\n    name: Notification.Name(&quot;RemoteFlowPluginCardSizeDidChange&quot;),\n    object: hostingView,\n    userInfo: [&quot;width&quot;: 520.0, &quot;height&quot;: 472.0]\n)</code></pre></div>\n<p><code>object</code> 必须是创建入口交给宿主的根 NSView，通知必须在主线程发送，尺寸为有限正数。宿主会保留本次卡片对象及交互状态，重新排列并调整灵动岛尺寸；不需要关闭重开。无效尺寸会回退或限幅，卡片关闭后的通知被忽略。</p>\n<p>容器保持屏幕顶部居中并保留刘海空间，在屏幕边界内先展开、再纵向滚动。单张卡片超出屏幕宽度时保留内容宽度并提供内部横向滚动；插件仍应尽量使用自适应布局，遥控聚焦控件时可调用 <code>scrollRectToVisible</code> 使其可见。卡片描述列表每次打开刷新；实时通知调整现有卡片尺寸，不增删本次展示中的卡片。</p>\n<h2 id=\"生命周期-签名与兼容\">生命周期、签名与兼容</h2>\n<ul><li>安装只复制并验证元数据、可执行文件及签名，不加载插件代码。打开菜单时加载代码并创建视图，关闭动画结束后调用 <code>will_close</code> 并释放宿主持有的视图。</li><li>所有入口应快速返回。耗时工作自行异步处理，更新 UI 与发送尺寸通知时回到主线程；在 <code>will_close</code> 里取消任务，避免已关闭 UI 继续产生副作用。</li><li>安装到 Application Support/RemoteFlow/MenuPlugins 的独立 UUID 路径。同 identifier 更新保留安装位置和启用状态，不覆盖正在加载的 Mach-O；原生卡片区域先于旧版快捷项区域展示。</li><li>已加载代码不做 <code>dlclose</code>，旧包在下一次启动清理。更新包含同名 Objective-C 类的插件后应重启应用；原生类名使用插件专属前缀。</li><li>卸载移除菜单入口。当前展示的卡片在本次容器关闭时清理，后台任务需由插件的生命周期入口停止。</li><li>导出复制完整签名包；安装列表的本地名称、图标修改不写回签名包。</li><li>原生代码在宿主进程执行并共享权限、阻塞与崩溃风险。签名完整性校验不等于信任发布者，分发前仍需在实际签名、公证和隔离属性环境验证。</li></ul>\n<h2 id=\"签名与信任\">签名与信任</h2>\n<p>宿主对原生插件<strong>默认拒绝</strong>，安装前必须通过信任策略：</p>\n<ul><li><strong>临时（ad-hoc）签名</strong>：仅当用户在插件管理&quot;安全&quot;设置中开启&quot;开发者模式&quot;后允许安装。适合本地开发与自用，不适合对外分发。</li><li><strong>团队签名</strong>（Developer ID 等携带 Team ID 的证书）：用户需先在&quot;安全&quot;设置中信任该 Team ID，之后该团队的插件可安装。</li><li><strong>其他签名</strong>（自签名等）一律拒绝。</li></ul>\n<p>安装时宿主记录插件包的签名指纹（cdhash），之后每次加载都会比对：安装后直接替换或篡改已装 bundle（即使重新有效签名）会被拒绝加载。<strong>发布更新请通过宿主&quot;安装插件&quot;按相同 identifier 覆盖安装</strong>，不要在磁盘上替换已装 bundle。</p>\n<p>升级到宿主 1.5 之前已安装的插件会自动继承一次：宿主记录其指纹并继续可用，无需用户操作；继承插件同样受指纹比对保护。</p>\n<p>正式分发建议使用 Developer ID 签名（构建脚本通过 <code>CODE_SIGN_IDENTITY</code> 指定证书），并在发布说明中告知用户提前信任你的 Team ID。示例构建脚本默认使用 ad-hoc 签名，供开发调试。正式 Hardened Runtime 仍保留 Library Validation，通常要求插件与宿主同 Team ID 签名。</p>\n<p>SDK 2.1 保留 <a href=\"#sdk-files\"><code>RemoteFlowMenuPlugin.h</code></a> 中 ABI 1 的菜单接口，旧二进制插件继续使用。ABI 2 插件需要新版宿主，旧宿主会报告不支持的 ABI；原生卡片插件不需要导出 <code>remoteflow_menu_execute</code>。</p>\n<h2 id=\"标准进度卡片\">标准进度卡片</h2>\n<p>使用 <a href=\"#sdk-files\"><code>RemoteFlowProgressLayout.h</code></a> 的固定尺寸。采用标准进度布局的卡片内容高度为 180 pt，宽度由插件决定。只读进度条高 3 pt，距卡片底边 18 pt，左右各缩进 22 pt。时间放在进度条上方，间距 7 pt，左对齐，使用 11 pt 等宽数字，格式为「已播放 / 总时长」。使用 <code>showsHeader: false</code> 让内容高度与卡片高度一致。</p>"
    },
    {
      "id": "settings",
      "title": "统一设置与 UI 控件",
      "source": "PluginSDK/SettingsAndControls.md",
      "headings": [
        {
          "id": "统一设置菜单",
          "title": "统一设置菜单"
        },
        {
          "id": "卡片内的-appkit-控件",
          "title": "卡片内的 AppKit 控件"
        },
        {
          "id": "卡片内的-swiftui-控件",
          "title": "卡片内的 SwiftUI 控件"
        }
      ],
      "html": "<p>插件设置和卡片 UI 共享 RemoteFlow 的字体、蓝色强调色、深色背景、间距和焦点样式。</p>\n<h2 id=\"统一设置菜单\">统一设置菜单</h2>\n<p>在插件包中放置 <code>Contents/Resources/settings.json</code>。宿主负责渲染分组、控件、说明、错误提示和“恢复默认 / 还原更改 / 应用设置”，插件不需要创建自己的设置窗口。</p>\n<div class=\"sdk-code-block\"><div class=\"sdk-code-head\"><span>json</span><button type=\"button\" class=\"sdk-copy-btn\">复制</button></div><pre><code class=\"lang-json\">{\n  &quot;schemaVersion&quot;: 1,\n  &quot;title&quot;: &quot;插件设置&quot;,\n  &quot;description&quot;: &quot;按需配置卡片&quot;,\n  &quot;sections&quot;: [{\n    &quot;id&quot;: &quot;general&quot;,\n    &quot;title&quot;: &quot;通用&quot;,\n    &quot;fields&quot;: [\n      {&quot;key&quot;:&quot;showImage&quot;,&quot;type&quot;:&quot;toggle&quot;,&quot;title&quot;:&quot;显示图片&quot;,&quot;defaultValue&quot;:true},\n      {&quot;key&quot;:&quot;caption&quot;,&quot;type&quot;:&quot;text&quot;,&quot;title&quot;:&quot;标题&quot;,&quot;defaultValue&quot;:&quot;My card&quot;,&quot;maxLength&quot;:80},\n      {&quot;key&quot;:&quot;volume&quot;,&quot;type&quot;:&quot;slider&quot;,&quot;title&quot;:&quot;音量&quot;,&quot;defaultValue&quot;:65,&quot;minimum&quot;:0,&quot;maximum&quot;:100,&quot;step&quot;:1},\n      {&quot;key&quot;:&quot;mode&quot;,&quot;type&quot;:&quot;select&quot;,&quot;title&quot;:&quot;布局&quot;,&quot;defaultValue&quot;:&quot;compact&quot;,&quot;options&quot;:[\n        {&quot;value&quot;:&quot;compact&quot;,&quot;title&quot;:&quot;紧凑&quot;}, {&quot;value&quot;:&quot;relaxed&quot;,&quot;title&quot;:&quot;宽松&quot;}\n      ]}\n    ]\n  }]\n}</code></pre></div>\n<div class=\"sdk-table-wrap\"><table><thead><tr><th><code>type</code></th><th>标准控件</th><th>值类型 / 可选参数</th></tr></thead><tbody><tr><td><code>toggle</code></td><td>开关</td><td>Boolean</td></tr><tr><td><code>text</code></td><td>单行输入框</td><td>String，<code>maxLength</code></td></tr><tr><td><code>multiline</code></td><td>多行文本编辑器</td><td>String，<code>maxLength</code></td></tr><tr><td><code>slider</code></td><td>带数值显示的滑块</td><td>Number，<code>minimum</code>、<code>maximum</code>、<code>step</code></td></tr><tr><td><code>number</code></td><td>数字输入与步进按钮</td><td>Number，<code>minimum</code>、<code>maximum</code>、<code>step</code></td></tr><tr><td><code>select</code></td><td>下拉选择</td><td>String，<code>options: [{value,title}]</code></td></tr><tr><td><code>file</code></td><td>路径输入与文件选择器</td><td>String，<code>allowedExtensions</code>，例如 <code>[&quot;png&quot;,&quot;jpg&quot;]</code></td></tr></tbody></table></div>\n<p>每个字段需要 <code>key/type/title/defaultValue</code>，可添加 <code>description</code>；分组需要 <code>id/title/fields</code>，也支持说明。<code>key</code> 在整个插件内唯一。最多 20 个分组、100 个字段、1 MB 声明文件；选择项最多 100 个且值唯一。未知控件类型、重复字段、不匹配的默认值会使安装失败。</p>\n<p>数值必须有限且在范围内；滑块默认范围 0–100，数字默认范围 -1000000–1000000，步长默认 1。<code>step</code> 是 UI 增量，数字输入允许范围内任意有限值。文本默认最多 4096 字符，<code>maxLength</code> 最大 65536。<code>file</code> 可留空或输入路径，扩展名过滤作用于选择器，插件应在应用时验证实际文件和格式。</p>\n<h3 id=\"接收并应用配置\">接收并应用配置</h3>\n<p>包含 <a href=\"#sdk-files\"><code>RemoteFlowSettings.h</code></a>，导出可选入口：</p>\n<div class=\"sdk-code-block\"><div class=\"sdk-code-head\"><span>objc</span><button type=\"button\" class=\"sdk-copy-btn\">复制</button></div><pre><code class=\"lang-objc\">const char *remoteflow_plugin_apply_settings(const char *json) {\n    // json 是完整的平面配置，例如 {&quot;showImage&quot;:true,&quot;caption&quot;:&quot;My card&quot;,&quot;volume&quot;:65,&quot;mode&quot;:&quot;compact&quot;}。\n    // 先解析并验证业务约束，失败返回插件拥有的 UTF-8 错误字符串。\n    // 验证成功后更新插件状态，必要时更新已打开的视图并请求新尺寸。\n    return NULL;\n}</code></pre></div>\n<p>有 <code>settings.json</code> 的插件必须提供该入口。它在主线程调用：每次打开容器时先于内容查询和视图创建执行，用户点击“应用设置”时也会执行。打开设置面板只读取声明和当前值，不加载插件二进制；应用设置可能首次加载原生代码。配置字符串仅在本次调用期间有效。</p>\n<p>不要在读取或解析配置时产生不可逆副作用。先验证再更新状态；拒绝配置时保留原状态。宿主只在接受并成功写盘后更新已保存值，写盘失败会尝试再次应用旧配置，因此入口应支持重复应用同一配置。</p>\n<p>UI 编辑使用草稿，只有“应用设置”才提交；“恢复默认”仅修改草稿，仍需应用。宿主按稳定插件 identifier 保留配置，重启和更新包后仍在；卸载后配置随安装项移除。配置是本地普通 JSON，不提供密码或密钥存储。</p>\n<p>声明新增字段使用默认值，旧字段的无效类型或越界值回退到新默认值。已移除字段仍保留在本地存储以便升级恢复，但不会传给插件。修改卡片数量在下次打开时生效；标题、音量、布局等能否实时更新由插件实现，示例会更新已打开的视图。</p>\n<h2 id=\"卡片内的-appkit-控件\">卡片内的 AppKit 控件</h2>\n<p>包含 <a href=\"#sdk-files\"><code>RemoteFlowUI.h</code></a>，这是 header-only 控件库，无需链接宿主 Swift 模块或额外 framework：</p>\n<div class=\"sdk-table-wrap\"><table><thead><tr><th>API</th><th>用途</th></tr></thead><tbody><tr><td><code>RFUILabel(text, size, weight, color)</code></td><td>标签和标题</td></tr><tr><td><code>RFUIStack(views, orientation, spacing)</code></td><td>标准横向或纵向布局</td></tr><tr><td><code>RFUIImage(image, size)</code></td><td>等比显示的圆角图片</td></tr><tr><td><code>RFUIButton(title, primary, target, action)</code></td><td>主按钮 / 次按钮</td></tr><tr><td><code>RFUISymbolButton(symbol, label, target, action)</code></td><td>SF Symbol 图标按钮</td></tr><tr><td><code>RFUITextField(value, placeholder, target, action)</code></td><td>文本输入</td></tr><tr><td><code>RFUIToggle(value, target, action)</code></td><td>开关</td></tr><tr><td><code>RFUISlider(value, minimum, maximum, target, action)</code></td><td>滑块</td></tr><tr><td><code>RFUISelect(titles, selectedIndex, target, action)</code></td><td>下拉选择</td></tr><tr><td><code>RFUIProgress(fraction)</code></td><td>0–1 进度条</td></tr><tr><td><code>RFUISetFocused(view, focused)</code></td><td>标准蓝色遥控焦点框及滚动到可见区域</td></tr></tbody></table></div>\n<p>控件仍是普通 AppKit 对象，可继续设置约束、辅助功能标签和业务回调。SDK 提供强调色、主次文字色和 8/12/20 pt 间距常量，支持自由组合；宿主已经提供卡片外框，插件不必重复绘制。</p>\n<h2 id=\"卡片内的-swiftui-控件\">卡片内的 SwiftUI 控件</h2>\n<p>将 <a href=\"#sdk-files\"><code>RemoteFlowUI.swift</code></a> 加入插件 target，复用 <code>RFUITheme</code>、<code>RFUISection</code>、<code>RFUIButton</code> 和 <code>.rfRemoteFocused(...)</code>，其余开关、滑块、输入框使用原生 SwiftUI 控件：</p>\n<div class=\"sdk-code-block\"><div class=\"sdk-code-head\"><span>swift</span><button type=\"button\" class=\"sdk-copy-btn\">复制</button></div><pre><code class=\"lang-swift\">RFUISection(&quot;播放&quot;) {\n    Toggle(&quot;显示图片&quot;, isOn: $showImage)\n    Slider(value: $volume, in: 0...100)\n    RFUIButton(&quot;播放&quot;) { play() }\n        .rfRemoteFocused(focusedControl == .play)\n}</code></pre></div>\n<p>SwiftUI UI 通过 NSHostingView 交给宿主。插件负责把遥控事件映射到自己的状态和操作；复用 UI 控件不会自动推断复杂界面的遥控焦点顺序。控件库随源码编译，更新样式后需重编译插件；统一设置菜单由宿主渲染，可随宿主升级更新样式。</p>\n<p>完整的声明、回调和控件使用示例见 <code>Examples/RichCards</code>。SDK 2.1 不改变 ABI 1/2，未声明设置的旧插件继续工作。</p>"
    }
  ]
}
;
