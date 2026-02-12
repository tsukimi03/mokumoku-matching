import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Daily.co の重複エラー回避

  // セキュリティヘッダー追加
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Clickjacking対策
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // MIME type sniffing対策
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block', // XSS対策（古いブラウザ用）
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // リファラー制限
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', // 不要な機能を無効化
          },
        ],
      },
    ];
  },
};

export default nextConfig;
