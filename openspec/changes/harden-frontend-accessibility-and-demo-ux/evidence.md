# Apply 證據（2026-10-20–2026-10-21）

目前已完成第 1–7 節的實作與非瀏覽器驗證。2026-10-21 經本次授權執行部分瀏覽器檢查，之後依使用者指示停止額外驗收流程；第 8 節仍保持未完成，本 change 未歸檔。使用者已要求收尾、commit 與 push；沒有升版、發布或部署。

## 邊界與基線

- 使用原有 `/Users/ray.shao/template` checkout，沒有建立 worktree、reset 或刪除前序修改。起始 tracked diff 與狀態保存在 `/tmp/template-a11y-baseline/existing.diff`、`status.txt`；前序未追蹤範例與安裝測試保留。
- 沒有修改 `harden-component-library-contracts` change、package exports、library externals、安裝入口、公開事件名稱或 payload。沒有新增依賴或修改 lockfile。
- 受影響的共用路徑：BaseTable → SortTable／TitleTable；FunctionHeader → MainPanel → SearchableListPanel／DetailLayout／FilterLayout；SearchBar → 搜尋 demo、列表及 TransferDialog；transferItem → TransferDialog。既有 column template、expand、firstButton 等 caller／slot 維持所有權。
- 盤點了公共型別、zh-TW／en-US 訊息、18 份 canonical consumer 來源、文件與 live demo、Element Plus resolver／locale provider、全域及套件樣式和測試。
- 當前 checkout 的基線重新通過 lint、type-check、12 檔／59 tests、lib/demo build、check:package 與 check:release-boundaries。沒有沿用歷史驗證結果。基線完整 logs 位於 `/tmp/template-a11y-baseline/`。

## 實作與相容性

| 範圍 | 修改與對應證據 |
| --- | --- |
| 鍵盤操作 | BaseTable 查看／編輯、SortTable 設定／匯出與 FunctionHeader 返回使用 type=button 的原生按鈕；明確可見 focus。AccessibleControls 驗證可聚焦 DOM、單次 click、row identity、返回三種 payload 與 consumer 自訂操作。原生 Enter／Space 預設行為仍待瀏覽器。 |
| transfer 名稱 | 六個動作以宿主 i18n 的動作＋欄位 label 命名；圖示 aria-hidden。涵蓋 zh-TW → en-US → zh-TW 及鎖定、首尾移動 disabled 邊界；disabled 原生 click 不發事件。 |
| 搜尋 | SearchBar 將 id、aria-label、aria-labelledby 送至真實 input，保留外殼 class／style、其他 attrs／listeners。可見搜尋 label 使用宿主語系；未傳 id 時，以每實例 uid 建立穩定唯一關聯。BaseInput 停用自動 attrs 繼承，保留明確轉送，避免鍵盤 listener 重複。沒有新增 props；SearchExample 示範命名。 |
| 主題／對比 | 增加 control 色票，用於文字與按鈕背景，保留裝飾 status 色。加強 BaseBtn 選擇器，避免 Element Plus plain／link／text 規則蓋回較淺文字；text hover 保留深字。demo base.css 明確 color-scheme: light，移除 prefers-color-scheme 覆寫。 |
| live demo | MainPanel 四組內容都經 main slot 呈現，第一組直接掛載 MainPanelExample 並展示同一份 raw source。FunctionHeader 移除無效副標題、麵包屑與 depth 展示，保留 title、showBack 三種值、default slot、back payload；完整例直接掛載 HeaderExample 並展示同一來源。depth 公開欄位仍保留，型別註解說明目前不影響行為。 |
| 分頁 | 仍使用同一個 ElPagination 與宿主 page／limit；5 個 pager 項目、容器與 pager／jumper 可換列，保留 total、sizes、jumper。MainPanel footer 可重排。沒有 resize 狀態或第二個分頁模型。覆蓋三態可見性、百萬筆總數、翻頁／大小、locale 覆寫及切換不重複事件／不重設狀態。 |
| 操作區 | 返回／匯出外部按鈕 min-width／min-height 44px；返回 16px、匯出 24px 圖示保留，工具列可換列。FunctionHeader 保留 60px 最小高度，讓較高內容擴張。此為樣式定義證據，非實際盒尺寸或相鄰目標驗收。 |
| demo 引入 | 移除 main.ts 的 ElementPlus 全量 plugin、完整 CSS 與無 caller 的 elementLocale provide；App.vue 的響應式 ElConfigProvider 繼續擁有 Element Plus 語系。沿用 resolver 處理元件、loading directive 與所需 CSS。未找到訊息／通知／MessageBox／loading service 的直接 caller；對話框使用 ElDialog。 |
| 範例來源 | demo 的 Vite／TypeScript self alias 指向本地公開 components 入口；兩個實際掛載的 canonical 來源納入 app 型別清單。tarball consumer 仍獨立安裝套件，沒有使用 repo alias、symlink 或 NODE_PATH。 |

