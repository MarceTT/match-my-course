import { LuHeart } from "react-icons/lu";
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { nunito } from "../ui/fonts";

interface SchoolCardProps {
    name: string
    image: string | StaticImageData; // Permitir ambos tipos
    location: string
    rating: number
    price: number
  }

const School = ({ name, image, location, rating, price }: SchoolCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full">
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-64 object-cover"
        />
        <button className="absolute bottom-4 right-4 p-2 bg-[#F15368] rounded-full shadow-md">
          <LuHeart className="h-5 w-5 text-white fill-white" />
        </button>
      </div>
      <div className="p-6 flex flex-col justify-between flex-grow">
        <h3 className="font-semibold text-xl mb-2">{name}</h3>
        <div className="flex items-center gap-2 lg:justify-between mb-1">
          <span className="text-sm text-gray-600">Opiniones de estudiantes:</span>
          <div className="flex items-center">
            <span className="text-sm font-semibold">{rating}</span>
            <span className="text-yellow-400 ml-1">★</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">Ciudad: {location}</p>
        <div className="flex items-center gap-2 mt-4">
        <span className={`${nunito.className} font-bold text-2xl`}>€{price}</span>
          <span className="text-md text-gray-900">semana</span>
        </div>
      </div>
    </div>
  )
}

export default School