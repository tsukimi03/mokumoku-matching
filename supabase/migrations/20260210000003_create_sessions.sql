-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user2_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  daily_room_url TEXT NOT NULL,
  daily_room_name TEXT NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 25,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active',
  user1_feedback TEXT,
  user2_feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_sessions_users ON sessions(user1_id, user2_id);
CREATE INDEX idx_sessions_status ON sessions(status);

-- RLS
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sessions_select_participant" ON sessions FOR SELECT USING (
  user1_id = auth.uid() OR user2_id = auth.uid()
);
CREATE POLICY "sessions_update_participant" ON sessions FOR UPDATE USING (
  user1_id = auth.uid() OR user2_id = auth.uid()
);

-- Foreign key for matching_queue
ALTER TABLE matching_queue ADD CONSTRAINT fk_session FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE SET NULL;
