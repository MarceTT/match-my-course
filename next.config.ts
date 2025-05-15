import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    domains: ['match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com', 'd2wv8pxed72bi5.cloudfront.net'],
  },
  async rewrites() {
    return [
      {
        source: '/escuelas-socias',
        destination: '/partners',
      },
      {
        source: '/terminos-y-condiciones',
        destination: '/terms',
      },
      {
        source: '/politica-de-privacidad',
        destination: '/privacy-policy',
      },
      {
        source: '/testimonios',
        destination: '/testimonials',
      },
      {
        source: '/contacto',
        destination: '/contact',
      },
    ];
  },
};

export default nextConfig;
