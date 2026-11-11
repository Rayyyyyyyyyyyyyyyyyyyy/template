# 升級計劃書：rayyy-vue-table-components 作為 plugin

建立日期：2026-11-11　基準：`main` @ `e2c1912`（package 版本 2.1.0）

## 1. 範圍

把這個 repo 當成「被宿主專案安裝的 Vue plugin」來看，列出可以優化和升級的地方，並排出順序。

- 包含：plugin 封裝（安裝、打包、樣式、型別）、元件能力、相容性清理、工具鏈升級、文件、專案架構（第 7 節）、UI/UX 體驗（第 8 節）。
- 不包含：npm 發布失敗的問題（另案處理）。
- 第 7、8 節分別依 agency-agents 的 Software Architect 與 UX Architect 角色指示撰寫。
- 相容性原則沿用 [package-contract](package-contract.md)：2.x 只做向後相容的新增與修正，破壞性變更集中到 3.0。

## 2. 現況摘要

| 面向 | 現況 | 評語 |
| --- | --- | --- |
| 品質門檻 | lint、type-check 通過；單元測試 81/81；tarball consumer 檢查 | 好，升級時可依賴 |
| 打包 | ESM + CJS 多入口；元件全在一個 76.5 kB 共用 chunk；CSS 36 kB | 沒有 `sideEffects`，無法按元件 tree-shake |
| 樣式 | 編譯後的 CSS 含未加前綴的 Tailwind utilities 與 `:root` 的 Element Plus 主色覆寫 | 會影響宿主的全域樣式 |
| 元件 API | 16 個元件；沒有任何 `defineExpose` | 宿主拿不到 `el-table` 的方法 |
| 相容包袱 | deprecated 的 i18n 入口、拼錯的公開名稱、無關的公開型別 | 留到 3.0 清理 |
| 依賴 | Vue 3.5 / Element Plus 2.11 / vue-i18n 10 / Tailwind 3 / Vite 6 | 多個工具已落後一到兩個 major |
| 文件 | README 連到範例；沒有 `CHANGELOG`、沒有 `LICENSE` 檔 | 升級者無從得知變更 |

## 3. 階段一：不破壞相容的修正（2.1.x）

每項都小、可獨立合併，並各補一個會失敗的測試。

| # | 項目 | 位置 | 做法 |
| --- | --- | --- | --- |
| 1.1 | 沒有 `prop` 的欄位在 TransferDialog 被取消勾選且勾不回來 | `src/components/transfer/TransferDialog.vue:122-133` | 沒有 `prop` 的欄位不進勾選清單，保留原 `checkActive` |
| 1.2 | `showBack` 的字串／物件 payload 在 MainPanel 被丟掉 | `src/components/layout/MainPanel.vue:15-17` | `click:back` 帶上 payload，四個 layout 的 EventMap 同步加參數 |
| 1.3 | BaseSelector 的 placeholder 寫死 `'請選擇'` | `src/components/form/BaseSelector.vue:11` | 改用 `t()`，兩個 locale JSON 補 key |
| 1.4 | BaseSelector 用 label 當 `v-for` key | `src/components/form/BaseSelector.vue:45` | 改用 `String(it.value)` |
| 1.5 | TransferDialog 搜尋區分大小寫 | `src/components/transfer/TransferDialog.vue:40` | 兩邊 `toLowerCase()` 再比對 |
| 1.6 | `vue` peer 範圍 `^3.0.0` 過寬 | `package.json:83` | 改 `^3.3.0`（泛型 SFC 的最低版本） |
| 1.7 | 沒人用的檔案與常數 | `src/utils/routeFormatters.ts`、`src/assets/main.css`、`src/assets/logo.svg`、`src/const/tableConst.ts` 的三個常數 | 刪除 |
| 1.8 | 缺 `LICENSE` 檔與 `CHANGELOG.md`；`author`、`repository.url` 是樣板值 | repo 根目錄、`package.json:65,71-74` | 補上 |

驗證：`npm run lint`、`type-check`、`test:unit:ci`、`build-lib`、`check:package`。

## 4. 階段二：plugin 封裝品質（2.2.0）

這一階段是本計劃的重點：讓套件在宿主專案裡更輕、更不干擾。

