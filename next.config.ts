import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['utfs.io'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    nodeMiddleware: true,
  },
};

export default nextConfig;
