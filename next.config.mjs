/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false, // clean routes like /reservar, never /reservar/index.html
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" }
    ]
  }
};

export default nextConfig;
