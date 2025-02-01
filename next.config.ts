import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // add lh3.googleusercontent.com to the list of domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/*",
      },
    ],
  },
};

export default nextConfig;
