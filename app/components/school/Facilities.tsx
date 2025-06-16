"use client";


import { Installations } from "@/app/lib/types";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

interface FacilitiesProps {
  installations: Installations;
}

const Facilities = ({ installations }: FacilitiesProps) => {
  if (!installations) return null;

  const [expandedItem, setExpandedItem] = useState<string>("Área académica");

  const groupedFacilities = [
    {
      title: "Área académica",
      icon: "área+de+estudio.svg",
      items: [
        installations.biblioteca && "Biblioteca",
        installations.computadoresEstudiantes && "Computadores para estudiantes",
      ],
    },
    {
      title: "Equipamiento de aulas",
      icon: "computer.svg",
      items: [
        installations.pizarraDigital && "Pizarra digital en salas",
        installations.television && "TV salas de clase",
        installations.dataShow && "Data show",
        installations.calefaccion && "Calefacción y extractores",
      ],
    },
    {
      title: "Áreas de alimentación",
      icon: "SALON+DE+COMIDA.svg",
      items: [
        installations.cafeteria && "Cafetería",
        installations.restaurante && "Restaurante",
        installations.salonAlmorzar && "Salón para almorzar",
      ],
    },
    {
      title: "Servicios de alimentación",
      icon: "refrigerator.svg",
      items: [
        installations.microondas && "Microondas",
        installations.refrigerador && "Refrigerador",
        installations.lavaplatos && "Lavaplatos",
        installations.maquinaCafe && "Máquina de café",
        installations.maquinaAlimentos && "Dispensador de alimentos",
        installations.dispensadorAgua && "Dispensadores",
      ],
    },
    {
      title: "Otros servicios",
      icon: "APOYO+ESTUDIANNTE.svg",
      items: [
        installations.impresoraFotocopiadora && "Impresora/fotocopiadora",
        installations.freeWifi && "WiFi",
        installations.bikepark && "Estacionamiento",
        installations.juegosRecreativos && "Juegos recreativos",
        installations.jardin && "Jardín",
        installations.terraza && "Terraza",
        installations.instalacionDeportiva && "Área deportiva",
      ],
    },
    {
      title: "Accesibilidad",
      icon: "silla+ruedas.svg",
      items: [
        installations.ascensor && "Ascensor",
        installations.aulasSillaRuedas && "Acceso diversidad funcional",
      ],
    },
    {
      title: "Área fumadores",
      icon: "FUMADORES.svg", // Considera cambiar por un icono más apropiado
      items: [
        installations.areaFumadores && "Área fumadores",
      ],
    }
  ];

  const handleAccordionChange = (title: string) => {
    setExpandedItem(prev => prev === title ? "" : title);
  };

  return (
    <section className="max-w-7xl mx-auto py-10 px-4 lg:px-0 xl:px-0">
      <h1 className="text-2xl font-bold mb-8 text-center md:text-left text-black">
        Instalaciones y servicios de la escuela
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groupedFacilities.map(
          ({ title, icon, items }, i) =>
            items.filter(Boolean).length > 0 && (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <Accordion 
                    type="single" 
                    value={expandedItem} 
                    onValueChange={handleAccordionChange}
                    collapsible
                  >
                    <AccordionItem value={title} className="border-0">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]>svg]:rotate-180 w-full">
                        <div className="flex items-center gap-4 w-full">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <Image
                              src={rewriteToCDN(`https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/iconos+sitio/${icon}`)}
                              alt={title}
                              width={28}
                              height={28}
                            />
                          </div>
                          <div className="text-left flex-1">
                            <h2 className="font-semibold text-gray-800">{title}</h2>
                            <p className="text-sm text-gray-500 mt-1">
                              {items.filter(Boolean).length} servicios disponibles
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      
                      <AccordionContent className="px-6 pb-4 pt-0">
                        <ul className="space-y-3">
                          {items.filter(Boolean).map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </motion.div>
            )
        )}
      </div>
    </section>
  );
};

export default Facilities;