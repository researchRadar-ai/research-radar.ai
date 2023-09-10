// /** @type {import('next').NextConfig} */
// const nextConfig = {

// }

// module.exports = nextConfig

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5000/api/:path*', // Proxy to Flask backend
      },
    ];
  };
  return {
    reactStrictMode: true,
    rewrites,
  };
};