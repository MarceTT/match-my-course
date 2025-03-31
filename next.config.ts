import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "flagcdn.com",
      "img.youtube.com",
      "task-manager-bucket-prueba-marcelo.s3.us-east-1.amazonaws.com",
      "match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com",
    ],
  },
};

export default nextConfig;
