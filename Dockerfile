# ベースイメージ
FROM node:20-alpine

# 作業ディレクトリ
WORKDIR /app

# システムパッケージを更新
RUN apk add --no-cache curl

# アプリケーションディレクトリを作成
RUN mkdir -p /app/application

# 起動時の初期化スクリプトを追加
COPY init.sh /init.sh
RUN chmod +x /init.sh

# ポートを公開
EXPOSE 3000

# 起動コマンド
CMD ["/init.sh"]


