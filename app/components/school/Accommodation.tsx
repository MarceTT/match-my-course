import React from "react";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

interface AccommodationOption {
  type: string;
  image: string;
  description: string;
  priceLevel: number;
}

const Accommodation = () => {
  const accommodations: AccommodationOption[] = [
    {
      type: "Host Family",
      image: "/images/placeholder_img.svg",
      description:
        "Ideal si quieres incluir comidas y vivir con personas irlandesas para comunicarte todos los días",
      priceLevel: 3,
    },
    {
      type: "Accommodation",
      image: "/images/placeholder_img.svg",
      description:
        "Ideal si quieres independencia y vivir con otros estudiantes.",
      priceLevel: 3,
    },
    {
      type: "Residencia",
      image: "/images/placeholder_img.svg",
      description:
        "Ideal si quieres independencia y vivir con otros estudiantes. Incluye zonas de recreación y estudio.",
      priceLevel: 3,
    },
  ];
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Alojamiento de la escuela</h3>
      <div className="grid grid-cols-2 gap-8">
        {accommodations.map((option, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src={option.image || "/placeholder.svg"}
                alt={option.type}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="text-gray-600 font-medium mt-2 text-center">
              {"$".repeat(option.priceLevel)}
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <IoMdCheckmarkCircleOutline className="w-4 h-4 text-gray-600" />
                <h4 className="font-medium">{option.type}</h4>
              </div>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accommodation;
