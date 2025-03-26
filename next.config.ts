import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // eslint: {
  //   dirs: ["."],
  // },
  poweredByHeader: false,
  trailingSlash: true,
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    nodeMiddleware: true,
  },
};

export default nextConfig;
