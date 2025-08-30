import React from 'react'   
import { GuideForm } from './GuideForm'
import HeaderSection from './HeaderSection'
import NewExperience from './NewExperience'
import Testimonial from './Testimonial'
import Footer from '@/app/components/common/Footer'

const Ebook = () => {
  return (
    <div className="min-h-screen bg-gray-50">
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