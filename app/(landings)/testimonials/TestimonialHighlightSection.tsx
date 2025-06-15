'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { getAllTestimonials } from '@/app/lib/api/testimonial'
import { Testimonial } from '@/types'

const TestimonialHighlight = () => {
  const [index, setIndex] = useState(0)
  const setFade = useState(true)[1]
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  const handleChange = useCallback((nextIndex: number) => {
    setFade(false)
    setTimeout(() => {
      setIndex(nextIndex)
      setFade(true)
    }, 200) // Timing for fade-out before switching
  }, [setFade])

  const handlePrev = () => {
    handleChange(index === 0 ? testimonials.length - 1 : index - 1)
  }

  const handleNext = useCallback(() => {
    handleChange(index === testimonials.length - 1 ? 0 : index + 1)
  }, [index, testimonials.length, handleChange])

  const testimonial = testimonials[index]

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 7000)
    return () => clearInterval(timer)
  }, [index, handleNext])

  useEffect(() => {
    async function fetchTestimonials() {
      const data = await getAllTestimonials()
      setTestimonials(data)
    }

    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-10">

          {/* Left arrow */}
          <button
            onClick={handlePrev}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
            aria-label="Previous"
          >
            ←
          </button>

          {/* Main content */}
          <div className="grid md:grid-cols-2 items-center">
            {/* Left - Image */}
            <div className="relative w-64 h-64 md:w-60 md:h-60 mx-auto">
              <Image
                src={testimonial.image}
                alt="Testimonial"
                layout="fill"
                objectFit="cover"
                className="rounded-full shadow-lg"
              />
            </div>

            {/* Right - Content */}
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center space-x-3">
                <Image src={testimonial.flag} alt={testimonial.originCountry} width={40} height={30} />
                <span className="text-xl font-semibold">{testimonial.name}</span>
              </div>

              <div className="flex justify-center space-x-1 text-yellow-400 text-2xl">
                {Array(5).fill('★').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>

              <p className="text-gray-700 text-lg max-w-xl">
                {testimonial.text}
              </p>
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialHighlight
