import { Partner } from '@/app/lib/types'
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
        <CountrySection countryKey="irlanda" name="Irlanda" partners={partners} />
        <CountrySection countryKey="nueva-zelanda" name="Nueva Zelanda" partners={partners} />
        <CountrySection countryKey="canada" name="Canadá" partners={partners} />
        <CountrySection countryKey="malta" name="Malta" partners={partners} />
        <CountrySection countryKey="gran-bretana" name="Gran Bretaña" partners={partners} />
        <CountrySection countryKey="escocia" name="Escocia" partners={partners} />
      </div>
    </section>
  )
}