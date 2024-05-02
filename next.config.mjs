/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/socket.io/:path*',
          destination: 'https://fawss.pi42.com/socket.io/:path*', 
        },
      ];
    },
  };
  
  export default nextConfig;
  