/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|ico)$/i,
      type: 'asset/resource',
    })

    // Disable cache during build
    config.cache = false

    return config
  },
  // Increase build memory limit
  experimental: {
    memoryBasedWorkersCount: true,
  },
  // Increase serverComponentsExternalPackages
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
}

export default nextConfig
