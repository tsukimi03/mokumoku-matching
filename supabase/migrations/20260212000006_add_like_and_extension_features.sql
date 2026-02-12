-- 「また会いたい」機能と時間延長機能のためのフィールド追加
-- 追加日: 2026-02-12

-- セッションテーブルに「また会いたい」フラグと時間延長フィールド追加
ALTER TABLE sessions
ADD COLUMN IF NOT EXISTS user1_wants_to_meet_again BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS user2_wants_to_meet_again BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS extended_minutes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS extension_count INTEGER DEFAULT 0;

-- ユーザー間の「また会いたい」履歴を記録するテーブル（優先マッチング用）
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  preferred_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- 同じペアは1回だけ記録（ユニーク制約）
  UNIQUE(user_id, preferred_user_id)
);

-- インデックス追加（マッチング時の検索を高速化）
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_preferred_user_id ON user_preferences(preferred_user_id);

-- Row Level Security (RLS) 設定
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分の好み情報のみ閲覧・作成可能
CREATE POLICY "Users can view their own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- コメント追加
COMMENT ON COLUMN sessions.user1_wants_to_meet_again IS 'ユーザー1が「また会いたい」を押したか';
COMMENT ON COLUMN sessions.user2_wants_to_meet_again IS 'ユーザー2が「また会いたい」を押したか';
COMMENT ON COLUMN sessions.extended_minutes IS 'セッション延長時間（分）';
COMMENT ON COLUMN sessions.extension_count IS 'セッション延長回数（最大3回まで）';
COMMENT ON TABLE user_preferences IS 'ユーザーが「また会いたい」と思った相手の履歴（優先マッチング用）';
