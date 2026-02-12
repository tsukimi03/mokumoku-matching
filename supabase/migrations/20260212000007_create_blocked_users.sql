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
