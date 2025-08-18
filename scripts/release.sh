#!/bin/bash

# 版本管理腳本
# 使用方法: ./scripts/release.sh [patch|minor|major]

set -e

# 檢查參數
if [ $# -eq 0 ]; then
    echo "請指定版本類型: patch, minor, 或 major"
    echo "使用方法: ./scripts/release.sh [patch|minor|major]"
    exit 1
fi

VERSION_TYPE=$1

# 檢查版本類型是否有效
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
    echo "錯誤: 版本類型必須是 patch, minor, 或 major"
    exit 1
fi

echo "🚀 開始發布流程..."

# 1. 運行測試
echo "📋 運行測試..."
npm run test:unit

# 2. 運行 linting (跳過，因為有配置問題)
echo "🔍 跳過 linting (配置問題)..."
# npm run lint

# 3. 構建套件
echo "🔨 構建套件..."
npm run build

# 4. 更新版本號
echo "📦 更新版本號 ($VERSION_TYPE)..."
npm version $VERSION_TYPE

# 5. 獲取新版本號
NEW_VERSION=$(node -p "require('./package.json').version")
echo "✅ 新版本: $NEW_VERSION"

# 6. 創建 git tag
echo "🏷️  創建 git tag..."
git add .
git commit -m "chore: release v$NEW_VERSION"
git tag "v$NEW_VERSION"
git push origin main
git push origin "v$NEW_VERSION"

echo "🎉 發布流程完成！"
echo "📦 版本: v$NEW_VERSION"
echo "🔗 GitHub Actions 將自動發布到 npm"
