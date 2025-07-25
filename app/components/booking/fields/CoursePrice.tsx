import { Info } from "lucide-react";
import { useState } from "react";

interface CoursePriceProps {
  amount: number;
  offer?: number;
  className?: string;
  text?: string;
  details?: string;
  htmlText?: React.ReactNode;
  type?: string;
}

const CoursePrice = ({
  amount,
  offer,
  className = "",
  text,
  details = "El precio incluye curso de inglés, materiales, examen de salida, seguro médico, seguro PEL y matrícula.",
  htmlText,
  type,
}: CoursePriceProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  console.log("CoursePrice -> amount:", amount);
  console.log("CoursePrice -> offer:", offer);

  return (
    <div
      className={`relative flex flex-col items-start space-y-1 ${className}`}
    >
      {/* Precio anterior con texto */}
      {offer !== undefined && offer > 0 && (
        <div className="flex items-center text-sm text-gray-500 space-x-2">
          <span className="line-through">
            €{amount.toLocaleString("es-ES")}
          </span>
          <span className="italic text-xs">Precio escuela</span>
        </div>
      )}

      {/* Precio actual */}
      {offer ? (
        <span className="text-3xl font-extrabold text-[#16A349]">
          €{offer.toLocaleString("es-ES")}
        </span>
      ) : (
        <span className="text-3xl font-extrabold text-black">
          €{amount.toLocaleString("es-ES")}
        </span>
      )}

      {/* Texto debajo */}
      {htmlText && (
        <p className="text-[0.65rem] text-gray-900 leading-relaxed tracking-wide max-w-md italic">
          {htmlText}
        </p>
      )}

      {/* Icono de información con tooltip */}
      {type === "Work" && offer && (
        <div className="absolute right-0 top-0">
          <div
            className="relative flex items-center"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <span className="ml-1 text-xs cursor-pointer mr-2 italic">
              ¿Qué incluye?
            </span>
            <Info className="h-4 w-4 text-gray-500 hover:text-gray-700 cursor-pointer" />
          </div>
          {showTooltip && (
            <div className="absolute right-0 mt-2 w-64 p-3 rounded-lg shadow-lg bg-[#5272FC] border text-xs text-white z-10">
              <div className="absolute -top-2 right-3 w-3 h-3 bg-[#5272FC] border-l border-t rotate-45"></div>
              {details}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoursePrice;
