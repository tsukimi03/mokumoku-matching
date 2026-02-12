'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [agreedToPolicy, setAgreedToPolicy] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreedToPolicy) {
      alert('利用規約とプライバシーポリシーに同意してください')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      alert(error.message)
    } else {
      // メール確認不要の場合、直接プロフィール編集へ
      router.push('/profile/edit')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          アカウント作成
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
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
            <label className="block text-sm font-medium mb-2">パスワード（6文字以上）</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToPolicy}
                onChange={(e) => setAgreedToPolicy(e.target.checked)}
                className="mt-1"
                required
              />
              <span className="text-sm text-gray-700">
                <a href="/terms" target="_blank" className="text-blue-600 hover:underline">
                  利用規約
                </a>
                、
                <a href="/privacy" target="_blank" className="text-blue-600 hover:underline">
                  プライバシーポリシー
                </a>
                、
                <a href="/security" target="_blank" className="text-blue-600 hover:underline">
                  セキュリティポリシー
                </a>
                に同意します
              </span>
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={loading || !agreedToPolicy}>
            {loading ? '処理中...' : 'アカウント作成'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm">
          既にアカウントをお持ちの方は{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            ログイン
          </a>
        </p>
      </Card>
    </div>
  )
}
