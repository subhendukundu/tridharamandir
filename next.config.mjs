/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Configure loader to bypass Next.js optimization for Cloudflare Image URLs
    loader: 'custom',
    loaderFile: './src/utils/image-loader.ts',
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com"
      },
      {
        protocol: "https",
        hostname: "images.pexels.com"
      }
    ]
  }
};

export default nextConfig;
