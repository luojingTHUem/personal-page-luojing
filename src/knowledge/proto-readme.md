# Prototype to Demo

> CodeFuse Skill: 把产品原型图快速生产为可交互、可分享的单文件 HTML Demo

## 简介

`prototype-to-demo` 是一个 [CodeFuse](https://code.alipay.com/codefuse_release) Skill，用于将产品原型图（Figma / Axure / 手绘稿 / UI 截图 / 现有 HTML）快速还原为**可交互、可分享的单文件 HTML Demo**。

核心思路是**Agent 工具调用循环**——参考 [screenshot-to-code](https://github.com/abi/screenshot-to-code) 的工作流，让模型自主决定每一步操作：create_file → edit_file → screenshot_preview → extract_assets，形成闭环迭代。

**一句话定位**：把一张静态原型图，变成能点、能改、能换数据、能验收、能交付代码的可交互 Demo。

## 解决的痛点

| 痛点 | 以前怎么做 | 现在怎么做 |
|------|-----------|-----------|
| 原型评审只能看不能点 | 截图发群里，开发靠想象 | 上传图直接生成可点击 Demo |
| 改动一个字要重出图 | 回 Figma/Axure 改完再截图 | 直接说"标题改成 XX" |
| 数据是假的看不出效果 | 用占位符评审 | 灌真实数据看真实效果 |
| 多状态靠脑补 | 只画默认态 | 一键生成空态、错误态、加载态 |
| 多端适配要重画 | 桌面画完再画手机版 | 一份原型出多端 |
| 设计和开发交接慢 | 设计稿 + 口头说明 | 直接给可运行代码 |
| AI 画的图和原图对不上 | 反复人工对照截图 | 系统自动视觉校验 + 自动循环修正 |

## 任务模式

共 8 种：

1. **reconstruct** — 首次生成：图 → Demo
2. **revise** — 局部修改：改文字、改颜色、改位置
3. **variant** — 换数据：把原型里的假数据换成真实数据
4. **validate** — 验收检查：对比原图，标出不一致
5. **state** — 多状态：默认态、空态、错误态、加载态
6. **flow** — 多页面流程：把多个页面串成可点击流程
7. **responsive** — 多端适配：desktop / tablet / mobile
8. **export** — 导出代码：生成 Vue / React / 小程序源码

## 两大核心技术能力

### 1. 视觉识别 + 循环自动修正

AI 生成 HTML 后不是一锤子买卖，而是一个自动循环：

```
生成 HTML
   ↓
浏览器截图
   ↓
和原图做像素级对比
   ↓
把"差异区域"精确描述给 AI（哪个坐标、哪块区域、差多少）
   ↓
AI 针对性修改那一块，而不是全量重做
   ↓
重新截图、重新对比
   ↓
直到差异收敛到阈值以下
```

核心差异：**不是"生成完就结束"，而是"生成 + 验证 + 修正"闭环**，自动把 AI 的偏差迭代到可接受范围。

### 2. 多模态 fallback：实在难还原的组件，让 AI 直接画图

不是所有东西都适合用 HTML 重画。遇到**图表、插画、异形按钮、复杂阴影、不规则视觉元素**这种 HTML 复现费劲甚至复现不了的组件：

```
识别到"难还原组件"
    ↓
调用多模态模型直接生成这张图（图库 / 插画 / 图标）
    ↓
以图片形式嵌入 HTML，其余部分仍用 HTML 重建
    ↓
视觉上统一，结构上可交互
```

**HTML 重建 + AI 生图 混排**，而不是一刀切。能画的用 HTML 保证可编辑性，画不了的用 AI 生图保证视觉还原。

## 两种实现方案与自动选型

### 方案 1：HTML 重建
把原型元素用 HTML/CSS 重画，再铺交互。适合：后台系统、数据看板、表单流程、需要状态/流程/导出代码的场景。

### 方案 2：底图 + 热区（参考青未）
直接贴原图当背景，上面铺透明热区做点击、跳转、弹窗。适合：营销页、H5、移动端、强视觉稿、像素级还原。

### 自动选型逻辑（Skill 会主动询问用户）

```
上传原型图
    ↓
自动判断形态 + 主动询问用户
    ├─ 这是给谁看的？（开发交付 / 评审 / 演示）
    ├─ 后续要不要改？（会改 / 不改）
    ├─ 要不要真数据交互？（要 / 不要）
    ├─ 目标设备？（桌面 / 移动 / 小程序）
    └─ 要几个状态？
    ↓
决策
    ├─ reconstruct / revise / variant / validate → 可用方案 2
    └─ state / flow / responsive / export → 强制方案 1
    ↓
给推荐 + 让用户最终确认
```

Skill 不是"选一个方案硬干"，而是**理解需求 → 给推荐 → 用户确认**，把选型交给用户而不是写死。

## 其他关键设计

| 能力 | 说明 |
|------|------|
| 数据与渲染分离 | variant 换数据时只换 JSON，布局自动重排，不崩 |
| 单文件交付 | 所有资源 base64 内联，一个 HTML 到处能打开、能分享 |
| 零外部依赖 | 不依赖网络，离线可用 |
| 纯 prompt 也能做 | 简化模式不需要写代码，靠提示词完成 |

## 与 screenshot-to-code 的关系

## 与 screenshot-to-code 的关系

[screenshot-to-code](https://github.com/abi/screenshot-to-code)（7.3k+ Star）解决的是"截图 → 静态 HTML"的问题，而 prototype-to-demo 在它的 Agent 循环基础上增加了两个关键维度：

| 维度 | screenshot-to-code | prototype-to-demo |
|------|-------------------|-------------------|
| 输出 | 静态 HTML 复刻 | 可交互 HTML Demo + 交互逻辑 |
| Agent 循环 | create_file → edit_file → screenshot_preview → extract_assets | create_file → edit_file → screenshot_preview → extract_assets |
| 交互支持 | 无（纯视觉复刻） | 消息累积、切换、展开、分支回复 |
| 画布适配 | 无（固定 1280×832） | 参考画布 + 展示视口 + 移动端适配 |
| 多候选 | 3-4 个并行候选 | 可选 2-3 个候选 |

prototype-to-demo 的目标是从"截图复刻"升级到"交互原型"，同时保留 screenshot-to-code 经过验证的 Agent 工具调用循环。

## Agent 工具调用循环

```
1. 读原型图 → 产出动线图 + 页面地图
2. create_file → 生成首版 HTML
3. screenshot_preview → 模型"看到"渲染效果（desktop + mobile 双视口）
4. 发现差异 → edit_file → 回到步骤 3
   （最多 5 轮修正，或直到满意）
5. extract_assets → 从输入图提取 logo、插图等
6. 打包交付
```

**关键原则**：
- 截图验证是循环的一部分，不是最后一步。模型每次 edit 后都要截图验证
- edit_file 优于 create_file：只改差异部分，不破坏已正确的部分
- 多候选并行：如果时间允许，生成 2-3 个版本选一，减少"押注一个方向"的风险

## 六步工作流

| 步骤 | 名称 | 核心产出 |
|------|------|---------|
| Step 1 | 读原型与拆解动线 | 页面地图、动线图、数据驱动点清单 |
| Step 2 | 多候选生成（可选） | 2-3 个候选版本，选一版进入修正 |
| Step 3 | 资产分离与画布适配 | 代码渲染 UI vs 图片资产分类、画布缩放策略 |
| Step 4 | create_file → 首版 HTML | 完整单文件 HTML，含组件化结构 |
| Step 5 | 截图验证与修正循环 | edit_file → screenshot_preview → edit_file ... |
| Step 6 | 资产提取 + 打包验收 | extract_assets + 资源内嵌 + 零外部依赖 |

## 文件结构

```
.
├── SKILL.md                          # Skill 主文件（工作规范 + 触发规则）
├── references/
│   ├── interaction-patterns.md       # 交互模式参考（消息累积、切换、展开等）+ edit_file 使用规范
│   ├── canvas-fit-patterns.md        # 画布适配方案（固定舞台、三层缩放、移动端、双视口）
│   ├── visual-error-taxonomy.md      # 视觉误差分类与修正指南 + edit_file vs create_file 策略
│   └── asset-handling.md             # 资产处理策略（extract_assets → generate_images → 占位符）
└── scripts/
    └── screenshot_page.py            # 浏览器截图脚本（Python Playwright，支持双视口）
```

## 核心设计理念

### 1. Agent 工具调用循环
不是一次性生成代码，而是让模型自主决定每一步：create_file 创建 → edit_file 修正 → screenshot_preview 验证 → extract_assets 提取。形成闭环迭代。

### 2. edit_file 优先
修改时优先使用精确字符串替换（edit_file），而不是重新生成整个文件（create_file）。只改差异部分，不破坏已正确的部分。

### 3. 截图验证内嵌为 tool
screenshot_preview 是工具调用的一部分，模型在 create_file 或 edit_file 之后**自动调用**截图验证，截图以 multimodal part 形式返回，模型"看到"渲染效果后决定是否需要继续 edit。

### 4. 资产处理闭环
extract_assets → generate_images → remove_backgrounds → edit_images 完整链路，从输入截图提取资产，AI 生成兜底。

### 5. 画布适配优先
区分参考画布和展示视口，提供固定宽高比舞台、三层缩放包装、移动端适配等方案。

## 使用方式

### 在 CodeFuse 中使用

该 Skill 已注册为 CodeFuse Skill，当用户说以下内容时自动触发：

- "把原型做成 Demo"
- "生成交互原型 HTML"
- "原型图转可交互 Demo"
- "还原这个设计稿"
- "把这张截图变成网页"

### 手动使用

1. 将 `SKILL.md` 和 `references/` 目录放入你的 CodeFuse skills 目录
2. 提供原型截图或 Figma 链接
3. 描述需要实现的交互动线
4.（可选）提供个性化数据（UID、JSON/CSV 数据等）

## 截图验证工具

```bash
# 单视口截图
python scripts/screenshot_page.py demo.html screenshot.png --width 1440 --height 816

# 双视口截图（desktop + mobile）
python scripts/screenshot_page.py demo.html ./shots --dual

# 移动端截图
python scripts/screenshot_page.py demo.html mobile.png --width 375 --height 812
```

需要 Python Playwright：`pip install playwright && playwright install chromium`

## 技术栈

- HTML5 + CSS3 + Vanilla JavaScript（零框架依赖）
- Agent 工具调用循环（create_file / edit_file / screenshot_preview / extract_assets）
- Playwright（双视口截图验证：1280×832 desktop + 375×812 mobile）
- Canvas API（像素级对比、图像裁切）
- Base64 Data URL（资源内嵌）

## 交付物规范

- 单个 `.html` 文件，所有资源内嵌
- 零外部依赖（不依赖 file://、localhost 或网络资源）
- 文件拷贝到任何地方可直接打开
- 命名规范：`{功能名}_交互原型.html`

## License

Internal use only.
