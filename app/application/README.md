# English Vocab App

英語学習アプリケーションのログイン画面を含むNext.jsアプリケーションです。

## 機能

- 📚 美しいログイン画面
- 🔐 ログイン/新規登録の切り替え
- 👁️ パスワード表示/非表示機能
- 🎨 レスポンシブデザイン
- 🚀 Tailwind CSSによるモダンなUI
- 📱 モバイル対応

## 技術スタック

- **Next.js 15** - React フレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **Lucide React** - アイコン
- **Docker** - コンテナ化

## 開発環境での実行

### 前提条件
- Docker
- Docker Compose

### 開発サーバーの起動

```bash
# 開発環境でコンテナを起動
docker-compose --profile dev up english-vocab-dev

# または、バックグラウンドで実行
docker-compose --profile dev up -d english-vocab-dev
```

アプリケーションは http://localhost:3001 でアクセスできます。

### 本番環境での実行

```bash
# 本番環境でコンテナを起動
docker-compose up english-vocab-app

# または、バックグラウンドで実行
docker-compose up -d english-vocab-app
```

アプリケーションは http://localhost:3000 でアクセスできます。

## ページ構成

- `/` - ホームページ
- `/login` - ログインページ（English Vocab Login）

## ログイン画面の特徴

### 左側パネル
- ロゴとアプリ名
- ログイン/新規登録の切り替えタブ
- メールアドレス入力フィールド
- パスワード入力フィールド（表示/非表示切り替え可能）
- ログイン状態保持チェックボックス
- パスワード忘れリンク
- ソーシャルログイン（Google、Twitter）
- 利用規約・プライバシーポリシーリンク

### 右側パネル（デスクトップのみ）
- アプリの機能紹介
- 統計情報の表示
- グラデーション背景

## 開発

### ローカル開発（Dockerなし）

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### ビルド

```bash
# 本番ビルド
npm run build

# 本番サーバーの起動
npm start
```

### リンティング

```bash
npm run lint
```

## Docker コマンド

```bash
# イメージのビルド
docker-compose build

# コンテナの停止
docker-compose down

# ログの確認
docker-compose logs -f

# コンテナの再起動
docker-compose restart
```

## カスタマイズ

### スタイルの変更
- `src/components/EnglishVocabLogin.tsx` でコンポーネントのスタイルを変更
- Tailwind CSSクラスを使用してデザインをカスタマイズ

### 機能の追加
- 新しいページは `src/app/` ディレクトリに追加
- コンポーネントは `src/components/` ディレクトリに追加

## ライセンス

MIT License
