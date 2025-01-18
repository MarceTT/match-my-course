'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { IoStarSharp } from "react-icons/io5";
import Picture from "../../../public/images/placeholder_img.svg";

interface Testimonial {
    id: number
    name: string
    content: string
    avatar: string
    highlightedText: string
    rating: number
  }

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Ángela Cimma y Víctor Vidal",
      content: "Cuando decidimos estudiar un curso de inglés en Nueva Zelanda, ",
      highlightedText: "nos sentimos nerviosos, abrumados y desorientados.",
      avatar: Picture,
      rating: 5
    },
    {
      id: 2,
      name: "Catalina Escobar",
      content: "...excelente servicio durante todo el proceso de planificación, preparación de viaje y visa de estudio... Cada detalle fue cuidadosamente explicado, y siempre me sentí acompañada y asesorada en cada paso del camino.",
      highlightedText: "",
      avatar: Picture,
      rating: 5
    },
    {
      id: 3,
      name: "Jennifer Beraiza",
      content: "...el proceso de obtención de mi visa fue rápido y sin complicaciones. Lo que más destaco es el ",
      highlightedText: "acompañamiento personalizado que recibí.",
      avatar: Picture,
      rating: 5
    },
    {
      id: 4,
      name: "Carlos Mendoza",
      content: "La asesoría fue fundamental para elegir el curso correcto. ",
      highlightedText: "El apoyo constante hizo toda la diferencia.",
      avatar: Picture,
      rating: 5
    },
    {
      id: 5,
      name: "Laura Pérez",
      content: "Gracias al equipo por hacer el proceso tan simple. ",
      highlightedText: "Su guía fue invaluable en cada paso del camino.",
      avatar: Picture,
      rating: 5
    }
  ]

const Testimonials = () => {

    const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (testimonials.length - 2))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <IoStarSharp
        key={index}
        className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
      />
    ))
  }
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Lo que dicen nuestros estudiantes
        </h2>
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
                <div key={testimonial.id} className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 mb-4 relative rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex gap-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-700 mb-4">
                    {testimonial.content}
                    {testimonial.highlightedText && (
                      <span className="bg-yellow-100 px-1">{testimonial.highlightedText}</span>
                    )}
                  </p>
                  <p className="font-semibold">{testimonial.name}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Testimonials