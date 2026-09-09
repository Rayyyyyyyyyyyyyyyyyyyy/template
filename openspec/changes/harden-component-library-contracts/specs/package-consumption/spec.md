## ADDED Requirements

### Requirement: Published entries resolve from an installed package
套件 SHALL 讓所有宣告的 runtime、types 與資產入口在 tarball 消費專案中解析，不依賴本 repo 的 alias、未打包檔案或偶然的傳遞依賴。

#### Scenario: Clean consumer imports public entries
- **WHEN** 建置後的 tarball 安裝至最小 Vue 消費專案
- **THEN** root、components、utils、locales 的有效 runtime 入口與公開型別通過編譯，CSS、SCSS 與 Tailwind preset 可載入

#### Scenario: Declared module formats work
- **WHEN** 消費端使用 exports 中宣告的 import 或 require
- **THEN** 各格式可載入，且不因 package type 與副檔名不符而失敗

### Requirement: Package content and compatibility are explicit
套件 SHALL 保留既有有效 subpaths，清除測試等不需發布的檔案，並查證 utils/styles 的歷史契約後恢復或記錄移除原因。

#### Scenario: Artifact inventory is checked
- **WHEN** 產生發布用 tarball
- **THEN** 自動檢查不存在指向缺失檔案的 exports，且封包不含元件測試；有效既有入口保持可用
