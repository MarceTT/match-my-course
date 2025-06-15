import { Installations } from "@/lib/types";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { motion } from "framer-motion";

interface FacilitiesProps {
  installations: Installations;
}

const Facilities = ({ installations }: FacilitiesProps) => {
  if (!installations) return null;

  const groupedFacilities = [
    {
      title: "Área académica",
      image: rewriteToCDN("https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/iconos+sitio/a%CC%81rea+de+estudio.svg"),
      items: [
        installations.biblioteca && "Biblioteca",
        installations.laboratorioInformatica && "Laboratorio digital",
        installations.areasAutoaprendizaje && "Área de autoaprendizaje",
      ],
    },
    {
      title: "Servicios generales",
      image: rewriteToCDN("https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/iconos+sitio/APOYO+ESTUDIANNTE.svg"),
      items: [
        installations.microondas && "Microondas",
        installations.nevera && "Nevera",
        installations.maquinaExpendedora && "Máquina expendedora",
        installations.dispensadorAgua && "Dispensador de agua",
        installations.impresoraFotocopiadora && "Impresora/fotocopiadora",
        installations.freeWifi && "Wifi",
      ],
    },
    {
      title: "Áreas comunes y recreativas",
      image: rewriteToCDN("https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/iconos+sitio/RECREACIO%CC%81N.svg"),
      items: [
        installations.cafeteria && "Cafetería",
        installations.restaurante && "Restaurante",
        installations.cocinaEstudiantes && "Cocina para estudiantes",
        installations.salaJuegosRecreacion && "Sala de juegos/recreación",
        installations.jardin && "Jardín",
        installations.terrazaAzotea && "Terraza",
        installations.salon && "Salón",
      ],
    },
    {
      title: "Equipamiento de las aulas",
      image: rewriteToCDN("https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/iconos+sitio/computer.svg"),
      items: [
        installations.pizarraDigital && `Pizarra digital: ${installations.pizarraDigital}`,
        installations.tv && `Televisión: ${installations.tv}`,
        installations.calefaccion && `Calefacción: ${installations.calefaccion}`,
      ],
    },
    {
      title: "Accesibilidad",
      image: rewriteToCDN("https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/iconos+sitio/silla+ruedas.svg"),
      items: [
        installations.accesoSillasRuedas && "Ingreso para discapacitados",
        installations.wcMinusvalidos && "WC para minusválidos",
        installations.elevators && "Ascensor",
      ],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-10 px-4 lg:px-0 xl:px-0">
      <h1 className="text-2xl font-bold mb-8 text-center md:text-left text-black">
        Instalaciones y servicios de la escuela
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {groupedFacilities.map(
          ({ title, image, items }, i) =>
            items.filter(Boolean).length > 0 && (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center md:items-start text-center md:text-left p-6 bg-white rounded-2xl shadow-md"
              >
                <div className="flex flex-col items-center md:flex-row md:items-center gap-2 mb-4">
                  <Image
                    src={image}
                    alt={title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <h2 className="text-lg font-semibold underline mt-2 md:mt-0">{title}</h2>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 font-medium italic text-sm max-w-xs md:max-w-none">
                  {items.filter(Boolean).map((item, idx) => (
                    <li key={idx} className="leading-snug break-words">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
        )}
      </div>
    </section>
  );
};

export default Facilities;
