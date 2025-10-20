/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['*'],
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
