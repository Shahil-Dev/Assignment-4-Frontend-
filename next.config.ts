
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**", 
      },
    ],
  },
};

export default nextConfig;




// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//       {
//         protocol: "https",
//         hostname: "**", // এটি কাজ করবে, তবে চেষ্টা করো ডোমেইন নামগুলো নির্দিষ্ট করে দিতে
//       },
//     ],
//   },
// };