import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { raleway } from "./ui/fonts";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "./providers";
import Script from "next/script";
import { rewriteToCDN } from "./utils/rewriteToCDN";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTMPageViewTracker } from "./ui/GTMPageViewTracker";
import PromotionalPopup from "./ui/promotional-popup";
import { Suspense } from "react";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  return (
    <html lang="en">
      <head>
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
        className={`${raleway.className} ${geistMono.variable} antialiased`}
      >
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'TU_PIXEL_ID');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=TU_PIXEL_ID&ev=PageView&noscript=1"
          />
        </noscript>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER!} />
        <Suspense fallback={null}>
        <GTMPageViewTracker />
        </Suspense>
        <ReactQueryProvider>
          {children}
          <Toaster position="top-center" richColors closeButton />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
