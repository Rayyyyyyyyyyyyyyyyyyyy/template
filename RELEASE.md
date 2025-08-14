# 發布流程

## 🚀 自動化發布

本專案使用 GitHub Actions 自動化發布流程。

### 觸發條件

1. **推送 Tag** - 當推送 `v*` 格式的 tag 時自動發布
2. **手動觸發** - 在 GitHub Actions 頁面手動觸發

### 發布步驟

1. **測試** - 運行單元測試
2. **Linting** - 代碼檢查
3. **構建** - 構建套件
4. **發布** - 發布到 npm
5. **Release** - 創建 GitHub Release

## 📦 手動發布

### 使用發布腳本

```bash
# 修復版本 (1.0.0 -> 1.0.1)
./scripts/release.sh patch

# 次要版本 (1.0.0 -> 1.1.0)
./scripts/release.sh minor

# 主要版本 (1.0.0 -> 2.0.0)
./scripts/release.sh major
```

### 手動步驟

```bash
# 1. 更新版本號
npm version patch  # 或 minor, major

# 2. 構建套件
npm run build

# 3. 發布到 npm
npm publish

# 4. 創建 git tag
git tag "v$(node -p "require('./package.json').version")"
git push origin main --tags
```

## 🔧 設置

### 1. NPM Token

在 GitHub Repository Settings > Secrets 中添加：

```
NPM_TOKEN=your_npm_token_here
```

### 2. 獲取 NPM Token

1. 登入 npmjs.com
2. 進入 Profile > Access Tokens
3. 創建新的 Token (Automation)
4. 複製 Token 到 GitHub Secrets

## 📋 檢查清單

發布前請確認：

- [ ] 所有測試通過
- [ ] Linting 檢查通過
- [ ] TypeScript 類型檢查通過
- [ ] 構建成功
- [ ] README 更新
- [ ] 版本號正確
- [ ] NPM Token 設置正確

## 🎯 版本規範

- **patch** - 修復 bug (1.0.0 -> 1.0.1)
- **minor** - 新功能 (1.0.0 -> 1.1.0)
- **major** - 破壞性變更 (1.0.0 -> 2.0.0)
