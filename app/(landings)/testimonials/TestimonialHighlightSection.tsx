'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const testimonials = [
  {
    name: 'Carla Carrasco Díaz',
    flag: 'https://flagcdn.com/w40/cl.png',
    originCountry: 'Chile',
    destinationCountry: 'Malta',
    destinationCity: 'St. Julians',
    image: '/testimonials/Carla Carrasco Díaz.png',
    text: (
      <>
        Quedé muy conforme con la asesoría, <b>la orientación fue clara</b>, se consideraron varias opciones, 
        la posibilidad de pagar con tarjeta y en cuotas también es muy favorable. Me pareció que hacen 
        un buen trabajo.
      </>
    ),
  },
  {
    name: 'Fabiola Cabezas',
    flag: 'https://flagcdn.com/w40/cl.png',
    originCountry: 'Chile',
    destinationCountry: 'Irlanda',
    destinationCity: 'Galway',
    image: '/testimonials/Fabiola Cabezas.png',
    text: (
      <>
        Estoy muy agradecida del apoyo que me ha brindado la agencia, ellos también son viajeros y han 
        estudiado y trabajado en el extranjero, entonces <b>saben lo que puedes necesitar de primera fuente 
        </b>y <b>te acompañan en cada proceso.</b>
      </>
    ),
  },
  {
    name: 'Cesar Menegatis',
    flag: 'https://flagcdn.com/w40/cl.png',
    originCountry: 'Chile',
    destinationCountry: 'Nueva Zelanda"',
    destinationCity: 'Auckland',
    image: '/testimonials/Fabiola Cabezas.png',
    text: (
      <>
        Siempre tuve de ustedes una grata asesoría y coordinada con reuniones virtuales para conocerlos más profundo 
        lo que me dio más garantías de confiar en tu agencia, siento que fue muy completa la información y apoyo al 
        llegar también a NZ. Mi experiencia con ustedes es recomendable ya que <b>cualquier duda me la despejadan con 
        conocimientos previos de lo que ofrecen y de como será el llegar a un país que uno desconoce,</b> la cultura, y 
        otros factores para buscar arriendo o poder movilizarme y hasta páginas de empleo que ustedes me asesoraron 
        dieron una rápida acogida cuando llegue. El instituto recomendado por ustedes fue uno de los mejores y siento 
        que aprendí mucho de esta maravillosa experiencia.
      </>
    ),
  },
  // {
  //     name: "Martina Beas",
  //     "País": "Argentina",
  //     "Destino": "Irlanda",
  //     "Ciudad": "Dublín",
  //     "Testimonio REAL": "Me gustaría destacar el prolijo trabajo la agencia que elegi para mis estudios de inglés en Irlanda. Desde el momento cero me ayudaron a clarificar a dónde quería ir a estudiar y cómo concretarlo. El proceso de la visa fue muy sencillo ya que la agencia se ocupo del trámite y también de que la escuela que elegi se contactara conmigo. Muy agradecida de que sus consejos y apoyo hicieran mi estadía en Dublin una de las experiencias más enriquecedoras que he vivido. Muchas gracias.",
  //     "Testimonio a poner en el sitio": "Desde el momento cero me ayudaron a clarificar a dónde quería ir a estudiar y cómo concretarlo. El proceso de la visa fue muy sencillo ya que la agencia se ocupo del trámite y también de que la escuela que elegi se contactara conmigo"
  // },
  // {
  //     name: "Camila Cisternas Ramírez",
  //     "País": "Chile",
  //     "Destino": "Nueva Zelanda",
  //     "Ciudad": "Auckland",
  //     "Testimonio REAL": "Llegué buscando una cotización para un curso de inglés en Nueva Zelanda, pero sentí que no debía seguir buscando más opciones, con ellos me sentí muy confiada gracias a la amabilidad y profesionalismo, quienes resolvieron todas mis dudas y fueron sincero desde el comienzo sobre la situación actual acerca del trabajo para estudiantes en Nueza Zelanda, apenas tomé la decisión fue todo muy rápido, ellos se encargaron de todo el proceso, yo solo debí enviar mi documentación, una vez hecha la postulación, solo tuve que esperar un poco más de dos semanas para tener mi visa de estudio y trabajo aprobada.",
  //     "Testimonio a poner en el sitio": "con ellos me sentí muy confiada gracias a la amabilidad y profesionalismo, quienes resolvieron todas mis dudas y fueron sinceros desde el comienzo sobre la situación actual acerca del trabajo para estudiantes en Nueza Zelanda, apenas tomé la decisión fue todo muy rápido, ellos se encargaron de todo el proceso, yo solo debí enviar mi documentación,"
  // },
  // {
  //     name: "Paulina Allel",
  //     "País": "Chile",
  //     "Destino": "Irlanda",
  //     "Ciudad": "Galway",
  //     "Testimonio REAL": "Mi experiencia con Abroad Experience es totalmente grata, desde el minuto uno se mostraron muy profesionales y dispuestos a ayudarme en todo lo que necesitaba. Me informaron muy bien a la hora de elegir el destino para estudiar inglés y también a escoger la escuela que se adaptaba mas a mis intereses. Puedo decir que, no sólo me ayudaron con el proceso antes de llegar a Irlanda, sino que también cuando estuve allá me siguieron apoyando en todo lo que necesitaba, preguntándome cómo va la experiencia estudiando y trabajando afuera. Fueron muy amables en darme tips para encontrar trabajo y alojamiento. Y siempre se mostraron más que dispuestos a ayudarme en todo lo que necesitaba en el proceso. Sin duda los recomendaría mil veces ya que gracias a ellos y a su gestión, he vivido una experiencia que me ayudó a aprender, crecer y de cierto modo cambiar mi vida.",
  //     "Testimonio a poner en el sitio": "Mi experiencia con Abroad Experience es totalmente grata... siempre se mostraron muy profesionales y dispuestos a ayudarme.Gracias a ellos he vivido una experiencia que me ayudó a aprender, crecer y cambiar mi vida."
  // },
  // {
  //     name: "Jennifer Beroiza",
  //     "País": "Chile",
  //     "Destino": "Nueva Zelanda",
  //     "Ciudad": "Auckland",
  //     "Testimonio REAL": "Quiero expresar mi más sincero agradecimiento por el excelente servicio y apoyo brindado durante todo el proceso de obtención de mi visa de estudios. Desde el primer contacto, el equipo me acompañó de manera muy cercana y profesional, resolviendo todas mis dudas y guiándome paso a paso en cada etapa del trámite. Lo que más destaco es el acompañamiento personalizado que recibí. No solo se encargaron de todos los aspectos administrativos, sino que también me ofrecieron valiosos consejos sobre cómo prepararme para la vida en el extranjero. Además, los tours organizados fueron una experiencia increíble. Gracias a ellos, pude familiarizarme con la ciudad y los lugares importantes antes de mi llegada, lo cual hizo mi adaptación mucho más sencilla y agradable.",
  //     "Testimonio a poner en el sitio": "Quiero expresar mi más sincero agradecimiento por el excelente servicio y apoyo durante todo el proceso. Gracias a ellos, pude familiarizarme con la ciudad y los lugares importantes antes de mi llegada."
  // },
  // {
  //     name: "Cristina Moncada",
  //     "País": "Chile",
  //     "Destino": "Irlanda",
  //     "Ciudad": "Cork",
  //     "Testimonio REAL": "Cuando empecé a barajar esta opción de ir a estudiar inglés a otro país me contacté con algunas agencias, para poder tomar una decisión informada. Escogí Abroad Experience ya que fueron quienes me transmitieron más confianza, conocimiento y profesionalismo, y ahora, estando acá ya en Irlanda, estoy muy satisfecha con mi elección. Sobre todo lo que más destaco es la paciencia y objetividad a la hora de darme sus recomendaciones para decidirme por una escuela, basándose siempre en mis objetivos. También las reuniones previas a mi viaje fueron de mucha ayuda para poder llegar acá un poco más orientada. A modo particular de mi experiencia habiendo escogido la UCC, he podido notar que el nivel de las clases es muy bueno, adecuadamente exigente, y tener la posibilidad de tomar más clases optativas durante las tardes es un plus muy bueno para quienes queremos practicar más. Además el campus es increíble y podemos acceder a muchos beneficios que complementan nuestra experiencia. Mi experiencia en general desde que comencé todo este proceso ha sido muy muy buena, por lo tanto 5 estrellas para Abroad Experience 😁",
  //     "Testimonio a poner en el sitio": "Escogí Abroad Experience porque me transmitieron más confianza, conocimiento y profesionalismo. Las reuniones previas a mi viaje fueron de mucha ayuda. Mi experiencia en general ha sido muy muy buena, por lo tanto 5 estrellas para Abroad Experience."
  // },
  // {
  //     name: "Angela Cimma",
  //     "País": "Chile",
  //     "Destino": "Nueva Zelanda",
  //     "Ciudad": "Auckland",
  //     "Testimonio REAL": "Cuando decidimos estudiar un curso de inglés, nos sentíamos nerviosos, abrumados y desorientados. Sin embargo, una de las mejores cosas que nos ayudó a que nuestra experiencia fuera grata y que este proceso de cambio fuera más llevadero fue el apoyo brindado por la agencia. Desde el inicio, el proceso fue fluido y bien organizado. Nos sentimos acompañados y orientados en cada paso, lo que nos dio mucha tranquilidad en un momento tan importante. Nos brindó una excelente orientación sobre los documentos que necesitaríamos al llegar, cómo preparar nuestras maletas y otros aspectos clave para nuestra llegada. Su atención al detalle y su disposición para resolver nuestras dudas nos hicieron sentir mucho más preparados y confiados. \nAl llegar a destino, fuimos recibidos por Felipe Santander, quien fue muy amable y atento. Nos ayudó a orientarnos en nuestros primeros días en el país, acompañándonos a recorrer los primeros lugares y a conocer la ciudad. Felipe despejó nuestras dudas y nos brindó un gran apoyo durante esos primeros momentos de adaptación. \nEn general, estoy muy satisfecha con la experiencia y recomiendo esta agencia. Su profesionalismo, preocupación por los detalles y el apoyo que brindan antes y durante el proceso hacen que todo sea mucho más fácil, menos estresante y confiable. ",
  //     "Testimonio a poner en el sitio": "Una de las mejores cosas fue el apoyo brindado por la agencia. El proceso fue fluido y bien organizado. Su atención al detalle y disposición para resolver nuestras dudas nos hicieron sentir mucho más preparados y confiados. Fuimos recibidos por Felipe Santander, quien fue muy amable y atento. Nos brindó un gran apoyo durante esos primeros momentos de adaptación."
  // },
  // {
  //     name: "María Belén Echeverría",
  //     "País": "Argentina",
  //     "Destino": "Irlanda",
  //     "Ciudad": "Cork",
  //     "Testimonio REAL": "Cuando surgió esta inquietud en mí, sobre la posibilidad de viajar y hacer una experiencia viviendo en el exterior, comencé a investigar online sobre las posibilidades que tenía y me encontré con el canal de Youtube de Camila, \"\"Chilena por el mundo\"\", me convocó su calidez y cercanía. Sus consejos eran muy prácticos e interesantes. Fue allí donde me conocí y me contacté con la agencia: \"\"Abroad experience\"\".\nTuve una primera asesoría, no solo con ellos, sino con otras dos agencias más, \"\"para hacer un estudio de mercado\"\". Aun así, no lo dudé, Camila y Luis ya me habían convencido, pero no a fuerza de insistencia, sino porque me hicieron sentir muy cómoda y acompañada en todo momento, como si fueran amigos.\nCada pequeña duda que tenía, podía conversar con ellos y así me guiaron durante todo el proceso. Incluso cuando llegué a Irlanda, si bien su trabajo, técnicamente había terminado, siempre se preocuparon en saber cómo seguía, si había conseguido un nuevo alojamiento, trabajo, etc.\nEn todo lo que pudieron siempre me apoyaron y acompañaron.\nLos recomiendo al 100%!!! De hecho, con cualquier persona con la que me cruzo y tiene la misma inquietud de hacer esta experiencia transformadora, enseguida les paso el contacto de Luis y les digo lo mismo: \"\"no dejes de hablar con él que te va a ayudar en todo\"\".\nY así es, luego me escriben para agradecerme y confirmar que concretaron todo con la agencia!!! ",
  //     "Testimonio a poner en el sitio": "Cada pequeña duda que tenía, podía conversar con ellos y así me guiaron durante todo el proceso. Incluso cuando llegué a Irlanda, si bien su trabajo, técnicamente había terminado, siempre se preocuparon en saber cómo seguía, si había conseguido un nuevo alojamiento, trabajo, etc. En todo lo que pudieron siempre me apoyaron y acompañaron.\nLos recomiendo al 100%!!!"
  // },
  // {
  //     name: "Jennifer Beroiza",
  //     "País": "Chile",
  //     "Destino": "Nueva Zelanda",
  //     "Ciudad": "Auckland",
  //     "Testimonio REAL": "...el proceso de obtención de mi visa fue rápido y sin complicaciones. Lo que más destaco es el acompañamiento personalizado que recibí. No solo se encargaron de los aspectos administrativos, sino que también me ofrecieron muy buenos consejos para mi vida en NZ",
  //     "Testimonio a poner en el sitio": "...el proceso de obtención de mi visa fue rápido y sin complicaciones. Lo que más destaco es el acompañamiento personalizado que recibí. No solo se encargaron de los aspectos administrativos, sino que también me ofrecieron muy buenos consejos para mi vida en NZ"
  // },
  // {
  //     name: "Catalina Escobar",
  //     "País": "Chile",
  //     "Destino": "Nueva Zelanda",
  //     "Ciudad": "Auckland",
  //     "Testimonio REAL": "...excelente servicio durante todo el proceso de planificación, preparación de mi viaje y visa de estudio... Cada detalle fue cuidadosamente explicado, y siempre me sentí acompañada y asesorada en cada paso del camino. ",
  //     "Testimonio a poner en el sitio": "...excelente servicio durante todo el proceso de planificación, preparación de mi viaje y visa de estudio... Cada detalle fue cuidadosamente explicado, y siempre me sentí acompañada y asesorada en cada paso del camino. "
  // },
  // {
  //     name: "María Prieto",
  //     "País": "Chile",
  //     "Destino": "Irlanda",
  //     "Ciudad": "Dublín",
  //     "Testimonio REAL": "Excelente servicio, sobre todo en la preparación e inserción en Irlanda, me ayudaron en todo, desde comprar el pasaje hasta la obtención de mi permiso de residencia, mil gracias",
  //     "Testimonio a poner en el sitio": "Excelente servicio, sobre todo en la preparación e inserción en Irlanda, me ayudaron en todo, desde comprar el pasaje hasta la obtención de mi permiso de residencia, mil gracias"
  // },
]

const TestimonialHighlight = () => {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)

  const handleChange = (nextIndex: number) => {
    setFade(false)
    setTimeout(() => {
      setIndex(nextIndex)
      setFade(true)
    }, 200) // Timing for fade-out before switching
  }

  const handlePrev = () => {
    handleChange(index === 0 ? testimonials.length - 1 : index - 1)
  }

  const handleNext = () => {
    handleChange(index === testimonials.length - 1 ? 0 : index + 1)
  }

  const testimonial = testimonials[index]

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 4000)
    return () => clearInterval(timer)
  }, [index])

  return (
    <section className="py-16">
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
