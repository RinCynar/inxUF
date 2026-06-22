---
layout: post
title: "由 wxxsfxyzm 维护的 InstallerX-Revived 2.2.6 发布"
author: "Rosan(Maker), wxxsfxyzm(Maker), RinCynar(Repost)"
header-style: text
catalog: true
tags:
  - InstallerX
  - wxxsfxyzm
---

## 由 [wxxsfxyzm](https://github.com/wxxsfxyzm) 维护的 InstallerX-Revived 2.2.6 发布, 原地址[在此](https://github.com/wxxsfxyzm/InstallerX-Revived/releases/tag/v2.2.6)

## [下载](/file/InstallerX-Revived-2.2.6.apk).

### ✨ 更新亮點/亮點

#### 🎨 主題切換：新增 Material Expressive 風格設定 UI

#### 🛡 Play Protect 跳過：支援跳過 Google Play Protect 掃描

#### 📦 跨架構安裝：在 arm64-only 系統安裝 armeabi-v7a 套件

#### 📑 智慧分包選擇：apks/apkm/xapk/zip 預設自動選擇最佳分包

#### 🔄 後台安裝：安裝進行中可安裝後台，完成後通知提醒

#### 📋 預設安裝來源：支援在設定中快速選擇來源包名

#### 📉 效能最佳化：URI/特權呼叫邏輯全面優化，解析速度顯著提升

#### 🌍 多語言支援：新增，更新多語言翻譯

### ⚡ 粗略優化

#### 優化 URI 解析邏輯，大幅提升解析與分析輸入檔速度

#### 最佳化進程進程呼叫邏輯：進程啟動 Activity 改用 API，刪除 shell 呼叫方式

#### 新增：特權服務增加权限检查和权限授予兩種方法，目前僅用於自身授權，未來可用於安裝應用程式授權

### 📚 依賴更新

#### 所有依賴更新至最新

#### 刪除不需要的 WorkManager 依賴

⚙️ 變更

#### 提供通用包，加回 32 位支持

🚀 新增功能

#### 設定主題切換功能，加入一組 Expressive style 的設定 UI（對話方塊 UI 暫無對話框）

#### 忽略電池優化開關

#### 跳過 Play Protect 掃描開關（想法來自 vvb2060/PackageInstaller）

#### 版本號碼支援單行/多行顯示，可在設定調整，或點選對話方塊版本號部分切換

#### 安裝 ZIP 套件內 APK 時，支援任意目錄檔案（不限根目錄）

#### 支援分析近庫架構

#### 解析 apks/apkm/xapk 時預設智慧型選取最上面分包（想法來自 vvb2060/PackageInstaller）

#### 安裝 zip 內 APK/批次安裝時，預設選取最上面分包

#### 支援在設定中預設安裝來源包名，並可在設定檔或對話方塊中快速選擇

#### 支援在 arm64-only 系統中安裝 armeabi-v7a 套件

#### 對話框完善安裝錯誤時的智慧建議

#### 支援部分 OEM 的 Android 15 系統上執行保留資料/不保留資料的降級安裝

#### 支援在設定中設定禁止安裝的套件名稱列表，列中的應用程式將被拒絕安裝

#### 偵測到目標應用程式已歸檔時給出正確提示與處理

#### 安裝進行中可點選按鈕將進入後台，完成後通知提示

#### 問題模板@AIsouler

#### Telegram 機器人和頻道@Tools-cx-app

### 🎨 調整

#### 自動清理前台服務延遲調整

#### APK 檔案路徑解析/處理整合至 URI 解析階段

#### 回應視覺效果

### 🛠 修復

#### 修復部分 APK 圖示資源異常解析問題

#### Repair Edge 下載的 APK 無法開啟問題

#### 修復配置中的安裝選項無法同步到對話方塊擴充功能選單

#### 修復設定選單異步導致動畫異常的問題

#### 修復部分被修改過的 APK 無法解析的問題

#### 修復 root/shizuku 無法自動刪除來自 MT 管理器的 APK

#### Repair Switch 元件關閉類型設定錯誤

### 📖 文件與翻譯

#### 更新自述文件

#### 翻譯：新增匿名（匿名私訊貢獻）

#### 翻譯更新@nubesurrealista

### 🔮 未來計劃 / 未來計劃

#### 支援手動配置 dex2oat

#### 安裝完成後執行自訂操作

#### 主題功能擴充至對話框

### 🐞 已知問題 / 已知問題

#### 首次安裝後錯誤智能建議不顯示

##### 解決方案：安裝包含修復的 alpha 版本，或在設定中開關一次相關設置

#### 小米首次安裝後預設安裝方式設備錯誤（被設為「對話框」或「全域」）

##### 解決方案：安裝包含修復的 alpha 版本，或手動修改預設配置的安裝方式

#### 通知欄安裝完成點擊報錯“分析失敗”

##### 解決方案：安裝包含修復的 alpha 版本
