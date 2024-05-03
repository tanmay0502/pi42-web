/** @type {import('next').NextConfig} */
const nextConfig = {
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
  