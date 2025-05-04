import React from 'react'

const PersonalizedAdviceSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Column */}
        <div className="space-y-6">
          {/* Title */}
          <h2 className="text-4xl font-bold text-gray-800">
            Asesoría <br />Personalizada
          </h2>
          <p className="text-gray-700 text-lg">
            Toma tu asesorpia personalizada y 
            <strong> te devolvemos el valor si tomas uno de los cursos de inglés </strong> 
            con nosotros
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-6 rounded-lg transition">
            Agendar asesoría
          </button>
        </div>

        {/* Right Column - Video */}
        <div className="flex justify-center">
          <div className="w-full h-64 md:h-80 relative">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/zvtSY3sYVdM" // Use the embed URL here
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          </div>
        </div>

      </div>
    </section>
  )
}

export default PersonalizedAdviceSection