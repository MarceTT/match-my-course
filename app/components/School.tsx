import { LuHeart } from "react-icons/lu";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { nunito } from "../ui/fonts";
import Link from "next/link";

interface SchoolCardProps {
  _id: string;
  name: string;
  image: string | StaticImageData; // Permitir ambos tipos
  location: string;
  rating: number;
  price: number;
  priority?: boolean;
  lowestPrice?: number;
}

const School = ({
  _id,
  name,
  image,
  location,
  rating,
  price,
  priority,
  lowestPrice,
}: SchoolCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full">
      <Link href={`/school-detail/${_id}`}>
        <div className="block">
          <div className="relative">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              width={1000}
              height={1000}
              className="w-full h-64 object-cover"
              loading={priority ? "eager" : "lazy"}
              priority={priority}
            />
            {/* <button className="absolute bottom-4 right-4 p-2 bg-[#F15368] rounded-full shadow-md">
              <LuHeart className="h-5 w-5 text-white fill-white" />
            </button> */}
          </div>
          <div className="p-6 flex flex-col justify-between flex-grow">
            <h3 className="font-semibold text-xl mb-2">{name}</h3>
            <div className="flex items-center gap-2 lg:justify-between mb-1">
              <span className="text-sm text-gray-600">
                Opiniones de estudiantes:
              </span>
              <div className="flex items-center">
                <span className="text-sm font-semibold">
                  {parseFloat(String(rating ?? 0)).toFixed(1)}
                </span>
                <span className="text-yellow-400 ml-1">★</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Ciudad: {location}</p>
            <div className="mt-4">
              {lowestPrice !== undefined ? (
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                  <div className="text-left">
                    <span className="text-gray-500 text-sm">Desde</span>
                    <div className="flex items-baseline gap-1">
                      <span className={`${nunito.className} text-2xl font-bold text-blue-600`}>
                        €{lowestPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600">/ semana</span>
                    </div>
                  </div>
                  {price && price !== lowestPrice && (
                    <div className="text-right text-sm text-gray-400 line-through">
                      €{price.toLocaleString()}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 italic text-sm">Precio no disponible</div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default School;