### 2.1 宣告 `sideEffects`，讓元件可以被 tree-shake

- 現況：`package.json` 沒有 `sideEffects`，而 `src/index.ts:6` 直接 import 樣式。宿主只用 `BaseBtn` 也會帶進整個 76.5 kB chunk。
- 做法：加上 `"sideEffects": ["**/*.css", "**/*.scss"]`；確認 `withInstall` 的 `Object.assign` 不會被判定成副作用（必要時加 `/*#__PURE__*/`）。
- 驗證：在 `tests/consumer` 加一個只 import `BaseBtn` 的 entry，建置後檢查產物不含 `TransferDialog` 字樣。

### 2.2 樣式不再覆寫宿主的全域設定

- 現況：`dist/lib/rayyy-vue-table-components.css` 含 `.flex`、`.hidden`、`.p-2` 這類未加前綴的 Tailwind utilities，以及 `:root { --el-color-primary: ... }`。宿主一 import `/styles`，自己的 Element Plus 主色和同名 utility 就可能被改掉。
- 做法分兩步：
  1. 2.2.0：把主題變數拆成獨立入口（`/styles` 只含元件樣式，`/styles/theme` 才含 `:root` 覆寫）。為了相容，`/styles` 暫時仍包含主題，並新增不含主題的 `/styles/core`。
  2. 3.0：`/styles` 預設不含主題；元件內的 utility class 改成元件自己的 class（或加 Tailwind `prefix`），不再輸出通用 utilities。
- 驗證：`ThemeContract.test.ts` 加一條「`/styles/core` 不含 `:root` 與 `--el-color-primary`」。
- 風險：樣式是最容易出現視覺回歸的地方，而視覺驗收需要瀏覽器，必須事先取得授權。

### 2.3 版面高度不再寫死 `100vh`

- 現況：`MainPanel.vue:47`、`DetailLayout.vue:49,54` 用 `calc(100vh - 180px)` 這類固定數字，假設宿主的 header 高度。
- 做法：改成 CSS 變數並保留原值當預設，例如 `max-height: var(--rvtc-panel-max-height, calc(100vh - 180px))`。
- 驗證：既有測試不變；README 補一段說明變數名稱。

### 2.4 表格對外開放 `el-table` 的能力

- 現況：BaseTable、SortTable、TitleTable 都沒有 `defineExpose`，宿主無法呼叫 `clearSelection`、`toggleRowSelection`、`doLayout`。
- 做法：BaseTable 用 `defineExpose` 開放這幾個方法，兩個 adapter 轉發；`BaseTableInstance` 型別同步補上。
- 驗證：`TableFamily.test.ts` 加「透過 ref 清除選取」的測試。

### 2.5 表格欄位能力補齊

| 項目 | 現況 | 做法 |
| --- | --- | --- |
| 空資料時表頭消失 | `BaseTable.vue:82` 用 `v-if="data.length > 0"` 整個換成 `el-empty` | 新增 prop `keepHeaderWhenEmpty`，為 true 時改用 `el-table` 的 `#empty` slot；預設維持現狀 |
| 巢狀欄位 | `row[column.prop]` 不支援 `user.name` | 遇到含 `.` 的 `prop` 時逐層取值 |
| 欄位 slot | 只能用 `formatter` 或 `template` 函式 | 新增具名 slot `cell-<prop>` 與 `header-<prop>`，沒有傳時行為不變 |
| 多餘屬性 | `v-bind="column"` 把 `checkActive`、`template` 也傳給 `el-table-column` | 綁定前先濾掉非 `el-table-column` 的欄位 |

### 2.6 表單元件的型別與透傳

- BaseSelector：`Selection` 只允許 `string | string[] | null`，但 `ElOptions.value` 允許 number、boolean。改成泛型 `V`，並加上 `v-bind="$attrs"` 讓宿主能傳 `el-select` 的其他設定。
- BaseInput：`clearable` 寫死為開。新增 prop `clearable`，預設 `true`。

### 2.7 為 3.0 鋪路的別名（只新增，不移除）

