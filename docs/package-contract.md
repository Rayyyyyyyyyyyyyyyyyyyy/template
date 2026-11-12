# 元件庫封包契約與驗證紀錄

2026-10-20 可及性與 demo UX apply 的實作、相容性及本次驗證結果，見 [獨立證據紀錄](../openspec/changes/harden-frontend-accessibility-and-demo-ux/evidence.md)。該紀錄區分非瀏覽器檢查與尚未授權的瀏覽器驗收；不沿用下方歷史結果作為本次驗收。

## 基線（161589c / 2.0.56，2026-09-16）

未找到適用的 AGENTS.md。工作目錄起始乾淨。這次另在 git 的 `c04d947` archive-cleanup 快照找到未合併的實作；取用前逐項審查，所有結果以本次重新執行為準，不沿用該快照的驗證宣稱。

| 公共入口 | 基線目標 | 問題／決策 |
| --- | --- | --- |
| root | dist/index.es.js、index.umd.js、index.d.ts | lib build 成功；type:module 下 UMD .js 不能當正確 CJS 使用 |
| components | src/components/index.ts | consumer 暴露 raw Vue/TS 與 repo alias |
| types | src/types/index.ts | 改為生成 declaration，保留 type subpath |
| types/components | src/types/components.d.ts | 保留型別入口；原 declaration 不具有效 runtime value |
| utils | src/utils/tableHelper.ts、dist/src/utils/tableHelper.d.ts | raw TS 及 src/types alias |
| utils/styles | src/utils/tableStyles.ts、dist/src/utils/tableStyles.d.ts | 兩者缺失；恢復歷史契約 |
| locales | src/locales/index.ts、index.d.ts | 改用生成 JS／declaration |
| styles | dist/rayyy-vue-table-components.css | 保留 CSS 入口 |
| styles/element | src/assets/styles/element/index.scss | 保留明確 SCSS 資產入口 |
| tailwind-preset | tailwind-preset.js | 原 CommonJS module.exports 與 type:module 衝突；改 .cjs |

`utils/styles` 在 `88757aa` 加入，`5f86d06` 刪除實作但未刪 exports。本次恢復刪除前的 createTableCellClass、createTextClass、STYLE_CLASSES 與三個型別；不發明新 API。

基線執行：`npm ci --ignore-scripts`、`npm run type-check`、lib build、demo build 均成功。lib 輸出 611.91 kB ESM、444.01 kB UMD、167.84 kB CSS 及 declarations；demo 會覆寫相同 dist。建置後 pack 含 `src/components/__tests__/BaseTable.test.ts`。封包檢查抓到缺檔與測試；demo build 後也抓到被覆寫的 lib 入口。

隔離目錄實際安裝 tarball 與 consumer 直接依賴成功；consumer vue-tsc 因 @/components、@/types、src/types、vue-router 等失敗，Vite 因 utils/styles 缺檔失敗，Node import components 因 .ts 副檔名失敗。沒有使用 repo alias、symlink 或借用 repo node_modules。

依賴基線：Vue、Element Plus、vue-i18n 是 external peers；lodash、VueUse、icons 被 bundled，但 lodash/icons 未列直接依賴而依賴 hoisting。庫內 MainPanel 的 router import 未使用；Pinia 僅在 demo bootstrap 安裝，沒有 store caller。修正以移除兩處 lodash 用法、直接宣告並 bundle icons，VueUse 保留 demo 所需 devDependency；不新增消費端 peer 負擔。

行為 red baseline：新增的 15 個掛載測試中 4 個失敗（customWidth、false 分頁覆寫、provider 繼承、搜尋後草稿排序），11 個通過。原單元測試只有空斷言。原 ESLint 設定為空，不能提供有效 lint 證據，品質門檻將補上真正的 Vue/TS 規則。

## 完成後的契約

