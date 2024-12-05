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
    unoptimized: true  // If using static images
  }
};

module.exports = nextConfig;