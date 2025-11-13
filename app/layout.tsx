import type { Metadata } from "next";
import "./globals.css";
import { raleway, nunito } from "./ui/fonts";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "./providers";
import { Suspense } from "react";
import Script from "next/script";
import { rewriteToCDN } from "./utils/rewriteToCDN";
import GTMClient from "./ui/GTMClient";

const ogImage = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Image+Open+Graph+Front/Matchmycourse+Cursos+de+ingles+en+el+extranjero%2C+estudiar+ingles+en+Irlanda.png"
);

// Hero image preload removed - Next.js Image component with priority handles this better

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://matchmycourse.com'),
  title: "Escuelas de Inglés | Irlanda y Nueva Zelanda | MatchMyCourse",
  description:
    "Encuentra y reserva tu curso de inglés ideal con asesoría personal, comparativa de escuelas y total transparencia en una sola plataforma ¡Reserva ahora!",
  openGraph: {
    title: "Escuelas de Inglés | Irlanda y Nueva Zelanda | MatchMyCourse",
    description: "Encuentra y reserva tu curso de inglés ideal con asesoría personal, comparativa de escuelas y total transparencia en una sola plataforma ¡Reserva ahora!",
    url: "https://matchmycourse.com",
    siteName: "MatchMyCourse",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "MatchMyCourse OG Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MatchMyCourse | Encuentra tu curso de inglés",
    description:
      "Reserva tu curso ideal de inglés. Compara escuelas en Irlanda con MatchMyCourse.",
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER!;
  const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://matchmycourse.com'
  ).replace(/\/$/, '');
  return (
    <html lang="es">
      <head>
        {/* Resource hints for performance - CloudFront CDN and S3 for images */}
        <link rel="preconnect" href="https://d2wv8pxed72bi5.cloudfront.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//d2wv8pxed72bi5.cloudfront.net" />
        <link rel="preconnect" href="https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com" />

        {/* Preconnect to GTM and Analytics for faster third-party loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Preconnect to backend API for faster data fetching */}
        <link rel="preconnect" href="https://api.matchmycourse.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//api.matchmycourse.com" />

        {/* Preload critical LCP image for Hero */}
        <link
          rel="preload"
          as="image"
          href="https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Matchmycourse-Cursos-de-ingles-en-el-extranjero-matchmycourse.webp"
          imageSrcSet="https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Matchmycourse-Cursos-de-ingles-en-el-extranjero-matchmycourse.webp 1920w"
          imageSizes="100vw"
          fetchPriority="high"
        />

        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical CSS for above-the-fold content - Enhanced for faster FCP */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for initial render - optimized for FCP */
            *,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
            html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:var(--font-raleway),system-ui,-apple-system,sans-serif;font-display:swap}
            body{margin:0;line-height:inherit;font-family:inherit;background-color:#fff}
            /* Layout classes */
            .container{width:100%;max-width:1536px;margin-left:auto;margin-right:auto;padding-left:1.5rem;padding-right:1.5rem}
            /* Hero section critical styles - optimized */
            .hero-section{position:relative;display:flex;align-items:center;justify-content:center;min-height:500px;background-color:#f9fafb}
            .hero-title{font-size:2.5rem;line-height:1.2;font-weight:700;color:#111827;margin-bottom:1rem}
            .hero-subtitle{font-size:1.125rem;color:#6b7280;margin-bottom:2rem}
            /* Header critical styles */
            header{background-color:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.1);position:sticky;top:0;z-index:50}
            /* Button critical styles */
            .btn-primary{background-color:#3b82f6;color:#fff;padding:0.75rem 1.5rem;border-radius:0.5rem;font-weight:600;border:none;cursor:pointer;display:inline-block;text-decoration:none}
            .btn-primary:hover{background-color:#2563eb}
            /* Prevent layout shift */
            img{display:block;max-width:100%;height:auto}
            /* Loading state */
            .loading{opacity:0;animation:fadeIn 0.3s ease-in forwards}
            @keyframes fadeIn{to{opacity:1}}
          `
        }} />
        
        <link rel="icon" href="/FlaviconMatchmycourse.png" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/FlaviconMatchmycourse.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/FlaviconMatchmycourse.png"
        />
        <link rel="apple-touch-icon" href="/FlaviconMatchmycourse.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-title" content="Match My Course" />
        <meta name="application-name" content="Match My Course" />
        <meta
          name="facebook-domain-verification"
          content="r10bqkdz2nziy7vzg7h0cv7qb2upbm"
        />

        {/* EducationalOrganization JSON-LD - Main Schema */}
        {(() => {
          const origin = SITE_URL;
          const orgLd = {
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Match My Course',
            url: `${origin}/`,
            logo: `${origin}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffinal-logo.c32fac39.png&w=512&q=75`,
            description: 'Te orientamos para estudiar inglés en el extranjero, ayudándote con visas, alojamiento y asesoría personalizada para que viajes sin estrés.',
            telephone: ['+393925210018', '+56931714541'],
            sameAs: [
              'https://www.facebook.com/matchmycourse',
              'https://www.instagram.com/match.my.course/',
              'https://www.linkedin.com/company/matchmycourse/',
              'https://www.youtube.com/@matchmycourse',
            ],
            foundingDate: '2021',
            founder: {
              '@type': 'Person',
              name: 'Match My Course Team',
            },
            address: {
              '@type': 'PostalAddress',
              streetAddress: '77 Camden Street Lower',
              addressLocality: 'Dublin',
              addressRegion: 'Leinster',
              addressCountry: 'Ireland',
            },
          };
          return (
            <script
              key="ld-org"
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
            />
          );
        })()}

        {/* WebSite + Sitelinks SearchBox JSON-LD */}
        {(() => {
          const origin = SITE_URL;
          const siteLd = {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Match My Course',
            url: `${origin}/`,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${origin}/school-search?course={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          };
          return (
            <script
              key="ld-website"
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
            />
          );
        })()}
      </head>
      <body
        className={`${raleway.variable} ${nunito.variable} antialiased`}
        style={{ fontFamily: 'var(--font-raleway)' }}
      >
       {/* Always use lazy GTM loading for better performance */}
       {GTM_ID && <GTMClient gtmId={GTM_ID} lazyOn="idle" />}
        <ReactQueryProvider>
          <Suspense fallback={null}>
            {children}
          </Suspense>
          <Toaster position="top-center" richColors closeButton />
        </ReactQueryProvider>

        {/* Service Worker Registration with Navigation Preloading */}
        <Script id="sw-registration" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', async () => {
                try {
                  // Enable navigation preloading if supported
                  if ('navigationPreload' in ServiceWorkerRegistration.prototype) {
                    // console.log('[App] Navigation preload supported');
                  }

                  const registration = await navigator.serviceWorker.register('/sw.js', {
                    scope: '/',
                    updateViaCache: 'none' // Always fetch fresh SW
                  });

                  // console.log('[App] SW registered:', registration.scope);

                  // Enable navigation preload
                  if (registration.navigationPreload) {
                    await registration.navigationPreload.enable();
                    // console.log('[App] Navigation preload enabled');
                  }

                  // Actualizar cuando hay una nueva versión
                  registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker?.addEventListener('statechange', () => {
                      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // console.log('[App] Nueva versión del SW disponible');
                        // Auto-update sin confirmación para mejor UX
                        newWorker.postMessage({ type: 'SKIP_WAITING' });
                      }
                    });
                  });

                  // Recargar cuando el SW toma control
                  let refreshing = false;
                  navigator.serviceWorker.addEventListener('controllerchange', () => {
                    if (!refreshing) {
                      refreshing = true;
                      window.location.reload();
                    }
                  });

                  // Prefetch critical routes after idle - lightweight approach
                  if ('requestIdleCallback' in window) {
                    requestIdleCallback(() => {
                      // Simple prefetch of priority routes using link rel=prefetch
                      const criticalRoutes = [
                        '/estudiar-ingles-irlanda',
                        '/estudiar-ingles-nueva-zelanda',
                        '/cursos-ingles-extranjero',
                        '/blog',
                        '/school-search'
                      ];

                      criticalRoutes.forEach(route => {
                        const link = document.createElement('link');
                        link.rel = 'prefetch';
                        link.href = route;
                        link.as = 'document';
                        document.head.appendChild(link);
                      });

                      // Initialize PrefetchManager after prefetch links are added
                      import('./utils/prefetchManager')
                        .then(({ default: prefetchManager }) => {
                          prefetchManager.configure({
                            enabled: true,
                            maxPrefetchPerSession: 30,
                            prefetchOnHover: true,
                            prefetchOnIdle: true,
                          });
                          // console.log('[App] PrefetchManager initialized');
                        })
                        .catch(err => {
                          // console.error('[App] PrefetchManager init failed:', err)
                        });
                    }, { timeout: 3000 });
                  }

                } catch (error) {
                  console.error('[App] SW registration failed:', error);
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
