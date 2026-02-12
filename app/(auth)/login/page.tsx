'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

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
    if (error) alert(error.message)
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
