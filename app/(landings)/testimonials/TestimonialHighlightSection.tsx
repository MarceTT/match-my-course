import Image from 'next/image'
import React from 'react'

const TestimonialHighlight = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        {/* Left - Image */}
        <div className="relative w-64 h-64 md:w-60 md:h-60 mx-auto"> 
          <Image
            src="/images/9.png"
            alt="Testimonial"
            layout="fill"
            objectFit="cover"
            className="rounded-full shadow-lg"
          />
        </div>

        {/* Right - Content */}
        <div className="space-y-4 text-center">
          {/* Name & Flag */}
          <div className="flex items-center justify-center space-x-3">
            <Image
              src="https://flagcdn.com/w40/cl.png"
              alt="Chile"
              width={40}
              height={30}
            />
            <span className="text-xl font-semibold">Ángela Cimma</span>
          </div>

          {/* Star Evaluation */}
          <div className="flex justify-center space-x-1 text-yellow-400 text-2xl">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            {/* <span>☆</span> */}
          </div>

          {/* Testimonial */}
          <p className="text-gray-700 text-lg max-w-2xl mx-auto md:mx-0">
            Cuando decidimos estudiar un curso de inglés en Nueva Zelanda, 
            nos sentíamos nerviosos, abrumados y desorientados. 
            El apoyo brindado por la agencia nos ayudó a que nuestra 
            experiencia fuera grata y que este proceso fuera más llevadero...
          </p>
        </div>
      </div>
    </section>
  )
}

export default TestimonialHighlight
