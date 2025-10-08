import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    // remotePatterns:['res.cloudinary.com'],
    remotePatterns:[ {
        protocol: "https",
        hostname: "res.cloudinary.com",
      }]
  }
};

export default nextConfig;
