# もくもく作業マッチングアプリ

フリーランスが地域の人とオンラインで繋いでもくもく作業し、サボらず仕事できる環境を作るマッチングアプリ。

## 📝 概要

- **目的**: フリーランスの作業集中力向上
- **機能**: 地域・時間帯ベースの1対1マッチング
- **ビデオ通話**: Daily.co（軽量WebRTC）
- **デフォルト**: カメラOFF・音声OFF推奨（PC負荷軽減）

## 🛠 技術スタック

- **フロントエンド**: Next.js 16 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **バックエンド**: Supabase（認証 + DB + Realtime）
- **ビデオ通話**: Daily.co（WebRTC）
- **デプロイ**: Vercel

## 📋 主要機能

1. **認証**: メール/パスワード + Google OAuth
2. **プロフィール登録**: スキル、職種、エリア、稼働時間帯
3. **マッチング**: 同エリア + 時間帯でリアルタイムマッチング
4. **セッション**: 25分タイマー + Daily.coビデオルーム
5. **フィードバック**: セッション終了後の軽いレビュー

## 🚀 クイックスタート

### 前提条件

- Node.js 18+
- npm または yarn
- Supabaseアカウント（無料）: https://supabase.com/
- Daily.coアカウント（無料）: https://www.daily.co/

### セットアップ手順（5分）

#### 1. リポジトリのクローンとインストール

```bash
cd mokumoku_matching
npm install
```

#### 2. Supabaseプロジェクトの作成

1. https://supabase.com/ でプロジェクト作成
2. Project Settings → API から以下をコピー:
   - `Project URL`
   - `anon public` key
   - `service_role` key (secret)

#### 3. Daily.coのAPIキー取得

1. https://www.daily.co/ でアカウント作成
2. Dashboard → Developers → API Keys から APIキーをコピー

#### 4. 環境変数の設定

`.env.local` ファイルを編集（既にテンプレートあり）:

```env
# Supabase（実際の値に置き換えてください）
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Daily.co（実際の値に置き換えてください）
NEXT_PUBLIC_DAILY_API_KEY=your_daily_api_key_here
DAILY_API_KEY=your_daily_api_key_here
```

#### 5. データベースのセットアップ

Supabase Dashboard → SQL Editor で、以下のマイグレーションファイルを順番に実行:

```bash
supabase/migrations/20260210000001_create_users.sql
supabase/migrations/20260210000002_create_matching_queue.sql
supabase/migrations/20260210000003_create_sessions.sql
supabase/migrations/20260210000004_create_reports.sql
supabase/migrations/20260210000005_create_admin_users.sql
```

#### 6. 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 にアクセス

### 詳細ドキュメント

- [詳細セットアップ手順](docs/SETUP.md)
- [Daily.coセットアップ](docs/DAILY_SETUP.md)

## 📂 ディレクトリ構成

```
mokumoku_matching/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 認証画面（login, signup）
│   ├── profile/edit/      # プロフィール編集
│   ├── matching/          # マッチング待機画面
│   ├── session/[id]/      # セッション画面
│   └── api/               # APIルート
├── components/            # Reactコンポーネント
│   ├── ui/               # shadcn/ui
│   └── DailyVideoRoom.tsx # ビデオ通話
├── lib/                   # ユーティリティ
│   ├── supabase-browser.ts
│   ├── supabase-server.ts
│   └── daily.ts          # Daily.co統合
├── supabase/
│   └── migrations/       # DB設計
└── docs/
    └── SETUP.md          # セットアップ詳細

```

## 🗄 データベース

Supabase PostgreSQL:
- `users`: ユーザープロフィール
- `matching_queue`: マッチング待機キュー
- `sessions`: 作業セッション
- `reports`: 通報
- `admin_users`: 管理者

## 📚 ドキュメント

- [セットアップ手順](docs/SETUP.md)
- [Daily.coセットアップ](docs/DAILY_SETUP.md)
- [DB設計](supabase/migrations/)
- [技術調査結果](/home/nanase/multi-agent-shogun/mokumoku_tech_research.md)
- [設計書](/home/nanase/multi-agent-shogun/mokumoku_design.md)

## 🎯 MVP完成度

**95%完了** - コア機能実装完了、環境変数設定のみ

- ✅ 認証（ログイン/サインアップ/OAuth）
- ✅ プロフィール登録・編集
- ✅ マッチング機能（Realtime監視）
- ✅ セッション画面（タイマー、ビデオ通話、相手情報）
- ✅ フィードバック画面（評価システム）
- ✅ Daily.co統合（カメラ/音声ON/OFF）
- ⚠️ 環境変数設定が必要（Supabase + Daily.co）

## 📄 ライセンス

MIT
