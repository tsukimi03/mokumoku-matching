'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ReportUserModalProps {
  isOpen: boolean
  onClose: () => void
  reportedUserId: string
  reportedUserName: string
  sessionId?: string
}

const REPORT_REASONS = [
  { value: 'harassment', label: 'ハラスメント・嫌がらせ' },
  { value: 'inappropriate_speech', label: '不適切な発言' },
  { value: 'solicitation', label: '勧誘行為（マルチ商法・ネットワークビジネス等）' },
  { value: 'spam', label: 'スパム行為' },
  { value: 'privacy_violation', label: 'プライバシー侵害（録画・撮影等）' },
  { value: 'other', label: 'その他' },
]

export default function ReportUserModal({
  isOpen,
  onClose,
  reportedUserId,
  reportedUserName,
  sessionId,
}: ReportUserModalProps) {
  const [selectedReason, setSelectedReason] = useState('')
  const [details, setDetails] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [alsoBlock, setAlsoBlock] = useState(false)

  const supabase = createClient()

  const handleSubmit = async () => {
    if (!selectedReason) {
      alert('通報理由を選択してください')
      return
    }

    setIsSubmitting(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('ログインしてください')
        return
      }

      // 通報を記録
      const reasonText = REPORT_REASONS.find(r => r.value === selectedReason)?.label || selectedReason
      const fullReason = details ? `${reasonText}\n詳細: ${details}` : reasonText

      const { error: reportError } = await supabase.from('reports').insert({
        reporter_id: user.id,
        reported_user_id: reportedUserId,
        session_id: sessionId || null,
        reason: fullReason,
        status: 'pending',
      })

      if (reportError) {
        console.error('Report error:', reportError)
        alert('通報の送信に失敗しました')
        return
      }

      // ブロックも実行
      if (alsoBlock) {
        const { error: blockError } = await supabase.from('blocked_users').insert({
          blocker_id: user.id,
          blocked_id: reportedUserId,
          reason: '通報に伴うブロック',
        })

        if (blockError && blockError.code !== '23505') { // 23505 = unique constraint violation (already blocked)
          console.error('Block error:', blockError)
          // ブロック失敗してもアラートは出さない（通報は成功しているため）
        }
      }

      setSubmitted(true)
      setTimeout(() => {
        onClose()
        setSubmitted(false)
        setSelectedReason('')
        setDetails('')
        setAlsoBlock(false)
      }, 2000)
    } catch (error) {
      console.error('Submit error:', error)
      alert('通報の送信中にエラーが発生しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="py-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <DialogTitle className="text-xl mb-2">通報を受け付けました</DialogTitle>
            <DialogDescription>
              運営チームが確認し、適切に対応いたします。
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>ユーザーを通報</DialogTitle>
              <DialogDescription>
                <strong>{reportedUserName}</strong> さんを通報します
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* 通報理由 */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  通報理由 <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {REPORT_REASONS.map(reason => (
                    <label
                      key={reason.value}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={reason.value}
                        checked={selectedReason === reason.value}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-800">{reason.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 詳細（任意） */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  詳細（任意）
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  rows={3}
                  placeholder="具体的な状況を記載してください（任意）"
                />
              </div>

              {/* ブロックオプション */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alsoBlock}
                    onChange={(e) => setAlsoBlock(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-800 font-medium">
                    このユーザーをブロックする
                  </span>
                </label>
                <p className="text-xs text-gray-600 mt-1 ml-6">
                  今後このユーザーとマッチングしなくなります
                </p>
              </div>

              {/* ボタン */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  キャンセル
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !selectedReason}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  {isSubmitting ? '送信中...' : '通報する'}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
