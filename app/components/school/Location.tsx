"use client";

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
import { BsPersonWalking } from "react-icons/bs";

interface LocationProps {
  schoolName: string;
  city: string;
  minutesToCenter: number;
}

const Location = ({ schoolName, city, minutesToCenter }: LocationProps) => {
  const query = `${schoolName}, ${city}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    query
  )}&output=embed`;
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;

  return (
    <div className="mb-8 lg:mb-16 xl:mb-16">
      <h3 className="text-2xl font-bold mb-4 text-black">Ubicación</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-600">
          <BsPersonWalking className="w-5 h-5" />
          <span>
            {minutesToCenter} minutos caminando al centro de la ciudad
          </span>
        </div>

        <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="text-right">
          <Link href={externalMapUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-2"
            >
              <MapPin className="h-4 w-4" />
              Ver en Google Maps
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Location;
