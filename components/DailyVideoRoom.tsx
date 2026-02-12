'use client'

import { useEffect, useState, useRef } from 'react'
import { DailyProvider, useDaily, useParticipantIds, DailyVideo } from '@daily-co/daily-react'
import Daily, { DailyCall } from '@daily-co/daily-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mic, MicOff, Video, VideoOff } from 'lucide-react'

interface DailyVideoRoomProps {
  roomUrl: string
  onLeave?: () => void
  onPartnerLeave?: () => void
}

function VideoRoom({ roomUrl, onLeave, onPartnerLeave }: DailyVideoRoomProps) {
  const daily = useDaily()
  const participantIds = useParticipantIds()
  const [isMuted, setIsMuted] = useState(true)
  const [isVideoOff, setIsVideoOff] = useState(true)

  useEffect(() => {
    if (!daily) return

    // ルームに参加
    daily.join({ url: roomUrl })

    // 相手の退室を検知
    const handleParticipantLeft = (event: any) => {
      // ローカル参加者以外（＝相手）が退室した場合
      if (event.participant && !event.participant.local) {
        onPartnerLeave?.()
      }
    }

    daily.on('participant-left', handleParticipantLeft)

    return () => {
      daily.off('participant-left', handleParticipantLeft)
      daily.leave()
    }
  }, [daily, roomUrl, onPartnerLeave])

  const toggleAudio = () => {
    if (!daily) return
    daily.setLocalAudio(!isMuted)
    setIsMuted(!isMuted)
  }

  const toggleVideo = () => {
    if (!daily) return
    daily.setLocalVideo(!isVideoOff)
    setIsVideoOff(!isVideoOff)
  }

  const leaveRoom = () => {
    if (!daily) return
    daily.leave()
    onLeave?.()
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {participantIds.map((id) => (
              <div key={id} className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <DailyVideo sessionId={id} type="video" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button
          variant={isMuted ? 'destructive' : 'default'}
          size="lg"
          onClick={toggleAudio}
        >
          {isMuted ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
          {isMuted ? '音声ON' : '音声OFF'}
        </Button>

        <Button
          variant={isVideoOff ? 'destructive' : 'default'}
          size="lg"
          onClick={toggleVideo}
        >
          {isVideoOff ? <VideoOff className="mr-2" /> : <Video className="mr-2" />}
          {isVideoOff ? 'カメラON' : 'カメラOFF'}
        </Button>

        <Button variant="outline" size="lg" onClick={leaveRoom}>
          退室
        </Button>
      </div>

      <div className="text-sm text-gray-600 text-center">
        推奨: カメラOFF・音声OFFで軽量化
      </div>
    </div>
  )
}

export default function DailyVideoRoom({ roomUrl, onLeave, onPartnerLeave }: DailyVideoRoomProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [isVideoOff, setIsVideoOff] = useState(true)

  // モック表示（デモ版）
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* モックビデオプレビュー */}
            <div className="aspect-video bg-gradient-to-br from-blue-900 to-gray-900 rounded-lg overflow-hidden flex items-center justify-center border-2 border-blue-500">
              <div className="text-center text-white">
                <div className="text-6xl mb-2">👤</div>
                <p className="text-sm font-semibold">あなた</p>
                <p className="text-xs text-gray-300">(カメラOFF)</p>
              </div>
            </div>
            <div className="aspect-video bg-gradient-to-br from-purple-900 to-gray-900 rounded-lg overflow-hidden flex items-center justify-center border-2 border-purple-500">
              <div className="text-center text-white">
                <div className="text-6xl mb-2">👤</div>
                <p className="text-sm font-semibold">作業仲間</p>
                <p className="text-xs text-gray-300">(カメラOFF)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button
          variant={isMuted ? 'destructive' : 'default'}
          size="lg"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
          {isMuted ? '音声ON' : '音声OFF'}
        </Button>

        <Button
          variant={isVideoOff ? 'destructive' : 'default'}
          size="lg"
          onClick={() => setIsVideoOff(!isVideoOff)}
        >
          {isVideoOff ? <VideoOff className="mr-2" /> : <Video className="mr-2" />}
          {isVideoOff ? 'カメラON' : 'カメラOFF'}
        </Button>

        <Button variant="outline" size="lg" onClick={onLeave}>
          退室
        </Button>
      </div>

      <div className="text-sm text-gray-600 text-center space-y-1">
        <p>💡 推奨: カメラOFF・音声OFFで軽量化</p>
        <p className="text-xs text-gray-500">
          ※ β版: ビデオ通話機能は近日実装予定です
        </p>
      </div>
    </div>
  )
}
