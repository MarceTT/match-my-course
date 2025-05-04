import React from "react";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SchoolAccommodation, AccomodationDetail } from '../../types/index';

interface AccommodationProps {
  accommodations: SchoolAccommodation[];
  detailAccomodation: AccomodationDetail[];
}

const Accommodation = ({ accommodations, detailAccomodation }: AccommodationProps) => {
  console.log(detailAccomodation);
  const renderOption = (type: string, detail: string, imageSrc: string) => (
    <div key={type} className="flex flex-col">
      <div className="flex items-start gap-4 mb-3">
        <Image
          src={imageSrc}
          alt={type}
          width={90}
          height={90}
          className="rounded-lg object-cover"
        />
        <div className="flex items-center gap-2">
          <IoMdCheckmarkCircleOutline className="w-6 h-6 text-black rounded-full bg-white" />
          <h3 className="text-xl font-bold">{type}</h3>
        </div>
      </div>
      <p className="text-base mb-3">{detail}</p>
      <div className="mt-auto">
        <span className="text-2xl font-bold">$$$</span>
        <span className="text-2xl font-bold text-gray-300">$</span>
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          ¿Qué alojamiento te ofrece la escuela?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {accommodations.map((school) => (
            <React.Fragment key={school._id}>
              {school.hostFamily &&
                renderOption(
                  "Host Family",
                  school.detalleHostFamily,
                  "/images/placeholder_img.svg"
                )}

              {school.accommodation &&
                renderOption(
                  "Accommodation",
                  school.detalleAccommodation,
                  "/images/placeholder_img.svg"
                )}

              {school.residenciaEstudiantes &&
                renderOption(
                  "Residencia de Estudiantes",
                  school.detalleResidencia,
                  "/images/placeholder_img.svg"
                )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accommodation;
