import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('/images/2.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold text-shadow">
          Testimonios
        </h1>
      </div>
    </section>
  )
}

export default HeroSection
