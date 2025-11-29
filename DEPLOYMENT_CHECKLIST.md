# 部署前检查清单

## 🚀 部署 Material You 主题系统

使用此清单确保主题系统正确部署到 GitHub Pages。

---

## ✅ 前置准备

### 开发环境
- [ ] Node.js 已安装 (`node -v`)
- [ ] npm 已安装 (`npm -v`)
- [ ] Ruby 已安装（Jekyll 需要）
- [ ] Bundler 已安装 (`gem install bundler`)

### 依赖安装
- [ ] 运行 `npm install`
- [ ] 运行 `bundle install`
- [ ] 没有依赖错误

---

## 📝 代码审查

### 文件变更
- [ ] `js/theme-toggle.js` 已创建（150行，正确的 IIFE）
- [ ] `less/theme.less` 已创建（40+ CSS 变量）
- [ ] `less/material-design.less` 已创建（设计令牌）
- [ ] `less/variables.less` 已更新（Material 配色）
- [ ] `less/hux-blog.less` 已更新（使用 CSS 变量）
- [ ] `_includes/head.html` 已更新（防闪现脚本）
- [ ] `_includes/nav.html` 已更新（主题按钮）
- [ ] `_layouts/default.html` 已更新（脚本加载）

### 代码质量
- [ ] 没有 JavaScript 语法错误
- [ ] 没有 LESS 语法错误
- [ ] 所有 CSS 变量引用正确
- [ ] 没有遗留的硬编码颜色
- [ ] 变量命名一致（kebab-case）

---

## 🏗️ 构建验证

### 编译
- [ ] 运行 `grunt` 成功（无错误）
- [ ] `css/hux-blog.css` 已生成
- [ ] `css/hux-blog.min.css` 已生成
- [ ] `js/hux-blog.min.js` 已生成
- [ ] CSS 文件大小合理（< 50KB）

### 构建产物
- [ ] CSS 包含 theme 和 material-design 导入
- [ ] 所有 CSS 变量定义包含
- [ ] `theme-toggle.js` 已压缩
- [ ] 没有 source map 警告

---

## 🧪 本地测试

### 启动服务器
- [ ] 运行 `npm run start` 或 `bundle exec jekyll serve`
- [ ] 服务器在 `http://localhost:4000` 启动
- [ ] 没有 Jekyll 构建错误
- [ ] 没有 404 资源加载失败

### 页面加载
- [ ] 首页正确加载
- [ ] CSS 正确应用（没有样式错误）
- [ ] JavaScript 没有控制台错误
- [ ] 页面响应式（手机/平板/桌面）

### 主题切换功能
- [ ] 首次加载使用深色主题
- [ ] 导航栏可见主题切换按钮（月亮图标）
- [ ] 点击按钮切换到亮色主题
- [ ] 点击按钮切换回深色主题
- [ ] 切换平滑无闪现

### 主题应用
- [ ] 深色主题：背景 `#0f0f12`，文本 `#e5e5e5`
- [ ] 亮色主题：背景 `#fffbfe`，文本 `#1f1f1f`
- [ ] 所有文本可读（对比度足够）
- [ ] 所有链接正确着色
- [ ] 按钮样式正确

### 持久化测试
- [ ] 选择亮色主题
- [ ] 刷新页面 (`F5` 或 `Cmd+R`)
- [ ] 主题仍为亮色（localStorage 有效）
- [ ] 选择深色主题
- [ ] 刷新页面
- [ ] 主题仍为深色

### 浏览器兼容性
- [ ] Chrome/Chromium (49+)
- [ ] Firefox (31+)
- [ ] Safari (9.1+)
- [ ] Edge (15+)
- [ ] 移动浏览器 (iOS Safari, Chrome Android)

### 控制台检查
- [ ] 打开浏览器开发者工具 (F12)
- [ ] 控制台无红色错误
- [ ] 控制台无黄色警告（关于第三方）
- [ ] `window.themeManager` 存在
- [ ] `window.toggleTheme` 存在

### localStorage 验证
- [ ] 打开开发者工具 → Application/Storage
- [ ] localStorage 中有 `inxUF_theme` 键
- [ ] 值为 `'dark'` 或 `'light'`
- [ ] 切换主题后值正确更新

---

## 🎨 视觉检查

### 颜色验证
- [ ] 深色主题中原色为 `#80deea`
- [ ] 亮色主题中原色为 `#0085a1`
- [ ] 边框颜色在深色 `#333333`，亮色 `#e0e0e0`
- [ ] 文本对比度符合 WCAG AA 标准

### 组件样式
- [ ] 链接在悬停时显示视觉反馈
- [ ] 按钮有适当的圆角 (8px)
- [ ] 分页器按钮样式正确
- [ ] 引用块有左边框

### 响应式检查
- [ ] 主题按钮在移动设备上可点击
- [ ] 主题按钮不覆盖重要内容
- [ ] 主题切换在所有屏幕尺寸上有效

---

## 📱 移动设备测试

### 设备测试
- [ ] iPhone/iOS Safari
- [ ] Android Chrome
- [ ] Android Firefox
- [ ] 平板设备

### 移动特定功能
- [ ] 触摸点击按钮有效
- [ ] 没有延迟 (fastclick 兼容)
- [ ] 触摸后有视觉反馈

---

## 🚀 部署准备

