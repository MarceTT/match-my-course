import React from 'react'
import HeaderSection from './HeaderSection'
import StepsToStudy from './StepsToStudy'
import Requisitos from './Requisitos'
import WhyIRL from './WhyIRL'
import TestimonialsSection from '@/app/components/home/TestimonialsSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Estudiar Inglés en Irlanda | MatchMyCourse',
  description: 'Estudia inglés en Irlanda con asesoría experta, escuelas acreditadas, alojamiento seguro y programas flexibles para vivir una experiencia inolvidable.',
  alternates: {
    canonical: 'https://matchmycourse.com/estudiar-ingles-irlanda',
  },
}

const IrlandaPage = () => {
  return (
    <>
      {/* Hero con gradiente y calendario de reserva */}
      <HeaderSection />

      {/* Requisitos para estudiar (fondo blanco, 4 cards) */}
      <Requisitos />

      {/* Invierte en tu futuro (imagen + beneficios) */}
      <WhyIRL />

      {/* 3 pasos para estudiar (círculos azules, línea punteada) */}
      <StepsToStudy />

      {/* Testimonios de estudiantes */}
      <TestimonialsSection />
    </>
  )
}

export default IrlandaPage
