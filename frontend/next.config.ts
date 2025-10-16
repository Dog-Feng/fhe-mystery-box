import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production-ready configuration
  
  // Output file tracing root to handle monorepo structure
  outputFileTracingRoot: undefined,

  // Development indicators (only affects dev mode)
  devIndicators: {
    position: "bottom-right",
  },

  // Optimize production build
  productionBrowserSourceMaps: false,
  
  // Disable powered by header for security
  poweredByHeader: false,
};

export default nextConfig;
