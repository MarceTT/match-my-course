import React from "react";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SchoolAccommodation, AccomodationDetail } from '../../../lib/types';
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

interface AccommodationProps {
  accommodations: SchoolAccommodation[];
  detailAccomodation: AccomodationDetail[];
}

const Accommodation = ({ accommodations, detailAccomodation }: AccommodationProps) => {
  const renderOption = (type: string, detail: string, imageSrc: string) => (
    <div key={type} className="flex flex-col items-center md:items-start text-center md:text-left">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-3">
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
      <p className="text-sm mb-3 max-w-xs md:max-w-none">{detail}</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 lg:px-0 xl:px-0">
      <h1 className="text-2xl font-bold mb-12 text-center justify-start md:text-left text-black">
        ¿Qué alojamiento te ofrece la escuela?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {accommodations.map((school) => (
          <React.Fragment key={school._id}>
            {school.hostFamily &&
              renderOption(
                "Host Family",
                school.detalleHostFamily,
                rewriteToCDN("https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Host+family.png")
              )}

            {school.accommodation &&
              renderOption(
                "Vivienda compartida",
                school.detalleAccommodation,
                rewriteToCDN("https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Residencia+de+estudiantes.png")
              )}

            {school.residenciaEstudiantes &&
              renderOption(
                "Residencia",
                school.detalleResidencia,
                rewriteToCDN("https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Accommodation.png")
              )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Accommodation;