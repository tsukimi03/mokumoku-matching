// モックデータ（開発・デモ用）

export const mockUsers = [
  {
    id: 'mock-user-1',
    email: 'user1@example.com',
    display_name: '田中太郎',
    area_prefecture: '東京都',
    area_city: '渋谷区',
    job_categories: ['エンジニア', 'デザイナー'],
    skills: 'React, TypeScript, Figma',
    available_work: 'Webアプリ開発',
    portfolio_url: 'https://example.com',
    available_times: ['morning', 'afternoon'],
    prefer_camera: false,
    prefer_audio: false,
    is_banned: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-user-2',
    email: 'user2@example.com',
    display_name: '佐藤花子',
    area_prefecture: '東京都',
    area_city: '渋谷区',
    job_categories: ['ライター', 'マーケター'],
    skills: 'SEOライティング, SNS運用',
    available_work: 'コンテンツ制作',
    portfolio_url: null,
    available_times: ['morning', 'afternoon'],
    prefer_camera: false,
    prefer_audio: false,
    is_banned: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export const mockSession = {
  id: 'mock-session-1',
  user1_id: 'mock-user-1',
  user2_id: 'mock-user-2',
  daily_room_url: 'https://mock.daily.co/room',
  daily_room_name: 'mokumoku-mock-session-1',
  duration_minutes: 25,
  started_at: new Date().toISOString(),
  ended_at: null,
  status: 'active',
  user1_feedback: null,
  user2_feedback: null,
  created_at: new Date().toISOString()
}

// モックモードが有効かチェック
export function isMockMode(): boolean {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const dailyKey = process.env.DAILY_API_KEY || ''

  // 環境変数がダミー値または空の場合、モックモード
  return (
    !supabaseUrl ||
    supabaseUrl.includes('your_supabase_url') ||
    !dailyKey ||
    dailyKey.includes('your_daily_api_key')
  )
}

export function getMockUser(userId: string) {
  return mockUsers.find(u => u.id === userId) || mockUsers[0]
}
