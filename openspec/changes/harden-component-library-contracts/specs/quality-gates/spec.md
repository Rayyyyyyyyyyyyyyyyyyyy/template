## ADDED Requirements

### Requirement: Pull requests and releases verify the consumer contract
專案 SHALL 在 PR 與發布前使用共用驗證命令，涵蓋非寫入 lint、型別、核心行為、lib/demo 建置與 tarball 消費測試。ci.yml、publish.yml、prepublishOnly 與 release.sh SHALL 接入此門檻；共用驗證不得觸發發布或遞迴呼叫自身。

#### Scenario: Broken public entry blocks validation
- **WHEN** 公開入口指向缺失檔案或 consumer fixture 無法編譯
- **THEN** 驗證失敗，發布工作不得進入 npm publish

#### Scenario: Checks preserve source
- **WHEN** 執行 CI 的 lint/check 指令
- **THEN** 不自動修正或格式化 tracked 原始碼

#### Scenario: Local publish stops on validation failure
- **WHEN** 一般 npm publish 觸發 prepublishOnly，且共用驗證失敗
- **THEN** lifecycle 回傳非零狀態，發布不繼續；驗收以隔離測試模擬流程，不實際發布

#### Scenario: Release script checks before version changes
- **WHEN** release.sh 的共用驗證失敗
- **THEN** 在 npm version、建立 tag 或 git push 前停止，原版本與遠端保持不變

#### Scenario: Consumer packing does not reenter validation
- **WHEN** 共用驗證完成建置並產生 consumer 用 tarball
- **THEN** 內部 pack 使用已建置產物且不執行 lifecycle scripts，不重入 gate、發布或升版流程

### Requirement: Demonstrations accurately represent their behavior
文件與 E2E SHALL 使用實際首頁及可執行範例，區分 mock 示範與已完成資料操作。

#### Scenario: Demo smoke journey
- **WHEN** E2E 開啟首頁並進入核心元件示範
- **THEN** 驗證實際頁面標題和元件可見，不依賴 Vue 初始模板文字

#### Scenario: Search and pagination example
- **WHEN** 文件示範搜尋、換頁或欄位保存
- **THEN** 範例實作對應的本地資料變化，或明確標示僅展示事件；不宣稱已接 API 或持久化