- Runtime root、components、types、utils、utils/styles、locales 全部使用 `dist/lib` 的 ESM `.js` 與 CJS `.cjs`；`types/components` 保留為型別入口。所有型別指向生成 declarations。
- CSS 使用 `dist/lib/rayyy-vue-table-components.css`；SCSS 與 CommonJS Tailwind preset 維持明確的資產入口。tarball 排除測試、raw Vue/TS 元件與 demo 產物。
- 外部依賴只有既有 Vue、Element Plus、vue-i18n peers。icons 明列 devDependency 並 bundled；沒有新增 peer。lodash 的兩處用途已移除；VueUse 仍供 demo clipboard 使用。npm/yarn lockfile 僅同步這些邊界及既有 manifest 的 vue-i18n peer 範圍，沒有升級版本。（2026-11-12：`yarn.lock` 已刪除，專案只用 npm 與 `package-lock.json`。）
- `src/types/components.ts` 是元件 props、event tuple maps、slots 的共同來源；所有元件 macro 使用它，公開 callable／handler aliases 由 event maps 衍生。保留歷史 72 個公開型別／元件名稱、BaseTableEmits 與 BaseSelectorEmits handler map、BaseTableInstance.$emit 的舊 handler-map 形狀，以及分頁 callable 的舊 boolean 回傳宣告。
- `BaseDialog.customWidth` 明確值優先；未傳時 <500px 為 100%，其餘為 50%。`showPagination` 使用 `default: undefined` 與 nullish fallback。
- TransferDialog 完整草稿獨立於搜尋顯示集合；移動以草稿物件 identity 找原位置，自訂拖曳接受顯示集合的完整排列，拒絕遺失／重複 identity。確認與 check-change payload 是草稿複本，宿主應只在 `update:submit` 套用。
- 宿主 vue-i18n 擁有元件文字；分頁未傳 locale 時沒有內層 provider，傳值時局部覆寫。legacy setLocale/useI18n/plugin locale 保留獨立 composer 用途並標示 deprecated。
- root plugin 依明確元件名稱註冊；提供既有插件型別列出的具名元件，也保留先前數字索引的 runtime／型別形狀。明確插件型別避免生成器展開所有 SFC 而超過 TypeScript declaration 序列化長度。
- `dist/lib` 與 `dist/demo` 獨立，preview 與 Netlify 指向 demo。README／文件中心共用的主要範例位於 `tests/consumer/src/examples`，一併由 tarball consumer 編譯。

## 本次最終驗證（2026-09-16）

執行 `npm_config_cache=/tmp/template-npm-cache npm run verify`，**exit 0**。依序通過：

| 檢查 | 證據 |
| --- | --- |
| 非寫入 lint | 真正的 Vue essential／TypeScript recommended 規則，0 errors / 0 warnings；保留舊 any/object 公共形狀，未強制重設計 |
| Vue 型別 | `vue-tsc --build` 通過，包括所有元件與 demo |
| 元件測試 | 6 個檔案，23 tests passed；含實際 Element Plus 表格、checkbox、dialog 與 provider 整合 |
| lib build | ESM／CJS 多入口及生成 declarations；CSS 37.48 kB；root ESM 7.35 kB + 共用元件 chunk 76.10 kB |
| demo build | `dist/demo` 成功，沒有覆寫 lib |
| tarball consumer | 全新目錄正常 npm install；沒有 symlink、repo alias、NODE_PATH 或 legacy-peer-deps；10 個公共入口目標均在 tarball；型別正反例、可執行範例、Vite、ESM/CJS、CSS／SCSS／preset 全通過 |
| plugin／legacy | Node import/require、具名註冊、獨立 composer 切換與歷史 styles helper 結果通過 |
| Cypress | 2 tests passed：實際首頁→demo，以及固定 mock 搜尋、翻頁、變更每頁筆數、清除搜尋與零結果 |
| release 阻斷 | 使用實際 prepublishOnly 字串接失敗的 fixture verify；npm publish 僅 dry-run 且 registry 指向本機無服務位址。release.sh 與 publish workflow npm steps 使用 stubs，證實失敗後不進入 version/tag/push/publish；隔離 pack 的失敗 lifecycle 不會執行 |
| 原始碼不被檢查修改 | 完整 gate 前後比對 139 個 tracked + untracked 檔案 SHA-256，變更清單為空 |
| 規格／diff | `openspec validate harden-component-library-contracts --strict` 與 `git diff --check` 通過 |

