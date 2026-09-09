## ADDED Requirements

### Requirement: Host locale controls component text
元件文字 SHALL 使用宿主 vue-i18n 的 locale 與合併後 messages。

#### Scenario: Reactive language switch
- **WHEN** 宿主在 zh-TW 與 en-US 間切換
- **THEN** 表格空資料、搜尋與對話框文字在不重新掛載元件下更新

### Requirement: Pagination inherits or overrides provider locale
分頁 SHALL 在沒有 locale prop 時繼承宿主 Element Plus provider，明確 prop 僅覆寫自身。

#### Scenario: Provider inheritance
- **WHEN** 宿主 provider 切换英文且未提供分頁 locale prop
- **THEN** 分頁使用英文

#### Scenario: Local override
- **WHEN** 宿主為英文且分頁 locale prop 為繁體中文
- **THEN** 該分頁使用繁體中文，其他元件維持宿主設定

### Requirement: Legacy locale exports remain available during migration
套件 SHALL 保留既有內部語系 API 的入口與用途，標示 deprecated 並清楚說明其不控制宿主元件文字。

#### Scenario: Existing imports continue compiling
- **WHEN** 舊使用端 import setLocale 或套件 useI18n，或傳 plugin locale option
- **THEN** 原入口仍存在，文件提供改用宿主 createI18n/messages 的範例
