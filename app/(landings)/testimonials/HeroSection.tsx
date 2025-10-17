import React from 'react'
import Image from 'next/image'
import { rewriteToCDN } from '@/app/utils/rewriteToCDN';

const HeroSection = () => {
  const bgUrl = rewriteToCDN("https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Testimonios-de-estudiantes-MatchMyCourse.webp");
  return (
    <section className="relative h-[70vh] md:h-[50vh] lg:h-[65vh] xl:h-[70vh]">
      <Image
        src={bgUrl}
        alt="Testimonios de estudiantes MatchMyCourse"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold text-shadow">
          Testimonios
        </h1>
      </div>
    </section>
  )
}

export default HeroSection
