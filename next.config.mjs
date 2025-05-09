/** @type {import('next').NextConfig} */
//const nextConfig = {};

// next.config.js
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["pdf-parse"],
    },
};

//module.exports = nextConfig;

export default nextConfig;
