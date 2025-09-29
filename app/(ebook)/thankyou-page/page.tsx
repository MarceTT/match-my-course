"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logos/final-logo.png";
import bgLilaTypEbookDesktop from "@/app/(ebook)/thankyou-page/bg-lila-typ-ebook-desktop.svg";
import arrowRedLogo from "@/app/(ebook)/thankyou-page/arrow-red-logo.png";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Globe, Users, BookUser } from "lucide-react";
import { Footer } from "@/app/shared";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import ResourcesSection from "./components/ResourcesSection";
const imgDownload = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Estudia+ingle%CC%81s+en+el+extranjero+Ebook.jpg"
);
const pdfDownload = rewriteToCDN(
  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Ebook+Irlanda+Estudio+y+Trabajo.pdf"

);

const EBOOK_DOWNLOAD_DONE_KEY = "ebookDownloaded";
const EBOOK_DOWNLOAD_READY_KEY = "EBOOK_DL_READY";

export default function Page() {
  const handleDownload = () => {
    const link = document.createElement("a");
    // Forzar descarga vía API route con Content-Disposition: attachment
    link.href = `/api/ebook/download?filename=${encodeURIComponent(
      "Ebook-Irlanda-Estudio-y-Trabajo.pdf"
    )}`;
    // El atributo download puede no aplicarse en cross-origin; se incluye como hint
    link.download = "Ebook-Irlanda-Estudio-y-Trabajo.pdf";
    link.rel = "noopener noreferrer";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Descarga automática al cargar la página (solo si viene del formulario y una vez por sesión)
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      const hasQueryFlag = url.searchParams.get("dl") === "1";
      const isReady = !!sessionStorage.getItem(EBOOK_DOWNLOAD_READY_KEY) || hasQueryFlag;
      const already = sessionStorage.getItem(EBOOK_DOWNLOAD_DONE_KEY);
      if (isReady && !already) {
        const t = setTimeout(() => {
          handleDownload();
          // Marca como descargado para no repetir en esta sesión
          sessionStorage.setItem(EBOOK_DOWNLOAD_DONE_KEY, "1");
          // Limpia el flag de ready para single-use
          sessionStorage.removeItem(EBOOK_DOWNLOAD_READY_KEY);
          // Confetti sutil al completar
          try {
            confetti({ particleCount: 80, spread: 70, origin: { y: 0.3 } });
          } catch {}
        }, 300);
        return () => clearTimeout(t);
      }
    } catch {
      // sin bloqueo si storage no está disponible
    }
  }, []);
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full z-0 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#0099ff"
            fillOpacity="0.1"
            d="M0,256L40,250.7C80,245,160,235,240,240C320,245,400,267,480,245.3C560,224,640,160,720,154.7C800,149,880,203,960,192C1040,181,1120,107,1200,85.3C1280,64,1360,96,1400,112L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          />
        </svg>
      </div>
      <main className="container mx-auto px-6 pt-4 pb-12">
        {/* Top logo, bigger and closer to top */}
        <header className="relative z-10 py-2 sm:py-3">
          <div className="flex items-center justify-start">
            <Link href="/">
              <Image
                src={Logo}
                alt="Match My Course Logo"
                width={240}
                height={47}
                className="w-44 sm:w-52 md:w-60 lg:w-72 xl:w-80 h-auto"
                priority
                draggable={false}
              />
            </Link>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-4 md:mt-6 min-h-[70vh]">
          {/* Left section - Content */}
          <div className="relative space-y-6 self-center">
            <>
              {/* Floating geometric shapes */}
              <div className="absolute top-20 right-20 w-4 h-4 rounded-full border-2 border-blue-500/70 animate-pulse"></div>
              <div className="absolute top-1/3 left-16 w-6 h-6 rotate-45 bg-blue-500/20"></div>
              <div className="absolute bottom-1/3 left-20 w-3 h-3 rounded-full border-2 border-blue-500/40"></div>
              <div className="absolute bottom-1/4 right-1/3 text-blue-500/70 text-lg">
                ✕
              </div>
              <div className="hidden md:block absolute top-1/2 right-12 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/70"></div>
            </>
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-extrabold text-balance tracking-tight text-center md:text-left">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  ¡Aquí está tu guía!
                </span>
              </h1>

              <p className="text-center text-xl text-gray-900 leading-relaxed max-w-xl md:text-left font-bold">
                Haz clic en el botón para descargar tu ebook y comenzar a
                preparar tu aventura de estudios en el extranjero.
              </p>

              <Image
                src={arrowRedLogo}
                alt="Ebook: Inglés para sobrevivir en el extranjero"
                width={560}
                height={170}
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 500px, 380px"
                className="hidden md:block object-contain ml-auto relative z-10 md:mt-16 lg:mt-24 md:-mr-3 lg:-mr-8"
              />
            </div>
          </div>

          {/* Right section - Ebook preview */}
          <div className="relative flex justify-center">
            <Card className="bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-border shadow-2xl max-w-md md:max-w-lg w-full rounded-2xl">
              <CardContent className="p-8 md:p-10 text-center space-y-6">
                <div className="relative mx-auto w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 transform hover:scale-[1.03] transition-transform duration-300">
                  <Image
                    src={imgDownload || "/placeholder.svg"}
                    alt="Ebook: Inglés para sobrevivir en el extranjero"
                    fill
                    priority
                    sizes="(min-width: 1024px) 256px, (min-width: 768px) 224px, 192px"
                    className="object-cover rounded-xl shadow-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-card-foreground">
                    Inglés para sobrevivir en el extranjero
                  </h3>
                </div>

                <Button
                  onClick={handleDownload}
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg shadow hover:shadow-md"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Ahora
                </Button>
                <p className="text-xs text-muted-foreground">
                  La descarga debería comenzar automáticamente. Si no, usa el botón.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

       
        {/* Additional resources section */}
       <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
}
