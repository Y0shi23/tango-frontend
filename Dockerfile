# ベースイメージ
FROM node:latest

# 作業ディレクトリ
WORKDIR /app

# npmをアップデート
RUN npm install -g npm@11.2.0

# 起動時の初期化スクリプトを追加
COPY init.sh /init.sh
RUN chmod +x /init.sh

# 起動コマンド
CMD ["/init.sh"]