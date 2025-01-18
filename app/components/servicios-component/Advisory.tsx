import React from "react";
import { GiPassport } from "react-icons/gi";
import { GiBookmarklet } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";
import { GiBed } from "react-icons/gi";

const Advisory = () => {
  const items = [
    {
      icon: GiPassport,
      text: (
        <>
          Requisitos para que tu visa de estudio y trabajo{" "}
          <span className="font-semibold">
            SEA APROBADA una vez que realicemos tu proceso de postulación
          </span>
        </>
      ),
    },
    {
      icon: GiBookmarklet,
      text: (
        <>
          Conocemos las escuelas de inglés que ofrecemos, es por esto que{" "}
          <span className="font-semibold">
            te mostraremos las ESCUELAS Y ENSEÑANZA
          </span>
        </>
      ),
    },
    {
      icon: GiMoneyStack,
      text: (
        <>
          Te mostraremos un análisis de tus gastos en Nueva Zelanda para que{" "}
          <span className="font-semibold">
            descubras cuál será tu REALIDAD ECONÓMICA
          </span>{" "}
          en el destino
        </>
      ),
    },
    {
      icon: GiBed,
      text: (
        <>
          El alojamiento siempre es una duda constante, es por esto que{" "}
          <span className="font-semibold">
            te explicaremos la SITUACIÓN DEL ALOJAMIENTO
          </span>{" "}
          en Nueva Zelanda
        </>
      ),
    },
    {
      content: (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 lg:w-24 lg:h-24 flex-shrink-0 flex items-center justify-center">
            <span className="text-4xl lg:text-6xl">😮</span>
          </div>
          <div className="text-md lg:text-xl text-justify">
            <span className="font-semibold">INFORMACIÓN SORPRESA</span> para la
            preparación de tu viaje!
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
          ¿Qué verás en la asesoría?
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {items.map((item, index) => (
            <div key={index}>
              {item.content ? (
                item.content
              ) : (
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 lg:w-20 lg:h-20 flex-shrink-0 flex items-center justify-center">
                    {item.icon && (
                      <item.icon className="w-20 h-20 text-gray-800" />
                    )}
                  </div>
                  <div className="text-gray-700 leading-relaxed pt-2 text-md md:text-xl lg:text-xl text-justify">
                    {item.text}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advisory;
