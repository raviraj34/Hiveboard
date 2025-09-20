/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/backend/:path*",            // frontend calls /backend/*
        destination: "http://localhost:3001/backend/:path*", // Next forwards to backend
      },
    ];
  },
};

export default nextConfig;
