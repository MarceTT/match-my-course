"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface DestinationCardProps {
  image: string;
  country: string;
  flags?: string[];
  href: string;
  modality: string;
}

const DestinationCard = ({
  image,
  country,
  flags,
  href,
  modality,
}: DestinationCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300 h-[420px] flex flex-col">
      <div className="relative h-64 p-4">
        <div className="absolute inset-4 bg-white rounded-2xl overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={`Estudiar y trabajar en ${country}`}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-extrabold text-md text-gray-800 leading-tight">
            ASESORÍA - ESTUDIAR Y<br />
            TRABAJAR EN {country.toUpperCase()}
          </h3>
          {modality && (
            <span className="inline-block bg-orange-100 text-black text-xs font-semibold px-2 py-1 rounded bg-gradient-to-r from-[#ffefb6] via-[#FFCACF] to-[#FFAEF4]">
              {modality}
            </span>
          )}
        </div>
        {flags && flags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex gap-1 mb-3"
          >
            {flags.map((flag, index) => (
              <Image
                key={index}
                src={`https://flagcdn.com/w40/${flag}.png`}
                alt={`Bandera de ${flag}`}
                width={40}
                height={30}
                className="rounded-sm"
              />
            ))}
          </motion.div>
        )}
        <Button
          variant="outline"
          className="w-full text-gray-700 hover:bg-gray-50 mt-4"
          asChild
        >
          <a href={href}>Ver asesoría</a>
        </Button>
      </div>
    </div>
  );
};

export default DestinationCard;
