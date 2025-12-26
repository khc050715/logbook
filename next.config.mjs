/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/logbook',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;