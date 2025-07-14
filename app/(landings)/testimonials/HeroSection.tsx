import React from 'react'
import { rewriteToCDN } from '@/app/utils/rewriteToCDN';

const HeroSection = () => {
  const bgUrl = rewriteToCDN("https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Testimonios-de-estudiantes-MatchMyCourse.webp");
  return (
    <section className="relative h-96 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold text-shadow">
          Testimonios
        </h1>
      </div>
    </section>
  )
}

export default HeroSection