完整本機 log：`/tmp/template-baseline/verify.log`。測試使用 Node 22.16.0、Vue 3.5.18、Element Plus 2.11.1、vue-i18n 10.0.8、TypeScript 5.8.3；沒有宣稱全部 peer 版本組合均已驗證。完整 gate 後僅補驗證紀錄、勾選任務、清除文件空白與還原 package.json 中文字串顯示，另跑 lint／diff 檢查。

## 任務證據索引

| 任務 | 實作與驗證位置 |
| --- | --- |
| 1.1 | 本文基線 inventory、git 歷史與依賴邊界 |
| 1.2 | tests/consumer、scripts/check-package.mjs；基線 tarball 真實安裝 |
| 1.3 | 基線 lib/demo/consumer 結果；封包檢查重現缺檔及測試誤入 |
| 2.1 | package.json、vite.config.ts；10 個入口全數驗證 |
| 2.2 | src/utils/tableStyles.ts、tailwind-preset.cjs；歷史 helper 與雙格式 runtime assertions |
| 2.3 | 明確 external、icons 直接宣告、files 白名單；乾淨 consumer 全通過 |
| 3.1 | BaseDialog.test.ts；720px、499/500 邊界與 resize／prop 更新 |
| 3.2 | SearchableListPanel.test.ts；三態 × 零／非零 totalCount |
| 3.3 | BaseTable.test.ts、ElementIntegration.test.ts；table events/template/expand/cell 與 pager events |
| 3.4 | TransferDialog.test.ts、ElementIntegration.test.ts；搜尋提交完整草稿、排序／勾選保留、取消重開與自訂 reorder |
| 4.1 | src/types/components.ts、三個核心元件的 macros |
| 4.2 | 其餘元件相同來源，移除手工／弱 ambient declarations；72 個舊名稱無遺失 |
| 4.3 | consumer App.vue、legacy-contracts.ts；公共 aliases 與 SFC 生成型別正反例 |
| 5.1 | LocaleOwnership.test.ts；zh-TW→en-US→zh-TW 不重掛載 |
| 5.2 | ElementIntegration.test.ts；真實 provider 繼承、覆寫與旁邊分頁 |
| 5.3 | utils/i18n.ts、PluginOptions JSDoc、宿主範例；legacy import 編譯與獨立 composer runtime |
| 6.1 | 庫內直接引用、刪除未使用 router／Pinia；lint/type/lib/demo 通過 |
| 6.2 | README、安裝指南、文件中心與已編譯 examples；明確 mock／非持久化 |
| 6.3 | SearchableListPanelDemo.vue 的本地搜尋／切片；兩個 Cypress 旅程 |
| 7.1 | package scripts、eslint.config.ts、獨立 outDir；來源 hash 不變 |
| 7.2 | ci.yml/publish.yml/prepublishOnly/release.sh 共用 verify；隔離阻斷與 lifecycle-free pack 測試 |
| 7.3 | 上述完整 verify exit 0、OpenSpec strict 通過 |
| 7.4 | 本文相容性說明、原始碼 diff 及獨立 patch；以下列出後續候選 |

## 剩餘限制與後續候選

- 本輪只做本地驗證，沒有跑遠端 GitHub Actions、部署 demo 或正式 registry 發布；版本保持 2.0.56，沒有建立 tag 或 push。
- 保留已知 advisory：過期 Browserslist 資料、vue-i18n 10 的維護終止訊息、demo／consumer >500 kB chunk、混用 named/default 與空 types chunk 的 Rollup 提示，以及 Cypress loader/TTY 提示。實際命令均以成功狀態結束。
- 基線 npm ci 回報 43 個安全 advisory（含 2 critical）；本 change 沒有升級依賴或執行完整安全稽核，應另案處理，不能以本次功能 gate 當安全背書。
- 保留歷史 callable／handler map 及事件名稱；其中分頁 boolean 回傳型別是相容宣告，不能視為 Vue `$emit` 在 runtime 有 boolean 回傳保證。
- 3.0 另案候選：`BaseWarningDialog` alias／命名遷移、事件名稱統一、API 文件生成、deprecated standalone locale API 的移除策略。本 change 不做改名、升版、tag 或發布。


## 2026-10-19：共同 table、可執行範例與安裝所有權

