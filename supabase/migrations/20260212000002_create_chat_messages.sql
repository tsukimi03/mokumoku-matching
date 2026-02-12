-- Chat messages table
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_stamp BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id, created_at);

-- RLS
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- セッション参加者のみ閲覧可能
CREATE POLICY "chat_messages_select_session_participants" ON chat_messages
  FOR SELECT
  USING (
    session_id IN (
      SELECT id FROM sessions
      WHERE user1_id = auth.uid() OR user2_id = auth.uid()
    )
  );

-- セッション参加者のみ投稿可能
CREATE POLICY "chat_messages_insert_session_participants" ON chat_messages
  FOR INSERT
  WITH CHECK (
    user_id = auth.uid() AND
    session_id IN (
      SELECT id FROM sessions
      WHERE user1_id = auth.uid() OR user2_id = auth.uid()
    )
  );
