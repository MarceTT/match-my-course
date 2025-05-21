import React from "react";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SchoolAccommodation, AccomodationDetail } from '../../lib/types';

interface AccommodationProps {
  accommodations: SchoolAccommodation[];
  detailAccomodation: AccomodationDetail[];
}

const Accommodation = ({ accommodations, detailAccomodation }: AccommodationProps) => {
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
          <h3 className="text-lg font-bold">{type}</h3>
        </div>
      </div>
      <p className="text-sm mb-3">{detail}</p>
    </div>
  );

  return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-12 text-center md:text-left text-black">
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
  );
};

export default Accommodation;
