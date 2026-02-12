-- Matching Queue table
CREATE TABLE matching_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  area_prefecture TEXT NOT NULL,
  area_city TEXT NOT NULL,
  available_times TEXT[] NOT NULL,
  status TEXT NOT NULL DEFAULT 'waiting',
  matched_with UUID REFERENCES users(id),
  session_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 minutes'
);

-- Indexes
CREATE INDEX idx_matching_queue_status ON matching_queue(status);
CREATE INDEX idx_matching_queue_area ON matching_queue(area_prefecture, area_city);
CREATE INDEX idx_matching_queue_expires ON matching_queue(expires_at);

-- RLS
ALTER TABLE matching_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "queue_select_own" ON matching_queue FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "queue_insert_own" ON matching_queue FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "queue_update_own" ON matching_queue FOR UPDATE USING (user_id = auth.uid());