| 舊名稱 | 新名稱 | 做法 |
| --- | --- | --- |
| `BaseWaringDialog`、`isWaring`、`waringText`、`subWaringText` | `BaseWarningDialog`、`isWarning`、`warningText`、`subWarningText` | 兩者並存，舊名標 `@deprecated` |
| `SortChangValue` | `SortChangeValue` | 型別別名 |
| `submitEmit`、`resetEmit`、`updatePage`、`updatePageSize` | `submit`、`reset`、`update:page`、`update:pageSize` | 兩個事件同時發出 |

## 5. 階段三：工具鏈與依賴升級

下表的版本號來自 2026-11-11 的 `npm outdated`。每個 major 的破壞性變更我沒有逐一查證，動手前要先讀各自的 migration guide。

一次只升一組，每組升完都跑完整的非瀏覽器門檻。

| 順序 | 套件 | 目前 → 最新 | 說明 |
| --- | --- | --- | --- |
| 3.1 | 同 major 內的小版本（`vue`、`element-plus` 2.14、`postcss`、`sass-embedded` 等） | patch／minor | 風險最低，先做 |
| 3.2 | `vue-i18n` | 10.0.8 → 11.x | peer 寫的是 `>=10.0.0`，等於已對 11 做出承諾卻沒測過。升 devDependency 並在 consumer 檢查加一組 v11 |
| 3.3 | `vitest`、`jsdom`、`@vue/test-utils` | 3 → 5、26 → 29 | 順便把 `vitest.config.ts` 和 `vitest.ci.config.ts` 合併成一份 |
| 3.4 | `vite`、`@vitejs/plugin-vue`、`vite-plugin-dts`、`unplugin-*` | 6 → 8 等 | 影響 lib 產物，升完比對 `dist/lib` 的檔案清單與大小 |
| 3.5 | `typescript`、`vue-tsc`、`@vue/tsconfig` | 5.8 → 7、2 → 3 | 產生的 `.d.ts` 可能變動，靠 `check:package` 的型別正反例把關 |
| 3.6 | `eslint`、`eslint-plugin-vue`、`prettier` | 9 → 10 等 | 只影響開發 |
| 3.7 | `cypress` | 14 → 16 | 需要瀏覽器才能驗證，須先取得授權 |
| 3.8 | `tailwindcss` | 3.4 → 4.x | 變動最大（設定方式與 preset 格式不同），而且和 2.2 的樣式隔離相關。建議和 3.0 一起做 |

另外兩項：

- `vuedraggable` 只用在 demo（`TransferDialogDemo.vue`），而且 npm 的 latest 標籤指向 Vue 2 的版本。換成原生拖曳或另一個維護中的套件，或是直接接受現狀。
- CI 只在 PR 和 tag 觸發。加上 `push` 到 `main`，並拿掉 `ci.yml` 的 tag 觸發（Publish workflow 已跑同一套驗證）。

## 6. 階段四：3.0（破壞性變更）

集中一次做完，並附遷移文件。

| # | 項目 | 內容 |
| --- | --- | --- |
| 4.1 | 移除 deprecated 的 i18n 入口 | 刪 `setLocale`、套件的 `useI18n`、`useComponentElementLocale`、plugin 的 `locale` 選項。`src/utils/i18n.ts` 整個刪除，root bundle 不再帶 `createI18n` 與 Element Plus 的 zh-tw locale |
| 4.2 | 移除舊名稱 | 階段 2.7 的舊拼字與舊事件名 |
| 4.3 | 移除無關的公開型別與無作用的 prop | `QRCodeResult`、`MenuItemType`、`ChildrenMenu`、`TableListReq`；FunctionHeader、MainPanel 的 `depth` |
| 4.4 | 移除歷史相容形狀 | default export 的數字索引、`/utils/styles` 的歷史 helpers、handler-map 形狀的 `*Emits` 型別 |
| 4.5 | 樣式預設不含主題 | 接續 2.2；Tailwind 升到 4 |
| 4.6 | 提高 peer 下限 | `vue ^3.5.0`，之後 `SearchBar.vue:18` 可改用內建的 `useId()`，SSR 下 id 才會一致 |
| 4.7 | 評估是否只出 ESM | 取決於是否還有宿主用 `require` |

