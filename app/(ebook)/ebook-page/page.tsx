import React from 'react'
import { GuideForm } from './GuideForm'
import HeaderSection from './HeaderSection'
import EbookHeader from './EbookHeader'
import NewExperience from './NewExperience'
import Testimonial from './Testimonial'
import FooterServer from '@/app/components/common/FooterServer'

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
      <FooterServer />
    </div>
  )
}

export default Ebook