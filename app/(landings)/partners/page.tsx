// app/partners/page.tsx
"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { PartnerCard } from './PartnerCard'
import { getAllPartners } from '@/app/lib/services/partners'
import { Partner } from '@/app/lib/partners'

export default function PartnersPage() {
  const [ partners, setPartners ] = useState<Partner[]>([])

  useEffect(() => {
    async function fetchPartners() {
      const data = await getAllPartners()
      setPartners(data)
    }

    fetchPartners();
  }, []);

  return (
    <>
      <section className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: "url('/landing-pages/Escuelas socias.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            Escuelas Socias
          </h1>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        {/* Section 1 */}
        <div className="container mx-auto px-4 space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold">
              Conocemos las escuelas <br />que ofrecemos 
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Nos caracterizamos por conocer todas nuestras escuelas que ofrecemos para entregarte 
              la información más <br /> actualizada y detallada de cada escuela de inglés. Trabajamos con 
              más de 50 instituciones a nivel internacional.
            </p>
          </div>

          <div className="space-y-6">
            <div className="text-left">
              <h3 className="text-2xl font-semibold">Irlanda</h3>
              <hr className="my-4 border-t-2 border-gray-300 w-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {partners.map((partner, index) =>
                <PartnerCard key={partner.src || index} partner={partner} />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-left">
              <h3 className="text-2xl font-semibold">Nueva Zelanda</h3>
              <hr className="my-4 border-t-2 border-gray-300 w-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {partners.map((partner, index) =>
                <PartnerCard key={partner.src || index} partner={partner} />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-left">
              <h3 className="text-2xl font-semibold">Canadá</h3>
              <hr className="my-4 border-t-2 border-gray-300 w-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {partners.map((partner, index) =>
                <PartnerCard key={partner.src || index} partner={partner} />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-left">
              <h3 className="text-2xl font-semibold">Malta</h3>
              <hr className="my-4 border-t-2 border-gray-300 w-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {partners.map((partner, index) =>
                <PartnerCard key={partner.src || index} partner={partner} />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-left">
              <h3 className="text-2xl font-semibold">Gran Bretaña</h3>
              <hr className="my-4 border-t-2 border-gray-300 w-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {partners.map((partner, index) =>
                <PartnerCard key={partner.src || index} partner={partner} />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 flex items-center flex-col md:flex-row">
          {/* Left side - (empty or could be an image later) */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/partners/schools-for-partners.png"
              alt={`Bandera de Chile`}
              width={700}
              height={700}
              className="rounded-sm"
            />
          </div>

          {/* Right side - Content */}
          <div className="md:w-1/2 text-center md:text-right space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">
              ¿En qué escuela estudiar?
            </h2>

            <p className="text-gray-500 text-lg font-bold">
              Representamos más de 40 escuelas de inglés <br /> en más de 10 ciudades de Irlanda
            </p>

            <p className="text-gray-600">
              A través de nuestro filtro inteligente, encuentra <br /> cuál es la escuela de inglés 
              que más se acerca a <br /> tus requisitos y necesidades.
            </p>

            <Button className="mt-2 bg-[#5371FF] hover:bg-[#4257FF] text-white text-base font-semibold" size="lg">
              Buscar escuela
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
