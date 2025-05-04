import { LuHeart } from "react-icons/lu";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { nunito } from "../ui/fonts";
import Link from "next/link";
import { usePrefetchSchoolDetails } from "@/app/hooks/usePrefetchSchoolDetails";

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
  priority,
  lowestPrice,
}: SchoolCardProps) => {
  const prefetchSchool = usePrefetchSchoolDetails();
  const handlePrefetch = () => prefetchSchool(_id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-100">
      <Link
        href={`/school-detail/${_id}`}
        onMouseEnter={handlePrefetch}
        onTouchStart={handlePrefetch}
        className="flex flex-col h-full"
      >
        <div className="relative w-full h-52 sm:h-64">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover object-center"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />
        </div>

        <div className="flex flex-col flex-grow p-4 gap-2">
          <h3 className="text-lg sm:text-xl font-semibold leading-tight line-clamp-2">
            {name}
          </h3>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Opiniones:</span>
            <div className="flex items-center gap-1">
              <span className="font-semibold">{rating.toFixed(1)}</span>
              <span className="text-yellow-400">★</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 line-clamp-1">Ciudad: {location}</p>

          <div className="mt-auto">
            {typeof lowestPrice === "number" && lowestPrice > 0 ? (
              <div className="flex flex-wrap items-center gap-1 text-left">
                <span className="text-sm text-gray-500 font-medium">Desde</span>
                <span
                  className={`${nunito.className} text-xl sm:text-2xl font-extrabold text-blue-600`}
                >
                  €{lowestPrice.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">/ semana</span>
              </div>
            ) : (
              <div className="text-gray-400 italic text-sm">Precio no disponible</div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default School;
