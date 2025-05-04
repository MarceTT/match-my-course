"use client"

import React from 'react'
import { BsPersonWalking } from "react-icons/bs";

interface LocationProps {
  schoolName: string;
  city: string;
}

const Location = ({ schoolName, city }: LocationProps) => {
  const query = `${schoolName}, ${city}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Ubicación</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-600">
          <BsPersonWalking className="w-5 h-5" />
          <span>9 minutos caminando al centro de la ciudad</span>
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
          <a
            href={externalMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            Ver en Google Maps
          </a>
        </div>
      </div>
    </div>
  )
}

export default Location
