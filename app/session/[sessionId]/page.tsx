'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'
import DailyVideoRoom from '@/components/DailyVideoRoom'
import SessionChat from '@/components/SessionChat'
import BGMPlayer from '@/components/BGMPlayer'
import TomikoVideoAvatar from '@/components/TomikoVideoAvatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Session {
  id: string
  user1_id: string
  user2_id: string
  daily_room_url: string
  duration_minutes: number
  started_at: string
  status: string
  extension_count?: number
  extended_minutes?: number
}

interface User {
  id: string
  display_name: string
  area_prefecture: string
  area_city: string
  job_categories: string[]
  skills: string | null
  tags: string[]
}

export default function SessionPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params)
  const router = useRouter()
  const supabase = createClient()

  const [session, setSession] = useState<Session | null>(null)
  const [partner, setPartner] = useState<User | null>(null)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [loading, setLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [extensionCount, setExtensionCount] = useState(0)
  const [extendedMinutes, setExtendedMinutes] = useState(0)
  const [extending, setExtending] = useState(false)
  const [partnerLeft, setPartnerLeft] = useState(false)
  const [tomikoActive, setTomikoActive] = useState(false)
  const [rematchingInProgress, setRematchingInProgress] = useState(false)
  const [tomikoSpeaking, setTomikoSpeaking] = useState(false)

  // セッションデータ取得
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      setCurrentUserId(user.id)

      // セッション情報取得
      const { data: sessionData, error: sessionError } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .single()

      if (sessionError || !sessionData) {
        console.error('Session not found:', sessionError)
        router.push('/matching')
        return
      }

      setSession(sessionData)
      setExtensionCount(sessionData.extension_count || 0)
      setExtendedMinutes(sessionData.extended_minutes || 0)
      setTimeLeft((sessionData.duration_minutes + (sessionData.extended_minutes || 0)) * 60)

      // 相手のユーザー情報取得
      const partnerId = sessionData.user1_id === user.id
        ? sessionData.user2_id
        : sessionData.user1_id

      const { data: partnerData } = await supabase
        .from('users')
        .select('id, display_name, area_prefecture, area_city, job_categories, skills, tags, seeking_collaboration, seeking_work_requests, collaboration_description, work_request_description, collaboration_fields, collaboration_duration, collaboration_compensation, collaboration_free_text, work_request_type, work_request_budget, work_request_timeline, work_request_free_text, pr_message')
        .eq('id', partnerId)
        .single()

      if (partnerData) {
        setPartner(partnerData)
      }

      setLoading(false)
    }

    fetchSession()
  }, [sessionId, supabase, router])

  // カウントダウンタイマー
  useEffect(() => {
    if (loading || !session) return

    if (timeLeft <= 0) {
      router.push(`/session/${sessionId}/feedback`)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, loading, session, sessionId, router])

  // 時間延長
  const handleExtend = async () => {
    if (!session || extending || extensionCount >= 3) return

    setExtending(true)

    const newExtensionCount = extensionCount + 1
    const newExtendedMinutes = extendedMinutes + 25

    const { error } = await supabase
      .from('sessions')
      .update({
        extension_count: newExtensionCount,
        extended_minutes: newExtendedMinutes
      })
      .eq('id', sessionId)

    if (error) {
      console.error('Extension error:', error)
      alert('時間延長に失敗しました')
      setExtending(false)
      return
    }

    setExtensionCount(newExtensionCount)
    setExtendedMinutes(newExtendedMinutes)
    setTimeLeft(prev => prev + 25 * 60)
    setExtending(false)
  }

  // 早期終了
  const handleEarlyEnd = async () => {
    if (!session) return

    await supabase
      .from('sessions')
      .update({
        status: 'ended_early',
        ended_at: new Date().toISOString()
      })
      .eq('id', sessionId)

    router.push(`/session/${sessionId}/feedback`)
  }

  // 登美子さんの音声挨拶（ChatGPT連携）
  const speakTomikoGreeting = async () => {
    setTomikoSpeaking(true)

    try {
      // ChatGPT APIから動的なメッセージを取得
      const response = await fetch('/api/chat/tomiko', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: '相手が退室しました。新しい相手を探す前に、励ましの言葉をください。',
          context: {
            sessionDuration: Math.floor((25 * 60 - timeLeft) / 60),
            partnerLeft: true
          }
        })
      })

      const data = await response.json()
      const greetingMessage = data.message || 'お疲れ様です！登美子です。一緒にお仕事頑張りましょうね。'

      // 音声で読み上げ
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(greetingMessage)
        utterance.lang = 'ja-JP'
        utterance.rate = 1.0
        utterance.pitch = 1.2
        utterance.volume = 0.8

        utterance.onend = () => {
          setTomikoSpeaking(false)
          // 音声終了後、自動的に再マッチング開始
          handleRematch()
        }

        window.speechSynthesis.speak(utterance)
      } else {
        // 音声合成非対応の場合は、即座に再マッチング開始
        setTomikoSpeaking(false)
        handleRematch()
      }
    } catch (error) {
      console.error('Failed to get greeting from ChatGPT:', error)
      // エラー時はデフォルトメッセージで音声再生
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('お疲れ様です！登美子です。新しい作業仲間を探しますので、少々お待ちください')
        utterance.lang = 'ja-JP'
        utterance.rate = 1.0
        utterance.pitch = 1.2
        utterance.volume = 0.8
        utterance.onend = () => {
          setTomikoSpeaking(false)
          handleRematch()
        }
        window.speechSynthesis.speak(utterance)
      } else {
        setTomikoSpeaking(false)
        handleRematch()
      }
    }
  }

  // 相手退室後の処理（25秒待機後に登美子さん登場）
  const handlePartnerLeft = () => {
    setPartnerLeft(true)

    setTimeout(() => {
      setTomikoActive(true)
      speakTomikoGreeting()
    }, 25000) // 25秒後
  }

  // 再マッチング処理
  const handleRematch = async () => {
    if (!currentUserId || rematchingInProgress) return

    setRematchingInProgress(true)

    try {
      // 現在のセッションを終了
      await supabase
        .from('sessions')
        .update({
          status: 'partner_left',
          ended_at: new Date().toISOString()
        })
        .eq('id', sessionId)

      // プロフィール取得
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', currentUserId)
        .single()

      if (!profile) {
        alert('プロフィール情報の取得に失敗しました')
        setRematchingInProgress(false)
        return
      }

      // マッチングキューに再登録
      const { data: queueData, error: queueError } = await supabase
        .from('matching_queue')
        .insert({
          user_id: currentUserId,
          area_prefecture: profile.area_prefecture,
          area_city: profile.area_city,
          available_times: profile.available_times,
          status: 'waiting'
        })
        .select()
        .single()

      if (queueError) {
        alert('マッチングキューへの登録に失敗しました')
        setRematchingInProgress(false)
        return
      }

      // マッチング処理を起動
      await fetch('/api/matching/trigger', { method: 'POST' })

      // マッチング成立を監視
      const channel = supabase
        .channel('rematch_queue')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'matching_queue', filter: `id=eq.${queueData.id}` },
          (payload: any) => {
            if (payload.new.status === 'matched') {
              // ビープ音を鳴らす
              const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
              const oscillator = audioContext.createOscillator()
              const gainNode = audioContext.createGain()
              oscillator.connect(gainNode)
              gainNode.connect(audioContext.destination)
              oscillator.frequency.value = 800
              oscillator.type = 'sine'
              gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
              oscillator.start(audioContext.currentTime)
              oscillator.stop(audioContext.currentTime + 0.5)

              // 新しいセッションにリダイレクト
              setTimeout(() => {
                router.push(`/session/${payload.new.session_id}`)
              }, 500)

              supabase.removeChannel(channel)
            }
          }
        )
        .subscribe()
    } catch (error) {
      console.error('Rematch error:', error)
      alert('再マッチング中にエラーが発生しました')
      setRematchingInProgress(false)
    }
  }

  // 時間フォーマット
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">読み込み中...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* メインコンテンツ */}
        <div className="lg:col-span-2 space-y-4">
          {/* タイマー */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-6xl font-mono font-bold text-gray-800">
                {formatTime(timeLeft)}
              </div>
              <p className="text-gray-500 mt-2">残り時間</p>

              {/* 延長ボタン */}
              {extensionCount < 3 && (
                <div className="mt-4 space-y-2">
                  <Button
                    onClick={handleExtend}
                    disabled={extending}
                    variant="outline"
                    className="px-6 py-2"
                  >
                    {extending ? '延長中...' : '⏰ +25分延長'}
                  </Button>
                  <p className="text-xs text-gray-500">
                    延長回数: {extensionCount}/3
                  </p>
                </div>
              )}

              {extensionCount >= 3 && (
                <p className="text-xs text-gray-500 mt-4">
                  ※ 延長は最大3回までです
                </p>
              )}
            </CardContent>
          </Card>

          {/* 相手のプロフィール */}
          {partner && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">作業仲間</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-gray-600">
                  {partner.display_name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-lg">{partner.display_name}</div>
                  <div className="text-gray-500 text-sm">
                    {partner.area_prefecture} {partner.area_city}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">
                    {partner.job_categories.join(', ')}
                  </div>
                  {partner.skills && (
                    <div className="text-gray-500 text-xs mt-1">{partner.skills}</div>
                  )}
                  {partner.tags && partner.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {partner.tags.map(tag => (
                        <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {((partner as any).seeking_collaboration || (partner as any).seeking_work_requests) && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                      <div className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                        <span>🤝</span>
                        <span>この方は以下を希望しています：</span>
                      </div>

                      {/* 協業希望 */}
                      {(partner as any).seeking_collaboration && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">👥</span>
                            <span className="font-bold text-sm text-purple-900">協業パートナー募集中</span>
                          </div>

                          {(partner as any).collaboration_fields && (partner as any).collaboration_fields.length > 0 && (
                            <div className="text-xs">
                              <span className="font-semibold text-gray-700">分野: </span>
                              <span className="text-gray-600">{(partner as any).collaboration_fields.join(', ')}</span>
                            </div>
                          )}

                          {(partner as any).collaboration_duration && (
                            <div className="text-xs">
                              <span className="font-semibold text-gray-700">期間: </span>
                              <span className="text-gray-600">
                                {(partner as any).collaboration_duration === 'short_term' && '短期（1-3ヶ月）'}
                                {(partner as any).collaboration_duration === 'long_term' && '長期（3ヶ月以上）'}
                                {(partner as any).collaboration_duration === 'both' && 'どちらでも可'}
                              </span>
                            </div>
                          )}

                          {(partner as any).collaboration_compensation && (
                            <div className="text-xs">
                              <span className="font-semibold text-gray-700">報酬: </span>
                              <span className="text-gray-600">
                                {(partner as any).collaboration_compensation === 'fixed' && '固定報酬'}
                                {(partner as any).collaboration_compensation === 'revenue_share' && '成果報酬・レベニューシェア'}
                                {(partner as any).collaboration_compensation === 'free' && '無償（スキル交換等）'}
                                {(partner as any).collaboration_compensation === 'negotiable' && '応相談'}
                              </span>
                            </div>
                          )}

                          {(partner as any).collaboration_free_text && (
                            <div className="text-xs bg-white p-2 rounded border border-purple-100 mt-2">
                              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {(partner as any).collaboration_free_text}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 案件希望 */}
                      {(partner as any).seeking_work_requests && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">💼</span>
                            <span className="font-bold text-sm text-blue-900">案件募集 / 依頼希望</span>
                          </div>

                          {(partner as any).work_request_type && (
                            <div className="text-xs">
                              <span className="font-semibold text-gray-700">種類: </span>
                              <span className="text-gray-600">
                                {(partner as any).work_request_type === 'receiving' && '案件を受注したい'}
                                {(partner as any).work_request_type === 'offering' && '案件を発注したい'}
                                {(partner as any).work_request_type === 'both' && 'どちらでも可'}
                              </span>
                            </div>
                          )}

                          {(partner as any).work_request_budget && (
                            <div className="text-xs">
                              <span className="font-semibold text-gray-700">予算: </span>
                              <span className="text-gray-600">
                                {(partner as any).work_request_budget === 'low' && '〜10万円'}
                                {(partner as any).work_request_budget === 'medium' && '10万円〜50万円'}
                                {(partner as any).work_request_budget === 'high' && '50万円以上'}
                                {(partner as any).work_request_budget === 'negotiable' && '応相談'}
                              </span>
                            </div>
                          )}

                          {(partner as any).work_request_timeline && (
                            <div className="text-xs">
                              <span className="font-semibold text-gray-700">納期: </span>
                              <span className="text-gray-600">
                                {(partner as any).work_request_timeline === 'urgent' && '緊急（1週間以内）'}
                                {(partner as any).work_request_timeline === 'normal' && '通常（1週間〜1ヶ月）'}
                                {(partner as any).work_request_timeline === 'flexible' && '柔軟（1ヶ月以上）'}
                              </span>
                            </div>
                          )}

                          {(partner as any).work_request_free_text && (
                            <div className="text-xs bg-white p-2 rounded border border-blue-100 mt-2">
                              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {(partner as any).work_request_free_text}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* PR欄 */}
                      {(partner as any).pr_message && (
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">✨</span>
                            <span className="font-bold text-sm text-gray-900">自己PR</span>
                          </div>
                          <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {(partner as any).pr_message}
                          </p>
                        </div>
                      )}

                      <p className="text-xs text-gray-500 italic">
                        💡 セッション後に連絡先を交換できます
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          )}

          {/* ビデオルーム */}
          <DailyVideoRoom
            roomUrl={session.daily_room_url}
            onLeave={handleEarlyEnd}
            onPartnerLeave={handlePartnerLeft}
          />

          {/* 登美子さん（AI秘書） - 相手が退室した時に表示 */}
          {tomikoActive && (
            <Card className="mt-4 bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 border-2 border-slate-300 relative overflow-hidden">
              {/* オフィス風背景 */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-800"></div>
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-300/30 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3">
                  <div className="grid grid-cols-6 gap-2 opacity-20">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="bg-slate-600 rounded aspect-square"></div>
                    ))}
                  </div>
                </div>
              </div>

              <CardContent className="p-6 relative z-10">
                <div className="flex items-start gap-4">
                  {/* 登美子さんのAIアバター（動画対応） */}
                  <div className="flex-shrink-0">
                    <TomikoVideoAvatar
                      isActive={tomikoActive}
                      message="お疲れ様です！登美子です。一緒にお仕事頑張りましょうね。"
                    />
                    <div className="text-center mt-2">
                      <span className="text-sm font-bold text-gray-900">登美子さん</span>
                      <div className="text-xs text-slate-600 flex items-center justify-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <span>AI秘書</span>
                      </div>
                    </div>
                  </div>

                  {/* メッセージエリア */}
                  <div className="flex-1">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border-2 border-slate-300">
                      <div className="space-y-3">
                        <p className="text-base font-semibold text-gray-900 flex items-center gap-2">
                          <span className="text-2xl">👋</span>
                          <span>お疲れ様です！お相手が退室されました。</span>
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          少々お待ちください。すぐに次の作業仲間を探しますね！<br />
                          その間、今日の作業は順調ですか？😊
                        </p>
                        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3 text-sm text-gray-700 shadow-sm">
                          <p className="font-semibold mb-1 flex items-center gap-2">
                            <span className="text-lg">💡</span>
                            <span>ワンポイントアドバイス</span>
                          </p>
                          <p className="text-xs leading-relaxed">
                            ポモドーロの休憩時間には、軽いストレッチや水分補給がおすすめです。
                            リフレッシュして次のセッションに臨みましょう！
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 再マッチングボタン */}
                    <div className="mt-4 text-center">
                      {!rematchingInProgress ? (
                        <Button
                          onClick={handleRematch}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                          新しい相手を探す 🔍
                        </Button>
                      ) : (
                        <div className="flex items-center justify-center gap-2 text-purple-600">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                          <span className="text-sm font-semibold">マッチング中...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* パートナー情報バー（動画下） */}
          {partner && (
            <Card className="mt-4">
              <CardContent className="p-4 space-y-3">
                {/* 在住地表示（県のみ） */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-lg">📍</span>
                  <span className="font-semibold text-gray-700">在住:</span>
                  <span className="text-gray-900">
                    {partner.area_prefecture}
                  </span>
                </div>

                {/* PR メッセージ流れ表示 */}
                {(partner as any).pr_message && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-lg p-3 overflow-hidden">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">✨</span>
                      <span className="font-bold text-sm text-gray-900">パートナーのPR</span>
                    </div>
                    <div className="relative overflow-hidden h-12">
                      <div className="animate-scroll whitespace-nowrap text-sm text-gray-700">
                        {(partner as any).pr_message} ・ {(partner as any).pr_message} ・ {(partner as any).pr_message}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* 早期終了ボタン */}
          <div className="text-center">
            <Button
              variant="destructive"
              onClick={handleEarlyEnd}
              className="px-8"
            >
              セッションを終了する
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              終了後はフィードバックをお願いします
            </p>
          </div>
        </div>

        {/* サイドバー */}
        <div className="space-y-4">
          {/* チャット */}
          {currentUserId && (
            <SessionChat sessionId={sessionId} currentUserId={currentUserId} />
          )}

          {/* BGMプレイヤー */}
          <BGMPlayer />
        </div>
      </div>
      </div>
    </div>
  )
}