本次保留版本 2.1.0、公開名稱、事件與 subpaths，沒有 tag、push 或發布。

### 決策與相容性

- BaseTable 擁有共同 props、slots、預設值與 loading 顯示。SortTableProps、TitleTableProps 及兩者的 slots 繼承相同來源；adapter 僅排除自己的工具列設定、保留自己的事件轉換，其他共同 props / slots 直接傳給 BaseTable。
- SortTable 的 `sortTableRowClassName` 保留，優先於共同名稱 `baseTableRowClassName`。TitleTable 的 `propIsEditable || showSelection` 選取政策保留；沒有把各自公開事件重新命名或直接轉發所有 attrs。
- BaseTable 增加一個包住表格與空狀態的 loading 容器。首次載入空資料時顯示等待訊息與 aria-busy，載入完成才顯示空結果；已有資料時保留表格。此 DOM 結構改動尚未做瀏覽器版面驗證。
- 安裝能力在 `/components` 匯出值建立時附加，root 使用相同值；單項安裝不再依賴 root 的頂層初始化。兩個入口的同名值保持 identity，ESM/CJS 各自適用。root default 的歷史數字索引順序另外保留，避免 namespace key 排序改變它。
- 完整文件範例以 `tests/consumer/src/examples` 為唯一來源。文件中心透過 raw import 展示、複製；安裝指南使用其中的兩個入口；README 連到完整來源。移除手抄的程式片段與型別鏡像，以公開 declarations 與來源連結取代；沒有建立全面文件產生器。
- 18 份來源均納入 consumer 的型別檢查與獨立 Vite entry；保留 entry exports，避免未使用的範例內容被整份消除。新增檔案後，文件中心自動列出，README 完整性測試要求補上來源連結。
- 複製操作明確處理等待、成功、失敗、重試與不支援的環境；失敗時仍可手動選取來源。BaseBtn 恢復可見的鍵盤 focus outline。

### 驗證方式

- `TableFamily.test.ts` 從兩個公開 adapter 驗證共同列樣式、展開、選取、列操作、樹形懶載入、loading 與歷史事件／alias；不以抽出的純函式代替接線測試。
- `ExampleBehavior.test.ts` 直接掛載 canonical examples，驗證排序／取消排序、新增／選取刪除、搜尋重設頁碼與編輯取消／儲存。這些本地掛載測試使用明確的 test-only source aliases，避免依賴舊 dist；消費端仍完全使用 tarball，沒有 repo aliases。
- `DocumentationExamples.test.ts` 比對文件實際展示的原文與全部 fixture 檔案，並確認安裝指南與 README 指向相同來源。`ExampleCode.test.ts` 驗證複製文字與狀態、重複操作、失敗後重試及不支援環境。
- `install-check.mjs` 在八個獨立 Node process 驗證 root-only、components-only 及兩種匯入順序，涵蓋 ESM/CJS、全部 16 個單項、plugin 註冊、identity 與歷史數字索引。
- 共同 gate 的發布與升版阻斷仍透過隔離 stub / dry-run fixtures 驗證，沒有執行真實發布。

### 本次實際結果

- lint、Vue 型別檢查、12 個測試檔／59 個測試、lib build、demo build、乾淨 tarball consumer 與隔離 release 阻斷檢查全部通過。
- consumer 完成 18 份範例的型別檢查／保留 exports 的建置、10 個公開入口及八組獨立安裝檢查。
- 初次 consumer 檢查遭全域 npm 快取寫入限制；改用 `/tmp/template-npm-cache`。其後 registry DNS 受限，允許隔離安裝連線後通過；最後一輪使用該暫存快取重跑通過，未修改全域快取權限或使用 legacy-peer-deps。
- 保留既有建置提示：Browserslist 資料過期、vue-i18n 10 的維護提示、部分 chunk 超過 500 kB，以及 Rollup 的空 types chunk／混合 named-default exports 提示；本次沒有新增依賴、升級套件或宣稱體積優化。
- 未執行瀏覽器、Cypress、完整 verify、遠端 CI、部署或正式發布；本地掛載測試不等於瀏覽器版面或真實剪貼簿權限驗證。
