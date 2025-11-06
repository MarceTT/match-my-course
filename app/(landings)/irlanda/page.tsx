import React from 'react'
import HeaderSection from './HeaderSection'
import StetpsToStudy from './StepsToStudy'
import { Suspense } from 'react'
import Calendar from './Calendar'
import Requisitos from './Requisitos'
import WhyIRL from './WhyIRL'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Estudiar Inglés en Irlanda | MatchMyCourse',
  description: 'Estudia inglés en Irlanda con asesoría experta, escuelas acreditadas, alojamiento seguro y programas flexibles para vivir una experiencia inolvidable.',
}

const IrlandaPage = () => {
  return (
    <>
    <HeaderSection />
    <WhyIRL />
    <StetpsToStudy />
    <Suspense fallback={null}>
      <Calendar />
    </Suspense>
    <Requisitos />
    </>
  )
}

export default IrlandaPage