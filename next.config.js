/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['*'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|ico)$/i,
      type: 'asset/resource',
    })
    return config
  },
  output: 'standalone',
}

module.exports = nextConfig
