/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://fawss.pi42.com/socket.io/:path*', 
      },
    ];
  },
};

export default nextConfig;
