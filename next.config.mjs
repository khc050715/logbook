/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/webproj',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;