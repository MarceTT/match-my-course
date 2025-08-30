"use client";

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  image: string;
  testimonial: string;
  country?: string;
  city?: string;
  course?: string;
  nationality?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Victor Vidal y Ángela Cimma",
    image: "/testimonials/angela-cimma.png",
    testimonial: "Cuando decidimos estudiar un curso de inglés en Nueva Zelanda, nos sentíamos nerviosos, abrumados y desorientados. El apoyo brindado por la agencia nos ayudó a que nuestra experiencia fuera grata y que este proceso fuera más llevadero",
    country: "Nueva Zelanda",
    city: "Auckland",
    nationality: "Chile",
  },
  {
    id: 2,
    name: "María Prieto",
    image: "/testimonials/maria-prieto.png",
    testimonial: "Excelente servicio, pude elegir mi escuela de forma fácil y rápido y sin que nadie me presionara. Además, me apoyaron en la preparación e inserción en Irlanda, desde comprar el pasaje hasta la obtención de mi permiso de residencia, mil gracias",
    country: "Irlanda",
    city: "Dublin",
    nationality: "Chile",
  },
  // Puedes agregar más testimonios aquí
  {
    id: 3,
    name: "Cristina Moncada",
    image: "/testimonials/cristina-moncada.png",
    testimonial: "A modo particular de mi experiencia habiendo escogido la UCC - University College Cork, he podido notar que el nivel de las clases es muy bueno, adecuadamente exigente, y tener la posibilidad de tomar más clases optativas durante las tardes es un plus muy bueno para quienes queremos practicar más.",
    country: "Irlanda",
    city: "Cork",
    nationality: "Chile",
  },
  {
    id: 4,
    name: "Paulina Allel",
    image: "/testimonials/paulina-allel.png",
    testimonial: "Mi experiencia fue totalmente grata... siempre se mostraron muy profesionales y dispuestos a ayudarme. Gracias a ellos he vivido una experiencia que me ayudó a aprender, crecer y cambiar mi vida estudiando en Galway Cultural Institute.",
    country: "Irlanda",
    city: "Galway",
    nationality: "Chile",
  },
  {
    id: 5,
    name: "María Belén Echeverría",
    image: "/testimonials/maria-belen-echeverria.png",
    testimonial: "Cada pequeña duda que tenía sobre las escuelas a elegir, podía conversar con ellos y así me guiaron durante todo el proceso para estudiar en Cork English Academy. Incluso cuando llegué a Irlanda, si bien su trabajo, técnicamente había terminado, siempre se preocuparon en saber cómo seguía, si había conseguido un nuevo alojamiento, trabajo.",
    country: "Irlanda",
    city: "Galway",
    nationality: "Argentina",
  },
  {
    id: 6,
    name: "Juan Hidalgo",
    image: "/testimonials/juan-hidalgo.png",
    testimonial: "Mi experiencia en la escuela Galway Culture Institute ha sido increíble. Me he sentido acogido y guiado desde el inicio, entregando información clara, de manera amable y con un servicio muy humano por parte de su administración y profesorado.",
    country: "Irlanda",
    city: "Galway",
    nationality: "Chile",
  },
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(2);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(1);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.ceil(testimonials.length / itemsPerView) - 1;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, itemsPerView]);

  const goToSlide = useCallback((index: number) => {
    const maxIndex = Math.ceil(testimonials.length / itemsPerView) - 1;
    if (index < 0) {
      setCurrentIndex(maxIndex);
    } else if (index > maxIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  }, [itemsPerView]);

  const goToPrevious = useCallback(() => {
    setIsAutoPlaying(false);
    goToSlide(currentIndex - 1);
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    setIsAutoPlaying(false);
    goToSlide(currentIndex + 1);
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [currentIndex, goToSlide]);

  const maxSlides = Math.ceil(testimonials.length / itemsPerView);

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Quote className="w-8 h-8 text-white" />
          </div> */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2F343D] mb-6 leading-tight">
            Estudiantes que han elegido su escuela a través de
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
               MatchMyCourse
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubre las experiencias reales de estudiantes que confiaron en nosotros para encontrar su camino educativo ideal
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            onClick={goToPrevious}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-300 hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            onClick={goToNext}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-300 hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Carousel Track */}
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className={`flex-shrink-0 px-4 ${
                    itemsPerView === 2 ? 'w-1/2' : 'w-full'
                  }`}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full group relative overflow-hidden">
                    {/* Card background decoration */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-10 translate-x-10 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                    
                    {/* Quote icon */}
                    <div className="absolute top-6 right-6 text-blue-200 opacity-50">
                      <Quote className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <p className="text-[#2F343D] text-lg mb-8 leading-relaxed font-medium">
                        "{testimonial.testimonial}"
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-full object-cover relative z-10 border-2 border-white shadow-lg"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#2F343D] text-lg mb-1">
                            {testimonial.name}
                          </h4>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                            {testimonial.course && (
                              <span className="text-sm text-gray-600 font-medium">
                                {testimonial.course}
                              </span>
                            )}
                            {testimonial.country && (
                              <>
                                {testimonial.course && (
                                  <span className="hidden sm:inline text-gray-400">•</span>
                                )}
                                <span className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                                  📍 {testimonial.country}
                                </span>
                              </>
                            )}
                            {testimonial.city && (
                              <span className="text-sm text-gray-600 font-medium">
                                {testimonial.city}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-3">
            {Array.from({ length: maxSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  goToSlide(index);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center mt-6 gap-4 md:hidden">
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="sm"
              className="bg-white shadow hover:shadow-md transition-shadow"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>
            <Button
              onClick={goToNext}
              variant="outline"
              size="sm"
              className="bg-white shadow hover:shadow-md transition-shadow"
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Auto-play indicator */}
        {/* <div className="text-center mt-4">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500' : 'bg-gray-400'} animate-pulse`}></span>
            {isAutoPlaying ? 'Reproducción automática activa' : 'Pausa automática - se reanudará pronto'}
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default TestimonialSection;