import type { Metadata } from "next";
import BookingClient from "./BookingClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Agendar Asesoría | MatchMyCourse",
  description: "Agenda tu asesoría por Zoom con nuestro equipo.",
};

export default function AsesoriaIrlandaPage() {
  return (
    <main className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <section className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-2">Agendar asesoría</h1>
          <p className="text-muted-foreground">
            Elige una fecha y hora disponible. La reunión se crea en Zoom automáticamente.
          </p>
        </section>
        <Suspense fallback={null}>
          <BookingClient />
        </Suspense>
      </div>
    </main>
  );
}
