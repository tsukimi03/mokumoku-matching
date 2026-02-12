import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-3">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">もくもく作業マッチング</h1>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">ログイン</Button>
            </Link>
            <Link href="/signup">
              <Button>サインアップ</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Text Content */}
          <div className="space-y-4">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              🎉 β版テスター募集中 - 完全無料
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              圧倒的な集中力を、いつでも。
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              <span className="text-blue-600 font-bold">フリーランスの集中特化ツール。</span><br />
              見知らぬ人と25分のポモドーロで、驚くほど集中できる。
            </p>
            <p className="text-gray-500">
              ✅ 3分で登録完了　✅ 即マッチング　✅ カメラOFF推奨
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="text-xl px-12 py-7 shadow-lg hover:shadow-xl transition-shadow">
                  今すぐ無料で始める →
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-xl px-12 py-7">
                  ログイン
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              ※ クレジットカード不要　※ いつでも退会可能
            </p>
          </div>

          {/* Right: Visual Design */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl p-6 md:p-8 shadow-2xl">
              {/* Central Focus Icon */}
              <div className="text-center mb-4">
                <div className="text-6xl md:text-7xl mb-2 animate-pulse">💻</div>
                <div className="text-xl font-bold text-gray-800">集中モード ON</div>
              </div>

              {/* Connected Users Visualization */}
              <div className="relative h-48">
                {/* Center - You */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg border-4 border-blue-500">
                    <span className="text-3xl">😊</span>
                  </div>
                  <div className="text-center text-sm font-semibold mt-2">あなた</div>
                </div>

                {/* Partner 1 - Top Left */}
                <div className="absolute top-0 left-8 animate-float-slow">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-2 border-green-400">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                  <div className="text-xs text-center mt-1 text-gray-600">東京</div>
                </div>

                {/* Partner 2 - Top Right */}
                <div className="absolute top-0 right-8 animate-float-medium">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-2 border-purple-400">
                    <span className="text-2xl">👩‍💼</span>
                  </div>
                  <div className="text-xs text-center mt-1 text-gray-600">大阪</div>
                </div>

                {/* Partner 3 - Bottom Left */}
                <div className="absolute bottom-0 left-12 animate-float-medium">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-2 border-yellow-400">
                    <span className="text-2xl">👨‍🎨</span>
                  </div>
                  <div className="text-xs text-center mt-1 text-gray-600">福岡</div>
                </div>

                {/* Partner 4 - Bottom Right */}
                <div className="absolute bottom-0 right-12 animate-float-slow">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-2 border-pink-400">
                    <span className="text-2xl">👩‍🔬</span>
                  </div>
                  <div className="text-xs text-center mt-1 text-gray-600">札幌</div>
                </div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                  <line x1="50%" y1="50%" x2="20%" y2="15%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="50%" y1="50%" x2="80%" y2="15%" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="50%" y1="50%" x2="25%" y2="85%" stroke="#EAB308" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="50%" y1="50%" x2="75%" y2="85%" stroke="#EC4899" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 text-center">
                <div className="bg-white rounded-lg p-3 shadow">
                  <div className="text-2xl font-bold text-blue-600">3分</div>
                  <div className="text-xs text-gray-600">登録完了</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow">
                  <div className="text-2xl font-bold text-green-600">即</div>
                  <div className="text-xs text-gray-600">マッチング</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow">
                  <div className="text-2xl font-bold text-purple-600">25分</div>
                  <div className="text-xs text-gray-600">集中タイム</div>
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
            <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
              「誰かが見ている」という適度な緊張感が、<br className="hidden md:block" />
              あなたの集中力を最大化します。
            </p>
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

      {/* Security Badge */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl">🔒</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">安心・安全のセキュリティ</h3>
                  <p className="text-gray-700">
                    SSL暗号化通信 / データベースアクセス制御 / ビデオ通話非保存
                  </p>
                </div>
              </div>
              <a
                href="/security"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition whitespace-nowrap"
              >
                詳しく見る →
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8">
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">変な人は弾かれます</h3>
              <p className="text-gray-700 mb-4">
                徹底した安全対策で、不適切なユーザーは自動で排除されます
              </p>
              <div className="grid md:grid-cols-4 gap-4 text-sm max-w-3xl mx-auto">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="font-bold mb-1">🚨 通報機能</div>
                  <div className="text-gray-600 text-xs">不適切な行為は即通報</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="font-bold mb-1">⭐ 評価システム</div>
                  <div className="text-gray-600 text-xs">低評価で自動停止</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="font-bold mb-1">📱 電話番号認証</div>
                  <div className="text-gray-600 text-xs">本人確認を徹底</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="font-bold mb-1">🏢 職歴登録必須</div>
                  <div className="text-gray-600 text-xs">心理的抑止力</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20 bg-gray-50">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            フリーランスの<span className="text-blue-600">集中力</span>を支える3つの機能
          </h3>
          <p className="text-gray-600">カフェでの作業感をオンラインで再現</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">🎯</div>
            <h4 className="text-xl font-bold mb-3">同じ職種でマッチング</h4>
            <p className="text-gray-600 leading-relaxed">
              エンジニア、デザイナー、ライター等、
              同じ職種の仲間と繋がる。
              「あの人も頑張ってる」がモチベーションに。
            </p>
          </Card>
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">⏰</div>
            <h4 className="text-xl font-bold mb-3">25分のポモドーロ</h4>
            <p className="text-gray-600 leading-relaxed">
              集中力が続く25分セッション。
              タイマーが自動でカウントダウン。
              終了後はフィードバックで振り返り。
            </p>
          </Card>
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">🔇</div>
            <h4 className="text-xl font-bold mb-3">カメラOFF推奨</h4>
            <p className="text-gray-600 leading-relaxed">
              音声もカメラもOFFでOK。
              PC負荷を抑えて軽快に。
              存在感だけを共有する新しい働き方。
            </p>
          </Card>
        </div>
      </section>

      {/* Collaboration & Work Opportunities */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                仕事も仲間も見つかる
              </h3>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                もくもく作業で繋がった仲間と、そのまま協業や案件のやり取りができます。
                <br />
                <strong className="text-purple-600">
                  協力者を探している人・業務依頼をしたい人がいれば、その旨連絡が入るかも？
                </strong>
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💼</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-gray-900">案件を探す・依頼する</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      「この仕事、誰かに頼みたい」「新しい案件が欲しい」
                      <br />
                      プロフィールで希望を設定すれば、マッチング時に相手に伝わります。
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">👥</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-gray-900">協業パートナーを見つける</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      「一緒にプロジェクトを進めたい」「技術を教え合いたい」
                      <br />
                      もくもく作業で繋がった仲間と、長期的な協業関係を築けます。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">
              ※ プロフィール設定で「協業希望」「案件希望」を選択できます
            </p>
          </div>
        </div>
      </section>

      {/* このアプリを作った理由 */}
      <section className="container mx-auto px-4 py-20">
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
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">使い方</h3>
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">プロフィールを登録</h4>
                <p className="text-gray-600">
                  職種、スキル、作業可能な時間帯を設定
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">マッチング相手を探す</h4>
                <p className="text-gray-600">
                  同じ時間帯に作業したい人を見つける
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">もくもく作業開始</h4>
                <p className="text-gray-600">
                  ビデオ通話で繋がりながら各自の作業に集中
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl my-12">
        <h3 className="text-3xl md:text-4xl font-bold mb-6">
          一人で悩んでいませんか？
        </h3>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          今すぐ登録して、全国の作業仲間を見つけましょう。<br />
          完全無料・3分で登録完了
        </p>
        <Link href="/signup">
          <Button size="lg" className="text-xl px-12 py-7 bg-white text-blue-600 hover:bg-gray-100 shadow-xl">
            無料で始める →
          </Button>
        </Link>
        <p className="text-sm mt-6 text-blue-100">
          すでにアカウントをお持ちの方は
          <Link href="/login" className="underline ml-2 text-white font-semibold">
            ログイン
          </Link>
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <div className="flex justify-center gap-6 mb-4">
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
          <p>&copy; 2026 もくもく作業マッチング. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
