import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Optimize webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: "framework",
              chunks: "all",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module: { context: string }) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                )?.[1];
                return `npm.${packageName?.replace("@", "")}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    // Development optimizations
    if (dev && !isServer) {
      config.devtool = "eval-cheap-module-source-map";
    }

    return config;
  },

  // Optimize images
  images: {
    minimumCacheTTL: 31536000, // Changed: 1-year cache for images
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Added: responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Added: for smaller images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "@fortawesome/react-fontawesome",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-brands-svg-icons",
      "@fortawesome/fontawesome-svg-core",
      "motion",
      "fuse.js",
    ],
  },

  // ========== NEW: Output standalone for better production builds ==========
  output: "standalone",
};

export default nextConfig;
