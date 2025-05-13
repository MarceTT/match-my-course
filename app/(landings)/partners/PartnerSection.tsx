import { Partner } from '@/app/lib/partners'
import CountrySection from './CountrySection'

interface Props {
  partners: Partner[]
}

export default function PartnerSection({ partners }: Props) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Conocemos las escuelas <br />que ofrecemos 
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Nos caracterizamos por conocer todas nuestras escuelas que ofrecemos para entregarte 
            la información más <br /> actualizada y detallada de cada escuela de inglés. Trabajamos con 
            más de 50 instituciones a nivel internacional.
          </p>
        </div>
        <CountrySection name="Irlanda" partners={partners} />
        <CountrySection name="Nueva Zelanda" partners={partners} />
        <CountrySection name="Canadá" partners={partners} />
        <CountrySection name="Malta" partners={partners} />
        <CountrySection name="Gran Bretaña" partners={partners} />
      </div>
    </section>
  )
}