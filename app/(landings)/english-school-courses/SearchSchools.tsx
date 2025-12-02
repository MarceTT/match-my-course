import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, GraduationCap } from "lucide-react";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { useScrollTopButton } from "@/hooks/useScrollTopButton";
import Link from "next/link";
import { motion } from "framer-motion";

const SearchSchools = () => {
    const { visible: showScrollTop, scrollToTop } = useScrollTopButton();
  return (
    <section className="py-1 md:py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Schools List */}
          <div className="space-y-4">
            <Image
              src={rewriteToCDN(
                "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/landing-cursos/Cursos+de+ingles+en+Irlanda+Matchmycourse.png"
              )}
              alt="Centre of English Studies"
              width={600}
              height={600}
              className="rounded-sm w-full h-auto"
            />
          </div>
          {/* Course Finder Section */}
          <div className="mb-6 md:mb-1 lg:pl-8">
            <div className="sticky top-8">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <GraduationCap className="h-16 w-16 text-[#5271FF] mx-auto" />
                  <h2 className="text-3xl md:text-5xl font-black text-black text-balance leading-tight">
                    Encuentra tu curso de inglés en nuestro buscador
                  </h2>
                  <p className="text-black text-lg leading-relaxed max-w-md mx-auto">
                    Descubre la escuela perfecta para ti con nuestro sistema de
                    búsqueda avanzado
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                <Button
                  size="lg"
                  className="bg-[#5271FF] hover:bg-[#5271FF] text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/buscador-cursos-de-ingles?course=ingles-general" target="_blank">
                    Buscar curso
                  </Link>
                </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#5271FF] hover:bg-[#5271FF] text-white p-3 rounded-full shadow-lg transition-all"
          aria-label="Volver al inicio"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </section>
  );
};

export default SearchSchools;
