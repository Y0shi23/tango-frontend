# ベースイメージ
FROM node:latest

# 作業ディレクトリ
WORKDIR /app

# npmをアップデート
RUN npm install -g npm@11.2.0

# 既存のプロジェクトファイルをコピー
COPY app/application/package*.json ./application/
COPY app/ ./application/

# applicationディレクトリに移動して依存関係をインストール
WORKDIR /app/application
RUN npm install

# 起動時の初期化スクリプトを追加
COPY init.sh /init.sh
RUN chmod +x /init.sh

# 作業ディレクトリを戻す
WORKDIR /app

# 起動コマンド
CMD ["/init.sh"]