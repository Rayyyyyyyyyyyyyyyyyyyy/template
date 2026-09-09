## 1. 建立基線與消費端驗證（先做；package-consumption）

- [ ] 1.1 列出全部 exports、實際建置產物及依賴邊界；查 git 歷史確認 utils/styles 是否有有效契約，記錄恢復或移除決策。
- [ ] 1.2 建立使用 tarball 的最小 Vue consumer fixture，覆蓋 root、components、types、utils、locales、CSS、SCSS、preset；不得透過 repo alias。
- [ ] 1.3 記錄 baseline lib/demo 建置與 consumer 結果，補封包入口存在性與測試檔排除檢查，確保已知失效入口能被抓到。

## 2. 修正封包入口（依賴 1；package-consumption）

- [ ] 2.1 統一 runtime exports 至建置 JS，types 至生成 declarations，保留有效 subpaths 與明確樣式資產入口。
- [ ] 2.2 按 1.1 決策處理 utils/styles；核對 ESM/CJS 副檔名與 package type，驗證宣告的 import/require。
- [ ] 2.3 明確配置 bundled/external 與直接依賴，移除封包測試檔，通過乾淨 consumer 安裝、編譯及資產載入。

## 3. 修補明確行為（依賴 1；component-contracts）

- [ ] 3.1 補 customWidth 的顯式值與預設寬度測試，修正 BaseDialog 寬度設定。
- [ ] 3.2 補 showPagination 未提供/true/false 搭配零與非零 totalCount 的案例；明確 Boolean default 並修正顯示判斷。
- [ ] 3.3 以實際元件掛載替換 placeholder 測試，覆蓋 BaseTable 選取/排序/template/expand 及面板頁碼與頁大小事件。
- [ ] 3.4 分離 TransferDialog 完整草稿與搜尋顯示集合，以欄位 identity 更新草稿；補搜尋→勾選→確認、清除/更換搜尋保留排序與勾選、取消重開的整合測試，確認 payload 保留所有欄位且未提交操作不改寫宿主。

## 4. 收斂公開型別（依賴 2、3；component-contracts）

- [ ] 4.1 為 BaseDialog、BaseTable、SearchableListPanel 建立共同 props/emits/slots 來源，衍生 macro 與公共相容型別；保留 BaseTableEmits handler map 及既有 callable emits 形狀。
- [ ] 4.2 將其餘元件遷移至相同模式，移除手工 declaration 鏡像，保留既有公開型別名稱、路徑與合法使用形狀。
- [ ] 4.3 增加打包後 consumer 型別正反例，涵蓋 customWidth、泛型 row、事件 payload、slots、BaseTableEmits<Row>['selection-change'] indexed access 與 BaseDialogEmits callable，驗證舊用法相容。

## 5. 統一語系所有權（依賴 3、4；locale-ownership）

- [ ] 5.1 補宿主 zh-TW/en-US 動態切換測試，覆蓋表格空資料、搜尋與對話框。
- [ ] 5.2 修正分頁：未傳 locale 時繼承外層 provider，顯式 prop 局部覆寫；兩種案例均通過測試。
- [ ] 5.3 保留 legacy setLocale/useI18n/plugin locale 入口與用途，加入 deprecated 說明及宿主 i18n 遷移範例，驗證舊 import 仍可編譯。

## 6. 整理依賴與文件（依賴 2–5；quality-gates）

- [ ] 6.1 將庫內部經公共 barrel 的互相引用改為直接引用；確認 caller 後清除未使用 Pinia 與 router import，跑相應建置檢查。
- [ ] 6.2 更新 README/安裝指南/文件中心的入口、型別、寬度、分頁與語系範例；更正完整測試及持久化等無證據描述。
- [ ] 6.3 修正列表 demo 的搜尋和頁碼切片，保持 mock 身分與實際 totalCount 一致；新增相應 E2E，替換模板首頁斷言。

## 7. 建立共用品質門檻與交付（依賴 1–6；quality-gates）

- [ ] 7.1 分離 lint/check 與 lint:fix，新增共用驗證命令；隔離 lib/demo 輸出，避免測試錯用另一種 dist。
- [ ] 7.2 CI 加入 pull_request 觸發；將 ci.yml、publish.yml、prepublishOnly 與 release.sh 接到共用驗證，內部 pack 已建置產物時使用 --ignore-scripts 避免重入。以 stub/隔離流程驗證失敗會在本地 publish 或 release 的升版/tag/push 前阻斷，不執行真實發布或推送。
- [ ] 7.3 執行完整驗證：非寫入 lint、型別、元件測試、lib/demo build、tarball consumer 與 E2E，記錄結果與剩餘限制。
- [ ] 7.4 提供變更/相容性說明與可審閱 diff；另列 3.0 的 BaseWarningDialog alias、事件命名與文件生成候選，不在本 change 改名、升版、tag 或發布。
