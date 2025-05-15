import React from "react";
import Image from "next/image";
import { Qualities } from "@/app/types/index";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CertificationsProps {
  school: Qualities;
}

const logoMap: Record<string, string> = {
  ACELS:
    "https://d2wv8pxed72bi5.cloudfront.net/ACELS.png",
  Eaquals:
    "https://d2wv8pxed72bi5.cloudfront.net/Eaquals.png",
  EEI: "https://d2wv8pxed72bi5.cloudfront.net/EEI.png",
  IALC: "https://d2wv8pxed72bi5.cloudfront.net/IALC.png",
  ILEP: "https://d2wv8pxed72bi5.cloudfront.net/ILEP.png",
  QualityEnglish:
    "https://d2wv8pxed72bi5.cloudfront.net/Quality+English.png",
  SelectIreland:
    "https://d2wv8pxed72bi5.cloudfront.net/Select+Ireland.png",
};

const Certifications = ({ school }: CertificationsProps) => {
  console.log(school);
  if (!school?.certifications || !school.accreditations) return null;

  return (

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold text-black">
            Acreditaciones y certificaciones de calidad
          </h1>
          <Info className="ml-2 h-5 w-5 text-gray-400" />
        </div>

        <div className="space-y-10">
          {/* Eaquals */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left md:flex-row gap-6">
            <div className="flex-shrink-0 w-48">
              <Image
                src={logoMap["Eaquals"]}
                alt="Eaquals"
                width={150}
                height={100}
                className="h-auto"
                loading="lazy"
                fetchPriority="high"
              />
            </div>
            <div>
              <p className="text-justify">
                acreditación internacional que{" "}
                <span className="italic underline">
                  garantiza la excelencia en la enseñanza de idiomas
                </span>
                , evaluando aspectos como la calidad de la enseñanza, el
                currículo de los profesores, la gestión institucional, el
                bienestar del estudiante, la infraestructura y la evaluación del
                aprendizaje
              </p>
            </div>
          </div>

          {/* IALC */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left md:flex-row gap-6">
            <div className="flex-shrink-0 w-48">
              <Image
                src={logoMap["IALC"]}
                alt="IALC"
                width={150}
                height={100}
                className="h-auto"
              />
            </div>
            <div>
              <p className="text-justify">
                acreditación que certifica escuelas independientes de alta
                calidad en la enseñanza de idiomas. Se enfoca en{" "}
                <span className="italic underline">
                  garantizar programas bien estructurados, enseñanza
                  personalizada
                </span>
                , atención al estudiante y una experiencia inmersiva en el
                idioma y la cultura local
              </p>
            </div>
          </div>

          {/* Certificaciones */}
          <div className="mt-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <p className="font-medium">Certificaciones:</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {Object.entries(school.certifications).map(([key, value]) => {
                  if (!value || !logoMap[key]) return null;
                  return (
                    <TooltipProvider key={key} delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Image
                            src={logoMap[key]}
                            alt={key}
                            width={100}
                            height={30}
                            className="h-auto cursor-pointer"
                          />
                        </TooltipTrigger>
                        {school.accreditations?.[key] && (
                          <TooltipContent className="max-w-xs bg-[#5271FF]">
                            <p className="text-sm text-white">
                              {school.accreditations[key]}
                            </p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default Certifications;
