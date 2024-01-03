/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        AUTH_SERVER_URL: process.env.NEXT_PUBLIC_AUTH_SERVER_URL,
    },
    images: {
        unoptimized: true,
    },
    // distDir: '../backend/build',
    output: 'export',
};

module.exports = nextConfig
