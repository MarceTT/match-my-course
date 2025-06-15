import React from "react";
import Image from "next/image";
import { Qualities } from "@/app/lib/types";
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
  ACELS: "https://d2wv8pxed72bi5.cloudfront.net/ACELS.png",
  Eaquals: "https://d2wv8pxed72bi5.cloudfront.net/Eaquals.png",
  EEI: "https://d2wv8pxed72bi5.cloudfront.net/EEI.png",
  IALC: "https://d2wv8pxed72bi5.cloudfront.net/IALC.png",
  ILEP: "https://d2wv8pxed72bi5.cloudfront.net/ILEP.png",
  QualityEnglish: "https://d2wv8pxed72bi5.cloudfront.net/Quality+English.png",
  SelectIreland: "https://d2wv8pxed72bi5.cloudfront.net/Select+Ireland.png",
};

const Certifications = ({ school }: CertificationsProps) => {
  if (!school?.certifications) return null;

  const staticCertifications = [
    {
      key: "Eaquals",
      description:
        "acreditación internacional que garantiza la excelencia en la enseñanza de idiomas, evaluando aspectos como la calidad de la enseñanza, el currículo de los profesores, la gestión institucional, el bienestar del estudiante, la infraestructura y la evaluación del aprendizaje",
    },
    {
      key: "IALC",
      description:
        "acreditación que certifica escuelas independientes de alta calidad en la enseñanza de idiomas. Se enfoca en garantizar programas bien estructurados, enseñanza personalizada, atención al estudiante y una experiencia inmersiva en el idioma y la cultura local",
    },
  ];

  const dynamicCertifications = Object.entries(school.certifications)
    .filter(([key, value]) => value && !["Eaquals", "IALC"].includes(key))
    .map(([key]) => ({
      key,
      description: school.accreditations?.[key] ?? "",
    }));

  const allCertifications = [...staticCertifications, ...dynamicCertifications];

  const sortedCertifications = allCertifications.sort((a, b) => {
    const order = ["Eaquals", "IALC", "ACELS"];
    const aIndex = order.indexOf(a.key);
    const bIndex = order.indexOf(b.key);
    if (aIndex === -1 && bIndex === -1) return a.key.localeCompare(b.key);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex flex-col items-center text-center mb-8 md:text-left lg:flex-row lg:items-center lg:text-left">
        <h1 className="text-2xl font-bold text-black">
          Acreditaciones y certificaciones de calidad
        </h1>
        <Info className="mt-2 lg:mt-0 lg:ml-2 h-5 w-5 text-gray-400" />
      </div>

      <div className="flex flex-wrap justify-center md:justify-start gap-6">
        {sortedCertifications.map(({ key, description }) => {
          const logoSrc = logoMap[key];
          if (!logoSrc) return null;

          return (
            <TooltipProvider key={key} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    src={logoSrc}
                    alt={key}
                    width={140}
                    height={80}
                    className="h-auto w-auto max-h-16 md:max-h-20 lg:max-h-24 cursor-pointer"
                    loading="lazy"
                  />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-[#5271FF]">
                  <p className="text-sm text-white">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
};

export default Certifications;
