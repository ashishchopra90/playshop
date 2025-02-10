/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  basePath: '/playshop', // Replace 'playshop' with your repository name
  assetPrefix: '/playshop/', // Replace 'playshop' with your repository name
}

module.exports = nextConfig