交付物：`docs/migration-3.0.md`，逐項列出「舊寫法 → 新寫法」。

## 7. 專案架構升級建議

### 7.1 問題與限制

這是一個單一 npm 套件，由一個人維護，宿主是後台管理類的 Vue 專案。架構的目標不是擴充性，而是三件事：公開契約不被意外改動、樣式與語系不干擾宿主、新增一個元件能力時要改的檔案越少越好。

現在的依賴方向是對的，已用搜尋確認：`src/components`、`src/utils`、`src/types`、`src/locales` 沒有任何一處 import demo 的程式碼。

```
宿主專案
   │ import
   ▼
src/index.ts ──► src/components ──► src/types
   │                   │               ▲
   │                   └──► src/locales│
   └──► src/utils ─────────────────────┘

src/main.ts、src/views、src/router、src/layout、src/const   （demo，只能依賴上面，不能被依賴）
```

問題在於這個方向只靠自律維持，而且有幾個地方一個概念有兩個來源。

### 7.2 建議項目

每項都列出兩個選項與代價，粗體是我的建議。

| # | 問題 | 選項 A | 選項 B | 建議與理由 | 版本 |
| --- | --- | --- | --- | --- | --- |
| A1 | lib 與 demo 同住 `src/`，邊界沒有工具把關。`vite.config.ts` 的 dts `include` 也要手動列目錄 | **加一條 ESLint `no-restricted-imports`**：lib 四個目錄禁止 import `views`、`router`、`layout`、`const`、`vue-router` | 拆成 workspace：`packages/lib` 與 `apps/demo` | A。一條規則就能鎖住方向，隨時可撤。B 要改路徑、CI、Netlify 與 consumer 檢查，只有出現第二個套件時才值得 | 2.2 |
| A2 | lib 內部混用 `@/types` alias 與相對路徑（`BaseTable.vue:6`、`SortTable.vue:2`）。`package-contract.md` 記載過 alias 外洩到產物的事故 | **lib 內一律相對路徑**，併入 A1 的 lint 規則 | 保留 alias，靠 `check:package` 事後抓 | A。事前擋比事後抓便宜 | 2.2 |
| A3 | 色票有兩個來源：`tailwind-preset.cjs` 寫 hex，`element/index.scss` 寫 CSS 變數，同一個 `#256fc0` 各寫一次 | **CSS 變數當唯一來源**，preset 改成引用 `var(--color-primary)` | 另建一份 tokens 檔，用腳本同時產生兩邊 | A。不需要新的建置步驟。代價是 `bg-primary/10` 這類透明度寫法要改用 RGB 通道變數，動手前要先盤點用到幾處 | 2.2 |
| A4 | 表格家族每加一個事件要改三個元件加型別檔。SortTable、TitleTable 逐一接住 BaseTable 的事件再用另一個名字發出（`cell-click` → `click:cell`） | **保留 adapter**，2.x 新事件一律用同一個名字並靠 attrs 透傳，舊事件的改名留到 3.0 統一 | 合併成一個 BaseTable，工具列改成 slot 與 props | 2.x 用 A。B 的介面更小，但等於重寫公開契約，放到 3.0 再評估 | 2.2／3.0 |
| A5 | 宿主忘記合併套件的 messages 時，畫面直接顯示 `common.loading` 這種 key | 加一個內部 helper：宿主有這個 key 就用宿主的，沒有就退回套件內建的文字。取代 11 個元件裡的 `useI18n()` | 維持現狀，只靠文件提醒 | 暫緩（2026-11-11 決定語系先不處理） | 暫緩 |
| A6 | 產物大小沒有門檻。目前共用 chunk 76.5 kB、CSS 36 kB，變大了不會有人發現 | **在 `scripts/check-package.mjs` 加大小上限**，超過就失敗 | 引入專門的 size 檢查工具 | A。幾行程式，不加依賴 | 2.2 |
| A7 | 架構決策散在 14 kB 的 `package-contract.md` 與 openspec 變更紀錄裡，很難查「為什麼這樣做」 | **建立 `docs/adr/`**，每個決策一頁 | 繼續寫在 `package-contract.md` | A。先補下方列的四篇 | 2.2 |
| A8 | `src/types/components.ts` 單檔 873 行 | 依元件家族拆檔，原檔改成 barrel | **維持單檔** | B。它是刻意的單一來源，3.0 移除歷史形狀（4.4）後會自然變小。到時候還嫌大再拆 | 不做 |

