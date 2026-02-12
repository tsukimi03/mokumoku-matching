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
  isVirtual?: boolean
}

const STAMPS = [
  '👍', '👏', '💪', '🔥', '✨', '😊', '😂', '🤔', '💡', '☕',
  '📝', '💻', '🎉', '🙌', '👌', '😎', '🚀', '⏰', '📚', '🎯'
]

const TOMIKO_REPLIES = [
  'いい調子ですね！頑張りましょう💪',
  'もくもく作業、応援してます😊',
  '集中できていますか？無理せずいきましょう！',
  'すごい！その調子です✨',
  '休憩も大切ですよ☕',
  'ファイトです！🔥',
]

export default function SessionChat({ sessionId, currentUserId, isVirtual = false }: SessionChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [showStamps, setShowStamps] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // 自動スクロール（メッセージエリア内のみ）
  const scrollToBottom = () => {
    const messagesContainer = messagesEndRef.current?.parentElement
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }

  // メッセージ取得（DB接続: 実セッションのみ）
  useEffect(() => {
    if (isVirtual) return

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
  }, [sessionId, supabase, isVirtual])

  // メッセージ送信
  const sendMessage = async (text: string, isStamp: boolean = false) => {
    if (!text.trim()) return

    const userMsg: ChatMessage = {
      id: `local_${Date.now()}`,
      user_id: currentUserId,
      message: text,
      is_stamp: isStamp,
      created_at: new Date().toISOString(),
    }

    if (isVirtual) {
      // ローカルステートのみ（DB書き込みなし）
      setMessages(prev => [...prev, userMsg])
      setNewMessage('')
      setShowStamps(false)
      setTimeout(scrollToBottom, 100)

      // 登美子さんの自動返信（動的な応答）
      setTimeout(async () => {
        try {
          // ChatGPT APIを使って動的な応答を生成
          const response = await fetch('/api/chat/tomiko', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: text,
              context: {
                isChatting: true,
                sessionTime: Math.floor(Date.now() / 60000) // 分単位
              }
            })
          })

          const data = await response.json()
          const replyMessage = data.message || TOMIKO_REPLIES[Math.floor(Math.random() * TOMIKO_REPLIES.length)]

          const reply: ChatMessage = {
            id: `tomiko_${Date.now()}`,
            user_id: 'tomiko_virtual',
            message: replyMessage,
            is_stamp: false,
            created_at: new Date().toISOString(),
            user: { display_name: '登美子さん' }
          }
          setMessages(prev => [...prev, reply])
          setTimeout(scrollToBottom, 100)
        } catch (error) {
          console.error('Tomiko reply error:', error)
          // エラー時はデフォルトの返信
          const reply: ChatMessage = {
            id: `tomiko_${Date.now()}`,
            user_id: 'tomiko_virtual',
            message: TOMIKO_REPLIES[Math.floor(Math.random() * TOMIKO_REPLIES.length)],
            is_stamp: false,
            created_at: new Date().toISOString(),
            user: { display_name: '登美子さん' }
          }
          setMessages(prev => [...prev, reply])
          setTimeout(scrollToBottom, 100)
        }
      }, 1000 + Math.random() * 1000)
    } else {
      // Supabaseに保存
      await supabase.from('chat_messages').insert({
        session_id: sessionId,
        user_id: currentUserId,
        message: text,
        is_stamp: isStamp
      })
      setNewMessage('')
      setShowStamps(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(newMessage, false)
  }

  const handleStampClick = (stamp: string) => {
    sendMessage(stamp, true)
  }

  return (
    <Card className="flex flex-col overflow-hidden">
      {/* 折りたたみヘッダー */}
      <CardHeader
        className="pb-3 cursor-pointer select-none hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="text-lg flex items-center justify-between">
          <span>💬 チャット</span>
          <span className="text-sm text-gray-400">{isOpen ? '▲' : '▼'}</span>
        </CardTitle>
      </CardHeader>

      {/* 折りたたみ本体 */}
      {isOpen && (
        <CardContent className="flex-1 flex flex-col overflow-hidden p-0" style={{ height: '350px' }}>
          {/* メッセージ一覧 */}
          <div className="flex-1 overflow-y-auto px-4 space-y-2">
            {messages.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4">メッセージはまだありません</p>
            )}
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
      )}
    </Card>
  )
}
