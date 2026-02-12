import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { message, context } = await request.json()

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY

    if (!OPENAI_API_KEY) {
      console.warn('OPENAI_API_KEY not set, returning mock response')
      // API keyがない場合は、固定メッセージを返す
      return NextResponse.json({
        message: 'お疲れ様です！新しい作業仲間を探していますので、少々お待ちくださいね。その間、軽くストレッチでもいかがですか？😊',
        isMock: true
      })
    }

    // ChatGPT APIを呼び出し
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `あなたは「登美子（とみこ）」という名前の親しみやすいAI秘書です。
フリーランスの作業者を励まし、サポートする役割を担っています。
以下の特徴を持っています：

- 親しみやすく、温かい口調で話す
- 「お疲れ様です」「頑張りましょうね」など、励ましの言葉を使う
- 敬語を使いつつも、堅苦しくない
- 絵文字を適度に使う（😊、💪、✨など）
- ポモドーロテクニックやワークライフバランスに関するアドバイスができる
- 簡潔で分かりやすい返答を心がける（100文字以内）

現在の状況：作業仲間が退室したため、新しい相手とのマッチングを待っている状態です。`
          },
          {
            role: 'user',
            content: message || '相手が退室しました。励ましてください。'
          }
        ],
        max_tokens: 150,
        temperature: 0.8
      })
    })

    if (!response.ok) {
      throw new Error('OpenAI API request failed')
    }

    const data = await response.json()
    const aiMessage = data.choices[0]?.message?.content || 'お疲れ様です！少々お待ちください。'

    return NextResponse.json({
      message: aiMessage,
      isMock: false
    })
  } catch (error) {
    console.error('Chat API error:', error)

    // エラー時もフォールバック応答を返す
    return NextResponse.json({
      message: 'お疲れ様です！新しい作業仲間をお探ししていますので、もう少しお待ちくださいね。😊',
      isMock: true,
      error: 'API error occurred'
    })
  }
}
