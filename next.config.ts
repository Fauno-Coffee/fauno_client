import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.yandexcloud.net',
        pathname: '/clycon-static-map-images/**',
      },
    ],
  },
};

export default nextConfig;
