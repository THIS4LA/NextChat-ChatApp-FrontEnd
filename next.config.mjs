/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['*'],
  images: {
    domains: ['i.pravatar.cc','www.pngfind.com','https://plus.unsplash.com'], // add the avatar domain here
  },
};

export default nextConfig;
