import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // add lh3.googleusercontent.com to the list of domains
    images: {
        domains: ["lh3.googleusercontent.com"],
    },
};

export default nextConfig;
