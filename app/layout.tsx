import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { raleway, nunito } from "./ui/fonts";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "./providers";
// import Script from "next/script"; // Commented out since SW is disabled
import { rewriteToCDN } from "./utils/rewriteToCDN";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTMPageViewTracker } from "./ui/GTMPageViewTracker";
import PromotionalPopup from "./ui/promotional-popup";
import { Suspense } from "react";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"]
});

const ogImage = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Image+Open+Graph+Front/Matchmycourse+Cursos+de+ingles+en+el+extranjero%2C+estudiar+ingles+en+Irlanda.png"
);

export const metadata: Metadata = {
  title: "MatchMyCourse | Encuentra tu curso de inglés",
  description:
    "Compara las escuelas de inglés, ve qué cursos de inglés en Irlanda son la mejor opción para ti. Reserva fácil y segura. Descubre las mejores escuelas con MatchMyCourse.",
  openGraph: {
    title: "MatchMyCourse | Encuentra tu curso de inglés",
    description: "Compara escuelas, cursos y reserva fácil y segura.",
    url: "https://www.matchmycourse.com",
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
  return (
    <html lang="en">
      <head>
        {/* Resource hints for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//d2wv8pxed72bi5.cloudfront.net" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for initial render */
            *,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
            html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:var(--font-raleway),system-ui,-apple-system,sans-serif}
            body{margin:0;line-height:inherit;font-family:inherit}
            /* Layout classes */
            .container{width:100%}
            @media (min-width: 640px){.container{max-width:640px}}
            @media (min-width: 768px){.container{max-width:768px}}
            @media (min-width: 1024px){.container{max-width:1024px}}
            @media (min-width: 1280px){.container{max-width:1280px}}
            @media (min-width: 1536px){.container{max-width:1536px}}
            .mx-auto{margin-left:auto;margin-right:auto}
            .px-6{padding-left:1.5rem;padding-right:1.5rem}
            /* Hero section critical styles */
            .hero-section{position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
            /* School card critical styles */
            .school-card{display:flex;border-radius:0.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.1);background-color:white}
            /* Button critical styles */
            .btn-primary{background-color:#3b82f6;color:white;padding:0.5rem 1rem;border-radius:0.375rem;font-weight:600}
            .btn-primary:hover{background-color:#2563eb}
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
        <link
          rel="preload"
          as="image"
          href="https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Pagina%2Binicial.webp"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-title" content="Match My Course" />
        <meta name="application-name" content="Match My Course" />
        <meta
          name="facebook-domain-verification"
          content="r10bqkdz2nziy7vzg7h0cv7qb2upbm"
        />
      </head>
      <body
        className={`${raleway.variable} ${nunito.variable} ${geistMono.variable} antialiased`}
        style={{ fontFamily: 'var(--font-raleway)' }}
      >
       {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
        <Suspense fallback={null}>
        <GTMPageViewTracker />
        </Suspense>
        <ReactQueryProvider>
          {children}
          <Toaster position="top-center" richColors closeButton />
        </ReactQueryProvider>
        
        {/* Service Worker Registration - DISABLED FOR DEPLOYMENT */}
        {/* 
        <Script id="sw-registration" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', async () => {
                try {
                  const registration = await navigator.serviceWorker.register('/sw.js', {
                    scope: '/'
                  });
                  
                  console.log('[App] SW registered:', registration.scope);
                  
                  // Actualizar cuando hay una nueva versión
                  registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker?.addEventListener('statechange', () => {
                      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // Mostrar notificación de actualización disponible
                        if (confirm('Nueva versión disponible. ¿Actualizar ahora?')) {
                          newWorker.postMessage({ type: 'SKIP_WAITING' });
                          window.location.reload();
                        }
                      }
                    });
                  });
                  
                  // Recargar cuando el SW toma control
                  navigator.serviceWorker.addEventListener('controllerchange', () => {
                    window.location.reload();
                  });
                  
                } catch (error) {
                  console.error('[App] SW registration failed:', error);
                }
              });
            }
          `}
        </Script>
        */}
      </body>
    </html>
  );
}
