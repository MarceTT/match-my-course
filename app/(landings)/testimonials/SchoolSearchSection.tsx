  import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
  
  const SchoolSearchSection = () => {
    const router = useRouter()
    
    const goSearchSchool = () => {
      router.push('/school-search?course=ingles-general')
    }

    return (
      <section className="py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row">
          {/* Left side - (empty or could be an image later) */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            {/* You can add an image here if needed */}
          </div>

          {/* Right side - Content */}
          {/* <div className="md:w-1/2 space-y-6 text-right"> */}
          <div className="md:w-1/2 text-center md:text-right space-y-6">
          {/* <div className="md:w-1/2 text-center md:text-left space-y-6 text-right"> */}

            {/* Main Title */}
            <h2 className="text-4xl font-bold text-gray-800">
              ¿En qué escuela estudiar?
            </h2>

            {/* Small description */}
            <p className="text-gray-500 text-lg font-bold">
              Representamos más de 40 escuelas de inglés en más de 10 ciudades de Irlanda
            </p>

            {/* Secondary Text */}
            <p className="text-gray-600">
            A través de nuestro filtro inteligente, encuentra cuál es la escuela de inglés 
            que más se acerca a tus requisitos y necesidades.
            </p>
            <Button onClick={goSearchSchool} className="mt-2 bg-[#5371FF] hover:bg-[#4257FF] text-white text-base font-semibold" size="lg">
              Buscar escuela
            </Button>
          </div>
        </div>
      </section>
    )
  }
  
  export default SchoolSearchSection
