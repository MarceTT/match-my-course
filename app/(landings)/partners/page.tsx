// app/partners/page.tsx
"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function PartnersPage() {
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
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/1.png"
                  alt="Cork English Academy"
                  width={400}
                  height={400}
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/2.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/3.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/4.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/5.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/6.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/7.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/8.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/9.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/10.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/11.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/12.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/13.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/14.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/15.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/16.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/17.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/18.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/19.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-left">
              <h3 className="text-2xl font-semibold">Nueva Zelanda</h3>
              <hr className="my-4 border-t-2 border-gray-300 w-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/11.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/7.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/8.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/9.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/10.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-left">
              <h3 className="text-2xl font-semibold">Canadá</h3>
              <hr className="my-4 border-t-2 border-gray-300 w-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/11.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/12.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/13.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/14.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/15.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-left">
              <h3 className="text-2xl font-semibold">Malta</h3>
              <hr className="my-4 border-t-2 border-gray-300 w-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/16.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/17.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/18.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/19.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/20.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-left">
              <h3 className="text-2xl font-semibold">Gran Bretaña</h3>
              <hr className="my-4 border-t-2 border-gray-300 w-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/21.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/22.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/23.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/24.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/25.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/26.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/27.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/28.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/29.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/30.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/31.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/32.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/33.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/34.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/35.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/36.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/37.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/38.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/39.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/40.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/41.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/42.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/43.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/44.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/45.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/46.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/47.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/48.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/49.png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
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
