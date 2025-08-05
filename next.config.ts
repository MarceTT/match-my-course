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
      {
        protocol: 'https',
        hostname: 'd2wv8pxed72bi5.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/acerca-de-nosotros',
        destination: '/about-us',
      },
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-src 'self' https://www.youtube.com https://www.google.com https://player.vimeo.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
