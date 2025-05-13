import { Partner } from '@/app/lib/partners'
import Image from 'next/image'
import React from 'react'

export function PartnerCard({ partner }: { partner: Partner }) {
  const { src, alt } = partner

  return (
    <div className="flex justify-center items-center">
      <Image
        src={src}
        alt={alt}
        width={400}
        height={400}
        priority
        sizes="(max-width: 768px) 100vw, 400px"
        className="rounded-sm"
      />
    </div>
  )
}
