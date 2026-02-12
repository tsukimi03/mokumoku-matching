import { NextRequest, NextResponse } from 'next/server'
import { createDailyRoom } from '@/lib/daily'
import { isMockMode } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 })
    }

    const room = await createDailyRoom(sessionId)

    // モックモードの場合
    if (isMockMode()) {
      console.log('[MOCK MODE] Daily.co room created (mock)')
    }

    return NextResponse.json(room)
  } catch (error) {
    console.error('Daily.co room creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create Daily.co room' },
      { status: 500 }
    )
  }
}
