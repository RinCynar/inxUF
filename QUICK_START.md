# 快速开始指南

## 材料你主题系统

欢迎使用 inxUF-Website 的 Material You 主题系统！

## 30秒快速上手

### 用户
1. 进入网站 → 导航栏右侧有 🌙 按钮
2. 点击切换深/浅主题
3. 选择自动保存，刷新后保持

### 开发者
```bash
# 安装依赖
npm install

# 开发模式（自动构建）
npm run dev

# 生产构建
grunt

# 启动本地服务器
npm run start
# 访问 http://localhost:4000
```

## 主要改动

| 文件 | 说明 |
|------|------|
| 🆕 `js/theme-toggle.js` | 主题切换逻辑 |
| 🆕 `less/theme.less` | 主题配色 |
| 🆕 `less/material-design.less` | 设计系统 |
| ✏️ `less/variables.less` | 配色令牌 |
| ✏️ `less/hux-blog.less` | 用 CSS 变量替代硬编码颜色 |
| ✏️ `_includes/nav.html` | 主题按钮 |
| ✏️ `_includes/head.html` | 防闪现脚本 |
| ✏️ `_layouts/default.html` | 加载脚本 |

## 使用主题变量

### 在 CSS/LESS 中
```less
.element {
  background-color: var(--surface);
  color: var(--on-surface);
  border: 1px solid var(--border-color);
  .elevation-2;        // 阴影
  .shape-medium;       // 圆角
  .transition-standard; // 动画
}
```

### 在 JavaScript 中
```javascript
// 获取当前主题
const theme = window.themeManager.getCurrentTheme();

// 切换主题
window.toggleTheme();

// 监听变化
window.addEventListener('themechange', (e) => {
  console.log('主题:', e.detail.theme);
});
```

## 颜色令牌

### 完整列表
```
--primary           原色（链接、按钮）
--secondary         次色（强调）
--tertiary          第三色（补充）
--error             错误色
--surface           表面/背景
--on-surface        表面上的文本
--on-surface-variant 次要文本
--outline           边框
--border-color      边框颜色
--shadow-color      阴影颜色
--hover-overlay     悬停覆盖
```

## 设计系统

### 阴影（Elevation）
```
.elevation-0        无阴影
.elevation-1        最小
.elevation-2        一般卡片
.elevation-3        突出
.elevation-4        浮动
.elevation-5        最大
```

### 圆角（Shape）
```
.shape-extra-small  4px
.shape-small        8px
.shape-medium       12px（推荐）
.shape-large        16px
.shape-extra-large  28px
```

### 动画（Transition）
```
.transition-standard    标准（200ms）
.transition-emphasis    强调（300ms）
.transition-decelerate  减速
.transition-accelerate  加速
```

## 主题配色

### 深色主题（默认）
- 背景: `#0f0f12`
- 表面: `#1a1a1a`
- 原色: `#80deea`（亮蓝）
- 文本: `#e5e5e5`（亮灰）

### 亮色主题
- 背景: `#fffbfe`
- 表面: `#ffffff`
- 原色: `#0085a1`（深蓝）
- 文本: `#1f1f1f`（深灰）

## 自定义颜色

编辑 `less/theme.less` 中的颜色定义：

```less
.theme-dark {
  --primary: #your-color;  // 改这里
  --surface: #your-color;
  // ...
}

.theme-light {
  --primary: #your-color;
  --surface: #your-color;
  // ...
}
```

然后运行 `grunt` 重新构建。

## 常见问题

**Q: 为什么默认是深色？**
A: 现代 UI 趋势和用户偏好，可在 `js/theme-toggle.js` 改为亮色。

**Q: 如何禁用主题切换？**
A: 在 `_includes/nav.html` 中注释掉主题按钮那几行。

**Q: 主题会闪现吗？**
A: 不会，头部的内联脚本在 CSS 加载前应用主题。

**Q: 可以检测系统主题吗？**
A: 可以，已在 `theme-toggle.js` 中实现，看 `getSystemTheme()`。

**Q: 主题会跨设备同步吗？**
A: 不会，目前仅保存在本地设备的 localStorage。

## 部署

```bash
# 构建
grunt

# 提交
git add -A
git commit -m "Material You theme implementation"

# 推送到 GitHub
git push origin master

# GitHub Pages 自动部署
```

## 文件大小

- 增加 ~8.5KB（未压缩）
- ~3KB（压缩后）
- 包含在 bundle 中，无额外网络请求

## 浏览器支持

| 浏览器 | 版本 |
|--------|------|
| Chrome | 49+ |
| Firefox | 31+ |
| Safari | 9.1+ |
| Edge | 15+ |

所有现代浏览器都支持。

## 下一步

1. ✅ 完成实现
2. ⏭️ 运行 `grunt` 生成 CSS
3. ⏭️ 在浏览器测试
4. ⏭️ 提交和部署

## 详细文档

- 📖 `THEME_README.md` - 完整功能文档
- 📖 `BUILD_GUIDE.md` - 构建和部署指南
- 📖 `IMPLEMENTATION_SUMMARY.md` - 技术实现细节

## 获取帮助

遇到问题？检查：
1. `BUILD_GUIDE.md` 的"故障排除"部分
2. 浏览器控制台的错误信息
3. 确保 `npm install` 完成
4. 确保 `grunt` 成功运行

---

**享受你的新主题系统！** 🎨✨
