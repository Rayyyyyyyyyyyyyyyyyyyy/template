## ADDED Requirements

### Requirement: Demo reduces measured initial JavaScript cost

Demo SHALL 在相同環境與方法下記錄修正前後 production build 的首頁初始 JavaScript 去重總位元組與逐檔 gzip 總量，涵蓋入口、遞迴靜態 import 與初始 modulepreload；修正後兩項總量 SHALL 均低於修正前。動態路由及 CSS 成本 SHALL 另外記錄，不以單一 chunk 名稱或 warning threshold 代替量測。

#### Scenario: Compare equivalent production builds
- **WHEN** 比較相同 lockfile、Node 版本、build 設定與 gzip 方法的修正前後產物
- **THEN** 紀錄可追溯至各初始依賴檔，初始 JS 原始與 gzip 總量均下降，且不將拆成更多初始 chunk 誤算為縮減

### Requirement: On-demand loading preserves component integration

Demo 的引入調整 SHALL 保留實際使用的 Element Plus 元件、loading directive、訊息／對話框服務與動態語系行為；library exports、依賴邊界、root／components 單項安裝及 canonical consumer examples SHALL 保持相容。

#### Scenario: Exercise demo integrations after import changes
- **WHEN** 以 production 設定建置並驗證表格 loading、搜尋、分頁、對話框與語系切換
- **THEN** 所有使用到的元件、directive 與服務均可解析，沒有因移除全量註冊而失效

#### Scenario: Install the packed library independently
- **WHEN** 乾淨 consumer 從 tarball 使用既有公開入口及 canonical examples，並以兩種入口及不同匯入順序單項安裝
- **THEN** 型別、建置與安裝檢查通過，demo 縮包未改變套件使用契約
