## Why

2026-10-20 的 Impeccable 程式碼／CSS／JSDOM audit 發現六項 P1 與三項 P2：核心操作缺少鍵盤路徑、控制項名稱不完整、文字與主題可讀性不足，以及 live demo 契約漂移、分頁適應性與首次載入成本問題。既有封包與型別驗證無法涵蓋這些介面缺口，需要建立可逐項驗收的修正契約。

## What Changes

- 讓表格與返回操作具備原生按鈕語意、可辨識名稱與可見焦點；補齊欄位移動／鎖定動作的本地化名稱，以及搜尋輸入的命名與標籤關聯。
- 修正一般可操作文字的對比，讓 demo 採一致的明確淺色主題，避免系統深色文字與固定淺色表面衝突。
- 將 MainPanel 與 FunctionHeader 的 live demo 對齊現有公開契約與 canonical examples；以內容掛載驗證防止空展示及不存在的功能說明。
- 為分頁提供窄容器策略，擴大返回／匯出圖示的操作區，保留事件、資料與語系行為。
- 減少 demo 首次載入的 JavaScript；沿用現有依賴與按需引入工具，量測初始依賴總量並驗證 Element Plus 功能。
- 明確區分靜態／JSDOM 證據與需另外授權的瀏覽器驗收；不以 build 成功宣稱視覺或實際鍵盤行為通過。

## Capabilities

### New Capabilities

- `accessible-component-controls`: 鍵盤、控制項名稱、搜尋標籤與圖示操作區。
- `readable-demo-theme`: 可操作文字對比與一致的 demo 淺色主題。
- `reliable-responsive-demos`: live demo 契約、主要內容呈現與窄容器分頁。
- `demo-loading-efficiency`: demo 初始 JavaScript 量測與功能不退步的按需載入。

### Modified Capabilities

無。`openspec/specs/` 尚無主規格；既有 `harden-component-library-contracts` change 保持原狀，本 change 以目前工作目錄中已完成的契約收斂為實作基礎，新增上述介面要求。

## Impact

- 元件：BaseTable、SortTable、FunctionHeader、transferItem、SearchBar、BaseInput、BaseBtn、SearchableListPanel、MainPanel；共同型別與語系僅隨必要的相容性增補更新。
- Demo：首頁、文件／安裝頁、MainPanelDemo、FunctionHeaderDemo、全域樣式、Tailwind 語意色與 demo 的 Element Plus 引入方式。
- 驗證：沿用既有元件測試、canonical consumer examples、封包安裝契約及 lib/demo 建置，補對應缺陷的最小有效測試與量測紀錄。
- 保留既有公開名稱、import 入口、事件與 payload、table family 共同行為及 root／components 的單項安裝能力；不新增依賴、不新增深色模式、不重新設計全站、不升版或發布。
