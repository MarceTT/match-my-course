import Image from "next/image";
import Picture from "../../../../public/images/placeholder_img.svg";
import {raleway }from "../../../ui/fonts";

const Hero = () => {

  return (
    <div className="relative bg-gray-50 overflow-hidden py-12 lg:py-10">
      {/* Curved background shape */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200"
        style={{
          clipPath: 'polygon(100% 0%, 0% 0% , 0.00% 88.23%, 1.67% 91.94%, 3.33% 94.63%, 5.00% 96.21%, 6.67% 96.66%, 8.33% 95.96%, 10.00% 94.12%, 11.67% 91.20%, 13.33% 87.27%, 15.00% 82.42%, 16.67% 76.77%, 18.33% 70.46%, 20.00% 63.64%, 21.67% 56.49%, 23.33% 49.19%, 25.00% 41.90%, 26.67% 34.81%, 28.33% 28.09%, 30.00% 21.92%, 31.67% 16.43%, 33.33% 11.77%, 35.00% 8.06%, 36.67% 5.37%, 38.33% 3.79%, 40.00% 3.34%, 41.67% 4.04%, 43.33% 5.88%, 45.00% 8.80%, 46.67% 12.73%, 48.33% 17.58%, 50.00% 23.23%, 51.67% 29.54%, 53.33% 36.36%, 55.00% 43.51%, 56.67% 50.81%, 58.33% 58.10%, 60.00% 65.19%, 61.67% 71.91%, 63.33% 78.08%, 65.00% 83.57%, 66.67% 88.23%, 68.33% 91.94%, 70.00% 94.63%, 71.67% 96.21%, 73.33% 96.66%, 75.00% 95.96%, 76.67% 94.12%, 78.33% 91.20%, 80.00% 87.27%, 81.67% 82.42%, 83.33% 76.77%, 85.00% 70.46%, 86.67% 63.64%, 88.33% 56.49%, 90.00% 49.19%, 91.67% 41.90%, 93.33% 34.81%, 95.00% 28.09%, 96.67% 21.92%, 98.33% 16.43%, 100.00% 11.77%)'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content Section */}
          <div className="ww-full lg:w-3/5 xl:w-2/3 mx-auto max-w-2xl">
            <div className="bg-transparent backdrop-blur-sm rounded-3xl p-8 lg:p-12">
              <h1 className={`${raleway.className} text-4xl lg:text-5xl font-black text-gray-800 leading-tight mb-6`}>
                Encuentra la mejor
                <div className="text-3xl lg:text-4xl mt-2 font-bold">escuela de inglés para ti</div>
              </h1>
              <p className="text-gray-700 text-lg lg:text-xl mb-8">
                Sea para cursos de inglés de corta o larga duración,
                para preparación de exámenes o más
              </p>
              <div className="flex flex-col sm:flex-row bg-white bg-opacity-80 rounded-2xl sm:rounded-full p-2 shadow-sm space-y-2 sm:space-y-0">
                <div className="relative flex-1 sm:border-r border-gray-200">
                  <select className="w-full px-6 py-3 rounded-l-full bg-transparent text-gray-700 appearance-none focus:outline-none">
                    <option>Elige un país</option>
                    <option>España</option>
                    <option>Reino Unido</option>
                    <option>Estados Unidos</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
                <div className="relative flex-2 sm:border-r border-gray-200">
                  <select className="w-full px-6 py-3 bg-transparent text-gray-700 appearance-none focus:outline-none">
                    <option>Tipo de curso de inglés</option>
                    <option>General</option>
                    <option>Intensivo</option>
                    <option>Preparación de exámenes</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
                <div className="relative flex-1">
                  <select className="w-full px-6 py-3 rounded-r-full bg-transparent text-gray-700 appearance-none focus:outline-none">
                    <option>Duración</option>
                    <option>2 semanas</option>
                    <option>1 mes</option>
                    <option>3 meses</option>
                    <option>6 meses</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="hidden lg:block w-full lg:w-2/5 xl:w-1/3">
            <div className="relative aspect-[4/3] lg:aspect-[3/4]">
              <Image
                src={Picture}
                alt="Collage de imágenes de escuelas y estudiantes"
                layout="fill"
                objectFit="cover"
                className="rounded-3xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
