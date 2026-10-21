## 1. 確認基線與修改邊界

- [x] 1.1 盤點受影響元件、caller、自訂 slots、型別、語系、demo 與測試；確認前序未提交修改及 table family／安裝契約，僅修改本 change 範圍。
- [x] 1.2 記錄現有 lint、型別、單元測試、lib/demo build 與 consumer 結果；對 demo 保存同環境首頁初始 JS 依賴清單、去重原始／gzip 總量及 CSS 成本，區分既有失敗與新增問題。

## 2. 修正鍵盤與名稱（P1-1、P1-2、P1-3；accessible-component-controls）

- [x] 2.1 將 BaseTable 預設查看／編輯、SortTable 設定／匯出及 FunctionHeader 返回改為 BaseBtn 或原生 button，保留名稱、可見 focus、type=button、事件與 payload；測試單次事件與自訂 slot 不被改寫。
- [x] 2.2 為 transfer 六個圖示動作加入宿主語系的動作＋欄位名稱；測試 zh-TW／en-US 動態切換與 disabled 不發出事件。
- [x] 2.3 修正 SearchBar／BaseInput 的 id、aria-label、aria-labelledby 所有權，提供可見 label 與唯一穩定關聯；保留外殼 attrs，補多實例及 Enter trim／清除回歸測試，必要的可選 prop 同步公開型別與 canonical example。

## 3. 修正可讀性與主題（P1-4、P1-5；readable-demo-theme）

- [x] 3.1 調整首頁 CTA 與 BaseBtn 受影響的前景／背景配對；計算並記錄 normal／hover／focus 一般可操作文字至少 4.5:1 的證據，不以 disabled 作違規判斷。
- [x] 3.2 統一 demo 的淺色文字／表面／color-scheme，移除半套自動深色衝突；確認 demo 全域規則不進入 library 樣式產物，記錄最終 cascade 尚待瀏覽器驗收。

## 4. 修正 live demo 契約（P1-6；reliable-responsive-demos）

- [x] 4.1 修正 MainPanelDemo 四個展示的 main slot，對齊 FunctionHeaderDemo 的真實 props／slot／back 行為，移除不存在或未生效的功能說明；已有相符 canonical example 時重用其來源，維持展示／複製一致。
- [x] 4.2 為各保留展示加入主要內容及必要事件的掛載 smoke assertion；確認 canonical examples 仍全數可編譯／建置，不以空 wrapper 或靜態標題代替內容驗證。

## 5. 分頁與操作區（P2-7、P2-8；依賴 2–4）

- [x] 5.1 在 SearchableListPanel／MainPanel footer 沿用現有分頁實作加入容器適應，窄容器可重排且所有分頁功能仍可取得；不新增分頁狀態模型。
- [x] 5.2 補頁碼／頁大小、showPagination 三態、zh-TW／en-US 與顯式 locale 覆寫回歸，驗證配置切換不重設宿主狀態或重複發事件；尺寸與溢出留給 8.1 實測。
- [x] 5.3 讓返回／匯出外部按鈕至少 44×44 CSS px，保留圖示大小與焦點，檢查樣式定義；實際盒尺寸與鄰近目標重疊留給 8.1 驗收。

## 6. 降低 demo 載入成本（P2-9；依賴 1–5；demo-loading-efficiency）

- [x] 6.1 盤點 Element Plus 全域註冊、resolver、directive、訊息／對話框服務與 locale 的 caller，沿用現有工具調整 demo 引入，保留 library 的 exports 與依賴邊界。
- [x] 6.2 以相同環境與方法重建並對照 1.2，確認首頁全部初始 JS 的原始／gzip 總量皆降低，另列路由與 CSS 成本；不能只縮小最大 chunk 或提高 warning threshold。
- [x] 6.3 驗證實際 loading、對話框、分頁、搜尋與語系整合的解析及行為，確保按需引入不造成未註冊元件／directive／服務；瀏覽器流程留給 8.1。

## 7. 非瀏覽器回歸與交付（依賴 2–6）

- [x] 7.1 分別執行 lint、type-check、test:unit:ci、build-lib、build-demo、check:package 與 check:release-boundaries，記錄失敗及未跑項；不得執行含 Cypress 的 npm run verify 或其他瀏覽器命令。
- [x] 7.2 核對 tarball consumer 的全部 canonical examples、root／components 獨立安裝及匯入順序契約；更新必要文件與本 change 的量測／相容性紀錄，執行 OpenSpec strict validation 與 diff 檢查。

## 8. 瀏覽器驗收（須另行明確授權）

依使用者 AGENTS 規範，瀏覽器檢測須另行明確授權。2026-10-21 曾取得本次驗收授權並完成部分桌面流程；使用者後續明確表示不需要 mobile 版型，並要求停止額外驗收流程。以下項目因完整範圍尚未驗完而保持未完成，不再自行繼續瀏覽器檢測。

- [ ] 8.1 授權後驗收原生 Tab／Enter／Space、單次事件、focus、可及性名稱、label 關聯及 disabled；檢查淺／深系統偏好下 normal／hover／focus 最終對比、320／375／768px／桌面與 200% 文字的分頁、44px 操作區與相鄰目標，以及 production demo loading／對話框／語系流程。
- [ ] 8.2 依實測修正缺陷並重跑相應檢查，記錄實際完成與仍未涵蓋的驗收；瀏覽器驗收未完成前不宣稱九項全數通過，也不以規格產物齊全當作實作完成或歸檔依據。

## Apply 紀錄

第 1–7 節已完成；目前共 17／19 項。詳見 [evidence.md](evidence.md) 的基線、相容性、逐檔 bundle before／after、部分瀏覽器驗證及交付前檢查。第 8 節尚未完整驗收；未歸檔。臨時建立的獨立驗收頁已刪除，不納入提交；額外 preview 程序已停止。
