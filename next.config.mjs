/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  basePath: '/logbook',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;