# 發布檢查清單

## 發布前準備

1. **安裝依賴**
   ```bash
   npm install
   ```

2. **運行測試**
   ```bash
   npm run test:unit
   npm run lint
   ```

3. **構建套件**
   ```bash
   npm run build
   ```

4. **檢查構建產出**
   - 確認 `dist/` 目錄包含：
     - `index.es.js` (ES modules)
     - `index.umd.js` (UMD)
     - `index.d.ts` (TypeScript 類型)
     - `style.css` (樣式文件)

5. **更新版本號**
   ```bash
   npm version patch  # 或 minor, major
   ```

6. **發布到 npm**
   ```bash
   npm publish
   ```

## 本地測試

可以使用 `npm link` 在本地測試套件：

```bash
# 在套件目錄
npm link

# 在測試項目中
npm link @your-scope/vue-table-components
```

## 使用示例

參考 `README.md` 中的使用說明。

## 注意事項

- 確保 `package.json` 中的 `name` 和 `repository` 字段正確
- 檢查 `peerDependencies` 版本範圍
- 確認 `.npmignore` 文件正確排除不需要的文件
- 測試在不同 Vue 3 版本中的兼容性
