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
    'User already registered': 'このメールアドレスは既に登録されています',
    'Invalid email': 'メールアドレスの形式が正しくありません',
    'Password is too short': 'パスワードが短すぎます（6文字以上必要です）',
    'Password should be at least 6 characters': 'パスワードは6文字以上にしてください',
    'Unable to validate email address': 'メールアドレスを検証できませんでした',
    'Signup requires a valid password': '有効なパスワードを入力してください',
  }
  return translations[message] || `登録エラー: ${message}`
}

// パスワード強度チェック
const checkPasswordStrength = (password: string): { isStrong: boolean; message: string } => {
  if (password.length < 8) {
    return { isStrong: false, message: 'パスワードは8文字以上にしてください' }
  }
  if (!/[a-z]/.test(password)) {
    return { isStrong: false, message: 'パスワードには小文字を含めてください' }
  }
  if (!/[A-Z]/.test(password)) {
    return { isStrong: false, message: 'パスワードには大文字を含めてください' }
  }
  if (!/[0-9]/.test(password)) {
    return { isStrong: false, message: 'パスワードには数字を含めてください' }
  }
  return { isStrong: true, message: '強力なパスワードです' }
}

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [agreedToPolicy, setAgreedToPolicy] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<{ isStrong: boolean; message: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreedToPolicy) {
      alert('利用規約とプライバシーポリシーに同意してください')
      return
    }

    // パスワード強度チェック
    const strength = checkPasswordStrength(password)
    if (!strength.isStrong) {
      alert(strength.message)
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
      alert(translateError(error.message))
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
            <label className="block text-sm font-medium mb-2">パスワード（8文字以上、大小英字・数字を含む）</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (e.target.value) {
                  setPasswordStrength(checkPasswordStrength(e.target.value))
                } else {
                  setPasswordStrength(null)
                }
              }}
              placeholder="••••••••"
              minLength={8}
              required
            />
            {passwordStrength && (
              <div className={`text-xs mt-2 ${passwordStrength.isStrong ? 'text-green-600' : 'text-red-600'}`}>
                {passwordStrength.isStrong ? '✓ ' : '⚠️ '}{passwordStrength.message}
              </div>
            )}
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
