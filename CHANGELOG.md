# Changelog

## [Unreleased]

### Added

- `--rvtc-panel-max-height`、`--rvtc-detail-min-height`、`--rvtc-detail-content-max-height` 三個 CSS 變數，可覆寫版面高度
- BaseTable、SortTable、TitleTable 透過 ref 開放 `clearSelection`、`toggleRowSelection`、`doLayout`
- BaseTable、SortTable、TitleTable 新增 `error` prop 與 `error`、`empty` slot，可自訂載入失敗與無資料畫面
- BaseTable 新增 `unfixColumnsBelow` prop，視窗寬度小於該值時選取欄、序號欄、操作欄不固定
- BaseTable 新增 `rowLabel` prop，為查看／編輯按鈕加上 aria-label

### Fixed

- `/styles/core` 的主題變數引用都加上 fallback，只載 core 時元件跟隨宿主的 Element Plus 主色
- TransferDialog 不再取消勾選沒有 `prop` 的欄位
- TransferDialog 欄位搜尋不分大小寫
- MainPanel、SearchableListPanel、DetailLayout、FilterLayout 的 `click:back` 會帶上返回 payload
- BaseSelector 預設 placeholder 跟隨語系
- BaseSelector 的 option key 改用 value，label 重複時不再出錯
- BaseTable 序號欄標題跟隨語系
- BaseWaringDialog 內容超過兩行不再溢出
- TitleTable 標題列在窄寬度下會換行

### Changed

- `vue` peer 下限改成 `^3.3.0`
- 移除 demo 和套件都沒用到的檔案

## [2.1.0]

- 本檔建立前的版本，變更見 git 歷史。
