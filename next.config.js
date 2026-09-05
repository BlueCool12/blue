const path = require('path');
const createNextIntlPlugin = require('next-intl/plugin');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: require('next-pwa/cache'),
  disable: process.env.NODE_ENV === 'development',
});

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  compiler: {
    styledComponents: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pmini12.synology.me',
        pathname: '/bluecool-media/**',
      },
      // 마이그레이션 이전에 발행된 게시글의 이미지
      {
        protocol: 'https',
        hostname: 'api.pyomin.com',
        pathname: '/files/**',
      }
    ],
    formats: ['image/avif', 'image/webp'],
  },

  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },

  async headers() {
    return [
      { source: '/sw.js', headers: [{ key: 'Cache-Control', value: 'no-cache' }] },
      { source: '/workbox-:hash.js', headers: [{ key: 'Cache-Control', value: 'no-cache' }] },
      { source: '/manifest.webmanifest', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/icons/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/audio/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  }
};

module.exports = withNextIntl(withPWA(nextConfig));