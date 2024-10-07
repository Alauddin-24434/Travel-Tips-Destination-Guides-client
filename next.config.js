


/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  };
  
  module.exports = nextConfig;




  // default next config

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;