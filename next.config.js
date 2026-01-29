// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REDIS_URL: process.env.UPSTASH_REDIS_URL,
    REDIS_TOKEN: process.env.UPSTASH_REDIS_TOKEN,
  },
  // For Vercel deployment
  output: 'standalone',
}

module.exports = nextConfig
