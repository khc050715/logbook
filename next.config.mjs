/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/logbook',
  images: { unoptimized: true },
  trailingSlash: true,
  images: {
    unoptimized: true, // 필수: 정적 배포에선 이미지 최적화 끄기
  },
  reactStrictMode: true,
};

export default nextConfig;