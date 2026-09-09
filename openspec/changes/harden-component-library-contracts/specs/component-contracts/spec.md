## ADDED Requirements

### Requirement: Public types share the implementation contract
元件庫 SHALL 由共同來源生成公開 props、emits、slots declarations，並保留既有公開型別名稱、路徑及合法使用形狀；macro 與公開型別可由同一來源衍生不同的相容表示。

#### Scenario: Consumer type checks
- **WHEN** 消費端使用核心表格泛型、事件、expand slot 與對話框 props
- **THEN** 合法範例通過型別檢查，錯誤 payload 或 props 的反例被拒絕

#### Scenario: Legacy emits shapes remain compatible
- **WHEN** 消費端使用 BaseTableEmits<Row>['selection-change'] 取得 handler 型別，或以既有 BaseDialogEmits callable 傳入事件名稱
- **THEN** 合法舊用法仍通過編譯，錯誤事件名稱或 payload 的反例仍被拒絕

### Requirement: Dialog width respects explicit configuration
BaseDialog SHALL 優先使用 customWidth；未傳時依視窗寬度使用既有預設。

#### Scenario: Explicit width
- **WHEN** customWidth 為 720px
- **THEN** 傳給底層對話框的 width 為 720px

#### Scenario: Default width
- **WHEN** 未提供 customWidth
- **THEN** 視窗小於 500px 時 width 為 100%，其餘為 50%

### Requirement: Pagination visibility supports an explicit override
SearchableListPanel SHALL 區分缺省、true、false，明確覆寫優先於 totalCount。

#### Scenario: Explicit visibility
- **WHEN** showPagination 明確為 false 或 true
- **THEN** 分別隱藏或顯示分頁，不受 totalCount 影響

#### Scenario: Automatic visibility
- **WHEN** 未提供 showPagination
- **THEN** 僅 totalCount 大於零時顯示分頁

### Requirement: Core events and column drafts retain their contract
核心元件 SHALL 將選擇、排序、換頁與確認事件傳回宿主；TransferDialog 的未提交草稿不得改寫宿主 columns。搜尋 SHALL 僅影響顯示集合，不得刪除完整草稿中的欄位或重設未提交修改。

#### Scenario: Column confirmation and cancellation
- **WHEN** 使用者調整欄位後取消或確認
- **THEN** 取消保留宿主原始資料，確認事件含修改後的欄位順序與 checkActive

#### Scenario: Search and confirm retain all columns
- **WHEN** 使用者搜尋部分欄位、修改勾選後確認
- **THEN** 提交包含完整欄位集合、最新 checkActive 與順序，未匹配搜尋的欄位不消失

#### Scenario: Clearing search preserves draft edits
- **WHEN** 使用者調整排序與勾選後搜尋，再清除或更換搜尋關鍵字
- **THEN** 完整草稿保留未提交排序與勾選，顯示集合依新關鍵字更新，不從宿主資料重設草稿

#### Scenario: Cancel and reopen discard only the draft
- **WHEN** 使用者搜尋並修改欄位後取消，再重新開啟對話框
- **THEN** 未提交修改不影響宿主，重新開啟時顯示由最新宿主 columns 建立的完整草稿

#### Scenario: Table and pager events
- **WHEN** 使用者選取列、排序或切換頁碼/頁大小
- **THEN** 對應公開事件攜帶既有契約 payload，宿主仍負責資料更新
