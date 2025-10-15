import type React from "react"
import type { Metadata } from "next"
import { raleway, nunito } from "../../ui/fonts"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "../../globals.css"

const geistSans = raleway.variable
const geistMono = nunito.variable

export const metadata: Metadata = {
  title: "Match My Course",
  description: "Formulario de inscripción para estudiantes internacionales",
  generator: "Match My Course",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans} ${geistMono} antialiased`}>
        <Suspense fallback={null}>
          {children}
          <Toaster />
        </Suspense>
      </body>
    </html>
  )
}
