import React from "react"
import { notFound } from "next/navigation"
import Carousel from "@/app/components/features/Carousel/Carousel"
import { getAllServices } from "@/app/lib/api/services"
import PersonalizedAdviceSection from "@/app/(landings)/testimonials/PersonalizedAdviceSection"
import Consultances from "@/app/components/servicios/Consultances"
import TestimonialHighlight from "@/app/(landings)/testimonials/TestimonialHighlightSection"
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
      {/* <div className="relative bg-gray-50 overflow-hidden py-16 lg:py-20">
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200"
          style={{
            clipPath:
              "polygon(100% 0%, 0% 0% , 0.00% 88.23%, 1.67% 91.94%, 3.33% 94.63%, 5.00% 96.21%, 6.67% 96.66%, 8.33% 95.96%, 10.00% 94.12%, 11.67% 91.20%, 13.33% 87.27%, 15.00% 82.42%, 16.67% 76.77%, 18.33% 70.46%, 20.00% 63.64%, 21.67% 56.49%, 23.33% 49.19%, 25.00% 41.90%, 26.67% 34.81%, 28.33% 28.09%, 30.00% 21.92%, 31.67% 16.43%, 33.33% 11.77%, 35.00% 8.06%, 36.67% 5.37%, 38.33% 3.79%, 40.00% 3.34%, 41.67% 4.04%, 43.33% 5.88%, 45.00% 8.80%, 46.67% 12.73%, 48.33% 17.58%, 50.00% 23.23%, 51.67% 29.54%, 53.33% 36.36%, 55.00% 43.51%, 56.67% 50.81%, 58.33% 58.10%, 60.00% 65.19%, 61.67% 71.91%, 63.33% 78.08%, 65.00% 83.57%, 66.67% 88.23%, 68.33% 91.94%, 70.00% 94.63%, 71.67% 96.21%, 73.33% 96.66%, 75.00% 95.96%, 76.67% 94.12%, 78.33% 91.20%, 80.00% 87.27%, 81.67% 82.42%, 83.33% 76.77%, 85.00% 70.46%, 86.67% 63.64%, 88.33% 56.49%, 90.00% 49.19%, 91.67% 41.90%, 93.33% 34.81%, 95.00% 28.09%, 96.67% 21.92%, 98.33% 16.43%, 100.00% 11.77%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className={`${raleway.className} text-4xl lg:text-5xl font-black text-gray-800 mb-4`}
            >
              {service.title}
            </h2>
            <div
              className={`${raleway.className} text-4xl lg:text-4xl text-gray-800 mb-4`}
            >
              visa Study&Work de <span className="font-black">Irlanda</span>
            </div>
            <p
              className={`${raleway.className} text-xl lg:text-xl text-gray-900 mb-8 font-light`}
            >
              Averigua si cumples con los requisitos antes de tomar una
              decisi&oacute;n
            </p>
          </div>
        </div>
      </div> */}
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="relative w-full aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src={service.embed}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <Carousel />
      <PersonalizedAdviceSection />
      <TestimonialHighlight />
      <h2 className={`text-5xl font-black text-center mb-12 mt-10 ${raleway.className}`}>
        Otras asesorías
      </h2>
      <Consultances />
    </>
  );
};
