#!/bin/bash

# データベースセットアップスクリプト
# 使い方: ./scripts/setup-db.sh

echo "🚀 もくもく作業マッチング - データベースセットアップ"
echo ""

# .env.localの存在確認
if [ ! -f ".env.local" ]; then
  echo "❌ .env.local が見つかりません。"
  echo "   .env.local を作成して、Supabaseの環境変数を設定してください。"
  exit 1
fi

# 環境変数の読み込み
source .env.local

# Supabase URLの確認
if [[ "$NEXT_PUBLIC_SUPABASE_URL" == *"placeholder"* ]] || [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  echo "❌ NEXT_PUBLIC_SUPABASE_URL が設定されていません。"
  echo "   .env.local を編集して、実際のSupabase URLを設定してください。"
  exit 1
fi

echo "✅ 環境変数の確認完了"
echo ""
echo "📋 以下のマイグレーションファイルをSupabase SQL Editorで実行してください:"
echo ""

# マイグレーションファイルの一覧表示
for file in supabase/migrations/*.sql; do
  if [ -f "$file" ]; then
    echo "  $(basename "$file")"
  fi
done

echo ""
echo "🔗 Supabase SQL Editor:"
echo "   ${NEXT_PUBLIC_SUPABASE_URL}/project/default/sql"
echo ""
echo "📝 手順:"
echo "   1. 上記URLにアクセス"
echo "   2. 各SQLファイルの内容をコピー&ペースト"
echo "   3. 順番に実行"
echo ""
echo "✨ 完了したら 'npm run dev' でアプリを起動できます！"
