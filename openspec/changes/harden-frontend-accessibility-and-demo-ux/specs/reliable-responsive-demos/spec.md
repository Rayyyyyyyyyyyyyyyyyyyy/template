## ADDED Requirements

### Requirement: Live demos match supported component contracts

MainPanelDemo 與 FunctionHeaderDemo SHALL 僅示範目前公開且有效的 props、slots 與事件；所有保留的主要展示內容 SHALL 實際呈現。已有對應 canonical example 的完整使用範例 SHALL 重用該來源，展示與複製內容 SHALL 一致。

#### Scenario: Render all MainPanel examples
- **WHEN** 掛載 MainPanelDemo 的四個展示
- **THEN** 每個展示以 main slot 呈現預期主要內容，既有 searchBar／footer 與返回契約正常

#### Scenario: Learn the FunctionHeader contract
- **WHEN** 使用者閱讀並操作 FunctionHeaderDemo
- **THEN** 文件及範例只承諾實際生效的功能，不再把 sub-title、breadcrumbs 或未生效的 depth 效果描述成可用能力，back payload 保持既有契約

### Requirement: Pagination adapts without losing functions

SearchableListPanel 分頁 SHALL 適應窄容器，包含 320px、375px、768px 與桌面寬度以及 200% 文字放大；分頁本身 SHALL 不造成頁面水平溢出、遮擋或不可達控制。當前頁、前後頁、總筆數、每頁筆數與跳頁功能 SHALL 仍可取得，並保留 showPagination 三態、page／limit 資料、事件與語系契約。

#### Scenario: Operate pagination in a narrow container
- **WHEN** 繁中或英文介面在上述寬度及文字放大情境顯示大量頁數與長總筆數
- **THEN** 分頁可換列或重新配置，所有分頁功能仍可操作且無自身造成的頁面水平溢出

#### Scenario: Keep controlled state and locale ownership
- **WHEN** 使用者變更頁碼／每頁筆數，或宿主切換 locale／傳入局部 locale 覆寫
- **THEN** 維持既有 updatePage／updatePageSize payload、宿主控制狀態及 locale 優先序，不因配置切換額外重設或重複發出事件

#### Scenario: Honor explicit pagination visibility
- **WHEN** showPagination 為未提供、true 或 false，且總筆數分別為零或非零
- **THEN** 顯示規則仍遵循既有三態契約，不因窄容器策略改變
