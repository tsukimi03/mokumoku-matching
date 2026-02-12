# データベースマイグレーション手順

> **Last Updated**: 2026-02-12 17:10
> **対象**:
> 1. blocked_users テーブルの作成
> 2. 自動BANシステムの構築

## 概要
ユーザー通報・ブロック機能を実装しました。
以下のSQLをSupabaseダッシュボードで実行してください。

## 実行手順

### 1. Supabaseダッシュボードにアクセス
https://supabase.com/dashboard/project/qqcrtguwceytiatcuskg

### 2. SQL Editorを開く
左メニューから「SQL Editor」をクリック

### 3. 以下のSQLを実行

```sql
-- Blocked users table
CREATE TABLE blocked_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  blocked_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_id)
);

-- RLS
ALTER TABLE blocked_users ENABLE ROW LEVEL SECURITY;

-- Users can insert their own blocks
CREATE POLICY "blocked_users_insert_own" ON blocked_users
  FOR INSERT WITH CHECK (blocker_id = auth.uid());

-- Users can view their own blocks
CREATE POLICY "blocked_users_select_own" ON blocked_users
  FOR SELECT USING (blocker_id = auth.uid());

-- Users can delete their own blocks (unblock)
CREATE POLICY "blocked_users_delete_own" ON blocked_users
  FOR DELETE USING (blocker_id = auth.uid());

-- Index for faster lookups
CREATE INDEX blocked_users_blocker_idx ON blocked_users(blocker_id);
CREATE INDEX blocked_users_blocked_idx ON blocked_users(blocked_id);
```

### 4. 実行確認
- エラーが表示されないことを確認
- 「Success」メッセージが表示されればOK

### 5. テーブルの確認
左メニューから「Table Editor」→ 「blocked_users」が存在することを確認

## トラブルシューティング

### エラー: "relation already exists"
→ 既にテーブルが存在しています。問題ありません。

### エラー: "permission denied"
→ 管理者権限でログインしているか確認してください。

### エラー: "foreign key constraint"
→ usersテーブルが存在することを確認してください。

## 機能概要

### blocked_users テーブル
- **blocker_id**: ブロックしたユーザーのID
- **blocked_id**: ブロックされたユーザーのID
- **reason**: ブロック理由（任意）
- **created_at**: ブロック日時

### セキュリティ
- RLS（Row Level Security）有効
- ユーザーは自分のブロックリストのみ参照・編集可能
- 他のユーザーのブロック情報は見えない

### 使い方
1. セッション画面で相手ユーザーの「🚨 通報」ボタンをクリック
2. 通報理由を選択
3. 「このユーザーをブロックする」にチェックを入れると、今後マッチングしなくなる

---

**注意**: マイグレーションファイルは `supabase/migrations/20260212000007_create_blocked_users.sql` に保存されています。

---

## マイグレーション2: 自動BANシステム

### 1. Supabaseダッシュボードにアクセス
https://supabase.com/dashboard/project/qqcrtguwceytiatcuskg

### 2. SQL Editorを開く
左メニューから「SQL Editor」をクリック

### 3. 以下のSQLを実行

このSQLは `supabase/migrations/20260212000008_auto_ban_system.sql` にあります。

主な機能:
- **自動BAN**: 3回通報されたユーザーを自動的に利用停止
- **通報回数カウント**: usersテーブルにreport_count列を追加
- **Database Trigger**: 通報INSERT時に自動実行
- **管理用View**: 複数回通報されたユーザーの一覧

### 4. 実行確認
- エラーが表示されないことを確認
- 「Success」メッセージが表示されればOK

### 5. 動作確認
1. 同じユーザーに対して3回通報を実行
2. 自動的にis_suspendedがtrueになることを確認
3. 管理画面で「自動BAN」のメモが表示されることを確認

### トラブルシューティング

#### エラー: "function already exists"
→ 既に関数が存在しています。問題ありません。

#### エラー: "column already exists"
→ 既にカラムが存在しています。問題ありません。

**注意**: マイグレーションファイルは `supabase/migrations/20260212000008_auto_ban_system.sql` に保存されています。
