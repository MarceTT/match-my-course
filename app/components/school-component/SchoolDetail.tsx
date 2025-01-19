'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { LuHeart } from "react-icons/lu";
import type { StaticImageData } from 'next/image';
import { raleway } from "../../ui/fonts";


interface SchoolHeaderProps {
    images: string[] | StaticImageData[];
    name: string
    city: string
    address: string
    founded: string
    priceLevel: number
  }
  
const SchoolDetail = ({ images, name, city, address, founded, priceLevel }: SchoolHeaderProps) => {
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
          <div className="relative aspect-[3/2] w-full">
            <Image
              src={images[2] || "/placeholder.svg"}
              alt="School study room"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="col-span-2 row-span-1">
          <div className="relative aspect-[3/2] w-full">
            <Image
              src={images[3] || "/placeholder.svg"}
              alt="School computer lab"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="col-span-2 row-span-1">
          <div className="relative aspect-[3/2] w-full">
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
            <h2 className={`${raleway.className} text-5xl font-black`}>{name}</h2>
            <div className="text-lg">
              {'$'.repeat(priceLevel)}
              <span className="text-gray-300">{'$'.repeat(3 - priceLevel)}</span>
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div><span className="font-semibold">Ciudad:</span> {city}</div>
            <div><span className="font-semibold">Dirección:</span> {address}</div>
            <div><span className="font-semibold">Fundación:</span> {founded}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className='bg-[#F15368] rounded-full'>
            <LuHeart className="w-4 h-4 mr-2 text-white fill-white" />
            Guardar
          </Button>
          <Button variant="outline" size="sm">
            Compartir
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SchoolDetail