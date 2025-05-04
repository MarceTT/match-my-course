// app/terms/page.tsx
"use client"

import React from 'react'
import TestimonialHighlightSection from './TestimonialHighlightSection'
import HeroSection from './HeroSection'
import CountryFlagsSection from './CountryFlagsSection'
import PersonalizedAdviceSection from './PersonalizedAdviceSection'

const TestimonialsPage = () => {
  return (
    <>
      <HeroSection />
      <TestimonialHighlightSection />
      <CountryFlagsSection />
      <CountryFlagsSection />
      <PersonalizedAdviceSection />
    </>
  )
}

export default TestimonialsPage