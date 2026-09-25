/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Same value on server and client, so date-dependent first render hydrates cleanly.
  env: {
    NEXT_PUBLIC_BUILD_TIME: String(Date.now()),
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
