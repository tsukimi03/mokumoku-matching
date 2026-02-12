import Daily from '@daily-co/daily-js'
import { isMockMode } from './mock-data'

const DAILY_API_KEY = process.env.DAILY_API_KEY || ''
const DAILY_API_URL = 'https://api.daily.co/v1'

export async function createDailyRoom(sessionId: string): Promise<{ url: string; name: string }> {
  // モックモードの場合、ダミーURLを返す
  if (isMockMode()) {
    console.log('[MOCK MODE] Daily.co room creation (mock)')
    return {
      url: `https://mock.daily.co/mokumoku-${sessionId}`,
      name: `mokumoku-${sessionId}`
    }
  }

  const response = await fetch(`${DAILY_API_URL}/rooms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DAILY_API_KEY}`
    },
    body: JSON.stringify({
      name: `mokumoku-${sessionId}`,
      privacy: 'private',
      properties: {
        max_participants: 2,
        enable_chat: false,
        enable_screenshare: false,
        enable_recording: false,
        start_video_off: true,  // デフォルトでカメラOFF
        start_audio_off: true   // デフォルトで音声OFF
      }
    })
  })

  if (!response.ok) {
    throw new Error(`Daily.co API error: ${response.statusText}`)
  }

  const data = await response.json()
  return {
    url: data.url,
    name: data.name
  }
}

export async function deleteDailyRoom(roomName: string): Promise<void> {
  // モックモードの場合、何もしない
  if (isMockMode()) {
    console.log('[MOCK MODE] Daily.co room deletion (mock)')
    return
  }

  await fetch(`${DAILY_API_URL}/rooms/${roomName}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${DAILY_API_KEY}`
    }
  })
}

export function getDailyClient() {
  return Daily
}
