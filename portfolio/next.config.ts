import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental Turbopack for faster development builds
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Optimize compilation and bundling
  swcMinify: true,

  // Reduce memory usage and improve performance
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Optimize for development
      config.devtool = 'eval-cheap-module-source-map';

      // Reduce bundle size in dev
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }

    return config;
  },

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
