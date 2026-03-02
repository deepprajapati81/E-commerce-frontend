import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost", "api-e-commerce-ybhv.onrender.com"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["localhost", "api-e-commerce-ybhv.onrender.com"],
    },
  },
};

export default nextConfig;