外觀相容性影響：按鈕 DOM 及色彩配對、搜尋區可見 label、分頁排列和圖示點擊區有所調整。SearchBar 的 id／ARIA 命名現在屬於 input；宿主若曾用外殼 id 定位 CSS／DOM，應改用 class。自訂宿主色票與任意覆寫不在本次對比計算保證範圍。

## 對比證據

`ThemeContract.test.ts` 讀取實際 SCSS tokens、編譯 BaseBtn SCSS，解析 normal／filled 與 hover 配對，再用線性 sRGB 相對亮度計算。focus 沿用 normal 配對；focus＋hover 使用 hover 配對。未以 disabled 作對比門檻。

| BaseBtn | 一般／填色 normal、outlined hover（對白色） | filled hover（對白色） |
| --- | --- | --- |
| primary | #0072bc：5.08:1 | #005b96：7.15:1 |
| success | #357a1c：5.31:1 | #2a6116：7.45:1 |
| warning | #8a570b：6.09:1 | #6e4609：8.26:1 |
| danger | #c23030：5.59:1 | #9b2626：7.78:1 |
| info | #606266：6.11:1 | #4d4e52：8.31:1 |

同一測試也計算 link hover 對白色、text hover 對 #f5f7fa，全部 ≥4.5:1。首頁白字 CTA normal／hover／focus 的配對：

| CTA | normal／focus | hover |
| --- | --- | --- |
| 查看示範 | #4566a8：5.65:1 | #3b486f：8.96:1 |
| 安裝套件 | #006b47：6.57:1 | #005437：9.04:1 |
| GitHub | #667493：4.68:1 | #3b486f：8.96:1 |

這些是實色 token／樣式計算，不是瀏覽器最終 cascade 量測。建置後也直接檢查 library CSS，不包含 demo 的 color-scheme: light、prefers-color-scheme 或 --vt-c-* 規則。

## 初始載入量測

同一 Node 22.16.0、npm、lockfile、Vite production 設定，before／after 均執行 `npm run build-demo -- --manifest`。以 `node measure-demo.mjs`（從 repo root 執行完整 change 路徑）讀取 Vite manifest，遞迴走訪 imports 並去重；初始 modulepreload 也納入。以 node:zlib gzipSync 預設值逐檔 gzip 後相加，不是把全部檔案串接壓縮。script 有循環／共用依賴的 assert 自查。

- `bootstrap`：HTML entry、所有遞迴靜態 import 與 modulepreload。
- `homepage`：上述集合加上首頁實際需要的動態 HomeLayout、HomePage 及其所有靜態依賴，避免漏算初始路由成本。
- `routes`：各動態入口本身的依賴閉包加 bootstrap，未另加其他動態父路由；不是瀏覽器的整條路由流量。
- `allCss`：全部 manifest CSS 及各 entry.css 引用去重，包含非獨立 CSS manifest 項目；before 彙整保存的逐檔與各路由閉包成本。

| 範圍 | before 原始 bytes | after 原始 bytes | before gzip bytes | after gzip bytes |
| --- | ---: | ---: | ---: | ---: |
| bootstrap JS | 1,091,895 | 227,722 | 362,739 | 86,253 |
| homepage 全依賴 JS | 1,094,685 | 247,212 | 364,438 | 93,085 |
| bootstrap CSS | 370,419 | 38,466 | 51,825 | 7,746 |
| homepage CSS | 371,125 | 39,383 | 52,095 | 8,169 |
| 全部 CSS（含動態路由） | 511,995 | 182,223 | 71,415 | 27,777 |

首頁 JS 原始量降低 77.42%，gzip 降低 74.46%。完整首頁逐檔清單、環境／lockfile hash、動態入口及 CSS 成本保存在 [bundle-before.json](bundle-before.json) 與 [bundle-after.json](bundle-after.json)。沒有調高 chunk warning threshold、改 library exports 或以單一最大 chunk 代替全依賴總量；未量測 LCP／INP 或真機耗時。

## 驗證結果

