export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">利用規約</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">第1条（適用）</h2>
            <p className="text-gray-700 leading-relaxed">
              本規約は、「もくもく作業マッチング」（以下、「本サービス」）の利用に関する条件を定めるものです。
              ユーザーは、本サービスを利用することにより、本規約に同意したものとみなされます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">第2条（利用登録）</h2>
            <p className="text-gray-700 leading-relaxed">
              本サービスの利用にあたっては、ユーザー登録が必要です。
              ユーザーは、正確かつ最新の情報を登録するものとします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">第3条（禁止事項）</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません：
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>他のユーザーまたは第三者の権利を侵害する行為</li>
              <li>他のユーザーに対する迷惑行為、嫌がらせ</li>
              <li>虚偽の情報を登録する行為</li>
              <li>本サービスの運営を妨害する行為</li>
              <li>不正アクセス、サーバーへの攻撃</li>
              <li>本サービスを営利目的で利用する行為</li>
              <li>その他、運営者が不適切と判断する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">第4条（本サービスの内容）</h2>
            <p className="text-gray-700 leading-relaxed">
              本サービスは、フリーランスの作業集中力向上を目的としたマッチングサービスです。
              運営者は、本サービスの内容を予告なく変更、追加、削除することができます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">第5条（免責事項）</h2>
            <p className="text-gray-700 leading-relaxed mb-2 font-semibold">
              本サービスに関して、運営者は以下について一切の責任を負いません：
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
              <li>本サービスの中断、終了、変更により生じた損害</li>
              <li><strong>ユーザー間のトラブル、ハラスメント、不適切な発言・行為により生じた損害</strong></li>
              <li><strong>ビデオ通話中の会話内容、映像、音声に関する一切の責任（録画・録音・流出を含む）</strong></li>
              <li><strong>第三者によるスクリーンショット、画面録画、不正アクセス、盗聴により生じた損害</strong></li>
              <li>ユーザーの情報の消失、漏洩により生じた損害（ユーザー自身の過失を含む）</li>
              <li>システム障害、通信障害、第三者サービス（Supabase, Daily.co, Vercel等）の障害により生じた損害</li>
              <li>マッチング相手の選定、相性、作業効率に関する一切の保証</li>
              <li>本サービスの利用により生じた精神的苦痛、時間的損失、機会損失</li>
              <li>その他、本サービスの利用に関連して生じた直接的・間接的な損害</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              本サービスは「現状有姿（AS IS）」で提供され、運営者は、本サービスの完全性、正確性、有用性、
              安全性、継続性について一切保証しません。
            </p>
            <p className="text-red-600 font-semibold mt-4 leading-relaxed">
              【重要】本サービスは、ビデオ通話の内容について録画・録音・保存を行いませんが、
              ユーザー自身や第三者がスクリーンショット・画面録画を行う可能性について、
              運営者は制御できません。プライバシーに関する情報の取り扱いには十分ご注意ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">第6条（利用制限・登録抹消）</h2>
            <p className="text-gray-700 leading-relaxed">
              運営者は、ユーザーが本規約に違反した場合、またはその恐れがあると判断した場合、
              事前の通知なく、当該ユーザーの利用を制限、または登録を抹消することができます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">第7条（サービスの変更・終了）</h2>
            <p className="text-gray-700 leading-relaxed">
              運営者は、運営上の都合により、本サービスの全部または一部を予告なく変更、中断、終了することができます。
              これにより生じた損害について、運営者は一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">第8条（知的財産権）</h2>
            <p className="text-gray-700 leading-relaxed">
              本サービスに関する知的財産権は、運営者または正当な権利者に帰属します。
              ユーザーは、これらを無断で使用、複製、改変することはできません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">第9条（準拠法・管轄裁判所）</h2>
            <p className="text-gray-700 leading-relaxed">
              本規約の解釈にあたっては、日本法を準拠法とします。
              本サービスに関して紛争が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">第10条（規約の変更）</h2>
            <p className="text-gray-700 leading-relaxed">
              運営者は、必要に応じて本規約を変更することができます。
              変更後の規約は、本サービス上に掲載された時点で効力を生じます。
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
