import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Daily.co の重複エラー回避
};

export default nextConfig;
