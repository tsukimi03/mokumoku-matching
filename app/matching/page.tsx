'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function MatchingPage() {
  const [waiting, setWaiting] = useState(false)
  const [queueId, setQueueId] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  // プロフィール読み込み
  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single()
      if (profile) {
        setUserProfile(profile)
      }
    }
    loadProfile()
  }, [supabase])

  useEffect(() => {
    if (!queueId) return

    // Realtime監視: マッチング成立を検知
    const channel = supabase
      .channel('queue_changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'matching_queue', filter: `id=eq.${queueId}` },
        (payload: any) => {
          if (payload.new.status === 'matched') {
            router.push(`/session/${payload.new.session_id}`)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [queueId, supabase, router])

  const startWaiting = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    // 自分のプロフィール取得
    const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single()
    if (!profile) {
      router.push('/profile/edit')
      return
    }

    // 待機キューに登録
    const { data, error } = await supabase.from('matching_queue').insert({
      user_id: user.id,
      area_prefecture: profile.area_prefecture,
      area_city: profile.area_city,
      available_times: profile.available_times,
      status: 'waiting'
    }).select().single()

    if (error) {
      alert(error.message)
    } else {
      setQueueId(data.id)
      setWaiting(true)
      
      // マッチング処理を起動（サーバー側）
      fetch('/api/matching/trigger', { method: 'POST' })
    }
  }

  const cancelWaiting = async () => {
    if (!queueId) return
    await supabase.from('matching_queue').update({ status: 'cancelled' }).eq('id', queueId)
    setWaiting(false)
    setQueueId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="p-12 max-w-lg w-full text-center">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">もくもく作業</h1>
          <a href="/profile/edit" className="text-sm text-blue-600 hover:underline">
            プロフィール編集
          </a>
        </div>

        {!waiting ? (
          <>
            <p className="text-gray-600 mb-8">
              全国のフリーランスと繋いで、集中して作業しましょう
            </p>
            <Button onClick={startWaiting} size="lg" className="w-full text-xl py-6">
              今から作業する
            </Button>

            {userProfile && (userProfile.seeking_collaboration || userProfile.seeking_work_requests) && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg">
                <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span>🤝</span>
                  <span>あなたの希望が相手に表示されます：</span>
                </div>
                <div className="space-y-2">
                  {userProfile.seeking_collaboration && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-purple-600">👥</span>
                      <span className="text-gray-700">協業パートナー募集中</span>
                    </div>
                  )}
                  {userProfile.seeking_work_requests && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-blue-600">💼</span>
                      <span className="text-gray-700">案件募集 / 依頼希望</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-8">
              <div className="animate-pulse text-6xl mb-4">🔍</div>
              <p className="text-xl font-semibold">作業仲間を探しています...</p>
            </div>
            <Button onClick={cancelWaiting} variant="outline" className="w-full">
              キャンセル
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              💡 カメラOFF・音声OFF推奨（PCが軽くなります）
            </p>
          </>
        )}
      </Card>
    </div>
  )
}
