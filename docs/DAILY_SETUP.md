# Daily.co セットアップ手順

## 1. Daily.coアカウント作成

1. https://www.daily.co/ にアクセス
2. Sign up（無料）
3. Dashboard → Developers → API Keys からAPIキーを取得

## 2. 環境変数設定

`.env.local` に以下を追加:
```
DAILY_API_KEY=your_daily_api_key_here
NEXT_PUBLIC_DAILY_API_KEY=your_daily_api_key_here
```

## 3. 動作確認

1. マッチング成立後、Daily.coルームが自動作成される
2. セッション画面でビデオ通話が開始される
3. デフォルトでカメラOFF・音声OFF

## 4. 無料枠

- 10,000分/月（月間200セッション相当）
- 超過時: $0.004/参加者分

## 5. トラブルシューティング

- ルーム作成エラー → APIキーを確認
- 接続できない → ブラウザのカメラ・マイク権限を確認
