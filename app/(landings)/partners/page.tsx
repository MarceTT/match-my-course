// app/partners/page.tsx
"use client"

import React, { useEffect, useState } from 'react'

import { getAllPartners } from '@/app/lib/services/partners'
import { Partner } from '@/app/lib/partners'
import HeaderSection from './HeaderSection'
import PartnerSection from './PartnerSection'
import SchoolOptionsSection from './SchoolOptions'

export default function PartnersPage() {
  const [ partners, setPartners ] = useState<Partner[]>([])

  useEffect(() => {
    async function fetchPartners() {
      const data = await getAllPartners()
      setPartners(data)
    }

    fetchPartners();
  }, []);

  return (
    <>
      <HeaderSection />
      <PartnerSection partners={partners} />
      <SchoolOptionsSection />
    </>
  )
}