### Git 设置
- [ ] Git 分支是 `master` 或 `main`（GitHub Pages 配置的分支）
- [ ] 工作目录干净（`git status` 显示干净）
- [ ] 所有更改已 staged

### 提交
- [ ] 提交信息明确: `feat: Material You theme system implementation`
- [ ] 提交包括所有新文件和修改
- [ ] 没有遗漏的文件

```bash
git add -A
git commit -m "feat: Material You theme system with dark/light toggle

- Add Material You design system with CSS variables
- Implement dark/light theme toggle in navigation
- Add theme persistence with localStorage
- Update styles to use theme variables
- Add Material Design tokens (elevation, shapes, transitions)
- Include comprehensive documentation"
```

### 推送
- [ ] 运行 `git push origin master`（或正确的分支）
- [ ] 推送成功（没有认证错误）

---

## ✔️ GitHub Pages 检查

### 部署验证
- [ ] 访问你的 GitHub 项目设置
- [ ] Pages 显示 "Your site is published"
- [ ] 部署 URL 正确: `https://yourusername.github.io/inxUF-Website`
- [ ] 等待 1-2 分钟部署完成

### 生产检查
- [ ] 访问生产网址
- [ ] 页面正确加载
- [ ] CSS 完全应用（没有样式错误）
- [ ] 深色主题是默认
- [ ] 主题按钮有效
- [ ] 主题切换有效
- [ ] 刷新后主题保持

### 资源加载
- [ ] 所有 CSS 成功加载 (200 状态)
- [ ] 所有 JS 成功加载 (200 状态)
- [ ] 没有 404 错误
- [ ] 没有混合内容警告 (HTTPS)

### 网站功能
- [ ] 导航有效
- [ ] 链接可点击
- [ ] 搜索功能工作（如有）
- [ ] 文章正确显示

---

## 📊 性能检查

### 速度测试
- [ ] 使用 Google PageSpeed Insights
- [ ] Lighthouse 性能 > 70
- [ ] 首次内容绘制 < 3s
- [ ] 最大内容绘制 < 4s

### 网络检查
- [ ] 所有资源合并（没有过多请求）
- [ ] CSS/JS 已压缩
- [ ] 没有大型未使用的资源

---

## 🔒 安全检查

### HTTPS
- [ ] 网站使用 HTTPS
- [ ] 没有混合内容警告
- [ ] SSL 证书有效

### 代码安全
- [ ] 没有 localStorage 中的敏感数据
- [ ] JavaScript 没有 eval() 或危险函数
- [ ] 所有 CDN 链接使用 HTTPS

---

## 📚 文档检查

### 文档文件
- [ ] `THEME_README.md` 已创建并可读
- [ ] `BUILD_GUIDE.md` 已创建并可读
- [ ] `QUICK_START.md` 已创建并可读
- [ ] `IMPLEMENTATION_SUMMARY.md` 已创建并可读
- [ ] `CHANGELOG_THEME.md` 已创建并可读
- [ ] `DEPLOYMENT_CHECKLIST.md` 本文件

### 文档质量
- [ ] 文档清晰易懂
- [ ] 所有代码示例正确
- [ ] 链接有效
- [ ] 截图/图表清晰

---

## 🎉 发布前最后检查

### 最终验证
- [ ] 所有检查项都已完成
- [ ] 没有已知的 bug
- [ ] 主题系统功能正常
- [ ] 页面加载速度可接受
- [ ] 移动设备体验良好

### 文档准备
- [ ] 更新了项目 README（如需）
- [ ] 发布说明已准备（如需）
- [ ] 用户文档已共享

---

## ✅ 部署完成!

- [ ] 生产网站已上线
- [ ] 用户可以访问
- [ ] 主题系统工作正常
- [ ] 反馈渠道已建立

---

## 📝 部署后操作

### 监控
- [ ] 监控 GitHub Pages 部署状态
- [ ] 检查用户反馈
- [ ] 监视性能指标

### 优化（可选）
- [ ] 收集用户反馈
- [ ] 根据需要调整颜色
- [ ] 考虑添加更多主题

### 版本管理
- [ ] 标记发布: `git tag v1.0.0-theme`
- [ ] 创建发布说明
- [ ] 更新项目主页

---

## 🆘 故障排除

如果部署失败，请检查：

1. **页面不显示**
   - [ ] GitHub Pages 是否启用？
   - [ ] 选择了正确的分支？
   - [ ] `_config.yml` 中的 baseurl 正确？

2. **样式未应用**
   - [ ] CSS 文件加载了吗？(检查网络选项卡)
   - [ ] LESS 编译成功了吗？
   - [ ] 浏览器缓存清除了吗？

3. **主题不工作**
   - [ ] `theme-toggle.js` 加载了吗？
   - [ ] 浏览器支持 localStorage？
   - [ ] 控制台有错误吗？

4. **闪现问题**
   - [ ] head.html 中的防闪现脚本存在？
   - [ ] 脚本在 CSS 之前执行？

---

**部署日期**: _____________  
**部署者**: _____________  
**版本**: 1.0.0  
**状态**: ☐ 部署中 ☐ 已完成 ☐ 发现问题

---

## 联系方式

遇到问题？
- 检查文档: `THEME_README.md`、`BUILD_GUIDE.md`
- 查看日志: 浏览器开发者工具
- 反馈: GitHub Issues
