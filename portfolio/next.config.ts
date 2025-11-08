import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    // Reduce memory usage and improve performance
    webpack: (config, {dev, isServer}) => {
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
        // Proper remotePatterns configuration for Unsplash
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
