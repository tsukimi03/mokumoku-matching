'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'

export default function ContactPage() {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: 実際の送信処理（Supabase Edge Functions等）
    // 現時点ではダミー
    console.log('お問い合わせ内容:', { email, subject, message })

    setSubmitted(true)
    setEmail('')
    setSubject('')
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">お問い合わせ</h1>
        <p className="text-center text-gray-600 mb-8">
          ご質問・ご要望・不具合報告など、お気軽にお問い合わせください
        </p>

        {submitted && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
            ✅ お問い合わせを受け付けました。ありがとうございます。
          </div>
        )}

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                件名 <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="お問い合わせの件名"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                お問い合わせ内容 <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="詳細をご記入ください"
                rows={8}
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full text-lg py-6">
              送信する
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-gray-600 text-center">
              または、直接メールでお問い合わせ:
              <br />
              <a
                href="mailto:support@mokumoku-matching.example.com"
                className="text-blue-600 hover:underline font-semibold"
              >
                support@mokumoku-matching.example.com
              </a>
            </p>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            トップページに戻る
          </a>
        </div>
      </div>
    </div>
  )
}
