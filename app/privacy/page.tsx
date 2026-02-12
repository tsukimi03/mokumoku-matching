export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">プライバシーポリシー</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. 個人情報の収集</h2>
            <p className="text-gray-700 leading-relaxed">
              当サービス「もくもく作業マッチング」（以下、「本サービス」）では、サービス提供のために以下の個人情報を収集します：
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>メールアドレス</li>
              <li>表示名</li>
              <li>居住地域（都道府県・市区町村）</li>
              <li>職種・スキル情報</li>
              <li>稼働可能時間帯</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. 個人情報の利用目的</h2>
            <p className="text-gray-700 leading-relaxed">
              収集した個人情報は、以下の目的で利用します：
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>本サービスの提供・運営</li>
              <li>ユーザー同士のマッチング</li>
              <li>お問い合わせ対応</li>
              <li>サービス改善のための分析</li>
              <li>利用規約違反への対応</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. 第三者への提供</h2>
            <p className="text-gray-700 leading-relaxed">
              本サービスは、以下のサービスを利用しています。これらのサービスに必要な情報が共有されます：
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li><strong>Supabase</strong>: データベース・認証サービス（米国）</li>
              <li><strong>Daily.co</strong>: ビデオ通話サービス（米国、β版実装予定）</li>
              <li><strong>Vercel</strong>: ホスティングサービス（米国）</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2">
              法令に基づく場合を除き、ユーザーの同意なく第三者に個人情報を提供することはありません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Cookie・アクセス解析</h2>
            <p className="text-gray-700 leading-relaxed">
              本サービスでは、サービス改善のためにCookieおよびGoogle Analyticsを使用する場合があります。
              これらは匿名化されたデータであり、個人を特定するものではありません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. ユーザーの権利</h2>
            <p className="text-gray-700 leading-relaxed">
              ユーザーは、以下の権利を有します：
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li>自己の個人情報の開示請求</li>
              <li>個人情報の訂正・削除請求</li>
              <li>個人情報の利用停止請求</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2">
              これらの請求は、お問い合わせフォームよりご連絡ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. セキュリティ対策</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              本サービスは、個人情報およびセッションデータの保護のため、以下のセキュリティ対策を実施しています：
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
              <li><strong>通信の暗号化</strong>: 全ての通信はSSL/TLS (HTTPS) で暗号化</li>
              <li><strong>データベースの保護</strong>: Supabase RLS (Row Level Security) による厳格なアクセス制御</li>
              <li><strong>パスワードの保護</strong>: bcryptによるハッシュ化、平文保存なし</li>
              <li><strong>ビデオ通話の非保存</strong>: Daily.co経由の映像・音声は録画・録音されず、リアルタイム処理のみ</li>
              <li><strong>定期的な監視</strong>: 不正アクセス・異常な操作の検知と対応</li>
              <li><strong>最小限のデータ収集</strong>: 必要最低限の情報のみ取得</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong className="text-red-600">重要:</strong> 本サービスは、ビデオ通話の録画・録音・保存を一切行いません。
              セッション終了後、映像・音声データは即座に破棄されます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. データ漏洩時の対応</h2>
            <p className="text-gray-700 leading-relaxed">
              万が一、個人情報の漏洩が発生した場合、速やかに該当ユーザーに通知し、
              必要な措置（パスワード変更要請、アカウント停止等）を講じます。
              また、関係当局への報告を含め、適切に対応いたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. プライバシーポリシーの変更</h2>
            <p className="text-gray-700 leading-relaxed">
              本ポリシーは、法令の変更やサービス内容の変更に応じて、予告なく変更されることがあります。
              重要な変更がある場合は、サービス内で通知します。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. お問い合わせ</h2>
            <p className="text-gray-700 leading-relaxed">
              本ポリシーに関するご質問は、お問い合わせフォームよりご連絡ください。
            </p>
          </section>

          <div className="mt-8 pt-6 border-t text-sm text-gray-500">
            <p>制定日: 2026年2月12日</p>
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
