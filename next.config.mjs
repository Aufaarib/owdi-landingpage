/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/UI-pages/home",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/UI-pages/home",
        destination: "/",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
