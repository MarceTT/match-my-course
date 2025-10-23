"use client";

import React from "react";
import BookingClient from "./asesoria/BookingClient";

type Props = {};

const ZoomBookingSection: React.FC<Props> = () => {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Heading and helper text */}
          <div className="order-1 mt-6 lg:mt-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-center mb-4 md:mb-6">
              Agenda tu asesoría y
              <span className="block text-[#5174fc]">analicemos tu perfil de postulación completamente gratuita</span>
            </h1>
          </div>

          {/* Right: Zoom booking widget */}
          <div id="asesoria-booking" className="order-2 scroll-mt-28">
            <div className="w-full max-w-xl mx-auto rounded-xl border border-gray-200 shadow-sm p-4 bg-white">
              <BookingClient />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZoomBookingSection;
