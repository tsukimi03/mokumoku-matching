-- Add tags column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Add comment
COMMENT ON COLUMN users.tags IS 'ユーザーが選択したタグ（例: #顔出しOKです、#音声ONできます）';
