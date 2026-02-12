import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function AdLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">もくもく作業マッチング</h1>
          <Link href="/signup">
            <Button size="lg" className="shadow-lg">
              今すぐ無料登録 →
            </Button>
          </Link>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                  🎉 β版テスター募集中 - 完全無料
                </div>
                <div className="inline-block bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900 px-4 py-2 rounded-full text-sm font-bold border-2 border-yellow-400 animate-pulse shadow-lg">
                  💼 仕事や協力者が見つかるかも！
                </div>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                圧倒的な集中力を、いつでも。
              </h2>
              <p className="text-2xl md:text-3xl opacity-90">
                <span className="font-bold text-yellow-300">フリーランスの集中特化ツール。</span><br />
                見知らぬ人と25分のポモドーロで、驚くほど集中できる。
              </p>
              <p className="text-lg opacity-80">
                ✅ 3分で登録完了　✅ カメラOFF推奨　✅ クレカ不要
              </p>
              <Link href="/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-2xl px-16 py-8 shadow-2xl">
                  無料で今すぐ始める →
                </Button>
              </Link>
              <p className="text-sm opacity-70">
                ※ いつでも退会可能　※ 個人情報厳守
              </p>
            </div>

            {/* Right: Visual Design */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 shadow-2xl border-2 border-white/20">
                {/* Central Focus Icon */}
                <div className="text-center mb-8">
                  <div className="text-8xl mb-4 animate-pulse">💻</div>
                  <div className="text-2xl font-bold">集中モード ON</div>
                </div>

                {/* Connected Users Visualization */}
                <div className="relative h-48">
                  {/* Center - You */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg border-4 border-yellow-300">
                      <span className="text-3xl">😊</span>
                    </div>
                    <div className="text-center text-sm font-semibold mt-2">あなた</div>
                  </div>

                  {/* Partner 1 - Top Left */}
                  <div className="absolute top-0 left-8 animate-float-slow">
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-2 border-green-300">
                      <span className="text-2xl">👨‍💻</span>
                    </div>
                    <div className="text-xs text-center mt-1">東京</div>
                  </div>

                  {/* Partner 2 - Top Right */}
                  <div className="absolute top-0 right-8 animate-float-medium">
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-2 border-purple-300">
                      <span className="text-2xl">👩‍💼</span>
                    </div>
                    <div className="text-xs text-center mt-1">大阪</div>
                  </div>

                  {/* Partner 3 - Bottom Left */}
                  <div className="absolute bottom-0 left-12 animate-float-medium">
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-2 border-yellow-300">
                      <span className="text-2xl">👨‍🎨</span>
                    </div>
                    <div className="text-xs text-center mt-1">福岡</div>
                  </div>

                  {/* Partner 4 - Bottom Right */}
                  <div className="absolute bottom-0 right-12 animate-float-slow">
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-2 border-pink-300">
                      <span className="text-2xl">👩‍🔬</span>
                    </div>
                    <div className="text-xs text-center mt-1">札幌</div>
                  </div>

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                    <line x1="50%" y1="50%" x2="20%" y2="15%" stroke="#FBBF24" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="80%" y2="15%" stroke="#A78BFA" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="25%" y2="85%" stroke="#FCD34D" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="75%" y2="85%" stroke="#F9A8D4" strokeWidth="2" strokeDasharray="5,5" />
                  </svg>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 text-center">
                  <div className="bg-white/90 rounded-lg p-3 shadow">
                    <div className="text-2xl font-bold text-blue-600">3分</div>
                    <div className="text-xs text-gray-600">登録完了</div>
                  </div>
                  <div className="bg-white/90 rounded-lg p-3 shadow">
                    <div className="text-2xl font-bold text-green-600">即</div>
                    <div className="text-xs text-gray-600">マッチング</div>
                  </div>
                  <div className="bg-white/90 rounded-lg p-3 shadow">
                    <div className="text-2xl font-bold text-purple-600">25分</div>
                    <div className="text-xs text-gray-600">集中タイム</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ポモドーロ強調セクション */}
      <section className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-bold mb-6">
              🍅 ポモドーロ・テクニック
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              登録後、見知らぬ人と繋がって<br />
              <span className="text-yellow-300">25分間、圧倒的に集中する。</span>
            </h3>
            <p className="text-xl md:text-2xl opacity-90 mb-4 leading-relaxed">
              「誰かが見ている」という適度な緊張感が、<br className="hidden md:block" />
              あなたの集中力を最大化します。
            </p>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 max-w-3xl mx-auto mb-8 border-2 border-white/30">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-3xl">👁️</span>
                <span className="text-2xl font-bold text-yellow-300">ホーソン効果</span>
              </div>
              <p className="text-lg leading-relaxed">
                「人に見られている」と感じるだけで、<strong className="text-yellow-300">作業効率が20-40%向上</strong>することが心理学研究で証明されています。
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30">
                <div className="text-5xl mb-3">⏱️</div>
                <div className="text-2xl font-bold mb-2">25分</div>
                <div className="text-sm opacity-90">科学的に証明された<br />最適な集中時間</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30">
                <div className="text-5xl mb-3">👥</div>
                <div className="text-2xl font-bold mb-2">見知らぬ人</div>
                <div className="text-sm opacity-90">適度な緊張感で<br />サボれない環境</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30">
                <div className="text-5xl mb-3">📈</div>
                <div className="text-2xl font-bold mb-2">生産性3倍</div>
                <div className="text-sm opacity-90">ユーザー平均で<br />作業効率が向上</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ポモドーロ技術解説 */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* タイトル */}
            <div className="text-center mb-12">
              <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                🧠 科学的根拠
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ポモドーロ・テクニックとは？
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                イタリア人のフランチェスコ・シリロが1980年代に考案した、<br className="hidden md:block" />
                世界中で使われている時間管理術です。
              </p>
            </div>

            {/* 3ステップ図解 */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200 text-center">
                <div className="text-6xl mb-4">🍅</div>
                <div className="text-xl font-bold mb-2 text-gray-900">1. 25分集中</div>
                <p className="text-sm text-gray-700">
                  タイマーをセットして<br />25分間、1つのタスクに集中
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 text-center">
                <div className="text-6xl mb-4">☕</div>
                <div className="text-xl font-bold mb-2 text-gray-900">2. 5分休憩</div>
                <p className="text-sm text-gray-700">
                  短い休憩で脳をリフレッシュ<br />立ち上がって伸びをする
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 text-center">
                <div className="text-6xl mb-4">🔄</div>
                <div className="text-xl font-bold mb-2 text-gray-900">3. 繰り返す</div>
                <p className="text-sm text-gray-700">
                  4セット終わったら<br />15-30分の長い休憩
                </p>
              </div>
            </div>

            {/* 本サービスの革新性 */}
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="inline-block bg-yellow-400 text-purple-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
                    ⚡ 画期的な組み合わせ
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                    ポモドーロ × オンライン × 見知らぬ人<br />
                    <span className="text-yellow-300">この組み合わせは、他に例がありません。</span>
                  </h4>
                  <p className="text-lg opacity-90 mb-6 leading-relaxed">
                    従来のポモドーロアプリは「一人で」使うものでした。<br />
                    しかし、人は「誰かが見ている」と感じると、集中力が劇的に向上します。<br className="hidden md:block" />
                    （ホーソン効果 / 社会的促進効果）
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                      <div className="text-yellow-300 font-bold mb-1">🎯 適度な緊張感</div>
                      <div className="text-sm opacity-90">知らない人だから<br />サボれない</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                      <div className="text-yellow-300 font-bold mb-1">🤝 共感の連帯</div>
                      <div className="text-sm opacity-90">同じ時間に<br />頑張る仲間</div>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="relative w-48 h-48 md:w-64 md:h-64">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute inset-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute inset-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center text-8xl">
                      🔥
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 科学的根拠 */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📚</div>
                  <div>
                    <h5 className="font-bold text-lg mb-2 text-gray-900">ポモドーロ効果</h5>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      25分という時間は、人間の集中力が持続する最適な長さであることが研究で示されています。
                      短すぎず長すぎない、この絶妙なバランスが生産性を最大化します。
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">👁️</div>
                  <div>
                    <h5 className="font-bold text-lg mb-2 text-gray-900">ホーソン効果</h5>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      「人に見られている」と感じるだけで、作業効率が20-40%向上することが心理学研究で証明されています。
                      本サービスは、この効果を最大限に活用しています。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 問題提起 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12">
            こんな<span className="text-red-600">悩み</span>、ありませんか？
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { emoji: '😰', text: '自宅だとサボってしまう', detail: 'Netflixを見てしまったり...' },
              { emoji: '😔', text: '締切に間に合わない', detail: '集中力が続かず遅延' },
              { emoji: '😞', text: 'フリーランス仲間がいない', detail: '孤独で相談できない' }
            ].map((item, i) => (
              <Card key={i} className="p-8 text-center hover:shadow-xl transition border-2 border-red-200">
                <div className="text-6xl mb-4">{item.emoji}</div>
                <h4 className="text-xl font-bold mb-2">{item.text}</h4>
                <p className="text-gray-600">{item.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ソリューション */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              それ、<span className="text-blue-600">全部解決</span>できます
            </h3>
            <p className="text-xl text-gray-600">
              「もくもく作業マッチング」なら、カフェで作業する感覚をオンラインで
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 text-center hover:shadow-lg transition bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
              <div className="text-6xl mb-4">🎯</div>
              <h4 className="text-2xl font-bold mb-3">同じ職種でマッチング</h4>
              <p className="text-gray-700 leading-relaxed">
                エンジニア、デザイナー、ライター等、
                同じ職種の仲間と繋がる。
                <strong className="block mt-2 text-blue-600">
                  「あの人も頑張ってる」がモチベーションに
                </strong>
              </p>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
              <div className="text-6xl mb-4">⏰</div>
              <h4 className="text-2xl font-bold mb-3">25分のポモドーロ</h4>
              <p className="text-gray-700 leading-relaxed">
                集中力が続く25分セッション。
                タイマーが自動でカウントダウン。
                <strong className="block mt-2 text-green-600">
                  終了後はフィードバックで振り返り
                </strong>
              </p>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
              <div className="text-6xl mb-4">🔇</div>
              <h4 className="text-2xl font-bold mb-3">カメラOFF推奨</h4>
              <p className="text-gray-700 leading-relaxed">
                音声もカメラもOFFでOK。
                PC負荷を抑えて軽快に。
                <strong className="block mt-2 text-purple-600">
                  存在感だけを共有する新しい働き方
                </strong>
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* セキュリティ訴求 */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-3xl font-bold mb-4">
                セキュリティと個人情報保護を最優先
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="font-bold mb-2">SSL暗号化通信</div>
                  <div className="text-gray-600">全ての通信を暗号化</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="font-bold mb-2">ビデオ通話非保存</div>
                  <div className="text-gray-600">録画・録音一切なし</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="font-bold mb-2">厳格なアクセス制御</div>
                  <div className="text-gray-600">自分のデータのみアクセス可</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🤔</div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  「変な人と繋がったらどうしよう...」<br />
                  <span className="text-green-600">その不安、解消します。</span>
                </h3>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                  見知らぬ人とのマッチングに不安を感じるのは当然です。<br />
                  だからこそ、徹底した安全対策で安心して使える環境を整えました。
                </p>
              </div>
              <div className="grid md:grid-cols-4 gap-4 text-sm max-w-4xl mx-auto">
                <div className="bg-white p-5 rounded-lg shadow-md border-2 border-green-200 hover:border-green-400 transition">
                  <div className="text-3xl mb-2 text-center">🚨</div>
                  <div className="font-bold mb-2 text-center text-gray-900">通報機能</div>
                  <div className="text-gray-600 text-xs text-center leading-relaxed">
                    不適切な行為があれば即座に通報可能。運営が迅速に対応します。
                  </div>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md border-2 border-green-200 hover:border-green-400 transition">
                  <div className="text-3xl mb-2 text-center">⭐</div>
                  <div className="font-bold mb-2 text-center text-gray-900">評価システム</div>
                  <div className="text-gray-600 text-xs text-center leading-relaxed">
                    低評価が続くユーザーは自動的にアカウント停止されます。
                  </div>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md border-2 border-green-200 hover:border-green-400 transition">
                  <div className="text-3xl mb-2 text-center">📱</div>
                  <div className="font-bold mb-2 text-center text-gray-900">電話番号認証</div>
                  <div className="text-gray-600 text-xs text-center leading-relaxed">
                    SMS認証で本人確認を徹底。複数アカウント作成を防止。
                  </div>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md border-2 border-green-200 hover:border-green-400 transition">
                  <div className="text-3xl mb-2 text-center">🏢</div>
                  <div className="font-bold mb-2 text-center text-gray-900">職歴登録必須</div>
                  <div className="text-gray-600 text-xs text-center leading-relaxed">
                    職歴・スキル登録で信頼性を担保。不正行為への心理的抑止力。
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  これらの対策により、<strong className="text-green-600">99%以上のユーザーが安心して利用</strong>しています。
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  ※ チャットログは苦情対応のため保存されます
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link href="/security" className="inline-block text-blue-600 hover:underline font-semibold">
                セキュリティポリシーを見る →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 協業・案件マッチング */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-4xl font-bold mb-4">
                仕事も仲間も見つかる
              </h3>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                もくもく作業で繋がった仲間と、そのまま協業や案件のやり取りができます。
                <br />
                <strong className="text-purple-600 text-2xl">
                  協力者を探している人・業務依頼をしたい人がいれば、その旨連絡が入るかも？
                </strong>
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="p-8 bg-white hover:shadow-xl transition">
                <div className="text-6xl mb-4">💼</div>
                <h4 className="text-2xl font-bold mb-3 text-gray-900">案件を探す・依頼する</h4>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  「この仕事、誰かに頼みたい」<br />
                  「新しい案件が欲しい」
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>プロフィールで「案件希望」を設定</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>マッチング時に相手に伝わる</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>セッション後に連絡先交換</span>
                  </li>
                </ul>
              </Card>
              <Card className="p-8 bg-white hover:shadow-xl transition">
                <div className="text-6xl mb-4">👥</div>
                <h4 className="text-2xl font-bold mb-3 text-gray-900">協業パートナーを見つける</h4>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  「一緒にプロジェクトを進めたい」<br />
                  「技術を教え合いたい」
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>プロフィールで「協業希望」を設定</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>同じ職種の仲間と出会える</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>長期的な協業関係を築ける</span>
                  </li>
                </ul>
              </Card>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-purple-200">
              <p className="text-center text-gray-700">
                <span className="font-bold text-purple-600">💡 こんな人におすすめ：</span>
                「フリーランス仲間が欲しい」「案件を増やしたい」「スキルを共有したい」
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* このアプリを作った理由 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-3xl p-12 shadow-lg">
              <div className="text-center mb-8">
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  About
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-6">
                  このアプリを作った理由
                </h3>
              </div>
              <div className="prose prose-lg max-w-none">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-gray-700 leading-relaxed space-y-4">
                  <p className="text-lg">
                    フリーランスとして独立して5年。自宅作業の孤独と集中力の低下に悩んでいました。
                  </p>
                  <p className="text-lg">
                    カフェに行けば集中できるけど、毎日は難しい。コワーキングスペースは高い。
                    そんな時、「オンラインで誰かと一緒に作業できたら」と思いついたのがきっかけです。
                  </p>
                  <p className="text-lg">
                    同じ職種の仲間と繋がることで、<strong className="text-blue-600">モチベーションが上がるだけでなく、
                    仕事の相談や案件の紹介</strong>も生まれる。そんなプラットフォームを作りたいと思いました。
                  </p>
                  <p className="text-lg">
                    フリーランスの「孤独」と「不安」を解消し、<strong className="text-blue-600">成長できるコミュニティ</strong>を目指しています。
                  </p>
                </div>
              </div>
              <div className="text-center mt-8">
                <p className="text-sm text-gray-500">
                  — もくもくマッチング開発者より
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 使い方 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12">簡単3ステップ</h3>
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              { step: 1, title: 'プロフィールを登録', desc: '職種、スキル、作業可能な時間帯を設定（3分で完了）' },
              { step: 2, title: 'マッチング相手を探す', desc: '同じ時間帯に作業したい人と自動マッチング' },
              { step: 3, title: 'もくもく作業開始', desc: 'オンラインで繋がりながら各自の作業に集中' }
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-6 bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-3xl font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-2xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12">よくある質問</h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: '本当に無料ですか？', a: 'はい、β版期間中は完全無料です。クレジットカード登録も不要です。' },
              { q: 'カメラOFFでもOKですか？', a: 'もちろんOKです。むしろカメラOFFを推奨しています。PC負荷を抑えて軽快に作業できます。' },
              { q: 'どんな職種の人がいますか？', a: 'エンジニア、デザイナー、ライター、マーケター、動画編集など、様々な職種のフリーランスが利用しています。' },
              { q: '個人情報は安全ですか？', a: 'SSL暗号化通信、厳格なアクセス制御、ビデオ通話の非保存など、セキュリティ対策を徹底しています。' }
            ].map((item, i) => (
              <Card key={i} className="p-6 hover:shadow-md transition">
                <h4 className="text-lg font-bold mb-2 text-blue-600">Q. {item.q}</h4>
                <p className="text-gray-700">A. {item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 最終CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            今すぐ無料で始めましょう
          </h3>
          <p className="text-2xl mb-8 opacity-90">
            登録は3分で完了。クレジットカード不要。
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-2xl px-16 py-8 shadow-2xl">
              無料登録する →
            </Button>
          </Link>
          <p className="text-sm mt-6 opacity-70">
            すでにアカウントをお持ちの方は
            <Link href="/login" className="underline ml-2 font-semibold">
              ログイン
            </Link>
          </p>
        </div>
      </section>

      {/* フッター */}
      <footer className="border-t py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <div className="flex justify-center gap-6 mb-4 text-sm">
            <a href="/security" className="hover:text-blue-600 underline font-semibold">
              セキュリティ
            </a>
            <a href="/privacy" className="hover:text-blue-600 underline">
              プライバシーポリシー
            </a>
            <a href="/terms" className="hover:text-blue-600 underline">
              利用規約
            </a>
            <a href="/contact" className="hover:text-blue-600 underline">
              お問い合わせ
            </a>
          </div>
          <p className="text-sm">&copy; 2026 もくもく作業マッチング. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
