"use client";

import { useEffect, useState } from "react";
import { Reservation } from "@/types";

export function useReservation({ schoolId, course, weeks, schedule}: {
  schoolId: string;
  course: string | null;
  weeks: string | null;
  schedule: string | null;
}) {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log('useEffect')

    const fetchReservation = async () => {
      if (!schoolId || !course || !weeks || !schedule) return;

      try {
        setLoading(true);

        const query = new URLSearchParams({ schoolId, curso: course, semanas: weeks, horario: schedule }).toString();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/front/schools-calculo-reserva/${schoolId}?${query}`);

        const data = await res.json();

        if (res.ok) {
          setReservation(data.data);
          setError("");
        } else {
          setError(data.message || "Error al calcular reserva");
          setReservation(null);
        }
      } catch (err) {
        console.error(err);
        setError("Error al conectar con el servidor");
        setReservation(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [schoolId, course, weeks, schedule]);

  return { reservation, loading, error };
}
