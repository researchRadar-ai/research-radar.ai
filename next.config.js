// /** @type {import('next').NextConfig} */
// const nextConfig = {
  
// }

// module.exports = nextConfig

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy to Flask backend
      },
    ];
  };
  return {
    reactStrictMode: true,
    rewrites,
  };
};