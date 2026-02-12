'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'
import { isAdmin } from '@/lib/admin'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Report {
  id: string
  reporter_id: string
  reported_user_id: string
  session_id: string | null
  reason: string
  status: string
  admin_note: string | null
  created_at: string
  reviewed_at: string | null
  reporter: {
    display_name: string
  }
  reported_user: {
    display_name: string
    is_suspended: boolean
    report_count: number
  }
}

export default function AdminReportsPage() {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState<Report[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed' | 'resolved'>('pending')

  // 管理者認証チェック
  useEffect(() => {
    const checkAdmin = async () => {
      const admin = await isAdmin()
      if (!admin) {
        router.push('/login')
        return
      }
      fetchReports()
    }
    checkAdmin()
  }, [router, filter])

  const fetchReports = async () => {
    setLoading(true)

    let query = supabase
      .from('reports')
      .select(`
        *,
        reporter:users!reports_reporter_id_fkey(display_name),
        reported_user:users!reports_reported_user_id_fkey(display_name, is_suspended, report_count)
      `)
      .order('created_at', { ascending: false })

    if (filter !== 'all') {
      query = query.eq('status', filter)
    }

    const { data, error } = await query

    if (error) {
      console.error('Failed to fetch reports:', error)
      alert('通報データの取得に失敗しました')
      return
    }

    setReports(data as Report[])
    setLoading(false)
  }

  const updateReportStatus = async (reportId: string, newStatus: string) => {
    const { error } = await supabase
      .from('reports')
      .update({
        status: newStatus,
        reviewed_at: newStatus !== 'pending' ? new Date().toISOString() : null
      })
      .eq('id', reportId)

    if (error) {
      console.error('Failed to update report:', error)
      alert('ステータスの更新に失敗しました')
      return
    }

    fetchReports()
  }

  const suspendUser = async (userId: string, reportId: string) => {
    if (!confirm('このユーザーを利用停止にしますか？')) return

    const { error } = await supabase
      .from('users')
      .update({ is_suspended: true })
      .eq('id', userId)

    if (error) {
      console.error('Failed to suspend user:', error)
      alert('ユーザーの停止に失敗しました')
      return
    }

    // 通報を解決済みに変更
    await updateReportStatus(reportId, 'resolved')

    alert('ユーザーを利用停止にしました')
    fetchReports()
  }

  const unsuspendUser = async (userId: string) => {
    if (!confirm('このユーザーの利用停止を解除しますか？')) return

    const { error } = await supabase
      .from('users')
      .update({ is_suspended: false })
      .eq('id', userId)

    if (error) {
      console.error('Failed to unsuspend user:', error)
      alert('停止解除に失敗しました')
      return
    }

    alert('利用停止を解除しました')
    fetchReports()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">未対応</Badge>
      case 'reviewed':
        return <Badge className="bg-blue-500">確認済み</Badge>
      case 'resolved':
        return <Badge className="bg-green-500">解決済み</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">通報管理</h1>

          {/* フィルター */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              全て
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilter('pending')}
            >
              未対応
            </Button>
            <Button
              variant={filter === 'reviewed' ? 'default' : 'outline'}
              onClick={() => setFilter('reviewed')}
            >
              確認済み
            </Button>
            <Button
              variant={filter === 'resolved' ? 'default' : 'outline'}
              onClick={() => setFilter('resolved')}
            >
              解決済み
            </Button>
          </div>
        </div>

        {/* 通報リスト */}
        <div className="space-y-4">
          {reports.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                通報はありません
              </CardContent>
            </Card>
          ) : (
            reports.map(report => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        通報ID: {report.id.slice(0, 8)}...
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(report.created_at).toLocaleString('ja-JP')}
                      </p>
                    </div>
                    {getStatusBadge(report.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 通報内容 */}
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">通報者</p>
                      <p className="text-sm">{report.reporter.display_name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">通報された人</p>
                      <p className="text-sm">{report.reported_user.display_name}</p>
                      <div className="flex gap-2 mt-1">
                        {report.reported_user.is_suspended && (
                          <Badge className="bg-red-500">利用停止中</Badge>
                        )}
                        {report.reported_user.report_count > 0 && (
                          <Badge className={`${
                            report.reported_user.report_count >= 3 ? 'bg-red-600' :
                            report.reported_user.report_count >= 2 ? 'bg-orange-500' :
                            'bg-yellow-500'
                          }`}>
                            通報 {report.reported_user.report_count}回
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 理由 */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">通報理由</p>
                    <div className="bg-white border border-gray-200 rounded p-3">
                      <p className="text-sm whitespace-pre-wrap">{report.reason}</p>
                    </div>
                  </div>

                  {/* セッションID */}
                  {report.session_id && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">セッションID</p>
                      <p className="text-xs text-gray-500 font-mono">{report.session_id}</p>
                    </div>
                  )}

                  {/* Admin Note（自動BANなど） */}
                  {report.admin_note && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <p className="text-sm font-semibold text-blue-900 mb-1">📝 管理メモ</p>
                      <p className="text-sm text-blue-800">{report.admin_note}</p>
                    </div>
                  )}

                  {/* アクション */}
                  <div className="flex gap-2 pt-2 border-t">
                    {report.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateReportStatus(report.id, 'reviewed')}
                        >
                          確認済みにする
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateReportStatus(report.id, 'resolved')}
                        >
                          解決済みにする
                        </Button>
                      </>
                    )}

                    {report.status === 'reviewed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateReportStatus(report.id, 'resolved')}
                      >
                        解決済みにする
                      </Button>
                    )}

                    {!report.reported_user.is_suspended ? (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => suspendUser(report.reported_user_id, report.id)}
                      >
                        🚫 ユーザーを利用停止にする
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => unsuspendUser(report.reported_user_id)}
                        className="border-green-500 text-green-600 hover:bg-green-50"
                      >
                        ✅ 利用停止を解除
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* 戻るボタン */}
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => router.push('/')}>
            トップページに戻る
          </Button>
        </div>
      </div>
    </div>
  )
}
