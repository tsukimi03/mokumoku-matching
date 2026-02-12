'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

const JOB_CATEGORIES = [
  'デザイナー',
  'エンジニア',
  'マーケター',
  'ライター',
  '動画編集',
  'コンサル',
  'その他'
]

const AVAILABLE_TIMES = [
  '平日午前（9-12時）',
  '平日午後（13-18時）',
  '平日夜（19時以降）',
  '土日'
]

const PREFECTURES = ['東京都', '神奈川県', '大阪府', '愛知県', '福岡県'] // 一部のみ

const AVAILABLE_TAGS = [
  '#顔出しOKです',
  '#音声ONできます',
  '#カメラOFFがいい',
  '#音声OFFがいい',
  '#雑談OK',
  '#黙々派',
  '#朝型',
  '#夜型',
  '#初心者歓迎',
  '#ベテラン'
]

export default function ProfileEditPage() {
  const [loading, setLoading] = useState(true)
  const [displayName, setDisplayName] = useState('')
  const [areaPrefecture, setAreaPrefecture] = useState('')
  const [areaCity, setAreaCity] = useState('')
  const [jobCategories, setJobCategories] = useState<string[]>([])
  const [skills, setSkills] = useState('')
  const [availableWork, setAvailableWork] = useState('')
  const [portfolioUrl, setPortfolioUrl] = useState('')
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [preferCamera, setPreferCamera] = useState(false)
  const [preferAudio, setPreferAudio] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [workHistory, setWorkHistory] = useState<string[]>([''])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [seekingCollaboration, setSeekingCollaboration] = useState(false)
  const [seekingWorkRequests, setSeekingWorkRequests] = useState(false)
  const [collaborationDescription, setCollaborationDescription] = useState('')
  const [workRequestDescription, setWorkRequestDescription] = useState('')

  // 協業希望の詳細項目
  const [collaborationFields, setCollaborationFields] = useState<string[]>([])
  const [collaborationDuration, setCollaborationDuration] = useState('')
  const [collaborationCompensation, setCollaborationCompensation] = useState('')
  const [collaborationFreeText, setCollaborationFreeText] = useState('')

  // 案件希望の詳細項目
  const [workRequestType, setWorkRequestType] = useState('')
  const [workRequestBudget, setWorkRequestBudget] = useState('')
  const [workRequestTimeline, setWorkRequestTimeline] = useState('')
  const [workRequestFreeText, setWorkRequestFreeText] = useState('')

  // PR欄（共通）
  const [prMessage, setPrMessage] = useState('')

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (data) {
      setDisplayName(data.display_name)
      setAreaPrefecture(data.area_prefecture)
      setAreaCity(data.area_city)
      setJobCategories(data.job_categories)
      setSkills(data.skills || '')
      setAvailableWork(data.available_work || '')
      setPortfolioUrl(data.portfolio_url || '')
      setAvailableTimes(data.available_times)
      setPreferCamera(data.prefer_camera)
      setPreferAudio(data.prefer_audio)
      setTags(data.tags || [])
      setWorkHistory(data.work_history && data.work_history.length > 0 ? data.work_history : [''])
      setPhoneNumber(data.phone_number || '')
      setPhoneVerified(data.phone_verified || false)
      setSeekingCollaboration(data.seeking_collaboration || false)
      setSeekingWorkRequests(data.seeking_work_requests || false)
      setCollaborationDescription(data.collaboration_description || '')
      setWorkRequestDescription(data.work_request_description || '')
      setCollaborationFields(data.collaboration_fields || [])
      setCollaborationDuration(data.collaboration_duration || '')
      setCollaborationCompensation(data.collaboration_compensation || '')
      setCollaborationFreeText(data.collaboration_free_text || '')
      setWorkRequestType(data.work_request_type || '')
      setWorkRequestBudget(data.work_request_budget || '')
      setWorkRequestTimeline(data.work_request_timeline || '')
      setWorkRequestFreeText(data.work_request_free_text || '')
      setPrMessage(data.pr_message || '')
    }
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // 職歴のバリデーション（空欄を除外し、少なくとも1つの会社名が必要）
    const validWorkHistory = workHistory.filter(w => w.trim())
    if (validWorkHistory.length === 0) {
      alert('職歴（勤務先）を少なくとも1つ入力してください')
      return
    }

    // 電話番号のバリデーション
    if (!phoneNumber.trim()) {
      alert('電話番号を入力してください')
      return
    }

    const { error } = await supabase
      .from('users')
      .upsert({
        id: user.id,
        email: user.email!,
        display_name: displayName,
        area_prefecture: areaPrefecture,
        area_city: areaCity,
        job_categories: jobCategories,
        skills,
        available_work: availableWork,
        portfolio_url: portfolioUrl,
        available_times: availableTimes,
        prefer_camera: preferCamera,
        prefer_audio: preferAudio,
        tags,
        work_history: validWorkHistory,
        phone_number: phoneNumber,
        seeking_collaboration: seekingCollaboration,
        seeking_work_requests: seekingWorkRequests,
        collaboration_description: collaborationDescription,
        work_request_description: workRequestDescription,
        collaboration_fields: collaborationFields,
        collaboration_duration: collaborationDuration,
        collaboration_compensation: collaborationCompensation,
        collaboration_free_text: collaborationFreeText,
        work_request_type: workRequestType,
        work_request_budget: workRequestBudget,
        work_request_timeline: workRequestTimeline,
        work_request_free_text: workRequestFreeText,
        pr_message: prMessage
      })

    if (error) {
      alert(error.message)
    } else {
      alert('プロフィールを保存しました')
      router.push('/matching')
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Card className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">プロフィール設定</h1>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">表示名 *</label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">都道府県 *</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={areaPrefecture}
                  onChange={(e) => setAreaPrefecture(e.target.value)}
                  required
                >
                  <option value="">選択してください</option>
                  {PREFECTURES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">市区町村 *</label>
                <Input
                  value={areaCity}
                  onChange={(e) => setAreaCity(e.target.value)}
                  placeholder="例: 渋谷区"
                  required
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              📍 都道府県のみ作業セッション中にパートナーに表示されます（市区町村は非公開）
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">職種カテゴリ（複数選択可） *</label>
            <div className="space-y-2">
              {JOB_CATEGORIES.map(cat => (
                <label key={cat} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={jobCategories.includes(cat)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setJobCategories([...jobCategories, cat])
                      } else {
                        setJobCategories(jobCategories.filter(c => c !== cat))
                      }
                    }}
                    className="mr-2"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">スキル</label>
            <Textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="例: React, TypeScript, UI/UX..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">受けられる仕事</label>
            <Textarea
              value={availableWork}
              onChange={(e) => setAvailableWork(e.target.value)}
              placeholder="例: Webアプリ開発、LP制作..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">ポートフォリオURL（任意）</label>
            <Input
              type="url"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">作業できる時間帯 *</label>
            <div className="space-y-2">
              {AVAILABLE_TIMES.map(time => (
                <label key={time} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={availableTimes.includes(time)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAvailableTimes([...availableTimes, time])
                      } else {
                        setAvailableTimes(availableTimes.filter(t => t !== time))
                      }
                    }}
                    className="mr-2"
                  />
                  {time}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">マッチング時の希望</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferCamera}
                  onChange={(e) => setPreferCamera(e.target.checked)}
                  className="mr-2"
                />
                カメラON希望
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferAudio}
                  onChange={(e) => setPreferAudio(e.target.checked)}
                  className="mr-2"
                />
                音声ON希望
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              推奨: カメラOFF・音声OFFで軽量化
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">あなたのタグ（複数選択可）</label>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_TAGS.map(tag => (
                <label key={tag} className="flex items-center bg-gray-50 p-2 rounded hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={tags.includes(tag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags([...tags, tag])
                      } else {
                        setTags(tags.filter(t => t !== tag))
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{tag}</span>
                </label>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              選択したタグは作業画面に表示されます
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              電話番号 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="例: 090-1234-5678"
                required
              />
              {phoneVerified && (
                <span className="flex items-center text-green-600 font-semibold shrink-0">
                  ✓ 認証済み
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              本人確認のため電話番号が必要です。SMSでの認証は今後実装予定です。
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              職歴（勤務先） <span className="text-red-500">*</span>
            </label>
            {workHistory.map((company, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={company}
                  onChange={(e) => {
                    const newHistory = [...workHistory]
                    newHistory[index] = e.target.value
                    setWorkHistory(newHistory)
                  }}
                  placeholder="例: 株式会社〇〇"
                  required={index === 0}
                />
                {index === workHistory.length - 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setWorkHistory([...workHistory, ''])}
                    className="shrink-0"
                  >
                    + 追加
                  </Button>
                )}
                {workHistory.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setWorkHistory(workHistory.filter((_, i) => i !== index))}
                    className="shrink-0"
                  >
                    削除
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🤝</span>
              協業・案件希望（任意）
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              マッチング相手に自分の希望を伝えることができます。
              協業パートナーや案件を探している場合はチェックしてください。
            </p>

            <div className="space-y-6">
              {/* 協業希望 */}
              <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                <label className="flex items-start gap-3 mb-3">
                  <input
                    type="checkbox"
                    checked={seekingCollaboration}
                    onChange={(e) => setSeekingCollaboration(e.target.checked)}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-bold text-gray-900">👥 協業パートナーを探している</span>
                    <p className="text-sm text-gray-600 mt-1">
                      一緒にプロジェクトを進めたい、技術を教え合いたいなど
                    </p>
                  </div>
                </label>
                {seekingCollaboration && (
                  <div className="mt-4 space-y-4 pl-7">
                    {/* 協業分野 */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        協業したい分野（複数選択可）
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {['開発', 'デザイン', 'マーケティング', 'ライティング', '動画編集', 'コンサル', 'その他'].map(field => (
                          <label key={field} className="flex items-center bg-white p-2 rounded border hover:bg-purple-50">
                            <input
                              type="checkbox"
                              checked={collaborationFields.includes(field)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setCollaborationFields([...collaborationFields, field])
                                } else {
                                  setCollaborationFields(collaborationFields.filter(f => f !== field))
                                }
                              }}
                              className="mr-2"
                            />
                            <span className="text-sm">{field}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* 協業期間 */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        協業期間
                      </label>
                      <select
                        className="w-full border rounded px-3 py-2"
                        value={collaborationDuration}
                        onChange={(e) => setCollaborationDuration(e.target.value)}
                      >
                        <option value="">選択してください</option>
                        <option value="short_term">短期（1-3ヶ月）</option>
                        <option value="long_term">長期（3ヶ月以上）</option>
                        <option value="both">どちらでも可</option>
                      </select>
                    </div>

                    {/* 報酬形態 */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        報酬形態
                      </label>
                      <select
                        className="w-full border rounded px-3 py-2"
                        value={collaborationCompensation}
                        onChange={(e) => setCollaborationCompensation(e.target.value)}
                      >
                        <option value="">選択してください</option>
                        <option value="fixed">固定報酬</option>
                        <option value="revenue_share">成果報酬・レベニューシェア</option>
                        <option value="free">無償（スキル交換等）</option>
                        <option value="negotiable">応相談</option>
                      </select>
                    </div>

                    {/* 自由記述欄 */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        自由記述欄（相手に表示されます）
                      </label>
                      <Textarea
                        value={collaborationFreeText}
                        onChange={(e) => setCollaborationFreeText(e.target.value)}
                        placeholder="例: Webアプリ開発の協業パートナーを探しています。バックエンドが得意なので、フロントエンドが得意な方と組みたいです。"
                        rows={4}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 案件希望 */}
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <label className="flex items-start gap-3 mb-3">
                  <input
                    type="checkbox"
                    checked={seekingWorkRequests}
                    onChange={(e) => setSeekingWorkRequests(e.target.checked)}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-bold text-gray-900">💼 案件を探している / 依頼したい</span>
                    <p className="text-sm text-gray-600 mt-1">
                      新しい案件が欲しい、または誰かに仕事を依頼したいなど
                    </p>
                  </div>
                </label>
                {seekingWorkRequests && (
                  <div className="mt-4 space-y-4 pl-7">
                    {/* 案件種類 */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        案件種類
                      </label>
                      <select
                        className="w-full border rounded px-3 py-2"
                        value={workRequestType}
                        onChange={(e) => setWorkRequestType(e.target.value)}
                      >
                        <option value="">選択してください</option>
                        <option value="receiving">案件を受注したい</option>
                        <option value="offering">案件を発注したい</option>
                        <option value="both">どちらでも可</option>
                      </select>
                    </div>

                    {/* 予算規模 */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        予算規模
                      </label>
                      <select
                        className="w-full border rounded px-3 py-2"
                        value={workRequestBudget}
                        onChange={(e) => setWorkRequestBudget(e.target.value)}
                      >
                        <option value="">選択してください</option>
                        <option value="low">〜10万円</option>
                        <option value="medium">10万円〜50万円</option>
                        <option value="high">50万円以上</option>
                        <option value="negotiable">応相談</option>
                      </select>
                    </div>

                    {/* 納期 */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        納期
                      </label>
                      <select
                        className="w-full border rounded px-3 py-2"
                        value={workRequestTimeline}
                        onChange={(e) => setWorkRequestTimeline(e.target.value)}
                      >
                        <option value="">選択してください</option>
                        <option value="urgent">緊急（1週間以内）</option>
                        <option value="normal">通常（1週間〜1ヶ月）</option>
                        <option value="flexible">柔軟（1ヶ月以上）</option>
                      </select>
                    </div>

                    {/* 自由記述欄 */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        自由記述欄（相手に表示されます）
                      </label>
                      <Textarea
                        value={workRequestFreeText}
                        onChange={(e) => setWorkRequestFreeText(e.target.value)}
                        placeholder="例: LP制作の案件を探しています。Figmaデザインがあるので、コーディングのみお願いしたいです。予算15万円、納期2週間。"
                        rows={4}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* PR欄（共通） */}
              {(seekingCollaboration || seekingWorkRequests) && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border-2 border-yellow-300">
                  <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    <span>自己PR・アピール欄</span>
                  </label>
                  <p className="text-xs text-gray-600 mb-3">
                    あなたの強み、実績、得意分野などを自由にアピールしてください。
                  </p>
                  <Textarea
                    value={prMessage}
                    onChange={(e) => setPrMessage(e.target.value)}
                    placeholder="例: Webデザイナー歴5年、UI/UXが得意です。大手企業のLP制作実績多数。レスポンシブデザイン、アニメーション実装が得意です。一緒に良いものを作りましょう！"
                    rows={5}
                    className="bg-white"
                  />
                </div>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-4">
              💡 ヒント: チェックを入れると、マッチング時や作業セッション中に相手に表示されます。
              協業や案件のきっかけづくりにご活用ください。
            </p>
          </div>

          <Button type="submit" className="w-full">
            保存する
          </Button>
        </form>
      </Card>
    </div>
  )
}
