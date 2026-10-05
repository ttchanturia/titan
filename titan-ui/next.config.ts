import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    // Dev only: make uploaded images at /uploads/* resolve to the local API.
    // In production Nginx serves /uploads/ straight from disk before Next sees it.
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:5000/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
