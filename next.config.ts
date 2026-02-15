import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react", "iconsax-reactjs"],
  },
};

export default nextConfig;
