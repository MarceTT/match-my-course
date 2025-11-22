'use client'

import React from 'react'
import HeaderSection from './Header'
import StudyAndWork from './StudyAndWork'
import GeneralEnglish from './GeneralEnglish'
import IndividualLessons from './IndividualLessons'
import IntensiveEnglish from './IntensiveEnglish'
import BussinesEnglish from './BussinesEnglish'
import SearchSchools from './SearchSchools'

const EnglishSchoolCoursesClient = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "MatchMyCourse",
    "description": "Plataforma para encontrar los mejores cursos de inglés en el extranjero",
    "url": "https://matchmycourse.com/english-school-courses",
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": "100+",
      "category": "Cursos de Inglés en el Extranjero"
    },
    "serviceType": [
      "Inglés General",
      "Inglés de Negocios", 
      "Inglés Intensivo",
      "Clases Individuales",
      "Estudiar y Trabajar"
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Internacional"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <HeaderSection />
      <StudyAndWork />
      <GeneralEnglish />
      <IndividualLessons />
      <IntensiveEnglish />
      <BussinesEnglish />
      <SearchSchools />
    </>
  )
}

export default EnglishSchoolCoursesClient