## Context

本 change 承接 2026-10-20 Impeccable audit。基礎契約已在目前工作目錄收斂：table family 共用能力、18 份 canonical examples、root 與 `/components` 單項安裝。這些既有修改尚未提交，實作不得覆蓋或回退；既有 `harden-component-library-contracts` change 不在此次整理範圍。

以下保存 audit 的可追溯摘要，避免依賴暫存報告。路徑均相對 repo root；編號對應 tasks.md。

| Audit | 證據與位置 | 修正階段 |
| --- | --- | --- |
| P1-1 鍵盤 | `src/components/tables/SortTable.vue` 設定／匯出為 div；`BaseTable.vue` 查看／編輯為 p；`src/components/layout/FunctionHeader.vue` 返回直接點擊 icon。SortTable JSDOM 兩項操作 tabIndex=-1。 | 2 |
| P1-2 名稱 | `src/components/transfer/transferItem.vue` 六個圖示按鈕在 JSDOM 中無文字、aria-label 或 title。 | 2 |
| P1-3 搜尋 | `src/components/items/SearchBar.vue` 的 aria-label 落在外層 div；實際 input 無該命名或 label 關聯。placeholder 可能提供後備名稱，不能宣稱完全無名。 | 2 |
| P1-4 對比 | `src/views/HomePage.vue` 白字／#6785c1=3.68、白字／#00b176=2.78；`BaseBtn.vue` success／warning／danger 文字對白底=2.24／2.19／2.90。數值來自實色 sRGB 計算，限一般可操作文字。 | 3 |
| P1-5 主題 | `src/assets/base.css` 的自動深色 body 文字與文件／安裝頁固定淺色表面混用；推導可能約 1.12:1，尚無最終 cascade 量測。 | 3 |
| P1-6 Demo | `src/views/demo/MainPanelDemo.vue` 四處傳 default slot，但 MainPanel 只呈現 main；JSDOM 確認 default 內容缺失。`FunctionHeaderDemo.vue` 宣稱未實作的 sub-title／breadcrumbs 等能力。 | 4 |
| P2-7 分頁 | `SearchableListPanel.vue` 固定完整 layout；MainPanel footer 無窄容器策略。屬溢出風險，尚未實測範圍。 | 5 |
| P2-8 操作區 | 返回 icon 16px、SortTable 匯出圖片 24px，外層無足夠 min-size／padding；尚未量測相鄰間距。 | 5 |
| P2-9 載入 | `src/main.ts` 全量 app.use(ElementPlus)，Vite 已有 resolver。audit 的 demo build 共用初始 chunk 為 1,091.90 kB／gzip 362.74 kB，入口直接依賴它；此數字不是完整初始依賴總量。 | 6 |

未操作瀏覽器。JSDOM 不提供可靠的版面、可及性樹或原生鍵盤預設行為驗證；audit 也沒有 LCP、INP 或真機耗時資料。

## Goals / Non-Goals

**Goals:** 關閉九項 audit 缺口；讓互動、範例、主題與初始載入具備可驗收要求；保留公開 API、事件與語系所有權。

**Non-Goals:** 新增業務功能、全面改版、新增完整深色模式、任意擴充公共 props、引入依賴、拆分套件、發布，以及宣稱 WCAG 全面合規或 Core Web Vitals 通過。

## Decisions

