import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["src"],
  },
  poweredByHeader: false,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
  experimental: {
    nodeMiddleware: true,
  },
};

export default nextConfig;
