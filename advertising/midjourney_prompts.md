# Midjourneyプロンプト集（もくもくマッチング広告用）

## プロンプト使用方法
1. Midjourney Discordで `/imagine` コマンドを使用
2. 以下のプロンプトをコピー&ペースト
3. 生成された画像から気に入ったものを選択
4. `--ar 1:1` は正方形（Instagram投稿用）、`--ar 16:9` は横長（Facebook/YouTube用）に変更可能

---

## パターン1: フリーランスの孤独を表現（問題提起）

### プロンプト
```
A lone freelancer working at home, looking tired and unmotivated, surrounded by distractions like a TV and unmade bed, dim lighting, feeling isolated and unproductive, lifestyle photography, natural light, candid shot, photorealistic, Canon EOS R5, 50mm f/1.4, shallow depth of field --ar 16:9 --style raw --v 6
```

### 日本語訳
「自宅で一人で作業するフリーランス、疲れてモチベーションが低い様子、テレビや整っていないベッドなどの誘惑に囲まれ、薄暗い照明、孤立感と非生産的な雰囲気、ライフスタイル写真、自然光、率直なショット、フォトリアリスティック」

### 用途
- 広告の冒頭（問題提起）
- 「一人じゃ集中できない」というメッセージ

---

## パターン2: オンラインで繋がる様子（解決策）

### プロンプト
```
Two young professionals working remotely, side-by-side split screen composition, both focused on their laptops, warm ambient lighting, cozy home office setup, subtle connection visualized with soft glowing lines between them, modern minimalist aesthetic, Canon EOS R5, 35mm f/2, cinematic color grading, professional photography --ar 16:9 --style raw --v 6
```

### 日本語訳
「2人の若いプロフェッショナルがリモートで作業、左右分割の構図、両方ともノートパソコンに集中、温かい環境照明、快適なホームオフィス、柔らかく光る線で繋がりを可視化、モダンでミニマルな美学、シネマティックなカラーグレーディング」

### 用途
- 「オンラインで繋がる」という解決策を表現
- サービスのコア機能を視覚化

---

## パターン3: 集中して作業する様子（ベネフィット）

### プロンプト
```
A focused freelance designer working intensely on a laptop, flow state, productive atmosphere, modern minimalist workspace with plants, natural window light, coffee cup nearby, calm and concentrated expression, lifestyle photography, shallow depth of field, Canon EOS R5, 85mm f/1.8, warm color palette, professional quality --ar 1:1 --style raw --v 6
```

### 日本語訳
「集中したフリーランスデザイナーがノートパソコンで没頭して作業、フロー状態、生産的な雰囲気、観葉植物のあるモダンでミニマルなワークスペース、窓からの自然光、近くにコーヒーカップ、穏やかで集中した表情、ライフスタイル写真、浅い被写界深度、温かい色調」

### 用途
- ベネフィット訴求
- 「集中力が3倍」というメッセージ

---

## パターン4: カフェのような雰囲気（コンセプト）

### プロンプト
```
Cozy cafe atmosphere, multiple freelancers working on laptops, soft ambient lighting, warm wooden tables, coffee cups, plants, peaceful and productive vibe, people are focused but comfortable, lifestyle photography, natural window light, Canon EOS R5, 24mm f/2.8, warm color grading, professional quality, Japanese aesthetic --ar 16:9 --style raw --v 6
```

### 日本語訳
「居心地の良いカフェの雰囲気、複数のフリーランサーがノートパソコンで作業、柔らかい環境照明、温かい木製のテーブル、コーヒーカップ、植物、穏やかで生産的な雰囲気、集中しているが快適な人々、ライフスタイル写真、窓からの自然光、日本的な美学」

### 用途
- 「カフェでの作業感をオンラインで」というコンセプト表現
- ブランドイメージ訴求

---

## パターン5: 多様なフリーランサー（ターゲット訴求）

### プロンプト
```
Diverse group of Japanese freelancers, split screen showing 4 people, engineer with code on screen, designer with graphics, writer with document, marketer with analytics, each in their own workspace, focused and productive, modern aesthetic, natural lighting, professional photography, Canon EOS R5, 50mm f/1.8, balanced composition --ar 1:1 --style raw --v 6
```

### 日本語訳
「多様な日本のフリーランサーグループ、4人を分割画面で表示、コードが表示されたエンジニア、グラフィックを扱うデザイナー、ドキュメントを書くライター、分析を見るマーケター、それぞれ自分のワークスペースで、集中して生産的、モダンな美学、自然光、プロフェッショナルな写真」

### 用途
- ターゲットの多様性を表現
- 「同じ職種でマッチング」という機能訴求

---

## カスタマイズのヒント

### アスペクト比の変更
- `--ar 1:1` → Instagram投稿（正方形）
- `--ar 4:5` → Instagramストーリーズ（縦長）
- `--ar 16:9` → Facebook/YouTube（横長）
- `--ar 9:16` → TikTok/リール（縦長フルスクリーン）

### スタイル調整
- `--style raw` → よりリアルな写真風
- `--style cute` → ソフトで親しみやすい雰囲気
- `--stylize 250` → アーティスティックな表現を強化

### 色調の変更
- 暖かい雰囲気: `warm color palette, golden hour lighting`
- クールな雰囲気: `cool blue tones, modern aesthetic`
- 明るい雰囲気: `bright and airy, natural light`

---

## Meta広告推奨サイズ

| 配置 | サイズ | アスペクト比 |
|------|--------|--------------|
| Instagram投稿 | 1080x1080px | 1:1 |
| Instagramストーリーズ | 1080x1920px | 9:16 |
| Facebook投稿 | 1200x630px | 1.91:1 |
| Facebookストーリーズ | 1080x1920px | 9:16 |
| リール/TikTok | 1080x1920px | 9:16 |

---

## 生成のコツ

1. **複数回生成する**: 1つのプロンプトで4枚生成されるので、気に入ったものを選ぶ
2. **Upscaleする**: 気に入った画像を `U1`〜`U4` でアップスケール
3. **Varyする**: `V1`〜`V4` でバリエーションを生成
4. **編集する**: 生成後、Canvaで文字入れやトリミング

---

## 注意事項

- Midjourneyは商用利用可能（有料プラン必須）
- 人物の顔が特定できる場合は肖像権に注意
- 日本人の顔を生成したい場合は `Japanese, Asian features` を追加
- より自然な写真にしたい場合は `photorealistic, professional photography` を強調