### 7.3 要補的 ADR

格式：Status／Context／Decision／Consequences，每篇一頁以內。

| ADR | 決策 | 對應項目 |
| --- | --- | --- |
| 001 | 樣式入口拆分與主題是否預設載入 | 2.2、4.5 |
| 002 | 設計 token 以 CSS 變數為唯一來源 | A3、U1 |
| 003 | 表格家族保留 adapter 或合併 | A4 |
| 004 | 3.0 是否只出 ESM | 4.7 |

## 8. UI/UX 體驗升級建議

對象有兩種人：操作元件的終端使用者，以及安裝套件的開發者。實作順序照下面的小節順序：先打地基（token），再補狀態、響應式、互動，最後是文件。

### 8.1 Token 地基

現況：token 只有顏色（`--main-color*`、`--control-*`）。間距、高度、背景都直接寫在元件的 class 裡，宿主無法調整，也不會跟著宿主的 Element Plus 主題走。

做法：新增一組 `--rvtc-*` 元件層 token，預設值指向 Element Plus 的變數。宿主改 Element Plus 主題時元件自動跟上，要個別調整時再覆寫。

| Token | 預設值 | 取代的寫死值 |
| --- | --- | --- |
| `--rvtc-toolbar-bg` | `var(--el-fill-color)` | SortTable、TitleTable 工具列的 `bg-gray-200`（`SortTable.vue:56`、`TitleTable.vue:52`） |
| `--rvtc-header-bg` | `var(--el-fill-color-light)` | FunctionHeader 的 `bg-primary-10`，色碼 `#f5f7fa` |
| `--rvtc-text` | `var(--el-text-color-primary)` | FunctionHeader 返回鈕的 `text-black`（`FunctionHeader.vue:39`） |
| `--rvtc-on-fill` | `var(--el-color-white)` | BaseBtn 的 `color: white !important`（`BaseBtn.vue:255`） |
| `--rvtc-panel-max-height` | `calc(100vh - 180px)` | 同 2.3 |
| `--rvtc-control-min-size` | `44px` | 各處重複的 `min-width: 44px; min-height: 44px` |

版本：2.2。已決定（2026-11-11）：採用 `--rvtc-` 前綴與上表的清單。名稱公開後就是契約，之後只增不改；決策記錄在 ADR-002。

### 8.2 深色模式

已決定（2026-11-11）：套件要同時支援深色與淺色主題，採用下表的選項 A。

現況：`ThemeContract.test.ts:99,104` 明確禁止 lib 樣式出現 `prefers-color-scheme`，也就是套件目前只支援淺色。宿主開啟 Element Plus 的深色模式（`html.dark`）時，8.1 表中那些寫死的淺色背景與黑白文字會直接破版。

| 選項 | 內容 | 代價 |
| --- | --- | --- |
| **A（採用）** | 套件不自己判斷深淺，只跟隨宿主：把寫死的中性色全換成 `--el-*` 變數。完成 8.1 後大部分自動達成 | 套件自訂的 `--control-*` 狀態色需要補一組 `html.dark` 的值 |
| B | 套件自己用 `prefers-color-scheme` 切換 | 會和宿主的設定打架，也違反現有測試的決策 |
| C | 維持只支援淺色，在 README 明講 | 深色後台的宿主無法使用 |

交付內容（版本 2.2）：

- 寫死的中性色全部換成 `--el-*` 或 `--rvtc-*` 變數（依賴 8.1）。
- `--control-*` 狀態色與 `--main-color*` 色階補一組 `html.dark` 的值，寫在 `element/index.scss`。
- `ThemeContract.test.ts` 的規則維持「不得出現 `prefers-color-scheme`」，另外新增「`html.dark` 下每個 `--rvtc-*` 與 `--control-*` 都有定義」的檢查。
- demo 站加一個淺色／深色／跟隨系統的切換，用來展示與驗收。「跟隨系統」只在 demo 站判斷，結果一樣是切換 `html.dark`。
- README 補一段：宿主載入 Element Plus 的 dark css-vars 並切換 `html.dark`，元件就會跟著變。

