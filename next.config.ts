import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Allow importing images from the src/assets directory
    // Next.js static imports for images work fine, but we expose them via /public copies
    // Images in src/assets are imported as modules → Next.js handles this with webpack
    reactStrictMode: true,
    // Turbopack-compatible image handling  
    images: {
        // No remote patterns needed; all images are local
        unoptimized: false,
    },
    // Keep the existing @/ alias pointing to ./src
    // Next.js reads this from tsconfig.json automatically
};

export default nextConfig;
