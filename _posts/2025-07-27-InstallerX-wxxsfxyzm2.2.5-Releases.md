---
layout: post
title: "由 wxxsfxyzm 维护的 InstallerX-Revived 2.2.5 发布"
author: "Rosan(Maker), wxxsfxyzm(Maker), RinCynar(Repost)"
header-style: text
catalog: true
tags:
    - InstallerX
    - wxxsfxyzm
---

## 由 [wxxsfxyzm](https://github.com/wxxsfxyzm) 维护的 InstallerX-Revived 2.2.5 发布, 原地址[在此](https://github.com/wxxsfxyzm/InstallerX-Revived/releases/tag/v2.2.5)
## [下载 arm64v8a 版本](/file/InstallerX-wxxsfxyzm-2.2.5-arm64.apk).
## [下载 x64 版本](/file/InstallerX-wxxsfxyzm-2.2.5-x64.apk).

### 更新内容

#### 底层优化 优化ForegroundService全流程，优化协程逻辑
#### 修复 选择通知栏安装时，连续多次点击不同apk调起安装不会再出现卡分析进度条的bug
#### 新增 用户主动点击通知中的完成/划去通知后，前台服务会在5s后主动结束，不占用后台
#### 变更 移除了前台透明代理活动，回归统一的前台服务逻辑。部分定制系统若状态栏通知卡住请设置后台无限制
#### 底层优化 为AppDataStore的字符串值建立常量键值，更加类型安全
#### UI优化 优化了对话框安装时的升级版本/SDK对比显示效果，增加安装提示，增加了一些过渡动画效果
#### 修复 修复错误的间距设置导致动画卡顿的bug
#### UI优化 优化了对话框安装出现错误时的显示逻辑，默认折叠stacktrace，只显示出错文本，可以点击展开
#### 修复 修复错误的间距设置导致动画卡顿的bug
#### UI优化 迁移大部分组件至Material 3 Expressive
#### 变更 默认应用MaterialExpressiveTheme与motionScheme.expressive()
#### 变更 移除大多数Lottie动画，改为使用Material 3 Expressive的Loading Indicator
#### 新增 变更导航逻辑与动画，新增预测返回动画
#### UI优化 部分文本描述优化
#### 震动优化 迁移震动逻辑至Compose API，（在部分系统上）震感更加细腻可控
#### 新增 安装zip包内的apk文件，用InstallerX打开zip文件即可
#### 修复 修复了apks/apkm的判断逻辑漏洞，可以更好地检测apks文件了
#### 修复 修复了输入方式为zipInputStream时的错误检测问题
#### 新增 为过时targetsdk安装错误更新异常处理
#### 新增 为输入不支持的文件提供异常处理
#### 变更 扩展菜单更新
#### 变更 将原来安装对话框安装选项中除了自动删除apk与显示SDK以外的选项整合到扩展菜单中
#### 新增 卡片样式焕新
#### 新增 安装APKS/APKM时的选择菜单样式焕新
#### 新增 支持在扩展菜单设置InstallFlags，部分实现来自@zacharee
#### 变更 将图标缓存逻辑独立为模块
#### 新增 通知栏安装支持显示系统图标包