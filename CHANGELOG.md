# Changelog

## [Unreleased]

### Added

- `--rvtc-panel-max-height`、`--rvtc-detail-min-height`、`--rvtc-detail-content-max-height` 三個 CSS 變數，可覆寫版面高度

### Fixed

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
