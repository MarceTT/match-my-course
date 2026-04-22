
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

/**
 * Content Security Policy Configuration
 * 
 * WHY unsafe-inline is needed (cannot remove without major refactor):
 * - GTM/GA: dataLayer.push() calls in GTMClient.tsx require inline script execution
 * - Critical CSS: dangerouslySetInnerHTML in layout.tsx for above-the-fold styles
 * - JSON-LD: Schema.org structured data uses dangerouslySetInnerHTML
 * - Service Worker: Registration script is inline in layout.tsx
 * 
 * Removing unsafe-inline would require:
 * 1. Implementing nonce-based CSP (complex Next.js middleware)
 * 2. Moving all inline scripts to external files
 * 3. Using Next.js experimental CSP nonce support
 * 
 * WHY unsafe-eval is ONLY in development:
 * - Next.js HMR/hot reload requires eval() for module replacement
 * - Production builds are pre-compiled and don't need eval()
 * 
 * Security headers reference: https://securityheaders.com/
 */
const buildCSP = (): string => {
  const directives: string[] = [
    // Default fallback: only self
    "default-src 'self'",
    
    // Scripts: self + inline (for GTM/JSON-LD) + eval ONLY in dev (for HMR)
    // Google services, YouTube, Calendly, Cloudflare analytics
    [
      "script-src 'self' 'unsafe-inline'",
      isDev ? "'unsafe-eval'" : "", // ONLY for Next.js HMR in development
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://ssl.google-analytics.com",
      "https://www.youtube.com",
      "https://www.youtube-nocookie.com",
      "https://tagmanager.google.com",
      "https://assets.calendly.com",
      "https://static.cloudflareinsights.com",
    ].filter(Boolean).join(' '),
    
    // Frames: YouTube embeds, Google forms, Vimeo, Calendly
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://player.vimeo.com https://calendly.com https://assets.calendly.com",
    
    // Images: Allow data URIs (base64), blob (for image processing), and HTTPS sources
    "img-src 'self' data: https: http: blob:",
    
    // Media (video/audio): only secure sources
    "media-src 'self' https:",
    
    // Connections: API calls, analytics, development servers
    [
      "connect-src 'self'",
      "http://localhost:8500", // Backend dev server
      isDev ? "http://localhost:*" : "", // All localhost ports in dev
      "https://www.google-analytics.com",
      "https://analytics.google.com",
      "https://www.googletagmanager.com",
      "https://tagmanager.google.com",
      "https://cloudflareinsights.com",
      "https:", // Allow all HTTPS connections (for API flexibility)
    ].filter(Boolean).join(' '),
    
    // Workers: Service Worker and blob URLs for dynamic workers
    "worker-src 'self' blob:",
    
    // Child contexts (iframes created by scripts)
    "child-src 'self'",
    
    // Styles: self + inline (for critical CSS) + Google Fonts
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    
    // Fonts: Google Fonts + data URIs for embedded fonts
    "font-src 'self' https://fonts.gstatic.com data:",
    
    // === SECURITY HARDENING DIRECTIVES ===
    
    // Object/embed: Disable Flash, Java, and other plugins
    "object-src 'none'",
    
    // Base URI: Prevent base tag injection attacks
    "base-uri 'self'",
    
    // Form submissions: Only allow forms to submit to same origin
    "form-action 'self' https://calendly.com",
    
    // Frame ancestors: Prevent clickjacking (who can embed this site)
    "frame-ancestors 'self'",
    
    // Upgrade HTTP to HTTPS automatically
    "upgrade-insecure-requests",
  ];

  return directives.join('; ');
};

