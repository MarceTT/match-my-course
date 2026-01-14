import type React from "react"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Match My Course",
  description: "Formulario de inscripción para estudiantes internacionales",
  generator: "Match My Course",
}

export default function FormRegistroLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense fallback={null}>
        {children}
        <Toaster />
      </Suspense>
    </>
  )
}
