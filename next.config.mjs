/** @type {import('next').NextConfig} */
const nextConfig={
        reactStrictMode: true,
        experimental: {
                serverActions: true,
        }, images: {
                domains: [ 'source.unsplash.com' ],
        },
};

export default nextConfig;