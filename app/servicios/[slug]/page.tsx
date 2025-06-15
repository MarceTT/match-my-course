import React from "react"
import { notFound } from "next/navigation"
import Carousel from "@/app/components/features/Carousel/Carousel"
import { getAllServices } from "@/app/lib/api/services"
import PersonalizedAdviceSection from "@/app/(landings)/testimonials/PersonalizedAdviceSection"
import TestimonialHighlightSection from "@/app/(landings)/testimonials/TestimonialHighlightSection"
import { VideoPlayer } from "@/app/components"
import Consultances from "@/app/components/servicios/Consultances"
import { raleway } from "@/app/ui/fonts"

export async function generateStaticParams() {
  const services = await getAllServices()
  
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServiceDetail({ params }: { 
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const services = await getAllServices();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound()
  }
  
  return (
    <>
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="relative w-full aspect-video">
            <VideoPlayer embed={service.embed} />
          </div>
        </div>
      </div>
      <Carousel />
      <PersonalizedAdviceSection />
      <TestimonialHighlightSection />
      <h2 className={`text-5xl font-black text-center mb-12 mt-10 ${raleway.className}`}>
        Otras asesorías
      </h2>
      <Consultances />
    </>
  );
};
