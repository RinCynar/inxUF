---
layout: post
title: "由 wxxsfxyzm 维护的 InstallerX-Revived 2.2.4 发布"
author: "Rosan(Maker), wxxsfxyzm(Maker), RinCynar(Repost)"
header-style: text
catalog: true
tags:
    - InstallerX
    - wxxsfxyzm
---

## 由 [wxxsfxyzm](https://github.com/wxxsfxyzm) 维护的 InstallerX-Revived 2.2.4 发布, 原地址[在此](https://github.com/wxxsfxyzm/InstallerX-Revived/releases/tag/v2.2.4)
## [下载 arm64v8a 版本](/file/InstallerX-Revived-2.2.4-arm64.apk).
## [下载 armeabi 版本](/file/InstallerX-Revived-2.2.4-armeabi.apk).
## [下载 x64 版本](/file/InstallerX-Revived-2.2.4-x64.apk).
## [下载 x86 版本](/file/InstallerX-Revived-2.2.4-x86.apk).

### 更新内容

#### 依赖更新 更新依赖至最新，targetSDK提升至36
#### 底层优化 将Log系统迁移至Timber，仅对debug构建输出日志，避免release构建不必要的日志开销
#### UI优化 优化了对话框安装时的升级版本/SDK对比显示效果，增加安装提示，增加了一些过渡动画效果
#### UI优化 优化了对话框安装出现错误时的显示逻辑，默认折叠stacktrace，只显示出错文本，可以点击展开
#### 修复 修复了apks/apkm的判断逻辑漏洞，可以更好地检测apks文件了
#### 修复 修复了安装服务前台ANR的问题
#### 修复 修复了使用通知栏安装时通知点开卡住的问题
#### 修复 修复了安装apks文件时版本/SDK信息错误读取非base.apk的问题
#### 优化 优化了apks文件信息提取的算法，仅从base.apk提取信息，避免不必要的计算
#### 新增 为Shizuku/Root新增了Shell权限命令执行的功能
#### 支持绕过定制系统的intent拦截
#### 支持强制删除安装包
#### 新增 Dhizuku不支持特权拉起活动/应用前台检测，因此加入了延时关闭选项，为用户确认打开应用留出时间
#### 新增 增加在系统阻止USB/shell安装时的错误提示映射
#### 新增 增加在安装应用重复声明其他应用已声明权限时的错误提示映射
#### 新增 为对话框安装新增一个扩展菜单
#### 高度实验性功能：此功能为实验性功能，尚未完工，目前仅支持查看部分权限，未来会根据需要调整
#### 新增 为状态栏安装新增一个点击是否打开对话框的开关
#### 新增 初次安装会判断是否为小米手机并自动加上可用的安装者
#### 新增 西班牙语支持