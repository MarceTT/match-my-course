// app/partners/page.tsx
"use client"

import React from 'react'
import Image from 'next/image'

export default function PartnersPage() {
  return (
    <>
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('/images/2.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">Escuelas Socias</h1>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        {/* Section 1 */}
        <div className="container mx-auto px-4 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Conocemos las escuelas <br />que ofrecemos 
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Nos caracterizamos por conocer todas nuestras escuelas que ofrecemos para entregarte 
              la información más actualizada y detallada de cada escuela de inglés. Trabajamos con 
              más de 50 instituciones a nivel internacional.
            </p>
          </div>

          {/* Repeating Section */}
          <div className="space-y-6">
            <div className="text-left">
              <h3 className="text-2xl font-semibold">Irlanda</h3>
              <hr className="my-4 border-t-2 border-gray-300 w-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="flex justify-center items-center">
              <Image
                src="/schools/2.png"
                alt="Cork English Academy"
                width={400}
                height={400}
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="rounded-lg shadow-md"
              />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
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
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
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
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
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
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
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
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
                  alt={`Bandera de Chile`}
                  width={200}
                  height={200}
                  className="rounded-sm"
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/partners/LOGOS ESCUELAS - MATCHYOURCOURSE (5).png"
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
        <div className="container mx-auto px-4 flex flex-col md:flex-row">
          {/* Left side - (empty or could be an image later) */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            {/* You can add an image here if needed */}
          </div>

          {/* Right side - Content */}
          {/* <div className="md:w-1/2 space-y-6 text-right"> */}
          <div className="md:w-1/2 text-center md:text-right space-y-6">
          {/* <div className="md:w-1/2 text-center md:text-left space-y-6 text-right"> */}

            {/* Main Title */}
            <h2 className="text-4xl font-bold text-gray-800">
              ¿En qué escuela estudiar?
            </h2>

            {/* Small description */}
            <p className="text-gray-500 text-lg font-bold">
              Representamos más de 40 escuelas de inglés en más de 10 ciudades de Irlanda
            </p>

            {/* Secondary Text */}
            <p className="text-gray-600">
            A través de nuestro filtro inteligente, encuentra cuál es la escuela de inglés 
            que más se acerca a tus requisitos y necesidades.
            </p>

            {/* Button */}
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
              Buscar escuela
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
