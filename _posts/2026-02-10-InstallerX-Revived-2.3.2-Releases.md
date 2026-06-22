---
layout: post
title: "由 wxxsfxyzm 维护的 InstallerX-Revived 2.3.2 发布"
author: "Rosan(Maker), wxxsfxyzm(Maker), RinCynar(Repost)"
header-style: text
catalog: true
tags:
  - InstallerX
  - wxxsfxyzm
---

## 由 [wxxsfxyzm](https://github.com/wxxsfxyzm) 维护的 InstallerX-Revived 2.3.2 发布, 原地址[在此](https://github.com/wxxsfxyzm/InstallerX-Revived/releases/tag/v2.3.2)

## [下载 Offline 版本](/file/InstallerX-Revived-offline-2.3.2.apk).

## [下载 Online 版本](/file/InstallerX-Revived-online-2.3.2.apk).

### ✨ 更新亮点 / Highlights

#### ⚡ 性能与 UI 重构：重写 MD3 界面，优化动画与反射效率，增加模糊

#### 🧩 模块安装体验优化：支持安装后跳转 LSPosed，增强命令行交互

#### 🛠️ 兼容性提升：支持 Android 8/9 会话安装确认，优化 APKS/APKM 识别

### 📦 更新内容 / What's Changed

#### 🚀 新增功能

##### 新增：支持分别为安装和卸载设置生物识别认证确认 @AlexLiuDev233 @Ephemera42

##### 新增：支持为 Android 8/9 确认会话安装 @Ephemera42

##### 新增：从“自动删除 APK”中拆分出“自动删除 ZIP”的独立开关 @AlexLiuDev233

##### 新增：安装 LSPosed 模块后支持选择直接打开 LSPosed @AlexLiuDev233

##### 新增：实时通知支持显示实时更新的进度

##### 新增：测试版本（Debug）增加日志记录和导出能力

##### 新增：支持开关界面模糊效果 @wxxsfxyzm @leset0ng @Ephemera42

##### 新增：完善通知通道的描述文本

### ⚡ 优化与改进

##### 优化：UI 重构：重写部分 Material 3 控件和界面，显著提升性能与动画表现

##### 优化：APK 架构（ABI）分析逻辑

##### 优化：APKS 分析逻辑，支持识别更多类型的 APKS 文件

##### 优化：APKM 分析逻辑，细化对 info.json 的判断

##### 优化：关于页面和开源许可页面 @AlexLiuDev233

##### 优化：底层反射性能与错误处理机制

##### 优化：ZIP 解析过程中的错误将原样抛出，便于排查

##### 优化：“保留数据卸载”应用时的解析与显示逻辑

##### 优化：系统应用安装模式的工作表现，现在支持任意包名

##### 优化：忽略电池优化的文本表述及小米设备上的设置检测

##### 优化：Material 3 和 Miuix 安装对话框的提示文本

##### 优化：自动锁定生效条件

### ⚙️ 变更

##### 变更：移除实验室中的 BinderWrapper 选项（现已默认启用）

##### 变更：出于安全性考虑，模块安装时禁用静默安装

##### 变更：依赖更新 (AGP 9.0.0, Gradle 9.3.1, Java 25)

##### 变更：在线版仅在当前包名为官方包名时检测更新

##### 变更：“授予所有请求权限”仅对全新安装生效，避免覆盖用户手动设定的权限

### 🛠 修复

##### 修复 卸载完成后对话框未能立刻关闭的问题

##### 修复 刷入模块并重启后缓存无法清除的问题

##### 修复 部分 Miuix 界面无法弹出下拉菜单或对话框的问题

##### 修复 无法解析 Chrome 分享的直链的问题

##### 修复 安装 LSPosed IT 包内 APK 时无应用信息的问题

##### 修复 刷写模块时的 Shell 命令传递异常

##### 修复 刷写模块时的命令行输出不滚动的问题 @Prslc

##### 修复 小米“超级岛”不显示应用 LOGO 的问题

##### 修复 对话框菜单中 Shizuku 和系统应用模式下不显示“降级安装”选项的问题

##### 修复 Material 3 对话框缺失“无效分包”提示的问题

##### 修复 CI 在环境变量为空时无法使用默认 Debug 签名打包的问题 @Tools-cx-app

##### 修复 Android 11 以下设备动态取色不正常的问题 @budingxiaocai

##### 修复 构建依赖配置 @budingxiaocai

### 📚 文档与翻译

##### 文档：日语 README @noimzip

##### 文档：德语 README @tabletinsta6-glitch

##### 翻译：感谢所有提交翻译的贡献者（翻译人员名单不再逐一列出）

##### 优化：Material 3 和 Miuix 安装对话框的提示文本

##### 优化：自动锁定生效条件

### ⚙️ 变更

##### 变更：移除实验室中的 BinderWrapper 选项（现已默认启用）

##### 变更：出于安全性考虑，模块安装时禁用静默安装

##### 变更：依赖更新 (AGP 9.0.0, Gradle 9.3.1, Java 25)

##### 变更：在线版仅在当前包名为官方包名时检测更新

##### 变更：“授予所有请求权限”仅对全新安装生效，避免覆盖用户手动设定的权限

### 🛠 修复

##### 修复 卸载完成后对话框未能立刻关闭的问题

##### 修复 刷入模块并重启后缓存无法清除的问题

##### 修复 部分 Miuix 界面无法弹出下拉菜单或对话框的问题

##### 修复 无法解析 Chrome 分享的直链的问题

##### 修复 安装 LSPosed IT 包内 APK 时无应用信息的问题

##### 修复 刷写模块时的 Shell 命令传递异常

##### 修复 刷写模块时的命令行输出不滚动的问题 @Prslc

##### 修复 小米“超级岛”不显示应用 LOGO 的问题

##### 修复 对话框菜单中 Shizuku 和系统应用模式下不显示“降级安装”选项的问题

##### 修复 Material 3 对话框缺失“无效分包”提示的问题

##### 修复 CI 在环境变量为空时无法使用默认 Debug 签名打包的问题 @Tools-cx-app

##### 修复 Android 11 以下设备动态取色不正常的问题 @budingxiaocai

##### 修复 构建依赖配置 @budingxiaocai

### 📚 文档与翻译

##### 文档：日语 README @noimzip

##### 文档：德语 README @tabletinsta6-glitch

##### 翻译：感谢所有提交翻译的贡献者（翻译人员名单不再逐一列出）