## Context

目前版本 2.0.56；元件庫入口為 src/index.ts，demo 入口為 src/main.ts。package.json 混用 dist 與原始碼入口，utils/styles 指向不存在的檔案。先前 npm pack --dry-run --ignore-scripts 證實 src 有被納入，不能認定 .npmignore 排除了 src；當時未建置且沒有 dist，因此不能据此判定已發布套件缺 dist。

元件 props 與 src/types/components.d.ts 重複維護；BaseDialog 的 customWidth 未使用且未出現在公開介面。showPagination=false 仍會回退到 totalCount。多數元件讀宿主 vue-i18n，但 plugin locale 寫內部 singleton；分頁 fallback 固定中文。單元測試目前為空斷言，E2E 仍驗證模板文字。

## Goals / Non-Goals

**Goals:** 可在乾淨消費專案安裝的封包；可追溯的型別；一致的語系所有權；對具體契約提供測試。

**Non-Goals:** 新增業務功能、UI 重設計、monorepo 搬遷、直接發布、刪除舊公共 API、全面改名。3.0 命名、事件標準化與文件生成另立提案。

## Decisions

1. 執行期 JS 公開入口指向建置產物，型別指向生成 declarations；SCSS 與 Tailwind preset 可保留明確的資產入口，不要求全部資產改為 JS。直接發 raw Vue/TS 會將 alias 和編譯負擔轉嫁消費者，因此不作預設契約。
2. 先建立 export 清單與 consumer fixture，再調整建置。fixture 安裝 tarball，不用 workspace alias 或源碼路徑繞過封包。檢查 import/require 宣告是否與 package type 相容；CommonJS 若繼續宣告，使用可由 Node 識別的產物並驗證。
3. utils/styles 沒有現成實作，不能憑空發明 API。先查 git 歷史與既有文件；有既有契約則恢復，若從未有效則移除失效宣告並記錄影響。lodash、icons、VueUse 等依賴依實際 bundled/external 邊界明確宣告，不能依賴偶然 hoisting。
4. 元件契約從共同來源衍生供 defineProps/defineEmits 使用的型別及公開 declarations。保留現有型別名稱、import 路徑及合法使用形狀：BaseTableEmits 是 handler map，BaseDialogEmits 等則是 callable，不能只保留名稱卻統一改為另一種形狀。以單一事件定義衍生相容 alias，避免手工鏡像；consumer compile fixture 必須涵蓋 BaseTableEmits<Row>['selection-change']、callable emits、泛型與 slot 的正反例。
5. customWidth 明確傳入時優先使用，未傳時保持既有小螢幕 100%、其他 50%。showPagination 使用三態：未提供依 totalCount，自訂 true/false 優先；Vue Boolean prop 須明確 default: undefined，避免缺省被轉為 false。
6. 宿主 vue-i18n 為元件文字的唯一語系來源；沒有分頁 locale prop 時繼承外層 Element Plus provider，有 prop 時局部覆寫。保留 setLocale/useI18n/plugin locale 的舊 export 與既有內部用途，標示 deprecated 並說明不控制宿主元件文字，不在 patch 中直接刪除。
7. 檢查與修正指令分離；CI 用非寫入 lint，PR 即執行核心驗證。.github/workflows/ci.yml、publish.yml、package.json 的 prepublishOnly 與 scripts/release.sh 必須接到同一品質門檻。一般 npm publish 的 lifecycle 在驗證失敗時阻止發布，release.sh 在升版或推 tag 前驗證。gate 的內部 pack 針對已完成建置的產物使用 --ignore-scripts，避免 prepare/prepack 等 lifecycle 重入建置或驗證；共用 gate 本身不得呼叫 npm publish 或 release.sh。入口測試以 stub/隔離環境觀察失敗是否阻斷後續命令，不實際發布、升版或推送。移除框架殘留需先確認沒有 caller，不擴成全面重構。
8. TransferDialog 保持完整欄位草稿為唯一可提交狀態，搜尋結果只是衍生顯示集合。勾選與排序操作以欄位 identity 更新完整草稿，不把過濾結果覆蓋草稿；排序仍須保留所有欄位。清除或更換搜尋保留未提交修改，確認提交完整草稿；取消後重開由最新宿主 columns 建立新草稿，既有事件名稱保持不變。

## Risks / Trade-offs

- 公開入口調整可能影響既有消費端 → 保留可用 subpaths，逐項測試 root、components、types、utils、locales、CSS、SCSS、preset。
- 泛型 Vue 元件的 declaration 推導可能不保留現有 API → 正反例 consumer type fixture 驗證。
- 語系改動可能影響依賴固定中文的使用者 → 明確 locale prop 可維持中文，文件提供遷移範例。
- placeholder 測試替換後可能暴露既有缺陷 → 本輪修正規格涵蓋問題，其餘列出獨立工作，不以關閉測試掩蓋。

## Migration Plan

按 tasks.md 順序建立驗證、修補、收斂型別/語系，再更新文件。檢查應同時驗證 lib 與 demo，各自輸出避免 dist 互相覆寫造成假通過。保留舊命名與事件。完成後交付 diff 與驗證結果，由後续發布工作決定版本、tag 和 npm publish；回復使用針對性 revert，無資料迁移。

## Open Questions

- utils/styles 是否有歷史有效契約：由 task 1.1 查證後按上述規則處理。
- 既有 ESM/CJS/型別產物實際檔名與 peer compatibility：由 baseline build 和 consumer tests 查證，不假設發布狀態。
