import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createDailyRoom } from '@/lib/daily'
import { isMockMode } from '@/lib/mock-data'

// 環境変数チェック - 未設定の場合はnull
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = (supabaseUrl && supabaseKey && !isMockMode())
  ? createClient(supabaseUrl, supabaseKey)
  : null

export async function POST() {
  try {
    // モックモードの場合
    if (!supabase) {
      console.log('[MOCK MODE] Matching API (mock)')
      return NextResponse.json({ matched: 0, message: 'Mock mode: Supabase not configured' })
    }

    // 待機中のキューを取得（停止ユーザーを除外）
    const { data: queue } = await supabase
      .from('matching_queue')
      .select(`
        *,
        user:users!matching_queue_user_id_fkey(is_suspended, bad_rating_count, session_count)
      `)
      .eq('status', 'waiting')
      .order('created_at', { ascending: true })

    // 各ユーザーの「また会いたい」リストを取得
    const { data: allPreferences } = await supabase
      .from('user_preferences')
      .select('user_id, preferred_user_id')

    // フィルタリング: 停止ユーザー、お試し期間終了で評価が悪いユーザーを除外
    const filteredQueue = queue?.filter(q => {
      const user = q.user as any
      if (user.is_suspended) return false
      // お試し期間（3セッション未満）で bad_rating が2以上 → マッチング不可
      if (user.session_count < 3 && user.bad_rating_count >= 2) return false
      return true
    }) || []

    if (!filteredQueue || filteredQueue.length < 2) {
      return NextResponse.json({ matched: 0 })
    }

    let matchCount = 0
    const matched = new Set<string>() // 既にマッチしたユーザーIDを記録

    // 優先マッチング: 「また会いたい」リストから優先的にマッチング
    for (let i = 0; i < filteredQueue.length - 1; i++) {
      if (matched.has(filteredQueue[i].id)) continue

      const user1 = filteredQueue[i]

      // user1が「また会いたい」と思っているユーザーのリスト
      const user1Preferences = allPreferences?.filter(p => p.user_id === user1.user_id).map(p => p.preferred_user_id) || []

      for (let j = i + 1; j < filteredQueue.length; j++) {
        if (matched.has(filteredQueue[j].id)) continue

        const user2 = filteredQueue[j]

        // user2が「また会いたい」と思っているユーザーのリスト
        const user2Preferences = allPreferences?.filter(p => p.user_id === user2.user_id).map(p => p.preferred_user_id) || []

        // 相互に「また会いたい」リストに入っているかチェック
        const isMutualPreference = user1Preferences.includes(user2.user_id) && user2Preferences.includes(user1.user_id)

        // マッチング条件: 時間帯が合えばOK（全国どこでもマッチング可能）
        const timeMatch = user1.available_times.some((t: string) => user2.available_times.includes(t))

        // 優先マッチング: 相互に「また会いたい」の場合は時間帯関係なく最優先
        // 通常マッチング: 時間帯が合えばマッチング
        if (isMutualPreference || timeMatch) {
          // Daily.coルーム作成
          const sessionId = crypto.randomUUID()
          const room = await createDailyRoom(sessionId)

          // セッション作成
          const { data: session } = await supabase.from('sessions').insert({
            id: sessionId,
            user1_id: user1.user_id,
            user2_id: user2.user_id,
            daily_room_url: room.url,
            daily_room_name: room.name,
            duration_minutes: 25,
            status: 'active'
          }).select().single()

          // キューを更新
          await supabase.from('matching_queue').update({
            status: 'matched',
            matched_with: user2.user_id,
            session_id: session!.id
          }).eq('id', user1.id)

          await supabase.from('matching_queue').update({
            status: 'matched',
            matched_with: user1.user_id,
            session_id: session!.id
          }).eq('id', user2.id)

          // マッチしたユーザーを記録
          matched.add(user1.id)
          matched.add(user2.id)

          matchCount++
          break
        }
      }
    }

    return NextResponse.json({ matched: matchCount })
  } catch (error) {
    console.error('Matching error:', error)
    return NextResponse.json({ error: 'Matching failed' }, { status: 500 })
  }
}
