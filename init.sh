#!/bin/sh
set -e

# applicationディレクトリを作成（存在しない場合）
mkdir -p /app/application

# applicationディレクトリに移動
cd /app/application

# package.jsonが存在するかチェック
if [ ! -f "package.json" ]; then
  echo "package.json not found. Creating new Next.js project..."
  
  # 先にcreate-next-appをインストール
  echo "Installing create-next-app globally..."
  npm install -g create-next-app@latest
  
  # ディレクトリをクリーニング（必要な場合）
  echo "Preparing directory for fresh installation..."
  if [ -d "node_modules" ]; then
    echo "Removing existing node_modules directory..."
    rm -rf node_modules || true
  fi
  
  # Next.jsプロジェクトを作成（非対話モード）
  echo "Creating Next.js project..."
  create-next-app . \
    --ts \
    --tailwind \
    --eslint \
    --app \
    --src-dir \
    --import-alias "@/*" \
    --use-npm \
    --no-git \
    --skip-instructions \
    --yes
  
  echo "Next.js project created successfully!"
else
  echo "package.json found. Using existing project."
fi

# 依存関係をインストール（必要な場合）
if [ -f "package.json" ] && [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Next.js開発サーバーを起動
echo "Starting Next.js development server..."
npm run dev 