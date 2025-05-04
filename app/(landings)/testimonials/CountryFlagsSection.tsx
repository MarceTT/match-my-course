import Image from 'next/image'
import React from 'react'

const CountryFlagsSection = () => {
  return (
    <section className="py-12" style={{ backgroundColor: '#D8D8D8' }}>
      <div className="container mx-auto px-4 text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">
          Países más elegidos <br />por los estudiantes
        </h1>

        {/* Description */}
        <p className="text-lg mb-8">
          para estudiar inglés en el extranjero
        </p>

        {/* Flags Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Irlanda */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="https://flagcdn.com/w40/ie.png"
                alt="Irlanda"
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
            <span className="text-sm mt-2">Irlanda</span>
          </div>

          {/* Nueva Zelanda */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="https://flagcdn.com/w40/nz.png"
                alt="Nueva Zelanda"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="text-sm mt-2">Nueva Zelanda</span>
          </div>

          {/* Dubai */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="https://flagcdn.com/w40/ae.png"
                alt="Dubai"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="text-sm mt-2">Dubai</span>
          </div>

          {/* Canadá */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="https://flagcdn.com/w40/ca.png"
                alt="Canadá"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="text-sm mt-2">Canadá</span>
          </div>

          {/* Reino Unido */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="https://flagcdn.com/w40/gb.png"
                alt="Reino Unido"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="text-sm mt-2">Reino Unido</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CountryFlagsSection
