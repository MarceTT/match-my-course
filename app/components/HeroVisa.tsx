import React from 'react'
import Image from 'next/image'
import Picture from "../../public/images/placeholder_img.svg";
import {raleway}from "../ui/fonts";

const HeroVisa = () => {

    const profiles = [
        { src: Picture, alt: "Perfil estudiante 1" },
        { src: Picture, alt: "Perfil estudiante 2" },
        { src: Picture, alt: "Perfil estudiante 3" },
        { src: Picture, alt: "Perfil estudiante 4" },
        { src: Picture, alt: "Perfil estudiante 5" },
        { src: Picture, alt: "Perfil estudiante 6" },
      ]

  return (
    <div className="relative bg-gray-50 overflow-hidden py-16 lg:py-20">
      {/* Curved background shape */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200"
        style={{
          clipPath: 'polygon(100% 0%, 0% 0% , 0.00% 88.23%, 1.67% 91.94%, 3.33% 94.63%, 5.00% 96.21%, 6.67% 96.66%, 8.33% 95.96%, 10.00% 94.12%, 11.67% 91.20%, 13.33% 87.27%, 15.00% 82.42%, 16.67% 76.77%, 18.33% 70.46%, 20.00% 63.64%, 21.67% 56.49%, 23.33% 49.19%, 25.00% 41.90%, 26.67% 34.81%, 28.33% 28.09%, 30.00% 21.92%, 31.67% 16.43%, 33.33% 11.77%, 35.00% 8.06%, 36.67% 5.37%, 38.33% 3.79%, 40.00% 3.34%, 41.67% 4.04%, 43.33% 5.88%, 45.00% 8.80%, 46.67% 12.73%, 48.33% 17.58%, 50.00% 23.23%, 51.67% 29.54%, 53.33% 36.36%, 55.00% 43.51%, 56.67% 50.81%, 58.33% 58.10%, 60.00% 65.19%, 61.67% 71.91%, 63.33% 78.08%, 65.00% 83.57%, 66.67% 88.23%, 68.33% 91.94%, 70.00% 94.63%, 71.67% 96.21%, 73.33% 96.66%, 75.00% 95.96%, 76.67% 94.12%, 78.33% 91.20%, 80.00% 87.27%, 81.67% 82.42%, 83.33% 76.77%, 85.00% 70.46%, 86.67% 63.64%, 88.33% 56.49%, 90.00% 49.19%, 91.67% 41.90%, 93.33% 34.81%, 95.00% 28.09%, 96.67% 21.92%, 98.33% 16.43%, 100.00% 11.77%)'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`${raleway.className} text-3xl lg:text-5xl font-black text-gray-800 mb-4`}>
            Asesoría gratuita para
            <div className={`${raleway.className} text-3xl lg:text-5xl font-black text-gray-800 mb-4`}>la visa de estudio y trabajo</div>
          </h2>
          <p className={`${raleway.className} text-lg lg:text-xl text-gray-900 mb-8 font-light`}>
            Verifica si la visa de estudio de inglés y trabajo es para ti y si cumples o no con los requisitos y lo que se vendrá en destino
          </p>
          
          {/* Profile images */}
          <div className="flex justify-center items-center space-x-4 overflow-hidden">
            {profiles.map((profile, index) => (
              <div 
                key={index} 
                className="w-16 h-16 md:w-40 md:h-36 rounded-md overflow-hidden border-2 border-white shadow-md"
              >
                <Image
                  src={profile.src || "/placeholder.svg"}
                  alt={profile.alt}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroVisa