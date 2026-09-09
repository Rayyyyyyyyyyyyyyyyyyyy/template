## Why

元件庫的公開入口、手工型別與語系設定存在不一致，現有測試無法證明使用者安裝 tarball 後可正常使用。先建立可驗證的消費端契約，降低後續功能與版本更新的整合成本。

## What Changes

- 統整公開入口的建置產物，補齊或相容處理失效入口，驗證套件內容與消費端安裝。
- 統一元件 props/emits/slots 型別來源，修正 customWidth 和 showPagination 的既有設定行為。
- 由宿主 i18n 擁有語系，保留舊 API 的相容入口並說明限制；分頁繼承宿主 Element Plus 設定。
- 建立核心元件、型別、tarball 與 demo 的驗證，加入 PR CI，讓檢查不修改原始碼。
- 更新文件和示例，清除經確認未使用的依賴與 import。
- 本 change 不包含破壞性 API 改名、npm 發布或版本號更新；3.0 另開 change。

## Capabilities

### New Capabilities

- `package-consumption`: 公開入口、封包完整性與消費端驗證。
- `component-contracts`: 型別來源、核心元件行為與相容性。
- `locale-ownership`: 宿主語系、分頁覆寫與舊 API 遷移說明。
- `quality-gates`: PR 檢查、發布前驗證與可執行文件範例。

### Modified Capabilities

無既有 OpenSpec specs；上述能力是對現有元件庫首次建立規格。

## Impact

影響 package.json、Vite 建置、src/index.ts、src/components、src/types、src/utils/i18n.ts、demo、README、測試與 GitHub Actions。保持業務資料由宿主擁有，不引入 API client 或資料庫。修正 export 產物時保留既有可用 import 路徑；重大移除留待後續版本。
