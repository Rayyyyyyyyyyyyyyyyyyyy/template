## ADDED Requirements

### Requirement: Active control text has sufficient contrast

首頁 CTA 與 BaseBtn 的一般尺寸可操作文字 SHALL 在 normal、hover、focus 狀態具有至少 4.5:1 的前景／背景對比，包含 primary、success、warning、danger 的受影響配對；修改 SHALL 保留既有語意色名稱及 disabled 行為。

#### Scenario: Render an enabled control on its supported surface
- **WHEN** 首頁 CTA 或受影響的 BaseBtn 以啟用狀態呈現或進入 hover／focus
- **THEN** 文字在最終背景上的對比至少為 4.5:1，且焦點仍可辨識

### Requirement: Demo uses a coherent light theme

Demo SHALL 明確採用成對的淺色表面與文字色；系統深色偏好 SHALL 不使首頁、文件中心或安裝指南的文字與固定淺色卡片衝突。此 demo 策略 SHALL 不強制覆寫套件宿主的全域主題。

#### Scenario: Read documentation with a dark system preference
- **WHEN** 使用者的 prefers-color-scheme 為 dark 並讀取文件中心或安裝指南
- **THEN** 頁面仍以一致的淺色主題呈現，一般文字對其背景的對比至少為 4.5:1

#### Scenario: Consume the library in a host application
- **WHEN** 宿主只匯入公開套件入口與套件樣式
- **THEN** demo 的 body／color-scheme 規則不被套用至宿主全域
