import React from 'react'
import Image from 'next/image'

const AdvantageSection = () => {
  return (
    <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2F343D] mb-6">
              ¿Cuál es la ventaja de usar nuestro buscador de escuelas?
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              Podrás encontrar una escuela de inglés filtrando por tipo de curso, ciudad donde quieres estudiar, semanas
              a estudiar y promociones vigentes
            </p>
          </div>

          {/* Advantages Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Card 1 - Conoce las escuelas */}
            <div className="bg-white rounded-xl p-6 shadow-lg transition hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <Image
                    src="/about-us/camara.png"
                    alt="Conoce las escuelas"
                    width={24}
                    height={24}
                    className="mt-1 w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#2F343D]">CONOCE LAS ESCUELAS EN DETALLE</h3>
              </div>
              <p className="text-gray-800 font-semibold">
                Podrás conocer cada escuela en detalle, sus instalaciones, infraestructura, ubicación y las salas de
                clases, así como los servicios que ofrece a sus estudiantes
              </p>
            </div>

            {/* Card 2 - Porcentaje de nacionalidades */}
            <div className="bg-white rounded-xl p-6 shadow-lg transition hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8rounded-full flex items-center justify-center">
                  <Image
                    src="/about-us/en-todo-el-mundo.png"
                    alt="Porcentaje de nacionalidades"
                    width={24}
                    height={24}
                    className="mt-1 w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#2F343D]">PORCENTAJE DE NACIONALIDADES</h3>
              </div>
              <p className="text-gray-800">
                Sabrás de antemano cuál es el <strong>porcentaje estimado de nacionalidades</strong> que la escuela
                maneja al año en sus salas de clases y la <strong>edad promedio</strong> de los estudiantes
              </p>
            </div>

            {/* Card 3 - Precios y ofertas */}
            <div className="bg-white rounded-xl p-6 shadow-lg transition hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#2F343D]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68-.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2F343D]">PRECIOS Y OFERTAS</h3>
              </div>
              <p className="text-[#2F343D]">
                Podrás conocer cuáles son los cursos de inglés que ofrece cada escuela y los precios por cada curso.
                Además, podrás acceder a las ofertas que tiene cada escuela
              </p>
            </div>

            {/* Card 4 - Fechas y horarios */}
            <div className="bg-white rounded-xl p-6 shadow-lg transition hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/about-us/calendario.png"
                  alt="Fechas y horarios"
                  width={24}
                  height={24}
                  className="mt-1 w-8 h-8 object-contain"
                />
                <h3 className="text-lg font-bold text-[#2F343D]">FECHAS Y HORARIOS</h3>
              </div>
              <p className="text-[#2F343D]">
                Podrás ver los horarios de clases de los cursos de inglés ofrecidos por las escuelas, la cantidad de
                horas a la semana de clases y los días a la semana que se imparten
              </p>
            </div>

            {/* Card 5 - Alojamiento */}
            <div className="bg-white rounded-xl p-6 shadow-lg transition hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/about-us/hogar.png"
                  alt="Alojamiento"
                  width={24}
                  height={24}
                  className="mt-1 w-8 h-8 object-contain"
                />
                <h3 className="text-lg font-bold text-[#2F343D]">ALOJAMIENTO</h3>
              </div>
              <p className="text-[#2F343D]">
                Podrás ver qué tipo de alojamiento ofrece la escuela para los estudiantes internacionales, y podrás
                reservar cupo de manera directa e inmediata con la escuela
              </p>
            </div>

            {/* Card 6 - Reserva inmediata */}
            <div className="bg-white rounded-xl p-6 shadow-lg transition hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2F343D]">RESERVA INMEDIATA</h3>
              </div>
              <p className="text-[#2F343D]">
                Tienes la posibilidad de reservar tu inicio de clases de manera fácil, segura e inmediata para que no
                pierdas tu cupo en la fecha que quieres iniciar tus clases
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default AdvantageSection