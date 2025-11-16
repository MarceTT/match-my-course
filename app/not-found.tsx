'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import HeaderServer from '@/app/components/common/HeaderServer'
import Footer from '@/app/components/common/FooterServer'

export default function NotFound() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <>
      <HeaderServer />
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="text-6xl font-bold text-indigo-600 mb-2">404</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Página no encontrada
          </h1>
          <p className="text-gray-600">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold mb-4">
            {countdown}
          </div>
          <p className="text-sm text-gray-500">
            Serás redirigido a la página principal en {countdown} segundo{countdown !== 1 ? 's' : ''}...
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Ir al inicio ahora
          </Link>
          <Link
            href="/school-search"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Buscar escuelas
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">¿Necesitas ayuda?</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contacto"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Contacto
            </Link>
            <Link
              href="/como-funciona-matchmycourse"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Cómo funciona
            </Link>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}
