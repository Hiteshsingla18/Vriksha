/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    "/api/career-data": ["./cleaned_*.csv"]
  }
};

export default nextConfig;
