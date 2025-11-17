"use client"

import React from 'react'
import { Partner } from '@/types'
import HeaderSection from './HeaderSection'
import PartnerSection from './PartnerSection'
import SchoolOptionsSection from './SchoolOptions'

interface PartnersClientProps {
  partners: Partner[]
}

export default function PartnersClient({ partners }: PartnersClientProps) {
  return (
    <>
      <HeaderSection />
      <PartnerSection partners={partners} />
      <SchoolOptionsSection />
    </>
  )
}
