"use client"

import { useState, useEffect } from "react"
import { IoStarOutline } from "react-icons/io5";
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"


interface Review {
    rating: number
    count: number
  }
  
  interface Testimonial {
    name: string
    country: string
    rating: number
    comment: string
  }
  

const Testimonials = () => {

    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    const reviews: Review[] = [
      { rating: 5, count: 10 },
      { rating: 4, count: 8 },
      { rating: 3, count: 2 },
      { rating: 2, count: 0 },
      { rating: 1, count: 1 },
    ]
  
    const testimonials: Testimonial[] = [
      {
        name: "Emiliano",
        country: "es",
        rating: 5,
        comment: "Great teachers and comfortable classroom with the right amount of students.",
      },
      {
        name: "Maria",
        country: "mx",
        rating: 4,
        comment: "Excellent experience learning English. The teachers are very professional.",
      },
      {
        name: "João",
        country: "br",
        rating: 5,
        comment: "Amazing school with great facilities and friendly staff.",
      },
    ]


    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 5000) // Change slide every 5 seconds
    
        return () => clearInterval(timer) // Cleanup on unmount
      }, [testimonials.length])
    
      const variants = {
        enter: {
          opacity: 0,
          y: 20,
        },
        center: {
          zIndex: 1,
          opacity: 1,
          y: 0,
        },
        exit: {
          zIndex: 0,
          opacity: 0,
          y: -20,
        },
      }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Testimonios de sus estudiantes</h3>

      {/* Rating Distribution */}
      <div className="space-y-2 mb-6">
        {reviews.map((review) => (
          <div key={review.rating} className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <IoStarOutline
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({review.count})</span>
          </div>
        ))}
      </div>

      {/* Testimonials Carousel */}
      <div className="relative bg-gray-100 rounded-xl p-6 overflow-hidden min-h-[180px] border border-gray-500">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentTestimonial}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="w-full absolute left-0 right-0 px-8 top-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="font-medium">{testimonials[currentTestimonial].name}</span>
              <Image
                src={`https://flagcdn.com/w20/${testimonials[currentTestimonial].country}.png`}
                alt={`${testimonials[currentTestimonial].country} flag`}
                width={20}
                height={15}
                style={{ width: '20px', height: '15px' }}
              />
              <div className="flex mb-4 mt-2 ml-3">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <IoStarOutline key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            </div>
            
            <div className="text-gray-600 relative font-semibold">
              {`"${testimonials[currentTestimonial].comment}"`}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Testimonials