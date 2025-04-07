import { LuHeart } from "react-icons/lu";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { nunito } from "../ui/fonts";
import Link from "next/link";

interface SchoolCardProps {
  _id: string;
  name: string;
  image: string | StaticImageData;
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
    <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full hover:shadow-lg transition-shadow">
      <Link href={`/school-detail/${_id}`}>
        <div className="block">
          <div className="relative">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              width={1000}
              height={1000}
              className="w-full h-52 sm:h-64 object-cover"
              loading={priority ? "eager" : "lazy"}
              priority={priority}
            />
          </div>

          <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow gap-2">
            <h3 className="font-semibold text-lg sm:text-xl">{name}</h3>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Opiniones:</span>
              <div className="flex items-center gap-1">
                <span className="font-semibold">
                  {parseFloat(String(rating ?? 0)).toFixed(1)}
                </span>
                <span className="text-yellow-400">★</span>
              </div>
            </div>

            <p className="text-sm text-gray-600">Ciudad: {location}</p>

            <div className="mt-auto">
              {typeof lowestPrice === "number" && lowestPrice > 0 ? (
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-left">
                  <span className="text-sm sm:text-base text-gray-500 font-medium">Desde</span>
                  <span className={`${nunito.className} text-lg sm:text-2xl font-extrabold text-blue-600`}>
                    €{lowestPrice.toLocaleString()}
                  </span>
                  <span className="text-sm sm:text-base text-gray-600">/ semana</span>
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
