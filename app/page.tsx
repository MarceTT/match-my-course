import type { Metadata } from "next";
import Hero from "./components/features/Hero/Hero";
import SchoolListServer from "./school/SchoolListServer";
import { Suspense } from "react";
import { rewriteToCDN } from "./utils/rewriteToCDN";
import PopupOfertaClient from "./ui/PopupOfertaClient";
import { buildCanonicalUrl } from "@/lib/helpers/canonicalUrl";
import dynamic from "next/dynamic";

// Lazy load Header and Footer to improve LCP and TBT
const Header = dynamic(() => import("./components/common/HeaderServer"), {
  loading: () => <div className="h-20 bg-white border-b" />,
});

const Footer = dynamic(() => import("./components/common/FooterServer"), {
  loading: () => <div className="h-32 bg-gray-900" />,
});

const ogImage = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Image+Open+Graph+Front/Matchmycourse+Cursos+de+ingles+en+el+extranjero%2C+estudiar+ingles+en+Irlanda.png"
);

const canonicalUrl = buildCanonicalUrl('/');

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://matchmycourse.com'),
  title: "MatchMyCourse | Encuentra tu curso de inglés",
  description: "Compara las escuelas de inglés, ve qué cursos de inglés en Irlanda son la mejor opción para ti. Reserva fácil y segura. Descubre las mejores escuelas con MatchMyCourse.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "MatchMyCourse | Encuentra tu curso de inglés",
    description: "Compara escuelas, cursos y reserva fácil y segura.",
    url: canonicalUrl,
    siteName: "MatchMyCourse",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "MatchMyCourse OG Image" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MatchMyCourse | Encuentra tu curso de inglés",
    description: "Reserva tu curso ideal de inglés. Compara escuelas en Irlanda con MatchMyCourse.",
    images: [ogImage],
  },
};

// Enable ISR (Incremental Static Regeneration) - revalidate every 15 minutes
export const revalidate = 900;

function SchoolListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-[320px] bg-gray-200 animate-pulse rounded-2xl shadow-sm"
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PopupOfertaClient scrollTrigger={1500} />
      <Hero />
      <div className="container mx-auto px-6 py-16">
        <Suspense fallback={<SchoolListSkeleton />}>
          <SchoolListServer />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
