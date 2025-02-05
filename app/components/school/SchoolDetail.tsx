"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LuHeart } from "react-icons/lu";
import { IoShareOutline } from "react-icons/io5";
import type { StaticImageData } from "next/image";
import { raleway } from "../../ui/fonts";

interface SchoolHeaderProps {
  images: string[] | StaticImageData[];
  name: string;
  city: string;
  address: string;
  founded: string;
  priceLevel: number;
}

const SchoolDetail = ({
  images,
  name,
  city,
  address,
  founded,
  priceLevel,
}: SchoolHeaderProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">{city}, Ireland</h1>

      {/* Image Grid */}
      <div className="grid grid-cols-6 grid-rows-2 gap-2 mb-6">
        <div className="col-span-3 row-span-1">
          <div className="relative aspect-[3/2] w-full">
            <Image
              src={images[0] || "/placeholder.svg"}
              alt="School classroom"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="col-span-3 row-span-1">
          <div className="relative aspect-[3/2] w-full">
            <Image
              src={images[1] || "/placeholder.svg"}
              alt="School common area"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="col-span-2 row-span-1">
          <div className="relative aspect-[3/2] w-full h-full">
            <Image
              src={images[2] || "/placeholder.svg"}
              alt="School study room"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="col-span-2 row-span-1">
          <div className="relative aspect-[3/2] w-full h-full">
            <Image
              src={images[3] || "/placeholder.svg"}
              alt="School computer lab"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="col-span-2 row-span-1">
          <div className="relative aspect-[3/2] w-full h-full">
            <Image
              src={images[4] || "/placeholder.svg"}
              alt="School building exterior"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* School Info */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className={`${raleway.className} text-xl md:text-2xl lg:text-5xl xl:text-5xl font-black`}>
              {name}
            </h2>
            <div className="text-lg">
              {"$".repeat(priceLevel)}
              <span className="text-gray-300">
                {"$".repeat(3 - priceLevel)}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="text-lg">
              <span className="font-extrabold">Ciudad:</span> {city}
            </div>
            <div className="text-lg">
              <span className="font-extrabold">Dirección:</span> {address}
            </div>
            <div className="text-lg">
              <span className="font-extrabold">Fundación:</span> {founded}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="grid grid-rows-1 gap-2 lg:flex lg:items-center lg:gap-2">
            <Button className="bg-[#F15368] hover:bg-[#F15368]/90 rounded-full w-8 h-8 p-0">
              <LuHeart className="w-5 h-5 text-white fill-white" />
            </Button>
            <span className="text-sm text-gray-600 font-semibold">Guardar</span>
          </div>
          <div className="grid grid-rows-1 gap-2 lg:flex lg:items-center lg:gap-2">
            <Button variant="outline" className="rounded-full w-8 h-8 p-0">
              <IoShareOutline className="w-5 h-5 fill-gray-600" />
            </Button>
            <span className="text-sm text-gray-600 font-semibold">Compartir</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetail;
