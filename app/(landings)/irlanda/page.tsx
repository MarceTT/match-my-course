import React from 'react'
import HeaderSection from './HeaderSection'
import StetpsToStudy from './StepsToStudy'
import { Suspense } from 'react'
import Calendar from './Calendar'
import Requisitos from './Requisitos'
import WhyIRL from './WhyIRL'

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