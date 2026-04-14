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
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/:type(popular|trend|upcoming|movie|favorite)',
        destination: '/?type=:type',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
