# ヒーローセクション動画生成プロンプト

## 動画コンセプト
フリーランス同士がオンラインで繋がり、全国でもくもく作業をしている様子を表現する。
中央の「あなた」を起点に、全国のパートナーと繋がるネットワークが広がっていく様子をアニメーション化。

---

## 🎬 Runway Gen-3 / LumaAI Dream Machine 用プロンプト

### メインプロンプト（英語）
```
A 3D animated networking visualization in pastel gradient background (blue to purple to pink).
A glowing white circular avatar labeled "You" appears at the center, with a smiling emoji inside.
Four smaller circular avatars with different emojis (developer, designer, artist, researcher)
float in from the corners, each with location labels (Tokyo, Osaka, Fukuoka, Sapporo).
Dashed connection lines draw themselves from center to each partner in sequence.
The avatars gently float up and down in a breathing motion.
Below, three white cards with statistics pop up one by one: "3分", "即", "25分".
Soft glowing effects and particles float around.
Camera slowly zooms in towards the center.
Modern, professional, minimalist style. Smooth 60fps motion.
```

### 追加指示（スタイル指定）
```
Style: Clean modern UI animation, soft pastel gradients,
glass morphism effects, gentle floating motion,
professional tech startup aesthetic,
no people or realistic faces, only emoji icons in circles
```

---

## 🎨 Pika Labs 用プロンプト（Discord経由）

```
/create prompt:
Animated network diagram with a central white circle labeled "You" and 4 surrounding circles with emojis (developer, businesswoman, artist, scientist) floating gently. Dashed lines connect them. Pastel gradient background blue to purple. Three stats cards "3分", "即", "25分" appear at bottom. Smooth floating motion, modern minimal UI style, professional animation

parameters: --motion 3 --fps 24 --ar 16:9
```

---

## 🇨🇳 Kling AI 用プロンプト

### 日本語プロンプト
```
パステルグラデーション背景（青→紫→ピンク）で、中央に白い円形のアバター「あなた」が登場。
周囲に4つの小さな円形アバターが浮遊しながら登場（開発者・ビジネスウーマン・アーティスト・研究者の絵文字付き）。
各アバターに地域ラベル（東京・大阪・福岡・札幌）。
中央から各パートナーへ点線が順番に描かれる。
アバターは呼吸するようにゆっくり上下に浮遊。
下部に統計カード3枚が順番にポップアップ（「3分」「即」「25分」）。
柔らかな発光エフェクトと粒子が漂う。
カメラはゆっくり中央にズーム。
モダンでプロフェッショナル、ミニマルなスタイル。
```

---

## 🎥 シーン構成（5秒版）

| タイミング | 動き | 説明 |
|----------|------|------|
| 0.0s | フェードイン | パステルグラデーション背景が表示 |
| 0.5s | 中央登場 | 「あなた」の円形アバターが中央にフェードイン + パルス |
| 1.0s | パートナー1 | 左上から開発者アバター浮遊登場 |
| 1.5s | パートナー2 | 右上からビジネスウーマン浮遊登場 |
| 2.0s | パートナー3 | 左下からアーティスト浮遊登場 |
| 2.5s | パートナー4 | 右下から研究者浮遊登場 |
| 3.0s | 接続線 | 点線が順番に描画（中央→各パートナー） |
| 3.5s | 統計カード | 3枚のカードが下から順番にポップアップ |
| 4.0s | 全体浮遊 | 全アバターが呼吸するように上下に浮遊 |
| 4.5s | ズーム | カメラがゆっくり中央にズーム |

---

## 🎨 カラーパレット

```css
背景グラデーション:
- 開始: #DBEAFE (light blue)
- 中間: #E9D5FF (light purple)
- 終了: #FBCFE8 (light pink)

アバター:
- 境界線: #3B82F6 (blue), #8B5CF6 (purple), #EAB308 (yellow), #EC4899 (pink)
- 背景: #FFFFFF (white)

接続線:
- 色: #3B82F6, #8B5CF6, #EAB308, #EC4899
- スタイル: dashed, 太さ2px, 透明度50%

統計カード:
- 背景: #FFFFFF with opacity 90%
- テキスト: #1F2937 (dark gray)
- アクセント: #3B82F6 (blue), #10B981 (green), #8B5CF6 (purple)
```

---

## 🚀 制作フロー推奨

### オプション1: LumaAI Dream Machine（おすすめ）
1. https://lumalabs.ai/dream-machine にアクセス
2. 上記の英語プロンプトをコピペ
3. "Generate" をクリック
4. 5秒動画を生成
5. ダウンロードしてLPに配置

### オプション2: Runway Gen-3（最高品質）
1. https://runwayml.com にアクセス
2. "Gen-3 Alpha" を選択
3. 上記の英語プロンプトをコピペ
4. "Generate" をクリック
5. 10秒動画を生成（トリミング可能）
6. ダウンロードしてLPに配置

### オプション3: Kling AI（長尺可能）
1. https://klingai.com にアクセス
2. 日本語または英語プロンプトを入力
3. 動画生成（5秒〜10秒）
4. ダウンロードしてLPに配置

---

## 📐 技術仕様

- **解像度**: 1920x1080 (Full HD) または 1280x720 (HD)
- **フレームレート**: 30fps または 60fps
- **動画長さ**: 5秒〜10秒
- **ファイル形式**: MP4 (H.264)
- **ファイルサイズ目安**: 2MB以下（Web最適化）

---

## 💡 実装方法（Next.js）

```tsx
// app/page.tsx のヒーローセクション右側を動画に差し替え

{/* Right: Video Visualization */}
<div className="relative">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="rounded-3xl shadow-2xl w-full h-auto"
  >
    <source src="/hero-animation.mp4" type="video/mp4" />
  </video>
</div>
```

---

## 🎯 期待される効果

1. **訴求力UP**: 静止画より動きがあることで目を引く
2. **コンバージョン向上**: 動画は文字より理解しやすい（+80%）
3. **滞在時間増加**: 動画視聴で平均滞在時間+2.6倍
4. **SNSシェア**: 動画コンテンツはシェア率+1200%
5. **広告CTR向上**: Meta広告での動画CTRは静止画の2.5倍

---

## 📊 A/Bテスト推奨

- **パターンA**: 現在の静止画（SVG）
- **パターンB**: 動画（5秒ループ）
- **測定指標**: サインアップ率、滞在時間、直帰率
