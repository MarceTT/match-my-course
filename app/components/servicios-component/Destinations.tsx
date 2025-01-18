import React from "react";
import DestinationCard from "./DestinationCard";
import Imagen from "../../../public/images/placeholder_img.svg";

const Destinations = () => {
  const destinations = [
    {
      country: "Irlanda",
      image: Imagen,
      flags: ['ie'],
      href: "/asesoria/irlanda",
      modality: "Gratis",
    },
    {
      country: "Nueva Zelanda",
      image: Imagen,
      flags: ['nz'],
      href: "/asesoria/nueva-zelanda",
      modality: "Gratis",
    },
    {
      country: "Malta",
      image: Imagen,
      flags: ['mt'],
      href: "/asesoria/malta",
      modality: "Gratis",
    },
    {
      country: "Evaluamos tu caso",
      image: Imagen,
      flags: ['ie', 'gb', 'fr'],
      href: "/evaluacion",  
      modality: "",
    },
  ];
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <DestinationCard key={index} {...destination} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
