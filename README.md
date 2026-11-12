# Vue Table Components

Vue 3、Element Plus 與 TypeScript 組件庫，提供表格、表單、佈局與對話框，共 16 個公開組件。

## 安裝與開始使用

```sh
npm install rayyy-vue-table-components vue element-plus vue-i18n
```

完整入口見 [main.ts](tests/consumer/src/examples/main.ts)：安裝宿主 i18n、Element Plus、組件庫與樣式。將其中的 App import 換成需要的 Vue 範例即可。

單項註冊見 [NamedInstall.ts](tests/consumer/src/examples/NamedInstall.ts)。root 與 `/components` 匯出的同名值是相同物件，均支援 `app.use` 與 `.install(app)`，不依賴另一入口先載入。Vue SFC 也可直接在 script setup 中按名稱匯入使用。

對等依賴範圍以 [package.json](package.json) 為準。目前 consumer 驗證使用 Vue 3.5、Element Plus 2.11 與 vue-i18n 10；這不是全部版本組合的相容性保證。

## 完整使用範例

每份完整範例只維護於 `tests/consumer/src/examples`。文件中心的展示與複製直接讀取同一份來源；README 連到該來源，不再維護另一份程式片段。

所有範例都納入乾淨 tarball consumer 的型別檢查與 Vite 建置。重要互動另以掛載測試驗證，因為型別檢查不能證明事件真的觸發。資料範例只操作宿主記憶體，沒有 API、正式檔案匯出或持久化。

| 範例 | 行為與責任 |
| --- | --- |
| [完整安裝](tests/consumer/src/examples/main.ts) | 宿主 i18n、Element Plus、樣式與全量註冊 |
| [單項安裝](tests/consumer/src/examples/NamedInstall.ts) | 從 root、/components 單獨註冊 |
| [BaseTable](tests/consumer/src/examples/BaseTableExample.vue) | 泛型資料、formatter/template、選取、展開與合計 |
| [樹形與懶載入](tests/consumer/src/examples/TreeTableExample.vue) | 穩定 rowKey、自訂 treeProps、宿主 load callback |
| [SortTable](tests/consumer/src/examples/SortTableExample.vue) | click:columnSort 事件與宿主本地排序 |
| [TitleTable](tests/consumer/src/examples/TitleTableExample.vue) | 編輯選取規則、宿主新增與刪除 |
| [輸入與選單](tests/consumer/src/examples/InputExample.vue) | BaseInput、BaseSelector 與宿主資料綁定 |
| [按鈕](tests/consumer/src/examples/ButtonExample.vue) | BaseBtn 文字、slot、樣式、禁用與 click |
| [搜尋](tests/consumer/src/examples/SearchExample.vue) | SearchBar 的 keydown:enter、update:clear 與 slots |
| [對話框](tests/consumer/src/examples/DialogExample.vue) | customWidth、v-model 與 click:submit |
| [警告對話框](tests/consumer/src/examples/WarningExample.vue) | 保留 BaseWaringDialog 拼字與 update:submit |
| [主面板](tests/consumer/src/examples/MainPanelExample.vue) | MainPanel 的 searchBar、main、footer slots |
| [詳細頁](tests/consumer/src/examples/DetailExample.vue) | DetailLayout 的編輯、儲存與取消草稿 |
| [篩選頁](tests/consumer/src/examples/FilterExample.vue) | FilterLayout 的 submitEmit、resetEmit |
| [功能標題](tests/consumer/src/examples/HeaderExample.vue) | FunctionHeader 的 default slot 與 back payload |
| [搜尋與分頁](tests/consumer/src/examples/ListExample.vue) | SearchableListPanel；搜尋、切片與重設頁碼由宿主處理 |
| [欄位草稿](tests/consumer/src/examples/TransferExample.vue) | TransferDialog 搜尋與確認完整草稿 |
| [宿主語系](tests/consumer/src/examples/HostLocale.vue) | 動態文字、分頁繼承與局部 locale 覆寫 |

## 公開入口

| 入口 | 內容 |
| --- | --- |
| root | 全量 plugin、可單項安裝的組件、型別、helpers 與 messages |
| `/components` | 同一批可單項安裝的組件與組件型別 |
| `/types` | TableColumn、Pager 等共用型別與相容型別 |
| `/types/components` | 僅型別入口；使用 `import type` |
| `/utils` | setActiveColumn |
| `/utils/styles` | 歷史樣式 helpers 與 STYLE_CLASSES |
| `/locales` | messages、zhTW、enUS、LocaleType |
| `/styles` | 完整編譯 CSS；搭配宿主的 Element Plus CSS |
| `/styles/core` | 去掉 `:root`／`:root.dark` 主題變數的組件 CSS；主題變數引用都有 fallback，只載 core 時元件跟隨宿主的 Element Plus 主色，狀態色退回套件的淺色預設值 |
| `/styles/theme` | 只有主題變數（`:root`、`:root.dark`） |
| `/styles/element` | Element Plus SCSS 主題入口 |
| `/tailwind-preset` | Tailwind CSS preset |

宿主自己有 Element Plus 主題時用 `/styles/core`（主題變數引用都有 fallback，只載 core 時元件跟隨宿主的 Element Plus 主色；狀態色退回套件的淺色預設值）。

JS 與 declarations 來自建置產物。`/styles/table`、`/styles/dialog` 與 `/styles/components` 不是公開入口。完整組件樣式請使用 `/styles`；主題與 Tailwind 配置見 [SCSS](src/assets/styles/element/index.scss) 與 [preset](tailwind-preset.cjs)。

## 深色模式

宿主載入 `element-plus/theme-chalk/dark/css-vars.css`，並在 `<html>` 切換 `dark` class，元件就會跟著變。套件的深色色值寫在 `:root.dark`，優先權高於 Element Plus 深色預設的 `html.dark`，確保主色色階不被蓋掉。

