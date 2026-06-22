---
layout: post
title: "由 wxxsfxyzm 维护的 InstallerX-Revived 2.2.2 发布"
author: "Rosan(Maker), wxxsfxyzm(Maker), RinCynar(Repost)"
header-style: text
catalog: true
tags:
    - InstallerX
    - wxxsfxyzm
---

## 由 [wxxsfxyzm](https://github.com/wxxsfxyzm) 维护的 InstallerX-Revived 2.2.2 发布, 原地址[在此](https://github.com/wxxsfxyzm/InstallerX-Revived/releases/tag/v2.2.2)
## [下载该版本](/file/InstallerX-Revived-2.2.2.apk).

### 更新内容

#### 新增 在安装界面显示安装包的SDK信息/Display SDK version in InstallInfoDialog @lings03 in #6
#### 新增 添加OneUI系统安装时的特殊错误 INSTALL_FAILED_REJECTED_BY_BUILDTYPE 错误处理
#### 底层改动 移除asset中初始数据库db文件，在初次打开app时由Room完成初始化
#### 底层修复 数据库初始化以及迁移逻辑
#### 修改 安装第一步的包选择文本
#### 修改 降低minSDK至30（Android 11）以适配一些老设备
#### 依赖改动提高Java版本为21

#### 设置界面
<img src="/file/InstallerX-Revived-2.2.2-0.png" alt="A image">

#### 安装界面
<img src="/file/InstallerX-Revived-2.2.2-1.png" alt="A image">

### 已知问题

#### SDK33及以下（尤其31以下）可能会遇到问题，有问题请[issue](https://github.com/wxxsfxyzm/InstallerX-Revived/issues)
#### 手头没有安卓14以下的设备，相关问题可能进展缓慢