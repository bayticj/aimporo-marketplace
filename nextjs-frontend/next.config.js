/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  images: {
    domains: ['localhost', 'aimporo-marketplace-six.vercel.app'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  webpack: (config, { isServer }) => {
    // Handle CSS and other assets
    return config;
  },
};

module.exports = nextConfig;
