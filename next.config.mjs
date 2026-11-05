/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  allowedDevOrigins: [
    "localhost:2003",
    "127.0.0.1:2003",
    "192.168.1.10:2003",
    "192.168.1.10",
  ],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
