/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore build errors in TypeScript
    ignoreBuildErrors: true
  },
  eslint: {
    // Ignore ESLint build errors
    ignoreDuringBuilds: true
  },
   images: {
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  output: 'standalone'
};

module.exports = nextConfig;