### 8.3 狀態完整性

| # | 現況 | 做法 | 版本 |
| --- | --- | --- | --- |
| U3.1 | BaseTable 有載入中與空資料，沒有「載入失敗」。宿主只能自己在表格外面處理 | 新增 `error` slot；有傳時取代空資料畫面，可放重試按鈕 | 2.2 |
| U3.2 | 空資料畫面固定是 `el-empty` 加一句文字，放不了「新增第一筆」這類引導 | 新增 `empty` slot | 2.2 |
| U3.3 | 序號欄標題寫死 `No`（`BaseTable.vue:106`），不走語系 | 改用 `t()` | 2.1.x |
| U3.4 | BaseWaringDialog 沒傳文字時顯示「確定移除使用者」，而且固定在句尾加 ` ?`（`BaseWaringDialog.vue:37`）。用在別的情境會出現錯誤的訊息 | 預設文字改成中性的「確定要執行此操作嗎？」，問號放進語系字串 | 2.2 |
| U3.5 | BaseWaringDialog 內容區固定 `h-16`（`BaseWaringDialog.vue:34`），文字超過兩行會溢出 | 改成 `min-h-16` | 2.1.x |
| U3.6 | 警告對話框的確認鈕和一般對話框一樣是主色 | 破壞性操作的確認鈕改用 danger 色，並讓預設焦點落在取消 | 2.2 |

### 8.4 響應式策略

現況：整個 lib 只有一個斷點（`FilterLayout.vue:46` 的 `md:w-3/5`）。斷點統一採用 Tailwind 預設：640、768、1024。

| # | 元件 | 小螢幕上的問題 | 做法 | 版本 |
| --- | --- | --- | --- | --- |
| U4.1 | SearchableListPanel 分頁 | 固定顯示 `prev, pager, next, total, sizes, jumper` 六段，640px 以下會擠成三行 | 640px 以下只留 `prev, pager, next`；新增 `paginationLayout` prop 讓宿主覆寫 | 2.2 |
| U4.2 | TitleTable 標題列 | 固定 `h-12` 單行，標題加搜尋加兩顆按鈕會溢出（`TitleTable.vue:52`） | 改成 `min-h-12 flex-wrap`，和 SortTable 一致 | 2.1.x |
| U4.3 | BaseTable 固定欄 | 選取欄、序號欄固定在左，操作欄固定在右，手機上中間可捲動的區域所剩無幾 | 新增 prop，窄螢幕時取消固定欄 | 2.2 |
| U4.4 | BaseDialog 頁尾 | 500px 以下對話框已是全寬，但按鈕仍靠在一側 | 500px 以下按鈕改成等寬並排 | 2.2 |
| U4.5 | TransferItem | 每列六顆圖示按鈕，是 link 樣式，觸控目標小於 44px | 套用 `--rvtc-control-min-size` | 2.2 |

### 8.5 互動一致性

| # | 現況 | 做法 | 版本 |
| --- | --- | --- | --- |
| U5.1 | SearchBar 只有按 Enter 才搜尋，沒有搜尋按鈕。觸控使用者與不知道要按 Enter 的人會以為沒反應 | 新增 `searchOnInput` prop（輸入後延遲觸發）；TransferDialog 內的欄位搜尋預設開啟，因為那是本地過濾 | 2.2 |
| U5.2 | SortTable 的 Excel 圖示只在滑鼠移入時換色（`SortTable.vue:74-75`），鍵盤聚焦時沒有變化，而且用了兩張圖加一個狀態 | 改成單一 SVG 加 CSS 的 `:hover, :focus-visible` | 2.2 |
| U5.3 | SortTable 的「欄位設定」與「匯出」按鈕一定會顯示。宿主沒有匯出功能時，畫面上會有一顆按了沒反應的按鈕 | 新增 `showSettings`、`showExport` 兩個 prop，預設 `true` | 2.2 |
| U5.4 | TransferItem 滑鼠移入時顯示抓取游標，但預設清單並不能拖曳 | 只有宿主使用 `list-container` slot 時才顯示抓取游標 | 2.2 |
| U5.5 | BaseTable 每列的「查看」「編輯」按鈕文字都一樣，螢幕報讀器聽不出是哪一列 | 新增 `rowLabel` 函式 prop，用來組出 `aria-label`，例如「編輯 張小明」 | 2.2 |
| U5.6 | 儲存格的點擊事件掛在 `div` 上（`BaseTable.vue:118`），鍵盤無法觸發 | 文件註明 `cell-click` 僅供滑鼠輔助；需要鍵盤操作的宿主改用 `template` 放按鈕 | 2.2 |

