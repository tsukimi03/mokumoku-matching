'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// フリーBGMトラック（著作権フリー音源）
const BGM_TRACKS = [
  { id: 'lofi1', name: 'Lo-Fi Hip Hop', url: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&loop=1&playlist=jfKfPfyJRdk' },
  { id: 'piano', name: 'ピアノBGM', url: 'https://www.youtube.com/embed/4oStw0r33so?autoplay=1&loop=1&playlist=4oStw0r33so' },
  { id: 'cafe', name: 'カフェBGM', url: 'https://www.youtube.com/embed/lTRiuFIWV54?autoplay=1&loop=1&playlist=lTRiuFIWV54' },
  { id: 'nature', name: '自然音', url: 'https://www.youtube.com/embed/eKFTSSKCzWA?autoplay=1&loop=1&playlist=eKFTSSKCzWA' },
]

export default function BGMPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState(BGM_TRACKS[0])
  const [volume, setVolume] = useState(30)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTrackChange = (track: typeof BGM_TRACKS[0]) => {
    setSelectedTrack(track)
    setIsPlaying(true)
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">🎵 BGM</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlayPause}
          >
            {isPlaying ? '⏸️ 停止' : '▶️ 再生'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* トラック選択 */}
        <div className="grid grid-cols-2 gap-2">
          {BGM_TRACKS.map(track => (
            <button
              key={track.id}
              onClick={() => handleTrackChange(track)}
              className={`px-3 py-2 rounded-lg text-sm transition ${
                selectedTrack.id === track.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {track.name}
            </button>
          ))}
        </div>

        {/* 音量調整 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">音量</span>
            <span className="text-sm font-medium">{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* YouTube iframe（非表示） */}
        {isPlaying && (
          <div className="hidden">
            <iframe
              ref={iframeRef}
              src={selectedTrack.url}
              allow="autoplay; encrypted-media"
              title="BGM Player"
            />
          </div>
        )}

        <p className="text-xs text-gray-500 text-center">
          ⚠️ BGMは軽い音量で流すことをおすすめします
        </p>
      </CardContent>
    </Card>
  )
}
