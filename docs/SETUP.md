# もくもく作業マッチングアプリ - 詳細セットアップ手順

## 前提条件

- Node.js 18以上
- npm または yarn
- GitHubアカウント（OAuth用、オプション）

## 1. Supabaseプロジェクト作成（5分）

### 1-1. アカウント作成とプロジェクト作成

1. https://supabase.com/ にアクセス
2. 「Start your project」または「New Project」をクリック
3. 以下の情報を入力:
   - プロジェクト名: `mokumoku-matching`（任意）
   - データベースパスワード: **必ず安全な場所に保存**
   - リージョン: `Northeast Asia (Tokyo)` 推奨
4. 「Create new project」をクリック
5. プロジェクトの作成完了を待つ（1-2分）

### 1-2. APIキーの取得

1. 左サイドバー → ⚙️ Project Settings
2. API タブをクリック
3. 以下の3つの値をコピー（後で使用）:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbGc...`（長い文字列）
   - **service_role**: `eyJhbGc...`（長い文字列、⚠️ 秘密にする）

## 2. 環境変数設定

`.env.local` を作成:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

NEXT_PUBLIC_DAILY_API_KEY=your_daily_api_key
DAILY_API_KEY=your_daily_api_key
```

## 3. Daily.coアカウント作成

1. https://www.daily.co/ にアクセス
2. Sign up（無料）
3. Dashboard → Developers → API Keys
4. APIキーをコピーして .env.local に貼り付け

## 4. データベースマイグレーション

Supabase SQL Editorで以下を実行:

```bash
# supabase/migrations/ 内の全てのSQLファイルを順番に実行
```

## 5. 開発サーバー起動

```bash
npm install
npm run dev
```

http://localhost:3000 にアクセス

## 6. 動作確認

1. サインアップ → プロフィール登録
2. 「今から作業する」をクリック
3. 別のブラウザ/シークレットモードで2人目を登録
4. マッチング成立 → セッション開始

## トラブルシューティング

- Supabase接続エラー → APIキーを確認
- Daily.coルーム作成エラー → APIキーを確認
- マッチングしない → 同じエリア・時間帯で登録しているか確認
