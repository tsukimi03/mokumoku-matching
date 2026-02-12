// 職種別4択クイズデータ

export type Quiz = {
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export type JobQuizzes = {
  [key: string]: Quiz[]
}

export const jobQuizzes: JobQuizzes = {
  'エンジニア': [
    {
      question: '本番環境で絶対にやってはいけないことは？',
      options: ['ログを確認する', '直接DBを編集する', 'モニタリングツールを見る', 'エラーを報告する'],
      correctIndex: 1,
      explanation: '本番DBの直接編集は事故の元！必ずバックアップとテスト環境で検証してから'
    },
    {
      question: 'コードレビューで最も重要なことは？',
      options: ['細かい文法ミスを指摘', 'ロジックとセキュリティの確認', 'コメントの有無', 'コードの行数'],
      correctIndex: 1,
      explanation: 'バグやセキュリティホールを防ぐため、ロジックの確認が最優先'
    },
    {
      question: 'パスワードを保存する際の鉄則は？',
      options: ['平文で保存', 'MD5でハッシュ化', 'bcryptでハッシュ化', 'Base64エンコード'],
      correctIndex: 2,
      explanation: 'bcryptやArgon2などの強力なハッシュ関数を使う。MD5は脆弱！'
    },
    {
      question: 'エラーが出た時、最初にすべきことは？',
      options: ['すぐにStack Overflowで検索', 'エラーメッセージを読む', 'コードを全部書き直す', '諦める'],
      correctIndex: 1,
      explanation: 'エラーメッセージには原因と行番号が書いてある。まずそこを確認！'
    },
    {
      question: 'Gitで間違えたコミットを取り消すには？',
      options: ['git undo', 'git revert', 'git delete', 'git cancel'],
      correctIndex: 1,
      explanation: 'git revertで安全に取り消せる。git reset --hardは危険！'
    },
    {
      question: 'APIのレスポンスが遅い時、まず疑うべきは？',
      options: ['フロントエンドのコード', 'N+1クエリ', 'CSSの読み込み', 'HTMLの構造'],
      correctIndex: 1,
      explanation: 'N+1クエリ（ループ内でDBアクセス）はパフォーマンス低下の主要因'
    },
    {
      question: 'セキュリティで最も危険な脆弱性は？',
      options: ['CSSの読み込み順', 'SQLインジェクション', 'タブとスペースの混在', 'コメント不足'],
      correctIndex: 1,
      explanation: 'SQLインジェクションはDB全体が乗っ取られる可能性あり！必ず対策を'
    },
    {
      question: 'デプロイ前に必ずすべきことは？',
      options: ['コーヒーを飲む', 'テストを実行する', 'SNSに投稿', 'とりあえずデプロイ'],
      correctIndex: 1,
      explanation: 'テストなしのデプロイは事故の元。CI/CDで自動化すると安心'
    },
    {
      question: 'バグを見つけた時の正しい対応は？',
      options: ['こっそり修正', '再現手順を記録→修正→テスト', 'すぐに修正', '無視する'],
      correctIndex: 1,
      explanation: '再現手順を記録しないと、同じバグが再発する可能性大'
    },
    {
      question: 'コードの保守性を上げるために最も重要なことは？',
      options: ['コメントを大量に書く', '関数を小さく分割する', '変数名を短くする', 'インデントをなくす'],
      correctIndex: 1,
      explanation: '1つの関数は1つの役割。小さく分割すると読みやすく、テストもしやすい'
    }
  ],
  'デザイナー': [
    {
      question: 'クライアントプレゼンで最も重要なことは？',
      options: ['デザインの美しさ', 'なぜそのデザインか理由を説明', '最新トレンドの紹介', '色の名前を言う'],
      correctIndex: 1,
      explanation: 'デザインの「理由」を説明できないと、クライアントは納得しない'
    },
    {
      question: 'ユーザビリティで最優先すべきことは？',
      options: ['見た目の美しさ', '使いやすさ', 'アニメーション', '最新技術'],
      correctIndex: 1,
      explanation: 'どんなに美しくても使いにくいデザインはNG。ユーザー目線が大切'
    },
    {
      question: 'コントラスト比が低いと何が問題？',
      options: ['おしゃれに見えない', '文字が読めない', 'ファイルサイズが大きい', '印刷できない'],
      correctIndex: 1,
      explanation: 'WCAG基準で4.5:1以上推奨。視認性はアクセシビリティの基本'
    },
    {
      question: 'レスポンシブデザインで避けるべきことは？',
      options: ['モバイルファースト', 'PC版をそのまま縮小', 'タッチ操作の考慮', 'フレキシブルグリッド'],
      correctIndex: 1,
      explanation: 'PC版の縮小は使いにくい！モバイル専用UIを設計する'
    },
    {
      question: 'フォント選びで最も重要なことは？',
      options: ['珍しさ', '読みやすさ', '値段の高さ', 'フォント数の多さ'],
      correctIndex: 1,
      explanation: 'どんなにおしゃれでも、読めないフォントは使えない'
    },
    {
      question: 'デザインデータを納品する際に必須なことは？',
      options: ['PSDファイルのみ', '画像書き出し＋元データ', '印刷したもの', 'スクリーンショット'],
      correctIndex: 1,
      explanation: '後で修正できるよう、元データも必ず納品する'
    },
    {
      question: '色覚多様性（色弱）への配慮で重要なことは？',
      options: ['派手な色を使う', '色だけで情報を伝えない', '赤と緑を多用', 'モノクロにする'],
      correctIndex: 1,
      explanation: '色+形、色+テキストなど、色以外の要素も組み合わせる'
    },
    {
      question: 'ボタンデザインで避けるべきことは？',
      options: ['影をつける', 'ボタンらしく見えない', '角丸にする', '色をつける'],
      correctIndex: 1,
      explanation: 'ボタンは「押せる」と分かるデザインに。アフォーダンスが重要'
    },
    {
      question: '余白（ホワイトスペース）の役割は？',
      options: ['無駄なスペース', '情報を整理し読みやすくする', 'ファイルサイズを増やす', '印刷コストを上げる'],
      correctIndex: 1,
      explanation: '余白は「何もない」のではなく、視線誘導と情報整理の要素'
    },
    {
      question: 'Webフォント使用時に注意すべきことは？',
      options: ['無制限に使う', '読み込み速度への影響', 'できるだけ多く', '価格の安さ'],
      correctIndex: 1,
      explanation: 'フォント読み込みで表示速度が遅くなる。必要最小限に絞る'
    }
  ],
  'ライター': [
    {
      question: '「てにをは」は日本語の何に分類される？',
      options: ['名詞', '動詞', '助詞', '形容詞'],
      correctIndex: 2,
      explanation: '助詞です'
    },
    {
      question: 'SEOライティングで重要な要素は？',
      options: ['文字数のみ', 'キーワード配置', '画像の数', 'フォントサイズ'],
      correctIndex: 1,
      explanation: 'キーワードを適切に配置することが重要です'
    },
    {
      question: '記事の冒頭で読者の興味を引く手法は？',
      options: ['リード文', 'エンディング', 'ミドル文', 'サマリー'],
      correctIndex: 0,
      explanation: 'リード文（導入文）で読者を引き込みます'
    },
    {
      question: 'Webライティングで1文の推奨文字数は？',
      options: ['20-40文字', '40-60文字', '60-80文字', '80-100文字'],
      correctIndex: 1,
      explanation: '40-60文字が読みやすいとされています'
    },
    {
      question: 'CTAは何の略？',
      options: ['Content Text Area', 'Call To Action', 'Creative Text Article', 'Copy Text Analysis'],
      correctIndex: 1,
      explanation: 'Call To Action（行動喚起）の略です'
    },
    {
      question: 'PASONAの法則の「P」は何を表す？',
      options: ['Problem（問題）', 'Point（要点）', 'Purpose（目的）', 'Plan（計画）'],
      correctIndex: 0,
      explanation: 'Problem（問題提起）から始まります'
    },
    {
      question: '「です・ます調」は何体？',
      options: ['常体', '敬体', '謙譲体', '尊敬体'],
      correctIndex: 1,
      explanation: '敬体（丁寧体）です'
    },
    {
      question: '引用を示すHTMLタグは？',
      options: ['<cite>', '<blockquote>', '<quote>', '<ref>'],
      correctIndex: 1,
      explanation: '<blockquote>タグで引用を表します'
    },
    {
      question: 'メタディスクリプションの推奨文字数は？',
      options: ['50-80文字', '80-120文字', '120-160文字', '160-200文字'],
      correctIndex: 2,
      explanation: '120-160文字が推奨されます'
    },
    {
      question: 'コピーライティングで最も重要な要素は？',
      options: ['文字数', '見出し', 'フォント', '画像'],
      correctIndex: 1,
      explanation: '見出し（ヘッドライン）が最も重要です'
    }
  ],
  'マーケター': [
    {
      question: 'CVRは何の略？',
      options: ['Cost Value Rate', 'Conversion Rate', 'Customer Value Ratio', 'Click Value Rate'],
      correctIndex: 1,
      explanation: 'Conversion Rate（コンバージョン率）の略です'
    },
    {
      question: 'AIDMAの「I」は何を表す？',
      options: ['Interest（興味）', 'Information（情報）', 'Investment（投資）', 'Innovation（革新）'],
      correctIndex: 0,
      explanation: 'Interest（興味・関心）を表します'
    },
    {
      question: 'Google広告のクリック単価を何という？',
      options: ['CPM', 'CPC', 'CPA', 'CTR'],
      correctIndex: 1,
      explanation: 'CPC（Cost Per Click）です'
    },
    {
      question: 'LTVは何の略？',
      options: ['Long Term Value', 'Lifetime Value', 'Limited Time Value', 'Latest Total Value'],
      correctIndex: 1,
      explanation: 'Lifetime Value（顧客生涯価値）の略です'
    },
    {
      question: 'SNSマーケティングで「エンゲージメント」とは？',
      options: ['フォロワー数', 'ユーザーとの関係性', '投稿回数', '広告費用'],
      correctIndex: 1,
      explanation: 'ユーザーとの関係性・つながりを表します'
    },
    {
      question: 'A/Bテストの目的は？',
      options: ['デザインの評価', '最適な施策の発見', '予算の削減', 'チームの評価'],
      correctIndex: 1,
      explanation: '2つのパターンを比較して最適な施策を見つけます'
    },
    {
      question: 'ペルソナとは何？',
      options: ['競合他社', '理想の顧客像', '商品価格', 'キャンペーン名'],
      correctIndex: 1,
      explanation: 'ターゲットとなる理想的な顧客像です'
    },
    {
      question: 'SEOの「E-A-T」の「E」は何を表す？',
      options: ['Engagement', 'Expertise（専門性）', 'Efficiency', 'Experience'],
      correctIndex: 1,
      explanation: 'Expertise（専門性）を表します'
    },
    {
      question: 'リターゲティング広告とは？',
      options: ['新規顧客向け広告', 'サイト訪問者への再アプローチ', 'SNS限定広告', '動画広告のみ'],
      correctIndex: 1,
      explanation: 'サイト訪問者に再度広告を表示します'
    },
    {
      question: 'KPIは何の略？',
      options: ['Key Performance Index', 'Key Performance Indicator', 'Key Product Information', 'Key Point Index'],
      correctIndex: 1,
      explanation: 'Key Performance Indicator（重要業績評価指標）の略です'
    }
  ],
  '動画編集': [
    {
      question: '一般的な動画のフレームレートは？',
      options: ['24fps', '30fps', '60fps', '120fps'],
      correctIndex: 1,
      explanation: '30fps（フレーム毎秒）が一般的です'
    },
    {
      question: 'Adobe Premiere Proで使われるショートカット（Mac）で「再生/停止」は？',
      options: ['Space', 'Enter', 'Tab', 'Esc'],
      correctIndex: 0,
      explanation: 'Spaceキーで再生/停止できます'
    },
    {
      question: '動画のアスペクト比で、YouTubeで推奨されるのは？',
      options: ['4:3', '16:9', '1:1', '9:16'],
      correctIndex: 1,
      explanation: '16:9が一般的な横長動画の比率です'
    },
    {
      question: 'カラーグレーディングとカラーコレクションの違いは？',
      options: ['同じもの', 'グレーディングは色の補正、コレクションは演出', 'コレクションは色の補正、グレーディングは演出', '全く異なる技術'],
      correctIndex: 2,
      explanation: 'カラーコレクション=補正、カラーグレーディング=演出的な色付け'
    },
    {
      question: 'トランジション効果で最も一般的なのは？',
      options: ['ワイプ', 'ディゾルブ', 'カット', 'フェード'],
      correctIndex: 2,
      explanation: 'カット（単純な切り替え）が最も基本的です'
    },
    {
      question: 'ビットレートが高いと？',
      options: ['画質が良くなる', '画質が悪くなる', 'ファイルサイズが小さくなる', '編集速度が上がる'],
      correctIndex: 0,
      explanation: 'ビットレートが高いほど画質が良くなります'
    },
    {
      question: 'キーフレームとは？',
      options: ['重要なシーン', 'アニメーションの始点・終点', 'カット点', 'タイトル画面'],
      correctIndex: 1,
      explanation: 'キーフレームでアニメーションの変化を指定します'
    },
    {
      question: 'BGMの音量調整で一般的な目安は？',
      options: ['-6dB〜-12dB', '0dB', '+6dB', '-30dB'],
      correctIndex: 0,
      explanation: 'ナレーションやSEとのバランスで-6dB〜-12dB程度が一般的です'
    },
    {
      question: 'エンコード（書き出し）時に最も重要な設定は？',
      options: ['解像度とコーデック', 'タイトル名', 'プロジェクト名', 'フォルダ名'],
      correctIndex: 0,
      explanation: '解像度（1080p等）とコーデック（H.264等）が重要です'
    },
    {
      question: 'YouTube用動画のサムネイル推奨サイズは？',
      options: ['1920x1080', '1280x720', '640x360', '1280x1024'],
      correctIndex: 1,
      explanation: '1280x720（16:9）が推奨されます'
    }
  ],
  'コンサル': [
    {
      question: 'ビジネスフレームワークで「3C分析」の3Cとは？',
      options: ['Customer, Company, Competitor', 'Cost, Cash, Credit', 'Create, Change, Control', 'Culture, Climate, Communication'],
      correctIndex: 0,
      explanation: '顧客（Customer）、自社（Company）、競合（Competitor）の分析です'
    },
    {
      question: 'SWOT分析の「T」は何を表す？',
      options: ['Target（目標）', 'Threat（脅威）', 'Trend（傾向）', 'Technology（技術）'],
      correctIndex: 1,
      explanation: 'Threat（脅威）を表します'
    },
    {
      question: 'ロジックツリーを使う目的は？',
      options: ['問題を要素分解する', '売上を計算する', 'スケジュールを立てる', '人員配置を決める'],
      correctIndex: 0,
      explanation: '問題を構造的に分解・分析するツールです'
    },
    {
      question: 'MECE（ミーシー）とは？',
      options: ['漏れなく・ダブりなく', '効率的に・迅速に', '正確に・丁寧に', '戦略的に・計画的に'],
      correctIndex: 0,
      explanation: 'Mutually Exclusive and Collectively Exhaustive（漏れなくダブりなく）の略です'
    },
    {
      question: 'KGI（Key Goal Indicator）とは？',
      options: ['最終的な目標指標', '重要業績評価指標', '重要成功要因', '重要リスク指標'],
      correctIndex: 0,
      explanation: 'Key Goal Indicator（重要目標達成指標）です'
    },
    {
      question: 'PDCAサイクルの「C」は？',
      options: ['Create（創造）', 'Check（評価）', 'Change（変更）', 'Control（管理）'],
      correctIndex: 1,
      explanation: 'Check（評価・検証）を表します'
    },
    {
      question: 'ボストン・コンサルティング・グループのマトリクスで「花形」とは？',
      options: ['高成長・高シェア', '低成長・高シェア', '高成長・低シェア', '低成長・低シェア'],
      correctIndex: 0,
      explanation: '市場成長率が高く、市場シェアも高い事業です'
    },
    {
      question: 'ファシリテーションで最も重要なスキルは？',
      options: ['話す力', '聞く力', '書く力', '読む力'],
      correctIndex: 1,
      explanation: '参加者の意見を引き出す「聞く力」が最も重要です'
    },
    {
      question: 'ROI（Return on Investment）とは？',
      options: ['投資利益率', '売上高利益率', '資本回転率', '総資産利益率'],
      correctIndex: 0,
      explanation: 'Return on Investment（投資利益率）です'
    },
    {
      question: 'ビジネスモデルキャンバスの9要素に含まれないのは？',
      options: ['顧客セグメント', '収益の流れ', '競合分析', '価値提案'],
      correctIndex: 2,
      explanation: '競合分析はビジネスモデルキャンバスに含まれません'
    }
  ],
  'その他': [
    {
      question: 'ポモドーロ・テクニックの1セッションは何分？',
      options: ['15分', '20分', '25分', '30分'],
      correctIndex: 2,
      explanation: '25分が1セッションです'
    },
    {
      question: 'GTD（Getting Things Done）で最初にすることは？',
      options: ['優先順位付け', '実行', '収集', 'レビュー'],
      correctIndex: 2,
      explanation: 'まず全てのタスクを収集します'
    },
    {
      question: 'フリーランスの確定申告は何色？',
      options: ['白色申告', '青色申告', '赤色申告', '緑色申告'],
      correctIndex: 1,
      explanation: '青色申告で最大65万円の控除が受けられます'
    },
    {
      question: '集中力が最も高まる時間帯は？',
      options: ['早朝', '午前中', '昼食後', '夜'],
      correctIndex: 1,
      explanation: '午前中（9-11時）が最も集中できます'
    },
    {
      question: 'タイムボクシングとは？',
      options: ['時間を区切ってタスクを実行', 'タスクを箱に入れる', '時間を記録する', '休憩時間を決める'],
      correctIndex: 0,
      explanation: '時間を区切ってタスクを実行する手法です'
    },
    {
      question: 'フリーランスの請求書に必須の項目は？',
      options: ['住所のみ', '氏名と金額のみ', '発行日・氏名・金額・内容', '金額のみ'],
      correctIndex: 2,
      explanation: '発行日、氏名、金額、内容は必須です'
    },
    {
      question: '作業効率を上げるために避けるべきは？',
      options: ['マルチタスク', '休憩', '計画', 'To-Doリスト'],
      correctIndex: 0,
      explanation: 'マルチタスクは効率を下げます'
    },
    {
      question: 'リモートワークで推奨される姿勢は？',
      options: ['前かがみ', '背筋を伸ばす', '横向き', '寝転ぶ'],
      correctIndex: 1,
      explanation: '背筋を伸ばすことが重要です'
    },
    {
      question: 'デスクワークで1時間に1回すべきことは？',
      options: ['コーヒーを飲む', '立ち上がって動く', 'SNSをチェック', '音楽を聴く'],
      correctIndex: 1,
      explanation: '立ち上がって動くことで健康を保てます'
    },
    {
      question: 'フリーランスの源泉徴収税率は？',
      options: ['5.105%', '10.21%', '15%', '20%'],
      correctIndex: 1,
      explanation: '10.21%が標準的な源泉徴収税率です'
    }
  ]
}

// 職種名のマッピング（users.job_categoriesの値に対応）
export const jobCategoryMapping: { [key: string]: string } = {
  'engineer': 'エンジニア',
  'エンジニア': 'エンジニア',
  'designer': 'デザイナー',
  'デザイナー': 'デザイナー',
  'writer': 'ライター',
  'ライター': 'ライター',
  'marketer': 'マーケター',
  'マーケター': 'マーケター',
  'video_editor': '動画編集',
  '動画編集': '動画編集',
  'consultant': 'コンサル',
  'コンサル': 'コンサル',
  'other': 'その他',
  'その他': 'その他'
}

// ランダムにクイズを取得する関数
export function getRandomQuizzes(jobCategory: string, count: number = 10): Quiz[] {
  const category = jobCategoryMapping[jobCategory] || 'その他'
  const quizzes = jobQuizzes[category] || jobQuizzes['その他']

  // シャッフルして指定数だけ返す
  const shuffled = [...quizzes].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
