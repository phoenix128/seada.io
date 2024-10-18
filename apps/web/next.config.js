module.exports = {
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname,
    },
    // logging: {
    //     fetches: {
    //         fullUrl: true,
    //     },
    // },
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: '/(.+)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600',
                    },
                ],
            },
        ];
    },
    transpilePackages: [],
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.bigcommerce.com',
            },
            {
                protocol: 'https',
                hostname: '**.picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                dns: false,
                net: false,
                tls: false,
                fs: false,
            };
        }

        return config;
    },
};
