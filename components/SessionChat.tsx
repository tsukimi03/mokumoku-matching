'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ChatMessage {
  id: string
  user_id: string
  message: string
  is_stamp: boolean
  created_at: string
  user?: {
    display_name: string
  }
}

interface SessionChatProps {
  sessionId: string
  currentUserId: string
}

const STAMPS = [
  '👍', '👏', '💪', '🔥', '✨', '😊', '😂', '🤔', '💡', '☕',
  '📝', '💻', '🎉', '🙌', '👌', '😎', '🚀', '⏰', '📚', '🎯'
]

export default function SessionChat({ sessionId, currentUserId }: SessionChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [showStamps, setShowStamps] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // 自動スクロール
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // メッセージ取得
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('chat_messages')
        .select(`
          *,
          user:users(display_name)
        `)
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })

      if (data) {
        setMessages(data)
        setTimeout(scrollToBottom, 100)
      }
    }

    fetchMessages()

    // Realtime監視
    const channel = supabase
      .channel(`chat:${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId}`
        },
        async (payload) => {
          // ユーザー情報を取得
          const { data: userData } = await supabase
            .from('users')
            .select('display_name')
            .eq('id', payload.new.user_id)
            .single()

          const newMsg = {
            ...payload.new,
            user: userData
          } as ChatMessage

          setMessages(prev => [...prev, newMsg])
          setTimeout(scrollToBottom, 100)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [sessionId, supabase])

  // メッセージ送信
  const sendMessage = async (text: string, isStamp: boolean = false) => {
    if (!text.trim()) return

    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      user_id: currentUserId,
      message: text,
      is_stamp: isStamp
    })

    setNewMessage('')
    setShowStamps(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(newMessage, false)
  }

  const handleStampClick = (stamp: string) => {
    sendMessage(stamp, true)
  }

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">チャット</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
        {/* メッセージ一覧 */}
        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          {messages.map(msg => {
            const isOwn = msg.user_id === currentUserId
            return (
              <div
                key={msg.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-lg px-3 py-2`}>
                  {!isOwn && (
                    <div className="text-xs opacity-70 mb-1">
                      {msg.user?.display_name || '匿名'}
                    </div>
                  )}
                  <div className={msg.is_stamp ? 'text-2xl' : 'text-sm'}>
                    {msg.message}
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* スタンプ選択 */}
        {showStamps && (
          <div className="border-t bg-gray-50 p-2">
            <div className="grid grid-cols-10 gap-2">
              {STAMPS.map(stamp => (
                <button
                  key={stamp}
                  onClick={() => handleStampClick(stamp)}
                  className="text-2xl hover:scale-125 transition-transform"
                >
                  {stamp}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 入力欄 */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowStamps(!showStamps)}
              className="shrink-0"
            >
              {showStamps ? '✕' : '😊'}
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="メッセージを入力..."
              className="flex-1"
            />
            <Button type="submit" size="sm" disabled={!newMessage.trim()}>
              送信
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
