/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname:
          "avatara-whitelabel-assets-staging.s3.ap-southeast-3.amazonaws.com",
        pathname: "/**/*",
      },
      {
        hostname: "avatara-whitelabel-assets.s3.ap-southeast-3.amazonaws.com",
        pathname: "/**/*",
      },
    ],
  },
  // reactStrictMode: true,
  redirects() {
    return [
      // Basic redirect
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
