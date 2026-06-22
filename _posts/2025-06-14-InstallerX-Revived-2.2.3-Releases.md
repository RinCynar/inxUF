---
layout: post
title: "由 wxxsfxyzm 维护的 InstallerX-Revived 2.2.3 发布"
author: "Rosan(Maker), wxxsfxyzm(Maker), RinCynar(Repost)"
header-style: text
catalog: true
tags:
    - InstallerX
    - wxxsfxyzm
---

## 由 [wxxsfxyzm](https://github.com/wxxsfxyzm) 维护的 InstallerX-Revived 2.2.3 发布, 原地址[在此](https://github.com/wxxsfxyzm/InstallerX-Revived/releases/tag/v2.2.3)
## [下载该版本](/file/InstallerX-Revived-2.2.3.apk).

### 更新内容

#### 底层改动将AppDataStore作为全局单例，由Koin进行注入
#### 底层改动将同步操作的sharedpreferences迁移到异步操作的datastore-preferences
#### 底层修复修复了异步操作时延迟获取数据可能导致的NullPointerException
#### 新增状态栏安装出错新增错误原因提示
#### 新增在用户主动禁用通知权限后，尝试执行安装会提示启用通知权限
#### 优化 SDK≥33时创建通知前进行权限检查避免SecurityException
#### 优化迁移RsConfig.java至RsConfig.kt
#### 修复修复状态栏安装时候的按钮点击操作，现在可以生效了
#### 修复 SDK33以下设备打开应用选择列表闪退的问题
#### 修复防止匿名安装程序创建过程中出现竞争条件导致安装通知无法被消去
#### 修复 HyperOS通知栏手动安装通知进度被系统省电策略拦截
#### 新增添加HyperOS系统安装时的特殊错误INSTALL_FAILED_HYPEROS_ISOLATION_VIOLATION错误处理
#### 修复修复设置页面Scaffold的windowinsets传递错误
#### 调整修改设置页面下拉菜单为InputChip ，更符合Material 3的设计，也更直观
#### 为了美观，自定义安装渠道和忽略安装方式暂时被移除，但仍然可以在配置中设置。（这个应该用的人不多吧）
#### 新增增加获取更新按钮，可以通过点击直接前往GitHub仓库获取更新
#### 出于精简和安全性的考虑，暂不会给InstallerX增加联网功能，因此是使用intent拉起默认浏览器打开链接
#### 新增设置页面关于按钮下直接显示版本号，方便自行检查更新时对比
#### 新增关于页面新增AboutLibraries组件
#### 修复设置活动在HyperOS上亮色主题时导航栏不沉浸

#### 新版安装失败通知（展开显示错误信息）
<img src="/file/InstallerX-Revived-2.2.3-0.png" alt="A image">

#### 更新的设置界面
<img src="/file/InstallerX-Revived-2.2.3-1.png" alt="A image">

#### 获取更新菜单
<img src="/file/InstallerX-Revived-2.2.3-2.png" alt="A image">

#### AboutLibraries列表
<img src="/file/InstallerX-Revived-2.2.3-3.png" alt="A image">

### 已知问题

#### SDK33及以下（尤其31以下）可能会遇到问题，有问题请[issue](https://github.com/wxxsfxyzm/InstallerX-Revived/issues)
#### Redmi K70 Ultra,部分vivo机型，oppo机型以及联想机型分析apk或是拉起installerx的意图会被系统拦截
#### 定制UI暂无力修复，K70 Ultra听说是Shizuku那边的问题，有修复的可能
#### 状态栏手动安装方式，连续点击多个apk文件，通知会卡在“分析中”或是“分析完成”状态
#### 协程这块我不是很熟悉，暂时没办法解决，这个不是很影响使用，不快速点击多个apk就没事 暂时解决方法：点击卡住的通知的取消按钮，再次尝试安装即可
#### 需要帮助