"use client";

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface LocationProps {
  schoolName: string;
  city: string;
  minutesToCenter: number;
  transportIcon: React.ReactNode;
}

const Location = ({
  schoolName,
  city,
  minutesToCenter,
  transportIcon,
}: LocationProps) => {
  const query = `${schoolName}, ${city}`;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const mapSrc = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(query)}`
    : null;

  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;

  return (
    <div className="mb-8 lg:mb-16 xl:mb-16">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left text-black">
        Ubicación de la escuela en {city}
      </h2>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-600">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {transportIcon}
          </motion.div>
          <span>{minutesToCenter} minutos al centro de la ciudad</span>
        </div>

        <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
          {mapSrc ? (
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Mapa no disponible
            </div>
          )}
        </div>

        <div className="text-right">
          <Link
            href={externalMapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-2"
            >
              {transportIcon}
              Ver en Google Maps
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Location;
