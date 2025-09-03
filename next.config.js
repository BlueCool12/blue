const path = require('path');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: require('next-pwa/cache'),
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },

  async headers() {
    return [
      { source: '/sw.js', headers: [{ key: 'Cache-Control', value: 'no-cache' }] },
      { source: '/workbox-:hash.js', headers: [{ key: 'Cache-Control', value: 'no-cache' }] },
    ];
  },
});

/** @type {import('next').NextConfig} */
// const nextConfig = {
//   compiler: {
//     styledComponents: true,
//   },
//   webpack: (config) => {
//     config.resolve.alias['@'] = path.resolve(__dirname, 'src');
//     return config;
//   },
// };

// module.exports = nextConfig;