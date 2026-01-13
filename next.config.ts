import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fire-evacuation-plan-service-v1.t3.storage.dev",
        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
