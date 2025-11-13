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
        minimumCacheTTL: 60,
        // Allows any hostname
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
            },
        ],
    },
};

export default nextConfig;
