import type { Metadata } from "next";
import EnrollmentForm from "./form/RegistroForm"

export const metadata: Metadata = {
  title: "Formulario de Inscripción | MatchMyCourse",
  description: "Complete el formulario de inscripción para registrarse en nuestros programas de estudios de inglés en el extranjero.",
  alternates: {
    canonical: "https://matchmycourse.com/registro",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4 md:py-12">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary md:text-4xl text-balance">Formulario de Inscripción</h1>
          <p className="mt-2 text-muted-foreground text-pretty">
            Complete la información en dos pasos para su programa de estudios en el extranjero
          </p>
        </div>
        <EnrollmentForm />
      </div>
    </main>
  )
}
