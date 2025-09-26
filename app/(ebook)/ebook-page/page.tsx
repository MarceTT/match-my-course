import React from 'react'   
import { GuideForm } from './GuideForm'
import HeaderSection from './HeaderSection'
import EbookHeader from './EbookHeader'
import NewExperience from './NewExperience'
import Testimonial from './Testimonial'
import { Footer } from '@/app/shared'

const Ebook = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <EbookHeader />
      {/* Hero Section */}
      <HeaderSection />
      {/* Content Section */}
      <GuideForm />
      <NewExperience />
      <Testimonial />
      <Footer />
    </div>
  )
}

export default Ebook