### 8.6 開發者體驗

| # | 現況 | 做法 | 版本 |
| --- | --- | --- | --- |
| U6.1 | README 的 API 說明是「去看 `src/types/components.ts`」 | 文件站每個元件頁加上 props、events、slots 表格，從型別檔產生，不手寫 | 2.2 |
| U6.2 | 沒有變更紀錄頁 | 文件站加一頁顯示 `CHANGELOG.md` | 2.2 |
| U6.3 | 沒有主題設定說明 | 文件站加一頁列出所有 `--rvtc-*` token 與預設值 | 隨 8.1 |

### 8.7 驗證限制

8.1 至 8.5 幾乎都是視覺與互動變更。單元測試可以驗證 class、屬性與事件，但顏色對比、破版、觸控目標大小都要在瀏覽器裡看。依你的規範，這些驗收需要另外授權；沒有授權時，交付時只能宣稱「非瀏覽器檢查通過」。

## 9. 建議順序

1. 階段一（修正，約 8 個小 PR），連同 U3.3、U3.5、U4.2 三個小修正。
2. 架構護欄：A1、A2、A6，以及 ADR-001、ADR-002。這些先做，後面的樣式變更才有保護。
3. 階段二的 2.1、2.3、2.4。
4. 階段三的 3.1 至 3.3。
5. 樣式主線：A3 → 8.1 token → 8.2 深色模式 → 2.2 樣式入口拆分。四項互相依賴，照這個順序做。
6. 階段二的 2.5、2.6、2.7，以及 A4、8.3 至 8.6。
7. 階段三其餘項目。
8. 階段四。

## 10. 待決事項

這些需要你決定，計劃裡先寫了我的建議：

1. **樣式隔離的做法**：建議先拆入口（2.2 的第一步），3.0 再處理 utilities。另一個選擇是現在就加 Tailwind `prefix`，但等於提前做破壞性變更。
2. **是否保留 `yarn.lock`**：`package-contract.md` 記載它是刻意同步的，但 CI 與 README 只用 npm，而且它已落後 `package-lock.json`。建議刪除。
3. **3.0 是否放棄 CJS**：需要知道現有使用者的打包環境。
4. **瀏覽器驗收**：2.2 的樣式變更、第 8 節的 UI/UX 項目、3.7 的 Cypress 升級都需要瀏覽器。依你的規範，這些要另外取得授權才會執行。

### 已決定（2026-11-11）

| 事項 | 決定 |
| --- | --- |
| 深色模式 | 要同時支援深色與淺色，做法是跟隨宿主的 `html.dark`（8.2） |
| 語系退回文字（A5） | 先不處理 |
| `--rvtc-*` token 命名 | 採用 8.1 的前綴與清單 |

## 11. 未檢查的部分

- 沒有細讀 `src/views/**`、`src/types/components.ts` 全文與各 SCSS 檔，樣式項目動手前要再看一次。
- 沒有測量宿主端實際的 tree-shake 效果，2.1 的效益要等 consumer 檢查做出來才有數字。
- 第 8 節的問題都是從原始碼推斷的，沒有在瀏覽器裡實際看過。顏色對比與各斷點的破版情況沒有量測。
- A3 提到的透明度寫法（`bg-primary/10` 等）用到幾處沒有盤點。
- 沒有評估 SSR 支援程度，沒列入計劃。
- agency-agents 的角色檔在 `~/.claude/agents/` 找不到，改讀 catalog 列出的 `~/.codex/agents/software-architect.toml` 與 `ux-architect.toml`，內容完整讀過。