| 檢查 | 實際結果 |
| --- | --- |
| npm run lint | 通過，0 errors／warnings |
| npm run type-check | 通過 |
| npm run test:unit:ci | 16 檔／76 tests 通過；比基線新增 17 項 |
| npm run build-lib | ESM／CJS 多入口、declarations、CSS 通過 |
| npm run build-demo -- --manifest | production build 通過；保留完整依賴量測 |
| npm run check:package | 使用 /tmp/template-npm-cache、prefer_offline；乾淨 tarball consumer 通過 18 份 canonical 來源、10 個公開入口、ESM／CJS 及八組 root／components 獨立安裝／匯入順序檢查 |
| npm run check:release-boundaries | 隔離 fixture／stub 檢查通過，沒有真實發布／tag／push |
| production resolver 檢查 | 以 Vite production build API（write:false，沒有啟動 server／browser）檢查 SFC 主模組及 script 子模組：loading directive、table、input、dialog、pagination、provider 與各自 CSS 都已轉成實際 imports；[production-imports.json](production-imports.json) 保存結果 |
| 按需整合 | DemoImports 只註冊具名 Element Plus 元件／loading directive，未安裝整包 plugin；實際 JSDOM 驗證表格／dialog loading、dialog 內容／取消、搜尋 trim、分頁、宿主文字與 Element Plus 語系切換，沒有無法解析的 component／directive 警告 |
| OpenSpec／diff | `openspec validate harden-frontend-accessibility-and-demo-ux --strict`、`git diff --check` 通過 |

完整當前 logs：`/tmp/template-a11y-final/`。開發過程曾有測試框架設定失敗（多次 enableAutoUnmount、Teleport stub 沒呈現 slot、Element Plus input id 需等待 mounted tick）、canonical app 型別清單缺漏，以及 production 檢查起初只讀 SFC 外殼；均已修正，最後對應檢查通過。

保留的提示：Browserslist 資料過期、consumer 的 vue-i18n 10 維護提示／較大 chunk，以及 lib 空 types chunk／混用 named-default exports。Impeccable detector 回傳一項既有 MainPanelDemo 紫色配色 warning（exit 2），本次依保留既有視覺的範圍未改其範例配色；不是 lint／功能測試失敗。

## 未執行與恢復限制

2026-10-20 未執行瀏覽器。2026-10-21 使用者明確授權本次瀏覽器驗收後，曾以 in-app browser 檢查實際 dev／production demo：搜尋 trim、清除後恢復、翻頁、每頁筆數、loading、對話框內容／取消及中英文切換正常。原生 Tab 可聚焦查看按鈕，focus-visible 有 2px 藍色 outline；Enter／Space 分別產生一筆查看事件。也觀察到返回操作區為 44×44px。

桌面放大文字的部分檢查發現每頁筆數選單固定寬度造成「25…」截斷；共用分頁現改為 `max(128px, 9em)`，保留容器最大寬度，文字放大後可顯示完整選項。這次文字放大透過測試頁逐元素放大字級，不是原生瀏覽器 zoom。臨時測試頁的事件計數與按鈕配色檢查只屬部分輔助證據，不代表完整驗收；該頁並非專案既有 QA 流程，已依使用者要求刪除，不納入提交。

使用者明確表示不需要 mobile 版型。先前發現的手機頁首排列問題未納入修正；原有展示頁版型保持原狀。瀏覽器環境確實呈現深色偏好，但 iframe 的淺色偏好設定沒有使實際 matchMedia 訊號切換，因此淺／深偏好矩陣不能宣稱通過。

後續已停止瀏覽器操作並關閉本次新增的 preview 程序；沒有執行 Cypress 或包含它的 `npm run verify`。第 8 節仍未完整涵蓋最終色彩矩陣、全部目標／相鄰間距、完整文字放大及 disabled 行為；不宣稱全面 WCAG、真機觸控或正式環境驗收通過。遠端 CI、部署與正式發布亦未驗證。若回復本次修改，需逐段回復本 change，以保留前序已完成的契約整理。

## 2026-10-21 提交前收尾

保留前序 table family／單項安裝／canonical examples 修改，與本次可及性、demo 契約與載入成本修正一併提交。獨立驗收頁已刪除；沒有新增 mobile 版型，也沒有繼續操作瀏覽器。第 8 節兩項保持未完成，change 不歸檔。

本次重新執行 lint、type-check、16 檔／76 項單元測試、lib/demo build、tarball consumer、release-boundary 檢查、OpenSpec strict validation 與 diff 檢查。完整 logs 位於 `/tmp/template-handoff-final/`；bundle-after.json 已依最後的分頁選單字級修正重新量測。未跑 Cypress／完整 verify、遠端 CI 或部署驗收。
