"use client";
import React, { useState } from 'react'
import Footer from '../components/common/Footer'
import Filer from '../components/features/Filter/Filter'
import SchoolList from '../components/school/SchoolSearchList'
import Header from '../components/common/Header'

const SchoolSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <Filer isOpen={isOpen} setIsOpen={setIsOpen} />
          <SchoolList isFilterOpen={isOpen} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SchoolSearch