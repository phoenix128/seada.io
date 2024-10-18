module.exports = {
    reactStrictMode: true,
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
    experimental: {
        outputFileTracingIncludes: {
            '/': ['./seada-files/**/*'],
        },
    },
    // experimental: {
    //   serverComponentsExternalPackages: ["@graphql-tools/url-loader"],
    // }
};
