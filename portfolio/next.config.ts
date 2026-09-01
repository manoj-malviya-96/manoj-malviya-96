import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	turbopack: {},
	reactCompiler: true,
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},

	images: {
		minimumCacheTTL: 5184000,
		formats: ["image/avif", "image/webp"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
		],
	},

	experimental: {
		optimizePackageImports: [
			"@fortawesome/react-fontawesome",
			"@fortawesome/free-solid-svg-icons",
			"@fortawesome/free-brands-svg-icons",
			"@fortawesome/fontawesome-svg-core",
			"fuse.js",
		],
	},
};

export default nextConfig;
