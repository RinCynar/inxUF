---
layout: post
title: "由 wxxsfxyzm 维护的 InstallerX-Revived 2.3.1 发布"
author: "Rosan(Maker), wxxsfxyzm(Maker), RinCynar(Repost)"
header-style: text
catalog: true
tags:
  - InstallerX
  - wxxsfxyzm
---

## 由 [wxxsfxyzm](https://github.com/wxxsfxyzm) 维护的 InstallerX-Revived 2.3.1 发布, 原地址[在此](https://github.com/wxxsfxyzm/InstallerX-Revived/releases/tag/v2.3.1)

## [下载 Offline 版本](/file/InstallerX-wxxsfxyzm-offline-2.3.1.apk).

## [下载 Online 版本](/file/InstallerX-wxxsfxyzm-online-2.3.1.apk).

### ✨ 更新亮点 / Highlights

#### 🧪 实验室特性：BinderWrapper（大幅提升 Root/Shizuku 性能，默认开启）

####🧩 支持模块（Magisk/KSU/Apatch）分析与刷写

####🎨 动态取色：安装界面与进度通知跟随应用图标取色

####☁️ 应用内更新（仅在线版）与多线程下载支持

####🗑️ 卸载设置页面主动拉起与持久化选项

####🐞 大量 Bug 修复与底层重构

### 🚀 新增功能

#### 新增实验室功能

#### 支持在 Shizuku 和 Root 模式下使用 BinderWrapper 替代 UserService 以获得更好性能（默认开启）

#### 支持分析并刷写模块 @AlexLiuDev233

#### 支持自定义 HTTP 下载的安全策略（仅对在线版有效）

#### 支持自定义安装请求方 @AlexLiuDev233

#### 新增动态取色支持

#### 安装对话框跟随待安装应用的图标取色

#### 安装实时活动（Live Activity）进度通知跟随待安装应用的图标取色

#### Miuix 设置界面增添 Haze 模糊效果

#### 新增安装流程优化

#### 支持多线程下载

#### 支持单独打开或选择分包文件以添加到现有安装会话

#### 支持设置点击对话框安装按钮后静默安装

#### 用户导航离开安装对话框时，自动以通知显示以避免丢失安装会话

#### 新增分包选择增强

#### MD3 选择分包界面支持分类显示

#### 支持为分包安装选择默认策略（全选分包 / 智能选择最优）

#### 支持在安装对话框显示安装包大小对比，并根据选择的分包实时计算总大小

#### 新增全新卸载页面

#### 支持持久化卸载选项

#### 支持按包名主动拉起卸载器

#### 新增在线版添加应用内更新逻辑，分别支持 Alpha/Release 通道

#### 新增自定义安装原因 @AlexLiuDev233

#### 新增从通知打开应用支持调用特权启动 (Root/Shizuku)

#### 新增安装成功通知支持在设定的倒计时后自动清除

#### 新增错误处理以及智能建议 #377

#### 新增HyperOS 使用 Dhizuku 安装系统应用报错“需要有效安装者”时，智能建议使用 Shizuku 重试

### ⚡ 优化与改进

#### 底层重构：重构多处代码，显著提高运行效率

#### 优化：Root (AppProcess) 性能

#### 优化：Shizuku 错误处理机制

#### 优化：迁移 Dhizuku 模式的文件删除逻辑，支持使用最新版 Dhizuku/Owndroid 授权时的文件删除

#### 优化：中文文档 @Tools-cx-app

#### 优化：应用内文本描述

#### 优化：GitHub Actions 工作流

### ⚙️ 更改

#### 更改：依赖更新 (Gradle 9.2.1, Kotlin 2.3.0, Compose 1.10.0, Java 25)

#### 更改：Miuix 支持 Monet 取色

#### 更改：动态取色扩展支持，Android 8 以上即可使用 @budingxiaocai

#### 更改：由于小米最近的包管理更新修复，现在为支持的设备恢复“无授权器”的安装模式

### 🛠 修复

#### 修复 批量安装时提前删除缓存导致后续安装无法进行的问题

#### 修复 app_process 造成僵尸进程的问题

#### 修复 Android 8+ 自适应图标显示问题 @Vixb1122

#### 修复 APKS 解析问题

#### 修复 通知刷新过快导致无法显示通知（添加节流机制）

#### 修复 卸载器无法使用“无授权器”模式的问题

### 🗑 移除

#### 移除：Material 依赖（缩减产物大小，Compose 项目无需）

#### 移除：”允许受限制的权限“安装选项（选项无意义）

### 🌍 翻译

#### 由于翻译贡献者数量较多，统计与维护成本较高，自本版本起将不再在 Release 中逐一列出翻译贡献者。

#### 感谢所有参与翻译并帮助项目走向更多语言的贡献者！