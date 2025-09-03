import React from "react";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search } from "lucide-react";

const StudyAndWork = () => {
  return (
    <section className="py-8 md:py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-6 md:mb-1">
          {/* Background Image */}
          <div className="w-full h-64 md:h-[300px] rounded-lg overflow-hidden shadow-md">
            <Image
              src={rewriteToCDN(
                "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/landing-cursos/Programa+de+estudio+y+trabajo+de+25+semanas+de+Irlanda.jpg"
              )}
              alt="Estudiantes en clase de inglés"
              width={1000}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Content Card - Positioned relative to the container */}
          <div className="container mx-auto px-4 -mt-20 md:-mt-32 relative z-10">
            <div className="grid lg:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
              <Card className="bg-[#233A81] text-white border-none">
                <CardHeader className="pb-4 px-6 pt-6">
                  <CardTitle className="text-2xl md:text-3xl font-bold text-center md:text-left leading-tight">
                    Programa de estudio y trabajo de 25 semanas
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6 px-6 pb-6">
                  <p className="text-white leading-relaxed opacity-90 text-md md:text-lg text-center md:text-justify">
                    Estudia inglés general en Irlanda gracias al Permiso de
                    Residencia Temporal de 8 meses que te permitirá trabajar
                    mientras estudias.
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-lg md:text-md font-bold text-white text-center md:text-left">
                      Datos importantes
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Image
                          src={rewriteToCDN(
                            "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/landing-cursos/EDAD.svg"
                          )}
                          alt="Edad requerida"
                          width={20}
                          height={20}
                          className="w-8 h-8 md:w-10 md:h-10 text-white invert flex-shrink-0"
                        />
                        <span className="text-white text-md md:text-lg">
                          Para mayores de 18 años
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Image
                          src={rewriteToCDN(
                            "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/landing-cursos/maletin.png"
                          )}
                          alt="Trabajo permitido"
                          width={20}
                          height={20}
                          className="w-8 h-8 md:w-10 md:h-10 text-white invert flex-shrink-0"
                        />
                        <span className="text-white text-md md:text-lg">
                          te permite trabajar
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Image
                          src={rewriteToCDN(
                            "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/landing-cursos/renovable.png"
                          )}
                          alt="Requisito de visado"
                          width={20}
                          height={20}
                          className="w-8 h-8 md:w-10 md:h-10 text-white invert flex-shrink-0"
                        />
                        <span className="text-white text-md md:text-lg">
                          Revisa si tu país necesita visado para ingresar a
                          Irlanda
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Image
                          src={rewriteToCDN(
                            "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/landing-cursos/PRECIO+BARATO.svg"
                          )}
                          alt="Requisito financiero"
                          width={20}
                          height={20}
                          className="w-8 h-8 md:w-10 md:h-10 text-white invert flex-shrink-0"
                        />
                        <span className="text-white text-md md:text-lg">
                          Debes demostrar que tienes €6.665
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800 mt-0 bg-gray-200 rounded-lg px-4 py-6 md:mt-36 md:bg-gray-50 md:rounded-none">
                {/* Columna izquierda */}
                <div className="space-y-6">
                  {/* Modalidad de las clases */}
                  <div>
                    <h2 className="text-lg font-bold mb-3 text-gray-900 text-center md:text-left">
                      Modalidad de las clases
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-700 text-justify md:text-justify">
                      Todos los cursos son bajo la modalidad{" "}
                      <strong>ESL (English as a Second Language)</strong>, en
                      donde estarás rodeado de personas de otros países en un
                      ambiente multicultural.
                    </p>
                  </div>

                  {/* Requisito de ingreso */}
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-gray-900 text-center md:text-left">
                      Requisito de ingreso
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-700 text-center md:text-justify">
                    Tener un inglés nivel A1 a A2 mínimo dependiendo de la escuela
                    </p>
                  </div>
                </div>

                {/* Columna derecha */}
                <div className="space-y-6">
                  {/* Horarios */}
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-gray-900 text-center md:text-left">
                      Horarios
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-700 text-center md:text-justify">
                      Los cursos pueden ser por la mañana o por la tarde, y son
                      de 15, 18 o 20 horas de clase a la semana por la mañana.
                    </p>
                  </div>

                  {/* Inicio de clases */}
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-gray-900 text-center md:text-left">
                      Inicio de clases
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-700 text-center md:text-justify">
                      Todos los lunes del año
                    </p>
                  </div>

                  <div>
                    <Button className="bg-[#233A81] w-full md:w-auto text-white">
                      <Link href="/school-search?course=ingles-visa-de-trabajo" className="flex items-center justify-center">
                        <Search className="h-5 w-5 mr-2" />
                        Buscar cursos
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyAndWork;
