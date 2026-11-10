/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 80], 
  },
  typescript: {
    ignoreBuildErrors: true,
  },
   allowedDevOrigins: ['10.197.81.232'],
  
};

export default nextConfig;
