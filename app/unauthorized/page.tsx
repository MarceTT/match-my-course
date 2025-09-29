import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Acceso no autorizado",
  robots: { index: false, follow: false },
};

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-sm rounded-xl p-8 text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-red-600 text-xl font-bold">403</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Acceso no autorizado</h1>
        <p className="text-gray-600 mb-6">
          No tienes permisos para acceder a esta sección. Si crees que es un error, por favor inicia sesión con una cuenta autorizada o vuelve al inicio.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button variant="outline">Volver al inicio</Button>
          </Link>
          <Link href="/login">
            <Button>Iniciar sesión</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

