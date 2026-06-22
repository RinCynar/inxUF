---
layout: post
title: "由 wxxsfxyzm 维护的 InstallerX-Revived 2.3.0 发布"
author: "Rosan(Maker), wxxsfxyzm(Maker), RinCynar(Repost)"
header-style: text
catalog: true
tags:
  - InstallerX
  - wxxsfxyzm
---

## 由 [wxxsfxyzm](https://github.com/wxxsfxyzm) 维护的 InstallerX-Revived 2.3.0 发布, 原地址[在此](https://github.com/wxxsfxyzm/InstallerX-Revived/releases/tag/v2.3.0)

## [下载 Offline 版本](/file/InstallerX-Revived-offline-2.3.0.apk).

## [下载 Online 版本](/file/InstallerX-Revived-online-2.3.0.apk).

### ✨ 更新亮点 / Highlights

#### 🌟 支持 Android 16 实时通知 API（需在系统与应用中同时启用，部分定制 ROM 可能无效）

#### 🎨 MIUIX 主题的全新安装界面

#### ⚙️ 支持确认其他应用发起的会话安装（需 root + 最新 InxLocker 或安装为系统安装器）

#### ⚡ 新增并行安装（多实例运行）与更高效的反射工具

#### 🧹 清理缓存时实时显示进度与状态

#### 🐞 大量 Bug 修复与性能提升

### 🚀 新增功能

#### 新增：支持 Android 16 实时通知 API 请在系统与应用中同时启用此功能 部分定制 ROM 可能不支持

#### 新增：MIUIX 主题安装界面

#### 新增：支持确认其他应用发起的会话安装

#### 需 root + InxLocker 锁定，或安装为系统包管理器, 解决了往常锁定器搭配第三方安装器导致会话安装无法进行的问题

#### 新增：支持从系统设置独立切换应用语言

#### 新增：支持更多 APKS 分包格式识别

#### 新增：支持并行安装（多实例运行）

#### 新增：支持 Dhizuku 模式下卸载应用

#### 新增：支持使用 “无” 作为授权器（交由系统包管理器确认）不支持 HyperOS

#### 新增：安装应用时可选择使用 APK 内图标或系统图标包

#### 新增：支持设置显示 SDK 信息为单行 / 多行

#### 新增：清理缓存界面实时显示缓存大小与清理状态

#### 新增：支持为 OPPO 系统应用解析并显示部分 metadata 数据

#### 新增：支持识别模块（暂不支持刷入）

#### 新增：启动安装时自动锁定安装器（解决 HyperOS 掉锁定问题）

#### 新增：支持自行修改包名为 com.android.packageinstaller 以替代系统包管理器

#### ⚠️ 警告 1：可能导致 bootloop，风险自负

#### ⚠️ 警告 2：若系统包名为 com.google.android.packageinstaller，请勿这样做

#### 新增：HyperOS 启动器卸载提示文本 （小米近期已经给桌面添加签名验证修复）

### ⚡ 优化与改进

#### 底层优化：提升反射函数执行效率

#### UI 优化：改善 MD3 对话框显示效果与过渡动画

#### 优化：应用启动时界面闪烁问题

#### 优化：发起安装的应用的解析逻辑

#### 优化：设置界面描述更清晰，多处加入卡片提示

#### 优化：缓存清除逻辑与时机，避免残留

#### 优化：优化 Dhizuku UserService 错误处理，服务端死亡不会再导致应用端崩溃

### ⚙️ 更改

#### 更改：调整 MIUIX 设置界面的预测返回动画

#### 更改：放开降级安装限制并在界面明确说明

#### 更改：调试 CI 脚本 @Tools-cx-app

#### 更改：移除 Android 16+ 的“保数据卸载降级”选项（系统已封堵）

### 🛠 修复

#### 修复 API 36.1 上无法获取用户的问题

#### 修复 x64 设备 ABI 回退逻辑错误

#### 修复 Android 8.1 无法分析 APK 文件 @budingxiaocai

#### 修复部分 XAPK 资源分析异常

#### 修复 ROOT 调用失败的检测与错误提示

#### 修复 因协程中断引发的异常

#### 修复 卸载对话框未启用边到边显示

#### 修复 设置界面开关状态管理问题

### 🌍 翻译

#### 英语 @nubesurrealista

#### 中文（简体） @HuWan219

#### 中文（繁体） @david082321

#### 阿拉伯语 @alikiemash81-lgtm @Sombra180

#### 法语 @LBO44

#### 德语 @feuersternX

#### 土耳其语 @OrdinaryPerson0 @StereoLuigi99

#### 西班牙语 @JoseDunniel-DL @RightSideUpCak3 @nubesurrealista

#### 葡萄牙语（巴西） @ThorMaximus @marciozomb13

#### 波兰语 @Qu4X
