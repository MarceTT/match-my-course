import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { VscError } from "react-icons/vsc";

interface CertificationOption {
  title: string;
  description: string;
  type: "academic" | "general" | "interactive";
}

const OptionsCertification = () => {
  const certifications: CertificationOption[] = [
    {
      title: "IELTS Académico",
      description:
        "Si deseas ingresar a universidades y/o programas académicos posteriores a tu estudio.",
      type: "academic",
    },
    {
      title: "IELTS General",
      description:
        "Ideal para temas migratorios, empleo o estudios no académicos en países de habla inglesa u otros.",
      type: "general",
    },
    {
      title: "Cambridge",
      description:
        "Precisarás una certificación internacional para demostrar un nivel específico y te enfocas en lograr a expresarte a largo plazo. (Key, PET, FCE, CAE o CPE)",
      type: "general",
    },
    {
      title: "TIE - Test of Interactive English",
      description:
        "Útil si tu objetivo principal es renovar tu visa en Irlanda o medir tu progreso en inglés mientras estudias allí.",
      type: "general",
    },
    {
      title: "Trinity College - ISE",
      description:
        "Para estudios académicos (aceptado en universidades y visas en algunos países como Reino Unido).",
      type: "academic",
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">
        ¿Qué certificación podrás obtener al terminar?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              cert.type === "academic"
                ? "bg-red-50 border border-red-200"
                : "bg-green-50 border border-green-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {cert.type === "academic" ? (
                <span className="text-red-600">
                  <VscError className="w-6 h-6" />
                </span>
              ) : (
                <span className="text-green-600">
                  <IoMdCheckmarkCircleOutline className="w-6 h-6" />
                </span>
              )}
              <h4 className="font-semibold mb-2 mt-2">{cert.title}</h4>
            </div>
            <p className="text-sm text-gray-600 text-justify">{cert.description}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-900 mt-4 italic">
        *Podrás elegir tu examen de salida una vez que pagues la reserva
      </p>
    </div>
  );
};

export default OptionsCertification;
