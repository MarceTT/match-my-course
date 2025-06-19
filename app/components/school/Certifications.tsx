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
  if (!school?.certifications || typeof school.certifications !== "object") return null;

  const validCerts = Object.entries(school.certifications)
    .filter(([key, value]) => Boolean(value) && key in logoMap)
    .map(([key]) => ({
      key,
      logo: logoMap[key],
      description: school.accreditations?.[key] ?? "",
    }));

  if (validCerts.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex flex-col items-center text-center mb-8 md:text-left lg:flex-row lg:items-center lg:text-left">
        <h1 className="text-2xl font-bold text-black">
          Acreditaciones y certificaciones de calidad
        </h1>
        <Info className="mt-2 lg:mt-0 lg:ml-2 h-5 w-5 text-gray-400" />
      </div>

      {validCerts.length === 1 ? (
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-blue-600">
            {validCerts[0].key}
          </h2>
          <p className="text-sm text-gray-700 max-w-xl mx-auto md:mx-0 mt-2">
            {validCerts[0].description}
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          {validCerts.map(({ key, logo, description }) => (
            <TooltipProvider key={key} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    src={logo}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Certifications;