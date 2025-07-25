"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    dataLayer?: Object[]
  }
}

export function GTMPageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!window.dataLayer) {
      window.dataLayer = []
    }

    const url = pathname + (searchParams.toString() ? `?${searchParams}` : "")

    ;(window.dataLayer as Record<string, any>[]).push({
      event: "page_view",
      page_path: url,
      page_title: document.title,
    })

    console.log("[GTM] Page view tracked:", url)
  }, [pathname, searchParams])

  return null
}