1. **沿用 BaseBtn／原生 button 的鍵盤語意。** 設定、匯出、查看、編輯與返回維持現有事件與 payload，每次啟動只發出一次；明確 type=button，保留可見 focus 與 disabled 行為。避免以 div 加 tabindex、role 及兩套鍵盤 handler 重建按鈕，減少 Enter／Space 重複觸發風險。確認 consumer 自訂的操作 slot 不被額外包裝或改寫。
2. **命名由實際控制項承接。** transfer 六個動作使用宿主 vue-i18n 翻譯並帶入欄位名稱；圖示是裝飾。SearchBar 明確轉送 `id`、`aria-label`、`aria-labelledby` 至 BaseInput 的真實 input，class／style 仍作用於外殼，其他既有 attrs 保持語意；不將所有 attrs／listeners 盲目轉送。提供本地化的持續可見搜尋 label 並關聯 input；若需新增 label 覆寫能力，限相容的可選 prop，無指定 id 時產生每實例唯一且穩定的 id。保留 Enter trim 與清除事件，不讓按鈕或 label 意外提交宿主 form。
3. **保留色系，修正用途。** 將文字用途與裝飾色區分，透過既有語意色／樣式調整前景與背景配對，覆蓋 normal、hover、focus；一般文字達 4.5:1。不直接把所有 success／warning／danger 裝飾色改深，也不拿 disabled 對比作此輪的通過門檻。demo 明確採淺色 body／表面／文字，移除模板半套 prefers-color-scheme 影響；不讓 demo 主題策略洩漏成套件強制全域主題。
4. **修範例，不用錯誤範例發明功能。** MainPanelDemo 改用 #main；FunctionHeaderDemo 僅展示目前真正生效的 title、showBack、slot 與 back 行為，移除 sub-title／breadcrumbs／未生效 depth 效果等敘述。已存在相符 canonical example 時直接重用，展示與複製來源一致；需要擴充時更新同一來源。對保留的每個展示驗證關鍵內容與事件，避免只斷言 wrapper 存在。
5. **先讓分頁容器可重排。** 優先沿用 Element Plus 與 CSS 的容器適應／換列；必要時才拆分次要控制列，不新增一套分頁資料模型。窄容器保留前後頁／當前頁，總筆數、每頁筆數與跳頁仍可操作；維持 showPagination 三態、宿主控制的 page／limit、事件 payload 與 locale 覆寫。返回與匯出按鈕採至少 44×44 CSS px 外部操作區，圖示保留原尺寸；這是本 change 的易用性目標，WCAG AA 2.5.8 是 24×24 且有例外，不能混為同一標準。
6. **只優化 demo 的引入成本。** 先追蹤既有 resolver、全域註冊、loading directive、訊息／對話框服務與 locale provider 的使用點，再移除冗餘全量註冊。對比同環境、同量測方法的 before／after：首頁入口與所有靜態 import、modulepreload 的初始 JS 去重總位元組與逐檔 gzip 總量；動態路由另列。兩項初始總量均須降低，且不得只是調高 chunk warning、改名或拆分同樣初始載入的 chunk。沿用現有工具輸出／最小量測，不引入 bundle 分析依賴；CSS 成本另外記錄。不要為 demo 縮包改動 library externals、exports 或宿主安裝契約。
7. **分層驗證並如實保留待驗收項。** 非瀏覽器層覆蓋控制項 DOM／命名、事件與 disabled、宿主語系切換、範例內容、token 對比、build 與 tarball consumer。原生 Tab／Enter／Space、可及性名稱計算、最終色彩、斷點、觸控區需瀏覽器驗收。依使用者 AGENTS 規範，未明確授權不得啟動任何瀏覽器或 `npm run verify`（包含 Cypress）；以獨立非瀏覽器命令執行允許的檢查，不修改 gate 來掩蓋未跑的項目。

## Risks / Trade-offs

- 操作元素換成 button 改變預設樣式或觸發 form submit → 明確 type、沿用既有樣式，驗證事件一次及 focus；實際焦點行為仍待授權驗收。
- 新增可見 label／放大點擊區壓縮工具列 → 採換列與合理間距；驗收窄容器，不以縮小操作區解決。
- 語意色調整影響套件消費者外觀 → 限必要文字與實心背景配對，記錄相容性；不更改公開 color 名稱。
- 移除全量 Element Plus 可能漏掉執行期服務／directive → 先盤點 caller，再以實際元件整合與 lib／consumer 驗證守住功能。
- 尚無瀏覽器授權 → 實作可完成允許的檢查，但瀏覽器驗收 task 保持未完成，交付不得宣稱九項已全部驗證或將 change 當作完整驗收後歸檔。

## Migration Plan

按 tasks.md 執行：基線 → P1 控制項／可讀性／範例 → P2 分頁與操作區 → demo 載入 → 回歸與驗收。保留未提交的前序工作；不改既有 change 或主規格。沒有資料遷移與部署；如需回復，僅回復本 change 的對應實作，不回退整個工作目錄。

## Open Questions

- 窄容器實際溢出範圍與最終 cascade：等待本次瀏覽器檢測的明確授權後量測，不能把程式碼推導當實測。
- 按需引入後可達到的具體縮減幅度：以第 6 階段量測決定，暫不承諾任意百分比或 Core Web Vitals 結果。
