import React from 'react'
import Image from "next/image"

const Section = () => {
    const certifications = [
        {
          name: "Eaquals",
          logo: "/images/placeholder_img.svg",
          width: 120,
          height: 60,
        },
        {
          name: "IALC",
          logo: "/images/placeholder_img.svg",
          width: 120,
          height: 60,
        },
        {
          name: "Quality Ireland",
          logo: "/images/placeholder_img.svg",
          width: 120,
          height: 60,
        },
      ]
  
  
    return (
        <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Certificaciones educacionales</h3>
        <div className="flex items-center gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="relative">
              <Image
                src={cert.logo || "/placeholder.svg"}
                alt={cert.name}
                width={cert.width}
                height={cert.height}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
  )
}

export default Section