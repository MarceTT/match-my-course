import React from 'react'
import HeroIrlanda from './HeroIrlanda'
import VideoSection from './VideoSection'
import Requisitos from './Requisitos'
import HowWeHelp from './HowWeHelp'
import DublinOffice from './DublinOffice'
import IrlandaForm from './IrlandaForm'
import StepsToStudy from './StepsToStudy'
import TestimonialsSection from '@/app/components/home/TestimonialsSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Estudiar inglés en Irlanda | MatchMyCourse',
  description: 'Estudia inglés en Irlanda y trabaja con visa de estudiante. Conoce requisitos, duración y cómo aplicar paso a paso para vivir esta experiencia.',
  alternates: {
    canonical: 'https://matchmycourse.com/visa-estudio-trabajo-irlanda',
  },
}

const IrlandaPage = () => {
  return (
    <>
      {/* Hero con imagen de fondo y título principal */}
      <HeroIrlanda />

      {/* Video explicativo sobre la visa */}
      <VideoSection />

      {/* Requisitos para estudiar (fondo blanco, 4 cards) */}
      <Requisitos />

      {/* Cómo te ayudamos (2 bloques alternados) */}
      <HowWeHelp />

      {/* Oficina en Dublín (fondo azul oscuro) */}
      <DublinOffice />

      {/* Formulario de contacto */}
      <IrlandaForm />

      {/* 3 pasos para estudiar (círculos azules, línea punteada) */}
      <StepsToStudy />

      {/* Testimonios de estudiantes */}
      <TestimonialsSection 
        title="Estudiantes que han elegido los servicios de"
        highlightedText="MatchMyCourse"
      />
    </>
  )
}

export default IrlandaPage
