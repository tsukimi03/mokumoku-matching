'use client'

import { useEffect, useRef, useState } from 'react'

interface TomikoVideoAvatarProps {
  isActive: boolean
  message?: string
  onSpeakEnd?: () => void
}

export default function TomikoVideoAvatar({ isActive, message, onSpeakEnd }: TomikoVideoAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [useVideo, setUseVideo] = useState(false)

  useEffect(() => {
    // HeyGen API Keyが設定されているかチェック
    const HEYGEN_API_KEY = process.env.NEXT_PUBLIC_HEYGEN_API_KEY

    if (HEYGEN_API_KEY && isActive && message) {
      generateVideoAvatar(message)
    }
  }, [isActive, message])

  const generateVideoAvatar = async (text: string) => {
    setIsLoading(true)

    try {
      // HeyGen API呼び出し（実装例）
      // 実際のAPI keyが設定されている場合のみ動作
      const HEYGEN_API_KEY = process.env.NEXT_PUBLIC_HEYGEN_API_KEY

      if (!HEYGEN_API_KEY) {
        console.log('HeyGen API key not set, using fallback')
        setIsLoading(false)
        return
      }

      // HeyGen Streaming Avatar API
      const response = await fetch('https://api.heygen.com/v1/streaming.new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': HEYGEN_API_KEY
        },
        body: JSON.stringify({
          avatar_id: 'default_avatar', // HeyGenのアバターID
          voice_id: 'japanese_female', // 日本語女性の声
          text: text
        })
      })

      if (response.ok) {
        const data = await response.json()
        // ビデオURLを取得して再生
        if (videoRef.current && data.video_url) {
          videoRef.current.src = data.video_url
          videoRef.current.play()
          setUseVideo(true)
        }
      }
    } catch (error) {
      console.error('Failed to generate video avatar:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 動画再生終了時の処理
  const handleVideoEnd = () => {
    onSpeakEnd?.()
  }

  if (!isActive) return null

  return (
    <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-2xl border-4 border-white">
      {useVideo ? (
        // 実際の動画アバター
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onEnded={handleVideoEnd}
          playsInline
          autoPlay
        />
      ) : (
        // フォールバック: CSS制作のアバター
        <div className="w-full h-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center relative">
          {/* 顔の輪郭 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-20 bg-gradient-to-b from-amber-100 to-amber-200 rounded-full"></div>
          </div>
          {/* 髪 */}
          <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-slate-800 to-slate-700 rounded-t-full"></div>
          {/* 目 */}
          <div className={`absolute top-8 left-1/2 -translate-x-1/2 flex gap-3 ${isLoading ? 'animate-pulse' : ''}`}>
            <div className="w-2 h-3 bg-slate-800 rounded-full"></div>
            <div className="w-2 h-3 bg-slate-800 rounded-full"></div>
          </div>
          {/* 口（話している時はアニメーション） */}
          <div className={`absolute top-12 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-rose-400 rounded-full ${isLoading ? 'animate-bounce' : ''}`}></div>
          {/* スーツ */}
          <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-b from-slate-700 to-slate-800"></div>
        </div>
      )}

      {/* ローディングオーバーレイ */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* オンライン状態インジケーター */}
      <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
    </div>
  )
}
