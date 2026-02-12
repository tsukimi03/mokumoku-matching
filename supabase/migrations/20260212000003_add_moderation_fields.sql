-- ユーザーの評価・停止管理
ALTER TABLE users ADD COLUMN IF NOT EXISTS good_rating_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bad_rating_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_suspended BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS suspension_reason TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS session_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS work_history TEXT[];

-- セッションの通報管理
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS user1_reported BOOLEAN DEFAULT false;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS user2_reported BOOLEAN DEFAULT false;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS user1_report_reason TEXT;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS user2_report_reason TEXT;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS user1_report_message TEXT;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS user2_report_message TEXT;

-- コメント
COMMENT ON COLUMN users.good_rating_count IS '「また一緒に作業したい」の累計数';
COMMENT ON COLUMN users.bad_rating_count IS '「苦手」の累計数';
COMMENT ON COLUMN users.is_suspended IS 'アカウント停止フラグ';
COMMENT ON COLUMN users.suspension_reason IS '停止理由';
COMMENT ON COLUMN users.session_count IS '参加したセッション数';
COMMENT ON COLUMN users.phone_number IS '電話番号（SMS認証用）';
COMMENT ON COLUMN users.phone_verified IS '電話番号認証済みフラグ';
COMMENT ON COLUMN users.work_history IS '職歴（会社名のリスト）';
