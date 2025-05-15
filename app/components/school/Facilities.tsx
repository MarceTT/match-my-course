import { PiChairFill } from "react-icons/pi";
import { Installations } from "@/app/types/index";
import { BiAccessibility } from "react-icons/bi";
import { FaGamepad } from "react-icons/fa";
import { GiBookmarklet } from "react-icons/gi";
import { FaUsersGear } from "react-icons/fa6";

interface FacilitiesProps {
  installations: Installations;
}

const Facilities = ({ installations }: FacilitiesProps) => {
  if (!installations) return null;

  const groupedFacilities = [
    {
      title: "Área académica",
      icon: <GiBookmarklet className="w-9 h-9" />,
      items: [
        installations.biblioteca && "Biblioteca",
        installations.laboratorioInformatica && "Laboratorio digital",
        installations.areasAutoaprendizaje && "Área de autoaprendizaje",
      ],
    },
    {
      title: "Servicios generales",
      icon: <FaUsersGear className="w-9 h-9" />,
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
      icon: <FaGamepad className="w-9 h-9" />,
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
      icon: <PiChairFill className="w-9 h-9" />,
      items: [
        installations.pizarraDigital &&
          `Pizarra digital: ${installations.pizarraDigital}`,
        installations.tv && `Televisión: ${installations.tv}`,
        installations.calefaccion &&
          `Calefacción: ${installations.calefaccion}`,
      ],
    },
    {
      title: "Accesibilidad",
      icon: <BiAccessibility className="w-9 h-9" />,
      items: [
        installations.accesoSillasRuedas && "Ingreso para discapacitados",
        installations.wcMinusvalidos && "WC para minusválidos",
        installations.elevators && "Ascensor",
      ],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center md:text-left text-black">
        Instalaciones y servicios de la escuela
      </h1>
      <div className="grid md:grid-cols-2 gap-12">
        {groupedFacilities.map(
          ({ title, icon, items }) =>
            items.filter(Boolean).length > 0 && (
              <div
                key={title}
                className="flex flex-col items-start md:items-start"
              >
                <div className="flex items-center gap-2 mb-2 font-semibold underline">
                  {icon}
                  <h2 className="whitespace-nowrap">{title}</h2>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 font-medium italic text-sm">
                  {items.filter(Boolean).map((item, idx) => (
                    <li key={idx} className="leading-snug break-words">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default Facilities;
