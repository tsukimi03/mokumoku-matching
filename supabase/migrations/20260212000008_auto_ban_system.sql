-- Auto-ban system: Automatically suspend users after receiving multiple reports

-- Function to check and auto-suspend users with multiple reports
CREATE OR REPLACE FUNCTION check_and_auto_suspend()
RETURNS TRIGGER AS $$
DECLARE
  report_count INTEGER;
  auto_ban_threshold INTEGER := 3; -- 閾値: 3回通報でBAN
BEGIN
  -- Count total reports for the reported user (excluding resolved reports)
  SELECT COUNT(*)
  INTO report_count
  FROM reports
  WHERE reported_user_id = NEW.reported_user_id
    AND status IN ('pending', 'reviewed'); -- 解決済みは除外

  -- If report count reaches threshold, auto-suspend
  IF report_count >= auto_ban_threshold THEN
    -- Suspend the user
    UPDATE users
    SET is_suspended = true
    WHERE id = NEW.reported_user_id;

    -- Mark this report as resolved with auto-ban note
    UPDATE reports
    SET
      status = 'resolved',
      admin_note = '自動BAN: 通報回数が閾値に達しました（' || report_count || '回）',
      reviewed_at = NOW()
    WHERE id = NEW.id;

    -- Log the auto-ban action
    RAISE NOTICE 'Auto-suspended user % after % reports', NEW.reported_user_id, report_count;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Execute check after each report insert
DROP TRIGGER IF EXISTS trigger_check_auto_suspend ON reports;
CREATE TRIGGER trigger_check_auto_suspend
  AFTER INSERT ON reports
  FOR EACH ROW
  EXECUTE FUNCTION check_and_auto_suspend();

-- Add report_count field to users table for quick reference (optional, for display)
ALTER TABLE users ADD COLUMN IF NOT EXISTS report_count INTEGER DEFAULT 0;

-- Function to update report count
CREATE OR REPLACE FUNCTION update_user_report_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Increment report count for the reported user
  UPDATE users
  SET report_count = (
    SELECT COUNT(*)
    FROM reports
    WHERE reported_user_id = NEW.reported_user_id
      AND status IN ('pending', 'reviewed')
  )
  WHERE id = NEW.reported_user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update report count after insert/update
DROP TRIGGER IF EXISTS trigger_update_report_count ON reports;
CREATE TRIGGER trigger_update_report_count
  AFTER INSERT OR UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION update_user_report_count();

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_reports_reported_user_status ON reports(reported_user_id, status);

-- View: Users with multiple reports (for admin monitoring)
CREATE OR REPLACE VIEW users_with_multiple_reports AS
SELECT
  u.id,
  u.display_name,
  u.email,
  u.is_suspended,
  u.report_count,
  COUNT(r.id) as pending_report_count,
  MAX(r.created_at) as last_report_date
FROM users u
LEFT JOIN reports r ON r.reported_user_id = u.id AND r.status IN ('pending', 'reviewed')
WHERE u.report_count > 0
GROUP BY u.id, u.display_name, u.email, u.is_suspended, u.report_count
ORDER BY u.report_count DESC, last_report_date DESC;

-- Grant access to authenticated users for the view
GRANT SELECT ON users_with_multiple_reports TO authenticated;
