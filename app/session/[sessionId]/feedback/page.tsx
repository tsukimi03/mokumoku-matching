'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

type FeedbackRating = 'good' | 'normal' | 'bad'

const ratingOptions: { value: FeedbackRating; label: string; emoji: string; description: string }[] = [
  { value: 'good', label: 'また一緒に作業したい', emoji: '😊', description: '良い作業仲間でした' },
  { value: 'normal', label: '普通', emoji: '😐', description: '特に問題なかったです' },
  { value: 'bad', label: '苦手', emoji: '😞', description: '今後マッチしないようにします' },
]

export default function FeedbackPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params)
  const router = useRouter()
  const supabase = createClient()

  const [rating, setRating] = useState<FeedbackRating | null>(null)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [session, setSession] = useState<{ user1_id: string; user2_id: string } | null>(null)
  const [wantsJobReferral, setWantsJobReferral] = useState(false)
  const [wantsCollaboration, setWantsCollaboration] = useState(false)
  const [wantsToMeetAgain, setWantsToMeetAgain] = useState(false)
  const [isReporting, setIsReporting] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [reportMessage, setReportMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setCurrentUserId(user.id)

      const { data: sessionData } = await supabase
        .from('sessions')
        .select('user1_id, user2_id')
        .eq('id', sessionId)
        .single()

      if (sessionData) {
        setSession(sessionData)
      }
    }

    fetchData()
  }, [sessionId, supabase, router])

  const handleSubmit = async () => {
    if (!rating || !currentUserId || !session) return

    setSubmitting(true)

    // user1_feedback または user2_feedback に保存
    const feedbackField = session.user1_id === currentUserId
      ? 'user1_feedback'
      : 'user2_feedback'

    const feedbackData = {
      rating,
      message: message.trim() || null,
      wants_job_referral: wantsJobReferral,
      wants_collaboration: wantsCollaboration,
      submitted_at: new Date().toISOString()
    }

    // 「また会いたい」フラグを設定
    const wantsToMeetAgainField = session.user1_id === currentUserId
      ? 'user1_wants_to_meet_again'
      : 'user2_wants_to_meet_again'

    const { error } = await supabase
      .from('sessions')
      .update({
        [feedbackField]: JSON.stringify(feedbackData),
        [wantsToMeetAgainField]: wantsToMeetAgain,
        status: 'completed'
      })
      .eq('id', sessionId)

    if (error) {
      console.error('Feedback submission error:', error)
      alert('フィードバックの送信に失敗しました。もう一度お試しください。')
      setSubmitting(false)
      return
    }

    // 「また会いたい」が両方ONの場合、user_preferences に登録
    if (wantsToMeetAgain) {
      // 最新のセッション情報を取得（相手も「また会いたい」を押したか確認）
      const { data: updatedSession } = await supabase
        .from('sessions')
        .select('user1_wants_to_meet_again, user2_wants_to_meet_again')
        .eq('id', sessionId)
        .single()

      const partnerId = session.user1_id === currentUserId
        ? session.user2_id
        : session.user1_id

      if (updatedSession?.user1_wants_to_meet_again && updatedSession?.user2_wants_to_meet_again) {
        // 両方が「また会いたい」を押した場合、user_preferences に登録
        // upsert を使って重複を無視
        await supabase
          .from('user_preferences')
          .upsert(
            { user_id: currentUserId, preferred_user_id: partnerId },
            { onConflict: 'user_id,preferred_user_id', ignoreDuplicates: true }
          )
      }
    }

    // 相手の評価カウントを更新
    const partnerId = session.user1_id === currentUserId
      ? session.user2_id
      : session.user1_id

    if (rating === 'good') {
      await supabase.rpc('increment_good_rating', { user_id: partnerId })
    } else if (rating === 'bad') {
      const { data: partner } = await supabase
        .from('users')
        .select('bad_rating_count')
        .eq('id', partnerId)
        .single()

      const newBadCount = (partner?.bad_rating_count || 0) + 1

      await supabase
        .from('users')
        .update({
          bad_rating_count: newBadCount,
          is_suspended: newBadCount >= 5,
          suspension_reason: newBadCount >= 5 ? '複数のユーザーから「苦手」評価を受けたため自動停止' : null
        })
        .eq('id', partnerId)
    }

    // 自分のセッションカウントを増やす
    await supabase.rpc('increment_session_count', { user_id: currentUserId })

    router.push('/matching')
  }

  const handleReport = async () => {
    if (!reportReason || !currentUserId || !session) return

    setSubmitting(true)

    const reportField = session.user1_id === currentUserId
      ? 'user1_reported'
      : 'user2_reported'

    const reasonField = session.user1_id === currentUserId
      ? 'user1_report_reason'
      : 'user2_report_reason'

    const messageField = session.user1_id === currentUserId
      ? 'user1_report_message'
      : 'user2_report_message'

    const { error } = await supabase
      .from('sessions')
      .update({
        [reportField]: true,
        [reasonField]: reportReason,
        [messageField]: reportMessage.trim() || null
      })
      .eq('id', sessionId)

    if (error) {
      console.error('Report submission error:', error)
      alert('通報の送信に失敗しました。もう一度お試しください。')
      setSubmitting(false)
      return
    }

    alert('通報を受け付けました。運営が確認いたします。')
    router.push('/matching')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">セッション完了</CardTitle>
          <p className="text-gray-500 mt-2">
            お疲れ様でした！<br />
            作業仲間へのフィードバックをお願いします
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 評価ボタン */}
          <div className="space-y-3">
            {ratingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setRating(option.value)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-4 ${
                  rating === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <span className="text-3xl">{option.emoji}</span>
                <div>
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* メッセージ入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              コメント（任意）
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="例: 同じ業界で話が合いました！"
              rows={3}
            />
          </div>

          {/* また会いたい */}
          {rating === 'good' && (
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-300 rounded-lg p-5">
              <label className="flex items-start gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wantsToMeetAgain}
                  onChange={(e) => setWantsToMeetAgain(e.target.checked)}
                  className="mt-1.5 w-5 h-5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">💕</span>
                    <span className="font-bold text-lg text-purple-900">この方とまた作業したい</span>
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    相手も同じ気持ちの場合、次回のマッチング時に優先的に繋がりやすくなります。
                  </div>
                </div>
              </label>
            </div>
          )}

          {/* 追加アンケート */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-700 mb-3">
              今後のサポートについて（任意）
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={wantsJobReferral}
                onChange={(e) => setWantsJobReferral(e.target.checked)}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-sm">仕事の紹介を希望する</div>
                <div className="text-xs text-gray-500">
                  運営から案件紹介の連絡をさせていただく場合があります
                </div>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={wantsCollaboration}
                onChange={(e) => setWantsCollaboration(e.target.checked)}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-sm">協業者の紹介を希望する</div>
                <div className="text-xs text-gray-500">
                  スキルマッチする協業パートナーをご紹介します
                </div>
              </div>
            </label>
          </div>

          {/* 送信ボタン */}
          <Button
            onClick={handleSubmit}
            disabled={!rating || submitting || isReporting}
            className="w-full py-6 text-lg"
          >
            {submitting ? '送信中...' : 'フィードバックを送信'}
          </Button>

          {/* 通報ボタン */}
          {!isReporting ? (
            <div className="text-center">
              <button
                onClick={() => setIsReporting(true)}
                className="text-sm text-red-600 hover:text-red-800 font-semibold"
              >
                🚨 不適切な行為を通報する
              </button>
            </div>
          ) : (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-red-900">通報理由を選択してください</h4>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">選択してください</option>
                <option value="harassment">ハラスメント・嫌がらせ</option>
                <option value="inappropriate_language">不適切な発言</option>
                <option value="inappropriate_behavior">不適切な行為</option>
                <option value="spam">スパム・営業行為</option>
                <option value="other">その他</option>
              </select>
              <Textarea
                value={reportMessage}
                onChange={(e) => setReportMessage(e.target.value)}
                placeholder="詳細を記入してください（任意）"
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleReport}
                  disabled={!reportReason || submitting}
                  variant="destructive"
                  className="flex-1"
                >
                  {submitting ? '送信中...' : '通報を送信'}
                </Button>
                <Button
                  onClick={() => setIsReporting(false)}
                  variant="outline"
                  className="flex-1"
                >
                  キャンセル
                </Button>
              </div>
              <p className="text-xs text-gray-600">
                ※ 通報内容は運営が確認し、適切に対応いたします。
              </p>
            </div>
          )}

          {/* スキップリンク */}
          <div className="text-center">
            <button
              onClick={() => router.push('/matching')}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              スキップして次のマッチングへ
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