const nextConfig: NextConfig = {
  // Trailing slash behavior: false = URLs sin barra final (consistente con canonicals)
  trailingSlash: false,

  images: {
    // Formatos modernos para mejor compresión
    formats: ['image/avif', 'image/webp'],
    
    // Tamaños de dispositivo optimizados
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    
    // Tamaños de imagen para componentes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    
    // Cache TTL mínimo de 24 horas
    minimumCacheTTL: 86400,
    
    // Límite de transformaciones concurrentes
    dangerouslyAllowSVG: false,
    
    // Límites de seguridad
    unoptimized: false,
    
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
      // Legacy URL redirects
      {
        source: '/nueva-zelanda',
        destination: '/estudiar-ingles-nueva-zelanda',
        permanent: true,
      },
      {
        source: '/irlanda',
        destination: '/estudiar-ingles-irlanda',
        permanent: true,
      },
      {
        source: '/mision-y-vision',
        destination: '/mision-vision-matchmycourse',
        permanent: true,
      },
      {
        source: '/ebook-page',
        destination: '/ebook-estudiar-y-trabajar-extranjero',
        permanent: true,
      },
      {
        source: '/form-registro-mmc',
        destination: '/formulario-registro-matchmycourse',
        permanent: true,
      },
      // Course slug redirects (old/incorrect slugs to correct ones)
      {
        source: '/cursos/ingles-general-sesiones/escuelas/:school*',
        destination: '/cursos/ingles-general-mas-sesiones-individuales/escuelas/:school*',
        permanent: true,
      },
      {
        source: '/cursos/ingles-estudio-trabajo/escuelas/:school*',
        destination: '/cursos/ingles-visa-de-trabajo/escuelas/:school*',
        permanent: true,
      },
      {
        source: '/cursos/ingles-negocios/escuelas/:school*',
        destination: '/cursos/ingles-general-orientado-a-negocios/escuelas/:school*',
        permanent: true,
      },
      // Course category pages redirects
      {
        source: '/cursos/ingles-general-sesiones',
        destination: '/cursos/ingles-general-mas-sesiones-individuales',
        permanent: true,
      },
      {
        source: '/cursos/ingles-estudio-trabajo',
        destination: '/cursos/ingles-visa-de-trabajo',
        permanent: true,
      },
      {
        source: '/cursos/ingles-negocios',
        destination: '/cursos/ingles-general-orientado-a-negocios',
        permanent: true,
      },
      // English to Spanish redirects (Spanish URLs are canonical)
      {
        source: '/school-search',
        destination: '/buscador-cursos-de-ingles',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/servicios-matchmycourse',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/quienes-somos',
        permanent: true,
      },
      {
        source: '/english-school-courses',
        destination: '/cursos-ingles-extranjero',
        permanent: true,
      },
      {
        source: '/how-works',
        destination: '/como-funciona-matchmycourse',
        permanent: true,
      },
      {
        source: '/partners',
        destination: '/escuelas-socias',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/terminos-y-condiciones',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/politica-de-privacidad',
        permanent: true,
      },
      {
        source: '/testimonials',
        destination: '/testimonios',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contacto',
        permanent: true,
      },
      // Redirect malformed school URLs with extra characters at the end
      // Pattern: /cursos/[slug]/escuelas/[slug]/[extra-characters]
      // Redirect to clean URL: /cursos/[slug]/escuelas/[slug]
      {
        source: '/cursos/:cursoSlug/escuelas/:schoolSlug/:schoolId',
        destination: '/cursos/:cursoSlug/escuelas/:schoolSlug',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Canonical Spanish URL for ebook -> serves existing ebook page implementation
      {
        source: '/ebook-estudiar-y-trabajar-extranjero',
        destination: '/ebook-page',
      },
      {
        source: '/formulario-registro-matchmycourse',
        destination: '/form-registro-mmc',
      },
      // SEO-friendly Spanish URL for school search
      {
        source: '/buscador-cursos-de-ingles',
        destination: '/school-search',
      },
      // Rewrite Spanish canonical URLs to their English page implementations
      // This allows Spanish URLs to be canonical while using English page files
      {
        source: '/servicios-matchmycourse',
        destination: '/services',
      },
      {
        source: '/mision-vision-matchmycourse',
        destination: '/mision-vision',
      },
      {
        source: '/quienes-somos',
        destination: '/about-us',
      },
      {
        source: '/cursos-ingles-extranjero',
        destination: '/english-school-courses',
      },
      {
        source: '/como-funciona-matchmycourse',
        destination: '/how-works',
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
      {
        // Canonical Spanish URL for New Zealand page -> serves the existing route
        source: '/estudiar-ingles-nueva-zelanda',
        destination: '/nueva-zelanda',
      },
      {
        // Canonical Spanish URL for New Zealand page -> serves the existing route
        source: '/estudiar-ingles-irlanda',
        destination: '/irlanda',
      },
      {
        // Canonical Spanish URL for New Zealand advisory page
        source: '/asesorias/nueva-zelanda',
        destination: '/nueva-zelanda/asesoria',
      },
      {
        // Canonical Spanish URL for Ireland advisory page
        source: '/asesorias/irlanda',
        destination: '/irlanda/asesoria',
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
            value: buildCSP(),
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      // Etiquetado defensivo para evitar indexación de rutas privadas o utilitarias
      { source: '/admin/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/login', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/unauthorized', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/api/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/thankyou-page', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/thankyou-booking', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/formulario-registro-matchmycourse', headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }] },
    ];
  },
};

export default nextConfig;
