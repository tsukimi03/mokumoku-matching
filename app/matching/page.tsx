'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function MatchingPage() {
  const [waiting, setWaiting] = useState(false)
  const [queueId, setQueueId] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [clickCount, setClickCount] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const router = useRouter()
  const supabase = createClient()

  // 通知音を初期化（Web Audio APIで動的生成）
  useEffect(() => {
    // ビープ音を鳴らす関数を保存
    audioRef.current = {
      play: () => {
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.value = 800 // 800Hz ビープ音
          oscillator.type = 'sine'

          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 0.5)

          return Promise.resolve()
        } catch (err) {
          console.log('Audio play failed:', err)
          return Promise.reject(err)
        }
      }
    } as any
  }, [])

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
            // マッチング成立！音を鳴らす
            if (audioRef.current) {
              audioRef.current.play().catch(err => console.log('Audio play failed:', err))
            }
            // 少し遅延してからリダイレクト（音が聞こえるように）
            setTimeout(() => {
              router.push(`/session/${payload.new.session_id}`)
            }, 500)
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
            <div className="mb-6">
              <div className="animate-pulse text-6xl mb-4">🔍</div>
              <p className="text-xl font-semibold mb-2">作業仲間を探しています...</p>
              <p className="text-sm text-gray-500">
                💡 カメラOFF・音声OFF推奨（PCが軽くなります）
              </p>
            </div>

            {/* 音声通知案内 */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔔</span>
                <div className="text-left">
                  <p className="font-semibold text-sm text-gray-900 mb-1">
                    音声通知をONにしてください
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    マッチングが成立したら音でお知らせします。<br />
                    他のタブを見ている時も通知が届きます。
                  </p>
                </div>
              </div>
            </div>

            {/* 簡易ゲーム */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>🎮</span>
                <span>待ち時間の暇つぶし</span>
              </h3>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-6xl mb-3">🍅</div>
                <p className="text-sm text-gray-600 mb-4">タップして集中力を高めよう！</p>
                <button
                  onClick={() => setClickCount(prev => prev + 1)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-3xl w-32 h-32 rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95"
                >
                  {clickCount}
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  {clickCount >= 100 ? '🔥 すごい集中力！' : clickCount >= 50 ? '💪 いい感じ！' : 'タップしてみよう'}
                </p>
              </div>
            </div>

            <Button onClick={cancelWaiting} variant="outline" className="w-full">
              キャンセル
            </Button>
          </>
        )}
      </Card>
    </div>
  )
}
