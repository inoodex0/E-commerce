import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  reactCompiler: true,
  allowedDevOrigins: ['192.168.0.187', '192.168.0.238', 'localhost'],
};

export default nextConfig;
