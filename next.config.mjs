/** @type {import('next').NextConfig} */
//const nextConfig = {};

// next.config.js
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["pdf-parse"],
    },
    images: {
        domains: ['oaidalleapiprodscus.blob.core.windows.net'],
    },
};
//module.exports = nextConfig;

export default nextConfig;
