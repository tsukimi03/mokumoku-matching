export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">セキュリティ</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">当サービスのセキュリティ対策</h2>
            <p className="text-gray-700 leading-relaxed">
              「もくもく作業マッチング」では、ユーザーの個人情報とセッションデータの保護を最優先事項として、
              以下の技術的・運用的なセキュリティ対策を実施しています。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. 通信の暗号化</h2>
            <p className="text-gray-700 leading-relaxed">
              全ての通信は <strong>SSL/TLS (HTTPS)</strong> によって暗号化されています。
              第三者による盗聴・改ざんを防止し、安全にデータをやり取りできます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. データベースの保護</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              ユーザー情報は <strong>Supabase</strong>（PostgreSQL）に保存され、以下の対策を実施：
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
              <li><strong>Row Level Security (RLS)</strong>: ユーザーは自分のデータのみアクセス可能</li>
              <li><strong>アクセス制御</strong>: 認証されたユーザーのみデータ操作可能</li>
              <li><strong>定期的なバックアップ</strong>: データ消失に備えた自動バックアップ</li>
              <li><strong>APIキーの厳格な管理</strong>: サービスロールキーはサーバー側のみで使用</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. パスワードの保護</h2>
            <p className="text-gray-700 leading-relaxed">
              ユーザーのパスワードは <strong>bcrypt</strong> によってハッシュ化され、平文での保存は一切行いません。
              運営者を含め、誰もパスワードを知ることはできません。
            </p>
          </section>

          <section className="bg-blue-50 border-l-4 border-blue-600 p-4">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">4. ビデオ通話の非保存ポリシー</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong className="text-blue-900">本サービスは、ビデオ通話の録画・録音・保存を一切行いません。</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
              <li>ビデオ通話は <strong>Daily.co</strong> を経由してリアルタイム処理</li>
              <li>映像・音声データはサーバーに保存されず、セッション終了後に即座に破棄</li>
              <li>チャット内容も保存されません（リアルタイム通信のみ）</li>
              <li>運営者は会話内容にアクセスできません</li>
            </ul>
            <p className="text-red-600 font-semibold mt-3 leading-relaxed">
              ⚠️ 注意: ユーザー自身や第三者がスクリーンショット・画面録画を行う可能性について、
              運営者は制御できません。プライバシーに関する情報の開示には十分ご注意ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. 不正アクセスの監視</h2>
            <p className="text-gray-700 leading-relaxed">
              Supabaseのログ機能を活用し、異常なアクセスパターンや不正なログイン試行を監視しています。
              不審な操作を検知した場合、速やかに該当アカウントを一時停止し、ユーザーに通知します。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. 最小限のデータ収集</h2>
            <p className="text-gray-700 leading-relaxed">
              本サービスは「データ最小化の原則」に基づき、必要最低限の情報のみ収集します。
              氏名、住所、電話番号、クレジットカード情報などは一切取得しません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. 第三者サービスのセキュリティ</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              本サービスは以下の信頼性の高い第三者サービスを利用しています：
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li>
                <strong>Supabase</strong>（データベース・認証）: SOC 2 Type II 認証取得、GDPR準拠
              </li>
              <li>
                <strong>Daily.co</strong>（ビデオ通話）: WebRTC暗号化、HIPAA準拠、録画機能無効化
              </li>
              <li>
                <strong>Vercel</strong>（ホスティング）: DDoS保護、自動HTTPS、ISO 27001認証
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. データ漏洩時の対応</h2>
            <p className="text-gray-700 leading-relaxed">
              万が一、セキュリティ侵害や個人情報漏洩が発生した場合、以下の対応を行います：
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>影響を受けるユーザーへの速やかな通知（72時間以内）</li>
              <li>パスワード変更の要請、必要に応じてアカウント一時停止</li>
              <li>原因調査と再発防止策の実施</li>
              <li>関係当局への報告（個人情報保護法に基づく）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. ユーザー自身ができる対策</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              セキュリティ向上のため、以下の対策を推奨します：
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
              <li>強力なパスワードを設定する（8文字以上、英数字記号の組み合わせ）</li>
              <li>他のサービスと同じパスワードを使い回さない</li>
              <li>共有PCでログインしたままにしない</li>
              <li>不審なリンクをクリックしない（フィッシング対策）</li>
              <li>ビデオ通話中に個人情報（住所、電話番号等）を話さない</li>
            </ul>
          </section>

          <section className="bg-gray-100 p-4 rounded">
            <h2 className="text-2xl font-semibold mb-4">セキュリティに関するお問い合わせ</h2>
            <p className="text-gray-700 leading-relaxed">
              セキュリティ上の懸念や脆弱性を発見された場合は、
              <a href="/contact" className="text-blue-600 hover:underline ml-1">お問い合わせフォーム</a>
              より速やかにご連絡ください。責任を持って対応いたします。
            </p>
          </section>

          <div className="mt-8 pt-6 border-t text-sm text-gray-500">
            <p>最終更新日: 2026年2月12日</p>
            <p className="mt-1">運営者: もくもく作業マッチング運営チーム</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            トップページに戻る
          </a>
        </div>
      </div>
    </div>
  )
}
