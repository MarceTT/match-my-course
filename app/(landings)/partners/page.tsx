"use client"

import type { Metadata } from "next";
import React, { useEffect, useState } from 'react'
import { Partner } from '@/types'
import { getAllPartners } from '@/app/lib/api/partners'
import HeaderSection from './HeaderSection'
import PartnerSection from './PartnerSection'
import SchoolOptionsSection from './SchoolOptions'

export const metadata: Metadata = {
  title: "Nuestras Escuelas Aliadas | MatchMyCourse",
  description: "Descubre nuestras escuelas aliadas de inglés certificadas y acreditadas en Irlanda y Nueva Zelanda.",
  alternates: {
    canonical: "https://matchmycourse.com/escuelas-aliadas",
  },
};

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await getAllPartners()
        setPartners(data)
      } catch (err) {
        setError("No se pudieron cargar las escuelas...")
        // console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  if (loading) {
    return <p className="text-center py-8">Cargando escuelas...</p>
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">{error}</p>
  }

  return (
    <>
      <HeaderSection />
      <PartnerSection partners={partners} />
      <SchoolOptionsSection />
    </>
  )
}
