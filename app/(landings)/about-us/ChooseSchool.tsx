import React from 'react'

const ChooseSchool = () => {
  return (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2F343D] mb-6">
              ¿Todavía no sabes en qué escuela de inglés de Irlanda estudiar?
            </h2>
            <p className="text-lg text-[#2F343D] max-w-3xl mx-auto mb-8">
              Conoce a Lilu que eligió la escuela de inglés que más se adaptaba a sus requisitos, requerimientos y
              necesidades
            </p>
          </div>

          {/* Video Testimonial */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/LtmACiAQUSg"
                  title="Testimonio de Lilu - Killarney School of English"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* Final CTA Button */}
          <div className="text-center">
            <button className="bg-[#5174fc] hover:bg-[#4257FF] text-white px-6 py-2 text-lg font-semibold rounded-md transition-colors">
              Quiero buscar mi escuela
            </button>
          </div>
        </div>
      </section>
  )
}

export default ChooseSchool