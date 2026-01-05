/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify was causing issues with the build
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
