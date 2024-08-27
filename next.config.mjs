/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's4.anilist.co',
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  output: 'standalone',
};

export default nextConfig;
