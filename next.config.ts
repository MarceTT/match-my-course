import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

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
  async redirects() {
    return [
      {
        source: '/ebook-estudiar-y-trabajar-extranjero',
        destination: '/ebook',
        permanent: true,
      },
      {
        source: '/servicios-matchmycourse',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/mision-vision-matchmycourse',
        destination: '/mision-vision',
        permanent: true,
      },
      {
        source: '/quienes-somos',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/cursos-ingles-extranjero',
        destination: '/english-school-courses',
        permanent: true,
      },
      {
        source: '/como-funciona-matchmycourse',
        destination: '/how-works',
        permanent: true,
      },
      {
        source: '/escuelas-socias',
        destination: '/partners',
        permanent: true,
      },
      {
        source: '/terminos-y-condiciones',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/politica-de-privacidad',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/testimonios',
        destination: '/testimonials',
        permanent: true,
      },
      {
        source: '/contacto',
        destination: '/contact',
        permanent: true,
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
            value: [
              "default-src 'self'",
              // Permitir scripts de Google Analytics, GTM y YouTube
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.youtube.com https://www.youtube-nocookie.com https://tagmanager.google.com",
              // Permitir frames/iframes de YouTube, Google y Vimeo
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://player.vimeo.com",
              // Permitir imágenes de cualquier fuente
              "img-src 'self' data: https: http: blob:",
              // Permitir media de fuentes seguras
              "media-src 'self' https:",
              // Permitir conexiones según el entorno
              `connect-src 'self' ${isDev ? 'http://localhost:* ' : ''}https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://tagmanager.google.com https:`,
              // Permitir estilos inline
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Permitir fuentes de Google Fonts
              "font-src 'self' https://fonts.gstatic.com data:",
              // Política base para otros recursos
              "object-src 'none'",
              "base-uri 'self'",
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

export default nextConfig;