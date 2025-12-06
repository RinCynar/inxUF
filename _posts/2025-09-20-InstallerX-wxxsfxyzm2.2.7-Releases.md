---
layout: post
title: "由 wxxsfxyzm 维护的 InstallerX-Revived 2.2.7 发布"
author: "Rosan(Maker), wxxsfxyzm(Maker), RinCynar(Repost)"
header-style: text
catalog: true
tags:
  - InstallerX
  - wxxsfxyzm
---

## 由 [wxxsfxyzm](https://github.com/wxxsfxyzm) 维护的 InstallerX-Revived 2.2.7 发布, 原地址[在此](https://github.com/wxxsfxyzm/InstallerX-Revived/releases/tag/v2.2.7)

## [下载 Offline 版本](/file/InstallerX-wxxsfxyzm-offline-2.2.7.apk).

## [下载 Online 版本](/file/InstallerX-wxxsfxyzm-online-2.2.7.apk).

### ✨ 更新亮点

#### 🎨 新增 主题切换 + Miuix 风格设置 UI

#### 🛠️ 支持 隐藏启动器图标 + 拨号盘进入应用

#### ⚡ 新增 手动 Dex2oat 设置 / 安装用户选择 / 软件包来源设定

#### 📦 跨架构安装（armv7→arm64, x86→x64）

#### 🔄 支持 卸载器

#### 🌍 新增多语言支持（阿拉伯语、泰语、乌克兰语、葡萄牙语、德语）

#### 🐞 大量 Bug 修复与性能优化

### 📦 更新内容 / What's Changed

### 🚀 功能更新

#### 依赖更新：所有依赖更新至最新

#### 新增：设置主题切换功能，加入 Miuix 风格设置 UI（未完全完成，预计下版本完成，2.3 版本将设计安装界面）

#### 新增：对话框卡片样式微调

#### 新增：支持隐藏启动器图标，通过拨号盘代码进入应用，或从系统应用设置进入应用

#### 新增：手动 Dex2oat 设置，支持强制执行与优化模式选择（root / shizuku）

#### 新增：支持手动指定目标安装用户（root / shizuku）

#### 新增：支持手动设置软件包来源

#### 设置为 商店 可获得更高权限；设为 本地文件 或 下载文件 会有更多限制

#### 新增：添加 请求更新所有权 安装选项

#### 新增：支持分享下载直链到 app 进行直接安装，构建拆分为 online / offline 版本

#### 新增：多个配置时导航控件显示 badge

#### 新增：对话框安装动画 @Chimioo

#### 新增：优化缓存复制速度，支持实时显示进度

#### 新增：更多错误处理机制

#### 新增：按包名或 sharedUid 拦截安装，可临时允许一次

#### 新增：点击 SDK 信息可切换双行显示，显示对应 Android 版本（暂不支持默认双行）

#### 新增：强化跨架构安装，可在 arm64-only 安装 armv7/armeabi，在 x64-only 安装 x86 包

#### 新增：支持卸载器

### 📚 文档与翻译

#### 更新 README，默认改为英文版

#### 翻译更新 @nubesurrealista

#### 翻译：阿拉伯语 @Hussain96o

#### 翻译：泰语

#### 翻译：乌克兰语 @Kefir2105

#### 翻译：葡萄牙语（巴西） @ThorMaximus

#### 翻译：德语 @instatablet30-collab

### ⚙️ 变更

#### 选择 Dhizuku 时自动禁用不支持功能

#### 应用名称修正为 InstallerX Revived

#### Android 15+ 降级选项仅 root 可用

#### minSDK 降低至 26 @budingxiaocai

### 🛠 修复

#### 修复首次安装后错误智能建议不显示

#### 修复小米设备首次安装默认模式错误（对话框而非全局）

#### 修复通知栏点击安装完成通知时报错

#### 修复批量安装/zip 安装时包名相同文件无法选择

#### 修复原始安装标志位被错误抹除

#### 字符串修复

### 🐞 已知问题

#### 重要：2.2.7.alpha 更新至此版本及未来版本后需清除用户数据才能运行（稳定版不受影响）

#### 该版本 Dhizuku 无法卸载应用，alpha 版本已经实现
