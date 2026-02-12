'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

// エラーメッセージを日本語化
const translateError = (message: string): string => {
  const translations: Record<string, string> = {
    'Invalid login credentials': 'メールアドレスまたはパスワードが正しくありません',
    'Email not confirmed': 'メールアドレスが確認されていません。確認メールをご確認ください',
    'User not found': 'ユーザーが見つかりませんでした',
    'Invalid email': 'メールアドレスの形式が正しくありません',
    'Password is too short': 'パスワードが短すぎます（6文字以上）',
    'Unable to validate email address': 'メールアドレスを検証できませんでした',
  }
  return translations[message] || `ログインエラー: ${message}`
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // レート制限チェック
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const remainingSeconds = Math.ceil((lockoutUntil - Date.now()) / 1000)
      alert(`ログイン試行回数が上限に達しました。${remainingSeconds}秒後に再試行してください。`)
      return
    }

    setLoading(true)

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      const newAttempts = loginAttempts + 1
      setLoginAttempts(newAttempts)

      // 5回失敗で30秒ロックアウト
      if (newAttempts >= 5) {
        const lockoutTime = Date.now() + 30000 // 30秒
        setLockoutUntil(lockoutTime)
        alert('ログイン試行回数が上限に達しました。30秒後に再試行してください。')
      } else {
        alert(translateError(error.message))
      }
      setLoading(false)
      return
    }

    // ログイン成功時はカウンターリセット
    setLoginAttempts(0)
    setLockoutUntil(null)

    // プロフィール完成状態をチェック
    if (data.user) {
      const { data: profile } = await supabase
        .from('users')
        .select('display_name, area_prefecture, area_city, job_categories, available_times')
        .eq('id', data.user.id)
        .single()

      const isProfileComplete = profile &&
        profile.display_name &&
        profile.area_prefecture &&
        profile.area_city &&
        profile.job_categories?.length > 0 &&
        profile.available_times?.length > 0

      if (isProfileComplete) {
        router.push('/matching')
      } else {
        router.push('/profile/edit')
      }
    } else {
      router.push('/profile/edit')
    }

    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) alert(translateError(error.message))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          もくもく作業マッチング
        </h1>
        <p className="text-center text-gray-600 mb-8">
          フリーランスがサボらず仕事できる環境を作る
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">メールアドレス</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">パスワード</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? '処理中...' : 'ログイン'}
          </Button>
        </form>

        <div className="my-4 text-center text-gray-500">または</div>

        <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
          Googleでログイン
        </Button>

        <p className="mt-4 text-center text-sm">
          アカウント作成は{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            こちら
          </a>
        </p>
      </Card>
    </div>
  )
}
