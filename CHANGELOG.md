# Changelog

## [Unreleased]

### Added

- `--rvtc-panel-max-height`、`--rvtc-detail-min-height`、`--rvtc-detail-content-max-height` 三個 CSS 變數，可覆寫版面高度
- BaseTable、SortTable、TitleTable 透過 ref 開放 `clearSelection`、`toggleRowSelection`、`doLayout`
- BaseTable、SortTable、TitleTable 新增 `error` prop 與 `error`、`empty` slot，可自訂載入失敗與無資料畫面
- BaseTable 新增 `unfixColumnsBelow` prop，視窗寬度小於該值時選取欄、序號欄、操作欄不固定
- BaseTable 新增 `rowLabel` prop，為查看／編輯按鈕加上 aria-label
- BaseDialog、BaseWaringDialog 新增 `dangerSubmit` prop（預設 false），確認鈕改用 danger 色並讓取消鈕取得初始焦點
- BaseDialog 在視窗寬度小於 500px 時頁尾按鈕並排等寬
- SearchableListPanel 新增 `paginationLayout`、`compactPaginationBelow` prop，可自訂分頁 layout 並在窄視窗精簡
- SearchBar 新增 `searchOnInput`、`searchDelay` prop，輸入後延遲自動搜尋
- TransferItem 新增 `draggable` prop（預設 true），false 時不顯示抓取游標
- SortTable 新增 `showSettings`、`showExport` prop（預設 true），可隱藏設定欄位與匯出 Excel 按鈕

### Fixed

- 深色模式下表格表頭、對話框標題列、表格連結色與操作欄按鈕底色改跟隨主題（新增 `--rvtc-table-header-bg`、`--rvtc-table-header-text`、`--rvtc-dialog-header-bg`、`--rvtc-link-text`，淺色外觀不變）
- `/styles/core` 的主題變數引用都加上 fallback，只載 core 時元件跟隨宿主的 Element Plus 主色
- TransferDialog 不再取消勾選沒有 `prop` 的欄位
- TransferDialog 欄位搜尋不分大小寫
- MainPanel、SearchableListPanel、DetailLayout、FilterLayout 的 `click:back` 會帶上返回 payload
- BaseSelector 預設 placeholder 跟隨語系
- BaseSelector 的 option key 改用 value，label 重複時不再出錯
- BaseTable 序號欄標題跟隨語系
- BaseWaringDialog 內容超過兩行不再溢出
- TitleTable 標題列在窄寬度下會換行
- SortTable 的 Excel 圖示在鍵盤聚焦時也會切換狀態，且元件不再依賴 `@/` alias

### Changed

- `vue` peer 下限改成 `^3.3.0`
- 移除 demo 和套件都沒用到的檔案
- TransferDialog 欄位搜尋改為輸入即過濾
- TransferDialog 預設清單不再顯示抓取游標
- TransferItem 按鈕觸控目標至少 44px

## [2.1.0]

- 本檔建立前的版本，變更見 git 歷史。
