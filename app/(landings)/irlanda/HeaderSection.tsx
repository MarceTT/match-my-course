"use client";

import React from "react";
import BookingClient from "./asesoria/BookingClient";

export default function HeaderSection() {
  return (
    <div id="calendario" className="relative scroll-mt-0">
      {/* Background gradient - extends to half of calendar */}
      <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-[70%] lg:h-[75%]" />

      <section className="relative px-6 py-8 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-start">
            {/* Left Content */}
            <div className="text-white flex flex-col justify-center">
              <h1 className="text-3xl text-center [text-shadow:0_8px_24px_rgba(88,28,135,0.45)] lg:text-start lg:text-4xl xl:text-5xl font-black leading-tight mb-4">
                Asesoría estudiar inglés y trabajar en Irlanda
              </h1>
              <p className="text-base text-center lg:text-start lg:text-lg xl:text-xl text-white font-semibold leading-relaxed">
                ¿Estás buscando una experiencia única para estudiar y trabajar en el extranjero? Pide tu asesoría gratuita y descubre cuál es la mejor escuela, ciudad y curso para ti
              </p>
            </div>

            {/* Right Content - Booking Calendar */}
            <div className="flex justify-center">
              <div className="w-full max-w-md lg:max-w-[500px]">
                <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-2xl ring-1 ring-black/5">
                  <BookingClient />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
