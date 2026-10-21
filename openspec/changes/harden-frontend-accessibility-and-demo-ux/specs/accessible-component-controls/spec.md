## ADDED Requirements

### Requirement: Core actions support keyboard activation

BaseTable 的預設查看／編輯、SortTable 的設定／匯出與 FunctionHeader 的返回 SHALL 使用可聚焦的原生按鈕語意、可辨識名稱、可見焦點及 type=button；滑鼠、Enter 與 Space 啟動 SHALL 保留既有事件與 payload，且每次只觸發一次。

#### Scenario: Activate a default action inside a form
- **WHEN** 使用者以 Tab 聚焦任一啟用中的預設操作並用 Enter 或 Space 啟動
- **THEN** 對應事件只發出一次、payload 與滑鼠啟動一致，宿主 form 不被提交，焦點可見

#### Scenario: Consumer owns a custom action slot
- **WHEN** 宿主提供既有自訂操作 slot
- **THEN** 元件保留 slot 內容及事件所有權，不新增重複操作或改寫其 payload

### Requirement: Transfer actions have localized names

欄位解鎖、鎖定、置頂、上移、下移與置底按鈕 SHALL 各有包含動作及欄位名稱的可及性名稱，隨宿主 vue-i18n 語系更新，並保留既有 disabled 規則與事件。

#### Scenario: Change host locale for a named column
- **WHEN** 宿主在 zh-TW 與 en-US 間切換，欄位名稱為「姓名」
- **THEN** 六個按鈕名稱均保留「姓名」並以當前語系區分各動作，圖示不成為額外重複名稱

#### Scenario: Attempt a disabled move
- **WHEN** 第一個欄位的上移／置頂或其他 disabled 動作被嘗試啟動
- **THEN** 不發出對應事件，disabled 狀態可由輔助科技識別

### Requirement: Search naming reaches the input

SearchBar SHALL 為搜尋輸入提供本地化的持續可見 label 並與實際 input 關聯；呼叫端的 id、aria-label 與 aria-labelledby SHALL 到達實際 input，外殼 class／style SHALL 保留既有作用。多個實例 SHALL 有不衝突的 label 關聯，並保留搜尋與清除契約。

#### Scenario: Caller supplies an accessible name and identifier
- **WHEN** SearchBar 啟用搜尋且接到 id 與 aria-label，或接到指向既有標籤的 aria-labelledby
- **THEN** 實際 input 具有指定屬性，可見 label 與該 input 正確關聯，命名不僅停留於外層 div

#### Scenario: Multiple default searches preserve behavior
- **WHEN** 頁面有兩個未指定 id 的 SearchBar，使用者輸入帶前後空白的搜尋值、按 Enter 再清除
- **THEN** 兩個 input 與其可見 label 的 id 關聯各自唯一穩定，搜尋仍輸出 trim 後值、清除仍發出既有事件

### Requirement: Compact icon actions provide usable targets

FunctionHeader 返回及 SortTable 匯出的外部按鈕操作區 SHALL 至少為 44×44 CSS px，保留原圖示視覺尺寸、可見焦點且不遮擋鄰近操作。此尺寸是本 change 的易用性要求。

#### Scenario: Use icon actions in a narrow toolbar
- **WHEN** 在窄容器以觸控或鍵盤操作返回／匯出
- **THEN** 操作區至少 44×44 CSS px，不與鄰近目標重疊，且原事件與焦點樣式仍可用