## Table family 的共同契約

BaseTable、SortTable、TitleTable 的共同 props 與 expand slot 以 BaseTable 契約為來源。新增共同設定時，兩個 adapter 自動繼承並傳給 BaseTable；只有各自的工具列設定、事件轉換與選取政策留在 adapter。

- `baseTableRowClassName` 三者皆可使用。SortTable 的歷史名稱 `sortTableRowClassName` 保留；兩者同時傳入時，歷史名稱優先。
- TitleTable 在 `propIsEditable` 或 `showSelection` 為 true 時顯示選取欄。
- BaseTable 的排序事件為 `column-sort-change`，SortTable 為 `click:columnSort`。公開事件維持原有名稱與 payload，不自動統一。
- SortTable 的設定與下載操作只發出 `open:transfer`、`click:downloadExcelFile`；實際對話框與匯出由宿主處理。
- 排序 payload 型別為 `SortChangValue<Row>`，沒有 `SortInfo` 公開型別。

完整 props、events、slots 與相容型別見 [契約定義](src/types/components.ts)、[共用資料型別](src/types/index.ts) 與編輯器的生成 declarations；避免另維護一份手工型別鏡像。

## 語系、分頁與對話框

元件文字跟隨宿主 `vue-i18n` composer。建立 `legacy: false` 的宿主 i18n，並在各語系內合併套件 messages；覆寫 common 等 namespace 時也需合併該層。修改宿主 locale 即可切換文字。

分頁未傳 `locale` 時繼承外層 `ElConfigProvider`；有傳時只覆寫該面板。`showPagination` 為三態：未提供依 totalCount 判斷，true 強制顯示，false 隱藏。

BaseDialog 明確傳入 `customWidth` 時優先使用；未傳時，視窗小於 500px 使用 100%，其餘 50%。確認發出 `click:submit`，是否關閉與如何儲存由宿主決定。

## 欄位草稿與自訂列表

TransferDialog 搜尋只改變顯示集合，確認提交完整草稿。`update:checkChange` 是草稿通知；若要隔離取消操作，宿主應在 `update:submit` 才套用欄位。

`list-container` slot 可接自訂列表或拖曳。`handleItemEvents` 接收顯示集合的 index，`handleReorder(columns)` 接收顯示集合中原物件的完整排列；不可送入缺漏、重複或複製的新物件。隱藏欄位與尚未提交的修改會保留。取消後重開，以最新宿主欄位建立新草稿。

TransferItem 的獨立契約也保留於 [公開型別](src/types/components.ts)，可用於自訂列表。

## 相容性

保留公開名稱、事件與既有 subpaths，包含 `BaseWaringDialog` 的歷史拼字、BaseTableEmits 的 handler map、BaseDialogEmits 的 callable 形狀，以及舊 instance 型別。預設 plugin 的歷史數字索引也保留原順序。

`setLocale`、套件 `useI18n`、`useComponentElementLocale` 與 plugin `locale` 選項為 deprecated 相容入口；它們不控制元件文字。詳細歷史基線與本次決策見 [package-contract](docs/package-contract.md)。

## 版面高度

以下 CSS 變數可覆寫版面高度；未設定時使用預設值，畫面不變。

| 變數 | 作用 | 預設值 |
| --- | --- | --- |
| `--rvtc-panel-max-height` | MainPanel 內容區最大高度 | `calc(100vh - 180px)` |
| `--rvtc-detail-min-height` | DetailLayout 容器最小高度 | `calc(100vh - 200px)` |
| `--rvtc-detail-content-max-height` | DetailLayout 內容區最大高度 | `calc(100vh - 100px)` |

```css
:root { --rvtc-panel-max-height: calc(100vh - 120px); }
```

以下 CSS 變數可覆寫元件顏色與控制項尺寸；宿主沒設定時跟隨 Element Plus 變數（深色模式也會自動跟上）。

| 變數 | 用途 | fallback |
| --- | --- | --- |
| `--rvtc-toolbar-bg` | SortTable／TitleTable 工具列背景 | `var(--el-fill-color)` |
| `--rvtc-header-bg` | FunctionHeader 背景 | `var(--el-fill-color-light)` |
| `--rvtc-text` | FunctionHeader 返回鈕文字色 | `var(--el-text-color-primary)` |
| `--rvtc-on-fill` | BaseBtn 填充樣式禁用狀態文字色 | `var(--el-color-white)` |
| `--rvtc-control-min-size` | 圖示按鈕最小點擊尺寸 | `44px` |

## 開發與驗證

驗證環境為 Node.js 22.16+、npm 11.6.0，與 CI 保持一致。`npm ci` 的 prepare 會安裝 Cypress；內部打包使用 `--ignore-scripts` 避免重新執行 lifecycle。

```sh
npm ci
npm run dev
npm run lint
npm run type-check
npm run test:unit:ci
npm run build-lib
npm run build-demo
npm run check:package
npm run check:release-boundaries
```

lib 輸出於 `dist/lib`，demo 於 `dist/demo`。`check:package` 會安裝 tarball 到新的 consumer 目錄，驗證全部入口、範例、ESM/CJS、資產與單項安裝；不使用 repo alias。

`npm run verify` 還會執行 Cypress 瀏覽器測試。需要瀏覽器的檢查須遵守工作階段的使用者授權；只跑上述非瀏覽器檢查時，不應宣稱完整 verify 通過。`npm run lint` 不會改寫來源；`lint:fix` 才會修正。

`release:patch`、`release:minor`、`release:major` 會先驗證，再升版、建立 tag 並推送；後續由 GitHub Actions 發布。這些命令會改動遠端狀態，日常驗證不應執行。
