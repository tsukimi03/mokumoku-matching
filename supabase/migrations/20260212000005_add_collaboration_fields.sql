-- 協業・案件希望フィールド追加（詳細設問版）
-- 追加日: 2026-02-12

-- ユーザーテーブルに協業・案件希望フラグとその詳細を追加
ALTER TABLE users
ADD COLUMN IF NOT EXISTS seeking_collaboration BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS seeking_work_requests BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS collaboration_description TEXT,
ADD COLUMN IF NOT EXISTS work_request_description TEXT,

-- 協業希望の詳細項目
ADD COLUMN IF NOT EXISTS collaboration_fields TEXT[], -- 協業分野（複数選択）
ADD COLUMN IF NOT EXISTS collaboration_duration VARCHAR(20), -- 協業期間（short_term/long_term/both）
ADD COLUMN IF NOT EXISTS collaboration_compensation VARCHAR(50), -- 報酬形態（fixed/revenue_share/free/negotiable）
ADD COLUMN IF NOT EXISTS collaboration_free_text TEXT, -- 自由記述欄

-- 案件希望の詳細項目
ADD COLUMN IF NOT EXISTS work_request_type VARCHAR(20), -- 案件種類（receiving/offering/both）
ADD COLUMN IF NOT EXISTS work_request_budget VARCHAR(20), -- 予算規模（low/medium/high/negotiable）
ADD COLUMN IF NOT EXISTS work_request_timeline VARCHAR(20), -- 納期（urgent/normal/flexible）
ADD COLUMN IF NOT EXISTS work_request_free_text TEXT, -- 自由記述欄

-- PR欄（共通）
ADD COLUMN IF NOT EXISTS pr_message TEXT; -- 自己PR・アピール欄

-- インデックス追加（協業・案件希望者の検索を高速化）
CREATE INDEX IF NOT EXISTS idx_users_seeking_collaboration ON users(seeking_collaboration) WHERE seeking_collaboration = TRUE;
CREATE INDEX IF NOT EXISTS idx_users_seeking_work_requests ON users(seeking_work_requests) WHERE seeking_work_requests = TRUE;

-- コメント追加
COMMENT ON COLUMN users.seeking_collaboration IS '協業パートナーを探しているかどうか';
COMMENT ON COLUMN users.seeking_work_requests IS '案件・仕事を探している、または依頼したいかどうか';
COMMENT ON COLUMN users.collaboration_description IS '協業希望の簡潔な説明（任意、非推奨：詳細項目を使用）';
COMMENT ON COLUMN users.work_request_description IS '案件希望の簡潔な説明（任意、非推奨：詳細項目を使用）';
COMMENT ON COLUMN users.collaboration_fields IS '協業分野（例: ["開発", "デザイン", "マーケティング"]）';
COMMENT ON COLUMN users.collaboration_duration IS '協業期間（short_term/long_term/both）';
COMMENT ON COLUMN users.collaboration_compensation IS '報酬形態（fixed/revenue_share/free/negotiable）';
COMMENT ON COLUMN users.collaboration_free_text IS '協業希望の自由記述欄';
COMMENT ON COLUMN users.work_request_type IS '案件種類（receiving/offering/both）';
COMMENT ON COLUMN users.work_request_budget IS '予算規模（low/medium/high/negotiable）';
COMMENT ON COLUMN users.work_request_timeline IS '納期（urgent/normal/flexible）';
COMMENT ON COLUMN users.work_request_free_text IS '案件希望の自由記述欄';
COMMENT ON COLUMN users.pr_message IS '自己PR・アピール欄（協業・案件共通）';
