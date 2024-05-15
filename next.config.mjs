/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["cook-unity-assessment.s3.amazonaws.com"],
  },
};

export default nextConfig;
