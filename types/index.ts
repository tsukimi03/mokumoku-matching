export interface User {
  id: string
  email: string
  display_name: string
  area_prefecture: string
  area_city: string
  job_categories: string[]
  skills?: string
  available_work?: string
  portfolio_url?: string
  available_times: string[]
  prefer_camera: boolean
  prefer_audio: boolean
  is_banned: boolean
  created_at: string
  updated_at: string
}

export interface MatchingQueue {
  id: string
  user_id: string
  area_prefecture: string
  area_city: string
  available_times: string[]
  status: 'waiting' | 'matched' | 'cancelled'
  matched_with?: string
  session_id?: string
  created_at: string
  expires_at: string
}

export interface Session {
  id: string
  user1_id: string
  user2_id: string
  daily_room_url: string
  duration_minutes: number
  started_at: string
  ended_at?: string
  status: 'active' | 'completed' | 'cancelled'
  user1_feedback?: string
  user2_feedback?: string
  created_at: string
}

export interface Report {
  id: string
  reporter_id: string
  reported_user_id: string
  session_id?: string
  reason: string
  status: 'pending' | 'reviewed' | 'resolved'
  admin_note?: string
  created_at: string
  reviewed_at?: string
}
