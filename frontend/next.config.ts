import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin requests in development mode
  experimental: {
    // Allow requests from any origin in development
    // This is necessary when accessing the dev server from external IPs
    allowedDevOrigins: [
      "202.61.192.99",
      // Add other IPs or domains as needed
      // Example: "example.com", "192.168.1.100"
    ],
  },

  // Configure to listen on all network interfaces
  // This allows external access to the dev server
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
};

export default nextConfig;
