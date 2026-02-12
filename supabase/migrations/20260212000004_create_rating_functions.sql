-- good_rating_count をインクリメントする関数
CREATE OR REPLACE FUNCTION increment_good_rating(user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE users
  SET good_rating_count = good_rating_count + 1
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- session_count をインクリメントする関数
CREATE OR REPLACE FUNCTION increment_session_count(user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE users
  SET session_count = session_count + 1
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
